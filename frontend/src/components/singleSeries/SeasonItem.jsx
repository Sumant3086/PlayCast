const SeasonItem = ({ seasonNumber, episodeCount, children }) => (
    <div className="bg-c-black-06 border border-c-black-15 rounded-xl xl:px-7 px-5 py-1">
        <div className="flex items-center justify-between py-5 pb-7 border-b border-b-c-black-15">
            <div className="flex items-center gap-4">
                <h5 className="text-white 2xl:text-lg max-md:text-super-sm font-medium">Season {seasonNumber}</h5>
                <span className="text-c-grey-60 md:text-super-sm text-sm">{episodeCount} Episodes</span>
            </div>
        </div>
        {children}
    </div>
);

export default SeasonItem;