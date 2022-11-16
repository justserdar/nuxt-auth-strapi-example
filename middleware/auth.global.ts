import { defineNuxtRouteMiddleware } from '#app'
import { useSession } from '#imports'

export default defineNuxtRouteMiddleware(async (to) => {
    if (to.path !== '/protected/globally') {
        return
    }

    console.info('In global middleware! Protecting secrets')
    await useSession()
})
