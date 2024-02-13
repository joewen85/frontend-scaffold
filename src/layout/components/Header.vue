<script setup>
import { ArrowLeft, SwitchButton, ArrowRight} from '@element-plus/icons-vue'
import { logout } from '../../api/login.js'
import { ElMessageBox, ElMessage} from 'element-plus'
import { CONFIG } from '../../config/index.js'
import { useRouter } from 'vue-router'
import { useIsCollapse } from '../../store/index.js'
import { storeToRefs } from 'pinia'


const router = useRouter()
const logoutHandle = () => {
   // 1. 后端没有存储token，直接删除local storage的Authorization
   // 2. 后端存储了token，需要先调用后端的退出接口，然后正常处理后，再去删除Authorization
  ElMessageBox.confirm(
    '是否确认退出?',
    {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      type: 'warning',
    }
  )
  .then(() => {
      logout().then((response)=> {
        ElMessage({
          message: response.msg,
          type: 'success'
        })
        window.localStorage.removeItem(CONFIG.TOKEN_NAME)
        router.replace('/login')
    })
  })
  .catch(() => {
    return
  })
}

const collapseChange =() => {
  const isCollapse = useIsCollapse()
  isCollapse.changeIsCollapse()
}

const {isCollapse} = storeToRefs(useIsCollapse())
</script>

<template>
  <el-header class="el-header">
    <el-button @click="collapseChange()">
      <el-icon v-show="!isCollapse" :size="20"><ArrowLeft /></el-icon>
      <el-icon v-show="isCollapse" :size="20"><ArrowRight /></el-icon>
    </el-button>

    <el-button @click="logoutHandle">
      <el-icon size="20"><SwitchButton /></el-icon>
    </el-button>
    
  </el-header>
</template>

<style lang="less" scoped>
.el-header {
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  button {
    border: 0;
  }
}

</style>