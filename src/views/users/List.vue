<script setup>
import { onBeforeMount, reactive, toRefs, ref } from 'vue';
import {getUsersList , deleteUser} from '../../api/users.js'
import {ElNotification, ElMessageBox} from 'element-plus'
import Add from './Add.vue'

const data = reactive({
  items: [],
  userForm: {
    username: '',
    phone: '',
    remark: ''
  }
})
const loading = ref(true)
const userDialogVisible = ref(false)

// const dialogStatus = ref('create')
// const textMap = reactive({
//   update: '修改',
//   create: '新建'
// })

// 定义创建还是编辑参数, 传给子组件
const defaultMethod = ref('Create')

const getUserListHandle = () => {
  loading.value = true
  getUsersList({
    page: 1,
    page_size: 9999
  }).then((response)=> {
    data.items = response.data.results
    loading.value = false
  })
}

const deleteUserHandle = (row) => {
  ElMessageBox.confirm(
    '是否确认删除: '+ row.username + '用户?',
    {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      type: 'warning',
    }
  )
  .then(() => {
      loading.value = true
      deleteUser(row.id).then((response)=> {
        if (response.code === 204) {
          getUserListHandle()
        } else {
          ElNotification({
            title: 'Error',
            message: response.msg,
            type: 'error',
          })
        }
    })
  })
  .catch(() => {
    return
  })
}

const addUser = () => {
  data.userForm = {}
  defaultMethod.value = 'Create'
  userDialogVisible.value = true
}

const editUser = (row) => {
  // dialogStatus.value = 'update'
  userDialogVisible.value = true
  defaultMethod.value = 'update'
  data.userForm = row
}

// 给子钻事件调用的函数, 关闭dialog和刷新用户列表
const rollbackFunc = () => {
  userDialogVisible.value = false
  getUserListHandle()
}

const closeDialog = () => {
  userDialogVisible.value = false
  getUserListHandle()
}

onBeforeMount(()=>{
  getUserListHandle()
})
const {items,userForm} = toRefs(data)
</script>

<template>
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <span>用户列表</span>
        <el-button @click="addUser()" class="button" text>添加用户</el-button>
      </div>
    </template>

    <el-table
      :data="items"
      style="width: 100%"
      border 
      height="480"
      :v-loading="loading"
      element-loading-text="玩命加载中..."
    >
      <el-table-column sortable fixed prop="username" label="用户名" width="180" />
      <el-table-column sortable fixed prop="id" label="ID" width="180" />
        <el-table-column prop="name" label="名称" width="180" />
        <el-table-column prop="phone" label="手机号码" />
        <el-table-column fixed="right" label="操作">
          <template #default="scope">
            <el-button link type="primary" size="small" @click="editUser(scope.row)">编辑</el-button>
            <el-button link type="warning" size="small"  @click="deleteUserHandle(scope.row)">删除</el-button>
          </template>
        </el-table-column>
    </el-table>
  </el-card>
  <!-- dialog对话框, 添加或修改用户 -->
  <el-dialog
    v-model="userDialogVisible"
    :title="defaultMethod == 'Create'?'创建用户':'修改用户属性'"
    width="40%"
    destroy-on-close
  >
    <Add :method="defaultMethod" :user-form="userForm" @rollback="rollbackFunc()"></Add>
  </el-dialog>
  <!-- 实现关闭dialog时才刷新用户列表  看需求使用-->
  <!-- <el-dialog @close="closeDialog()" v-model="userDialogVisible" :title="textMap[dialogStatus]" width="40%">
    <Add></Add>
  </el-dialog> -->
</template>

<style scoped>
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}
</style>
