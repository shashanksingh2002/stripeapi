const { MongoClient } = require('mongodb');
const { hashPassword, cmpHashedPassword } = require('../src/bcrypt');

const uri = process.env.MONGO_URL;
const dbName = 'richpanel';
let db = null;
let useremail = null;

const isEmailInDb = (Email) => {
    return db.collection('users')
    .findOne({email:Email})
    .then(found => {
        if(found){
            return true;
        }
        else{
            return false;
        }
    })
    .catch(err => {
        console.error(err);
        throw err;
    })
}
module.exports = {
    connectToDb:(cb) => {
        //connect to the database
        MongoClient.connect(uri)
        .then(client => {
            db = client.db(dbName);
            cb();
        })
        .catch(err => cb(err));
    },
    isEmailInDb,
    insertUserData:async(body) => {
        //check if user is already present in database
        const checkEmailInDb = await isEmailInDb(body.email);
        if(checkEmailInDb){
            return checkEmailInDb;
        }
        //if user not present encrypt the password and add the user
        body.password = await hashPassword(body.password);
        return db.collection('users')
        .insertOne(body)
        .then(data => {
            return {
                "dbAck": data,
            };
        })
        .catch(err => {
            console.error(err);
            throw err;
        })
    },
    loginUser: (body) => {
        let user = [];
        return db.collection('users')
        .find({email:body.email})
        .forEach(d => user.push(d))
        .then(async () => {
            const cmpPassword = await cmpHashedPassword(body.password,user[0].password);
            if(cmpPassword){
                return db.collection('users')
                .updateOne({email:body.email},{$set:{isLoggedIn:true}})
                .then(data => {
                    useremail = body.email;
                    return data;
                })
                .catch(err => err);
            }
            else{
                return false;
            }
        })
    },
    getSubscription: (req,res) => {
        let data = [];
        return db.collection('subscription')
        .find({plantype:req.body.plan})
        .forEach(d => data.push(d))
        .then(() => {
            return res.json({"data":data})
        })
        .catch(err => console.error(err));
    },
    updateUserTransaction: (transaction,plan,type) => {
        const data = {
            id: transaction.id,
            amount: transaction.amount_total,
            plan:plan,
            type:type
        };
        return db.collection('users')
        .updateOne({email:useremail},{$push:{subscription:data}})
        .then(data => data)
        .catch(err => err);
    },
    getTransactionData: (res) => {
        let arr = [];
        return db.collection('users')
        .find({email:useremail})
        .forEach(d => arr.push(d.subscription))
        .then(() => {
            return res.json(arr[0][arr[0].length-1]);
        })
        .catch(err => console.error(err));
    },
    deleteTransaction: (id) => {
        return db.collection('users')
        .updateOne({email:useremail},{$pull:{subscription:{id:id}}})
        .then(d => d)
        .catch(err => err)
    }
}
