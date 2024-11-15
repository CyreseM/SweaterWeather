import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons'

const SignIn = () => {
  return (
    <form>
      <h2>Sign in to your Account</h2>
      <hr />
      <div className='signin-input'>
         <div><FontAwesomeIcon icon={faUser}/> </div>
         <input type="text" />
      </div>
      <div className='signin-input'>
        <div><FontAwesomeIcon icon={faLock}/> </div>
        <input type="text" /><input type="password" />
      </div>
      <button type='submit'>Submit</button>
    </form>
  )
}

export default SignIn
