const nodemailer=require('nodemailer')
const ejs=require('ejs')
const path=require('path')

let transporter=nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.google.com',
    port: 587,
    secure: false,
    auth: {
        user: '',
        pass: ''
    }
})

let renderTemaplate=async (data,relativePath)=>{
    let mailHTML
    try {
        let template=await ejs.renderFile(
            path.join(__dirname,'../view/mailers',relativePath),data
        )
        mailHTML=template
        return mailHTML
    } catch (err) {
        console.log(err);
        return
    }
}

module.exports={
    transporter: transporter,
    renderTemaplate: renderTemaplate
}