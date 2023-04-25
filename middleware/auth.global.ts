import { defineNuxtRouteMiddleware } from '#app'

export default defineNuxtRouteMiddleware(async (to) => {
    if (to.path.startsWith('/protected')) {
        await useAuth({ callbackUrl: to.path })
    }
  })