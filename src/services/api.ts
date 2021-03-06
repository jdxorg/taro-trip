/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-12 11:15:08
 * @LastEditTime: 2019-08-27 15:22:18
 * @LastEditors: dexiaojiang 289608944@qq.com
 */
import {ONLINE_HOST, ONLINE_HOST2, MOCK_HOST, RAP_HOST, ISMOCK} from '../config'

const MAIN_HOST = ISMOCK?MOCK_HOST:ONLINE_HOST

/** 
 * 请求的公共参数
 */
export const commonParame = {}

/**
 * 请求映射文件
 */
export const requestConfig = {
  loginUrl: `POST ${MAIN_HOST}/api/user/wechat-auth`, // 微信登录接口
  getLists: `GET ${MAIN_HOST}/japi/toh`, // 获取历史上的今天接口
  getHome: `GET ${ONLINE_HOST2}/mobile/home`
}