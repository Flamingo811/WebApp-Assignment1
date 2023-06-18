/*
        File Name: WebApp Assignment2
        Student Name: Ka Wah Lau
        Student ID: 301255100
        Date: 18-June-2023
*/

    const Contact = require('../models/bizcontact');

    // Get existing business contacts
    exports.getContacts = function(req, res) {
        Contact.find()
            .sort({ contactName: 'asc' })
            .then((contacts) => {
                res.render('bizcontact', { title: 'Business Contact', contacts: contacts });
            })
            .catch((err) => {
                console.log(err);
            });
    };
    
    // Call Add Business Contact page
    exports.addBizContact = function(req, res) {
        res.render("bizcontact_add", { title: "Add Business Contact" });
    }
    
    // Call method to add a new contact to MongoDB
    exports.addBizContactRecord = function (req, res) {
        const { contactName, contactPhone, email } = req.body;
      
        const newContact = new Contact({
            contactName: contactName,
            contactPhone: contactPhone,
            email: email
        });
    
        newContact.save()
        .then(() => {
            req.flash('success_msg', 'Contact added successfully');
            res.redirect('/bizcontact');
        })
        .catch((err) => {
            console.error('Error creating business contact:', err);
            req.flash('error_msg', 'Failed to add contact');
            res.redirect('/bizcontact');
        });
    };
    
    // Call Update Business Contact page
    exports.updateBizContact = function(req, res) {
        const contactId = req.params.id;
        Contact.findById(contactId)
        .then((contact) => {
            res.render("bizcontact_update", { title: "Update Business Contact", contact: contact });
        })
        .catch((err) => {
            console.log(err);
            res.redirect('/bizcontact');
        });
    }
    
    // Call method to update an existing contact to MongoDB
    exports.updateBizContactRecord = function (req, res) {
        const contactId = req.params.id;
        const { contactName, contactPhone, email } = req.body;
    
        Contact.findByIdAndUpdate(contactId, { contactName, contactPhone, email })
        .then(() => {
            res.redirect('/bizcontact');
        })
        .catch((err) => {
            console.error('Error updating business contact:', err);
            res.redirect('/bizcontact');
        });
    };
    
    // Delete a business contact
    exports.deleteBizcontact = function (req, res) {
        const contactId = req.params.id;
    
        Contact.findByIdAndDelete(contactId)
        .then(() => {
            res.redirect('/bizcontact');
        })
        .catch((err) => {
            console.error('Error deleting business contact:', err);
            res.redirect('/bizcontact');
        });
    };