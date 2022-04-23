<template>
  <div>
    <div
      :class="`${
        active ? 'border-[3px] rounded-full p-[3px] border-danger' : ''
      }`"
    >
      <div class="w-[44px] h-[44px] rounded-full overflow-hidden -rotate-45">
        <div class="flex flex-col h-full">
          <div class="w-full h-full" :style="{ background: primary }"></div>
          <div class="w-full h-full" :style="{ background: secondary }"></div>
        </div>
      </div>
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
    active: {
      type: Boolean,
      default: () => {
        return false;
      },
    },
  },
};
</script>

<style lang="scss" scoped></style>
