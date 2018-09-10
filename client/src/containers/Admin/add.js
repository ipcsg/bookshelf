import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { addBook, clearNewBook } from '../../actions';

class AddBookReview extends Component {

    state={
        formdata:{
            name:'',
            author:'',
            review:'',
            pages:'',
            rating:'',
            price:''
        }
    }

    handleInput = (event,name)=>{

        const newFormData = {
            ...this.state.formdata
        } //get all formdata in state

        newFormData[name] = event.target.value; //update the particular field value

        this.setState({
            formdata:newFormData //update the formdata in state with updated data
        })



    }

    submitForm = (e) =>{
        e.preventDefault();
        //console.log({...this.state.formdata})
        this.props.dispatch(addBook({
            ...this.state.formdata,
            ownerId:this.props.user.login.id
        }))
    }

    showNewBook = (book) => (
        book.post ?
            <div className="conf_link">
                Cool!! <Link to={`/books/${book.bookId}`}>
                Click to see the review</Link>
            </div>
        :null
        
    )

    componentWillUnmount() {
        this.props.dispatch(clearNewBook())//clear the newbook when the componet unmounted
    }
    

    render() {
        return (
            <div className="rl_container article">

                <form onSubmit={this.submitForm}>

                    <h2>Add Review</h2>

                    <div className="form_element">
                        <input type="text"
                            placeholder="Enter Name" 
                            value={this.state.formdata.name}
                            onChange={(event)=>this.handleInput(event,'name')}
                        />
                    </div>


                    <div className="form_element">
                        <input type="text"
                            placeholder="Enter Author" 
                            value={this.state.formdata.author}
                            onChange={(event)=>this.handleInput(event,'author')}
                        />
                    </div>

                    <textarea 
                        value={this.state.formdata.review} 
                        onChange={(event)=>this.handleInput(event,'review')} />


                    <div className="form_element">
                        <input type="number"
                            placeholder="Number of Pages" 
                            value={this.state.formdata.pages}
                            onChange={(event)=>this.handleInput(event,'pages')}
                        />
                    </div>

                    <div className="form_element">
                    <select value={this.state.formdata.rating} 
                            onChange={(event)=>this.handleInput(event,'rating')}>
                        <option val="1">1</option>
                        <option val="2">2</option>
                        <option val="3">3</option>
                        <option val="4">4</option>
                        <option val="5">5</option>
                    </select>
                    </div>

                    <div className="form_element">
                        <input type="number"
                            placeholder="Price" 
                            value={this.state.formdata.price}
                            onChange={(event)=>this.handleInput(event,'price')}
                        />
                    </div>

                    <button type="Submit">Add Review</button>
                    {
                        this.props.books.newbook ? 
                            this.showNewBook(this.props.books.newbook)
                        :null
                    }
                </form>
               
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    console.log(state)
    return {
        books: state.books
    }
}

export default connect(mapStateToProps)(AddBookReview);