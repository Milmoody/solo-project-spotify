import { connect } from 'react-redux';
import {toggleItem} from '../actions/actions.js';
import ItemList from '../components/listDisplay.jsx';
import { VisibilityFilters } from '../actions/actions.js';
import { syncItems, loadItems } from '../actions/actions.js';
import itemApp from '../reducers/reducer';


const getVisibleItems = (items, filter) => {
    switch (filter) {
        case VisibilityFilters.SHOW_ALL:
            return items
        case VisibilityFilters.SHOW_COMPLETED:
            return items.filter(i => i.completed)
        case VisibilityFilters.SHOW_ACTIVE:
            return items.filter(i => !i.completed)
        default:
            throw new Error('Unknown filter: ' + filter)
    }
}

const mapStateToProps = state => ({
    items: getVisibleItems(state.items, state.visibilityFilter),
    
})

const mapDispatchToProps = dispatch => ({
    toggleItem: id => dispatch(toggleItem(id)),
    syncItems: () => dispatch(syncItems()),
    loadItems: () => dispatch(loadItems()),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ItemList)