const cpmToRank = (cpm: number) => {
  if(cpm>=600){
      return "地球外生命体";
  } else if(cpm >= 500){
      return "よく訓練されたプロ";
  } else if(cpm >= 430){
      return "経験を積んだプロ"
  } else if(cpm >= 375){
      return "プロ並み"
  } else if(cpm >= 330){
      return "セミプロ"
  } else if(cpm >= 285){
      return "よく訓練された一般人"
  } else if(cpm >= 240){
      return "ちょっと速い一般人"
  } else if(cpm >= 200){
      return "平均レベル"
  } else if(cpm >= 150){
      return "平均よりちょっと下"
  } else if(cpm >= 100){
      return "亀さんレベル"
  } else if(cpm >= 0){
      return "原始人レベル"
  } else {
      return ""
  }
}

export default cpmToRank;