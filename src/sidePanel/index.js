import React from 'react';
import ReactDOM from 'react-dom/client';
import SidePanel from './SidePanel';
import "./index.css"
import { Provider } from "react-redux";
import { store } from "@/store/sider"
import { debounce } from "lodash";
import { getPersistor } from "@rematch/persist";
import { PersistGate } from "redux-persist/lib/integration/react";
import Notification from "@/sidePanel/components/Message"

const root = ReactDOM.createRoot(document.getElementById('root'));

const NativeResizeObserver = window.ResizeObserver;

class DebouncedResizeObserver extends NativeResizeObserver {
    constructor(callback, options) {
        const debouncedCallback = debounce(entries => {
            callback(entries);
        }, 100);

        super(debouncedCallback, options);
    }
}

window.ResizeObserver = DebouncedResizeObserver;
const persistor = getPersistor();
root.render(
    <PersistGate persistor={persistor}>
        <Provider store={store}>
            <Notification />
            <SidePanel />

        </Provider>
    </PersistGate>


);

