const initialState={
    price: '',
    user: {},
    clearPrice: '',
    total: 0
}

const UPDATE_PRICE = 'UPDATE_PRICE'
const UPDATE_USER = 'UPDATE_USER'
const CLEAR_PRICE = 'CLEAR_PRICE'
const UPDATE_TOTAL = 'UPDATE_TOTAL'

export function updatePrice(price){
    return{
        type: UPDATE_PRICE,
        payload:price
    }
}

export function updateTotal(total){
    return{
        type:UPDATE_TOTAL,
        payload: total
    }
}

export function updateUser(userObj){
    return{
        type: UPDATE_USER, 
        payload: userObj
    }
}

export function clearPrice(){
    return{
        type: CLEAR_PRICE,
        payload: ''
    }
}

export default function reducer(state=initialState, action){
    switch(action.type){
        case UPDATE_PRICE:
        let newprice = state.price + action.payload
        return Object.assign({}, state, {price: newprice})
        case UPDATE_USER:
        return Object.assign({}, state, {user: action.payload})
        case CLEAR_PRICE:
        return Object.assign({},state,{}, {price: action.payload})
        case UPDATE_TOTAL:
        return Object.assign({},state,{total: action.payload})
        default: return state
    }

}