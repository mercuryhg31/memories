const mongoose = require('mongoose');
const Account = require('../models/account');

//Function for searching for a User through ID, Username, or Email
exports.searchUser = (req, res, next) => {
    if(req.query.constructor === Object && Object.keys(req.query).length === 0) {
        res.status(404).json({"Error": "Got Nothing"});    
      }
    const term = req.query.search;
    //Check if the search term is a Number
    if(isNaN(term)){
        Account.find()
        .or([{email: {$regex: '.*' + term + '.*', $options: 'i'}},
            {username: {$regex: '.*' + term + '.*', $options: 'i'}}])
        .exec()
        .then(user =>
            res.status(200).json({user}))
        .catch(err =>
            res.status(500).json({err}));
    }
    //If the search term is a number, may be UserID
        else{
            Account.find()
            .or([{userid : term},
            {email: {$regex: '.*' + term + '.*', $options: 'i'}},
            {username: {$regex: '.*' + term + '.*', $options: 'i'}}])
            .exec()
            .then(user =>
                res.status(200).json({user}))
            .catch(err =>
                res.status(500).json({err}));
    }
}


exports.searchPlace = (req, res, next) => {
    //Needs some garbage data for location
    return null;
}
exports.searchTags = (req, res, next) => {
    return null;
}
