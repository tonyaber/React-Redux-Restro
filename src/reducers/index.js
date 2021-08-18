const initialState = {
    menu: [],
    loading: true,
    error: false,
    items: [],
    totalPrice: 0,
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'MENU_LOADED':
            return {
                ...state,
                menu: action.payload,
                loading: false
            };
        case 'MENU_REQUESTED':
            return {
                ...state,
                menu: state.menu,
            };
        case 'MENU_ERROR':
            return {
                ...state,
                error: true,
            };
        case 'ITEM_ADD_TO_CARD':
            const id = action.payload;
            const item = state.menu.find(item => item.id === id);
            const itemIndex = state.items.findIndex(item => item.id === id);
                        
            if (state.items.find(item => item.id === id)) {
                let { count } = state.items[itemIndex];
                return {
                    ...state,
                    items: [
                        ...state.items.slice(0, itemIndex),
                        {
                            ...state.items[itemIndex],
                            count: ++count
                        },
                        ...state.items.slice(itemIndex + 1)
                    ],
                    totalPrice: state.totalPrice + item.price,
                }            
            }
            const newItem = {
                title: item.title,
                price: item.price,
                url: item.url,
                id: item.id,
                count: 1,
            }
            return {
                ...state,
                items:[
                        ...state.items,
                        newItem
                    ],
                totalPrice: state.totalPrice + item.price,

            };
        case 'ITEM_REMOVE_FROM_CART':
            const index = action.payload;      
            const itemInd = state.items.findIndex(item => item.id === index);
            const price = state.items[itemInd].price * state.items[itemInd].count;
            return {
                ...state,
                items: [
                    ...state.items.slice(0, itemInd),
                    ...state.items.slice(itemInd + 1)
                ],
                totalPrice: state.totalPrice - price,
            }

        default:
            return state;
    }
}

export default reducer;