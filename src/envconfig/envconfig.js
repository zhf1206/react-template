/**
 * 全局配置文件
 */
let baseURL; 
let imgUrl = '//localhost:8001/img/';
if(process.env.NODE_ENV === 'development'){
  baseURL = '//localhost:3001';
}else{
  baseURL = '//localhost:9090';
}


export default {imgUrl, baseURL}