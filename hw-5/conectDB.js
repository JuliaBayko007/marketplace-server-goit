const mongoose = require('mongoose');
const connect = () => {
    mongoose.connect('mongodb+srv://Yulya:tel.0504686058@cluster0-boky5.mongodb.net/test?retryWrites=true', {useNewUrlParser: true});
    const db = mongoose.connection;
    db.on('error', () => {
        console.log('error connect db');

    });
    db.once('open', () => {
        console.log('connect db');
    })
}
module.exports = connect;