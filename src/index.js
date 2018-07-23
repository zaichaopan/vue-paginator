import VuePaginator from './components/VuePaginator.vue'

const plugin = {
  install (Vue) {
    Vue.component(VuePaginator.name, VuePaginator)
  }
}

export default plugin
