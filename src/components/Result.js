const Result = ({handleGameState, isComplete}) => {
    return (
        <>
       <div className="flex flex-col justify-between h-full w-full">
            <div className=""></div>
            <div className="w-full px-8 flex flex-col items-center">
                {

                    isComplete ? <p>Good Job! You found the target {':D'} </p> : <p>You fail to find the target :{'('} </p>
                }
                <p>Want to play again?
                </p>
                <button onClick={() => handleGameState('countDown')} className="px-5 py-2 rounded-xl shadow-lg mt-10 font-semibold font-sans text-white text-2xl bg-red-300">
                    Play Again
                </button>
            </div>
            <h1 className="">Lorem.</h1>
        </div>     
        </>
    )
}

export default Result
