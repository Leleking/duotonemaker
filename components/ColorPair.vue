<template>
  <div>
    <div
      :class="`${
        active ? 'border-[3px] rounded-full p-[3px] border-danger' : ''
      }`"
    >
      <div
        class="h-[36px] w-[36px] md:w-[44px] md:h-[44px] rounded-full overflow-hidden -rotate-45"
      >
        <div class="flex flex-col h-full">
          <div class="w-full h-full" :style="{ background: firstColor }" />
          <div class="w-full h-full" :style="{ background: secondColor }" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    firstColor: {
      type: String,
      default: () => {
        return "";
      },
    },
    secondColor: {
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
