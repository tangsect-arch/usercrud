const sql = require("../config/db")();
const User = function(user) {
    this.user_name = user.username;
    this.password = user.password;
    this.display_name = user.display_name;
    this.is_approved = user.is_approved;
    this.email_id = user.emailId;
    this.mobile_number = user.mobileNumber;
};

const Customer = function(customer) {
    this.username = user.username;
    this.email_id = user.emailId;
    this.mobile_number = user.mobileNumber;
    this.age = Math.floor((new Date() - new Date(user.dob).getTime()) / 3.15576e+10);
    this.dob = user.dob;
    this.gender = user.gender;
    this.status = user.status;
};

const Employee = function(employee) {
    this.username = user.username;
    this.email_id = user.emailId;
    this.mobile_number = user.mobileNumber;
    this.age = Math.floor((new Date() - new Date(user.dob).getTime()) / 3.15576e+10);
    this.dob = user.dob;
    this.gender = user.gender;
    this.status = user.status;
};