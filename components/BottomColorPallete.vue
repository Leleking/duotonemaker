<template>
  <div class="fixed bottom-7 w-full z-10">
    <div class="w-full flex justify-center">
      <div class="">
        <div
          class="bg-defaultBg w-1/2 sm:w-[569px] rounded-full flex item box-shadow"
        >
          <div class="py-3 px-5 flex justify-between w-full">
            <div class="flex space-x-2 h-full justify-center items-center">
              <div
                v-for="pair in getDefaultColorPairs"
                :key="pair.id"
                @click="setColorPair(pair)"
              >
                <color-pair
                  :first-color="pair.firstColor"
                  :second-color="pair.secondColor"
                  :active="isActivePair(pair)"
                />
              </div>
            </div>
            <div class="flex space-x-2 h-full justify-center items-center">
              <div @click="openColor(1)">
                <!--  <single-color-pair :color="getFirstColor" /> -->
                <input
                  id=""
                  ref="colorPicker1"
                  v-model="firstColor"
                  type="color"
                  name=""
                  class="input-color"
                  @input="(e) => changeColor(e, 1)"
                />
              </div>
              <div @click="openColor(2)">
                <!-- <single-color-pair :color="getSecondColor" /> -->
                <input
                  id=""
                  ref="colorPicker2"
                  v-model="secondColor"
                  type="color"
                  name=""
                  class="input-color"
                  @input="(e) => changeColor(e, 2)"
                />
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
    return {
      firstColor: "",
      secondColor: "",
      selectedColorPair: {},
    };
  },
  computed: {
    getDefaultColorPairs() {
      return this.$store.state.color.defaultColorPairs;
    },
    getSelectedPairId() {
      return this.$store.state.color.selectedColorPair.id;
    },
    getFirstColor() {
      return this.$store.state.color.selectedColorPair.firstColor;
    },
    getSecondColor() {
      return this.$store.state.color.selectedColorPair.secondColor;
    },
  },
  created() {
    this.firstColor = this.getFirstColor;
    this.secondColor = this.getSecondColor;
  },
  methods: {
    isActivePair({ id }) {
      return id === this.getSelectedPairId;
    },
    setColorPair(pair) {
      this.firstColor = pair.firstColor;
      this.secondColor = pair.secondColor;
      this.$store.dispatch("color/setPrimaryColor", pair.firstColor);
      this.$store.dispatch("color/setColorPair", pair);
    },
    openColor(val) {
      if (val === 1) {
        this.$refs.colorPicker1.click();
      }
      if (val === 2) {
        this.$refs.colorPicker2.click();
      }
      // alert("change color");
    },
    changeColor(_, type) {
      this.$store.dispatch("color/setColorPairById", {
        id: this.getSelectedPairId,
        firstColor: type === 1 ? this.firstColor : this.getFirstColor,
        secondColor: type === 2 ? this.secondColor : this.getSecondColor,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.box-shadow {
  box-shadow: 0px 8px 28px -6px rgba(24, 39, 75, 0.12),
    0px 18px 88px -4px rgba(24, 39, 75, 0.14);
}

.input-color {
  appearance: none;
  background: transparent;
  border: none;
  height: 48px;
  width: 48px;
  cursor: pointer;
}
.input-color::-webkit-color-swatch {
  border-radius: 50%;
  border: none;
}
</style>
