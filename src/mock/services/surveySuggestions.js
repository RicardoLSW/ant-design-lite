import Mock from 'mockjs'
import { builder, getQueryParameters } from '../util'

const toBeProcessList = options => {
  console.log(options)
  const totalCount = 1111
  const result = []
  const parameters = getQueryParameters(options)
  const pageSize = parseInt(parameters.pageSize)
  const pageNo = parseInt(parameters.pageNo)
  const totalPage = Math.ceil(totalCount / pageSize)
  const key = (pageNo - 1) * pageSize
  const next = (pageNo >= totalPage ? totalCount % pageSize : pageSize) + 1
  for (let i = 1; i < next; i++) {
    const tmpKey = key + i
    result.push({
      id: tmpKey,
      key: tmpKey,
      bismt: Mock.mock('@ctitle(3, 5)'),
      eleType: Mock.mock('@ctitle(3, 5)'),
      requestName: Mock.mock('@ctitle(3, 5)'),
      mntContractNo: Mock.mock('@ctitle(3, 5)'),
      contractCategoryMean: Mock.mock('@ctitle(3, 5)'),
      customerName: Mock.mock('@ctitle(3, 5)'),
      projectName: Mock.mock('@ctitle(3, 5)'),
      mntStation: Mock.mock('@ctitle(3, 5)'),
      mntUnit: Mock.mock('@ctitle(3, 5)'),
      surveyorName: Mock.mock('@ctitle(3, 5)'),
      repairStartYears: Mock.mock('@ctitle(3, 5)'),
      repairStartDate: Mock.mock('@ctitle(3, 5)'),
      pushFrequency: Mock.mock('@ctitle(3, 5)'),
      repairPushDate: Mock.mock('@ctitle(3, 5)'),
      thisYearPushMean: Mock.mock('@ctitle(3, 5)'),
      dealer: Mock.mock('@ctitle(3, 5)'),
      pushResultMean: Mock.mock('@ctitle(3, 5)'),
      pushStatusMean: Mock.mock('@ctitle(3, 5)'),
      pushRemark: Mock.mock('@ctitle(3, 5)')
    })
  }

  return builder({
    pageSize: pageSize,
    pageNo: pageNo,
    totalCount: totalCount,
    totalPage: totalPage,
    data: result
  })
}

const userList = options => {
  const totalCount = 1111
  const result = []
  const parameters = getQueryParameters(options)
  const pageSize = parseInt(parameters.pageSize)
  const pageNo = parseInt(parameters.pageNo)
  const totalPage = Math.ceil(totalCount / pageSize)
  const key = (pageNo - 1) * pageSize
  const next = (pageNo >= totalPage ? totalCount % pageSize : pageSize) + 1
  for (let i = 1; i < next; i++) {
    const tmpKey = key + i
    result.push({
      id: tmpKey,
      key: tmpKey,
      code: Mock.mock('@string("number", 5)'),
      name: Mock.mock('@cname')
    })
  }

  return builder({
    pageSize: pageSize,
    pageNo: pageNo,
    totalCount: totalCount,
    totalPage: totalPage,
    data: result
  })
}

Mock.mock(/\/to-be-process-list/, 'get', toBeProcessList)
Mock.mock(/\/user-list/, 'get', userList)
