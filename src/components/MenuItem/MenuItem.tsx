import { useLocation } from 'react-router-dom';
import classNames from 'classnames';

export interface MenuItemProps {
    path: string;
    title: string;
}

export function MenuItem(props: MenuItemProps){
    const location = useLocation();
    const isActive = location.pathname.indexOf(props.path) > -1;

    return (
        <a href={props.path} className={classNames([
            'rounded-lg m-1 block p-2 hover:bg-blue-700 text-white',
            {'bg-blue-500': !isActive},
            {'bg-blue-700': isActive},
        ])}>{props.title}</a>
    )
}