<template>
  <div class="user-bar">
    <div class="panel-item-cti center">

    </div>
    <div class="panel-item flex-right">
      <div class="user-img" @click="showMsg">
        <PersonalTodoHeaderIcon ref="noticeBan" />
      </div>

      <div class="user-img" @click="screen">
        <i class="ri-fullscreen-line ri-lg  icon-btn"></i>
      </div>
      <div>
        <Theme />
      </div>
      <el-dropdown class="user panel-item" @command="handleUser">
        <div class="user-avatar">
          <el-avatar :size="30" :src="avatarSrc" />
          <label>
            乱星海
          </label>
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <!-- <el-dropdown-item command="uc">个人设置</el-dropdown-item> divided-->
            <el-dropdown-item command="outLogin">
              退出登录
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>
<script setup name="TopMenu">
import { setLogout } from '@/app/app';
const noticeBan = ref()
const avatarSrc = "./header/lxh1.png"

const screen = () => {
  let element = document.documentElement
  $tools.screen(element)
}

const showMsg = () => {
  noticeBan.value.goMore()
}

const handleUser = (command) => {
  if (command == 'outLogin') {
    setLogout();

  } else if (command == 'screen') {
    window.open(window.location.origin + '/dashborad/index.html')
  }
}
</script>

<style lang="scss" scoped>
.user-bar {
  display: grid;
  grid-template-columns: 1fr 400px;
  width: 100%;
}

.user-bar .panel-item {
  margin: 0 10px;
  cursor: pointer;
  height: 100%;
  display: flex;
  align-items: center;
  justify-items: center;
}

.user-bar .panel-item-cti {
  margin: 0 10px;
  cursor: pointer;
  height: 100%;
  display: flex;
  align-items: center;
}

.user-img {
  border-radius: 50%;
  height: 30px;
  padding: 0;
  margin: 0 5px;
  /* margin: 0 3px; */
  /* text-align: center; */
  /* font-size: 24px; */
  width: 30px;
  /* background-color: #f2f3f5; */

  /* border: 1px solid #c7dbfe; */
  /* border: 1px solid #8590a681; */
  display: flex;
  align-items: center;
  justify-content: center;
}



.user-bar .user-avatar {
  height: 49px;
  display: flex;
  align-items: center;
}

.user-bar .user-avatar label {
  display: inline-block;
  margin-left: 5px;
  /* font-size: 12px; */
  cursor: pointer;
}
</style>
