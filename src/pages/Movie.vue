<script lang="ts">
import { defineComponent } from 'vue'
import { useQuery } from 'vue-query'
import { useRoute, useRouter } from 'vue-router'
import { fetcher } from '../util/fetcher'

export default defineComponent({
    name: 'Movie',
    setup() {
        const route = useRoute()
        const router = useRouter()
        const id = route?.params?.id
        const { isFetching, data: movie } = useQuery(
            ['movie', id],
            () => {
                return fetcher(`http://localhost:8000/api/movies/${id}`)
            },
            { enabled: true }
        )
        const goBack = () => {
            router.back()
        }
        return { isFetching, movie, goBack }
    },
})
</script>

<template>
    <div
        class="flex items-center justify-center w-screen h-screen"
        v-if="isFetching"
    >
        <h1 class="text-5xl font-bold text-rose-600">در حال بارگذاری ...</h1>
    </div>
    <div class="container max-w-4xl p-4 mx-auto my-6" v-else>
        <div class="flex items-center justify-between px-4 my-10 sm:px-0">
            <h2 class="text-xl font-bold md:text-2xl lg:text-4xl">
                {{ movie.title }}
            </h2>
            <h5
                class="text-lg font-semibold underline cursor-pointer text-rose-600 underline-offset-4"
                @click="goBack"
            >
                صفحه قبل
            </h5>
        </div>
        <div
            class="flex flex-col justify-between w-full max-w-4xl px-4 py-8 mx-auto bg-gray-800 rounded-lg shadow-2xl shadow-black/60"
        >
            <div class="flex flex-col justify-between md:flex-row">
                <div
                    class="flex flex-col justify-center space-y-4 text-sm text-slate-100 sm:text-base"
                >
                    <p>
                        <span class="text-gray-100">نام فیلم</span>
                        :
                        <span class="font-thin">{{ movie.title }}</span>
                    </p>
                    <p>
                        <span class="text-gray-100">ژانر (موضوع)</span>
                        :
                        <span class="font-thin">{{ movie.genre }}</span>
                    </p>
                    <p>
                        <span class="text-gray-100">زبان</span>
                        :
                        <span class="font-thin">{{ movie.lang }}</span>
                    </p>
                    <p>
                        <span class="text-gray-100">سال انتشار</span>
                        :
                        <span class="font-thin">{{ movie.year }}</span>
                    </p>
                    <p>
                        <span class="text-gray-100">محصول کشور </span>
                        :
                        <span class="font-thin">{{ movie.country }}</span>
                    </p>
                    <p>
                        <span class="text-gray-100">کارگردان</span>
                        :
                        <span class="font-thin">{{ movie.director }}</span>
                    </p>
                    <p class="mb-[1rem!important] sm:mb-0">
                        <span class="text-gray-100">بازیگران</span>
                        :
                        <span class="font-thin">{{ movie.actor }}</span>
                    </p>
                </div>
                <div class="flex">
                    <img class="w-full rounded-lg" :src="movie.imgUrl" />
                </div>
            </div>
            <div class="mt-8">
                <p class="font-thin leading-7 text-justify">{{ movie.desc }}</p>
            </div>
        </div>
    </div>
</template>
