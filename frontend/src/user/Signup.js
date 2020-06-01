import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import Layout from '../core/Layout'
import {signup} from '../auth'

const Signup = () => {

    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
        error: '',
        success: false
    })

    const {name, email, password, success, error} = values

    const handleChange = name => event => {
        setValues({...values, error: false, [name]: event.target.value})
    }



    const clickSubmit = event => {
        event.preventDefault()
        setValues({...values, error: false})
        signup({name, email, password})
        .then(data => {
            if(!name || !email || !password) {
                setValues({...values, error: true, success: false})
            } else {
                setValues({
                    ...values, name: '', email: '' , password: '', error: '', success: true
                })
            }
        })
    }

    const signUpForm = () => (
        <form>
            <div className="form-group">
                <label className="text-muted">Name</label>
                <input onChange={handleChange('name')} type="text" value={name} className="form-control" />
            </div>

            <div className="form-group">
                <label className="text-muted">Email</label>
                <input onChange={handleChange('email')} type="email" value={email} className="form-control" />
            </div>

            <div className="form-group">
                <label className="text-muted">Password</label>
                <input onChange={handleChange('password')} type="password" value={password} className="form-control" />
            </div>

            <button onClick={clickSubmit} className="btn btn-primary">Sumbit</button>
            
        </form>
    )

    const showSuccess = () => {
        return (
            <div className="alert alert-info" style={{display: success ? '' : 'none'}}>
                New account created please <Link to="/signin">Signin</Link>
            </div>
        )
    }
    const showError = () => {
        return (
            <div className="alert alert-danger" style={{display: error ? '' : 'none'}}>
                Something went wrong, Please check details
            </div>
        )
    }

    return (
        <Layout title="Signup" description="Signup to Node React app" className="container col-md-8 offset-md-2">
            {showSuccess()}
            {showError()}
            {signUpForm()}
            {/* {JSON.stringify(values)} */}
        </Layout>
    )
}

export default Signup;