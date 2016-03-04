module.exports = {
	app: {
		port: process.env.PORT || 3000
	},
	mongo: {
		connectionString: 'mongodb://user:useruser@ds017688.mlab.com:17688/crowdsourced-notes'
	},
	googleAuth: {
		clientID: '607757613805-2fp5edp6in5eij3m5k6h3d74073qlp36.apps.googleusercontent.com',
		clientSecret: 'JSOWlp5MF2q80ndtVyySad80',
		callbackURL: 'http://localhost:3000/auth/google/callback'
	}
};