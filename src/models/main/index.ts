/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-12 15:20:20
 * @LastEditTime: 2019-09-12 11:21:55
 * @LastEditors: 289608944@qq.com
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
        data: {
          key: 'mini',
          ...payload
        }
      })
      if (result && result.data){
        yield put({
          type: 'updateState',
          payload: {
            data: result.data
          }
        })
      }
    }
  }
}) 