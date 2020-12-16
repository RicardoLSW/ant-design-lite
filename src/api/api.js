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
} from '@/api/manage'

const toBeProcessList = params => getAction('/to-be-process-list', params)
const userList = params => getAction('/user-list', params)

export { toBeProcessList, userList }
