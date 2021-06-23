import {
  // eslint-disable-next-line
  getAction,
  // eslint-disable-next-line
  postAction,
  // eslint-disable-next-line
  httpAction,
  // eslint-disable-next-line
  putAction,
  // eslint-disable-next-line
  deleteAction,
  // eslint-disable-next-line
  patchAction,
  // eslint-disable-next-line
  exportAction,
  // eslint-disable-next-line
  http2Action
} from './manage'

const auth = params => getAction(`/auth/login/${params}`, {}) // 获取用户信息

const elevators = params => getAction('/brakes/elevator', params)

const getRecord = params => getAction('/brakes/record', params)

const brakesInvalid = params => putAction('/brakes/invalid', params)

const excel = params => exportAction('/brakes/elevator/export', params)

const removeTag = params => deleteAction('/elevator/tag', params)

export { auth, elevators, getRecord, brakesInvalid, excel, removeTag }
