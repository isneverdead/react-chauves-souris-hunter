
const Finding = () => {
    return (
        <div className="flex flex-col w-full">
            <div className="w-full flex flex-row px-10 py-3 bg-red-300 ">
            <h1 className="font-sans font-bold text-4xl text-white">Find...</h1>
            </div>
            <div className="relative flex justify-center items-center h-full w-full bg-black">
            <h1 className="mx-auto font-sans font-bold text-2xl text-white">Loading . . .</h1>
            <div className="absolute bottom-4 left-2 px-5 py-2 bg-white rounded-md">
                <h2 className="font-sans font-bold text-2xl text-gray-800">itu bukan scissors!</h2>
            </div>
            </div>
        </div>
    )
}

export default Finding
