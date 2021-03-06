import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getBook, updateBook, clearBook, deleteBook } from '../../actions';
//import ReviewForm from './reviewform'; --> used for testing
// import { addBook, clearNewBook } from '../../actions';

class EditBook extends PureComponent {
    
    constructor(props){ 
        super(props);
    this.state={
         formdata:{
             _id:props.match.params.id,
             name:'',
             author:'',
             review:'',
             pages:'',
             rating:'',
             price:''
             },
         hasUserEdits:false //used to prevent infinite loop when using componentDidUpdate lifecycle method
         }
     } 

    
   
    componentDidMount(){
        this.props.dispatch(getBook(this.props.match.params.id))
    }
    

    handleInput = (event,name)=>{

        const newFormData = {
            ...this.state.formdata
        } //get all formdata in state
        newFormData[name] = event.target.value; //update the particular field value

        this.setState({
            formdata:newFormData,
             //update the formdata in state with updated data
        })
    }

    submitForm = (e) =>{
        e.preventDefault();
        //this.state.formdata['hasUserEdits']=true;
        //this.setState({hasUserEdits:true})-------------> check
        this.props.dispatch(updateBook(this.state.formdata))//dispatch action to update the book

        
    }

    deletePost = () =>{
        this.props.dispatch(deleteBook(this.props.match.params.id))
    }

    componentDidUpdate(prevProps){
        console.log('prevProps',prevProps)
        if(!this.state.hasUserEdits){
            this.setState({
                formdata:{...this.props.books.book},
                hasUserEdits:true

            })
        
        }
        console.log(this.state)
    }

    componentWillUnmount(){
        this.props.dispatch(clearBook());
    }

    render() {
    
        console.log('props--->',this.props)
        return (
            <div className="rl_container article">
                {
                    this.props.books.updateBook ? 
                                <div className="edit_confirm">post updated,  
                                <Link to={`/books/${this.props.books.book._id}`} > Click Here to see your post</Link>
                                </div>

                                : null
                }

                {
                    this.props.books.postDeleted ? 
                                <div className="red_tag">Post Deleted!
                                {setTimeout(()=>(this.props.history.push('/user/user-reviews')), 10000)}
                                </div>
                                :null
                }
            
            <form onSubmit={this.submitForm}>

                <h2>Edit Review</h2>

                <div className="form_element">
                    <input type="text"
                        placeholder="Enter Name" 
                        value={this.state.formdata.name || ''}
                        onChange={(event)=>this.handleInput(event,'name')}
                    />
                </div>


                <div className="form_element">
                    <input type="text"
                        placeholder="Enter Author" 
                        value={this.state.formdata.author || ''}
                        onChange={(event)=>this.handleInput(event,'author')}
                    />
                </div>

                <textarea 
                    value={this.state.formdata.review || ''} 
                    onChange={(event)=>this.handleInput(event,'review')} />


                <div className="form_element">
                    <input type="number"
                        placeholder="Number of Pages" 
                        value={this.state.formdata.pages || ''}
                        onChange={(event)=>this.handleInput(event,'pages')}
                    />
                </div>

                <div className="form_element">
                <select value={this.state.formdata.rating || ''} 
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
                        value={this.state.formdata.price || ''}
                        onChange={(event)=>this.handleInput(event,'price')}
                    />
                </div>

                <button type="Submit">Edit Review</button>
                <div className="delete_post">
                    <div className="button" onClick={this.deletePost}>Delete Review</div>
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





