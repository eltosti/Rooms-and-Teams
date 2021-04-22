import {derived, readable, writable} from 'svelte/store';
import {create} from "../components/utilFuctions";


export const isMouseDownRight = writable(false)
export const isMouseDownLeft = writable(false)
export const actionsTaken = writable([])
export const selectedColor = writable("#000000")
export const rooms = writable([]);
export const teams = writable([]);
export const save = writable({});
export const newTab = writable({
  name: "",
  cellSize: "15px",
  mapSize: {x: 30, y: 30}
});

export const info = derived(save, $save => {
  let totalGD = 0
  let totalLB = 0
  let totalMG = 0
  let totalIF = 0
  let totalGP = 0
  let EGD = 0
  let ELB = 0
  let EMG = 0
  let EIF = 0
  let EGP = 0
  let ECP = 0
  let TEGD = 0
  let TELB = 0
  let TEMG = 0
  let TEIF = 0
  let TEGP = 0
  let tt= 0


  if ($save[$save["activeBuilding"]]){
    $save[$save["activeBuilding"]].rooms.forEach((i) => {
      totalGD += i["Goods Cost"] * i.amount
      totalLB += i["Labor Cost"] * i.amount
      totalMG += i["Magic Cost"] * i.amount
      totalIF += i["Influence Cost"] * i.amount
      totalGP += i["Total Cost"] * i.amount
      EGD += i.Goods * i.amount * i["Check Bonus"]
      ELB += i.Labor * i.amount * i["Check Bonus"]
      EMG += i.Magic * i.amount * i["Check Bonus"]
      EIF += i.Influence * i.amount * i["Check Bonus"]
      EGP += i.gp * i.amount * i["Check Bonus"]
      ECP += i.Capital * i.amount * i["Check Bonus"]
      TEGD += i.Goods * i.amount * i["Check Bonus"] + i.amount * i.Capital * i["Check Bonus"]
      TELB += i.Labor * i.amount * i["Check Bonus"] + i.amount * i.Capital * i["Check Bonus"]
      TEMG += i.Magic * i.amount * i["Check Bonus"] + i.amount * i.Capital * i["Check Bonus"]
      TEIF += i.Influence * i.amount * i["Check Bonus"] + i.amount * i.Capital * i["Check Bonus"]
      TEGP += i.gp * i.amount * i["Check Bonus"] + i.amount * i.Capital * i["Check Bonus"]
      tt += i.amount * i["Check Bonus"]
    })
  }
  let fictionalRoom = {
    "Goods Cost": totalGD,
    "Labor Cost": totalLB,
    "Magic Cost": totalMG,
    "Influence Cost": totalIF,
    "Total Cost": totalGP,
  }




  return {
    creationCost: create(fictionalRoom),
    totalAvailable: tt,
    EGD: EGD,
    ELB: ELB,
    EMG: EMG,
    EIF: EIF,
    EGP: EGP,
    ECP: ECP,
    TEGD: TEGD,
    TELB: TELB,
    TEMG: TEMG,
    TEIF: TEIF,
    TEGP: TEGP,
  }
})







