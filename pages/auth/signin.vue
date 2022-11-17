<script setup lang="ts">
import { useSession } from '#imports'

const { signIn, signOut, data, status, getSession, getCsrfToken, getProviders } = await useSession({ required: false })

const providers = await getProviders()
const crsf = await getCsrfToken()

let credentials = reactive({
  username: "",
  password: "",
  csrfToken: crsf.csrfToken
});

console.log(credentials.crsfToken)

</script>



<template>
  <section class="grid grid-cols-2 wrapper my-6 mx-auto items-center justify-center">
    <!-- login container -->
    <div class="bg-gray-100 flex mx-auto rounded-2xl ease-in-out duration-300 shadow-xl max-w-[60rem] p-5 items-center">
      <!-- form -->
      <div class=" px-8 md:px-16">
        <h2 class="font-bold text-2xl text-[#002D74]">Login</h2>
        <p class="text-xs mt-4 text-[#002D74]">Strapi users can login with their username (or e-mail) and password.</p>
        
        <form class="flex flex-col gap-4">
          <input name="csrfToken" type="hidden" v-model="credentials.csrfToken" />
          <input v-model="credentials.username" class="p-2 mt-8 rounded-xl border" type="text" name="email" placeholder="Email">
          <div class="relative">
            <input v-model="credentials.password" class="p-2 rounded-xl border w-full" type="password" name="password" placeholder="Password">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="gray" class="bi bi-eye absolute top-1/2 right-3 -translate-y-1/2" viewBox="0 0 16 16">
              <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
              <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
            </svg>
          </div>



          <button class="bg-[#002D74] rounded-xl text-white py-2 hover:scale-105 duration-300" @click="signIn('credentials', { callbackUrl: '/protected/globally', username: credentials.username, password: credentials.password })">
            Sign in (Credential Flow)
          </button>

        </form>

    
      </div>

    </div>

    <div class="max-w-5xl mx-auto mt-5 px-5">
          <h3 class="text-xl font-bold ">Authentication Overview</h3>
          <p class="text-sm">See all available authentication & session information below.</p>
          <pre v-if="status"><span>Status:</span> {{ status }}</pre>
          <pre v-if="data"><span>Data:</span> {{ data }}</pre>
          <!-- <pre v-if="csrfToken"><span>CSRF Token:</span> {{ csrfToken }}</pre> -->
          <pre v-if="providers"><span>Providers:</span> {{ providers }}</pre>
        </div>

  </section>
</template>

<style scoped>
  @keyframes fadeIn {
from {top: 20%; opacity: 0;}
to {top: 100; opacity: 1;}

}

@-webkit-keyframes fadeIn {
from {top: 20%; opacity: 0;}
to {top: 100; opacity: 1;}

}

.wrapper {
animation: fadeIn 1000ms ease;
-webkit-animation: fadeIn 1000ms ease;
}

</style>