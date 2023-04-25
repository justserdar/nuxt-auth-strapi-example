<template>
  <div class="min-h-screen h-full relative bg-gray-100 pb-20">
    <Navbar />
    <NuxtPage />
  </div>
</template>

<script setup lang="ts">
import Navbar from "~/components/Navbar.vue";
import Welcome from "~/components/Welcome.vue";
const { data, status, signOut, signIn } = await useAuth({ required: false })

useHead({
  title: '🔐 nuxt-auth-strapi-example',
})
</script>
