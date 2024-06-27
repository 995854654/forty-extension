import React from 'react';
import ReactDOM from 'react-dom/client';
import SidePanel from './SidePanel';
import "./index.css"
import { debounce } from "lodash";

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

root.render(
    <SidePanel />
);

