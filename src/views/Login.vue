<script setup>
import { ref, reactive, watch } from 'vue'
import { User, Lock } from '@element-plus/icons-vue'
const loginData = reactive({
	username: '',
	password: ''
})
const loginRef = ref()
const rules = reactive({
	username: [
		{required: true, message: '请输入用户名', trigger: 'blur'},
		{min: 3, max: 16, message: '长度不能小于3且大于16', trigger: 'blur'}
	],
	password: [
		{required: true, message: '请输入密码', trigger: 'blur'},
		{min: 8, max: 32, message: '长度不能小于8且大于32', trigger: 'blur'}
	]
})
let loginButtenDisable = ref(true)
// listen loginData value
watch([()=> loginData.username, ()=>loginData.password],() => {
	loginRef.value.validate((valid)=>{
		if (valid) {
			// button :disabled=false
			loginButtenDisable.value = false
		} else {
			loginButtenDisable.value = true
		}
	})
})

const onSubmit = () => {
	console.log('data', loginData)
}
</script>

<template>
	<el-card class="box-card">
		<el-form
			ref="loginRef"
			:model="loginData"
			:rules="rules"
			status-icon
		>
    <el-form-item
			prop="username"

		>
      <el-input v-model="loginData.username" placeholder="用户名" clearable :prefix-icon="User" />
    </el-form-item>
		<el-form-item
			prop="password"
			autocapitalize="off"

		>
      <el-input
				v-model="loginData.password"
				type="password"
				placeholder="密码"
				show-password
				:prefix-icon="Lock"
			/>
    </el-form-item>
    <el-form-item>
      <el-button :disabled="loginButtenDisable" type="primary" @click="onSubmit">登录</el-button>
    </el-form-item>
  </el-form>
	</el-card>
</template>

<style scoped>
.text {
  font-size: 14px;
}

.item {
  padding: 18px 0;
}

.box-card {
  width: 480px;
}
</style>
