<template>
  <div class="fixed bottom-7 w-full z-10">
    <div class="w-full flex justify-center">
      <div class="">
        <div class="bg-defaultBg w-[569px] rounded-full flex item box-shadow">
          <div class="p-5 flex justify-between w-full">
            <div class="flex space-x-2 h-full justify-center items-center">
              <div
                v-for="pair in getDefaultColorPairs"
                :key="pair.id"
                @click="setColorPair(pair)"
              >
                <color-pair
                  :firstColor="pair.firstColor"
                  :secondColor="pair.secondColor"
                  :active="isActivePair(pair)"
                />
              </div>
            </div>
            <div class="flex space-x-2 h-full justify-center items-center">
              <div>
                <single-color-pair :color="getFirstColor" />
              </div>
              <div>
                <single-color-pair :color="getSecondColor" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ColorPair from "./ColorPair.vue";
export default {
  components: {
    ColorPair,
  },
  data() {
    return {};
  },
  computed: {
    getDefaultColorPairs() {
      return this.$store.state.color.defaultColorPairs;
    },
    getFirstColor() {
      return this.$store.state.color.firstColor;
    },
    getSecondColor() {
      return this.$store.state.color.secondColor;
    },
  },
  methods: {
    isActivePair({ firstColor, secondColor }) {
      return firstColor === this.getFirstColor &&
        secondColor === this.getSecondColor
        ? true
        : false;
    },
    setColorPair(pair) {
      this.$store.dispatch("color/setPrimaryColor", pair.firstColor);
      this.$store.dispatch("color/setColorPair", pair);
    },
  },
};
</script>

<style lang="scss" scoped>
.box-shadow {
  box-shadow: 0px 8px 28px -6px rgba(24, 39, 75, 0.12),
    0px 18px 88px -4px rgba(24, 39, 75, 0.14);
}
</style>
