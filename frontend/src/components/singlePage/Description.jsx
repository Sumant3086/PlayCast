const Description = ({ description }) => {
    return (
        <div className="bg-c-black-10 border border-c-black-15 rounded-2xl xl:py-7 xl:px-7 md:px-6 md:py-6 px-5 py-5">
            <h4 className="text-c-grey-60 xl:text-lg font-medium mb-2">Description</h4>

            <p className="text-white 2xl:text-base xl:text-super-sm md:text-sm text-super-xs">
                {!description || description === "" ? "No description available yet!" : description}
                {/* When a young boy vanishes, a small town uncovers a mystery involving secret experiments,
                terrifying supernatural forces and one strange little girl. */}
            </p>
        </div>
    );
}

export default Description;