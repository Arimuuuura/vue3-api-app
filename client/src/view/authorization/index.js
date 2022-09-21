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

export default getCode
