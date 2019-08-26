/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-12 15:20:20
 * @LastEditTime: 2019-08-22 11:21:48
 * @LastEditors: Please set LastEditors
 */
import modelExtend from 'dva-model-extend'
import { model } from '../page'
import { setCacheDataS } from '../../utils'
import { CURRENT_USER_KEY } from '../../config'

export default modelExtend(model, {
  namespace: 'loginModel',

  effects: {
    * login({ payload }, { select, call, put }) {
      yield put({
        type: 'app/updateState',
        payload: {
          user: payload.user
        }
      })
      setCacheDataS(CURRENT_USER_KEY,payload.user)
    }
  }
}) 