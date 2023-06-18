/*
        File Name: WebApp Assignment2
        Student Name: Ka Wah Lau
        Student ID: 301255100
        Date: 18-June-2023
*/

// Call Home page
exports.home = function (req, res){
    res.render("home", { title: "Home" })
};

// Call Projects page
exports.projects = function (req, res){
    res.render("projects", { title: "Projects" })
};

// Call About page
exports.about = function (req, res){
    res.render("about", { title: "About" })
};

// Call Services page
exports.services = function (req, res){
    res.render("services", { title: "Services" })
};

// Call Contact page
exports.contact = function (req, res){
    res.render("contact", { title: "Contact" })
};

// Call Login page
exports.login = function(req, res) {
    res.render("login", { title: "Login" });
}

// Call Logout page
exports.logout = function(req, res) {
    req.session.destroy(function(err) {
        if (err) {
            console.log(err);
        }
        res.redirect('/login');
    });
};