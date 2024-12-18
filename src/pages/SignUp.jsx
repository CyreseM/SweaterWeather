import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faUser, faEnvelope} from '@fortawesome/free-solid-svg-icons';
import { Link , useNavigate} from 'react-router-dom';
const SignUp = () => {
  const navigate = useNavigate(); // Use the navigate hook from react-router-dom to navigate to other routes
  const [userNotExist, setUserNotExist] = useState(); 
  const [matchPassword, setMatchPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    try{
      const response = await fetch(`http://localhost:3500/users`)
      const users  = await response.json(); // Extract the "users" array from the response
      const formData = new FormData(e.target); // Extract form data
      const email = formData.get('email'); // Get the submitted username
      const password = formData.get('password'); // Get the submitted password
      const repPassword = formData.get('repeatpassword');  
      // Find a matching user
      const matchingUser = users.every(
        (user) => user.email === email
      );
  
      if (matchingUser===false && password === repPassword) {
        password===repPassword?setMatchPassword(true):setMatchPassword(false);
        matchingUser?setUserNotExist(false): setUserNotExist(true)
        navigate('home') // Navigate to the home page upon successful signup
        
      } else {
        console.error('Invalid username or password');
        password===repPassword?setMatchPassword(true):setMatchPassword(false);
        matchingUser?setUserNotExist(false): setUserNotExist(true)
       // Set the userExist state to true to display an error message
      }
    }catch (err) {
      console.error('Error fetching users:', err); // Log fetch errors
      alert('Failed to sign up. Please try again later.') // Show an alert message for failed signup
    }

  
    } 

  
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
          <input type="password" placeholder='Password' name='password' required/>
        </div>

      </div>

      <div className='signin-input'>
          <div><FontAwesomeIcon icon={faLock}/> </div>
          <input type="password" placeholder='Repeat Password' name='repeatpassword' required/>
        </div>
       
      {
        userNotExist===false && (
          <p style={{color:"red", marginBottom:"20px"}}>User already exists</p>
        ) 
      }
      {
        userNotExist===true && matchPassword===false &&(
          <p style={{color:"red", marginBottom:"20px"}}>Passwords do not match</p>
        )
      }
      
      <button type='submit'>Submit</button>
      <p>Already have an account? <Link to="/signin" >Sign In</Link></p>
 
  </form>
    
  )
}

export default SignUp
