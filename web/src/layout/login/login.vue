<template>
  <div class="main-login">
    <div class="login center">
      <el-card shadow="always" :body-style="{ padding: '10px' }" class="login-card">
        <div class="center">
          <div class="login-title">NatsJob</div>
          <div class="login-subtitle">轻量、可控、场景 分布式定时任务</div>
        </div>

        <div class="login-center">
          <div class="login-form">
            <el-form :model="loginInfo" :rules="rules" ref="loginForm" label-width="1px" class="login-form"
              size="large">
              <el-form-item label="" prop="userId">
                <el-input v-model.trim="loginInfo.userId" placeholder="账号" prefix-icon="User" @keyup.enter="login"
                  class="input-with-shadow"></el-input>
              </el-form-item>
              <el-form-item label prop="passwd">
                <el-input v-model.trim="loginInfo.passwd" placeholder="密码" type="password" prefix-icon="Lock"
                  @keyup.enter="login" class="input-with-shadow"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="login" round class="login-button">
                  登&nbsp;&nbsp;&nbsp;&nbsp;录
                </el-button>
              </el-form-item>
              <el-form-item>
                <div class="center" style="width: 100%;">
                  <i class="ri-github-fill ri-2x github-icon" @click="openLuanxinghai"></i>
                </div>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, toRefs } from 'vue';
import { useRouter } from 'vue-router';
import { setLogin } from "@/app/app"
import { useApiLogin, useAesPasswd } from "@/api/login";
const router = useRouter();
const loginForm = ref(null);
const loginPage = reactive({
  loginInfo: {
    userId: "",
    passwd: "",
  },
  rules: {
    userId: [{ required: true, message: "请输入账号", trigger: "blur" }],
    passwd: [
      { required: true, message: "请输入密码", trigger: "blur" },
    ]
  },
});

if (import.meta.env.VITE_LOGIN_ACCPWD == 1) {
  loginPage.loginInfo = {
    userId: "natsjob",
    passwd: "natsjob",
  };

}

const { loginInfo, rules } = toRefs(loginPage);
const asePasswd = useAesPasswd()
const login = () => {
  loginForm.value.validate(async (valid) => {
    if (!valid) {
      //console.log("error submit!!");
      return false;
    }

    const loginFormInfo = {
      userId: loginInfo.userId,
      passwd: loginInfo.passwd,
      time: Date.now(),
      sign: ""
    }
    Object.keys(loginPage.loginInfo).map(key => {
      loginFormInfo[key] = loginInfo.value[key]
    })

    loginFormInfo.sign = asePasswd.encrypted("luanxinghai" + loginFormInfo.userId + loginFormInfo.passwd + loginFormInfo.time + "natsjob")
    const userInfo = await useApiLogin().login(loginFormInfo)
    setLogin(userInfo)
    router.push("/");
  });
};

const openLuanxinghai = () => {
  window.open("https://github.com/luanxinghai/natsjob")
}

</script>

<style lang="scss" scoped>
.main-login {
  width: 100%;
  height: 100vh;
  background-image: url("/imges/bg.png");
  background-color: #fff;
  background-size: cover;


  .login {
    height: 100%;
  }

  .login-card {
    // height: 360px;
    width: 360px;
    margin-left: 50%;
    float: right;
    border-radius: 10px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease, box-shadow 0.3s ease;

    // &:hover {
    //   transform: translateY(-5px);
    //   box-shadow: 0 15px 35px rgba(0, 0, 0, 0.15);
    // }
  }

  .login-title {
    font-weight: bold;
    font-family: SourceHanSansCN_Bold;
    font-size: 1.5rem;
    line-height: 30px;
    margin-bottom: 0px;
    margin: 25px 0;
    color: #333;
  }

  .login-subtitle {
    font-size: 0.9rem;
    color: #666;
    margin-bottom: 20px;
    text-align: center;
  }

  .login-center {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    .login-form {
      width: 100%;
      padding: 0 10px;
    }
  }

  .input-with-shadow {
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
    transition: box-shadow 0.3s ease;

    &:focus {
      box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
    }
  }

  .login-button {
    width: 100%;
    margin-top: 25px;
    padding: 12px 0;
    font-size: 1rem;
    border-radius: 8px;
    transition: all 0.3s ease;

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
    }
  }

  .github-icon {
    color: #666;
    transition: color 0.3s ease, transform 0.3s ease;

    &:hover {
      color: #333;
      transform: scale(1.1);
    }
  }

  .center {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }

}
</style>
