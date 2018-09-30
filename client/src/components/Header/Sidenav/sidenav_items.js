import React from 'react';
import { Link } from 'react-router-dom';
import FontAwesome from 'react-fontawesome';
import { connect } from 'react-redux';

const SidenavItems = ({user})=>{// props were destructured here ... similar to {user} = props

    const items = [
        {
            type:'navItem',
            icon:'home',
            text:'Home',
            link:'/',
            restricted:false
        },
        {
            type:'navItem',
            icon:'file-text-o',
            text:'My Profile',
            link:'/user',
            restricted:true
        },
        {
            type:'navItem',
            icon:'file-text-o',
            text:'Add Admins',
            link:'/user/register',
            restricted:true
        },
        {
            type:'navItem',
            icon:'file-text-o',
            text:'Login',
            link:'/login',
            restricted:false,
            exclude:true //to exclude once logged in
        },
        {
            type:'navItem',
            icon:'file-text-o',
            text:'My Reviews',
            link:'/user/user-reviews',
            restricted:true
        },
        {
            type:'navItem',
            icon:'file-text-o',
            text:'Add Reviews',
            link:'/user/add',
            restricted:true
        },
        {
            type:'navItem',
            icon:'file-text-o',
            text:'Logout',
            link:'/user/logout',
            restricted:true
        }  
        
    ];

    // const item2=[0,1,2,3,4,5];

    const element = (item,i)=>(
        <div key={i} className={item.type}>
            <Link to={item.link}>
            <FontAwesome name={item.icon} />
            {item.text}
            </Link>
        </div>
    );

  

    //showItems as a function
    const showItems =()=>

        {   return user.login ?
                 items.map((item,i)=>{ // DON'T FORGET TO USE "return" BEFORE map function
                // console.log(item.text);
                if(user.login.isAuth) {
                    return !item.exclude ?
                    element(item,i)
                    :null
                }else{
                    return !item.restricted ?
                    element(item,i)
                    :null
                }
            })     
                :null
            // return element(item,i);
            
                
            
        
    }


    //showItems as a constant--------------- alternative
    // const showItems = items.map((item,i)=>{
    //         // console.log(item.text);
    //          return element(item,i);
    //         // return <div>{item.text}</div>
                
            
    //     })
        
   

    return(
        <div>
            {showItems()}
        </div>
    )
}

    const mapStateToProps = (state) => {
        return {
            user: state.user
        }
    }

export default connect(mapStateToProps)(SidenavItems)