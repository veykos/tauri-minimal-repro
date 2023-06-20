import m from 'mithril';
import TopBar from './app/top-bar/TopBar.js';
import {LogicalSize} from '@tauri-apps/api/window';
let appWindow;

const App = {
    start: async function(root) {
        if (window.__TAURI_IPC__) {
            try {
                let windowModule = await import('@tauri-apps/api/window');
                appWindow = windowModule.appWindow;
            } catch (e) {
                console.error('Cannot load Tauri', e);
            }
        }
        m.mount(root, AppShell);
    }
};

export function AppShell() {
    let currentW = 0;
    let currentH = 0;
    let wantedW = 0;
    let wantedH = 0;
    return {
        oncreate:async() => {

            const size = await appWindow?.innerSize();
            currentW = size?.width;
            currentH= size?.height;
        },
        view: function(vnode) {
            return m('div', {
                style: {
                    minWidth: '100vw',
                    minHeight: '100vh',
                    textAlign: 'center',
                    backgroundColor: 'white',
                }
            },
            [
                m(TopBar),
                m('button', {
                    onclick: () => {
                        setTimeout(async() => {
                            try {
                                wantedW = Math.ceil((Math.random() * 1_000) + 200);
                                wantedH = Math.ceil((Math.random() * 1_000) + 200);
                                // get the scale factor
                                const scaleFactor = await appWindow.scaleFactor();
                                // create the wantedSize as LogicalSize
                                const wantedSize = new LogicalSize(wantedW, wantedH)
                                let currentSize = await appWindow.innerSize();
                                // as we don't have LogicalSize.toPhysical() on the JS side we do the opposite 
                                // we take the Physical size and convert it to logical using our scale
                                let currentSizeLogical = currentSize.toLogical(scaleFactor)
                                while (
                                    currentSizeLogical.height !== wantedSize.height ||
                                    currentSizeLogical.width !== wantedSize.width
                                    ) {
                                        console.log('attempting resize :)')
                                        await appWindow?.setSize(wantedSize);
                                        // we need to wait a bit before getting the innerSize again, otherwise it returns a PhysicalSize equal to the wantedSize
                                        // even though the window is not resized properly
                                        await new Promise(res => {
                                            setTimeout(async() => {
                                                currentSize = await appWindow.innerSize();
                                                currentSizeLogical = currentSize.toLogical(scaleFactor) 
                                                res()
                                            }, 300);
                                        })
                                        console.log('finish attempt')
                                }
                                // get the current size
                                const size = await new Promise(res => {
                                    setTimeout(async() => {
                                        const size = await appWindow?.innerSize();
                                        res(size);
                                    }, 1000);
                                });
                                currentW = size?.width;
                                currentH= size?.height;
                                m.redraw();
                            } catch (error) {
                                console.log("error resizing", error);
                            }
                        }, 2_000);
                    }
                }, "RESIZE"),
                m('div', {}, `current width is ${currentW}, currenth height is ${currentH}`),
                m('div', {}, `wanted width is : ${Math.floor(wantedW)} wanted height is : ${Math.floor(wantedH)}`)
            ]);
        }
    };
}

export default App;
