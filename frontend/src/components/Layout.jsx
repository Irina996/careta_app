import React from 'react'

const Layout = (props) => {
    return (
        <>
            <div className = 'main'>
                {props.children}
            </div>

            <div className = 'footer'>

            </div>
        </>
    )
}

export default Layout