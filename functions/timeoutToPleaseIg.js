const timeoutToPleaseIg = (time) => {
	return new Promise( (resolve, reject) => {
		try {
			setTimeout( () => { resolve(true) }, time)
		} catch (error) {
			reject(error)
		}
	})
}

module.exports = timeoutToPleaseIg
