<template>
  <div class="mx-auto w-50 p-3">
    <div class="h2 text-primary">Create an account 🚀</div>
    <ValidateForm @form-submit="onFormSubmit">
      <div class="mb-3">
        <label for="email">Email</label>
        <ValidateInput id="email"
                       type="text"
                       :rules="emailRules"
                       v-model="signupData.email"
                       placeholder="input email address"
                       autocomplete="email"/>
      </div>
      <div class="mb-3">
        <label for="name">Nick name</label>
        <ValidateInput id="name"
                       type="text"
                       :rules="nickNameRules"
                       v-model="signupData.nickName"
                       placeholder="input your name"
                       autocomplete="email"/>
      </div>
      <div class="mb-3">
        <label for="password" class="form-label">Password</label>
        <ValidateInput id="password"
                       type="password"
                       :rules="passwordRules"
                       v-model="signupData.password"
                       placeholder="input password"
        />
      </div>
      <div class="mb-3">
        <label for="repeatPassword" class="form-label">Repeat Password</label>
        <ValidateInput id="repeatPassword"
                       type="password"
                       :rules="repeatPasswordRules"
                       v-model="signupData.repeatPassword"
                       placeholder="input password again"
        />
      </div>
      <template #submit>
        <button type="submit" class="btn btn-primary w-100 my-3">Create an account</button>
      </template>
      <div class="text-black-50 small">By signing up you agree to our <a href="#">terms and privacy policy</a></div>
    </ValidateForm>
    <div class="text-center small">
      <router-link to="/login" class="text-black">Log in</router-link>
      | <a href="#" class="text-black">Reset password</a>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import ValidateInput from '@/base/ValidateInput.vue'
import ValidateForm from '@/base/ValidateForm.vue'
import { RulesProp } from '@/store/types'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import createMessage from '@/base/createMessage'

export default defineComponent({
  name: 'SignupView',
  components: { ValidateInput, ValidateForm },
  setup () {
    const signupData = reactive({
      email: 'simon1uo@163.com',
      nickName: 'simon1',
      password: 'simon2000',
      repeatPassword: 'simon2000'
    })

    const emailRules: RulesProp = [
      { type: 'required', message: 'Email cannot be empty!' },
      { type: 'email', message: 'Please input valid email address' }
    ]
    const nickNameRules: RulesProp = [
      { type: 'required', message: 'Nick name cannot be empty!' },
      { type: 'range', min: 6, max: 10, message: 'Length of nick name must between 6~10' }
    ]
    const passwordRules: RulesProp = [
      { type: 'required', message: 'Password cannot be empty!' },
      { type: 'range', min: 6, max: 16, message: 'Length of password must between 6~16' }
    ]
    const repeatPasswordRules: RulesProp = [
      { type: 'required', message: 'Password cannot be empty!' },
      { type: 'range', min: 6, max: 16, message: 'Length of password must between 6~16' },
      {
        type: 'validator',
        validator: () => signupData.password === signupData.repeatPassword,
        message: 'The password you input doesnt match'
      }
    ]

    const store = useStore()
    const router = useRouter()
    const onFormSubmit = (result: boolean) => {
      if (result) {
        const payload = {
          email: signupData.email,
          password: signupData.password,
          nickName: signupData.nickName
        }

        store.dispatch('signup', payload).then(() => {
          createMessage('Sign up finished', 'success')

          setTimeout(() => {
            router.push('login')
          })
        }).catch(err => {
          console.log(err)
        })
      }
    }

    return {
      signupData,
      emailRules,
      nickNameRules,
      passwordRules,
      repeatPasswordRules,
      onFormSubmit
    }
  }
})
</script>

<style lang="less" scoped>

</style>
