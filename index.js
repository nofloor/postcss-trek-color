const Color = require('color');

const functions = {
  tint(value) {
    const match = value.match(/tint\((.+)\s?,\s?(\S+)\)/);
    return Color(match[1]).mix(Color('white'), match[2]).hex();
  },
  shade(value) {
    const match = value.match(/shade\((.+)\s?,\s?(\S+)\)/);
    return Color(match[1]).mix(Color('black'), match[2]).hex();
  },
  mix(value) {
    const match = value.match(/mix\((.+)\s?,\s?(\S+),\s?(\S+)\)/);
    return Color(match[1]).mix(Color(match[2]), match[3]).hex();
  }
};

function trekColor(options = {}) {
  return {
    postcssPlugin: 'postcss-trek-color',
    Declaration(decl) {
      Object.keys(functions).forEach(key => {
        if (decl.value.indexOf(key + '(') > -1) {
          decl.value = functions[key](decl.value);
        }
      });
    }
  }
}

trekColor.postcss = true;

module.exports = trekColor;