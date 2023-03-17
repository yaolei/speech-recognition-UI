const initialState = {
    count: 0
}

export const rootReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'INCREMENT':
            return {
                ...state,
                count: state.count+1
            }
        case 'DECREMENT':
            return {
                ...state,
                count: state.count-1
            }
        default:
            return state;
    }
}

const initialStock = {
    stock_state:true,
    msgInfo:"Pls say something...."
}
export const setSocketState = (state = initialStock, action) => {
    switch(action.type) {
        case 'SOCKET_STATE':
            return {
                ...state,
                stock_state: action.stock_state
            }
        case 'MESSAGE_INFO':
            return {
                ...state,
                msgInfo: action.msgInfo
            }
        default:
            return state;
    }
} 





