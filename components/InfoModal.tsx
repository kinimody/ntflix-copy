import React, { useCallback, useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";

import PlayButton from "./PlayButton";
import FavoriteButton from "./FavoriteButton";
import useInfoModal from "@/hooks/useInfoModal";
import useMovie from "@/hooks/useMovie";

interface InfoModalPorps {
  visible?: boolean;
  onClose: any;
}

const InfoModal: React.FC<InfoModalPorps> = ({ visible, onClose }) => {
  const [isVisible, setIsVisible] = useState(!!visible);
  const { movieId } = useInfoModal();
  const { data } = useMovie(movieId);

  useEffect(() => {
    setIsVisible(!!visible);
  }, [visible]);

  const handleClose = useCallback(() => {
    setIsVisible(false);
    setTimeout(() => {
      onClose();
    }, 300);
  }, [onClose]);

  const handleEscape = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape" && isVisible) {
        handleClose();
      }
    },
    [handleClose, isVisible]
  );
  
  useEffect(() => {
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [handleEscape]);

  if (!visible) {
    return null;
  }

  return (
    <div className="z-50 transition duration-300 bg-black bg-opacity-80 flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0">
      <div className="relative w-auto mx-auto max-w-3xl rounded-md overflow-hidden">
        <div
          className={`${isVisible ? "scale-100" : "scale-0"}
            transform
            duration-300
            relative
            flex-auto
             bg-zinc-900
            drop-shadow-md
          `}
        >
          <div className="relative h-96 sm:h-96">
            <video
              className="w-full brightness-[60%] object-cover h-full"
              muted
              loop
              poster={data?.thumbnailUrl}
              src={data?.videoUrl}
            ></video>
            <div
              className="cursor-pointer absolute top-3 right-3 h-7 w-7 sm:h-10 m:w-10 rounded-full bg-black bg-opacity-70 flex items-center justify-center"
              onClick={handleClose}
            >            
                <AiOutlineClose className="text-white" style={{ fontSize: '1rem', '@screen sm': { fontSize: '2rem' } }} />
            </div>
            <div className="absolute left-10 bottom-[5%]">
                <p className="text-white text-2xl md:text-4xl h-full lg:text-5xl  mb-4 sm:mb-4">
                    {data?.title}
                </p>
                <div className="flex flex-row gap-4 items-center">
                    <PlayButton movieId={data?.id}/>
                    <FavoriteButton movieId={data?.id}/>

                </div>
            </div>
          </div>
            <div className=" px-4 sm:px-12 py-8  md:py-8 flex flex-wrap sm:flex-nowrap gap-4 sm:gap-12 ">
              <div className="flex flex-col">
                <p className="text-green-400 font-semibold  text-sm sm:text-lg">
                    New
                </p>
                <p className="text-white text-xs sm:text-lg">{data?.duration}</p>
                <p className="text-white text-xs sm:text-lg">{data?.genre}</p>
              </div>
              <div className="flex-1">
                <p className="text-white text-xs sm:text-lg ">{data?.description}</p>
              </div>
            </div>

        </div>
      </div>
    </div>
  );
};

export default InfoModal;
