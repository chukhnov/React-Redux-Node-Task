import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import App from './containers/App'
import { store } from './store/store'




let rootElement = document.getElementById('application');
render(
    <Provider store={store}>
        <App />
    </Provider>,
    rootElement
);
