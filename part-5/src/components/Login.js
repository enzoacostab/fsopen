import propTypes from 'prop-types'

const Login = ({hand,user,pass,msg}) =>{
  return <div>
    <h2>Log in to application</h2>
    <h3 id='msg'>{msg}</h3>
    <form onSubmit={hand}>
      <input id='username' type='text' placeholder='username' value={user.val} onChange={({target}) => user.set(target.value)}/>
      <input id='password' type='password' placeholder='password' value={pass.val} onChange={({target}) => pass.set(target.value)}/>
      <input id='login' value='login' type='submit'/>
    </form>
  </div>
}

Login.propTypes = {
  hand: propTypes.func.isRequired,
  user: propTypes.object.isRequired,
  pass: propTypes.object.isRequired,
  msg: propTypes.string.isRequired
}

export default Login