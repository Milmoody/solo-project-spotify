import React, { Component } from 'react';
import Footer from './footer.jsx';
import ItemCreator from '../containers/ItemCreator.js';
import VisibleItemsList from '../containers/VisibleItemsList.js';
import * as actions from "../actions/actions.js"


class App extends Component {
    constructor(props) {
        super(props);
    }
    render(){
        return (
            <div id="main-content">
                <ItemCreator addItem={actions.addItem()} />
                <VisibleItemsList items={this.props.items}/>
                <Footer />
            </div>
        )
    }
}


export default App;