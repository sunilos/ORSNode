var formidable = require('formidable');
var fs = require('fs');

var BaseCtl = require("../controller/BaseCtl");
var EmailService = require('../utility/EmailService');
var MailMessage = require('../utility/MailMessage');
var EmailBuilder = require('../utility/EmailBuilder');
var User = require("../bean/User");
var Response = require("../bean/Response");
var ServiceLocator = require("../services/ServiceLocator");

/**
 * Contains User REST APIs.
 */
class UserCtl extends BaseCtl {

    constructor() {
        super();
        this.service = ServiceLocator.getUserService();
    }

    /**
     * Get preload data.
     * @param {*} request 
     * @param {*} response 
     */

    preload(request, response) {
        var roleService = ServiceLocator.getRoleService();
        roleService.search('', null, function (err, result) {
            response.json(result.list)
        })
    };

    /**
     * Authenticates a User. 
     * @param {*} request 
     * @param {*} response 
     */
    login(request, response) {
        var bean = this.getBean(request);
        this.service.authenticate(bean, function (err, result) {
            console.log(err);
            if (!err) {
                request.session.user = result;
                console.log("---->" + request.session.user);
            }
            var r = new Response(err, result);
            response.json(r);
        });
    }

    /**
     * Sends email of forgotten  password
     * @param {*} request 
     * @param {*} response 
     */
    forgotPassword(request, response) {
        this.service.findByLogin(request.body.login, function (err, user) {
            //console.log(user);
            if (!err) {
                //test code 
                var m = {
                    login: user.login,
                    password: user.password,
                    firstName: user.firstName,
                    lastName: user.lastName
                };

                var msg = EmailBuilder.getForgetPasswordMessage(m);
                msg.to = user.login;
                var ser = new EmailService()
                ser.sendEmail(msg, function (err, result) {
                    if (err) {
                        var r = new Response(err, result);
                        response.json(r);
                    } else {
                        var r = new Response(err, "Password has been sent to your registred email id");
                        response.json(r);
                    }
                });
            } else {
                var r = new Response(err, user);
                response.json(r);
            }
        });
    }

    /**
     * Changes user password
     * @param {*} req 
     * @param {*} res 
     */
    changePassword(req, res) {
        var u = {};
        u.id = req.session.user.id;//get user from session
        u.password = req.body.password;
        u.oldPassword = req.body.oldPassword;
        this.service.changePassword(u, function (err, result) {
            if (err) {
                res.json(new Response(err, result));
            } else {

                res.json(new Response(err, result));
            }
        });
    }

    /**
     * returns user profile data
     * @param {*} req 
     * @param {*} res 
     */
    myProfile(req, res) {
        var service = this.getService();
        var id = req.session.user.id; //get user from session
        service.findByPk(id, function (err, bean) {
            var r = new Response(err, bean);;
            res.json(r);
        });
    }

    /**
     * Destroys current session.
     * 
     * @param {*} request 
     * @param {*} response 
     */
    logout(request, response) {
        request.session.destroy();
        response.json(new Response(null, 'ok'));
    }

    /**
     * Returns menu items 
     * 
     * @param {*} request 
     * @param {*} response 
     */
    menu(request, response) {
        var bar = [];
        if (request.session.user) {
            bar =
                [
                    { text: 'User', link: '#!user' },
                    { text: 'Role', link: '#!role' },
                    { text: 'College', link: '#!college' },
                    { text: 'Student', link: '#!student' },
                    { text: 'Marksheet', link: '#!marksheet' }
                ]
        } else {
            bar =
                [
                    { text: 'Login', link: '#!login' }
                ]
        }
        var r = new Response(null, bar);
        response.json(r);
    }


    /**
     * Updates profile picture
     * 
     * @param {*} request 
     * @param {*} response 
     */
    profilePic(request, response) {

        console.log('...profilePic');
        var form = new formidable.IncomingForm();

        var self = this;

        form.parse(request, function (err, params, files) {

            //Parse multipart data
            console.log('id', params.id);
            console.log('file', files.pic);

            var pic = {
                id: params.id,
                data: fs.readFileSync(files.pic.path),
                type: files.pic.type,
                name: files.pic.name
            };

            self.service.updatePicture(pic, function (err, result) {
                var r = new Response(err, result);
                response.json(r);
            });
        });
    }

    /**
     * Gets profile picture
     * 
     * @param {*} request 
     * @param {*} response 
     */
    getPic(request, response) {
        var id = request.params.id;
        this.service.getPicture(id, function (err, pic) {
            if (err) {
                //If picture is not found then send default picture
                var rootPath = { root: '.' };
                response.sendFile('unknown.png', rootPath);
            } else {
                response.writeHead(200, { 'Content-Type': pic.type });
                response.write(pic.data);
                response.end();
            }
        })
    }

    /**
     * Returns bean of User controller.
     * @param {*} request 
     */
    getBean(request) {
        var user = new User();
        user.populateRequest(request.body);
        return user;
    };

    /**
     * Returns service of User controller.
     */
    getService() {
        return this.service;
    };
}
module.exports = UserCtl;
