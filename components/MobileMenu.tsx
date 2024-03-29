import React from "react";

interface MobileMenuProps {
  visible?: boolean;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ visible }) => {
  if (!visible) {
    return null;
  }

  return (
    <div className="bg-black w-56 absolute top-[2rem] left-[-3rem] py-5 flex-col border-2 border-gray-800 flex opacity-80 ">
      <div className="flex flex-col gap-4">
        <div className="px-3 text-center text-white hover:underline">Home</div>
        <div className="px-3 text-center text-white hover:underline">
          Series
        </div>
        <div className="px-3 text-center text-white hover:underline">Films</div>
        <div className="px-3 text-center text-white hover:underline">
          New & popular
        </div>
        <div className="px-3 text-center text-white hover:underline">
          My list
        </div>
        <div className="px-3 text-center text-white hover:underline">
          Browser by language
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
