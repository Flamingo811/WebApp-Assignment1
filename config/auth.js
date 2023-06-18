/*
        File Name: WebApp Assignment2
        Student Name: Ka Wah Lau
        Student ID: 301255100
        Date: 18-June-2023
*/

    module.exports = {
        ensureAuthenticated: (req, res, next) => {
            if (req.isAuthenticated()) {
                return next();
            }
            // Redirect to login page if not authenticated
            res.redirect('/login');
        },
    
        forwardAuthenticated: (req, res, next) => {
            if (!req.isAuthenticated()) {
              return next();
            }
            // Redirect to business contact page if already authenticated
            res.redirect('/bizcontact');
        },
    };