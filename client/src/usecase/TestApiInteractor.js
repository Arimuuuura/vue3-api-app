const callbackList = []

const registerCallback = (callback) => {
  if (!callbackList.includes(callback)) {
    callbackList.push(callback)
  }
}

const fetchRequest = async () => {
  for (const callback of callbackList) {
    if (callback.fetchRequest) {
      await callback.fetchRequest()
    }
  }
}

const fetchResponse = async ({val}) => {
  for (const callback of callbackList) {
    if (callback.fetchResponse) {
      await callback.fetchResponse({val})
    }
  }
}

export {registerCallback, fetchRequest, fetchResponse}
