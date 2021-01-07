import React, { useState } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { signin, authenticate, isAuthenticated } from "../../auth"
import Layout from "../../components/Layout"

const Signin = () => {

    const [values, setValues] = useState({
        email: '',
        password: '',
        error: '',
        loading: false,
        redirectToReferrer: false,
        buttonText: 'Submit'
    })

    const { email, password, error, loading, redirectToReferrer } = values
    const { user } = isAuthenticated()

    const handleChange = (name) => event => {
        setValues({...values, error: false, [name]: event.target.value})
    }

    const clickSubmit = (event) => {
        event.preventDefault()
        setValues({...values, error: false, loading: true, buttonText: 'Submitting' })

        signin({email, password})
        .then(data => {
            if (data.error) {
                setValues({...values, error: data.error, loading: false, buttonText: 'Submit' })
            }
            else {
                authenticate(data, () => {
                    setValues({
                        ...values,
                        redirectToReferrer: true,
                        buttonText: 'Submitted' 
                    })
                })
            }
        })
    }

    const signInForm = () => (
        <form>
            <div className="form-group">
                <label className="text-muted">Email</label>
                <input onChange={handleChange('email')} type="email" className="form-control" value={email} />
            </div>
            <div className="form-group">
                <label className="text-muted">Password</label>
                <input onChange={handleChange('password')} type="password" className="form-control" value={password} />
            </div>
            <button onClick={clickSubmit} className="btn btn-primary">Submit</button>
        </form>
    )
    
    const showError = () => (
        <div className="alert alert-danger" style={{display: error ? '' : 'none'}}>
            {error}
        </div>
    )

    const showLoading = () => (
        loading && (
            <div className="alert alert-info">
                <h2>Loading...</h2>
            </div>)
    )

    const redirectUser = () => {
        if (redirectToReferrer) {
            if (user) {
                return <Redirect to="/dashboard" />
            }
            else {
                return <Redirect to="/dashboard" />
            }
        }
        if (isAuthenticated()) {
            return <Redirect to="/" />
        }
    }

    return (
        <Layout
            title="Signin Page" 
            className="container col-md-6 offset-md-3"
        >
            {showLoading()}
            {showError()}
            {signInForm()}
            {redirectUser()}
            <br />
        </Layout>
    )
}

export default Signin
