import React, {useState} from 'react'
import {Redirect} from 'react-router-dom'
import Layout from '../core/Layout'
import {signin, authenticate} from '../auth'

const Signin = () => {

    const [values, setValues] = useState({
        email: 'ravikesh@gmail.com',
        password: '12345678',
        error: '',
        loading: false,
        redirectToReferrer: false 
    })

    const {email, password, loading, error, redirectToReferrer} = values

    const handleChange = name => event => {
        setValues({...values, error: false, [name]: event.target.value})
    }



    const clickSubmit = event => {
        event.preventDefault()
        setValues({...values, error: false, loading: true})
        signin({email, password})
        .then(data => {
            if(data.error ) {
                setValues({...values, error: true, loading: false})
            } else {
               authenticate(data, () => {
                setValues({
                    ...values, redirectToReferrer: true, 
                })
               })
            }
        })
    }

    const signUpForm = () => (
        <form>
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

    const showLoading = () => {
        return (
            loading && <div className="alert alert-info" >
                <h2>Loading...</h2>
            </div>
        )
    }

    const redirectUser = () => {
        if(redirectToReferrer) {
            return <Redirect to="/" ></Redirect>
        }
    }
    const showError = () => {
        return (
            <div className="alert alert-danger" style={{display: error ? '' : 'none'}}>
                Username and password doesn't match, Please check details
            </div>
        )
    }

    return (
        <Layout title="Signin" description="Signin to Node React app" className="container col-md-8 offset-md-2">
            {showLoading()}
            {showError()}
            {signUpForm()}
            {redirectUser()}
            {/* {JSON.stringify(values)} */}
        </Layout>
    )
}

export default Signin;