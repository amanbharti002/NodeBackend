const  nodemailer = require('nodemailer')
const tranporter = nodemailer.createTransport({
    service:"gmail",
    host:"smtp.gmail.com",
    port:355,
    secure:false,
    auth:{
        user:"amanbharti822002@gmail.com",
        pass:"dfghjklkjhgfds"
    },
})
async function sendMail(to,subject,html){
    const info = await tranporter.sendMail({
        from:"amanbharti822002@gmail.com",
        to:to,
        subject:subject,
        html:html,
    })
    console.log("Message sent: %s",info.messageId);
}
module.exports = sendMail;