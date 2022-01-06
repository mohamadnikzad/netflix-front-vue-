<template>
    <div class="flex items-center h-screen bg-white dark:bg-gray-900">
        <div
            class="w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800"
        >
            <div class="px-6 py-4">
                <h2
                    class="mb-4 text-2xl font-bold text-center uppercase text-rose-700 first-letter:text-4xl"
                >
                    Netflix
                </h2>
                <p class="mt-1 text-center text-gray-500 dark:text-gray-400">
                    ثبت نام
                </p>
                <form @submit="submitHandler">
                    <div class="w-full mt-4">
                        <input
                            v-model="email"
                            class="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-md dark:text-gray-400 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                            type="email"
                            placeholder="ایمیل خود را وارد کنید"
                            aria-label="Email Address"
                        />
                    </div>
                    <div class="w-full mt-4">
                        <input
                            v-model="username"
                            class="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-md dark:text-gray-400 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                            type="text"
                            placeholder="نام کاربری خود را وارد کنید"
                            aria-label="Username"
                        />
                    </div>

                    <div class="w-full mt-4">
                        <input
                            v-model="password"
                            class="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-md dark:text-gray-400 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                            type="password"
                            placeholder="رمزعبور خود را وارد کنید"
                            aria-label="Password"
                        />
                    </div>

                    <div class="flex items-center justify-between mt-4">
                        <button
                            class="px-4 py-2 leading-5 text-white transition-colors duration-200 transform bg-gray-700 rounded hover:bg-gray-600 focus:outline-none"
                            type="submit"
                        >
                            <span>ثبت نام</span>
                            <span v-if="isLoading">در حال بارگذاری ...</span>
                        </button>
                    </div>
                </form>
            </div>

            <div
                class="flex items-center justify-center py-4 text-center bg-gray-50 dark:bg-gray-700"
            >
                <span class="text-sm text-gray-600 dark:text-gray-200"
                    >حساب کاربری دارید؟
                </span>

                <router-link
                    to="/login"
                    class="mx-2 text-sm font-bold text-blue-500 dark:text-blue-400 hover:underline"
                    >ورود</router-link
                >
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from '@vue/runtime-core'
import axios from 'axios'
import { useMutation } from 'vue-query'
import { useRouter } from 'vue-router'

export default defineComponent({
    setup() {
        const router = useRouter()
        const username = ref<string>('')
        const email = ref('')
        const password = ref<string | number>('')
        // username.value = 'mammad'
        const { mutate, isLoading } = useMutation(
            (body) => {
                return axios.post(
                    'http://localhost:8000/api/auth/register',
                    body
                )
            },
            {
                onSuccess: (data) => {
                    router.push('/')
                },
            }
        )
        const submitHandler = (e) => {
            e.preventDefault()
            if (username.value && password.value && email.value) {
                let body: any = {
                    username: username.value,
                    email: email.value,
                    password: password.value,
                }
                mutate(body)
            } else {
                alert('لطفا فیلد های ثبت نام را پر کنید')
            }
        }
        return { submitHandler, username, password, email, isLoading }
    },
})
</script>
