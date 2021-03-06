import React, { Component } from 'react';
import { getBookWithReviewer, clearBookWithReviewer} from '../../actions';
import { connect } from 'react-redux';

class BooksView extends Component {

    componentDidMount(){

        this.props.dispatch(getBookWithReviewer(this.props.match.params.id));

    }

    componentWillUnmount(){//clearing store data related to BooksView component. So that it won't show previously loaded data before showing the correct article view

        this.props.dispatch(clearBookWithReviewer());

    }

    renderBooks = (books)=>(
        books.book ? 
        
            <div className="br_container">

                <div className="br_header">
                    <h2>{books.book.name}</h2>
                    <h5>{books.book.author}</h5>
                    <div className="br_reviewer">
                        <span>Reviewed By: </span>{books.reviewer.name} {books.reviewer.lastname}
                    </div>
                </div>

                <div className="br_review">
                    {books.book.review}
                </div>

                <div className="br_box">
                    <div className="left">
                        <div>
                            <span>Pages: </span>{books.book.pages}
                        </div>
                        <div>
                            <span>Price: </span>{books.book.price}
                        </div>
                    </div>
                    <div className="right">
                        <span>Rating</span>
                        <div>{books.book.rating}/5</div>
                    </div>
                </div>

            </div>

        :null

    );

    render() {
        let books = this.props.books;
        console.log(this.props)
        console.log(books)
        return (
            <div>
                {this.renderBooks(books)}
            </div>
        );
    }
}

function mapStateToProps(state) {
    console.log(state);
    return {
         books: state.books
    }
}

export default connect(mapStateToProps)(BooksView);