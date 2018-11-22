import React from 'react';
import './index.scss'
import User from 'service/user-service.jsx'
import MUtil from 'util/mm.jsx' // 通过service和util这些封装的方法 把请求  数据这些与视图 业务逻辑这些分开
// import PageTitle from 'component/page-title/index.jsx'

const _mm = new MUtil()
const _user = new User()
class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: '',
      redirect: _mm.getUrlParam('redirect') || '/' // redirect相当于路径中的参数名 路径中/login？redirect='url'需要取得这个url作为登录成功的重定向参数
    }
    this.onChange = this.onChange.bind(this)
  }

  componentWillMount() {
    document.title = `登录 - HAPPY MALL`
  }

  onChange (e) {
    const target =  e.target
    this.setState({
      [target.name]: target.value
    })
  }

  onSubmit (e) {
    let loginInfo= {
      username: this.state.username,
      password: this.state.password
    },
    checkResult = _user.checkLoginInfo(loginInfo);
    if (checkResult.status) {
      _user.login(loginInfo).then((res) => {
        _mm.setStorage('userInfo', res)
        // react-router的history对象
        this.props.history.push(this.state.redirect)
      }, (errMsg) => {
        _mm.errorTips(errMsg)
      })
    } else {
      _mm.errorTips(checkResult.msg)
    }
  }
  
  onKeyUp(e) {
    if(e.keyCode === 13) {
      this.onSubmit(e)
    }
  }

  render() {
    return (
        <div className="col-md-4 col-md-offset-4">
          <div className="panel panel-default login-panel">
            <div className="panel-heading">欢迎登录 - MMALL管理系统</div>
            <div className="panel-body">
              <div>
                <div className="form-group">
                  <label htmlFor="name">用户名</label>
                  <input type="text" className="form-control" id="name" name="username" value={this.state.username} placeholder="请输入用户名" onChange={this.onChange} onKeyUp={e => this.onKeyUp(e)}/>
                </div>
                <div className="form-group">
                  <label htmlFor="password">密码</label>
                  <input type="password" className="form-control" id="password" name="password" value={this.state.password} placeholder="请输入密码" onChange={this.onChange} onKeyUp={e => this.onKeyUp(e)}/>
                </div>
                <button className="btn btn-lg btn-primary btn-block" onClick={e => this.onSubmit(e)}>登录</button>
              </div>
        </div>
          </div>
        </div>
    )
  }
}

export default Login;