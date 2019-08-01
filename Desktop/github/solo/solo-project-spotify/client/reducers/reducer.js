import { combineReducers } from 'redux';

import {
    ADD_ITEM,
    TOGGLE_ITEM,
    SET_VISIBILITY_FILTER,
    VisibilityFilters
  } from '../actions/actions.js'

  const { SHOW_ALL } = VisibilityFilters;

function visibilityFilter (state = SHOW_ALL, action) {
    switch(action.type){
        case 'SET_VISIBILITY_FILTER':
            return action.filter
        default:
            return state;
    }
}

function items (state = [], action) {
    switch(action.type) {
        case 'ADD_ITEM':
        return [
            ...state,
            {
                id: action.id,
                text: action.text,
                completed: false
            }
        ]
        case 'TOGGLE_ITEM':
            return state.map((item, id) => {
                console.log('id: ',id,'action id: ',action.id)
                if(id === action.id) {
                    return Object.assign({}, item, {
                        completed: !item.completed
                    })
                }
                return item;
            })

        default:
            return state;
    }
}

let initialState = {
    items: [],
    // synced: true
}
function syncReducer(state = initialState, action) {
    switch(action.type){
        case 'SYNC_ITEMS':
            return {
                ...items
                // items: [...items],
                // synced: true,
            };
        
        case 'LOAD_ITEMS':
        return {
            items: [...action.payload]
        }
        default:
            return state;
    }
}

function itemApp(state = {}, action){
    return {
        visibilityFilter: visibilityFilter(state.visibilityFilter, action),
        items: items(state.items, action),
        syncReducer: syncReducer(state.syncReducer, action)
    }
}


// const itemApp = combineReducers({
//     visibilityFilter,
//     items
// })
export default itemApp;