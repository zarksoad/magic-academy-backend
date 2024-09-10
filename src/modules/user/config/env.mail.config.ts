export const EnvMailConfig = () => ({
  host: process.env.HOST_EMAIL,
  port: parseInt(process.env.PORT_EMAIL),
  secure: true,
  user: process.env.USER_EMAIL,
  pass: process.env.PASSWORD_EMAIL,
});
