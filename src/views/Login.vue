<script setup>
import { ref, reactive, watch } from 'vue'
import { User, Lock } from '@element-plus/icons-vue'
import { login } from '../api/login.js'
import { ElMessage } from 'element-plus'
import {CONFIG} from '../config/index.js'
import { useRouter } from 'vue-router'

const loginData = reactive({
	username: '',
	password: ''
})
const router = useRouter()
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
	login(loginData.username, loginData.password).then((response)=>{
		console.log(response)
		if (response.code === 200 ) {
			ElMessage({
				message: '登录成功',
				type: 'success'
			})
			// 存储token到本地浏览器storage中
			window.localStorage.setItem(CONFIG.TOKEN_NAME, response.data.access)
			router.replace('/')
		}
	})
}
</script>

<template>
	<div id="login" style="width: 100vw;">
		<el-card class="box-card">
			<h2>后台管理系统</h2>
			<el-form
				ref="loginRef"
				:model="loginData"
				:rules="rules"
			>
		<el-form-item
				prop="username"
				class="form-item"

			>
		<el-input v-model="loginData.username" placeholder="用户名" clearable :prefix-icon="User" />
		</el-form-item>
			<el-form-item
				prop="password"
				autocapitalize="off"
				class="form-item"
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
		<el-button style="margin: 10px auto 10px auto;" :disabled="loginButtenDisable" type="primary" @click="onSubmit">登录</el-button>
		</el-form-item>
	</el-form>
		</el-card>
	</div>
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
  margin: 0 auto;
  
}

.form-item {
	width: 300px;
	margin: 0 auto 20px auto;
}
</style>
