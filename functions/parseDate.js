const parseDate = (date) => {
	try {
		const month = date.slice(4,7)
		const day = date.slice(8,10)
		const year = date.slice(11,15)
		const hour = date.slice(16,18)
		const minute = date.slice(19,21)
		const second = date.slice(22,24)
		const timezone = parseInt(date.slice(30,31))
		let convertedMonth
		switch (month) {
			case 'Jan':
				convertedMonth = '01'
				break
			case 'Feb':
				convertedMonth = '02'
				break
			case 'Mar':
				convertedMonth = '03'
				break
			case 'Apr':
				convertedMonth = '04'
				break
			case 'May':
				convertedMonth = '05'
				break
			case 'Jun':
				convertedMonth = '06'
				break
			case 'Jul':
				convertedMonth = '07'
				break
			case 'Aug':
				convertedMonth = '08'
				break
			case 'Sep':
				convertedMonth = '09'
				break
			case 'Oct':
				convertedMonth = '10'
				break
			case 'Nov':
				convertedMonth = '11'
				break
			case 'Dec':
				convertedMonth = '12'
				break
		}
		// return parsed UTC date with appropriately shifted timezone
		return new Date(Date.parse(`${year}-${convertedMonth}-${day}T${hour}:${minute}:${second}.000Z`)
		+ 1000 * 60 * 60 * timezone)
	} catch (error) {
		return error
	}
}

module.exports = parseDate
