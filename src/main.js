import App from './App.svelte';
import {rooms, save} from "./store/store";
const {ipcRenderer} = window.require("electron")



const app = () => {
	save.set(ipcRenderer.sendSync('load-resources', "save"))
	rooms.set(ipcRenderer.sendSync('load-resources', "rooms"))
	return new App({
	target: document.body,
	props: {
		appName: 'Teams and Bases'
	}
})};

export default app();