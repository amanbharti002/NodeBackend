const nodemailer = require('nodemailer')
const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // Use `true` for port 465, `false` for all other ports
    auth: {
      user: "amanbharti822002@gmail.com",
      pass: "zniaqanklnmddony",
    },
  });


  async function sendMail(to,subject,text,html) {
    // send mail with defined transport object
   const info = await transporter.sendMail({
      from: "amanbharti822002@gmail.com", // sender address
      to: to, // list of receivers
      subject: subject, // Subject line
      //text: text, // plain text body
      html: html, // html body
    });
  
    console.log("Message sent: %s", info.messageId);
    // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
  }
  
module.exports = sendMail;