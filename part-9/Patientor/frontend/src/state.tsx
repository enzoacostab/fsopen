import { Dispatch, useReducer, SetStateAction, createContext, useEffect, useState } from "react"
import { PatientWithEntries, Diagnosis, Patient } from "./types"
import diagnosisService from "./services/diagnosis";

export const patientContext = createContext<PatientWithEntries | undefined>(undefined)
export const setPatientContext = createContext<Dispatch<SetStateAction<PatientWithEntries | undefined>>>(()=>{})
export const patientListContext = createContext<Patient[]>([])
export const setPatientListContext = createContext<Dispatch<Action>>(()=>{})
export const diagnosesContext = createContext<Diagnosis[] | undefined>(undefined)

interface Props {
    children: React.ReactNode
}
interface Action {
    type: string,
    payload: Patient[]
}
const reducer = (state: Patient[], action: Action) => {
    switch (action.type){
        case "SET_PATIENT_LIST":
            return action.payload
        default: throw new Error("error")
    }
}

export const setPatients = (patients: Patient[]): Action => { 
    return {type: "SET_PATIENT_LIST", payload: patients}
}


const Context = ({children}: Props) =>{
    const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);
    const [patient, setPatient] = useState<PatientWithEntries | undefined>(undefined)
    const [patientList, setPatientList] = useReducer(reducer, [])

    useEffect(()=>{
        const fetchPatientList = async () => {
            const diagnoses = await diagnosisService.getAll();
            setDiagnoses(diagnoses);
          };
          void fetchPatientList();
    },[])
    
    return( 
    <diagnosesContext.Provider value={diagnoses}>
        <setPatientContext.Provider value={setPatient}>
            <setPatientListContext.Provider value={setPatientList}>
                <patientListContext.Provider value={patientList}>
                    <patientContext.Provider value={patient}>
                        {children}
                    </patientContext.Provider>
                </patientListContext.Provider>
            </setPatientListContext.Provider>
        </setPatientContext.Provider>
    </diagnosesContext.Provider>
    )
}

export default Context;