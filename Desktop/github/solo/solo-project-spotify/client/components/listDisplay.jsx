import React from 'react';
// import PropTypes from 'prop-types';
import Item from './itemDisplay.jsx';


const ItemList = (props) => {
    let itemList = [];
    for( let i = 0; i < props.items.length; i++){
        console.log(props.items[i]);
        let item = props.items[i];
        itemList.push(<Item key={item.id} id={i} completed={item.completed} text={item.text} onClick={() => props.toggleItem(i)}/> )
    }
    return(
    <ul>
        <h2>Tracks</h2>
        <button className="secondary" onClick={props.syncItems} disabled={props.synced}>Sync</button>
        <button className="secondary" onClick={props.loadItems} disabled={props.synced}>Load Items</button>
        {itemList}
    </ul>
    )
}

export default ItemList;