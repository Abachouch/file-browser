export function generateRandomColor(str) {
  let hue = [...(str || 'A')].reduce((a, x) => (a += x.codePointAt(0)), 0) % 360
  return `hsl( ${hue} , 100% , 50% , .2 )`
}
