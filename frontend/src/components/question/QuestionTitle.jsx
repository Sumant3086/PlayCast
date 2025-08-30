const QuestionTitle = ({ setIsOpen }) => {
    return (
        <div className="flex md:flex-row flex-col md:items-end items-start md:gap-6 gap-3">
            <div className="flex-1">
                <h3 className="text-white font-medium 3xl:text-3xl xl:text-2.5xl md:text-2xl text-xl mb-2">Frequently Asked Questions</h3>
                <p className="text-c-grey-60 3xl:text-[1.18rem] md:text-sm text-xs">
                    Got questions? We ve got answers! Check out our FAQ section to find answers to the most common questions about PlayCast.
                </p>
            </div>
            <button
                className="bg-c-red-45 text-white text-super-sm 3xl:text-xl 3xl:py-3 lg:py-2 md:py-1.5 py-2 3xl:px-6 lg:px-5 px-3.5 rounded"
                onClick={() => setIsOpen(true)}
            >
                Ask a Question
            </button>
        </div>
    );
}

export default QuestionTitle;