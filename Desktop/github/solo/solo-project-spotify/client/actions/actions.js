import axios from 'axios';
import fetch from 'cross-fetch';

let nextItemId = 0;
export const addItem = text => ({
    type: 'ADD_ITEM',
    id: nextItemId++,
    text
})

export const setVisibilityFilter = filter => ({
    type: 'SET_VISIBILITY_FILTER',
    filter
})

export const toggleItem = id => ({
    type: 'TOGGLE_ITEM',
    id
})

export const VisibilityFilters = {
    SHOW_ALL: 'SHOW_ALL',
    SHOW_COMPLETED: 'SHOW_COMPLETED',
    SHOW_ACTIVE: 'SHOW_ACTIVE'
}

export const syncItems = () => (dispatch, getState) => {
    console.log('getState: ', getState().items)
    axios.put(`/items`, [...getState().items])
      .then(console.log('put request getstate: ',getState().items))
      .then(({ status }) => {
          console.log(status)
        if (status === 200) dispatch({ 
            type: 'SYNC_ITEMS',
            payload: getState().items
         });
      })
      .catch(console.error);
  };

// export const syncItems = () => (dispatch, getState) => {
//     console.log('getState: ', getState().items)
//     axios.put(`/items`, getState().items)
//       .then(console.log('put request getstate: ',getState().items))
//       .then(({ status }) => {
//         //   console.log(status)
//         if (status === 200) dispatch({ type: 'SYNC_ITEMS' });
//       })
//       .catch(console.error);
//   };
  
  export const loadItems = () => (dispatch) => {
      console.log('load items hit');
    axios.get('/items')
      .then(({ data }) => {
          console.log('data: ', data)
        dispatch({
          type: 'LOAD_ITEMS',
          payload: data,
        });
      })
      .catch(console.error);
  };