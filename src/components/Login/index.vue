<template>
  <div id='login'>
    <mt-field label="用户名" placeholder="请输入用户名" v-model="username"></mt-field>
    <mt-field label="邮箱" placeholder="请输入邮箱" type="email" v-model="email"></mt-field>
    <mt-field label="密码" placeholder="请输入密码" type="password" v-model="password"></mt-field>
    <div>
      <mt-button type="default" class='button'>登 录</mt-button>
    </div>

  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      email: '',
      password: ''
    }
  }
}
</script>

<style lang="scss" scoped>
#login {
  width: 100%;
  div {
    width: 100%;
    .button {
      width: 100%;
      margin: 20px auto;
    }
  }
}
</style>