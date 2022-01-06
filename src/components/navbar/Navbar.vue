<template>
    <nav class="bg-white shadow dark:bg-gray-800">
        <div class="container p-4 mx-auto">
            <div class="sm:flex sm:items-center sm:justify-between">
                <div class="flex items-center justify-between">
                    <router-link
                        class="text-2xl font-extrabold tracking-wider uppercase transition-colors duration-200 transform text-rose-600 first-letter:text-4xl hover:text-gray-700 dark:hover:text-gray-300"
                        to="/"
                        >Netflix</router-link
                    >

                    <!-- Mobile menu button -->
                    <div class="flex sm:hidden">
                        <button
                            type="button"
                            class="text-gray-500 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400 focus:outline-none focus:text-gray-600 dark:focus:text-gray-400"
                            aria-label="toggle menu"
                            @click="toggleMenu"
                        >
                            <svg
                                viewBox="0 0 24 24"
                                class="w-6 h-6 fill-current"
                            >
                                <path
                                    fill-rule="evenodd"
                                    d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
                                />
                            </svg>
                        </button>
                    </div>
                </div>

                <!-- Mobile Menu open: "block", Menu closed: "hidden" -->
                <div
                    class="flex-1 sm:flex sm:items-center sm:justify-between"
                    :class="{ block: toggle, hidden: !toggle }"
                >
                    <div
                        class="flex flex-col -mx-4 sm:flex-row sm:items-center sm:mx-8"
                    >
                        <router-link
                            to="/explore"
                            class="px-2 py-1 mx-2 mt-2 text-sm font-medium text-gray-700 transition-colors duration-200 transform rounded-sm sm:mt-0 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-700"
                        >
                            جستوجو
                        </router-link>
                        <router-link
                            v-if="user?.isAdmin"
                            class="px-2 py-1 mx-2 mt-2 text-sm font-medium text-gray-700 underline transition-colors duration-200 transform rounded-sm sm:mt-0 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-700"
                            to="/admin"
                            >پنل ادمین</router-link
                        >
                    </div>

                    <div class="flex items-center mt-4 sm:mt-0">
                        <div class="flex items-center" v-if="!user">
                            <router-link
                                class="px-4 py-2 mr-2 text-sm font-medium tracking-wide text-gray-100 capitalize transition-colors duration-200 transform bg-gray-600 rounded-sm hover:bg-gray-500 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-80"
                                to="/login"
                                >Login</router-link
                            >
                            <router-link
                                class="px-4 py-2 mr-2 text-sm font-medium tracking-wide text-gray-100 capitalize transition-colors duration-200 transform border border-gray-500 rounded-sm bg-gray-transparent hover:bg-gray-500 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-80"
                                to="/register"
                                >Register</router-link
                            >
                        </div>

                        <div class="flex items-center" v-else>
                            <h6 class="mx-1 text-gray-900 dark:text-gray-100">
                                سلام {{ user.username }}
                            </h6>
                            <button
                                class="mr-4 underline text-rose-600 underline-rose-600"
                                @click="logoutHandler"
                            >
                                خروج
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </nav>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
    setup() {
        const toggle = ref<boolean>(false)
        let router = useRouter()
        let user = ref(JSON.parse(localStorage.getItem('user')))
        const logoutHandler = () => {
            localStorage.removeItem('user')
            router.push('/login')
            user.value = null
        }
        const toggleMenu = () => {
            toggle.value = !toggle.value
        }
        return { user, logoutHandler, toggle, toggleMenu }
    },
})
</script>
