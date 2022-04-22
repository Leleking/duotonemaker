<template>
  <div class="w-[44px] h-[44px] rounded-full overflow-hidden -rotate-45">
    <div class="flex flex-col h-full">
      <div class="w-full h-full" :style="{ background: primary }"></div>
      <div class="w-full h-full" :style="{ background: secondary }"></div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    primary: {
      type: String,
      default: () => {
        return "";
      },
    },
    secondary: {
      type: String,
      default: () => {
        return "";
      },
    },
  },
};
</script>

<style lang="scss" scoped></style>
