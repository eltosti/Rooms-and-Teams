export const earnings = (i) => {
  let intermidiate = [];
  const stringMap = ["Gp", "Capital", "Goods", "Influence", "Labor"]
  const input = [i.gp, i.Capital, i.Goods, i.Influence, i.Labor]
  let output = []
  input.forEach((type, index) => {
    if (type === 1) {
      output.push(stringMap[index])
    }
  })
  if (output.length !==0) {
    intermidiate.push(output.pop())
    if (output) intermidiate.unshift(output.join(", "))
    return (intermidiate.join(" or ")) + " + " + i["Check Bonus"];
  }
  return ("")
}


export const create = (i) => {
  const output = []
  const stringMap = ["Capital", "Goods", "Influence", "Labor"]
  const amounts = [i["Capital Cost"], i["Goods Cost"], i["Influence Cost"], i["Labor Cost"]]
  stringMap.forEach((o, i)=>{
    if (amounts[i]){
      output.push(`${amounts[i]} ${o}`)
    }
  })
  return output.join(", ")+` (${i["Total Cost"]})`
}

export const time = (i) => {
  if (i["Time"]>1){
    return i["Time"] +" days"
  }else {
    return "1 day"
  }
}

export const size = (i) => {
  return `${i["Min Size"]}-${i["Max Size"]} squares`
}



