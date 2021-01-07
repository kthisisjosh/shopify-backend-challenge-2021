import React, { useState } from 'react'
import Layout from '../../components/Layout'
import { signup } from '../../auth'

const Signup = () => {

    const [values, setValues] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        error: '',
        buttonText: 'Submit'
    })

    const {firstName, lastName, email, password, error, buttonText} = values

    const handleChange = (name) => event => {
        setValues({...values, error: false, [name]: event.target.value})
    }

    const clickSubmit = (event) => {
        event.preventDefault()
        setValues({...values, error: false, buttonText: 'Submitting' })

        signup({firstName, lastName, email, password})
        .then(data => {
            if (data.error) {
                setValues({...values, error: data.error, success: false, buttonText: 'Submit' })
            }
            else {
                setValues({...values,
                            firstName: '',
                            lastName: '',
                            email: '',
                            password: '',
                            error: '',
                            success: true,
                            buttonText: 'Submitted'  })
            }
        })
        .catch()
    }

    const signUpForm = () => (
        <form>
            <div className="form-group">
                <label className="text-muted">First Name</label>
                <input onChange={handleChange('firstName')} type="text" className="form-control" value={firstName} />
            </div>
            <div className="form-group">
                <label className="text-muted">Last Name</label>
                <input onChange={handleChange('lastName')} type="text" className="form-control" value={lastName} />
            </div>
            <div className="form-group">
                <label className="text-muted">Email</label>
                <input onChange={handleChange('email')} type="email" className="form-control" value={email} />
            </div>
            <div className="form-group">
                <label className="text-muted">Password</label>
                <input onChange={handleChange('password')} type="password" className="form-control" value={password} />
            </div>
            <button className="btn btn-primary" onClick={clickSubmit}>
                {buttonText}
            </button>
        </form>
    )
    
    const showError = () => (
        <div className="alert alert-danger" style={{display: error ? '' : 'none'}}>
            {error}
        </div>
    )

    return (
        <Layout
            title="Signup Page" 
            className="container col-md-6 offset-md-3"
        >
            {showError()}
            {signUpForm()}
            <br />
        </Layout>
    )
}

export default Signup
