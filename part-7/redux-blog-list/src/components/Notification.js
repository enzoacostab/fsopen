import { Alert } from "react-bootstrap"
import { useSelector } from "react-redux"

const Notification = () => {
  const {msg, cls} = useSelector(state => state.notification)
  
  return (
    <Alert variant={cls==='err' ? 'danger' : 'success'} id="msg" className={cls} style={{display: !cls && 'none'}}>
      {msg}
    </Alert>
  )
}

export default Notification