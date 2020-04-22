const MongoClient = require('mongodb').MongoClient;
const assert = require('assert')
const uri = "mongodb+srv://DangerHan:E.han6176@warden-1wrow.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
});

const companies = require('./data/companies.json')

const batchImport = async () => {
    try {
        await client.connect();
        const db = client.db('Hover');
        const b = await db.collection('Companies').insertMany(companies);
        assert.equal(companies.length, b.insertedCount);
        console.log('company success')
    } catch (err) {
        console.log(err.stack);
    }
    
    client.close();
};

const batchImport = async () => {
    try {
        await client.connect();

        const db = client.db('Hover');
        
        const b = await db.collection('items').insertMany(items);
        assert.equal(items.length, b.insertedCount);
        console.log('company success')
    } catch (err) {
        console.log(err.stack);
    }
    client.close();
};

batchImport()