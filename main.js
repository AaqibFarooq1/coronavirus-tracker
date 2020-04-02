const {app, BrowserWindow, globalShortcut, net, ipcMain} = require('electron')
const path = require('path')

function createWindow () {
	const mainWindow = new BrowserWindow({
		height: 400,
		width: 600,
		webPreferences: {
			nodeIntegration: true
		},
		transparent: true,
		frame: false,
	})

	mainWindow.loadFile('index.html')

	globalShortcut.register('f5', function() {
		mainWindow.reload(true)
	})
	globalShortcut.register('CommandOrControl+R', function() {
		mainWindow.reload(true)
	})
	globalShortcut.register('ESC', function() {
		// code to exit
	})

	// Open the DevTools.
	// mainWindow.webContents.openDevTools()
}

app.whenReady().then(createWindow)

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})

app.on('ready', () => {
	const request = net.request({
  		method: 'GET',
  		protocol: 'https:',
  		hostname: 'corona.lmao.ninja/countries/uk',
	})
	request.on('response', (response) => {
		response.on('data', function(chunk){
	        if (chunk) {
				var data = JSON.parse(chunk.toString('utf8'));
				ipcMain.on('asynchronous-message', (event, arg) => {
					event.reply('asynchronous-reply', data)
				})
	        }
		})
	})
	request.end()
})
