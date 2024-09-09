const initialState = [];

const cartitemsreducer = (state = initialState, action) => {
    switch(action.type) {
        case 'AddItem':   
            return [...state, action.payload];
        case 'RemoveItem':
            return state.filter(x => x.item !== action.payload.item);
        case 'Clear':
            return [];
        case 'InitializeCart': // New action type to initialize cart
            return action.payload; // Payload should be array of cart items from localStorage
        default:
            return state;
    }
}

export default cartitemsreducer;
