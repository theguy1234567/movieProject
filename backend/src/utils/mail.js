import mailgen from "mailgen";

import nodemailer from "nodemailer";

const sendMail = async (options) => {
  const mailgenerator = new mailgen({
    theme: "default",
    product: {
      name: "Full stack project",
      link: "https://fullstacklink.com",
    },
  });
  const mailText = mailgenerator.generatePlaintext(options.mailgenContent);
  const mailHTML = mailgenerator.generate(options.mailgenContent);

  //sending mail
  const transporter = nodemailer.createTransport({
    host: process.env.MAILTRAP_HOST,
    port: process.env.MAILTRAP_PORT,
    auth: {
      user: process.env.MAILTRAP_USER,
      pass: process.env.MAILTRAP_PASS,
    },
  });

  const mail = {
    from: "mail.fullstack@example.com",
    to: options.email,
    subject: options.subject,
    text: mailText,
    html: mailHTML,
  };
  try {
    await transporter.sendMail(mail);
  } catch (error) {
    console.error(
      "Email service failed, make sure you provided mailtrap cred properly"
    );
    console.error("Error:", error);
  }
};

const verificationMail = (username, verificaitonURL) => {
  return {
    body: {
      name: username,
      intro: "welcome to our app!",
      action: {
        instructions: "to verify you email click on the button ",
        button: {
          color: "#22BC66",
          text: "verify you email",
          link: verificaitonURL,
        },
      },
      outro: "need help or have questions? just reply to this email ",
    },
  };
};

const forgotPasswordMail = (username, passwordresetURL) => {
  return {
    body: {
      name: username,
      intro: "WE got a request to reset you password",
      action: {
        instructions: "to reset  your passwor click on the button ",
        button: {
          color: "#22BC66",
          text: "Password reset",
          link: passwordresetURL,
        },
      },
      outro: "need help or have questions? just reply to this email ",
    },
  };
};

export { forgotPasswordMail, verificationMail, sendMail };
