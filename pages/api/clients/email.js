// import { SMTPClient } from 'emailjs';
 
 
export default function handler(req, res) {
    // require('dotenv').config()
    let nodemailer = require('nodemailer')
    const transporter = nodemailer.createTransport({
      port: 465,    
      host: "smtp.gmail.com",
         auth: {
              pass: process.env.PASSWORD,
              user: process.env.USER_NAME,
           },
      secure: true,
    });
    const mailData = {
        from: 'tayyaba.tahira98@gmail.com',
        to: req.body.email,
        subject: `Message From ${req.body.name}`,
        text: req.body.message + " | Sent from: " + req.body.email,
        html: `<div>${req.body.message}</div><p>Sent from: ${req.body.email}</p>`
    }
    transporter.sendMail(mailData, function (err, info) {
        if(err)
          console.log(err)
        else
          console.log(info);
    })
    console.log(req.body)
    res.send('success')
}