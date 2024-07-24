var MailMessage = require('./MailMessage');

/**
 * Email builder creates email messages for application. 
 */

class EmailBuilder {

    /**
     * Get signup message 
     */

    static getSignUpMessage(map) {

        var mailMsg = new MailMessage();

        mailMsg.subject = 'Hi' + map.firstName + ' you have been succefully registered!!';

        var msg = "";

        msg += "<HTML><BODY>";
        msg += "Registration is successful for ORS Project SunilOS";
        msg += "<H1>Hi! Greetings from SunilOS!</H1>";
        msg += "<P>Congratulations for registering on ORS! You can now access your ORS account online - anywhere, anytime and enjoy the flexibility to check the Marksheet Details.</P>";
        msg += "<P>Log in today at <a href='http://ors.SunilOS.com'>http://ors.SunilOS.com</a> with your following credentials:</P>";
        msg += "<P><B>Login Id : " + map.login + "<BR>"
            + " Password : " + map.password + "</B></p>";
        msg += "<P> As a security measure, we recommended that you change your password after you first log in.</p>";
        msg += "<p>For any assistance, please feel free to call us at +91 98273 60504 or 0731-4249244 helpline numbers.</p>";
        msg += "<p>You may also write to us at hrd@sunrays.co.in.</p>";
        msg += "<p>We assure you the best service at all times and look forward to a warm and long-standing association with you.</p>";
        msg += "<P><a href='http://www.SunilOS.com' >-RAYS (SunilOS) Technolgies</a></P>";
        msg += "</BODY></HTML>";

        mailMsg.message = msg;

        return mailMsg;
    }

    /**
     * Get forgot password message
     * @param {*} map 
     */
    static getForgetPasswordMessage(map) {

        var mailMsg = new MailMessage();

        mailMsg.subject = 'Hi' + map.firstName + ' your forgotten password';

        var msg = '';
        msg += "<HTML><BODY>";
        msg += "<H1>Your password is recovered !! "
            + map.firstName + " " + map.lastName + "</H1>";
        msg += "<P><B>To access account user Login Id : "
            + map.login + "<BR>" + " Password : "
            + map.password + "</B></p>";
        msg += "</BODY></HTML>";

        mailMsg.message = msg;

        return mailMsg;
    }

    /**
     * Get Changepassword message
     * @param {*} map 
     */
    static getChangePasswordMessage(map) {

        var mailMsg = new MailMessage();

        mailMsg.subject = 'Hi' + map.firstName + ' your password is changed!!';

        var msg = '';
        msg += "<HTML><BODY>";
        msg += "<H1>Your Password has been changed Successfully !! "
            + map.firstName + " " + map.lastName + "</H1>";

        msg += "<P><B>To access account user Login Id : "
            + map.login + "<BR>" + " Password : "
            + map.password + "</B></p>";
        msg += "</BODY></HTML>";

        mailMsg.message = msg;

        return mailMsg;
    }

}

//Export to module 
module.exports = EmailBuilder;
