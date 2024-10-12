import './App.css';
import React from 'react';
import { Outlet } from 'react-router-dom';
import { Menu } from './components/Menu/Menu';

function App() {
  return (
    <div className="flex flex-wrap flex-row">
        <div id='navbar' className={'w-full sm:w-[200px] p-1 bg-gray-100'}>
            <Menu></Menu>
        </div>
        <div className={'max-sm:w-full flex-grow'}>
            <Outlet></Outlet>
        </div>
      </div>
  );
}

export default App;
