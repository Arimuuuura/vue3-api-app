const getValueByQueryParameter = (paramKey, name) => {
  const param = name || location.search
  const nextStringNumber = 1
  const notExist = -1

  if (param.indexOf('&') === notExist) {
    if (param.indexOf(paramKey) === notExist) return

    return param.substring(param.indexOf('=') + nextStringNumber)
  } else {
    const codeParam = param
      .split('&')
      .find((parameter) => parameter.indexOf(paramKey) != notExist)
    return codeParam.substring(codeParam.indexOf('=') + nextStringNumber)
  }
}

export {getValueByQueryParameter}
