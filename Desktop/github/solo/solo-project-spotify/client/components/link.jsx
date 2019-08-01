import React from 'react'
import PropTypes from 'prop-types'

const Link = props => {
  return(
    <button onClick={props.onClick} filter={props.filter} disabled={props.active} style={{ marginLeft: '4px'}}>
      {props.children}
    </button>
  )
}
// const Link = ({ active, children, onClick }) => (
//   <button
//     onClick={onClick}
//     disabled={active}
//     style={{
//       marginLeft: '4px'
//     }}
//   >
//     {children}
//   </button>
// )

// Link.propTypes = {
//   active: PropTypes.bool.isRequired,
//   children: PropTypes.node.isRequired,
//   onClick: PropTypes.func.isRequired
// }

export default Link