import MUtil from 'util/mm.jsx'

const _mm = new MUtil()
class Product {
  // 商品页数据
  getProductList(pageNum) {
    return _mm.request({
      type: 'post',
      url: '/manage/product/list.do',
      data: {
        pageNum
      }
    })
  }
}

export default Product