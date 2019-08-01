import React from 'react';
import PropTypes from 'prop-types'

const Item = (props) => (
    <li className="itemDisplay" id={props.id} onClick={props.onClick} style={{ textDecoration: props.completed ? 'line-through' : 'none' }} >
        {props.text}
    </li>
)

// { onClick, completed, text }

// Item.propTypes ={
//     onClick: PropTypes.func.isRequired,
//     completed: PropTypes.bool.isRequired,
//     text: PropTypes.string.isRequired
// }

export default Item