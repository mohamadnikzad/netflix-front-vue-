<script lang="ts">
import { defineComponent, onMounted } from 'vue'
import MovieCard from '../components/MovieCard.vue'
import { useQuery, useQueryClient } from 'vue-query'
import { fetcher } from '../util/fetcher'
import SwiperCore, { Navigation, FreeMode } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/vue'
SwiperCore.use([Navigation, FreeMode])
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/free-mode'
import { getToken } from '../util/getToken'
export default defineComponent({
    components: {
        MovieCard,
        Swiper,
        SwiperSlide,
        Navigation,
    },
    setup() {
        const q = useQueryClient()
        const {
            isFetching,
            data: persianMovies,
            refetch,
        } = useQuery(
            'persianMovies',
            () => {
                return fetcher(
                    'http://localhost:8000/api/movies?isPersian=true&isSeries=false'
                )
            },
            {
                enabled: true,
            }
        )
        const { isFetching: pSeriesLoading, data: series } = useQuery(
            'persianSeries',
            () => {
                return fetcher(
                    'http://localhost:8000/api/movies?isPersian=true&isSeries=true'
                )
            },
            {
                enabled: true,
            }
        )
        const { isFetching: moviesLoading, data: movies } = useQuery(
            'movies',
            () => {
                return fetcher(
                    'http://localhost:8000/api/movies?isPersian=false&isSeries=false'
                )
            },
            {
                enabled: true,
            }
        )
        const { isFetching: seriesLoading, data: eSeries } = useQuery(
            'series',
            () => {
                return fetcher(
                    'http://localhost:8000/api/movies?isPersian=false&isSeries=true'
                )
            },
            {
                enabled: true,
            }
        )

        return {
            isFetching,
            persianMovies,
            movies,
            moviesLoading,
            series,
            pSeriesLoading,
            eSeries,
            seriesLoading,
            modules: [Navigation, FreeMode],
        }
    },
})
</script>
<template>
    <main class="container w-full h-full px-4 pb-8 mx-auto">
        <h2 class="my-10 ml-4 text-xl font-bold md:text-2xl lg:text-4xl">
            فیلم های ایرانـی
        </h2>
        <div v-if="isFetching">Loading...</div>
        <swiper
            v-else
            :modules="modules"
            navigation
            :free-mode="true"
            :slides-per-view="2"
            :space-between="20"
            :breakpoints="{
                556: {
                    slidesPerView: 2,
                    spaceBetween: 20,
                },
                768: {
                    slidesPerView: 3,
                    spaceBetween: 20,
                },
                1024: {
                    slidesPerView: 5,
                    spaceBetween: 20,
                },
            }"
        >
            <swiper-slide v-for="movie in persianMovies" :key="movie.id">
                <MovieCard :movie="movie" />
            </swiper-slide>
        </swiper>
        <h2 class="my-10 ml-4 text-xl font-bold md:text-2xl lg:text-4xl">
            فیلم های خارجی
        </h2>
        <div v-if="moviesLoading">Loading...</div>
        <swiper
            v-else
            :modules="modules"
            navigation
            :free-mode="true"
            :slides-per-view="2"
            :space-between="20"
            :breakpoints="{
                556: {
                    slidesPerView: 2,
                    spaceBetween: 20,
                },
                768: {
                    slidesPerView: 3,
                    spaceBetween: 20,
                },
                1024: {
                    slidesPerView: 5,
                    spaceBetween: 20,
                },
            }"
        >
            <swiper-slide v-for="movie in movies" :key="movie.id">
                <MovieCard :movie="movie" />
            </swiper-slide>
        </swiper>

        <h2 class="my-10 ml-4 text-xl font-bold md:text-2xl lg:text-4xl">
            سریال های ایرانی
        </h2>
        <div v-if="pSeriesLoading">Loading...</div>
        <swiper
            v-else
            :modules="modules"
            navigation
            :free-mode="true"
            :slides-per-view="2"
            :space-between="20"
            :breakpoints="{
                556: {
                    slidesPerView: 2,
                    spaceBetween: 20,
                },
                768: {
                    slidesPerView: 3,
                    spaceBetween: 20,
                },
                1024: {
                    slidesPerView: 5,
                    spaceBetween: 20,
                },
            }"
        >
            <swiper-slide v-for="movie in series" :key="movie.id">
                <MovieCard :movie="movie" />
            </swiper-slide>
        </swiper>

        <h2 class="my-10 ml-4 text-xl font-bold md:text-2xl lg:text-4xl">
            سریال های خارجی
        </h2>
        <div v-if="seriesLoading">Loading...</div>
        <swiper
            v-else
            :modules="modules"
            navigation
            :free-mode="true"
            :slides-per-view="2"
            :space-between="20"
            :breakpoints="{
                556: {
                    slidesPerView: 2,
                    spaceBetween: 20,
                },
                768: {
                    slidesPerView: 3,
                    spaceBetween: 20,
                },
                1024: {
                    slidesPerView: 5,
                    spaceBetween: 20,
                },
            }"
        >
            <swiper-slide v-for="movie in eSeries" :key="movie.id">
                <MovieCard :movie="movie" />
            </swiper-slide>
        </swiper>
    </main>
</template>
