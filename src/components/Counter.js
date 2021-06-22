import { useState, useEffect } from 'react'

const Counter = ({handleGameState}) => {
    const backgroundClasses = "flex w-full justify-center items-center h-screen"
    const [backgroundColor, setbackgroundColor] = useState('')
    const [counter, setCounter] = useState(3)
    const countDown = () => {
        setInterval(function(){
            if(counter > 1) {
                setCounter(counter - 1)
            }
            // console.log(counter)
            if(counter == 1) {
                
                handleGameState('finding')
                
            } 
         }, 1000);
         
    }
    useEffect(() => {
        // countDown()
        // handleGameState('finding')
    }, [])
    const changeBackground = (counter) => {
        if (counter === 3) {
            setbackgroundColor('bg-red-300')
            // setCounter(counter)
        } else if (counter === 2) {
            setbackgroundColor('bg-yellow-300')
            // setCounter(counter)
        } else if (counter === 1) {
            setbackgroundColor('bg-green-300')
            // setCounter(counter)
        }
    }
    useEffect(() => {
        changeBackground(counter)
        if(counter > 0) {
            // console.log('executed')
            countDown()
        } 
    }, [counter])

    

    // setbackgroundColor('bg-blue-200')
    return (
        <>
        {/* <Idle /> */}
        <div className={backgroundClasses + ' ' + backgroundColor}>
            <h1 className="font-bold text-white" style={{
            // fontFamily: 'Passion One',
            fontSize: '288px'
            }}>{ counter }</h1>
        </div>
        </>
    );
}

export default Counter
