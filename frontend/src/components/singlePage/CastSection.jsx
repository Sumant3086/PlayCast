"use client";
import { useRef } from "react";

import ActorItem from "./ActorItem";
import PaginationToggle from "../PaginationToggle";


const CastSection = ({ actors }) => {
    const scrollContainerRef = useRef(null);

    return (
        <div className="bg-c-black-10 border border-c-black-15 rounded-2xl xl:py-7 xl:px-7 md:px-6 md:py-6 px-5 py-5">
            <div className="flex items-center justify-between lg:mb-5 mb-4">
                <h4 className="text-c-grey-60 xl:text-lg md:text-super-base font-medium">Actors</h4>
                <PaginationToggle containerRef={scrollContainerRef} />
            </div>
            <div
                className="flex gap-4 overflow-x-auto custom-scrollbar custom-scrollbar-sm pb-2.5"
                ref={scrollContainerRef}
            >
                {actors.length > 0 ?
                    actors.map(({ actorId, fullName, profile }) => (
                        <ActorItem key={actorId} id={actorId} fullName={fullName} profile={profile} />
                    )) :
                    <p className="text-white 2xl:text-base xl:text-super-sm md:text-sm text-super-xs">No actors found</p>
                }
            </div>
        </div>
    );
}

export default CastSection;