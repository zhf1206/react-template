import axios from 'axios';
import qs from 'qs';
import md5 from 'js-md5';
import Promise from 'es6-promise';
import envConfig from '../envconfig/envconfig';
Promise.polyfill();

let Base64 = require('js-base64').Base64;

// axios 配置
axios.defaults.timeout = 300000;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
axios.defaults.baseURL = envConfig.baseURL;

// POST传参序列化
axios.interceptors.request.use((config) => {
  // let device = {type: '', deviceModel: '', deviceName: ''};
  if(!config.data) {
    return config;
  }
  if(config.data&&config.data["formFile"]) {
    let param = new FormData();
    param.append('file', config.data["formFile"]);
    config.data = param;
    return config;
  }
  if(config.data&&config.data["file"]) {
    return config;
  }
  config.data.sign = getSign(config.data);
  config.data = Object.assign({}, config.data);
  if (config.method === 'post') {
    config.data = qs.stringify(config.data);
  }
  return config;
}, (error) => {
  console.log('请求参数错误');
  return Promise.reject(error);
});

// 返回状态判断
axios.interceptors.response.use((res) => {
  // let baseData = res.data.data?JSON.parse(Base64.decode(res.data.data)):"";
  // res.data.data = baseData;
  if (res.data.code === 200) {
    return res;
  }
  if (res.data.code === 300) {
    //登录过期
  }
  console.log(res.data.msg);
  return Promise.reject(res);
}, (error) => {
  // 提示
  console.log("返回错误："+error.message);
  return Promise.reject(error);
});

function parseParam(param, key) {
  let paramStr="";
  if(typeof (param) === "string" || typeof (param) === "number" || typeof (param) === "boolean") {
    paramStr+="&" + key + "=" + param;
  } else {
    for(let i in param) {
      var k=key==null?i:key+(param instanceof Array ? "["+i+"]" : "."+i);
      paramStr += '&'+parseParam(param[i], k);
    }
  }
  return paramStr.substr(1);
};

function getSign(param, key) {
  let url = parseParam(param);
  let urlStr = url.split("&").sort().join("&");
  let urlParam = urlStr.split("&");
  let newStr = "";
  for(let i = 0; i < urlParam.length; i++) {
    newStr += urlParam[i].split("=")[1];
  }
  return md5(newStr);
}

function checkStatus (response) {
  // loading
  // 如果http状态码正常，则直接返回数据
  if (response && (response.status === 200 || response.status === 304 || response.status === 400)) {
    return response;
    // 如果不需要除了data之外的数据，可以直接 return response.data
  }
  // 异常状态下，把错误信息返回去
  return {
    status: -404,
    msg: '网络异常'
  };
}

function checkCode (res) {
  // 如果code异常(这里已经包括网络错误，服务器错误，后端抛出的错误)，可以弹出一个错误提示，告诉用户
  if (res.status === -404) {
    console.log(res.msg);
  }
  if (res.data && (!res.data.success)) {
    console.log(res.data.error_msg);
  }
  return res;
}

export default class Server {
  get(url, params, options) {
    var option = {
      isLoading: true
    };
    options = Object.assign(option, options);
    return new Promise((resolve, reject) => {
      // if(options.isLoading) loading(true);
      axios.get(url, params, options)
        .then(response => {
          // if(options.isLoading) loading(false);
          resolve(response.data);
        }, (err) => {
          // if(options.isLoading) loading(false);
          reject(err);
        })
        .catch((error) => {
          // if(options.isLoading) loading(false);
          reject(error);
        });
    });
  };
  post(url, params, options) {
    var option = {
      isLoading: true
    };
    options = Object.assign(option, options);
    return new Promise((resolve, reject) => {
      // if(options.isLoading) loading(true);
      axios.post(url, params, options)
        .then(response => {
          // if(options.isLoading) loading(false);
          resolve(response.data);
        }, (err) => {
          // if(options.isLoading) loading(false);
          reject(err);
        })
        .catch((error) => {
          // if(options.isLoading) loading(false);
          reject(error);
        });
    });
  };
};