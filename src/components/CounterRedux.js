import React from 'react'
import Header from './Header'
import { useSelector, useDispatch } from 'react-redux'
import { increment, decrement, reset, incrementByIp, decrementByIp, getValue } from '../Actions'

function CounterRedux() {
    const { counter, Data } = useSelector(state => state.counter)
    const dispatch = useDispatch()
    const inputHandler = (ele) => {
        dispatch(getValue(ele.target.value))
    }
    return (
        <>
            <Header />
            <div>
                <div style={{ textAlign: "center" }}>Counter : {counter} </div>
                <div>
                    <input type="number" id="counter" name="counter" value={Data} onChange={inputHandler} />
                    {/* <button >save</button> */}
                </div>
                <button onClick={() => dispatch(increment())}>Increment ++</button>
                <button onClick={() => dispatch(incrementByIp(Data))}>Inc by input ++</button>
                <button onClick={() => dispatch(reset())}>Reset 0</button>
                <button onClick={() => dispatch(decrement())}>Decrement - -</button>
                <button onClick={() => dispatch(decrementByIp(Data))}>Dec by input - -</button>
            </div>
        </>
    )
}

export default CounterRedux
