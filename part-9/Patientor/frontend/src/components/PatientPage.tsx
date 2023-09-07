import { useEffect, useContext, useState } from "react"
import { useParams } from "react-router-dom"
import { Female, Male } from "@mui/icons-material"
import { patientContext, setPatientContext } from "../state"
import patientService from '../services/patients'
import { List, Typography, ListItem, Divider, Button } from "@mui/material"
import EntryDetails from "./EntryDetails"
import DiagnoseCodes from './DiagnoseCodes'
import AddEntryModal from "./AddEntryModal"
import { EntryWOid } from "../types"
import axios from "axios"

const PatientPage = () =>{
    const {id} = useParams<{id: string}>()
    const setPatient = useContext(setPatientContext)
    const patient = useContext(patientContext)

    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [error, setError] = useState<string>();

    const openModal = (): void => setModalOpen(true);
    const closeModal = (): void => {
      setModalOpen(false);
      setError(undefined);
    };

    const submitNewEntry = async (values: EntryWOid) => {
        try {
            const entry = await patientService.createEntry(id, values);
            if (patient) {
                const newEntries = patient.entries.concat(entry);
                setPatient({...patient, entries: newEntries});
                setModalOpen(false);
            };
        } catch (e: unknown) {
            if (axios.isAxiosError(e)) {
                if (e?.response?.data && typeof e?.response?.data === "string") {
                    const message = e.response.data.replace('Something went wrong. Error: ', '');
                    console.error(message);
                    setError(message);
                } else {
                    setError("Unrecognized axios error");
                }
            } else {
                console.error("Unknown error", e);
                setError("Unknown error");
            }
        }
      };


    useEffect(()=>{
        const fetchPatient = async(idd: string) =>{
            const patient = await patientService.findById(idd)
            setPatient(patient)
        }
        if (id && (!patient || patient.id!==id)){
            void fetchPatient(id)
        }
    },[patient, id, setPatient])


    return(<div>
        <br/><Typography variant="h4">{patient?.name} {patient?.gender === 'male' ? <Male/> : <Female/>}</Typography><br/>
        <Typography variant="body1">ssn: {patient?.ssn}</Typography>
        <Typography variant="body1">{patient?.occupation}</Typography><br/>
        {patient?.entries && patient.entries.length>0 && <Typography variant="h5">Entries</Typography>}
        <br/>
        <List> 
            
            {patient?.entries.map(entry =>
            <div key={entry.id}>
            <ListItem  >
                <EntryDetails entry={entry}/>
                {entry.diagnosisCodes && <DiagnoseCodes codes={entry.diagnosisCodes}/>}
            </ListItem> 
            <Divider variant="inset" component="li" />
            </div>
            )}
        </List>
        <AddEntryModal
        modalOpen={modalOpen}
        onSubmit={submitNewEntry}
        error={error}
        onClose={closeModal}
        />
        <Button variant="contained" onClick={() => openModal()}>
            Add New Patient
        </Button>
    </div>)
}

export default PatientPage