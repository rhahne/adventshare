import React, {Component} from 'react'
import {Link} from "react-router-dom";

export default class Navigation extends Component {
    render() {
        return (
            <div>
                {this.props.loggedIn
                    ? <NavbarAuth/>
                    : <NavbarNonAuth/>}
            </div>
        )
    }
}

function NavbarAuth() {
    return (
        <nav className="navbar is-dark" role="navigation" aria-label="main navigation">
            <div className="container">
                <div className="navbar-brand">
                    <Link
                        className="navbar-item"
                        to="/"
                        style={{
                        color: 'white'
                        }}>
                        <img src="/img/compass.png" alt="Adventshare" height="28"/>
                    </Link>
                    <Link
                        to=""
                        role="button"
                        className="navbar-burger burger"
                        aria-label="menu"
                        aria-expanded="false"
                        >
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                    </Link>
                </div>

                <div id="navMenu" className="navbar-menu">
                    <div className="navbar-start">
                        <Link
                            className="navbar-item"
                            to="/"
                            style={{
                            color: 'white'
                        }}>
                            Home
                        </Link>
                        <Link
                            className="navbar-item"
                            to="/search"
                            style={{
                            color: 'white'
                        }}>
                            Search
                        </Link>
                    </div>

                    <div className="navbar-end">
                        <Link className="navbar-item" to="/users/profile">
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

function NavbarNonAuth() {
    return (
        <nav className="navbar is-dark" role="navigation" aria-label="main navigation">
            <div className="container">
                <div className="navbar-brand">
                    <Link
                        className="navbar-item"
                        to="/"
                        style={{
                        color: 'white'
                    }}>
                        <img src="/img/compass.png" alt="Adventshare" height="28"/>
                    </Link>
                    <Link
                        to=""
                        role="button"
                        className="navbar-burger burger"
                        aria-label="menu"
                        aria-expanded="false"
                        data-target="navMenu">
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                    </Link>
                </div>

                <div id="navMenu" className="navbar-menu">
                    <div className="navbar-start">
                        <Link
                            className="navbar-item"
                            to="/"
                            style={{
                            color: 'white'
                        }}>
                            Home
                        </Link>
                        <Link
                            className="navbar-item"
                            to="/search"
                            style={{
                            color: 'white'
                        }}>
                            Search
                        </Link>
                    </div>

                    <div className="navbar-end">
                        <div className="navbar-item">
                            <div className="buttons">
                                <Link className="button is-light" to="/users/signup">
                                    Sign up
                                </Link>
                                <Link className="button is-info" to="/users/login">
                                    Log in
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}