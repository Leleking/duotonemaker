<template>
  <div id="main">
    <div v-if="pageLoader">Loading...</div>
    <div class="px-3 md:px-0">
      <masonry :cols="{ default: 4, 1000: 3, 700: 2, 400: 1 }" :gutter="10">
        <div
          v-for="(item, index) in imgs"
          :key="index"
          :class="` grid-item-${index + 1} mb-2 rounded-[10px]`"
          @click="preview(item)"
        >
          <div data-aos="fade-up">
            <svg
              xmlns:xlink="http://www.w3.org/1999/xlink"
              :viewBox="`0 0 ${item.width} ${item.height}`"
            >
              <filter :id="`duotone`">
                <feColorMatrix
                  type="matrix"
                  values=""
                  color-interpolation-filters="sRGB"
                  class="jsx-715889512"
                />
              </filter>
              <image
                width="100%"
                height="100%"
                :filter="`url(#duotone)`"
                :xlink:href="item.urls.small"
                x="0"
                y="0"
                preserveAspectRatio="xMidYMid slice"
                class="jsx-715889512"
              />
            </svg>
          </div>
        </div>
      </masonry>
    </div>

    <img-preview />
  </div>
</template>

<script lang="ts">
/* tslint:disable */
// @ts-nocheck

import Vue from "vue";
import _ from "lodash";
import { Photo, ColorType } from "../types/photos";
import AOS from "aos";
import "aos/dist/aos.css";
export default Vue.extend({
  name: "IndexPage",
  layout: "MainLayout",
  data() {
    return {
      page: 1,
    };
  },
  computed: {
    firstColor() {
      return this.$store.state.color.selectedColorPair.firstColor;
    },
    secondColor() {
      return this.$store.state.color.selectedColorPair.secondColor;
    },
    getPrimaryColor() {
      return this.$store.state.color.primary;
    },
    imgs() {
      return this.$store.state.app.imgs;
    },
    searchKey() {
      return this.$store.state.app.searchKey;
    },
    pageLoader() {
      return this.$store.state.app.pageLoader;
    },
  },
  watch: {
    firstColor() {
      this.convertToDuotone();
    },
    secondColor() {
      this.convertToDuotone();
    },
    getPrimaryColor() {
      this.convertToDuotone();
    },
  },

  updated() {
    this.convertToDuotone();
  },
  mounted() {
    if (process.client) {
      AOS.init({
        offset: 0,
        delay: 0,
        once: false,
        mirror: true,
        anchorPlacement: "top-bottom",
      });
    }
    window.addEventListener("resize", () => {
      this.convertToDuotone();
    });
    window.addEventListener("scroll", this.handleScroll);
    // Initially load some items.
    this.$store.dispatch("app/getPhotos", { page: 1 });
  },
  methods: {
    preview(img: Photo) {
      this.$store.commit("preview/toggle", true);
      this.$store.commit("preview/setImg", img);
    },

    async fetchPhotos(): Promise<Photo[]> {
      this.$store.dispatch("app/getPhotos", { page: 1 });
    },
    getPrimaryAndSecondaryColors(): ColorType {
      let colors = [this.firstColor, this.secondColor];
      colors = colors.filter((color) => color !== this.getPrimaryColor);
      return { primaryColor: this.getPrimaryColor, secondaryColor: colors[0] };
    },
    getMatrixValues(color1: any, color2: any) {
      const matrix: any = document.querySelectorAll("feColorMatrix");
      let value: any = [];
      value = value.concat([
        color1[0] / 256 - color2[0] / 256,
        0,
        0,
        0,
        color2[0] / 256,
      ]);
      value = value.concat([
        color1[1] / 256 - color2[1] / 256,
        0,
        0,
        0,
        color2[1] / 256,
      ]);
      value = value.concat([
        color1[2] / 256 - color2[2] / 256,
        0,
        0,
        0,
        color2[2] / 256,
      ]);
      value = value.concat([0, 0, 0, 1, 0]);
      matrix.forEach((m) => {
        m.setAttribute("values", value.join(" "));
      });
    },
    convertToDuotone() {
      if (this.imgs.length) {
        const { primaryColor, secondaryColor }: ColorType =
          this.getPrimaryAndSecondaryColors();
        this.getMatrixValues(
          this.hexToRgb(primaryColor),
          this.hexToRgb(secondaryColor)
        );
      }
    },

    hexToRgb(hex: string) {
      const normal = hex.match(/^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i);
      if (normal) {
        return normal.slice(1).map((e) => parseInt(e, 16));
      }

      const shorthand = hex.match(/^#([0-9a-f])([0-9a-f])([0-9a-f])$/i);
      if (shorthand) {
        return shorthand.slice(1).map((e) => 0x11 * parseInt(e, 16));
      }

      return null;
    },
    handleScroll() {
      let scrollHeight = window.scrollY;
      let maxHeight =
        window.document.body.scrollHeight -
        window.document.documentElement.clientHeight;

      /*  console.log("scrollHeight", scrollHeight);
      console.log("maxHeight", maxHeight); */
      if (scrollHeight >= maxHeight - 200) {
        this.debounceGetPhotos();
      }
    },
    debounceGetPhotos: _.debounce(function () {
      this.page = this.page + 1;
      this.$store.dispatch("app/getPhotos", { page: this.page });
    }, 700),
  },
  created() {},
});
</script>
<style scoped>
svg {
  border-radius: 10px;
}
</style>
