<template>
  <div class="w-[44px] h-[44px] rounded-full overflow-hidden -rotate-45">
    <div class="w-full h-full" :style="{ background: color }" />
  </div>
</template>

<script>
export default {
  props: {
    color: {
      type: String,
      default: () => {
        return "";
      },
    },
  },
};
</script>
