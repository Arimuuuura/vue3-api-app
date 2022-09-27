import {requestHttp, httpMethodType} from '@/api/ApiAggregator'
import {registerCallback, fetchResponse} from '@/usecase/TestApiInteractor'

const URL = '/'
const HTTP_STATUS_SUCCESS = 200

const testApiCallback = {
  fetchRequest: async () => {
    const payload = {
      method: httpMethodType.GET,
      url: URL,
      baseURL: 'http://localhost:5000',
      headers: {},
      params: {},
      data: {},
    }

    const {status, data} = await requestHttp(payload).catch((e) => {
      throw e
    })

    if (status === HTTP_STATUS_SUCCESS) {
      fetchResponse({
        val: data.val,
      })
    }
  },
}

const init = () => {
  registerCallback(testApiCallback)
}

export {init}
