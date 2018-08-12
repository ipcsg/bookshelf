import React from 'react';
import { Link } from 'react-router-dom';
import FontAwesome from 'react-fontawesome';

const SidenavItems = (props)=>{

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
            restricted:false
        },
        {
            type:'navItem',
            icon:'file-text-o',
            text:'Add Admins',
            link:'/user/register',
            restricted:false
        },
        {
            type:'navItem',
            icon:'file-text-o',
            text:'Login',
            link:'/login',
            restricted:false
        },
        {
            type:'navItem',
            icon:'file-text-o',
            text:'My Reviews',
            link:'/user/user-reviews',
            restricted:false
        },
        {
            type:'navItem',
            icon:'file-text-o',
            text:'Add Reviews',
            link:'/user/add',
            restricted:false
        },
        {
            type:'navItem',
            icon:'file-text-o',
            text:'Logout',
            link:'/user/logout',
            restricted:false
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

        {
            return items.map((item,i)=>{ // DON'T FORGET TO USE "return" BEFORE map function
            // console.log(item.text);
            return element(item,i);
            
                
            
        })
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
    );
};

export default SidenavItems;