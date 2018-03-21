var Mock = require('mockjs');
var result = {
  code: 1000,
  data: null,
  msg:""
};
module.exports = {
  login:Mock.mock({
      'code':200,
      'data': {
          'id': 1,
          'name':"zeke",
          'tel':'13522610000'
      },
      'msg':''
  })
}