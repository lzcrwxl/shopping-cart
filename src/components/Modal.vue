<template>
  <div>
    <div class="md-modal modal-msg md-modal-transition" :class="{'md-show':mdShow}">
      <div class="md-modal-inner">
        <div class="md-top">
          <!--关闭按钮，通过改变delFlag值控制弹框状态-->
          <button class="md-close" @click="closeModal">关闭</button>
        </div>
        <div class="md-content">
          <div class="confirm-tips">
            <slot name="message"></slot>
          </div>
          <div class="login-wrap">
            <slot name="btnGroup"></slot>
          </div>
        </div>
      </div>
    </div>
    <div class="md-overlay" v-if="mdShow" @click="closeModal"></div>
  </div>
</template>
<style></style>
<script>
  export default{
    data(){
      return{
        userName:"",
        userPwd:"",
        errorTip:false,
        loginModalFlag:false,
        nickName:""
      }
    },
    methods:{
      closeModal(){
        this.$emit("close");
      }
    },
    props:["mdShow",'modalConfirm']
  }
</script>
