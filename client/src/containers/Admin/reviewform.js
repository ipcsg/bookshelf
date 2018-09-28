import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateBook } from '../../actions';
import { Link } from 'react-router-dom';

class ReviewForm extends Component {
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
        hasUserEdits:false
        }
    } 
    
    //gFormdata = {...this.state.formdata};

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

    render() {
    
        console.log(this.state)
        return (
            <div className="rl_container article">

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
                    <div className="button">Delete Review</div>
                </div>
                
            </form>
           
        </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        books: state.books
    }
}

export default connect(mapStateToProps)(ReviewForm)