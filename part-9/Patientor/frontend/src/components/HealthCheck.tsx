import { PlaylistAddCircle } from "@mui/icons-material"
import { ListItemAvatar, Avatar, ListItemText } from "@mui/material"
import { HealthCheckEntry } from "../types"
import HealthRatingBar from "./HealthRatingBar"

interface Props {
    entry: HealthCheckEntry
}

const HealthCheck = ({entry}: Props) =>{
    return(
        <>
        <ListItemAvatar>
          <Avatar>
            <PlaylistAddCircle/>
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={entry.date} secondary={entry.description} />
        <ListItemText secondary={<HealthRatingBar showText={false} rating={entry.healthCheckRating}/>}/>
        </>
    )
}

export default HealthCheck