import { put, takeEvery, delay } from 'redux-saga/effects'

export function* incrementAsync() {
    yield delay(1000)
    yield put({ type: 'INCREMENT' })
}
export function* decrementAsync() {
    yield delay(1000)
    yield put({ type: 'DECREMENT' })
}

export function* getValue(action) {
    if (action.payload < 0 ||isNaN(action.payload) === true) {
        console.log(action.payload, "abc")
        yield put({ type: "GET_VALUE", payload: 1 });
    } else {
        console.log(action.payload, "number")
        yield put({ type: "GET_VALUE", payload: action.payload });
    }
}
export default function* rootSaga() {
    console.log("f")
    yield takeEvery("VALIDATE_IP", getValue)
    yield takeEvery('INCREMENT_ASYNC', incrementAsync)
    yield takeEvery('DECREMENT_ASYNC', decrementAsync)
}
