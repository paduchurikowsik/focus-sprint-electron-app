import { BrowserWindow, Tray, Menu, screen, app} from 'electron';
import {join} from 'path';
import {URL} from 'url';

let tray: Tray, trayWindow: BrowserWindow | null;

async function createWindow() {
  tray = new Tray(join(__dirname, '../assets/icon.png'));
  
  
  
  trayWindow = new BrowserWindow({
    show: false, // Use 'ready-to-show' event to show window
    width:280,
    height:85,
    titleBarStyle:'default',
    roundedCorners: true,
    visualEffectState: 'active',
    vibrancy:'popover',
    resizable:false,
    minimizable: false,
    maximizable: false,
    fullscreenable:false,
    frame:false,
    autoHideMenuBar: true,
    opacity:0.85,
    alwaysOnTop:true,
    transparent: true,
    movable: false,
    skipTaskbar: true,
    webPreferences: {
      nativeWindowOpen: false,
      nodeIntegration: true,
      webviewTag: false, // The webview tag is not recommended. Consider alternatives like iframe or Electron's BrowserView. https://www.electronjs.org/docs/latest/api/webview-tag#warning
      preload: join(__dirname, '../../preload/dist/index.cjs'),
    },
  });


  /**
   * If you install `show: true` then it can cause issues when trying to close the window.
   * Use `show: false` and listener events `ready-to-show` to fix these issues.
   *
   * @see https://github.com/electron/electron/issues/25012
   */
  trayWindow.on('ready-to-show', () => {

    const primaryDisplay = screen.getPrimaryDisplay();
    const { width } = primaryDisplay.workAreaSize;

    const x = width - 300;
    const y = 40;
  
    trayWindow?.setPosition(x, y, false);
    trayWindow?.show();
    trayWindow?.setVisibleOnAllWorkspaces(true);
    trayWindow?.focus();
    trayWindow?.setVisibleOnAllWorkspaces(false);

    if (import.meta.env.DEV) {
      trayWindow?.webContents.openDevTools({mode: 'detach'});
    }
  });

  /**
   * URL for main window.
   * Vite dev server for development.
   * `file://../renderer/index.html` for production and test
   */
  const pageUrl = import.meta.env.DEV && import.meta.env.VITE_DEV_SERVER_URL !== undefined
    ? import.meta.env.VITE_DEV_SERVER_URL
    : new URL('../renderer/dist/index.html', 'file://' + __dirname).toString();


  await trayWindow.loadURL(pageUrl);

  tray.on('click',() => {
    trayWindow?.isVisible() ? trayWindow?.hide() : trayWindow?.show();
  });

  tray.on('right-click',() => {
    const menu = [
      {
        label: 'Toggle',
        click: () => trayWindow?.isVisible() ? trayWindow?.hide() : trayWindow?.show(),
        enabled: true,
      },
      {
        label: 'Quit',
        click: () => app.quit(),
        enabled: true,
      },
    ];
    tray.setContextMenu(Menu.buildFromTemplate(menu)); 
   });

  trayWindow.on('closed', function () {
    trayWindow = null;
  });
}

/**
 * Restore existing BrowserWindow or Create new BrowserWindow
 */
export async function CreateTray() {
  if (tray === undefined || tray === null) {
    await createWindow();
    app.dock.hide();
    return tray;
  }
}
