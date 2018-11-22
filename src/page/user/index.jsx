import React from 'react';
import {Link} from 'react-router-dom'
import Statistic from 'service/statistic-service.jsx'
import MUtil from 'util/mm.jsx'
import User from 'service/user-service.jsx'

import PageTitle from 'component/page-title/index.jsx'
import Pagination from 'util/pagination/index.jsx'

const _user = new User()
const _mm = new MUtil()

class UserList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      list: [],
      pageNum : 1,
      firstLoading: true
    }
  }
  componentDidMount() {
    this.loadUserList()
  }

  loadUserList() {
    _user.getUserList(this.state.pageNum).then(res => { // this.setState(res) 相当于把res里的数据平铺进state，所以不想需要提前声明
      this.setState(res, () => {this.setState({firstLoading: false})})}, errMsg => {
        // this.setState({
        //   list: []
        // })
        _mm.errorTips(errMsg)
    })
  }

  onPageNumChange(pageNum) {
    this.setState({
      pageNum: pageNum
    }, () => {
      this.loadUserList()
    })
  }
  render () {
    let listBody = this.state.list.map((item, index) => {
      return (
        <tr key={index}>
          <td>{item.id}</td>
          <td>{item.username}</td>
          <td>{item.email}</td>
          <td>{item.phone}</td>
          <td>{new Date(item.createTime).toLocaleString()}</td>
        </tr>        
      )
    });
    let listError = (<tr><td colSpan="5">没有找到相应的结果~</td></tr>)
    let tableBoody = this.state.list.length > 0 ? listBody : listError 
    let tableLoding = (<tr><td colSpan="5">正在查询结果~</td></tr>)
    return (
      <div id="page-wrapper">
        <PageTitle title="用户列表" />
        <div className="row">
          <div className="col-md-12">
            <table className="table table-striped table-bordered">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>用户名</th>
                  <th>邮箱</th>
                  <th>手机号</th>
                  <th>创建时间</th>
                </tr>
              </thead>
              <tbody>
                {this.state.firstLoading ? tableLoding : tableBoody}
              </tbody>
            </table>
          </div>
        </div>
        <Pagination current={this.state.pageNum} total={this.state.total} onChange={(pageNum) => {this.onPageNumChange(pageNum)}} />
      </div>
    )
  }
}

export default UserList