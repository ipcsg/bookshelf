import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUsers } from '../../actions/index.js';
import User from '../../components/Admin/index.js';

class Register extends Component {

    state={
        name:'',
        lastname:'',
        email:'',
        password:'',
        error:''
    }

    componentDidMount(){
        this.props.dispatch(getUsers());
    }

    handleInputEmail = (event)=>{

    }

    handleInputPassword = (event)=>{

    }

    handleInputName = (event)=>{

    }

    handleInputLastname = (event)=>{

    }

    submitForm = (e) =>{
        e.preventDefault();
    }

    showUsers = (user) =>(
        user.users ? 
        user.users.map((user,i)=>(
            <tr key={i}>
                <td>{user.name}</td>
                <td>{user.lastname}</td>
                <td>{user.email}</td>
            </tr>
        ))
       :null
    )


    

    render() {
        console.log(this.props)
        let user = this.props.user;
        //console.log(user)
        return (
            <div className="rl_container">

                <form onSubmit={this.submitForm}>
                <h2>Add User</h2>
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
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(Register);