import './store'
import {rooms, save, teams} from "./store";


const {ipcRenderer} = window.require("electron")
const {uuid} = require('uuidv4');


export const addRoom = (room) => {
  rooms.set(rooms.push(room))
}

export const addTeam = (team) => {
  teams.update(t => t.push(team).map())
}

export const saveChange = () => {
  let data;
  let sub = save.subscribe(value => data = value)
  sub()
  ipcRenderer.sendSync('save-file', JSON.stringify(data))
}

export const addRoomToSave = (room) => {
  let ss;
  let unsub = save.subscribe(b => ss = b)
  unsub()

  let newRoom = {...room}
  newRoom["id"] = uuid()
  newRoom["amount"] = 1
  newRoom["color"] = "#ff0000"
  ss[ss["activeBuilding"]].rooms.push(newRoom)
  save.set(ss)
  saveChange()
}

export const deleteItem = (id) => {
  let ss;
  let unsub = save.subscribe(b => ss = b)
  unsub()
  let b = []
  ss[ss["activeBuilding"]].rooms.map((ro) => {
    if (ro.id !== id) b.push(ro)
    return ro
  })
  ss[ss["activeBuilding"]].rooms = b
  save.set(ss)
  saveChange()
}

export const saveColorChange = (id, newColor) => {
  let ss;
  let unsub = save.subscribe(b => ss = b)
  unsub()
  ss[ss["activeBuilding"]].rooms.map((r) => {
    if (r.id === id) r.color = newColor.toString()
    return r
  })
  save.set(ss)
  saveChange()
}

export const saveAmountChange = (id, amount) => {
  let ss;
  let unsub = save.subscribe(b => ss = b)
  unsub()
  ss[ss["activeBuilding"]].rooms.map((r) => {
    if (r.id === id) r.amount = amount
    return r
  })
  save.set(ss)
  saveChange();
}


export const updateCell = (composeId, newColor, add) => {
  let pos = {x: composeId.split("-")[0], y: composeId.split("-")[1]}
  let ss;
  let unsub = save.subscribe(b => ss = b)
  unsub()
  let c = []
  if (add) {
    //si exitia actualizo
    if (ss[ss["activeBuilding"]].existingCells[pos.y][pos.x] === 1) {
      ss[ss["activeBuilding"]].cellMap.map((r) => {
        if (r.location.x === pos.x && r.location.y === pos.y) {
          let a = {...r}
          a.color = newColor
          c.push(a)
        } else {
          c.push({...r})
        }
      })
    } else {
      //si no existia lo creo y pongo que exite
      ss[ss["activeBuilding"]].cellMap.map((r) => {
        c.push(r)
      })
      let a = {
        color: newColor,
        location: {
          x: pos.x,
          y: pos.y
        }
      }
      c.push(a)
      console.log("fuck");

      ss[ss["activeBuilding"]].existingCells[pos.y][pos.x] = 1
    }
  } else {
    //si tengo que eliminar
    //si exitian
    if (ss[ss["activeBuilding"]].existingCells[pos.y][pos.x] === 1) {
      ss[ss["activeBuilding"]].existingCells[pos.y][pos.x] = 0
      ss[ss["activeBuilding"]].cellMap.map((r) => {
        if (r.location.x !== pos.x || r.location.y !== pos.y) {
          c.push({...r})
        }
      })
    } else {
      //si no existe
      ss[ss["activeBuilding"]].existingCells[pos.y][pos.x] = 0
      ss[ss["activeBuilding"]].cellMap.map((r) => {
        c.push({...r})
      })
    }
  }
  ss[ss["activeBuilding"]].cellMap = c;
  save.set(ss)
  saveChange()
}