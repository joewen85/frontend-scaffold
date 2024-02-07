<script setup>
import { reactive, toRefs, ref, onMounted } from 'vue'
import { createUser, updateUser } from '../../api/users.js'
import { ElMessage } from 'element-plus';

const formLabelWidth = '75px'
const data = reactive({
    userForm: {
        // username: '',
        // phone: '',
        // remark: ''
    } 
})


const userAddHandle = () => {
  loading.value = true
  userFormRef.value.validate((valid)=>{
    if (valid) {
      createUser(data.userForm).then((response)=>{
      loading.value = false
      })
      emits('rollback')
    } else {
      ElMessage({
        type: 'warning',
        message: '请完善表单信息'
      })
    }
    
  })
}

const updateUserHandle = () => {
  updateUser(data.userForm).then((response)=>{
    if (response.code === 200) {
      loading.value = false
      ElMessage({
        type: 'success',
        message: '修改成功'
      })
      emits('rollback')
    } else {
      ElMessage({
        type: 'error',
        message: response.msg
      })
    }
  })
}

const resetUserForm = () => {
  // 通过FormRef里的value, resetFields方法清空表单中的值
  userFormRef.value.resetFields()
}
const userFormRef = ref()
const loading = ref(false)
const {userForm} = toRefs(data)
const rules = reactive({
  username: [
    {required: true, message: '请输入用户名', trigger: 'blur'},
		{min: 3, max: 16, message: '长度不能小于3且大于16', trigger: 'blur'}
  ],
  phone: [
    {required: true, message: '请输入手机号码', trigger: 'blur'},
		{min: 8, max: 11, message: '8-11位', trigger: 'blur'}
  ]
})
// 定义emits事件, 让父组件传入需要操作的行为, defineEmits接收一个list
const emits = defineEmits(['rollback'])

const props = defineProps({
  method: {
    type: String,
    default: 'Create'
  },
  userForm: {
    type: Object
  }
})

onMounted(()=>{
  // vue参数传递是值引用,导致子组件修改,父组件也一并修改.不能像下面那样写
  // data.userForm = props.userForm

  // 解决办法是将对象转一下jsonstring实现深拷贝
  const jsonString = JSON.stringify(props.userForm)
  data.userForm = JSON.parse(jsonString)
})
</script>

<template>
  <!-- prop一定要加上,否则无法实现数据清空、校验. prop绑定数据结构中对应的属性 -->
    <el-form 
      ref="userFormRef"
      :model="userForm"
      :v-loading="loading"
      :rules="rules"
    >
      <el-form-item  prop="username" label="用户名" :label-width="formLabelWidth">
        <el-input v-model="userForm.username" autocomplete="off" />
      </el-form-item>
      <el-form-item prop="phone" label="手机号" :label-width="formLabelWidth">
        <el-input v-model="userForm.phone" autocomplete="off" />
      </el-form-item>
      <el-form-item prop="remark" label="备注" :label-width="formLabelWidth">
        <el-input v-model="userForm.remark" autocomplete="off" />
      </el-form-item>
    </el-form>
    <span class="dialog-footer">
    <el-button @click="resetUserForm()">清空</el-button>
    <el-button type="primary" @click="props.method == 'Create'?userAddHandle():updateUserHandle() ">
        {{ props.method == 'Create'?'提交':'修改'}}
    </el-button>
    </span>
</template>

<style scoped>
.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>