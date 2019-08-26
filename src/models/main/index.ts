/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-12 15:20:20
 * @LastEditTime: 2019-08-22 15:59:37
 * @LastEditors: Please set LastEditors
 */
import Api from '../../services';
import modelExtend from 'dva-model-extend'
import {model} from '../page'

const { getHome } = Api;
export default modelExtend(model, {
  namespace: 'index',
  state: {
    data: {},
  },

  effects: {
    * getHome({ payload }, { call, put }) {
      const result = yield call(getHome, { 
        data:{
          key:'mini',
          ...payload
        }
      })
      yield put({
        type: 'updateState',
        payload: {
          data: result
        }
      })
    }
  }
}) 