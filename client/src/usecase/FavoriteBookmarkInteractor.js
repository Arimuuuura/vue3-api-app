const callbackList = []

const registerCallback = (callback) => {
  if (!callbackList.includes(callback)) {
    callbackList.push(callback)
  }
}

const fetchRequest = async (code) => {
  for (const callback of callbackList) {
    if (callback.fetchRequest) {
      await callback.fetchRequest(code)
    }
  }
}

const fetchResponse = async ({items, summary}) => {
  for (const callback of callbackList) {
    if (callback.fetchResponse) {
      await callback.fetchResponse({items, summary})
    }
  }
}

const updateFavoriteRequest = async (action, code, id) => {
  for (const callback of callbackList) {
    if (callback.updateFavoriteRequest) {
      await callback.updateFavoriteRequest(action, code, id)
    }
  }
}
const updateResponse = async ({response}) => {
  for (const callback of callbackList) {
    if (callback.updateResponse) {
      await callback.updateResponse({response})
    }
  }
}

export {
  registerCallback,
  fetchRequest,
  fetchResponse,
  updateFavoriteRequest,
  updateResponse,
}
