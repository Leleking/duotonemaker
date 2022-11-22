export const hexToRgb = (hex) => {
  const normal = hex.match(/^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i);
  if (normal) {
    return normal.slice(1).map((e) => parseInt(e, 16));
  }

  const shorthand = hex.match(/^#([0-9a-f])([0-9a-f])([0-9a-f])$/i);
  if (shorthand) {
    return shorthand.slice(1).map((e) => 0x11 * parseInt(e, 16));
  }

  return null;
};

export const getPrimaryAndSecondaryColors = ({
  firstColor,
  secondColor,
  primaryColor,
}) => {
  let colors = [firstColor, secondColor];
  colors = colors.filter((color) => color !== primaryColor);
  return { primaryColor, secondaryColor: colors[0] };
};

export const duotoneImage = ({
  selector = "feColorMatrix",
  firstColor,
  secondColor,
  primaryColor,
}) => {
  const matrix = document.querySelectorAll(selector);
  let value = [];
  const colors = getPrimaryAndSecondaryColors({
    firstColor,
    secondColor,
    primaryColor,
  });
  let color1 = hexToRgb(colors.primaryColor);
  let color2 = hexToRgb(colors.secondaryColor);
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
};
