import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUserPosts } from '../../actions';
import moment from 'moment-js';
import { Link } from 'react-router-dom';

class UserPosts extends Component {

    componentDidMount(){

        this.props.dispatch(getUserPosts(this.props.user.login.id))

    }   

    showUserPosts=(user)=>{// or use () instead of {} for returning the data. Otherwise use return before user.userPosts

        return user.userPosts ? 

            user.userPosts.map((item,index) =>(
                <tr key={item._id}>
                    <td><Link to={`/user/edit-post?${item._id}`}>{item.name}</Link></td>
                    <td>{item.author}</td>
                    <td>{moment(item.createdAt).format("MM/DD/YYYY")}</td>
                    {console.log(item)}
                </tr>
            ))


        :null

    }

    render() {

        console.log(this.props.user.userPosts)
        let user = this.props.user;
        return (
            <div className="User Posts">
                <h4>Your Reviews</h4>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Author</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.showUserPosts(user)}
                    </tbody>
                </table>
                {/* {this.props.user.userPosts.map((post)=>post)} */}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(UserPosts);