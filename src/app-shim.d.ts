/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-12 14:23:43
 * @LastEditTime: 2019-08-12 17:12:00
 * @LastEditors: Please set LastEditors
 */
/**
 *
 * @static 添加taro等自定义类型
 * @interface Component
 */
import Taro, { Component } from '@tarojs/taro'

// 在Component上定义自定义方法类型
declare module '@tarojs/taro' {
  interface Component {
    onShareAppMessage: any
  }
}

//声明
declare let require: any
declare let dispach: any