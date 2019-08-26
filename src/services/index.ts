/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-12 11:52:43
 * @LastEditTime: 2019-08-15 17:56:48
 * @LastEditors: Please set LastEditors
 */
import { requestConfig } from './api'
import Request from '../utils/request';

const apiLists = {}

/**
 *
 * @static 抛出整个项目的api方法
 * @returns
 * @memberof Request
 */
const getApiList = (config) => {
  if (!Object.keys(config).length) {return {}}

  Object.keys(config).forEach((key) => {
    const option = gen(config[key])
    apiLists[key] = Request.creatRequests(option)
  })

  return apiLists
}
const gen = (params:string): any  => {
  let url = params;
  let method = 'GET';

  const paramsArray = params.split(' ');
  if (paramsArray.length === 2) {
    method = paramsArray[0];
    url = paramsArray[1];
  }
  return {url, method}
}

// 导出
const Api = getApiList(requestConfig)

export default Api as any