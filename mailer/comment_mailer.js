const nodeMailer = require('../configs/nodemailer')

exports.newComment = async (comment) => {
    console.log('Inside newcomment',comment.user.email);
    try {
        let mailInfo=await nodeMailer.transporter.sendMail({
            from: '',
            to: comment.user.email,
            subject: 'New Comment',
            html: '<h1>Comment added</h1>'
        })
        console.log(mailInfo);
    }
    catch (err) {
        console.log(err);
    }
}