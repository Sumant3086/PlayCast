import { SearchSvg } from "@/assets/Svgs";

const Search = () => {
    return (
        <button className="focus:outline-none focus:border-none mx-2.5 md:inline hidden">
            <SearchSvg className="3xl:w-[2.4rem] 3xl:h-[2.4rem]" />
        </button>
    );
}

export default Search;