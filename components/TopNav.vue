<template>
  <div class="">
    <div class="py-[30px] px-3 md:px-0">
      <div class="flex justify-between items-center space-x-2">
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
          <form
            class="flex justify-between divide-grey divide-x items-center w-full md:w-[536px] h-full shadow-lg rounded-full px-2"
            @submit.prevent="searchPhotos"
          >
            <div>
              <!--  <vs-input v-model="searchKey" placeholder="Search for image on" /> -->
              <input
                v-model="searchKey"
                placeholder="Search for image on"
                class="pl-3"
              />
            </div>
            <div class="flex items-center">
              <div>
                <img :src="getSelectedImgOption.src" alt="" />
              </div>
              <div class="hidden md:block">
                <vs-select
                  v-model="selectedImgOption"
                  @change="checkAPI"
                  placeholder="Select"
                >
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
                <div class="hidden md:block">
                  <vs-button circle dark @click="searchPhotos()">
                    <div class="text-white font-">Search</div>
                  </vs-button>
                </div>
                <div class="block md:hidden">
                  <vs-button
                    icon
                    circle
                    danger
                    class="w-[32px] h-[32px]"
                    @click="searchPhotos()"
                  >
                    <span>
                      <img height="24px" src="../assets/images/Search.svg" />
                    </span>
                  </vs-button>
                </div>
              </div>
            </div>
          </form>
          <div class="hidden lg:block">
            <div class="text-white font-[16px]">
              <input
                type="file"
                accept="image/*"
                name="custom_img"
                id="custom_img"
                style="display: none"
                @change="onChangeImg"
                ref="custom_img"
              />

              <vs-button
                @click="$refs.custom_img.click()"
                circle
                danger
                class="block"
              >
                <div class="flex items-center justify-center space-x-1">
                  <i class="bx bx-upload text-white" style="font-size: 16px" />
                  <span> Upload Image</span>
                </div>
              </vs-button>
            </div>
          </div>
        </div>
        <div class="block lg:hidden items-center justify-center">
          <vs-button
            circle
            floating
            active
            shadow
            icon
            class="w-[40px] h-[40px] shadow-lg rounded-full"
          >
            <span>
              <img height="24px" src="../assets/images/img.svg" />
            </span>
          </vs-button>
        </div>
        <div class="hidden lg:block">
          <vs-button circle primary>
            <div class="text-dark font-[16px] flex items-center space-x-1">
              <span> Spread the</span>
              <i class="bx bxs-heart text-danger" style="font-size: 16px" />
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
      selectedImgOption: 1,
      imgOptions: [
        {
          id: 1,
          name: "Unsplash",
          src: require("../assets/images/unsplash.svg"),
          disabled: false,
        },
        {
          id: 2,
          name: "Pexels",
          src: require("../assets/images/pexels.svg"),
          disabled: true,
        },
      ],
    };
  },
  computed: {
    getSelectedImgOption() {
      return this.imgOptions.find((item) => item.id === this.selectedImgOption);
    },
    getFirstColor() {
      return this.$store.state.color.selectedColorPair.firstColor;
    },
    getSecondColor() {
      return this.$store.state.color.selectedColorPair.secondColor;
    },
    getPrimaryColor() {
      return this.$store.state.color.primary;
    },
    searchKey: {
      get() {
        return this.$store.state.app.searchKey;
      },
      set(val) {
        this.$store.dispatch("app/updateSearchKey", val);
      },
    },
  },
  methods: {
    checkAPI(e) {
      const imgAPI = this.imgOptions.find((item) => item.id === e);
      if (imgAPI.disabled) {
        this.selectedImgOption = 1;
        this.$vs.notification({
          color: "#1E1E1E",
          position: "top-right",
          title: imgAPI.name,
          text: `The ${imgAPI.name} API is currently unavailable`,
        });
        console.log("img", e);
      }
    },
    setPrimaryColor(payload) {
      this.$store.dispatch("color/setPrimaryColor", payload);
    },

    async onChangeImg(e) {
      let img = new Image();
      const file = e.target.files[0];
      img.src = URL.createObjectURL(file);
      await img.decode();
      console.log(`width: ${img.width}, height: ${img.height}`);
      this.$store.commit("preview/toggle", true);
      this.$store.commit("preview/setImg", {
        id: "",
        name: file.name,
        urls: {
          raw: img.src,
          regular: img.src,
        },
        width: img.width,
        height: img.height,
        custom: true,
        file,
      });
    },
    async searchPhotos() {
      //e.preventDefault();
      if (this.searchKey) {
        this.$store.dispatch("app/getPhotos", {
          showPageLoader: true,
          page: 1,
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
