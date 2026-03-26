import { app, BrowserWindow } from "electron"
import path from "path"

function createWindow() {
  const iconPath = process.env.VITE_DEV_SERVER_URL
    ? path.join(__dirname, "../../public/icon.png")
    : path.join(__dirname, "../renderer/icon.png")

  const win = new BrowserWindow({
    width: 1100,
    height: 700,
    minWidth: 600,
    minHeight: 400,
    icon: iconPath,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      nodeIntegration: false,
    },
  })

  if (process.env.VITE_DEV_SERVER_URL) {
    win.loadURL(process.env.VITE_DEV_SERVER_URL)
  } else {
    win.loadFile(path.join(__dirname, "../renderer/index.html"))
  }
}

app.whenReady().then(() => {
  const iconPath = process.env.VITE_DEV_SERVER_URL
    ? path.join(__dirname, "../../public/icon.png")
    : path.join(__dirname, "../renderer/icon.png")

  if (process.platform === "darwin" && app.dock) {
    app.dock.setIcon(iconPath)
  }

  createWindow()
})

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit()
  }
})

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})
