//Model
const developerSchema = require('../models/developer');

exports.index = (req, res) => {
    res.render('./developer/developer_list');
}