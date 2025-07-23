import { ElectronAPI } from '@electron-toolkit/preload'

// 扩展ElectronAPI类型
declare module '@electron-toolkit/preload' {
  interface ElectronAPI {
    process: {
      versions: {
        electron: string
        chrome: string
        node: string
        [key: string]: string
      }
    }
  }
}

declare global {
  interface Window {
    electron: ElectronAPI
    api: unknown
  }
}