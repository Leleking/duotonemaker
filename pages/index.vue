<template>
  <div class="">
    <!-- <div class="grid-container">
      <div v-for="(item, index) in imgs" :key="index">
        <div :class="` grid-item grid-item-${index + 1}`">
          <div>
            <img :src="item.urls.regular" />
          </div>
        </div>
      </div>
    </div> -->

    <div class="grid-container">
      <div
        v-for="(item, index) in imgs"
        :key="index"
        :class="`grid-item grid-item-${index + 1}`"
        @click="preview(item)"
      >
        <svg
          xmlns:xlink="http://www.w3.org/1999/xlink"
          :viewBox="`0 0 ${item.width} ${item.height}`"
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
            :xlink:href="item.urls.regular"
            x="0"
            y="0"
            preserveAspectRatio="xMidYMid slice"
            class="jsx-715889512"
          />
        </svg>
      </div>
    </div>
    <!-- <div class="grid-container">
      <div v-for="(img, index) in imgs" :key="'canvas' + img.id">
        <div :class="`grid-item grid-item-${index + 1}`">
          <canvas :ref="`duotone${index + 1}`" :id="`duotone${index + 1}`" />
        </div>
      </div>
    </div> -->
    <img-preview />
    <canvas id="hi" />
  </div>
</template>

<script lang="ts">
/* tslint:disable */

