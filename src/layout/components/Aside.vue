<script setup>
import { ref } from 'vue'
import { Menu, Setting } from '@element-plus/icons-vue'
import {AsideMenu} from '../../config/AsideMenu.js'
import '../../assets/iconfont/iconfont.css'
import { storeToRefs } from 'pinia'
import {useIsCollapse} from '../../store/index.js'

// const isCollapse = ref(false)
const {isCollapse} = storeToRefs(useIsCollapse()) 

</script>

<template>
  <el-aside class="el-aside" :style="{width: isCollapse?'65px':'240px'}" style="border-right: 1px solid #ccc;">
    <div class="aside-logo">
      <router-link to="/home">
        <el-button text style="font-size: 25px;">
          <el-icon style="margin-right: 10px; padding-left: 14px;"><Menu /></el-icon>
          <span v-show="!isCollapse">Admin</span>
        </el-button>
      </router-link>
    </div>
    <div id="menu">
      <!-- default-active绑定当前路由路径,实现刷新页面菜单不折叠 -->
      <el-menu
        :default-active="$route.path" 
        class="el-menu-vertical-demo"
        router
        style="border: none;"
        :collapse="isCollapse"
        :collapse-transition="false"
      >
        <el-sub-menu v-for="menu in AsideMenu" :key="menu.index" :index="menu.index">
          <template #title>
           <el-icon><span :class="menu.icon" style="font-size: 30px;"></span></el-icon>
            <span>{{menu.title}}</span>
          </template>
          <!-- 判断是否有子菜单 -->
          <template v-if="menu.subMenus">
            <el-sub-menu v-for="subMenu in menu.subMenus" :key="subMenu.index" :index="subMenu.index">
              <template #title>
                <el-icon><span style="font-size: 20px;" :class="subMenu.icon"></span></el-icon>

                <!-- <el-icon><span :class="subMenu.icon" style="font-size: 20px;"></span></el-icon> -->
                <span>{{ subMenu.title }}</span>
              </template>
              <el-menu-item v-for="item in subMenu.items" :key="item.index" :index="item.index">
                <template #title>{{ item.title }}</template>
              </el-menu-item>
            </el-sub-menu>
          </template>
          <!-- 没有子菜单则为item -->
          <template v-else>
            <el-menu-item v-for="item in menu.items" :key="item.index" :index="item.index">
              <template #title> {{ item.title }}</template>
            </el-menu-item>
          </template>
        </el-sub-menu>
      </el-menu>
    </div>
  </el-aside>
</template>

<style lang="less" scoped>
.aside-logo {
  height: 50px;
  button {
    width: 100%;
    height: 100%;
  }
}
  // 使用aside实现折叠效果
.el-aside {
  transition: width 0.15s;
  -webkit-transition: width 0.15s;
  -moz-transition: width 0.15s;
  -webkit-transition: width 0.15s;
  -o-transition: width 0.15s;
}
</style>