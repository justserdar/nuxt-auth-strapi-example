<script lang="ts">
export default {
  props: {
    protectionType: String,
    href: String,
  }
}
</script>

<script setup lang="ts">
const headers = useRequestHeaders(['cookie'])
const { data, pending, error, refresh } = await useFetch(`/api/admin/data`, { headers: { cookie: headers.cookie } });

</script>

<template>
  <div class="text-center mt-10">
    <h1 class="text-2xl font-bold">I'm a secret.</h1>



      <p class="text-sm mb-4">This page sends the frontend jwt (cookie) to nitro and the api endpoint extracts the original Strapi User JWT from the Nuxt-Auth Session JWT to call Strapi endpoints that require authorisation.</p>
      <pre v-if="pending"><span>Pending:</span> {{ pending }}</pre>
      <p v-if="data" class="sm:px-8 mx-16"><span>Response:</span> {{ data[0] }}</p>
      <pre v-if="error"><span>Error:</span> {{ error }}</pre>


    <div class="w-full mx-auto mt-10">

      <button
        class="mx-auto space-x-2 bg-sky-500 text-white rounded-lg py-2 px-3 text-lg"
        @click="refresh">
        <span>Refresh Data</span>
      </button>    
    </div>
  </div>
</template>

<style scoped>
a {
  @apply text-green-600 underline hover:text-green-500;
}
</style>
