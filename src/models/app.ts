/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-12 14:49:19
 * @LastEditTime: 2019-08-22 15:48:59
 * @LastEditors: Please set LastEditors
 */
import modelExtend from 'dva-model-extend'
import { model } from './page'
import { getCacheData } from '../utils'
import { CURRENT_USER_KEY } from '../config'

const loginer = getCacheData(CURRENT_USER_KEY)

export default modelExtend(model, {
  namespace: 'app',
  state: {
    global: {},
    user: loginer,
    isConnected: true,
    networkType: ''
  },
  subscriptions: {
    
  },
  effects: {

  },
  reducers: {

  },
})

