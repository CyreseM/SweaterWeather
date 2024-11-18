import React, { useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLock, faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { Link, useNavigate } from 'react-router-dom'
const SignIn = () => {
  const navigate = useNavigate()
  
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    try{
      const response = await fetch(`http://localhost:3500/users`)
      const users  = await response.json(); // Extract the "users" array from the response
      console.log(users)
      const formData = new FormData(e.target); // Extract form data
      const email = formData.get('email'); // Get the submitted username
      const password = formData.get('password'); // Get the submitted password
      
      const matchingUser = users.find(
        (user) => user.email === email && user.password === password
      );
      if (matchingUser) {
           console.log('Login successful!', matchingUser);
            navigate('home')
            } else {
            
            console.error('Invalid username or password', matchingUser);
           
        } 
  
    }catch (error) {
         console.error('Error fetching users:', error);
    
  }

}

  
  return (
    <form onSubmit={handleSubmit} >
      <h2>Sign in to your Account</h2>
      <hr />
      <div className='signin-input'>
         <div><FontAwesomeIcon icon={faEnvelope}/> </div>
         <input type="email" placeholder='Email' name="email" required/>
      </div>
      <div className='signin-input'>
        <div><FontAwesomeIcon icon={faLock}/> </div>
        <input type="password" placeholder='Password' name='password' required/>
      </div>

      <button type='submit'>Submit</button>
      <p>Not registered yet? <Link to="/signup" >Create an account</Link></p>
    </form>
  )
}

export default SignIn
