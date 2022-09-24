const getCode = () => {
	const param = location.search
	const nextStringNumber = 1
	const notExist = -1

	if(param.indexOf('&') === notExist) {
		if(param.indexOf('code') === notExist) return

		return param.substring(param.indexOf('=') + nextStringNumber)
	} else {
		const codeParam = param.split('&').find((b) => b.indexOf('code') != notExist)
		return codeParam.substring(codeParam.indexOf('=') + nextStringNumber)
	}
}

const getBookmarkId = () => {
	const param = location.search
	const nextStringNumber = 1
	const notExist = -1

	if(param.indexOf('&') === notExist) {
		if(param.indexOf('bookmarkId') === notExist) return

		return param.substring(param.indexOf('=') + nextStringNumber)
	} else {
		const bookmarkIdParam = param.split('&').find((b) => b.indexOf('bookmarkId') != notExist)
		return bookmarkIdParam.substring(bookmarkIdParam.indexOf('=') + nextStringNumber)
	}
}

export {getCode, getBookmarkId}
