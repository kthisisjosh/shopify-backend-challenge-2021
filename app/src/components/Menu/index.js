import React, {Fragment} from 'react'
import {Link, withRouter} from 'react-router-dom'
import {signout, isAuthenticated} from '../../auth'

const Menu = ({history}) => (
    <div>
        <ul className="nav nav-tabs bg-primary">
            <li className="nav-item">
                <Link className="nav-link" style={{color: "#FFFFFF"}} to="/">Home</Link>
            </li>

            {!isAuthenticated() && (
                <Fragment>
                    <li className="nav-item">
                        <Link className="nav-link" style={{color: "#FFFFFF"}} to="/signin">Sign In</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" style={{color: "#FFFFFF"}} to="/signup">Sign Up</Link>
                    </li>
                </Fragment>
            )}

            {isAuthenticated() && (
                <li className="nav-item">
                    <Link className="nav-link" style={{color: "#FFFFFF"}} to="/dashboard">Upload</Link>
                </li>
            )}

            {isAuthenticated() && (
                <li className="nav-item">
                    <span className="nav-link" style={{cursor: 'pointer', color: '#ffffff'}} 
                        onClick={() => signout(() => {
                            history.push('/')
                        })}>Sign Out
                    </span>
                </li>
            
            )}
        </ul> 
    </div>
)

export default withRouter(Menu)