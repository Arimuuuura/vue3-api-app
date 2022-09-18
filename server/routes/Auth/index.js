const request = require('request-promise');


require('dotenv').config()

const APP_URL = process.env.APP_URL;
const APP_ID = process.env.APP_ID;
const SECRET_ID = process.env.SECRET_ID;
const ACCESS_TOKEN_REQUEST_URL = process.env.ACCESS_TOKEN_REQUEST_URL;

const getAccessToken = async (code) => {
	const options = {
		url: ACCESS_TOKEN_REQUEST_URL,
		method: 'POST',
		headers: {
			'Content-type': 'application/json',
			'User-Agent': 'request'
		},
		json: true,
		qs: {
			grant_type: 'authorization_code',
			client_id: APP_ID,
			client_secret: SECRET_ID,
			code: code,
			redirect_uri: APP_URL,
		}
	};

	return await request(options, (error, response, body) => {
		if (error) {
			console.error("error", error);
			throw Error('error...')
		}

		if(body.error) {
			console.error("error", body.error);
			throw Error(body.error_description)
		}
	}).then((body) => {
		return {
			access_token: body.access_token,
			refresh_token: body.refresh_token,
			token_type: body.token_type,
			expires_in: body.expires_in,
			scope: body.scope,
		};
	});
}

module.exports = getAccessToken;
