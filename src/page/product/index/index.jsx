import React from 'react';
import {Link} from 'react-router-dom'
import Product from 'service/product-service.jsx'
import MUtil from 'util/mm.jsx'

import PageTitle from 'component/page-title/index.jsx'
import Pagination from 'util/pagination/index.jsx'
import TableList from 'util/table-list/index.jsx'

const _product = new Product()
const _mm = new MUtil()

class ProductList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      list: [],
      pageNum : 1
    }
  }
  
  componentDidMount() {
    this.loadProductList()
  }

  loadProductList() {
    _product.getProductList(this.state.pageNum).then(res => { // this.setState(res) 相当于把res里的数据平铺进state，所以不想需要提前声明
      this.setState(res)}, errMsg => {
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
      this.loadProductList()
    })
  }
  // 设置商品的上下架 
  onSetProductStatus() {
      
  }

  render () {
    let tableHeads = [
      {name: '商品ID', width: '10%'},
      {name: '商品信息', width: '50%'},
      {name: '价格', width: '10%'},
      {name: '状态', width: '15%'},
      {name: '操作', width: '15%'}
      ];
    return (
      <div id="page-wrapper">
        <PageTitle title="商品列表" />
          <TableList tableHeads={tableHeads}>
            {
              this.state.list.map((product, index) => {
                return (
                  <tr key={index}>
                    <td>{product.id}</td>
                    <td>
                        <p>{product.name}</p>
                        <p>{product.subtitle}</p>
                    </td>
                    <td>￥{product.price}</td>
                    <td>
                        <span>{product.status == 1 ? '在售' : '已下架'}</span>
                        <button onClick={e => {this.onSetProductStatus(e)}}>{product.status == 1 ? '下架' : '上架'}</button>
                    </td>
                    <td>
                      <Link to={`/product/detail${product.id}`}>查看详情</Link>
                      <Link to={`/product/save${product.id}`}>编辑</Link>
                    </td>
                  </tr>        
                )
              })
            }
          </TableList>
        <Pagination current={this.state.pageNum} total={this.state.total} onChange={(pageNum) => {this.onPageNumChange(pageNum)}} />
      </div>
    )
  }
}

export default ProductList