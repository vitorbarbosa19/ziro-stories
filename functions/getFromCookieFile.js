const getFromCookieFile = (cookieToRetrieve) => {
	const cookies = require('./cookies.js')
	const cookieRetrieved = cookies.filter( (cookie) => {
		return cookie.name === cookieToRetrieve
	})
	return cookieRetrieved.pop().value
}

module.exports = getFromCookieFile
