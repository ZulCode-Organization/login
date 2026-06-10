export interface IElectronAPI {
  openLogin: () => void;
  openSignup: () => void;
  notifyAuthSuccess: () => void;
}

declare global {
  interface Window {
    electron: IElectronAPI;
  }
}
