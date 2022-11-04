import './App.css';
import React from 'react';
import { Outlet } from 'react-router-dom';
import { Menu } from './components/Menu/Menu';

function App() {
  return (
    <div className="App">
        <div id='navbar' className={'app-navbar p-1'}>
            <Menu></Menu>
        </div>
        <div className={'content'}>
            <Outlet></Outlet>
        </div>
      </div>
  );
}

export default App;
