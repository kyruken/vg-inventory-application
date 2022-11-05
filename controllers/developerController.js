const async = require('async');
const developer = require('../models/developer');

//Model
const Developer = require('../models/developer');
const Game = require('../models/game');

exports.index = (req, res) => {
    Developer.find()
        .exec((err, developers) => {
            res.render('./developer/developer_list', { developers });

        })
}

exports.developer_detail_get = (req, res) => {
    async.parallel(
        {
            games(callback) {
                Game.where("developer")
                    .equals(req.params.id)
                    .where("title")
                    .exec(callback);
            },
            developer(callback) {
                Developer.findById(req.params.id)
                .exec(callback);
            }
        }, (err, data) => {
            console.log(data);
            res.render('./developer/developer_detail', { 
                games: data.games,
                developer: data.developer
             });
        })
}

exports.developer_form_get = (req, res) => {

    res.render('./developer/developer_form', {message: "Add a developer"});

}

exports.developer_form_post = (req, res) => {
    
}

exports.developer_delete_get = (req, res) => {
    

}

exports.developer_delete_post = (req, res) => {
    

}

exports.developer_update_get = (req, res, next) => {
    Developer.findById(req.params.id, (err, result) => {
        if (err) {
            next(err);
        }
        
        res.render('./developer/developer_form', {developer: result});
    })

}

exports.developer_update_post = (req, res) => {
    const newDev = new Developer({
        name: req.body.name,
        _id: req.params.id
    })

    Developer.findByIdAndUpdate(req.params.id, newDev, (err, updatedDev) => {
        if (err) {
            return next(err);
        }

        res.redirect(updatedDev.url)

    })

    
}