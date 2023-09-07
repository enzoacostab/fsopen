import { HealthAndSafety } from "@mui/icons-material"
import { ListItemAvatar, Avatar, ListItemText } from "@mui/material"
import { OccupationalHealthcareEntry } from "../types"

interface Props {
    entry: OccupationalHealthcareEntry
}

const OccupationalHealthcare = ({entry}: Props) =>{
    return(
        <>
        <ListItemAvatar>
          <Avatar>
            <HealthAndSafety />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={entry.date} secondary={entry.description} />
        <ListItemText primary={entry.employerName} secondary={`${entry.sickLeave?.startDate || ""} ${entry.sickLeave?.endDate || ""}`} />
        </>
    )
}

export default OccupationalHealthcare