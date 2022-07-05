import './App.css'

import React from 'react'

import FilterTable from './components/filter-table/filter-table';
import configureStore from './backend-services/store/configure-store'

const store = configureStore()
//#region Site wide data imports
import { Provider } from 'react-redux'


export const App = () => {
  return(
  <div className="app">
    <Provider store={store}>
      <FilterTable />
    </Provider>
    

  </div>)
};
