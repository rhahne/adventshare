import React, {Component} from 'react'
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

export default class Navigation extends Component {
    render() {
        return (
            <div>
                {this.props.loggedIn
                    ? <NavbarAuth {...this.props}/>
                    : <NavbarNonAuth {...this.props}/>}
            </div>
        )
    }
}

function NavbarAuth(props) {
    return (
        <nav
            className="navbar is-transparent"
            role="navigation"
            aria-label="main navigation"
            style={{
            borderBottom: "solid 1px hsl(0, 0%, 96%)"
        }}>
            <div className="container">
                <div className="navbar-brand">
                    <Link
                        className="navbar-item"
                        to="/"
                        style={{
                        color: 'white'
                    }}>
                        <img
                            src="/img/compass.png"
                            alt="Adventshare"
                            height="28"
                            style={{
                            marginRight: "10px"
                        }}/>
                        <h1 className="title is-5">Adventshare</h1>
                    </Link>
                    <span
                        role="button"
                        className="navbar-burger burger"
                        aria-label="menu"
                        aria-expanded="false">
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                    </span>
                </div>

                <div id="navMenu" className="navbar-menu">
                    <div className="navbar-start">
                        {/* <Link
                            className="navbar-item has-text-link"
                            to="/"
                            >
                            Home
                        </Link> */}
                        <div className="navbar-item">
                            <div className="buttons">
                                <div
                                    className="button is-light"
                                    style={{
                                    
                                }}
                                    onClick={() => {
                                    props.toggleModal('search')
                                }}>
                                    <FontAwesomeIcon
                                        style={{
                                        marginRight: "5px"
                                    }}
                                        icon="search"/>
                                    Search
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="navbar-end">
                        <Link className="navbar-item" to="/users/account">
                            Account
                        </Link>

                        <div className="navbar-item">
                            <div className="buttons">
                                <Link className="button is-light" to="/users/logout">
                                    Log out
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}

function NavbarNonAuth(props) {
    return (
        <nav
            className="navbar is-transparent"
            role="navigation"
            aria-label="main navigation"
            style={{
            borderBottom: "solid 1px hsl(0, 0%, 96%)"
        }}>
            <div className="container">
                <div className="navbar-brand">
                    <Link className="navbar-item has-text-link" to="/">
                        <img
                            src="/img/compass.png"
                            style={{
                            marginRight: "10px"
                        }}
                            alt="Adventshare"
                            height="28"/>
                        <h1 className="title is-5">Adventshare</h1>
                    </Link>
                    <span
                        role="button"
                        className="navbar-burger burger"
                        aria-label="menu"
                        aria-expanded="false"
                        data-target="navMenu">
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                    </span>
                </div>

                <div id="navMenu" className="navbar-menu">
                    <div className="navbar-start">
                        {/* <Link
                            className="navbar-item has-text-link"
                            to="/"
                            >
                            Home
                        </Link> */}
                        <div className="navbar-item">
                            <div className="buttons">
                                <div
                                    className="button is-light"
                                    style={{
                                    
                                }}
                                    onClick={() => {
                                    props.toggleModal('search')
                                }}>
                                    <FontAwesomeIcon
                                        style={{
                                        marginRight: "5px"
                                    }}
                                        icon="search"/>
                                    Search
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="navbar-end">
                        <div className="navbar-item">
                            <div className="buttons">
                                <div
                                    className="button is-light"
                                    onClick={() => {
                                    props.toggleModal('signup')
                                }}>
                                    Sign up
                                </div>
                                <div
                                    className="button is-info"
                                    onClick={() => {
                                    props.toggleModal('login')
                                }}>
                                    Log in
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}

// NavBar Burger
document.addEventListener('DOMContentLoaded', () => {
    // Get all "navbar-burger" elements
    const $navbarBurgers = Array
        .prototype
        .slice
        .call(document.querySelectorAll('.navbar-burger'), 0);

    // Check if there are any navbar burgers
    if ($navbarBurgers.length > 0) {

        // Add a click event on each of them
        $navbarBurgers.forEach(el => {
            el.addEventListener('click', () => {

                // Get the target from the "data-target" attribute
                const target = el.dataset.target;
                const $target = document.getElementById(target);

                // Toggle the "is-active" class on both the "navbar-burger" and the
                // "navbar-menu"
                el
                    .classList
                    .toggle('is-active');
                $target
                    .classList
                    .toggle('is-active');
            });
        });
    }
});