<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useQuery, useQueryClient } from 'vue-query'
import { fetcher } from '../util/fetcher'
import MovieCard from '../components/MovieCard.vue'

export default defineComponent({
    name: 'Explore',
    components: {
        MovieCard,
    },
    setup() {
        const q = useQueryClient()
        const title = ref<string>('')

        const { isFetching, data: movies } = useQuery(
            'explore',
            () => {
                return fetcher(
                    `http://localhost:8000/api/movies?title=${title.value}`
                )
            },
            { enabled: true }
        )
        const handleSearch = () => {
            q.refetchQueries('explore')
        }
        return { isFetching, movies, title, handleSearch }
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
    <div class="container px-4 mx-auto my-6" v-else>
        <div class="flex items-center w-full my-6">
            <input
                v-model="title"
                class="flex w-full px-4 py-2 text-gray-300 placeholder-gray-500 bg-white border rounded-md dark:text-gray-400 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-gray-500 dark:focus:border-gray-500 focus:outline-none focus:ring"
                type="email"
                placeholder="جستوجو براساس نام فیلم"
                aria-label="Email address"
            />
            <button
                class="flex px-6 py-2 mr-2 rounded-md bg-rose-600"
                @click="handleSearch"
            >
                جستوجو
            </button>
        </div>
        <ul
            class="grid w-full grid-cols-2 gap-10 md:grid-cols-3 lg:grid-cols-5"
        >
            <div class="flex" v-for="movie in movies" :key="movie.id">
                <MovieCard :movie="movie" />
            </div>
        </ul>
    </div>
</template>
