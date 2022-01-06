<script lang="ts">
import axios, { AxiosRequestConfig } from 'axios'
import { defineComponent } from 'vue'
import { useMutation, useQueryClient, useQuery } from 'vue-query'
import Vuetable from 'vuetable-2'
import { fetcher } from '../util/fetcher'
import { getToken } from '../util/getToken'
export default defineComponent({
    name: 'Admin',
    components: {
        Vuetable,
    },
    setup() {
        const q = useQueryClient()
        const { isFetching, data: users } = useQuery(
            'users',
            () => {
                return fetcher(`http://localhost:8000/api/users`)
            },
            { enabled: true }
        )
        const { isFetching: loading, data: movies } = useQuery(
            'movies',
            () => {
                return fetcher(`http://localhost:8000/api/movies`)
            },
            { enabled: true }
        )
        const { mutate } = useMutation(
            (id) => {
                const config: AxiosRequestConfig = {
                    headers: {
                        token: `Bearer ${getToken()}`,
                    },
                }
                return axios.delete(
                    `http://localhost:8000/api/users/${id}`,
                    config
                )
            },
            {
                onSuccess: (data) => {
                    q.refetchQueries('users')
                },
            }
        )
        const { mutate: deleteM } = useMutation(
            (id) => {
                const config: AxiosRequestConfig = {
                    headers: {
                        token: `Bearer ${getToken()}`,
                    },
                }
                return axios.delete(
                    `http://localhost:8000/api/movies/${id}`,
                    config
                )
            },
            {
                onSuccess: () => {
                    q.refetchQueries('movies')
                },
            }
        )
        const deteleUser = (id: any) => {
            mutate(id)
        }
        const deleteMovie = (id: any) => {
            deleteM(id)
        }
        return { isFetching, users, deteleUser, movies, deleteMovie, loading }
    },
})
</script>
<template>
    <div
        class="flex items-center justify-center w-screen h-screen"
        v-if="isFetching || loading"
    >
        <h1 class="text-5xl font-bold text-rose-600">در حال بارگذاری ...</h1>
    </div>
    <div class="container px-4 mx-auto my-6" v-else>
        <div class="flex flex-col w-full">
            <h1 class="my-4 text-4xl font-bold">کاربران</h1>
            <div class="flex items-cetner">
                <div
                    class="flex items-center justify-center flex-1 p-2 font-semibold text-center border border-gray-500"
                >
                    نام کاربری
                </div>
                <div
                    class="flex items-center justify-center flex-1 p-2 font-semibold text-center border border-gray-500"
                >
                    ایمیل
                </div>
                <div
                    class="flex items-center justify-center w-24 p-2 font-semibold text-center border border-gray-500"
                >
                    نقش
                </div>
                <div
                    class="flex items-center justify-center flex-1 p-2 font-semibold text-center border border-gray-500"
                >
                    تاریخ ساخت
                </div>
                <div
                    class="flex items-center justify-center w-24 p-2 font-semibold text-center border border-gray-500"
                >
                    عملیات
                </div>
            </div>
            <div
                class="flex items-cetner"
                v-for="user in users"
                :key="user._id"
            >
                <div
                    class="flex items-center justify-center flex-1 p-2 text-center border border-gray-500"
                >
                    {{ user.username }}
                </div>
                <div
                    class="flex items-center justify-center flex-1 p-2 text-center border border-gray-500"
                >
                    {{ user.email }}
                </div>
                <div
                    class="flex items-center justify-center w-24 p-2 text-center border border-gray-500"
                >
                    {{ user.isAdmin ? 'مدیر' : 'کاربر' }}
                </div>
                <div
                    class="flex items-center justify-center flex-1 p-2 text-center border border-gray-500"
                >
                    {{ user.createdAt.split('T')[0].toLocaleString() }}
                </div>
                <div
                    @click="deteleUser(user._id)"
                    class="flex items-center justify-center w-24 p-2 text-center underline border border-gray-500 cursor-pointer text-rose-500"
                >
                    X
                </div>
            </div>
        </div>
        <div class="flex flex-col w-full">
            <h1 class="my-4 text-4xl font-bold">فیلم ها</h1>
            <div class="flex items-cetner">
                <div
                    class="flex items-center justify-center flex-1 p-2 font-semibold text-center border border-gray-500"
                >
                    نام فیلم
                </div>
                <div
                    class="flex items-center justify-center flex-1 p-2 font-semibold text-center border border-gray-500"
                >
                    نوع
                </div>
                <div
                    class="flex items-center justify-center flex-1 p-2 font-semibold text-center border border-gray-500"
                >
                    زبان
                </div>
                <div
                    class="flex items-center justify-center flex-1 p-2 font-semibold text-center border border-gray-500"
                >
                    تاریخ ساخت
                </div>
                <div
                    class="flex items-center justify-center w-24 p-2 font-semibold text-center border border-gray-500"
                >
                    عملیات
                </div>
            </div>
            <div
                class="flex items-cetner"
                v-for="movie in movies"
                :key="movie._id"
            >
                <div
                    class="flex items-center justify-center flex-1 p-2 text-center border border-gray-500"
                >
                    {{ movie.title }}
                </div>
                <div
                    class="flex items-center justify-center flex-1 p-2 text-center border border-gray-500"
                >
                    {{ movie.isSeries ? 'سریال' : 'فیلم' }}
                </div>
                <div
                    class="flex items-center justify-center flex-1 p-2 text-center border border-gray-500"
                >
                    {{ movie.lang }}
                </div>
                <div
                    class="flex items-center justify-center flex-1 p-2 text-center border border-gray-500"
                >
                    {{ movie.createdAt.split('T')[0].toLocaleString() }}
                </div>
                <div
                    @click="deleteMovie(movie._id)"
                    class="flex items-center justify-center w-24 p-2 text-center underline border border-gray-500 cursor-pointer text-rose-500"
                >
                    X
                </div>
            </div>
        </div>
    </div>
</template>
