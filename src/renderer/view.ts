import type { BrowserViewConstructorOptions, IpcRendererEvent } from 'electron';

export interface ViewOpt {
  key: string;
  winId: number;
  owh: [number, number];
  webPreferences?: BrowserViewConstructorOptions;
  url: string;
  data?: any;
}

/**
 * view创建
 * @param opt
 */
export async function viewCreate(
  opt: ViewOpt,
  isAlone: boolean = false
): Promise<number | undefined> {
  opt.webPreferences = opt.webPreferences || {};
  return await window.ipc.invoke('view-new', { opt, isAlone });
}

/**
 * view是否存在
 * @param key
 */
export async function viewExist(key: string): Promise<boolean> {
  return await window.ipc.invoke('view-exist', { key });
}

/**
 * view切换挂载
 * @param key
 * @param winId
 */
export async function viewAlone(
  key: string,
  winId: number,
  owh: [number, number] = [0, 0]
): Promise<number | undefined> {
  return await window.ipc.invoke('view-alone', { key, winId, owh });
}

/**
 * view监听独立打开
 */
export async function viewAloneOn(
  listener: (event: any, args: { winId: number; isAlone: boolean }) => void
) {
  window.ipc.on('view-alone-load', listener);
}

/**
 * view隐藏
 * @param key
 */
export async function viewHide(key: string): Promise<void> {
  return await window.ipc.invoke('view-hide', { key });
}

/**
 * view显示
 * @param key
 */
export async function viewShow(key: string): Promise<void> {
  return await window.ipc.invoke('view-show', { key });
}

/**
 * view卸载
 * @param key
 */
export async function viewRemove(key: string): Promise<void> {
  return await window.ipc.invoke('view-remove', { key });
}

/**
 * view隐藏全部
 */
export async function viewHideAll(winId?: number): Promise<void> {
  return await window.ipc.invoke('view-hide-all', { winId });
}

/**
 * view卸载全部
 */
export async function viewRemoveAll(winId?: number): Promise<void> {
  return await window.ipc.invoke('view-remove-all', { winId });
}

/**
 * view更新title监听
 */
export async function viewTitleUpdate(
  listener: (event: IpcRendererEvent, args: { key: string; title: string }) => void
): Promise<void> {
  window.ipc.removeAllListeners('view-title-update');
  window.ipc.on('view-title-update', listener);
}

/**
 * view更新page监听
 */
export async function viewPageUpdate(
  listener: (
    event: IpcRendererEvent,
    args: { key: string; canGoBack: boolean; canGoForward: boolean }
  ) => void
): Promise<void> {
  window.ipc.removeAllListeners('view-page-update');
  window.ipc.on('view-page-update', listener);
}

/**
 * https://www.electronjs.org/zh/docs/latest/api/web-contents
 */

export async function stop(key: string) {
  return await window.ipc.invoke('view-stop', { key });
}

export async function reload(key: string) {
  return await window.ipc.invoke('view-reload', { key });
}

export async function canGoBack(key: string) {
  return await window.ipc.invoke('view-can-go-back', { key });
}

export async function goBack(key: string) {
  return await window.ipc.invoke('view-go-back', { key });
}

export async function canGoForward(key: string) {
  return await window.ipc.invoke('view-can-go-forward', { key });
}

export async function goForward(key: string) {
  return await window.ipc.invoke('view-go-forward', { key });
}

export async function openDevTools(key: string) {
  return await window.ipc.invoke('view-open-dev-tools', { key });
}
