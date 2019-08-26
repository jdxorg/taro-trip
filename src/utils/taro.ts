/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-12 14:18:35
 * @LastEditTime: 2019-08-12 14:24:38
 * @LastEditors: Please set LastEditors
 */
/**
 * 进行taro的处理 
 * 1.方法的改写
 * 2.utils的挂载
 */
import Taro, { Component } from '@tarojs/taro';

interface ShareOptions {
  title: string,
  path: string,
  imageUrl?: string
}

/**
 * navigateTo 超过8次之后 强行进行redirectTo 否则会造成页面卡死
 * 
 */
const nav = Taro.navigateTo
Taro.navigateTo = (data) => {
  if (Taro.getCurrentPages().length > 8) {
    return Taro.redirectTo(data)
  }
  return nav(data)
}


/**
 * Component挂载分享方法
 */
Component.prototype.onShareAppMessage = function (shareOption: ShareOptions = {
  title: '分享标题',
  path: '路径',
  imageUrl: ''
}): ShareOptions {
  return shareOption
}
