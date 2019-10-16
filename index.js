'use strict'

const { app, BrowserWindow, Menu } = require('electron');

function createWindow () {
// Create the browser window.
	let win = new BrowserWindow({
		width: 900,
		height: 600,
		// frame: false,
		webPreferences: {
				nodeIntegration: true
		}
	})

	// and load the index.html of the app.
	win.loadFile('index.html');
	win.webContents.on('new-window', function (e, url) {
		e.preventDefault();
		require('electron').shell.openExternal(url);
	})
	// win.maximize();
	Menu.setApplicationMenu(null);
	// document.getElementById('minimize').addEventListener('click', win.minimize)
}

app.on('ready', createWindow)
	
// require("shell").openExternal("tailwindcss.com")