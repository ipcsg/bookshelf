import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { getUsers, userRegister } from '../../actions/index.js';
import User from '../../components/Admin/index.js';

class Register extends PureComponent {

    state={
        name:'',
        lastname:'',
        email:'',
        password:'',
        error:'',
        formSubmitted:false // checks whether the form is submitted
    }

    componentDidMount(){
        this.props.dispatch(getUsers());
    }

    handleInputName = (event)=>{

        this.setState({
            name:event.target.value
        })

    }

    handleInputLastname = (event)=>{
        this.setState({
            lastname:event.target.value
        })
    }

    handleInputEmail = (event)=>{

        this.setState({
            email:event.target.value
        })

    }

    handleInputPassword = (event)=>{
        this.setState({
            password:event.target.value
        })
    }


    submitForm = (e) =>{
        e.preventDefault();
        

        this.props.dispatch(userRegister({
            email:this.state.email,
            password:this.state.password,
            name:this.state.name,
            lastname:this.state.lastname
        }, this.props.user.users));

        
            this.setState({formSubmitted:true});
        
        // if(this.props.user.success){
        // this.setState({
        //     name:'',
        //     lastname:'',
        //     email:'',
        //     password:'',
        //     error:''
        // })
        // }

    }

    showUsers = (user) =>(
        (user.users && user.users !== undefined) ? 
        user.users.map((user,i)=>(
            <tr key={i}>
                <td>{user.name}</td>
                <td>{user.lastname}</td>
                <td>{user.email}</td>
            </tr>
        ))
       :null
    )

    // static getDerivedStateFromProps(nextProps,prevState){
    //     if(nextProps.user.register === false){
    //         return { error: 'Error! Try again!'}
    //     }

    //     return {error:null}
    // }

    componentDidUpdate = (prevProps) => {
      
        console.log(this.props.user);
        console.log(prevProps.user);
        if(this.props.user.register === false){
            this.setState({
                error:'Error, please try again!'
            })
        }
        else if(this.state.formSubmitted && this.props.user.register === true){
            this.setState({
                name:'',
                lastname:'',
                email:'',
                password:'',
                error:'',
                formSubmitted:false
            })
        }
        console.log('submitted->',this.state.formSubmitted,'register->',this.props.user.register)
        // if(nextProps.user.register === false){
        //     this.setState({
        //         error:'Error, please try again!'
        //     })
        // }
        // else{
        //     this.setState({
                 
        //         name:'',
        //         lastname:'',
        //         email:'',
        //         password:'',
        //         error:''
            
        //     })
        // }
        

    };
    


    

    render() {
        
        let user = this.props.user;
        //console.log(user)
        return (
            <div className="rl_container">

                <form onSubmit={this.submitForm}>
                    <h2>Add User</h2>
                    <div className="form_element">
                        <input 
                                type="text"
                                placeholder="Enter your name"
                                value={this.state.name}
                                onChange={this.handleInputName}
                        />
                    </div>

                    <div className="form_element">
                        <input 
                                type="text"
                                placeholder="Enter your lastname"
                                value={this.state.lastname}
                                onChange={this.handleInputLastname}
                        />
                    </div>

                    <div className="form_element">
                        <input 
                                type="email"
                                placeholder="Enter your email"
                                value={this.state.email}
                                onChange={this.handleInputEmail}
                        />
                    </div>

                    <div className="form_element">
                        <input 
                                type="password"
                                placeholder="Enter your password"
                                value={this.state.password}
                                onChange={this.handleInputPassword}
                        />
                    </div>

                    <button type="submit">Add User</button>
                    <div className="error">
                        {this.state.error}
                    </div>
                    
                </form>

                <div className="current_users">
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Lastname</th>
                            <th>email</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            // users !== undefined ? this.showUsers(users)//otherwise this tries to read an undefined object
                            // :null
                            this.showUsers(user)
                        } 
                    </tbody>
                </table>
                </div>
                
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    console.log(state)
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(Register);