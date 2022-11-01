/* list.js Tse Hoi Cheung 301234975 31CT2022--> */

let mongoose = require("mongoose");

// create a model class
let listModel = mongoose.Schema({
    contactName: String,
    contactNumber: String,
    emailAddress: String
},
{
    collection: "lists"
});

module.exports = mongoose.model("List", listModel);