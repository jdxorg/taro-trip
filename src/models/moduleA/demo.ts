/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-12 15:20:20
 * @LastEditTime: 2019-08-22 16:14:31
 * @LastEditors: Please set LastEditors
 */
import modelExtend from 'dva-model-extend'
import Api from '../../services';
import {model} from '../page'

const { getLists } = Api;
export default modelExtend(model, {
  namespace: 'demo',
  state: {
    data: [],
    key: '72eed010c976e448971655b56fc2324e',
    v: '1.0'
  },

  effects: {
    * getLists({ payload }, { select, call, put }) {
      const { key, v } = yield select(state => state.demo )

      const { error, result } = yield call(getLists, { 
        data:{
          key,
          v,
          ...payload
        }
      })
      if (!error) {
        yield put({
          type: 'updateState',
          payload: {
            data: result
          }
        })
      }
    }
  }
}) 
