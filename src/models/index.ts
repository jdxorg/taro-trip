/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-12 14:37:34
 * @LastEditTime: 2019-08-22 16:02:50
 * @LastEditors: Please set LastEditors
 */
/**
 * 注意：如果小程序分包 ，model如果 在子包里 则会加载失败
 */
import app from './app'
import index from './main/index'
import loginModel from './moduleA/login'
import demoModel from './moduleA/demo'

export default [
  app,
  index,
  demoModel,
  loginModel
]


