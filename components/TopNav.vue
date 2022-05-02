<template>
  <div>
    <div class="py-[30px]">
      <div class="flex justify-between">
        <div class="flex items-center space-x-1">
          <div @click="setPrimaryColor(getFirstColor)">
            <color-button
              :color="getFirstColor"
              :primary="getFirstColor === getPrimaryColor"
            />
          </div>
          <div @click="setPrimaryColor(getSecondColor)">
            <color-button
              :color="getSecondColor"
              :primary="getSecondColor === getPrimaryColor"
            />
          </div>
        </div>
        <div class="flex">
          <div
            class="grid grid-cols-2 divide-grey divide-x items-center w-[536px] h-full shadow-lg rounded-full px-2"
          >
            <div>
              <vs-input v-model="search" placeholder="Search for image on" />
            </div>
            <div class="flex items-center">
              <div>
                <img :src="getSelectedImgOption.src" alt="" />
              </div>
              <div>
                <vs-select placeholder="Select" v-model="selectedImgOption">
                  <vs-option
                    v-for="item in imgOptions"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  >
                    <div class="flex space-x-2">
                      <img :src="item.src" alt="" />
                      <span class="text-dark">{{ item.name }}</span>
                    </div>
                  </vs-option>
                </vs-select>
              </div>
              <div>
                <vs-button circle dark>
                  <div class="text-white font-">Search</div>
                </vs-button>
              </div>
            </div>
          </div>
          <div>
            <vs-button circle danger>
              <div class="text-white font-[16px] flex items-center space-x-1">
                <i class="bx bx-upload text-white" style="font-size: 16px"></i>
                <span> Upload image</span>
              </div>
            </vs-button>
          </div>
        </div>
        <div>
          <vs-button circle primary>
            <div class="text-dark font-[16px] flex items-center space-x-1">
              <span> Spread the</span>
              <i class="bx bxs-heart text-danger" style="font-size: 16px"></i>
            </div>
          </vs-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 0,
      search: "",
      selectedImgOption: 1,
      imgOptions: [
        {
          id: 1,
          name: "Unsplash",
          src: require("../assets/images/unsplash.svg"),
        },
        {
          id: 2,
          name: "Pexels",
          src: require("../assets/images/pexels.svg"),
        },
      ],
    };
  },
  computed: {
    getSelectedImgOption() {
      return this.imgOptions.find((item) => item.id === this.selectedImgOption);
    },
    getFirstColor() {
      return this.$store.state.color.firstColor;
    },
    getSecondColor() {
      return this.$store.state.color.secondColor;
    },
    getPrimaryColor() {
      return this.$store.state.color.primary;
    },
  },
  methods: {
    setPrimaryColor(payload) {
      console.log(payload);
      this.$store.dispatch("color/setPrimaryColor", payload);
    },
  },
};
</script>

<style lang="scss" scoped></style>
