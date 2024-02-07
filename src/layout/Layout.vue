<script setup>
import Aside from './components/Aside.vue'
import Header from './components/Header.vue'
import Main from './components/Main.vue'
import Footer from './components/Footer.vue'

</script>

<template>
  <div class="common-layout">
    <el-container class="el-container">
      <Aside></Aside>
      <el-container class="el-container__el-container">
        <Header></Header>
        <Main></Main>
        <Footer></Footer>
      </el-container>
    </el-container>
  </div>
</template>

<style lang="less" scoped>
.el-container {
    /* 100%为铺满当前元素, 受限于父元素 */
    /* 100vh为铺满页面窗口, 不受父元素限制 */
    height: 100vh;
    width: 100vw;
    .el-container__el-container {
        /* 页面变弹性布局 */
        display: flex;
        flex-direction: column;
    }
}
</style>
