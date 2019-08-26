/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-12 14:56:47
 * @LastEditTime: 2019-08-12 15:11:06
 * @LastEditors: Please set LastEditors
 */
import Taro from '@tarojs/taro'

export const setCacheDataS = (key: string, value: any) => {
  Taro.setStorageSync(key, value)
}

export const getCacheData = (key: string) => {
  return Taro.getStorageSync(key)
}

// 设置一个全局对象
const globalData: any = {}

export const setGlobalData = (key: string, val: any) => {
  globalData[key] = val
}

export const getGlobalData = (key: string) => {
  return globalData[key]
}

export default globalData