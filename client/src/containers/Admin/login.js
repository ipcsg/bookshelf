import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loginUser } from '../../actions';

class Login extends Component {

    state = {
        email:'',
        password:'',
        error:'',
        success:false
    }
    handleInputEmail = (event)=>{

        this.setState({
            email:event.target.value
        })

    } 

    handleInputPassword = (event)=>{
            this.setState({password:event.target.value})

    }

    submitForm=(e)=>{
        e.preventDefault();
        // console.log(this.state)
        this.props.dispatch(loginUser(this.state));

        
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.user.login.isAuth){
            this.props.history.push('/user')//redirects to /user
        }
    }

    render() {

        

        return (
            <div className="rl_container">
                <form onSubmit={this.submitForm}>
                    <h2>Login Here</h2>
                    <div className="form_element">
                        <input 
                            type="email" 
                            placeholder="enter your email" 
                            value={this.state.email} 
                            onChange={this.handleInputEmail}
                        />

                    </div>

                    <div className="form_element">
                        <input 
                            type="password" 
                            placeholder="enter your password"
                            value={this.state.password} 
                            onChange={this.handleInputPassword}
                        />

                    </div>

                    <button type="submit">Log in</button>
                    <div className="error">
                    {
                        this.props.user.login ?
                            <div>
                                {this.props.user.login.message}
                            </div>
                        :null
                    }
                    </div>
                </form>
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

export default connect(mapStateToProps)(Login)