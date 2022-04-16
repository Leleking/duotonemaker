<template>
  <div class="">
    <!--  <div style="display: none" v-for="(item, index) in imgs" :key="index">
      <img
        style="display: none"
        :id="`img-duotone${index + 1}`"
        :src="item.urls.regular"
      />
    </div> -->
    <div class="grid-container">
      <div v-for="(img, index) in imgs" :key="'canvas' + img.id">
        <img src="" alt="" />
        <div :class="`grid-item grid-item-${index + 1}`">
          <canvas :ref="`duotone${index + 1}`" :id="`duotone${index + 1}`" />
        </div>
      </div>
    </div>
    <canvas id="hi" />
  </div>
</template>

<script lang="ts">
import { duotonePayload, Photo } from "../types/photos";
import Vue from "vue";
export default Vue.extend({
  data() {
    return {
      imgs: [],
    };
  },
  layout: "MainLayout",
  name: "IndexPage",
  methods: {
    Duotone({
      id,
      src,
      primaryColor,
      secondaryColor,
      width,
      height,
    }: duotonePayload) {
      console.log("id", document.getElementById(id));
      let canvas: any = document.getElementById(id);

      let ctx = canvas.getContext("2d");

      let downloadedImg: any = new Image();

      downloadedImg.crossOrigin = ""; // to allow us to manipulate the image without tainting canvas
      console.log("canvas", width);
      console.log("canvas -height", height);
      downloadedImg.onload = function () {
        canvas.width = width;
        canvas.height = height;
        ctx.drawImage(downloadedImg, 0, 0, canvas.width, canvas.height); // draws image to canvas on load
        // Converts to grayscale by averaging the values of each pixel
        let imageData = ctx.getImageData(0, 0, 800, 800);
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
    async fetchPhotos(): Promise<Photo[]> {
      const photos = await this.$axios.$get(
        "https://api.unsplash.com/search/photos?client_id=sW2Q_-zDlAXfQ2jn_vVstxRUvwIanRAmdJhSb1klMlI&query=fun"
      );
      this.imgs = photos?.results.map((item: any) => {
        return {
          id: item.id,
          width: item.width,
          height: item.height,
          urls: item.urls,
        };
      });

      return this.imgs;
    },
  },
  created() {},
  watch: {
    imgs() {
      /* if (this.imgs.length) {
        this.imgs.map((item: Photo, key) => {
          console.log(item);

          var img = item.urls?.regular;
          this.Duotone({
            id: `duotone${key + 1}`,
            src: img,
            primaryColor: "#f65e35",
            secondaryColor: "#1e3265",
            width: item.width,
            height: item.height,
          });
        });
      } */
    },
  },

  mounted() {
    this.fetchPhotos();
  },
  updated() {
    if (this.imgs.length) {
      this.imgs.map((item: Photo, key) => {
        console.log(item);

        var img = item.urls?.regular;
        this.Duotone({
          id: `duotone${key + 1}`,
          src: img,
          primaryColor: "#f65e35",
          secondaryColor: "#1e3265",
          width: item.width,
          height: item.height,
        });
      });
    }
  },
});
</script>
