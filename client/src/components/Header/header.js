//header for layout
import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';
import {Link} from 'react-router-dom';
import Nav from './Sidenav/sidenav';

class Header extends Component {

    state = {
        showNav:false
    }

    onHideNav = ()=>{
        this.setState({
            showNav:false
        })
    }

    render() {
        return (
            <header>

                {/*Navigation*/}
                <div className="open_nav">
                    <FontAwesome 
                        onClick={()=>this.setState({showNav:true})}
                        name="bars" 
                        style={{
                            color:"#fff",
                            padding:"10px",
                            cursor:"pointer"
                        }}
                    />
                </div>

                <Nav showNav={this.state.showNav} 
                     onHideNav={this.onHideNav}/>

                {/*logo*/}
                <Link to="/" className="logo">
                    Book Shelf
                </Link>
            </header>
        );
    }
}

export default Header;