<template lang="html">
  <div class="login-panel">
    <l-form class="login-form">
      <l-form-item label="手机号" class="form-item">
        <input v-model="data.mobile" placeholder="请输入手机">
      </l-form-item>
      <l-form-item label="验证码" class="form-item">
        <input v-model="data.code" placeholder="请输入验证码">
        <label class="get-code" @click="getCode">{{this.lastTime > 0 ? lastTime : '获取验证码'}}</label>
      </l-form-item>
      <l-form-item label="密码" class="form-item">
        <input v-model="data.password" type="password" placeholder="请输入密码">
      </l-form-item>
      <l-form-item label="确认密码" class="form-item">
        <input v-model="data.repassword" type="password" placeholder="请重新输入密码">
      </l-form-item>
      <l-form-item label="注册类型" class="form-item">
        <group>
          <radio title="title" :options="options" v-model="value" @on-change="typeChange"></radio>
        </group>
      </l-form-item>
      <l-form-item label="公司名称" class="form-item" v-if="value === 4">
        <input v-model="data.company" placeholder="请输入公司名称">
      </l-form-item>
    </l-form>
    <div @click="onRegister" class="btn-register">点 我 注 册</div>
    <slot></slot>
  </div>
</template>

<script>
import LForm from 'components/form/form'
import LFormItem from 'components/form/form-item'
import { mobileCode } from '@/api'
import { Group, Radio } from 'vux'

export default {
  name: 'LPanelsRegister',
  componentName: 'LPanelsRegister',
  props: {
    data: {
      type: Object
    }
  },
  components: {
    LForm,
    LFormItem,
    Group,
    Radio
  },
  data () {
    return {
      intervalId: null,
      lastTime: null,
      options: [{
        key: 3,
        value: '个人'
      }, {
        key: 4,
        value: '企业'
      }],
      value: 3
    }
  },
  created () {
    console.log('login form: ', this)
    console.log(this)
    this.$on('el.form.addField', (field) => {
      console.log(field)
    })
  },
  mounted () {
    this.initLastTime()
  },
  beforeDestroy () {
    // clear interval
    if (this.intervalId) {
      clearInterval(this.intervalId)
    }
  },
  methods: {
    initLastTime () {
      let registerEndTime = this.$store.getters.registerEndTime
      if (!registerEndTime) {
        return
      }

      const curTime = new Date().getTime()
      if (curTime > registerEndTime) {
        return
      }

      this.calLastTime()
    },
    calLastTime () {
      let registerEndTime = this.$store.getters.registerEndTime
      const curTime = new Date().getTime()
      if (!registerEndTime || curTime > registerEndTime) {
        // 1分钟之内不允许再次发送验证码请求
        registerEndTime = curTime + 60 * 1000
        this.$store.commit('SET_REGISTER_END_TIME', registerEndTime)
      }

      const intervalTime = 1000
      const intervalCal = () => {
        const curTime = new Date().getTime()
        console.log(curTime, registerEndTime)
        if (curTime > registerEndTime && this.intervalId) {
          clearInterval(this.intervalId)
        }

        this.lastTime = Math.ceil((registerEndTime - curTime) / intervalTime)
      }

      intervalCal()

      this.intervalId = setInterval(intervalCal, intervalTime)
    },
    onRegister () {
      this.$emit('commit', this.data)
    },
    async getCode () {
      // 1. 验证手机号码
      // 2. 调用发送接口
      // 3. 成功失败弹框提示
      // 4. 禁止一定时间内再次发送，并设置倒计时
      try {
        let res = await mobileCode({ mobile: this.data.mobile })
        if (res.data.status === 1) {
          this.calLastTime()
        }
        this.$vux.alert.show({
          title: '提示',
          content: res.data.info
        })
      } catch (err) {}
    },
    resetFields () {

    },
    typeChange (value) {
      console.log('typeChange: ', value)
      this.data.modelid = value
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../common/style/var.scss';

.login-panel {
  margin: 10px;
  box-sizing: border-box;
  font-size: 13px;
  .login-form {
    background: white;
    font-weight: 600;
    .form-item {
      padding: 10px 0;
      input {
        outline: none;
        font-size: 12px;
      }
      .get-code {
        font-size: 12px;
        color: $default-color;
        &:active {
          opacity: .7;
        }
      }
    }
  }
  .btn-register {
    margin: 10px 0;
    padding: 10px;
    background: $default-color;
    color: white;
    text-align: center;
    border-radius: 4px;
  }
  .weui-cells_radio {
    font-size: 12px;
    font-weight: 400;
  }
}
</style>

