import nodemailer from "nodemailer";

export async function sendEmail(email: string, url: string) {
  const account = {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  };

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: account.user,
      pass: account.pass
    }
  });

  const mailOptions = {
    from: '"Confirmación email" <jesus.alu.ua@gmail.com>',
    to: email,
    subject: "Confirmación email",
    text: "Confirmación email",
    html: `<a href="${url}">Confirmar email</a>`
  };

  await transporter.sendMail(mailOptions);
}
