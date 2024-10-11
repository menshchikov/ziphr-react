import { Link, useLocation } from 'react-router-dom';
import React from 'react';
import classNames from "classnames";

export interface MenuItemProps {
    path: string;
    title:string;
}

export function MenuItem(props:MenuItemProps){
    const location = useLocation();
    let className = 'nav-link block m-1';
    const isActive = location.pathname === props.path;

    return (
        <Link className={className} to={props.path}><button className={classNames([
            "rounded-lgp-2 w-full hover:bg-blue-700 text-white",
            {"bg-blue-500": !isActive},
            {"bg-blue-700": isActive},
        ])}>{props.title}</button></Link>
    )
}