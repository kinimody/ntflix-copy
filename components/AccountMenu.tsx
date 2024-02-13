
import useCurrentUser from "../hooks/useCurrentUser";
import { signOut } from "next-auth/react";
import React from "react";


interface AccountMenuProps {
  visible?: boolean;
}

const AccountMenu: React.FC<AccountMenuProps> = ({ visible}) => {
  const {data} = useCurrentUser();
 

  
  if (!visible) {
    return null;
  }

  return (
    <div className="bg-black w-52 sm:w-60 absolute top-[2rem] sm:top-14 right-0 py-5 border-2 border-gray-800 flex opacity-80">
      <div className="flex flex-col gap-3 w-full">
        <div className="px-3 group/item flex flex-row gap-3 items-center ">
          <img
            src="/images/default-blue.png"
            className="w-8 rounded-md"
            alt=""
          />
          <p className="text-white text-md tex group-hover/item:underline">
            {data.name}
          </p>
        </div>
        <hr className="bg-gray-600 border-0 h-px my-4 " />
        <div onClick={()=>signOut()} className="px-3 text-center text-white text-sm hover:underline ">
            Sign out of Netflix
        </div>
      </div>
    </div>
  );
};

export default AccountMenu;
