//Import Node Mailer module
var nodemailer = require('nodemailer');
var system = require('../system.js');
var MailMessage = require('./MailMessage');
var EmailBuilder = require('./EmailBuilder');

/**
 * EmailService class providing email services
 */

class EmailService {

    /**
     * Constructor of class
     */
    constructor() {
        console.log('--->' + system.mail.user);
        this.serverConfig = {
            service: system.mail.service,
            auth: {
                user: system.mail.user,
                pass: system.mail.password
            }
        }
    }

    /**
     * Send Email 
     * @param {*} mailMessage 
     * @param {*} callback reported by error or response 
     */
    sendEmail(mailMessage, callback) {
        var email = {
            from: system.mail.user,
            to: mailMessage.to,
            subject: mailMessage.subject,
            html: mailMessage.message
          };
        //Transporter to send email
        var transporter = nodemailer.createTransport(this.serverConfig);
        //Send email
        transporter.sendMail(email, function (error, info) {
            callback(error, info);
        });
    }
}

//Export to module 
module.exports = EmailService;

/*
//test code 
var m = { login: 'abc', password: 'pass', firstName: 'Ramlal', lastName: 'Sharma' };
var v = EmailBuilder.getChangePasswordMessage(m);

var msg = new MailMessage();
msg.to = 'sunilsahu007@gmail.com';
msg.subject ='Test message';
msg.message = v;

var ser = new EmailService()
ser.sendEmail(msg,function(err,result){
    console.log(err);
    console.log(result);
});
*/
