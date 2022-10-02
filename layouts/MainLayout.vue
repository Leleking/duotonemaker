<template>
  <div class="h-full overflow-y-scroll bg-defaultBg relative" id="main">
    <div class="container mx-auto">
      <top-nav />
      <div>
        <Nuxt />
      </div>
    </div>
    <div>
      <bottom-color-pallete />
    </div>
  </div>
</template>

<script>
import BottomColorPallete from "~/components/BottomColorPallete.vue";
export default {
  components: { BottomColorPallete },
};
</script>

<style lan TopNavg="scss" scoped></style>
