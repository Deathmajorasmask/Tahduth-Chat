const nodemailer = require('nodemailer');
module.exports = {
    systemMailPage: (req, res) => {
        let userId = req.params.id;
        let query = "SELECT * FROM users WHERE idUsers = '" + userId + "';"
        client.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            console.log(result[0]);
            res.render('mail.ejs', {
                title: "Welcome to Tahduth | Messenger service",
                user: result[0],
                message: ''
            });
        });
    },

    systemMail: (req, res) => {
        let name = req.body.name;
        let mymail = req.body.mymail;
        let password = req.body.password;
        let tomail = req.body.tomail;
        let text = req.body.text;

        var transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: mymail,
                pass: password
            }
        });

        var mailOptions = {
            from: name,
            to: tomail,
            subject: 'prueba',
            text: text
        };

        transporter.sendMail(mailOptions, function(error, info) {
            if (error) {
                console.log(error);
                res.send(500, err.message);
            } else {
                console.log("Email sent");
                var result = {
                    name: name,
                    mymail: mymail,
                }
                res.render('mail.ejs', {
                    title: "Welcome to Tahduth | Messenger service",
                    user: result,
                    message: 'Message sent succesfully'
                });
                //res.status(200).jsonp(req.body);
            }
        });

        /////////////////////////////
    },

};