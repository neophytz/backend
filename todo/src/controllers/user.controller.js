// this Todo represents the Todo table. First letter of a schema should always be caps..
const { User } = require('../schemas/user.schema');
const jwt= require("jsonwebtoken");
const get = (req, res) => {
    // find all entries from the Todo table and return it to the user.
    User.find({}).then(result => {
        // it will get executed only when the DB query is successful.
        return res.status(201).json({data: result})

    }).catch(err => {
        // this will get executed if anthing goes wrong.
        return res.status(500).json({data: err})
    })
}

const create = (req, res) => {
    // validate the data being recieved from client.
    /**
     * 1. client level validation
     * 2. controller level validation
     * 3. db level validation.
    */
    const _userBody = req.body;
    // enter your own validation.

    const _user = new User(_userBody)
    return _user.save().then(result => {
        // it will get executed only when the DB query is successful.
        const token = jwt.sign(_userBody, process.env.SECRET_KEY);
        res.status(200).json({data: result, token:token})
    }).catch(err => {
        // this will get executed if anthing goes wrong.
        res.status(500).json({data: err})
    })
}

const update = (req, res) => {
    // object desctructuring.
    const { user_id } = req.params;
    User.findByIdAndUpdate(user_id, req.body).then(result => {
        // it will get executed only when the DB query is successful.
        res.status(200).json({data: result})
    }).catch(err => {
        // this will get executed if anthing goes wrong.
        res.status(500).json({data: err})
    })
}

module.exports = {get, create, update};