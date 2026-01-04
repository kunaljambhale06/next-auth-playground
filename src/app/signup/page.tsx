import React, { useState } from 'react'

export default function SignupPage() {

  const [user, setUser] = useState({
    email: "",
    password: "",
    username: ""
  })

  const [buttonDisabled, setButtonDisabled] = useState(false)
  const [loading, setLoading] = useState(false)
  
  return (
    <div>SignUp Page</div>
  )
}

