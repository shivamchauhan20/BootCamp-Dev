import React, { Component } from 'react';
import { Link } from "react-router-dom";
class Header extends Component {
    state = {}
    render() {
        return (
            <div className="header">
                <div className="feed">Feed</div>
                <div className="search">Search</div>

                <i className="fa fa-plus" aria-hidden="true">
                    <Link to="/home/create"></Link>
                </i>
            </div>
        );
    }
}

export default Header;