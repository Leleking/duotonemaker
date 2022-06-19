<template>
  <vs-dialog
    v-model="show"
    class="rounded-[inherit]"
    not-close
    not-padding
    width="auto"
  >
    <div class="rounded-[inherit] relative">
      <div
        class="h-16 bg-primary px-4 flex items-center rounded-t-[inherit] w-full"
      >
        <span> Photos by Elikem on Unsplash </span>
      </div>
      <div :class="`rounded-[inherit] h-[30rem]`">
        <svg
          id="preview_svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          :viewBox="`0 0 ${img.width} ${img.height}`"
          class="block relative rounded-b-[inherit] max-h-[28rem]"
          width="100%"
          height="100%"
        >
          <filter :id="`duotone`">
            <feColorMatrix
              type="matrix"
              values="0.67578125 0 0 0 0.28515625 0.73828125 0 0 0 0.0625 0.72265625 0 0 0 0.15625 0 0 0 1 0"
              color-interpolation-filters="sRGB"
              class="jsx-715889512"
            />
          </filter>
          <image
            width="100%"
            height="100%"
            :filter="`url(#duotone)`"
            :xlink:href="img?.urls?.regular"
            x="0"
            y="0"
            preserveAspectRatio="xMidYMid slice"
            class="jsx-715889512"
          />
        </svg>
      </div>
      <div class="absolute bottom-5 right-5">
        <vs-button circle icon floating @click="downloadImg">
          <img src="../assets/images/download.svg">
        </vs-button>
      </div>
    </div>
  </vs-dialog>
</template>

<script>
import duotone from '../utils/duotone'

export default {
  computed: {

    show: {
      get () {
        return this.$store.state.preview.show
      },

      set (value) {
        this.$store.commit('preview/toggle', value)
      }
    },

    img () {
      return this.$store.state.preview.img
    },

    primaryColor () {
      return this.$store.state.color.selectedColorPair.firstColor
    },

    secondaryColor () {
      return this.$store.state.color.selectedColorPair.secondColor
    }
  },

  methods: {

    async downloadImg () {
      const img = document.querySelector('#preview_svg image')
      const imgDataURL = await duotone({
        id: 'canvas',
        src: img.getAttribute('xlink:href'),
        primaryColor: this.primaryColor,
        secondaryColor: this.secondaryColor
      })
      const anchor = document.createElement('a')
      anchor.download = 'doutone_final.png'
      anchor.href = imgDataURL
      anchor.click()
    }
  }
}
</script>
<style lang="scss">
.vs-dialog-content {
  z-index: 9 !important;
}
.vs-dialog {
  min-width: 100px !important;
  margin: 0px !important;
}
</style>
