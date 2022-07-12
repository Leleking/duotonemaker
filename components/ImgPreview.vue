<template>
  <vs-dialog
    v-model="show"
    class="rounded-[inherit]"
    not-close
    not-padding
    @close="handleClose"
    width="auto"
  >
    <div class="rounded-[inherit] relative">
      <div
        class="h-16 bg-primary px-4 flex items-center rounded-[inherit] w-full"
      >
        <span> Photos by Elikem on Unsplash </span>
      </div>
      <div class="rounded-[inherit]">
        <svg
          id="duotone-img"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          :viewBox="`0 0 ${img.width} ${img.height}`"
          class="block relative rounded-b-[inherit] max-h-[28rem]"
          width="100%"
          :height="`${img.height}`"
        >
          <filter :id="`duotone`">
            <feColorMatrix
              type="matrix"
              values="0.67578125 0 0 0 0.28515625 0.73828125 0 0 0 0.0625 0.72265625 0 0 0 0.15625 0 0 0 1 0"
              color-interpolation-filters="sRGB"
              class="jsx-715889512"
            />
          </filter>
          <image
            width="100%"
            height="100%"
            :filter="`url(#duotone)`"
            :href="imgSrc"
            x="0"
            y="0"
            preserveAspectRatio="xMidYMid slice"
            class="jsx-715889512"
          />
        </svg>
      </div>
      <div class="absolute bottom-5 right-5">
        <vs-button circle icon floating @click="downloadImage">
          <img src="../assets/images/download.svg" />
        </vs-button>
      </div>
    </div>
  </vs-dialog>
</template>

<script>
import { getPrimaryAndSecondaryColors } from "../utils/duotone.js";
export default {
  computed: {
    show() {
      return this.$store.state.preview.show;
    },

    img() {
      return this.$store.state.preview.img;
    },
    firstColor() {
      return this.$store.state.color.selectedColorPair.firstColor;
    },
    secondColor() {
      return this.$store.state.color.selectedColorPair.secondColor;
    },

    getPrimaryColor() {
      return this.$store.state.color.primary;
    },
  },
  data() {
    return {
      imgSrc: "",
    };
  },

  methods: {
    handleClose() {
      this.$store.commit("preview/toggle", false);
    },
    async downloadImage() {
      const { primaryColor, secondaryColor } = getPrimaryAndSecondaryColors(
        this.firstColor,
        this.secondColor,
        this.getPrimaryColor
      );
      const base64 = await this.getBase64FromUrl(this.img?.urls?.regular);
      console.log(base64);
      const svg = document.getElementById("duotone-img").outerHTML;
      console.log(svg);
      /* this.duotone({
        id: "download-img",
        src: this.img?.urls?.regular,
        primaryColor,
        secondaryColor,
        width: 600,
        height: 600,
      }); */
    },
    async getBase64FromUrl(url) {
      const data = await fetch(url);
      const blob = await data.blob();
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onloadend = () => {
          const base64data = reader.result;
          resolve(base64data);
        };
      });
    },
    duotone({ id, src, primaryColor, secondaryColor, width, height }) {
      // console.log("id", document.getElementById(id));
      const canvas = document.getElementById(id);

      const ctx = canvas.getContext("2d");

      const downloadedImg = new Image();

      downloadedImg.crossOrigin = ""; // to allow us to manipulate the image without tainting canvas
      // console.log("canvas", width);
      // console.log("canvas -height", height);
      downloadedImg.onload = function () {
        canvas.width = width;
        canvas.height = height;
        ctx.drawImage(downloadedImg, 0, 0, canvas.width, canvas.height); // draws image to canvas on load
        // Converts to grayscale by averaging the values of each pixel
        const imageData = ctx.getImageData(0, 0, 800, 800);
        const pixels = imageData.data;
        for (let i = 0; i < pixels.length; i += 4) {
          const red = pixels[i];
          const green = pixels[i + 1];
          const blue = pixels[i + 2];
          // Using relative luminance to convert to grayscale
          const avg = Math.round(
            (0.299 * red + 0.587 * green + 0.114 * blue) * 1
          );
          pixels[i] = avg;
          pixels[i + 1] = avg;
          pixels[i + 2] = avg;
        }
        // Puts the grayscaled image data back into the canvas
        ctx.putImageData(imageData, 0, 0);
        // puts the duotone image into canvas with multiply and lighten
        ctx.globalCompositeOperation = "multiply";
        ctx.fillStyle = primaryColor; // colour for highlights
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        // lighten
        ctx.globalCompositeOperation = "lighten";
        ctx.fillStyle = secondaryColor; // colour for shadows
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        // calls any other draws that you want through the function parameter passed in
        // actions(ctx);
      };
      downloadedImg.src = src; // source for the image
    },
    async init() {
      this.imgSrc = await this.getBase64FromUrl(this.img?.urls?.regular);
    },
  },
  created() {
    this.init();
    console.log(this.img);
  },
};
</script>
<style lang="scss">
.vs-dialog-content {
  z-index: 9 !important;
}
.vs-dialog {
  min-width: 100px !important;
  margin: 0px !important;
}
</style>
