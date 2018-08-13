import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getBooks } from '../actions';


class HomeContainer extends Component {

    //react lifecycle method componentDidMount is used
    componentDidMount(){
        this.props.dispatch(getBooks(3,0,'desc'))//dispatch function is first called which has a function as an argument. 
        //then it is processed and waited until results are obtained.
    }


    renderItems = (books) =>(//parenthesis have to be used to return the data here
        //otherwise use "return" before "books.list.map......... ? '':null"
        books.list ? //ensure that the data is loaded already

                books.list.map(item => ('item'))

                   :null//if data is not loaded display null
    ) 


    render() {
        console.log(this.props);//checking props to see the dispatched function above. you can clearly see at first this doesn't bring the data. 
        //it has to wait until the data is retrieved and then data is loaded. You can see in console dispatch function is displayed twice. 
        //once it's empty and thereafter it has data in it.
        return (
            <div>
                {this.renderItems(this.props.books)}
            </div>
        );
    }

    
}

const mapStateToProps = (state) => {
    return {
        books: state.books
    }
}

export default connect(mapStateToProps)(HomeContainer);