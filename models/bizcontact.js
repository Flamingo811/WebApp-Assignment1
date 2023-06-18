/*
        File Name: WebApp Assignment2
        Student Name: Ka Wah Lau
        Student ID: 301255100
        Date: 18-June-2023
*/

    const mongoose = require('mongoose');
    const Schema = mongoose.Schema;
    
    const userSchema = new Schema({
        contactName: String,
        contactPhone: String,
        email: String,
    });
    
    const Contact = mongoose.model('Contact', userSchema);
    
    module.exports = Contact;