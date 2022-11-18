import React from 'react'
import Layout from '../components/Layout'

const Login = () => {
    return (
        <Layout> 
            <div className = 'header'>
                <div className = 'gen'>
                    <a href="/">CAReta</a>
                </div>
                <div className = 'dop'>
                    <a href="/register">Registration</a>
                </div>
            </div>
            <div className = "form-container">
                <div className="form-groups">
                    <form className="form">
                        <h3 className="form-title">Login</h3>
                        <div className="form-group">
                            <label htmlFor="email" className="input_title">E-mail</label>
                            <input type = "email" className="input" id="email" required></input>
                        </div>

                        <div className="form-group">
                            <label htmlFor="password"className="input_title">Password</label>
                            <input type = "password" className="input" id="password" required></input>
                        </div>

                        <div className="form-group">
                            <button className = "btn">Login</button>
                        </div>

                        <div className="form-dop">
                            <p>Don't have an account?</p>
                            <a href='/register'>Click here for register!</a>
                        </div>
                    </form>
                </div>
            </div>
        </Layout>
    )
}

export default Login