import React from "react";
import { BsFillPlayFill } from "react-icons/bs";
import FavoriteButton from "./FavoriteButton";
import { useRouter } from "next/router";
import useInfoModal from "@/hooks/useInfoModal";
import { BiChevronDown } from "react-icons/bi";

interface MovieCardProps {
  data: Record<string, any>;
  key: string;
}

const MovieCard: React.FC<MovieCardProps> = ({ data }) => {
  const router = useRouter();
  const { openModal } = useInfoModal();

  return (
    <div className="group bg-zinc-900 col-span relative h-[28vw] sm:h-[14vw]">
      <div className="flex  flex-wrap ">
        <div
          className="flex flex-col item-center mb-4 mt-4 mx-1 "
          onClick={() => {
            openModal(data?.id);
          }}
        >
          <img
            src={data.thumbnailUrl}
            alt="thumbnail"
            className="
                cursor-pointer
                object-cover 
                transition
                duration 
                shadow-xl
                rounded-md
                group-hover:opacity-80
                sm:group-hover:opacity-0
                delay-300
                w-full
                sm:h-[14vw]
                h-[20vw]
                "
          ></img>

          <div className="absolute bottom-3 left-0 sm:bottom-1 rounded-md bg-black bg-opacity-50 px-2 py-1 w-full">
            <p className="text-white opacity-100 text-xs sm:text-lg text-left whitespace-nowrap">
              {data?.title}
            </p>
          </div>
        </div>
      </div>
      <div
        className=" 
                
                opacity-0
                absolute
                top-0
                transition 
                duration-200
                z-10
                invisible
                sm:visible
                delay-300
                w-full
                scale-0
                group-hover:scale-110
                group-hover:-translate-y-[2vw]
                group-hover:translate-x-[2vw]
                group-hover:opacity-100
                "
      >
        <img
          src={data.thumbnailUrl}
          alt="thumbnail"
          className="
                coursor-pointer
                object-cover
                transition
                duration
                shadow-xl
                rounded-t-md
                w-full
                h-[12vw]
                "
        />
        <div
          className="
                z-10
                bg-zinc-800
                p-2
                lg:p-4
                absolute
                w-full
                transition
                shadow-md
                rounded-b-md
                

                "
        >
          <div className="flex flex-row items-center gap-3 ">
            <div
              onClick={() => router.push(`/watch/${data?.id}`)}
              className="cursor-pointer w-6 h-6 lg:w-10  lg:h-10 bg-white rounded-full flex justify-center items-center transition hover:bg-neutral-300"
            >
              <BsFillPlayFill size={30} />
            </div>
            <FavoriteButton movieId={data.id} />
            <div
              onClick={() => {
                openModal(data?.id);
              }}
              className="cursor-pointer ml-auto group/item w-6 h-6 lg:w-10 lg:h-10 border-white border-2 rounded-full flex justify-center items-center transition hover:border-neutral-300"
            >
              <BiChevronDown
                size={30}
                className="text-white group/item:text-neutral-300"
              />
            </div>
          </div>
          <p className="text-green-400 front-semibold mt-4">
            New <span className="text-white">2023</span>
          </p>
          <div className="flex flex-row mt-4 gap-2 items-center">
            <p className="text-white text-[10px] lg:text-sm">{data.title}</p>
          </div>
          <div className="flex flex-row mt-4 gap-2 items-center">
            <p className="text-white text-[10px] lg:text-sm">{data.duration}</p>
          </div>
          <div className="flex flex-row mt-4 gap-2 items-center">
            <p className="text-white text-[10px] lg:text-sm">{data.genre}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
