import { useReducer, createContext, useContext } from "react"

const notificationReducer = (state, action) => {
    switch (action.type) {
      case "CHANGE":
          return action.payload
      default:
          return state
    }
  }
  
  const notificationContext = createContext()
  
  export const useNotiValue = () =>{
    const x = useContext(notificationContext)
    return x[0]
  }

  export const useNotiDispatch = () =>{
    const x = useContext(notificationContext)
    return x[1]
  }

  export const NotificationContextProvider = (props) => {
    const [noti, notificationDispatch] = useReducer(notificationReducer, '')
  
    return (
      <notificationContext.Provider value={[noti, notificationDispatch] }>
        {props.children}
      </notificationContext.Provider>
    )
  }
  
  export default notificationContext