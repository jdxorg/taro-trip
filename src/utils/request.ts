/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-12 11:17:59
 * @LastEditTime: 2019-08-16 13:39:32
 * @LastEditors: Please set LastEditors
 */
import Taro from '@tarojs/taro'
import Tips from './tips'
import { cloneDeep } from 'lodash';
import pathToRegexp from 'path-to-regexp';

declare type Methods = 'GET' | 'OPTIONS' | 'HEAD' | 'POST' | 'PUT' | 'DELETE' | 'TRACE' | 'CONNECT';
declare type Headers = { [key: string]: string };
interface Options {
  url: string;
  method?: Methods;
  host?: string;
  data?: object;
  header?: Headers;
}

export default class Request {
  // 导出的api对象
  static apiLists: { [key: string]: () => any; } = {}
  // token
  static token: string = ''

  
  static conbineOptions(opts, reqOpt: Options): Options {
    let { url } = opts
    const data = reqOpt.data
    const cloneData = cloneDeep(data||{});
    try {
      let domain = '';
      const urlMatch = url.match(/[a-zA-z]+:\/\/[^/]*/);
      if (urlMatch) {
        ;[domain] = urlMatch;
        url = url.slice(domain.length);
      }
  
      const match = pathToRegexp.parse(url);
      url = pathToRegexp.compile(url)(data);
 
      for (const item of match) {
        if (item instanceof Object && item.name in cloneData) {
          delete cloneData[item.name];
        }
      }
      url = domain + url;
    } catch (e) {
      console.log(e)
    }
    return {
      data: {...cloneData },
      method: opts.method || reqOpt.method || 'GET',
      url: `${url}`,
      header:reqOpt.header||{}
    }
  }

  static getToken() {
    !this.token && (this.token = Taro.getStorageSync('token'))
    return this.token
  }

  /**
   * 
   * @static request请求 基于 Taro.request
   * @param {Options} opts 
   */
  static async request(opts: Options) {
    // token不存在
    // if (!this.getToken()) { await this.login() }

    // token存在
    // let options = Object.assign(opts, { header: { 'token': this.getToken() } })

    //  Taro.request 请求
    const res = await Taro.request(opts)

    // 请求成功
    // if (res.data && res.data.code === 0 || res.data.succ === 0) { return res.data }
    if (res.data) { return res.data }

    // 请求错误
    const d = { ...res.data, err: (res.data && res.data.msg) || '网络错误～' }
    Tips.toast(d.err);
    throw new Error(d.err)
  }

  static creatRequests(opts:object){
    return async (data: Options) => {
      const _opts = this.conbineOptions(opts, data)
      let res
      try {
        res = await this.request(_opts)
      } catch (error) {
        console.log(error.err)
      }
      return res
    }
  }
}


