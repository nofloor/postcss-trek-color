const Color = require('color');
const trekColor = require('./index')();

test('RGBA of the hex color', () => {
  const decl = { value: 'rgba(#abcdef, 0.3)' };
  trekColor.Declaration(decl);
  expect(decl.value).toBe(Color('#abcdef').alpha(0.3).toString());
  
  decl.value = 'rgba(0,255,0,0.3)'
  trekColor.Declaration(decl);
  expect(decl.value).toBe('rgba(0,255,0,0.3)');
});

test('Mix of Two Color', () => {
  const decl = { value: 'mix(#abcdef, #123456, 0.3)' };
  trekColor.Declaration(decl);
  expect(decl.value).toBe(Color('#abcdef').mix(Color('#123456'), 0.3).hex());
});

test('Tint of the Color', () => {
  const decl = { value: 'tint(#abcdef, 0.3)' };
  trekColor.Declaration(decl);
  expect(decl.value).toBe(Color('#abcdef').mix(Color('#FFFFFF'), 0.7).hex());
});

test('Shade of the Color', () => {
  const decl = { value: 'shade(#abcdef, 0.3)' };
  trekColor.Declaration(decl);
  expect(decl.value).toBe(Color('#abcdef').mix(Color('#000000'), 0.3).hex());
});