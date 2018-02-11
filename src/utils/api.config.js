/*
 * @Author: ecitlm
 * @Date: 2018-01-31 14:44:15
 * @Last Modified by: ecitlm
 * @Last Modified time: 2018-01-31 21:07:20
 */
import axios from 'axios'
import qs from 'qs'
import md5 from 'md5'
//axios.defaults.timeout = 5000;
//axios.defaults.baseURL = 'https://wxapp.it919.cn/?service=';
const DOMAIN = "https://wxapp.it919.cn/?service=";
const appkey = '6fc18957ce391f84a7ce34ce13cd99c4';

//POST传参序列化
axios.interceptors.request.use((config) => {
  if (config.method === 'post') {
    config.data = qs.stringify(config.data);
  }
  return config;
}, (error) => {
  console.log("错误的传参")
  return Promise.reject(error);
});


//获取sign
const getSign = (params) => {
  var params = params || {}
  params.appkey = appkey;
  for (let key in params) {
    if (!params[key]) {
      delete params[key];
    }
  }

  let keyArr = Object.keys(params).sort();
  let newObj = {};
  let Kstr = '';
  for (let i in keyArr) {
    newObj[keyArr[i]] = params[keyArr[i]];
    Kstr += params[keyArr[i]];
  }
  delete params['appkey'];
  return md5(Kstr);
};

/**
 *
 * POST 请求方式
 * @param {string} url     请求URL
 * @param {object} params  请求参数
 * @returns
 */
export default {
  //fetchPost  请求方式
  fetchPost: function (url, params) {
    var  params = params || {}
    params.timestamp = new Date().valueOf(); //将时间戳加入请求参数data里面
    params.sign = "";
    params.sign = getSign(params); //将签名加入参数里面
    return new Promise((resolve, reject) => {
      axios.post(DOMAIN + url, params)
        .then(response => {
          resolve(response.data);
        }, err => {
          reject(err);
        })
        .catch((error) => {
          reject(error)
        })
    })
  },

  //GET 请求方式
  fetchGet: function (url, params) {
    var params = params || {}
    params.timestamp = new Date().valueOf();
    params.sign = "";
    params.sign = getSign(params || {});
    return new Promise((resolve, reject) => {
      axios.get(DOMAIN + url, {
        params: params
      })
        .then(response => {
          resolve(response.data);
        }, err => {
          reject(err);
        })
        .catch((error) => {
          reject(error)
        });
    })

  }
}

