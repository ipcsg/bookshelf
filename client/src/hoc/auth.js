import React, { Component } from 'react';
import { connect } from 'react-redux';
import { auth } from '../actions';

export default function(ComposedClass,reload){

    class AuthenticationCheck extends Component{

        state ={
            loading:true
        }

        componentDidMount(){
            this.props.dispatch(auth())
        }

        componentWillReceiveProps(nextProps){
            this.setState({loading:false})
            console.log(nextProps)

            if(nextProps.user.login.isAuth){

            }else{

            }
        }

        render(){
            if(this.state.loading){
                return <div className="loader">Loading...</div>
            }

            return(

                <ComposedClass {...this.props} user="" />//all the props received from home route in routes.js
                
            )
        
        }

    }

    const mapStateToProps = (state) => {
        return {
            user: state.user
        }
    }

    return connect(mapStateToProps)(AuthenticationCheck)

}