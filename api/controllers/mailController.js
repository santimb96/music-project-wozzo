import nodemailer from 'nodemailer';

const sendEmail = (user, token) => new Promise((resolve, reject) => {

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'pruebas.programacion.daw@gmail.com',
      pass: 'myajaozmuwsxiwqz'
    }
  });
  
  const mailOptions = {
    from: 'pruebas.programacion.daw@gmail.com',
    to: user?.email,
    subject: `¡Bienvenido a Spoticlone, ${user?.name}!`,
    text: `¡Bienvenido a Spoticlone, la plataforma de música preferida por todos! Por favor, verifica tu correo en el siguiente enlace: https://music-project-wozzo-santimb96.vercel.app/verify/${token}`
  };
  
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
      reject(error);
    } else {
      console.log('Email sent: ' + info.response);
      resolve('Enviado!');
    }
  }); 
});



export default sendEmail;