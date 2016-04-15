module.exports = {
  app: {
    port: process.env.PORT || 3000
  },
  mongo: {
    url: 'mongodb://user:notes@ds019960.mlab.com:19960/crowdsourcednotes'
  },
  googleAuth: {
    clientID: '607757613805-2fp5edp6in5eij3m5k6h3d74073qlp36.apps.googleusercontent.com',
    clientSecret: 'JSOWlp5MF2q80ndtVyySad80',
    callbackURL: 'http://localhost:3000/auth/google/callback'
  }
};