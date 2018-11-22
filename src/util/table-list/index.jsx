import React from 'react';

// 通用列表渲染组件
class TableList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isFirstLoading: true
    }
  }

  componentWillReceiveProps() {
    // isFirstLoading 是用来判断是否是第一次加载数据，默认是true（挂载时是ture），在组件更新后就应该变为false  这组件更新与props有关  所以使用componentWillReceiveProps函数
    this.setState({
      isFirstLoading: false
    })
  }

  render() {
    // 表头信息
    let tableHeader = this.props.tableHeads.map((tableHead, index) => {
      if (typeof tableHead === 'object') {
        return (
          <th key={index} width={tableHead.width}>{tableHead.name}</th>
        )
      } else if (typeof tableHead === 'string'){
        return (
          <th key={index}>{tableHead}</th>
        )
      }
    })
    // 列表的信息
    let listInfo = (<tr><td colSpan="{this.props.tableHeads}" className="text-center">{this.state.firstLoading ? '正在加载数据...' : '没有找到数据~'}</td></tr>)
    // 列表内容
    let listBody = this.props.children  // 也就是使用<TableList></TableList>成对标签包裹的内容
    let tableBody = listBody.length > 0 ? listBody : listInfo // listBody默认是个数组  判断这个数组的长度 决定是显示listbody还是listinfo   listinfo在listbody为空的时候 根据是不是第一次加载来显示不同内容
    return (
      <div className="row">
        <div className="col-md-12">
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
               {tableHeader}
              </tr>
            </thead>
            <tbody>
              {tableBody}
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}

export default TableList