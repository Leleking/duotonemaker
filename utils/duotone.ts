interface DuotoneParams {
  id: string;
  src: string;
  primaryColor: string;
  secondaryColor: string;
  actions?: (arg: CanvasRenderingContext2D | null) => void;
}

export default function duotone ({
  id,
  src,
  primaryColor,
  secondaryColor,
  actions
}: DuotoneParams): Promise<string> {
  return new Promise((resolve, reject) => {
    const canvas = document.getElementById(id) as HTMLCanvasElement
    const ctx = canvas.getContext('2d')

    if (!ctx) {
      return reject(new Error('canvas context is null'))
    }

    const img = new Image()
    img.crossOrigin = '' // to allow us to manipulate the image without tainting canvas

    img.onload = function () {
      ctx.canvas.width = img.width
      ctx.canvas.height = img.height
      ctx.drawImage(img, 0, 0) // draws image to canvas on load

      // Converts to grayscale by averaging the values of each pixel
      const imageData = ctx.getImageData(0, 0, img.width, img.height)
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
      ctx.fillRect(0, 0, img.width, img.height)
      // lighten
      ctx.globalCompositeOperation = 'lighten'
      ctx.fillStyle = secondaryColor // colour for shadows
      ctx.fillRect(0, 0, img.width, ctx.canvas.height)

      // calls any other draws that you want through the function parameter passed in
      actions?.(ctx)

      const dataURL = canvas.toDataURL('image/png')
      resolve(dataURL)
    }

    img.src = src
  })
}
