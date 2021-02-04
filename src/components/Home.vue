<template>
  <div class="home_container">
    <el-container>
      <!-- 头部 -->
      <el-header>
        <div class="head-left">
          <img src="../assets/lpz.png" alt="" />
          <span>电商后台管理系统</span>
        </div>
        <!-- 退出按钮 -->
        <el-button icon="el-icon-error" type="info" @click="logout"
          >退出</el-button
        >
      </el-header>
      <el-container>
        <!-- 侧边栏 -->
        <el-aside :width="isCollapse ? '64px' : '200px'">
          <div class="menu-collapse" @click="toggleCollapse">|||</div>
          <el-menu
            background-color="#333744"
            text-color="#fff"
            active-text-color="#409EFF"
            v-if="menuList"
            unique-opened
            :collapse="isCollapse"
            :collapse-transition="false"
            router
          >
            <!-- 一级菜单 -->
            <el-submenu
              :index="item.id + ''"
              v-for="item in menuList"
              :key="item.id"
            >
              <!-- 一级菜单模板区域 -->
              <template slot="title" class="el-submenu-title">
                <!-- 图表 -->
                <i :class="iconsObj[item.id]"></i>
                <!-- 文本 -->
                <span>{{ item.authName }}</span>
              </template>
              <!-- 二级菜单 -->

              <el-menu-item
                :index="'/' + key.path"
                v-for="key in item.children"
                :key="key.id"
              >
                <template slot="title">
                  <i class="el-icon-menu"></i>
                  <span>{{ key.authName }}</span>
                </template>
              </el-menu-item>
            </el-submenu>
          </el-menu>
        </el-aside>
        <!-- 右侧主体内容 -->
        <el-main>
          <!-- 路由占位符 -->
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
      menuList: [],
      iconsObj: {
        125: 'iconfont icon-user',
        103: 'iconfont icon-tijikongjian',
        101: 'iconfont icon-shangpin',
        102: 'iconfont icon-danju',
        145: 'iconfont icon-baobiao'
      },
      isCollapse: false
    }
  },
  methods: {
    logout () {
      window.sessionStorage.clear()
      this.$router.push('/login')
    },
    async getMenuList () {
      const { data: res } = await this.$http.get('/menus')
      console.log(res)
      if (res.meta.status !== 200) return this.$message.error(res.meta.msg)
      this.menuList = res.data
      console.log(this.menuList)
    },
    toggleCollapse () {
      this.isCollapse = !this.isCollapse
    }
  },
  created () {
    this.getMenuList()
  }
}
</script>

<style lang="less" scoped>
.el-container {
  height: calc(100vh - 60px);
}
.el-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #373d41;
  color: rgb(243, 241, 241);
  line-height: 60px;
  box-shadow: 0px -10px 6px -10px #ffffff inset;
  box-sizing: border-box;
  .head-left {
    display: flex;
    align-items: center;
    img {
      height: 60px;
    }
    span {
      height: 60px;
      font-size: 20px;
      font-weight: bold;
      line-height: 60px;
      display: inline-block;
      vertical-align: b;
      margin-left: 15px;
    }
  }
  .el-button {
    height: 40px;
  }
}
.el-aside {
  background-color: #333744;
  color: #333;
  text-align: center;
  line-height: 200px;
  height: 100%;
  box-sizing: border-box;
  overflow-x: hidden;
  .el-menu {
    border-right: none;
  }
}
.el-main {
  background-color: #f0f2f5;
  color: #333;
  text-align: center;
  line-height: 160px;
}
.menu-collapse {
  height: 20px;
  line-height: 20px;
  color: #ffffff;
  cursor: pointer;
  background-color: #686868;
  letter-spacing: 0.2em;
  font-size: 10px;
}
// @keyframes menufade {
//   0% {
//     width: 200px;
//   }
//   100% {
//     width: 64px;
//   }
// }
</style>
<style>
.el-menu > .el-submenu .el-submenu__title {
  padding-right: 65px;
}
</style>
