import React from "react";

interface NavbarItemProps {
       label: string
}


const NavbarItem = (props:NavbarItemProps) => {
    return (
        <div className="text-white cursor-pointer bg:text-gray-300 transition">
            {props.label}
        </div>
    )
}

export default NavbarItem;