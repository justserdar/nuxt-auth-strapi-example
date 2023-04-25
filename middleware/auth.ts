import { defineNuxtRouteMiddleware } from '#app'

export default defineNuxtRouteMiddleware(async () => {
    console.info('in named middleware! protecting secrets')
    await useAuth()
})
