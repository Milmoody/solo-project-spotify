import React from 'react';
import { connect } from 'react-redux';
import { addItem } from '../actions/actions.js';

const AddItem = ({ dispatch }) => {
    let input

    return (
        <div>
            <form onSubmit={ e => {
                e.preventDefault()
                if(!input.value.trim()) {
                    return
                }
                dispatch(addItem(input.value))
                input.value = ''
            }}
            >
                <input ref={node => (input = node)} />
                <button type="submit">Add Item</button>
            </form>
        </div>
    )
}

export default connect()(AddItem)



// const ItemCreator = (props) => {
//     return (
//     <div>
//         <input id="input" value={props.newItem} onSubmit={(e) => props.addItem(e)} type="text" className="main-input"></input>
//         <button onClick={props.addItem}>Add an item</button>
//     </div>
//     )
// }    

// export default ItemCreator;