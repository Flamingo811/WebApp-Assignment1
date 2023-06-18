/*
        File Name: WebApp Assignment2
        Student Name: Ka Wah Lau
        Student ID: 301255100
        Date: 18-June-2023
*/
    const mongoose = require('mongoose');
    const Schema = mongoose.Schema;
    
    const userSchema = new Schema({
        username: String,
        password: String,
        email: String,
    });
    
    const User = mongoose.model('User', userSchema);
    
    module.exports = User;