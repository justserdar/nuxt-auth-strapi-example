import { defineNuxtRouteMiddleware } from '#app'
import { useSession } from '#imports'

export default defineNuxtRouteMiddleware(async (to) => {
    if (to.path.startsWith('/protected/')) {
        await useSession({ callbackUrl: to.path })
    }
  })