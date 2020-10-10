const Color = require('color');

const functions = {
  mix(value) {
    return value.replace(/mix\((.+)\s?,\s?(\S+),\s?(\S+)\)/g, (whole, color, mixColor, amount) => {
      return Color(color).mix(Color(mixColor), amount).hex();
    });
  },
  rgba(value) {
    return value.replace(/rgba\((.+)\s?,\s?(\S+)\)/g, (whole, arg1, arg2) => {
      if (arg1.indexOf('#') === 0) return Color(arg1).alpha(arg2).toString();
      return whole;
    });
  },
  shade(value) {
    return value.replace(/shade\((.+)\s?,\s?(\S+)\)/g, (whole, color, amount) => {
      return Color(color).mix(Color('black'), amount).hex();
    });
  },
  tint(value) {
    return value.replace(/tint\((.+)\s?,\s?(\S+)\)/g, (whole, color, amount) => {
      return Color(color).mix(Color('white'), 1 - amount).hex();
    });
  }
};

function trekColor(options = {}) {
  return {
    postcssPlugin: 'postcss-trek-color',
    Declaration(decl) {
      Object.keys(functions).forEach(key => {
        if (decl.value.toString().indexOf(key + '(') > -1) {
          decl.value = functions[key](decl.value);
        }
      });
    }
  }
}

trekColor.postcss = true;

module.exports = trekColor;