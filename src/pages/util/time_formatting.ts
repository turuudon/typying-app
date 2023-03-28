const timeFormatting = (ms: number) => {
  let s = ms / 1000;
  if(s >= 60){
      let m = Math.floor(s / 60)
      s = s % 60;
      return m + ':' + s.toFixed(2)
  } else {
      return s.toFixed(2)
  }
}
 export default timeFormatting