import Vue from 'vue'
import { DuotonePayload, Photo, ColorType } from '../types/photos'
export default Vue.extend({
  name: 'IndexPage',
  layout: 'MainLayout',
  data () {
    return {
      imgs: []
    }
  },
  computed: {
    firstColor () {
      return this.$store.state.color.selectedColorPair.firstColor
    },
    secondColor () {
      return this.$store.state.color.selectedColorPair.secondColor
    },
    getPrimaryColor () {
      return this.$store.state.color.primary
    }
  },
  watch: {
    firstColor () {
      this.convertToDuotone()
    },
    secondColor () {
      this.convertToDuotone()
    },
    getPrimaryColor () {
      this.convertToDuotone()
    },

    imgs () {
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
    }
  },
  created () {},

  mounted () {
    this.fetchPhotos()
  },
  updated () {
    this.convertToDuotone()
  },
  methods: {
    preview (img: Photo) {
      this.$store.commit('preview/toggle', true)
      this.$store.commit('preview/setImg', img)
    },

    Duotone ({
      id,
      src,
      primaryColor,
      secondaryColor,
      width,
      height
    }: DuotonePayload) {
      // console.log("id", document.getElementById(id));
      const canvas: any = document.getElementById(id)

      const ctx = canvas.getContext('2d')

      const downloadedImg: any = new Image()

      downloadedImg.crossOrigin = '' // to allow us to manipulate the image without tainting canvas
      // console.log("canvas", width);
      // console.log("canvas -height", height);
      downloadedImg.onload = function () {
        canvas.width = width
        canvas.height = height
        ctx.drawImage(downloadedImg, 0, 0, canvas.width, canvas.height) // draws image to canvas on load
        // Converts to grayscale by averaging the values of each pixel
        const imageData = ctx.getImageData(0, 0, 800, 800)
        const pixels = imageData.data
        for (let i = 0; i < pixels.length; i += 4) {
          const red = pixels[i]
          const green = pixels[i + 1]
          const blue = pixels[i + 2]
          // Using relative luminance to convert to grayscale
          const avg = Math.round(
            (0.299 * red + 0.587 * green + 0.114 * blue) * 1
          )
          pixels[i] = avg
          pixels[i + 1] = avg
          pixels[i + 2] = avg
        }
        // Puts the grayscaled image data back into the canvas
        ctx.putImageData(imageData, 0, 0)
        // puts the duotone image into canvas with multiply and lighten
        ctx.globalCompositeOperation = 'multiply'
        ctx.fillStyle = primaryColor // colour for highlights
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        // lighten
        ctx.globalCompositeOperation = 'lighten'
        ctx.fillStyle = secondaryColor // colour for shadows
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        // calls any other draws that you want through the function parameter passed in
        // actions(ctx);
      }
      downloadedImg.src = src // source for the image
    },
    async fetchPhotos (): Promise<Photo[]> {
      const photos = await this.$axios.$get(
        'https://api.unsplash.com/search/photos?client_id=sW2Q_-zDlAXfQ2jn_vVstxRUvwIanRAmdJhSb1klMlI&query=fun&per_page=20'
      )
      this.imgs = photos?.results.map((item: any) => {
        return {
          id: item.id,
          width: item.width,
          height: item.height,
          urls: item.urls
        }
      })

      return this.imgs
    },
    getPrimaryAndSecondaryColors (): ColorType {
      let colors = [this.firstColor, this.secondColor]
      colors = colors.filter(color => color !== this.getPrimaryColor)
      return { primaryColor: this.getPrimaryColor, secondaryColor: colors[0] }
    },
    getMatrixValues (color1: any, color2: any) {
      const matrix: any = document.querySelector('feColorMatrix')
      let value: any = []
      value = value.concat([
        color1[0] / 256 - color2[0] / 256,
        0,
        0,
        0,
        color2[0] / 256
      ])
      value = value.concat([
        color1[1] / 256 - color2[1] / 256,
        0,
        0,
        0,
        color2[1] / 256
      ])
      value = value.concat([
        color1[2] / 256 - color2[2] / 256,
        0,
        0,
        0,
        color2[2] / 256
      ])
      value = value.concat([0, 0, 0, 1, 0])
      matrix.setAttribute('values', value.join(' '))
    },
    convertToDuotone () {
      const { primaryColor, secondaryColor }: ColorType =
        this.getPrimaryAndSecondaryColors()
      this.getMatrixValues(
        this.hexToRgb(primaryColor),
        this.hexToRgb(secondaryColor)
      )
    },
    /* applyDuotone() {
      const { primaryColor, secondaryColor } =
        this.getPrimaryAndSecondaryColors();
      if (this.imgs.length) {
        this.imgs.map((item: Photo, key) => {
          // console.log(item);

          var img = item.urls?.regular;
          this.Duotone({
            id: `duotone${key + 1}`,
            src: img,
            primaryColor,
            secondaryColor,
            width: item.width,
            height: item.height,
          });
        });
      }
    }, */

    hexToRgb (hex: string) {
      const normal = hex.match(/^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i)
      if (normal) { return normal.slice(1).map(e => parseInt(e, 16)) }

      const shorthand = hex.match(/^#([0-9a-f])([0-9a-f])([0-9a-f])$/i)
      if (shorthand) { return shorthand.slice(1).map(e => 0x11 * parseInt(e, 16)) }

      return null
    }

    /* updateDuotoneColor() {
      const { primaryColor, secondaryColor } =
        this.getPrimaryAndSecondaryColors();
      if (this.imgs.length) {
        this.imgs.map((item: Photo, key) => {
          var canvas: any = document.getElementById(`duotone${key + 1}`);
          canvas.width = item.width;
        canvas.height = item.height;
          var ctx = canvas.getContext("2d");
          // puts the duotone image into canvas with multiply and lighten
        ctx.globalCompositeOperation = "multiply";
        ctx.fillStyle = primaryColor; // colour for highlights
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        })
      }

    } */
  }
})
</script>
<style scoped>
.duotone {
  position: relative;
  margin: 0 auto;
}

.duotone::before,
.duotone::after {
  content: "";
  display: block;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
}

.duotone img {
  display: hidden;
}

.duotone::after {
  background: #f6cde1;
  content: "";
  display: block;
  width: 100%;
  height: 100%;
  mix-blend-mode: darken;
  z-index: 1;
  position: absolute;
  top: 0;
  left: 0;
}

.duotone::before {
  background: #562f40;
  content: "";
  display: block;
  width: 100%;
  height: 100%;
  mix-blend-mode: lighten;
  z-index: 1;
  position: absolute;
  top: 0;
  left: 0;
}
</style>