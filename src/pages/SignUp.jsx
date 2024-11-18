import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faUser, faEnvelope} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
const SignUp = () => {
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    
    // Fetch data from the API
    try {
      const response = await fetch('http://localhost:3500/users'); // Fetch user data
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`); // Handle fetch errors
      }
      
      const { users } = await response.json(); // Extract the "users" array from the response
      const formData = new FormData(e.target); // Extract form data
      const email = formData.get('email'); // Get the submitted username
      const password = formData.get('password'); // Get the submitted password
      
      // Find a matching user
      const matchingUser = users.find(
        (user) => user.email === email
      );
  
      if (matchingUser) {
        console.log('Login successful!', matchingUser);
        // Additional logic for successful login
      } else {
        console.error('Invalid username or password');
        // Additional logic for failed login
      }
    } catch (error) {
      console.error('Error fetching users:', error); // Log fetch errors
    }
  };
  
  return (
    <form onSubmit={handleSubmit} >
      <h2>Create an account</h2>
      <hr />
      <div className='signin-input'>
        <div><FontAwesomeIcon icon={faUser}/> </div>
        <input type="text" placeholder='Username' name="username" required/>
      </div>

      <div style={{display:"flex", gap:"20px"}}>
        <div className='signin-input'>
          <div><FontAwesomeIcon icon={faEnvelope}/> </div>
          <input type="email"  name="email" placeholder='Email 'required/>
        </div>
        <div className='signin-input'>
          <div><FontAwesomeIcon icon={faLock}/> </div>
          <input type="password" placeholder='Repeat Password' name='repeatpassword' required/>
        </div>
      </div>

      <div className='signin-input'>
        <div><FontAwesomeIcon icon={faLock}/> </div>
        <input type="password" placeholder='Password' name='password' required/>
      </div>
    
      <button type='submit'>Submit</button>
      <p>Already have an account? <Link to="/signin" >Sign In</Link></p>
  </form>
  )
}

export default SignUp
