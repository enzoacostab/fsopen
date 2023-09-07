import { ListItemText, ListItem, List } from "@mui/material"
import { useContext } from "react"
import { diagnosesContext } from "../state"

interface Props {
    codes: string[]
}

const DiagnosisCodes = ({codes}: Props) =>{
    const diagnoses = useContext(diagnosesContext)

    const findName = (code: string) =>{
        return diagnoses?.find(diagnosis => diagnosis.code === code)?.name
    }

    return(
        <List>
        {codes.map(code =>
            <ListItem key={code}>
                <ListItemText style={{maxWidth: 300, display: "flex", textAlign:"right", justifyContent: "flex-end"}} secondary={`${code}: ${findName(code)}`}/>
            </ListItem>
        )}
        </List>
        )
}

export default DiagnosisCodes