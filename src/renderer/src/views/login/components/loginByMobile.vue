<template>
    <el-form
        ref="ruleFormRef"
        :model="ruleForm"
        :rules="rules"
        label-width="0"
        size="large"
    >

        <el-form-item prop="mobile">
            <el-input v-model="ruleForm.mobile" prefix-icon="iphone" clearable placeholder="请输入手机号">
                <template #prepend>+86</template>
            </el-input>
        </el-form-item>

        <el-form-item prop="captcha">
            <div class="login-msg-yzm">
                <el-input v-model="ruleForm.captcha" prefix-icon="unlock" clearable placeholder="请输入验证码"></el-input>
                <el-button :disabled="disabled" @click="getCode">获取验证码<span v-if="disabled">({{ time }})</span></el-button>
            </div>
        </el-form-item>

        <el-form-item>
            <el-button type="primary" style="width: 100%;" round :loading='isLogin' @click="login(ruleFormRef)">登录</el-button>
        </el-form-item>

        <el-form-item>
           <router-link to="">忘记密码?</router-link>
        </el-form-item>

    </el-form>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { ElMessage, type FormInstance, type FormRules } from 'element-plus'
import { PhoneRuleForm } from '@interface/login'
import { loginCaptcha , loginByMobile } from '@api/login'
import { Encrypt } from '@utils/aes'

const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive<PhoneRuleForm>({
    mobile: '',
    captcha: ''
})
const rules = reactive<FormRules<PhoneRuleForm>>({
    mobile: [
        { required: true, message: '请输入正确的手机号', trigger: 'blur', validator: (rule, value, callback) => {
            if (!/^1[3456789]\d{9}$/.test(value)) {
                callback(new Error('请输入正确的手机号'));
            } else {
                callback();
            }
        } },
    ],
    captcha: [
        { required: true, message: '请输入密码', trigger: 'blur' },
    ]
})
const time = ref<number>(60);
const disabled = ref<boolean>(false);
const isLogin = ref<boolean>(false);


const getCode = async () => {
    await ruleFormRef.value?.validateField('mobile');
    let res = await loginCaptcha({
        mobile:Encrypt( ruleForm.mobile )
    })
    if(res.code !=200)  ElMessage.error(res.msg);
    disabled.value = true;
    let timer = setInterval(() => {
        time.value--;
        if(time.value <= 0){
            clearInterval(timer);
            disabled.value = false;
        }
    }, 1000);
}

//登录
const login = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate(async (valid) => {
    if (valid) {
        let res = await loginByMobile({
            mobile:Encrypt( ruleForm.mobile ),
            captcha:Encrypt( ruleForm.captcha )
        })
        
        if(res.code !=200)  ElMessage.error(res.msg);
    } else {
        ElMessage.warning('请填写正确内容');
    }
  })
}
</script>

<style scoped>
.login-msg-yzm{
    display: flex;
    width: 100%;
}
.login-msg-yzm .el-button{
    margin-left:10px;
}
</style>