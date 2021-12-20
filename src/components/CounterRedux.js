import React from 'react'
import Header from './Header'
import { useSelector, useDispatch } from 'react-redux'
import { increment, decrement, reset, incrementByIp, decrementByIp, getValue, incrementAsync, decrementAsync, ValidateInput } from '../Actions'
function CounterRedux() {
    const { counter, Data } = useSelector(state => state.counter)
    const dispatch = useDispatch()
    const inputHandler = (ele) => {
        ele.target.value && dispatch(ValidateInput(ele.target.value))
    }
    return (
        <>
            <Header />
            <div>
                <div style={{ textAlign: "center" }}>Counter : {counter} </div>
                <div>
                    <input type="text" onChange={inputHandler} />

                </div>
                <button onClick={() => dispatch(increment())}>++</button>
                <button onClick={() => dispatch(incrementByIp(Data))}>Inc by input ++</button>
                <button onClick={() => dispatch(reset())}>Reset 0</button>
                <button onClick={() => dispatch(decrement())}> - -</button>
                <button onClick={() => dispatch(decrementByIp(Data))}>Dec by input - -</button>
                <button onClick={() => dispatch(incrementAsync())}>async+</button>
                <button onClick={() => dispatch(decrementAsync())}>async-</button>
            </div>
        </>
    )
}

export default CounterRedux
