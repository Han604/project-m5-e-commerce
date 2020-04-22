const MongoClient = require('mongodb').MongoClient;
const assert = require('assert')
const uri = "mongodb+srv://<USERNAME>:<PASSWORD>@warden-1wrow.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
});

const updateStock = async (req, res) => {
    const currentCart = [];
    // Add the items in the array
    req.body.forEach((item) => {
        if (item.quantity !== 'undefined') currentCart.push(item);
        else
        res
            .status(404)
            .send({ type: 'Error', message: 'The quantity is not specified' });
    });

    await client.connect();
    const db = client.db('Hover');
    try {
    currentCart.forEach((item) => {
    // Checks if there's enough item in the inventory and that the quantity is bigger or equal to 0
        db.collection('Items').findOne({_id: item._id}, (err, result) => {
            console.log(result.numInStock)
            // If the condition is respected, remove the items from the inventory
            result.numInStock -= item.quantity
            console.log(result.numInStock)

            const query = {_id: item._id};
            const newValue = { $set: {numInStock: (result.numInStock)} };
            db.collection('Items').updateOne(query, newValue);
            console.log('ding')
            res.status(200).json({ status: 204, message: 'updated' });
        })
    }) 
    } catch (error) {
        console.log(error.stack);
        res.status(500).json({ status: 500, data: req.body, message: err.message });    
    }
    client.close()
}

const getProducts = async (req, res) => {
    await client.connect();
    // Declare the db
    const db = client.db('Hover');
    db.collection('Items')
        .find()
        .toArray((err, data) => {
            if (data) res.status(200).send(data);
            else client.close();
        });
}

const getCompanies = async (req, res) => {
    await client.connect();
    const db = client.db('Hover');

    db.collection('Companies')
        .find()
        .toArray((err, data) => {
            if (data) res.status(200).send(data);
            else client.close();
        });
}

const getCategories = async (req, res) => {
    let categories = [];
    console.log('ding')
    await client.connect();
    const db = client.db('Hover');

    db.collection('Items')
        .find()
        .toArray((err, data) => {
            if (data) {
                data.forEach((item) => {
                    if (!categories.includes(item.category)) categories.push(item.category);
                })
            }
            console.log(categories)
            res.status(200).send(categories)
        })
}

const searchHandler = async (req, res) => {
    await client.connect();
    const db = client.db('Hover')

    if (req.query.brand !== 'null' && req.query.category !== 'null') {
        db.collection('Items')
            .find()
            .toArray((err, items) =>{
                let copy = items.filter((product) => {
                    return (
                        product.category.toLowerCase() === req.query.category.toLowerCase() &&
                        parseInt(req.query.brand) === product.companyId
                    );
                });
                if (copy.length > 0) res.send(copy);
                else res.status(202).send({ type: 'error', message: 'No items!' });
            })
    } else if (req.query.brand !== 'null') {
        db.collection('Items')
            .find()
            .toArray((err, items) => {
                let copy = items.filter((product) => {
                    return parseInt(req.query.brand) === product.companyId});
                    if (copy.length > 0) res.send(copy);
                    else res.status(202).send({ type: 'error', message: 'No items!' });
            })
    } else if (req.query.category !== 'null') {
        db.collection('Items')
            .find()
            .toArray((err, items) => {
                let copy = items.filter((product) => {
                    return (
                        product.category.toLowerCase() === req.query.category.toLowerCase()
                    );
                });
                if (copy.length > 0) res.send(copy);
                else res.status(202).send({ type: 'error', message: 'No items!' });
            })
    }
}


module.exports = { searchHandler, getCategories, updateStock, getCompanies, getProducts };