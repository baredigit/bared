const { registerEmail, confirmEmail, sendEmail } = require('./controller')

module.exports = [
  {
    url: '/auth/register/email',
    method: 'POST',
    controller: registerEmail,
    public: true,
    description: 'Register a user with email, system will send an email with a confirmation link to target email address',
    params: {
      email: { type: 'string', required: true },
      password: { type: 'string', required: true }
    }
  },
  {
    url: '/auth/register/email-confirm',
    method: 'GET',
    controller: confirmEmail,
    public: true,
    description: 'Confirm email is valid by click the link send to the email address, this call will contains a token to valid user email address'
  },
  {
    url: '/email/send',
    method: 'POST',
    controller: sendEmail,
    public: true,
    description: 'Register a local user with username and password',
    params: {
      username: { type: 'string', required: true },
      password: { type: 'string', required: true }
    }
  }
]
