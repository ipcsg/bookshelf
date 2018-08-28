import React, { Component } from 'react';
import { getBookWithReviewer} from '../../actions';
import { connect } from 'react-redux';

class BooksView extends Component {

    componentDidMount(){

        this.props.dispatch(getBookWithReviewer(this.props.match.params.id));

    }

    render() {
        console.log(this.props)
        return (
            <div>
                BooksView
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        books: state.books
    }
}

export default connect(mapStateToProps)(BooksView);