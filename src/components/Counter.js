import { useState, useEffect } from 'react'

const Counter = ({count}) => {
    const backgroundClasses = "flex w-full justify-center items-center h-screen"
    const [backgroundColor, setbackgroundColor] = useState('')
    const [counter, setCounter] = useState(3)

    const changeBackground = (number) => {
        if (number === 3) {
            setbackgroundColor('bg-red-300')
            setCounter(number)
        } else if (number === 2) {
            setbackgroundColor('bg-yellow-300')
            setCounter(number)
        } else if (number === 1) {
            setbackgroundColor('bg-green-300')
            setCounter(number)
        }
    }
    useEffect(() => {
        changeBackground(count)
    }, [count])

    

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
