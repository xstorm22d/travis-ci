const express = require('express');
const router = express.Router();

const config = require('../config');
const ejs = require('ejs');
const fs = require('fs');
const path = require('path');
const nodeMailer = require('nodemailer');

router.post('/', function (req, res) {
    const data = req.body;

    console.log(data);

    const htmlString = ejs.render(
        fs.readFileSync(path.join(__dirname, '../view/order-info.ejs')).toString(), {
            name: data.name,
            sname: data.sname,
            fsPhone: '123456789'
        });

    const clientMailHtml = ejs.render(
        fs.readFileSync(path.join(__dirname, '../view/order-client-nodestart.ejs')).toString(), {
            name: data.name,
            sname: data.sname,
            fsPhone: '123456789'
        });

    const transporter = nodeMailer.createTransport({
        service: 'yandex',
        auth: config.mailAuthN
    });

    const clientMailOptions = {
        from: `Front-end Science <${config.email}>`, // sender address
        to: data.email, // receiver
        subject: 'Subject Node.js', // Subject line
        html: clientMailHtml,
        attachments: [
            {
                filename: 'logo.png',
                path: './mail-static/logo.png',
                cid: 'mail@logo.png'
            },
            {
                filename: 'happy.gif',
                path: './mail-static/happy.gif',
                cid: 'mail@happy.gif'
            },
            {
                filename: 'footer.png',
                path: './mail-static/footer.png',
                cid: 'mail@footer.png'
            }
        ]
    };

    const mailOptions = {
        from: `Front-end Science <${config.email}>`, // sender address
        to: config.email, // receiver
        subject: 'Successfull registered', // Subject line
        html: htmlString
    };

    transporter.sendMail(clientMailOptions, error => {
        if (error) {
            console.log(error.message);

            return res.send('Error!');
        }

        console.log('Mail 1 sent!');
    });

    transporter.sendMail(mailOptions, error => {
        if (error) {
            console.log(error.message);

            return res.send('Error!');
        }

        console.log('Mail 2 sent!');
        // res.send('Mail sent!');
        res.redirect('/success');
    });

});

module.exports = router;
