declare module '*.vue' {
    // import  { Router ,useRouter} from 'vue-router'

    import { defineComponent } from 'vue'
    const Component: ReturnType<typeof defineComponent>
    export default Component
}
