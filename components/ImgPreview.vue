<template>
  <vs-dialog
    v-model="show"
    class="rounded-[inherit]"
    not-close
    not-padding
    width="auto"
    @close="handleClose"
  >
    <div v-if="show" class="rounded-[inherit] relative">
      <div
        class="h-16 bg-primary px-4 flex items-center rounded-t-[inherit] w-full"
      >
        <span v-if="!img.custom">
          Photos by {{ img.author }} on
          <a :href="img.link" class="underline cursor-pointer" target="_blank"
            >Unsplash</a
          >
        </span>
        <span v-if="img.custom">Custom Image</span>
      </div>
      <div class="rounded-[inherit] w-auto h-[25rem]">
        <svg
          id="duotone-img"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          :viewBox="`0 0 ${img.width} ${img.height}`"
          class="block relative rounded-b-[inherit] h-full w-full"
          width="100%"
          height="100%"
        >
          <filter :id="`duotone`">
            <feColorMatrix
              type="matrix"
              values="0.67578125 0 0 0 0.28515625 0.73828125 0 0 0 0.0625 0.72265625 0 0 0 0.15625 0 0 0 1 0"
              color-interpolation-filters="sRGB"
            />
          </filter>
          <image
            width="100%"
            height="100%"
            :filter="`url(#duotone)`"
            :xlink:href="img?.urls?.regular"
            x="0"
            y="0"
            preserveAspectRatio="xMidYMid slice"
          />
        </svg>
      </div>
      <div class="absolute bottom-5 right-5">
        <vs-button
          :loading="loading"
          circle
          icon
          floating
          @click="downloadImage"
        >
          <span>
            <img src="../assets/images/download.svg" />
          </span>
        </vs-button>
      </div>
    </div>
  </vs-dialog>
</template>

<script>
import { duotoneImage } from "~/utils/duotone";
export default {
  created() {},
  computed: {
    btnBgColor() {
      if (this.loading) return "rgb(255,255,255)";
      return "rgb(0,0,0)";
    },
    show: {
      get() {
        return this.$store.state.preview.show;
      },
      set(val) {
        this.$store.commit("preview/toggle", val);
      },
    },

    img() {
      setInterval(() => {
        this.convertToDuotone();
      }, 50);
      if (this.$store.state.preview.img) {
        this.convertToDuotone();
      }
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
      loading: false,
    };
  },

  methods: {
    handleClose() {
      this.$store.commit("preview/toggle", false);
    },
    convertToDuotone() {
      if (process.client) {
        duotoneImage({
          firstColor: this.firstColor,
          secondColor: this.secondColor,
          primaryColor: this.getPrimaryColor,
        });
      }
    },
    async downloadImage() {
      const loading = this.$vs.loading({
        background: "#000",
        color: "#fff",
      });
      const base64 = await this.getBase64FromUrl(this.img?.urls?.full);
      this.imgSrc = base64;
      const filter = document.querySelector("#duotone").outerHTML;
      const svg = `<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
   width="${this.img.width}" height="${this.img.height}"
   xml:space="preserve" viewBox="0 0 ${this.img.width} ${this.img.height}">
   ${filter}<image width="100%" height="100%" filter="url(#duotone)" href="${base64}" x="0" y="0" preserveAspectRatio="xMidYMid slice" ></image></svg>
   `;
      this.downloadSVGAsPNG(svg, this.img.height, this.img.width, loading);
    },
    async getBase64FromUrl(url) {
      if (!this.img.custom) {
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
      }
      if (this.img.custom) {
        return new Promise((resolve) => {
          const reader = new FileReader();
          reader.readAsDataURL(this.img.file);
          reader.onloadend = () => {
            const base64data = reader.result;
            resolve(base64data);
          };
        });
      }
    },
    downloadSVGAsText(payload) {
      const svg = document.querySelector("svg");
      const base64doc = btoa(unescape(encodeURIComponent(payload)));
      const a = document.createElement("a");
      const e = new MouseEvent("click");
      a.download = "download.svg";
      a.href = "data:image/svg+xml;base64," + base64doc;
      a.dispatchEvent(e);
    },
    downloadSVGAsPNG(payload, height, width, loading) {
      const canvas = document.createElement("canvas");
      const base64doc = btoa(unescape(encodeURIComponent(payload)));
      const w = parseInt(width);
      const h = parseInt(height);
      const img_to_download = document.createElement("img");
      img_to_download.src = "data:image/svg+xml;base64," + base64doc;

      img_to_download.onload = function () {
        canvas.setAttribute("width", w);
        canvas.setAttribute("height", h);
        const context = canvas.getContext("2d");
        context.clearRect(0, 0, w, h);
        context.drawImage(img_to_download, 0, 0, w, h);
        const dataURL = canvas.toDataURL("image/png");
        loading.close();
        if (window.navigator.msSaveBlob) {
          window.navigator.msSaveBlob(canvas.msToBlob(), "download.png");
          this.loading = false;
        } else {
          const a = document.createElement("a");
          const my_evt = new MouseEvent("click");
          a.download = "download.png";
          a.href = dataURL;
          a.dispatchEvent(my_evt);
        }
        canvas?.parentNode?.removeChild(canvas);
      };
      img_to_download.onerror = function (error) {
        console.log(error);
      };
    },
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
