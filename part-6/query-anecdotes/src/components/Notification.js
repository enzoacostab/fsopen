import { useNotiValue } from "../notificationContext"

const Notification = () => {
  const noti = useNotiValue()
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5,
    display: noti ? '' : 'none'
  }

  return (
    <div style={style}>
      {noti}
    </div>
  )
}

export default Notification
