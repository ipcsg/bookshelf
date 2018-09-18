import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getBook, updateBook } from '../../actions';
// import { addBook, clearNewBook } from '../../actions';

class EditBook extends PureComponent {

    state={
        formdata:{
            _id:this.props.match.params.id,
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
        this.props.dispatch(updateBook(this.state.formdata))//dispatch action to update the book
        
    }

   
    componentDidMount(){
        this.props.dispatch(getBook(this.props.match.params.id))
    }
    
    componentWillReceiveProps(nextProps){//receives incoming props --> nextProps
        let book = nextProps.books.book;
        this.setState({
            formdata:{
                _id:book._id,
                name:book.name,
                author:book.author,
                review:book.review,
                pages:book.pages,
                rating:book.rating,
                price:book.price

            }
        })
    }

    render() {
        return (
            <div className="rl_container article">

                <form onSubmit={this.submitForm}>

                    <h2>Edit Review</h2>

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

                    <button type="Submit">Edit Review</button>
                    <div className="delete_post">
                        <div className="button">Delete Review</div>
                    </div>
                    
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

export default connect(mapStateToProps)(EditBook);