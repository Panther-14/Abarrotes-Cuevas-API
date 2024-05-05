const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

function sendEmail({ toEmail, subject, body }) {
  const msg = {
    to: toEmail,
    from: process.env.FROM_EMAIL,
    subject: subject,
    text: body,
  };
  console.log("Message:", msg);
  sgMail.send(msg)
    .then(() => {
      console.log('Email sent')
      return true;
    })
    .catch((error) => {
      console.error(error);

      if (error.response) {
        console.error(error.response.body)
      }
      return false;
    });
}

function sendBroadcastEmail({ toEmails, subject, body }) {
  const msg = {
    to: toEmails,
    from: process.env.FROM_EMAIL,
    subject: subject,
    text: body,
  };
  sgMail.sendMultiple(msg)
    .then(() => { return true;
      console.log('Email sent');
    }, error => {
      console.error(error);

      if (error.response) {
        console.error(error.response.body)
      }
      return false;
    });
}

module.exports = {
  sendEmail,
  sendBroadcastEmail
}