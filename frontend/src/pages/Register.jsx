import React from 'react'

function Register() {
  return (
    <>
    <div style={{display:"flex", alignItems:"center", justifyContent:"center"}} >

        <form action="http://localhost:3000/register" method="post">
        <input type="text" name='username' placeholder='Enter username' />
        <input type="password" name='password' placeholder='Enter password' />

        <a href="login">Already have an account?</a>

        <button type='submit'>Register</button>

        </form>



    </div>
    </>
  )
}

export default Register