<template>
  <div class="login_container">
    <div class="login_box">
      <!-- 头像区域 -->
      <div class="avatar_box">
        <img src="../assets/logo.png" alt="" />
      </div>
      <!-- 登录表单 -->
      <el-form
        ref="loginFormRef"
        :model="loginForm"
        class="demo-ruleForm"
        :rules="loginFormRules"
      >
        <el-form-item prop="username">
          <el-input
            autocomplete="true"
            prefix-icon="iconfont icon-user"
            v-model="loginForm.username"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            type="password"
            autocomplete="true"
            prefix-icon="iconfont icon-3702mima"
            v-model="loginForm.password"
          ></el-input>
        </el-form-item>
        <!-- 按钮 -->
        <el-form-item class="login-button">
          <el-button type="primary" @click="login">登录</el-button>
          <el-button type="info" plain @click="resetForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      loginForm: {
        username: 'admin',
        password: '123456'
      },
      // 表单验证规则
      loginFormRules: {
        username: [
          { required: true, trigger: 'blur', message: '请输入用户名' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, trigger: 'blur', message: '请输入密码' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ]
      },
      userInfo: ''
    }
  },
  methods: {
    resetForm () {
      // 调用element UI Form表单自身的方法
      this.$refs.loginFormRef.resetFields()
      this.loginForm.username = ''
      this.loginForm.password = ''
    },
    login () {
      // 调用element UI Form表单的验证数据的方法
      this.$refs.loginFormRef.validate(async (valid) => {
        if (!valid) return false
        const { data: res } = await this.$http.post('/login', this.loginForm)
        if (res.meta.status !== 200) {
          this.$message.error(res.meta.msg)
        } else {
          this.$message.success(res.meta.msg)
        }
        // 登录成功之后将服务器返回的token保存到客户端的sessionStorage中
        window.sessionStorage.setItem('token', res.data.token)
        // 跳转
        this.$router.push('/home')
      })
    }
  }
}
</script>

<style lang="less" scoped>
.login_container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background-color: #181818;
}
.login_box {
  position: relative;
  width: 450px;
  height: 300px;
  background-color: #fff;
  border-radius: 3px;
  box-shadow: 0px 0px 10px rgb(243, 239, 239);
  .avatar_box {
    position: absolute;
    left: 50%;
    transform: translate(-50%, -40%);
    width: 110px;
    height: 110px;
    border-radius: 50%;
    border: 1px solid #eee;
    padding: 8px;
    box-shadow: 0 0 8px #ddd;
    box-sizing: border-box;
    background-color: #fff;
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background-color: #eee;
    }
  }
  .demo-ruleForm {
    width: 80%;
    position: absolute;
    left: 50%;
    bottom: 0;
    transform: translate(-50%, 0);
  }
  .login-button {
    width: 100%;
    display: flex;
    justify-content: space-around;
  }
}
</style>
