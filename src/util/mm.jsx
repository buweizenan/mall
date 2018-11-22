class MUtil {
  request(param) {
    return new Promise((resolve, reject) => {
      $.ajax({
        type: param.type || 'get',
        url: param.url || '',
        dataType: param.dataType || 'json',
        data: param.data || null,
        success: res => {
          // 数据请求成功
          if (0 === res.status) {
            typeof resolve === 'function' && resolve(res.data, res.msg)
          } else if (10 === res.status) {
            console.log('test')
          // 没有登录状态，强制登录
            this.doLogin()
          
          } else {
            typeof reject === 'function' && reject(res.msg || res.data)
          }
        },
        error: err => {
          typeof reject === 'function' && reject(err.statusText)
        }
      })
    })
 
  }  
  // 跳转登录 window.location.href='url' 在当前页面打开url页面
  doLogin() {
    window.location.href = `/login?redirect=${encodeURIComponent(window.location.pathname)}`
  }
  // 获取URL参数
  getUrlParam(name) {
    // param=123&param1=456
    let queryString = window.location.search.split('?')[1] || '',
    reg = new RegExp("(^|$)" + name + "=([^&]*)(&|$)"), // 根据name决定要取得路径中的哪个变量
    result = queryString.match(reg);
    // result: ['param=123', '', '123', '&]
    return result ? decodeURIComponent(result[2]) : null;
  }
  // 错误提示
  errorTips(errMssg) {
    alert(errMssg || '好像有什么地方不对~')
  }
  // 存入本地存储
  setStorage(name, data) {
    let dataType = typeof data
    if (dataType === 'object') {
      window.localStorage.setItem(name, JSON.stringify(data))
    } else if (['string', 'number', 'boolean'].includes(dataType)) {
      window.localStorage.setItem(name, data)
    } else {
      alert('本地存储不能存储的数据格式')
    }
  }
  // 去除本地存储
  getStorage(name) {
    let data = window.localStorage.getItem(name)
    if (data) {
      return JSON.parse(data)
    } else {
      return ''
    }
  }
  // 删除本地存储
  removeStorage(name) {
    window.localStorage.removeItem(name)
  }
}

export default MUtil