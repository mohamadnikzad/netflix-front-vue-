<template>
    <Navbar v-if="showNav" />

    <router-view></router-view>
    <VueQueryDevTools />
</template>

<script lang="ts">
import { defineComponent, ref, watchEffect } from 'vue'
import { useQueryProvider } from 'vue-query'
import { useRoute, useRouter } from 'vue-router'
import Navbar from './components/navbar/Navbar.vue'
import { VueQueryDevTools } from 'vue-query/devtools'

export default defineComponent({
    name: 'App',
    components: {
        Navbar,
        VueQueryDevTools,
    },
    setup() {
        const route = useRoute()
        const showNav = ref<boolean>(false)

        watchEffect(() => {
            if (route.path === '/login' || route.path === '/register')
                showNav.value = false
            else showNav.value = true
        })

        useQueryProvider({
            defaultOptions: {
                queries: {
                    refetchOnWindowFocus: false,
                    refetchOnMount: false,
                },
            },
        })
        return { showNav }
    },
})
</script>
