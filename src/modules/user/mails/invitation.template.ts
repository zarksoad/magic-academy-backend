export const templateTestEmailWithToken = (token: string): string => {
  return `
      <!DOCTYPE html>
      <html lang="es">
      <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Email Test with Token</title>
      </head>
      <body style="font-family: Arial, sans-serif; text-align: center; color: #333; padding: 20px;">
          <h1 style="color: #181e4b;">Test Email with Token</h1>
          <p>Este es un correo de prueba para verificar el funcionamiento del sistema.</p>
          <p>Haz clic en el siguiente enlace para completar tu registro:</p>
          <a href="http://localhost:3002/api/register?token=${token}" style="display: inline-block; padding: 10px 20px; background-color: #181e4b; color: #fff; text-decoration: none; border-radius: 5px;">Completar Registro</a>
          <p>Gracias por usar nuestra plataforma.</p>
      </body>
      </html>
  `;
};
