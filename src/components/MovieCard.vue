<script lang="ts">
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
    name: 'MoveCard',
    props: {
        movie: {
            type: Object,
            required: true,
        },
    },
    setup() {
        const router = useRouter()
        const handleClick = (id: string) => {
            console.log(id)
            router.push({
                name: 'Movie',
                params: {
                    id,
                },
            })
        }
        return { handleClick }
    },
})
</script>
<template>
    <li @click="handleClick(movie._id)" class="cursor-pointer">
        <img
            class="object-contain rounded-lg shadow-lg shadow-black/70"
            :src="movie.imgUrl"
            alt="avatar"
        />
    </li>
    <!-- <li class="relative bg-white rounded-lg shadow-lg dark:bg-gray-800">
        <div class="flex h-72">
        <img class="object-contain" :src="movie.imgUrl" alt="avatar" />
        </div>
        <div class="px-2 py-4 text-center">
            <h3
                class="block py-2 overflow-hidden text-xl font-bold text-gray-800 border-b border-gray-700 dark:text-white text-ellipsis whitespace-nowrap"
            >
                {{ movie.title }}
            </h3>
            <div class="flex flex-col pt-2 mt-2 space-y-3 text-gray-300">
                <div class="flex text-sm">
                    <span class="font-semibold"> ژانر (موضوع) : </span>
                    <p class="mr-1 overflow-ellipsis">{{ movie.genre }}</p>
                </div>
                <div class="flex text-sm">
                    <span class="font-semibold"> زبان : </span>
                    <p class="mr-1 overflow-ellipsis">{{ movie.lang }}</p>
                </div>
                <div class="flex text-sm">
                    <span class="font-semibold"> کارگردان : </span>
                    <p class="mr-1 overflow-ellipsis">{{ movie.director }}</p>
                </div>
                <div class="flex text-sm">
                    <span class="ml-1 font-semibold"> بازیگران </span> :
                    <p class="mr-1 text-xs text-right">{{ movie.actor }}</p>
                </div>
            </div>
            <button
                class="relative z-10 px-6 py-2 mx-auto text-sm rounded-md top-8 bg-rose-500"
            >
                مشاهده بیشتر
            </button>
        </div>
    </li> -->
</template>
