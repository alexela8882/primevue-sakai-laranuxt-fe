<script setup>

import * as msal from "@azure/msal-browser"

definePageMeta({
  middleware: 'guest',
  layout: 'empty'
});

// refs
const { $sanctumAuth } = useNuxtApp()
const { $appState } = useNuxtApp();
const email = ref('');
const password = ref('');
const checked = ref(false);
const logoColor = computed(() => ($appState.darkTheme ? 'white' : 'dark'));
const form = ref({ username: "super@admin.com", password: "superadmin" })

const msalConfig = {
  auth: {
    clientId: 'e028f6b9-6fbb-443a-a5c9-5e8f306e4dec',
    authority: 'https://login.microsoftonline.com/{ee2fc0c6-4a49-4dfe-bcd0-a9b735f30129}',
    redirectUri: 'http://localhost:8000/api/azure/callback'
  }
}

const msalInstance = new msal.PublicClientApplication(msalConfig)
await msalInstance.initialize()

const login = async () => {
  console.log("test login")
  console.log(form.value)
  try {
    await $sanctumAuth.login({
      email: form.value.username,
      password: form.value.password
    })

    console.log(form.value)
  } catch (e) {
    // your error handling
    // errors.value = e.errors
    console.log(e)
  }
}

const azureLogin = async () => {
  try {
    const loginResponse = await msalInstance.loginPopup()
  } catch (err) {
    // handle error
  }
}

const azureLoginExt = () => {
  window.location = "http://localhost:8000/api/azure/redirect"
}

const azureLogout = async () => {
  msalInstance.logoutPopup()
}

</script>

<template>
  <div class="surface-0 flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden">
    <div class="grid justify-content-center p-2 lg:p-0" style="min-width:80%">
      <div class="col-12 mt-5 xl:mt-0 text-center">
        <img :src="`/images/logo-${logoColor}.svg`" alt="Sakai logo" class="mb-5" style="width:81px; height:60px;">
      </div>
      <div class="col-12 xl:col-6" style="border-radius:56px; padding:0.3rem; background: linear-gradient(180deg, var(--primary-color), rgba(33, 150, 243, 0) 30%);">
        <div class="h-full w-full m-0 py-7 px-4" style="border-radius:53px; background: linear-gradient(180deg, var(--surface-50) 38.9%, var(--surface-0));">
          <div class="text-center mb-5">
            <img src="/images/avatar/avatar.png" alt="Image" height="50" class="mb-3">
            <div class="text-900 text-3xl font-medium mb-3">
              Welcome, Isabel!
            </div>
            <span class="text-600 font-medium">Sign in to continue</span>
          </div>

          <div class="w-full md:w-10 mx-auto">
            <label for="email1" class="block text-900 text-xl font-medium mb-2">Email</label>
            <InputText
              id="email1"
              v-model="form.username"
              type="text"
              class="w-full mb-3"
              placeholder="Email"
              style="padding:1rem;"
            />

            <label for="password1" class="block text-900 font-medium text-xl mb-2">Password</label>
            <Password
              id="password1"
              v-model="form.password"
              placeholder="Password"
              :toggle-mask="true"
              class="w-full mb-3"
              input-class="w-full"
              input-style="padding:1rem"
            />

            <div class="flex align-items-center justify-content-between mb-5">
              <div class="flex align-items-center">
                <Checkbox id="rememberme1" v-model="checked" :binary="true" class="mr-2" />
                <label for="rememberme1">Remember me</label>
              </div>
              <a class="font-medium no-underline ml-2 text-right cursor-pointer" style="color: var(--primary-color)">Forgot password?</a>
            </div>
            <Button @click="login" label="Sign In" class="w-full p-3 text-xl" />
            <Button @click="azureLogin" label="Sign In With Microsoft" class="w-full p-3 text-xl my-3" />
            <Button @click="azureLoginExt" label="Sign In With Microsoft (External)" class="w-full p-3 text-xl my-3" />
            <Button @click="azureLogout" label="Logout" class="w-full p-3 text-xl my-3" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.pi-eye {
    transform:scale(1.6);
    margin-right: 1rem;
}

.pi-eye-slash {
    transform:scale(1.6);
    margin-right: 1rem;
}
</style>
