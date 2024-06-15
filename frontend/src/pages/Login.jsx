import React from 'react'

function Login() {
  return (
    <div>
        <form action="http://localhost:3000/login" method='post'>
        
        <input type="text" placeholder='Enter username' name='username' />
        <input type="text" placeholder='Enter password' name='password' />

        <a href="register">New Here?</a>
        <br />
        <button type='submit'>Log in</button>
        
        </form>
    </div>
  )
}

export default Login