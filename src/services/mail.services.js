const nodemailer = require("nodemailer")
require("dotenv").config()
class MailServices{
    transporter
    constructor(){
          try {
            this.transporter = nodemailer.createTransport({
                host: process.env.SMTP_HOST,
                port: process.env.SMTP_PORT,
                secure: false, // true for 465, false for other ports
                auth: {
                  user: process.env.SMTP_USER,
                  pass: process.env.SMTP_PSW,
                },
              })
          } catch (exception) {
            throw {code:500, message:"Error connecting SMTP Server"}
          }
    }

    async sendEmail(to,sub,msg){
        try {
            let response = await this.transporter.sendMail({
                from: process.env.SMTP_FROM_ADDRESS,
                to: to,
                subject:sub,
                text: msg, // plain‑text body
                html: msg, // HTML body
              });
        } catch (exception) {
            throw{code:500, message:"Error Sending Email..."}
        }
    }
}

const mailSvc = new MailServices()
module.exports = mailSvc