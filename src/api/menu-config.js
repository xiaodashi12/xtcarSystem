module.exports = [{
  name: '用户中心',
  id: 'userCenter',
  sub: [{
    name: '员工列表',
    componentName: 'userlist'
  }, {
    name: '签约列表',
    componentName: 'hislist'
  }, {
    name: '渠道列表',
    componentName: 'channellist'
  }, {
    name: '查找用户车',
    componentName: 'findCustomer'
  }, {
    name: '获取redis值',
    componentName: 'findRedis'
  }, {
    name: '客户列表',
    componentName: 'customerList'
  }]
}, {
  name: 'Form',
  id: 'form',
  sub: [{
    name: 'BasicRadio',
    componentName: 'BasicRadio'
  }, {
    name: 'BasicCheckbox',
    componentName: 'BasicCheckbox'
  }]
}]
