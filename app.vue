<template>
  <div class="min-h-screen h-full relative bg-gray-100 pb-20">
    <Navbar />
    <NuxtPage />
  </div>
</template>

<script setup lang="ts">
import { useSession } from '#imports'

import Navbar from "~/components/Navbar.vue";
import {useHead} from "#head";
import Welcome from "~/components/Welcome.vue";
const { data, status, signOut, signIn } = await useSession({ required: false })

useHead({
  title: '🔐 nuxt-auth-strapi-example',
})
</script>
