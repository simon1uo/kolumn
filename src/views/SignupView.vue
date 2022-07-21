<template>
  <div class="mx-auto w-50 p-3">
    <div class="h2 text-primary">Create an account 🚀</div>
    <div class="p-2">
      <ValidateForm @form-submit="onFormSubmit">
        <div>
          <label for="email">Email</label>
          <ValidateInput ref="emailInputRef"
                         id="email"
                         type="text"
                         :rules="emailRules"
                         v-model="signupInfo.email"
                         placeholder="input email address"
                         autocomplete="email"/>
        </div>
        <div class="mb-3">
          <label for="password" class="form-label">Password</label>
          <ValidateInput ref="passwordInputRef"
                         id="password"
                         type="password"
                         :rules="passwordRules"
                         v-model="signupInfo.password"
                         placeholder="input password"
          />
        </div>
        <template #submit>
          <button type="submit" class="btn btn-primary w-100 my-3">Create an account</button>
        </template>
        <div class="text-black-50 small">By signing up you agree to our <a href="#">terms and privacy policy</a></div>
      </ValidateForm>
      <div class="text-center small">
        <router-link to="/login" class="text-black">Log in</router-link> | <a href="#" class="text-black">Reset password</a>
      </div>
    </div>
  </div>

</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import ValidateInput, { RulesProp } from '@/components/ValidateInput.vue'
import ValidateForm from '@/components/ValidateForm.vue'

export default defineComponent({
  name: 'SignupView',
  components: { ValidateInput, ValidateForm },
  setup () {
    const signupInfo = reactive({
      email: '',
      password: ''
    })

    const emailRules: RulesProp = [
      { type: 'required', message: 'Email cannot be empty!' },
      { type: 'email', message: 'Please input valid email address' }
    ]
    const passwordRules: RulesProp = [
      { type: 'required', message: 'Password cannot be empty!' }
    ]

    const onFormSubmit = (result: boolean) => {
      if (result) {
        console.log(result)
      }
    }

    return {
      signupInfo,
      emailRules,
      passwordRules,
      onFormSubmit
    }
  }
})
</script>

<style lang="less" scoped>

</style>
