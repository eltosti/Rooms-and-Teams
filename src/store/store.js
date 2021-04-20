import {readable, writable} from 'svelte/store';


export const isMouseDownRight = writable(false)
export const isMouseDownLeft = writable(false)
export const actionsTaken = writable([])
export const selectedColor = writable("#000000")
export const rooms = writable([]);
export const teams = writable([]);
export const save = writable({});
export const newTab = writable({
  name:"",
  cellSize : "15px",
  mapSize: {x: 30, y:30}
});





