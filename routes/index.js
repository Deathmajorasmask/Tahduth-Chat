const { randomizePersonal } = require('./resources');
module.exports = {
    loginUserPage: (req, res) => {
        res.render('login.ejs', {
            title: "Welcome to Tahduth",
            message: ''
        });
    },
    ////////////////////////////////////////

    loginUser: (req, res) => {
        let State = '1';
        //Variable to Signup
        let idUsers = randomizePersonal('50')
        let SUuser = req.body.SUuser;
        let SUpass = req.body.SUpass;
        let SUemail = req.body.SUemail;
        var auxGroupExist;
        let SUcomment = ' ';
        if (SUuser != null && SUpass != null && SUemail != null) {
            let uploadedFile = req.files.SUimage;
            let image_name = uploadedFile.name;
            let fileExtension = uploadedFile.mimetype.split('/')[1];
            image_name = SUuser + '.' + fileExtension;
            let SUusernameQuery = "SELECT * FROM `users` WHERE UEmail = '" + SUemail + "'";
            client.query(SUusernameQuery, (err, result) => {
                if (err) {
                    return res.status(500).send(err);
                }
                if (result.length > 0) {
                    message = 'User already exists';
                    res.render('login.ejs', {
                        message,
                        title: "Welcome to Tahduth"
                    });
                } else {
                    // check the filetype before uploading it
                    if (uploadedFile.mimetype === 'image/png' || uploadedFile.mimetype === 'image/jpeg' || uploadedFile.mimetype === 'image/gif') {
                        // upload the file to the /public/assets/img directory
                        uploadedFile.mv(`public/assets/img/${image_name}`, (err) => {
                            if (err) {
                                return res.status(500).send(err);
                            }
                            // send the player's details to the database
                            let query = "INSERT INTO `users` (idUsers, UName, UPassword, UState, UPhoto, UCom, UEmail) VALUES ('" +
                                idUsers + "', '" + SUuser + "', '" + SUpass + "', '" + State + "', '" + image_name + "', '" + SUcomment + "', '" + SUemail + "')";
                            client.query(query, (err, addresult) => {
                                if (err) {
                                    return res.status(500).send(err);
                                }
                                //res.redirect('/');
                            });

                            client.query(SUusernameQuery, (err, result) => {
                                if (err) {
                                    return res.status(500).send(err);
                                }
                                session = result[0];
                            });


                            //Aqui deberia renderizar el login
                            query = "SELECT * FROM `users` "; // query database to get all the players
                            // execute query
                            client.query(query, (err, resultAux) => {
                                if (err) {
                                    res.redirect('/');
                                }
                                console.log("Se a conectado un nuevo usuario " + session.idUsers);
                                res.render('chat.ejs', {
                                    title: "Welcome to Tahduth | Chat",
                                    myGroups: auxGroupExist,
                                    friends: resultAux,
                                    myIdUser: session
                                });
                            });
                            /////
                        });
                    } else {
                        message = "Invalid File format. Only 'gif', 'jpeg' and 'png' images are allowed.";
                        res.render('login.ejs', {
                            message,
                            title: "Welcome to Tahduth | Add a new user"
                        });
                    }
                }
            });
        }

        //Variable to Login
        let pass = req.body.pass;
        let email = req.body.email;
        var resultGroupExist;
        let usernameQuery = "SELECT * FROM `users` WHERE UEmail = '" + email + "' AND UPassword = '" + pass + "'";
        if (pass != null && email != null) {
            client.query(usernameQuery, (err, result) => {
                if (err) {
                    return res.status(500).send(err);
                }
                if (result.length <= 0) {
                    message = 'Unregistered user';
                    res.render('login.ejs', {
                        message,
                        title: "Welcome to Tahduth | Login"
                    });
                } else {
                    session = result[0];
                    let queryGroupExist = "SELECT chat_group.CGNameGroup, chat_group.idChat_Group, chat_group_members.CGMidUsers FROM chat_group " +
                        "INNER JOIN chat_group_members ON chat_group.idChat_Group = chat_group_members.CGMidChat where chat_group_members.CGMidUsers = '" +
                        session.idUsers + "'";

                    client.query(queryGroupExist, (err, resultGroup) => {
                        if (err) {
                            return res.status(500).send(err);
                        }
                        resultGroupExist = resultGroup;
                    });


                    //Aqui deberia renderizar el login
                    query = "SELECT * FROM `users` "; // query database to get all the players

                    // execute query
                    client.query(query, (err, resultAux) => {
                        if (err) {
                            res.redirect('/');
                        }

                        console.log("Se a conectado un nuevo usuario " + session.idUsers);
                        console.log(result[0]);
                        res.render('chat.ejs', {
                            title: "Welcome to Tahduth | Chat",
                            myGroups: resultGroupExist,
                            friends: resultAux,
                            myIdUser: result[0]
                        });
                    });

                }
            });
        }

    },
    //////////////////////////////////
};