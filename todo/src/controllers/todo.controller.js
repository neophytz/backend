// this Todo represents the Todo table. First letter of a schema should always be caps..
const { Todo } = require('../schemas/todo.schema');

const get = (req, res) => {
    // find all entries from the Todo table and return it to the user.
    Todo.find({}).populate("author")
    .then(result => {
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
    const _todoBody = req.body;
    const errors = new Array()
    if (!_todoBody.title || typeof _todoBody.title != 'string') {
        errors.push("Title is either not present or is not type String")
    }

    if(errors.length > 0) {
        return res.status(400).json({
            data: errors,
            message: 'Todo not created, Validation error.'
        })
    }

    const _todo = new Todo(_todoBody)
    return _todo.save().then(result => {
        // it will get executed only when the DB query is successful.
        res.status(200).json({data: result})
    }).catch(err => {
        // this will get executed if anthing goes wrong.
        res.status(500).json({data: err})
    })
}

const _delete = (req,res) => {
    const {todo_id} = req.params;
    Todo.findByIdAndDelete(todo_id).then(result => {
        // it will get executed only when the DB query is successful.
        res.status(200).json({data: result})
    }).catch(err => {
        // this will get executed if anthing goes wrong.
        res.status(500).json({data: err})
    })
}

const deleteMany = (req, res) => {
    const ids = req.body.delete_ids;
    if (!Array.isArray(ids)){
        return res.status(400).json({
            message: 'Invalid list of Ids to delete.'
        })
    }
    console.log(ids);
    // ? delete the todo if its _id is in ids_array; 
    Todo.deleteMany({
        _id: {
            $in: ids
        }
    }).then(result => {
        // it will get executed only when the DB query is successful.
        res.status(200).json({data: result})
    }).catch(err => {
        // this will get executed if anthing goes wrong.
        res.status(500).json({data: err})
    })
}

module.exports = {get, create, _delete, deleteMany};