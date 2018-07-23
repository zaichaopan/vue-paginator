<script>
export default {
  name: 'vue-paginator',
  props: {
    meta: {
      type: Object,
      required: true,
      validator (value) {
        return ['total', 'current_page', 'last_page'].every(prop => {
          return value === null || Object.keys(value).length === 0 || Object.keys(value).includes(prop)
        })
      }
    },
    pagesPerSection: {
      type: Number,
      default: 10
    }
  },
  computed: {
    showPaginator () {
      return this.meta !== null && this.meta.total > 0
    },
    currentSection () {
      return Math.ceil(this.meta.current_page / this.pagesPerSection)
    },
    totalSections () {
      return Math.ceil(this.meta.last_page / this.pagesPerSection)
    },
    pages () {
      let pages = this.currentSection !== this.totalSections
        ? this.pagesPerSection
        : this.meta.last_page - this.pagesPerSection * (this.currentSection - 1)

      let pagesArr = Array.from(Array(pages), (val, i) => (this.currentSection - 1) * this.pagesPerSection + i + 1)

      if (this.currentSection === 1) {
        if (this.pagesPerSection > this.meta.last_page) {
          pagesArr = Array.from(Array(this.meta.last_page), (val, i) => i + 1)
        }
        return pagesArr
      }

      if (pagesArr.length < this.pagesPerSection) {
        pagesArr = Array.from(
          Array(this.pagesPerSection),
          (val, i) => pagesArr[pagesArr.length - 1] - this.pagesPerSection + i + 1
        )
      }

      return pagesArr
    },
    section () {
      let showPrev = this.currentSection > 1
      let showNext = this.currentSection < this.totalSections

      return {
        showNext,
        showPrev,
        prev: () => {
          let page = (this.currentSection - 2) * this.pagesPerSection + 1
          this.toPage(page)
        },
        next: () => {
          let page = this.currentSection * this.pagesPerSection + 1
          this.toPage(page)
        }
      }
    }
  },
  methods: {
    next () {
      this.toPage(parseInt(this.meta.current_page, 10) + 1)
    },
    prev () {
      this.toPage(parseInt(this.meta.current_page, 10) - 1)
    },
    toPage (page) {
      if (page < 1 || page > parseInt(this.meta.last_page, 10)) {
        return
      }

      this.$emit('pagination:switched', page)
    }
  },
  render () {
    return this.$scopedSlots.default({
      showPaginator: this.showPaginator,
      pages: this.pages,
      section: this.section,
      switcher: {
        toPage: this.toPage,
        next: this.next,
        prev: this.prev
      }
    })
  }
}
</script>
