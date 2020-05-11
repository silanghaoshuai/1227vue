import {reqProductList} from '@/api'
const state = {
  productList: {}, // 搜索相关商品数据对象
}

const mutations = {
  /* 
  储存新的商品数据
  */
  RECEIVE_PRODUCT_LIST (state, productList) {
    state.productList = productList
  }
}
const actions = {
  /* 
  获取商品列表数据
  */
  async getProductList ({commit}, searchParams) {
    const result = await reqProductList(searchParams)
    if (result.code===200) {
      const productList = result.data
      commit('RECEIVE_PRODUCT_LIST', productList)
    }
  }
}
const getters = {
}
export default {
  state,
  mutations,
  actions,
  getters
}