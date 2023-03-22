const {Housing} = require('../schemas/housing.schema');

const get = (req, res) => {
    Housing.find({}).then((result) => {
        // result -> apply some checks on this result to get it sorted according to categories. -> consuming my own server's bandwidth or computation power.
        return res.status(201).json({data:result})
    }).catch( err => res.status(501).json({error:err}))
}

const create = (req, res) => {
    const housingBody = req.body;
    const _housing = new Housing(housingBody)
    return _housing.save().then(result => {
        // it will get executed only when the DB query is successful.
        res.status(200).json({data: result})
    }).catch(err => {
        // this will get executed if anthing goes wrong.
        res.status(500).json({data: err})
    })
}

// aggregation Pipelines
// typical aggregation pipeline
// input --> match --> group --> sort --> output
// pipelines -> set of rules which helps us to modify our query and make our queries search efficient -> we will get filtered data as our output.
const getDelhi = (req, res) => {
    // match will help us filter our search on the basis of attribute.
    // group will help us to define the structure of our data.
    // which columns to include or leave.
    // perform operations on data itself 
    // operations -> sum, avg
    const pipeline = [{$match: {location:"Delhi"}}
    ,{$group:{_id: "$category", price : {$last : "$price"}, count : {$sum: 1}}}
    // _id -> group key
    // datacolumn : {accumulator: "$field"} // syntax
]
    Housing.aggregate(pipeline).then((result) => {
        return res.status(200).json({data: result})
    }).catch(err => res.status(500).json({data:err}))
}

module.exports = {get, create, getDelhi}