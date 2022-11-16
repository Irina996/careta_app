import React from 'react'
import Layout from '../components/Layout'

const Register = () => {
    return (
        <Layout>
            <div className = 'header'>
                <div className = 'gen'>
                    <a href="/">CAReta</a>
                </div>
                <div className = 'dop'>
                    <a href="/login">Login</a>
                </div>
            </div>
            <div className = "form-container">
                <div className="form-groups">
                    <form className="form">
                        <h3 className="form-title">Registration</h3>
                        <div className="form-group">
                            <label htmlFor="username" className="input_title">Username</label>
                            <input type = "text" className="input" id="username" required></input>
                        </div>

                        <div className="form-group">
                            <label htmlFor="realname"className="input_title">Name and surname</label>
                            <input type = "text" className="input" id="realname" required></input>
                        </div>
                        <div className="form-group">
                            <label htmlFor="address" className="input_title">Address</label>
                            <input type = "text" className="input" id="address" required></input>
                        </div>

                        <div className="form-group">
                            <label htmlFor="email" className="input_title">E-mail</label>
                            <input type = "email" className="input" id="email" required></input>
                        </div>

                        <div className="form-group">
                            <label htmlFor="password"className="input_title">Password</label>
                            <input type = "password" className="input" id="password" required></input>
                        </div>


                        <div className="form-group">
                            <button className = "btn">Register</button>
                        </div>

                        <div className="form-dop">
                            <p>Are you have an account?</p>
                            <a href='/login'>Click here for login!</a>
                        </div>
                    </form>
                </div>
            </div>
        </Layout>
    )
}

export default Register