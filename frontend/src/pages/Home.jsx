import React from 'react'
import Layout from '../components/Layout'

const Home = () => {
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
            
            
        </Layout>
    )
}

export default Home