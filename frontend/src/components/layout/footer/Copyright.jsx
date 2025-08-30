const Copyright = () => {
    return (
        <div className="flex md:flex-row flex-col md:items-center justify-between max-md:gap-4 text-c-grey-60 3xl:text-lg text-super-xs pt-4 border-t border-t-c-black-15">
            <p>@2023 streamvib, All Rights Reserved</p>
            <ul className="flex items-center divide-x divide-c-black-15 md:space-x-3 space-x-5">
                <li className="">Terms of Use</li>
                <li className="md:pl-3 pl-5">Privacy Policy</li>
                <li className="md:pl-3 pl-5">Cookie Policy</li>
            </ul>
        </div>
    );
}

export default Copyright;