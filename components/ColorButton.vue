<template>
  <div>
    <div
      :style="{ background: color }"
      class="flex justify-center items-center h-[22px] w-[22px] md:h-[30px] md:w-[30px] rounded-full"
    >
      <div v-if="primary" class="bg-white h-[10px] w-[10px] rounded-full" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    color: {
      type: String,
      default: () => {
        return "rgb(235, 37, 90)";
      },
    },
    primary: {
      type: Boolean,
      default: () => {
        return false;
      },
    },
  },
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped></style>
