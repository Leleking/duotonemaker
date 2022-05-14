<template>
  <vs-dialog
    v-model="show"
    class="rounded-[inherit]"
    not-close
    not-padding
    @close="handleClose"
  >
    <div class="rounded-[inherit]">
      <div class="h-16 bg-primary px-4 flex items-center rounded-[inherit]" w="full">
        <span>
          Photos by Elikem on Unsplash
        </span>
      </div>
      <div class="rounded-[inherit]">
        <img class="block relative rounded-b-[inherit] max-h-[600px]" :src="img?.urls?.regular" alt="">
      </div>
    </div>
  </vs-dialog>
</template>

<script>

export default {
  computed: {
    show () {
      return this.$store.state.preview.show
    },

    img () {
      return this.$store.state.preview.img
    }
  },

  methods: {
    handleClose () {
      this.$store.commit('preview/toggle', false)
    }
  }
}
</script>
