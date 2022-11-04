import { Link, useLocation } from 'react-router-dom';
import React from 'react';

export interface MenuItemProps {
    path: string;
    title:string;
}

export function MenuItem(props:MenuItemProps){
    const location = useLocation();
    let className = 'nav-link';
    if(location.pathname === props.path){
        className += ' active';
    }

    return (
        <Link className={className} to={props.path}>{props.title}</Link>
    )
}