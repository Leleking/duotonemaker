<template>
  <vs-dialog
    v-model="show"
    class="rounded-[inherit]"
    not-close
    not-padding
    @close="handleClose"
  >
    <div class="rounded-[inherit]">
      <div
        class="h-16 bg-primary px-4 flex items-center rounded-[inherit]"
        w="full"
      >
        <span> Photos by Elikem on Unsplash </span>
      </div>
      <div class="rounded-[inherit]">
        <svg
          xmlns:xlink="http://www.w3.org/1999/xlink"
          :viewBox="`0 0 ${img.width} ${img.height}`"
          class="block relative rounded-b-[inherit] max-h-[600px]"
          width="100%"
          :height="`${img.height}`"
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
    </div>
  </vs-dialog>
</template>

<script>
export default {
  computed: {
    show() {
      return this.$store.state.preview.show;
    },

    img() {
      return this.$store.state.preview.img;
    },
  },

  methods: {
    handleClose() {
      this.$store.commit("preview/toggle", false);
    },
  },
  created() {
    console.log(this.img);
  },
};
</script>