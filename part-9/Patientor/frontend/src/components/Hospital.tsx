import { LocalHospital } from "@mui/icons-material"
import { ListItemAvatar, Avatar, ListItemText } from "@mui/material"
import { HospitalEntry } from "../types"

interface Props {
    entry: HospitalEntry
}

const Hospital = ({entry}: Props) =>{
    return(
        <>
        <ListItemAvatar>
          <Avatar>
            <LocalHospital />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={entry.date} secondary="Jan 9, 2014" />
        <ListItemText primary={entry.date} secondary={`${entry.discharge.date} ${entry.discharge.criteria}`} />
        </>
    )
}

export default Hospital