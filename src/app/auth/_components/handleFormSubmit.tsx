"use server";

const nodemailer = require("nodemailer");

const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault();
  const formData = new FormData(event.currentTarget);
  const requestBody = {
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    email: formData.get("email"),
    message: formData.get("message"),
  };

  const transporter = nodemailer.createTransport({
    port: 2525,
    host: "sandbox.smtp.mailtrap.io",
    auth: {
      user: "210d8d2c0e4767",
      pass: "ef747aa6ee75cb",
    },
    secure: true,
  });

  await new Promise((resolve, reject) => {
    transporter.verify(function (error: any, success: unknown) {
      if (error) {
        console.log(error);
        reject(error);
      } else {
        console.log("Server is ready to take our messages");
        resolve(success);
      }
    });
  });

  const mailData = {
    from: {
      name: `${requestBody.firstName} ${requestBody.lastName}`,
      address: "myEmail@gmail.com",
    },
    replyTo: requestBody.email,
    to: "recipient@gmail.com",
    subject: `form message`,
    text: requestBody.message,
    html: `${requestBody.message}`,
  };

  await new Promise((resolve, reject) => {
    // send mail
    transporter.sendMail(mailData, (err: any, info: unknown) => {
      if (err) {
        console.error(err);
        reject(err);
      } else {
        console.log(info);
        resolve(info);
      }
    });
  });

  console.log("Email sent successfully");
};

export default handleFormSubmit;
