<template>
  <div class="mx-auto w-50 p-3">
    <div class="h2 text-primary">Log in 👋</div>
    <div class="p-2">
      <ValidateForm @form-submit="onFormSubmit">
        <div>
          <label for="email">Email</label>
          <ValidateInput ref="emailInputRef"
                         id="email"
                         type="text"
                         :rules="emailRules"
                         v-model="loginInfo.email"
                         placeholder="input email address"
                         autocomplete="email"/>
        </div>
        <div class="mb-3">
          <label for="password" class="form-label">Password</label>
          <ValidateInput ref="passwordInputRef"
                         id="password"
                         type="password"
                         :rules="passwordRules"
                         v-model="loginInfo.password"
                         placeholder="input password"
                         autocomplete="current-password"
          />
        </div>
        <template #submit>
          <button type="submit" class="btn btn-outline-primary w-100 mb-3">Login</button>
        </template>
      </ValidateForm>
      <div class="text-center small">
        <router-link to="/signup" class="text-black">Sign Up</router-link>
        | <a href="#" class="text-black">Reset password</a>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import ValidateInput from '@/base/ValidateInput.vue'
import ValidateForm from '@/base/ValidateForm.vue'
import { RulesProp } from '@/store/types'

export default defineComponent({
  name: 'LoginView',
  components: { ValidateForm, ValidateInput },
  setup () {
    const emailInputRef = ref<any>()
    const passwordInputRef = ref<any>()
    const emailRules: RulesProp = [
      { type: 'required', message: 'Email cannot be empty!' },
      { type: 'email', message: 'Please input valid email address' }
    ]
    const passwordRules: RulesProp = [
      { type: 'required', message: 'Password cannot be empty!' }
    ]
    const loginInfo = reactive({
      email: '',
      password: ''
    })
    const onFormSubmit = (result: boolean) => {
      if (result) {
        console.log(result)
        emailInputRef.value.clearValue()
        passwordInputRef.value.clearValue()
      }
    }
    return {
      emailInputRef,
      passwordInputRef,
      emailRules,
      passwordRules,
      loginInfo,
      onFormSubmit
    }
  }
})
</script>

<style lang="less" scoped>

</style>
