<script setup>
import { Menu, Setting } from '@element-plus/icons-vue';
import {AsideMenu} from '../../config/AsideMenu.js'
import '../../assets/iconfont/iconfont.css'
</script>

<template>
  <el-aside class="el-aside" width="240px" style="border-right: 1px solid #ccc;">
    <div class="aside-logo">
      <router-link to="/home">
        <el-button text style="font-size: 24px;">
          <el-icon style="size: 25px;"><Menu /></el-icon>
          Default
        </el-button>
      </router-link>
      <!-- default-active绑定当前路由路径,实现刷新页面菜单不折叠 -->
      <el-menu
        :default-active="$route.path" 
        class="el-menu-vertical-demo"
        router
        style="border: none;"
        
      >
        <el-sub-menu v-for="menu in AsideMenu" :key="menu.index" :index="menu.index">
          <template #title>
            <span :class="menu.icon" style="font-size: 22px;"></span>
            <span>{{menu.title}}</span>
          </template>
          <!-- 判断是否有子菜单 -->
          <template v-if="menu.subMenus">
            <el-sub-menu v-for="subMenu in menu.subMenus" :key="subMenu.index" :index="subMenu.index">
              <template #title>
                <span :class="subMenu.icon" style="font-size: 20px;"></span>
                {{ subMenu.title }}
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
  // 使用aside实现折叠效果
.el-aside {
  transition: width 0.15s;
  -webkit-transition: width 0.15s;
  -moz-transition: width 0.15s;
  -webkit-transition: width 0.15s;
  -o-transition: width 0.15s;
}
}
</style>