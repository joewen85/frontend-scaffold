import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useStoreDemo = defineStore('StoreDemo', {
    // 容器内容
    // state: 用于存储全局状态/数据, 可理解为数据配置的位置
    // data
    state: ()=> {
        return {
            msg: 'Hello, Pinia'
        }
    },
    // 相当于计算属性
    getters: {},
    // 定义修改数据的方法
    // 相当于methods
    actions: {
        changeStoreDemo(val){
            this.msg = val
        }
    }
})