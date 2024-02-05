import React from "react";

interface InputProps {
  id: string;
  onChange: any;
  value: string;
  label: string;
  type?: string;
}

const Input: React.FC<InputProps> = ({ id, onChange, value, label, type }) => {
  return (
    <div className="relative"> 
      <input
        onChange={onChange}
        type={type}
        value={value}
        id={id}
        className="
            block
            rounded-md
            px-6
            py-6
            pb-1
            text-md
            text-white@
            bg-neutral-700
            appearance-none
            focus:outline-none
            focus-ring-0
            peer
            w-full
            
            "
        placeholder=" "
      />
      <label
        htmlFor={id}
        className="absolute text-md text-zinc-400 duration-250 transform -transalte-y-3 scale-75 top-3 z-10 origin-[0] left-6 peer-placeholder-shown:scale-100 peer-placeholder-shown:transalte-y-0 peer-focus:scale-75 peer-focus:-translate-y-1"
      >
        {label}
      </label>
    </div>
  );
};

export default Input;
