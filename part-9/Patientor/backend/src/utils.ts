/* eslint-disable @typescript-eslint/no-explicit-any */
import { Gender, Patient, Entry, EntryTypes, OccupationalHealthcareEntry, sickLeave, HealthCheckRating, HospitalEntry, HealthCheckEntry, Discharge, Diagnosis, DiagnosisOption } from "./types";
import patientsService from "./services/patientsService";

export const toNewEntry = (id: string, {type, ...body}: any): Entry =>{
    let newEntry;
    if (type === "OccupationalHealthcare"){
        const newEntryEnt = toNewOccupationalHealthcareEntry(body);
        newEntry = patientsService.addOccupationalHealthcareEntry(id ,newEntryEnt);
    }
    if (type === "Hospital"){
        const newEntryEnt = toNewHospitalEntry(body);
        newEntry = patientsService.addHospitalEntry(id ,newEntryEnt);
    }
    if (type === "HealthCheck"){
        const newEntryEnt = toNewHealthCheckEntry(body);
        newEntry = patientsService.addHealthCheckEntry(id ,newEntryEnt);
    }
    if (newEntry){
        return newEntry as Entry;
    }
    else{
        throw new Error("Incorrect type");
    }
};

export const toNewPatientEntry = ({name, dateOfBirth, ssn, gender, occupation, entries}: any): Omit<Patient, 'id'> => {
    return {
        name: parseString(name, 'name'),
        dateOfBirth: parseDate(dateOfBirth, 'date of birth'),
        ssn: parseString(ssn, 'social security number'),
        gender: parseGender(gender, 'gender'),
        occupation: parseString(occupation, 'occupation'),
        entries: entries as Entry[]
    };
};

export const toNewOccupationalHealthcareEntry = ({date, description, employerName, specialist, diagnosisCodes, sickLeave}: any): Omit<OccupationalHealthcareEntry, 'id'> => {
    return {
        type: EntryTypes.OccupationalHealthcare,
        description: parseString(description, 'description'),
        date: parseDate(date, 'date'),
        employerName: parseString(employerName, 'employer name'),
        specialist: parseString(specialist, 'specialist'),
        diagnosisCodes: diagnosisCodes ? parseDiagnosisCodes(diagnosisCodes, 'diagnosis codes') : undefined,
        sickLeave: sickLeave ? parseSickLeave(sickLeave, 'sick leave') : undefined
    };
};

export const toNewHospitalEntry = ({date, description, specialist, diagnosisCodes, discharge}: any): Omit<HospitalEntry, 'id'> => {
    return {
        type: EntryTypes.Hospital,
        description: parseString(description, 'description'),
        date: parseDate(date, 'date'),
        specialist: parseString(specialist, 'specialist'),
        diagnosisCodes: diagnosisCodes ? parseDiagnosisCodes(diagnosisCodes, 'diagnosis codes') : undefined,
        discharge: parseDischarge(discharge, 'discharge')
    };
};

export const toNewHealthCheckEntry = ({date, description, specialist, diagnosisCodes, healthCheckRating}: any): Omit<HealthCheckEntry, 'id'> => {
    return {
        type: EntryTypes.HealthCheck,
        description: parseString(description, 'description'),
        date: parseDate(date, 'date'),
        specialist: parseString(specialist, 'specialist'),
        diagnosisCodes: diagnosisCodes ? parseDiagnosisCodes(diagnosisCodes, 'diagnosis codes') : undefined,
        healthCheckRating: parseHealthCheckRating(healthCheckRating, "health check rating")
    };
};

const isString = (param: any): param is string => {
    return typeof param === 'string' || param instanceof String;
};

const isDate = (param: string): boolean => {
    return Boolean(Date.parse(param));
};

const isGender = (param: any): param is Gender => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return Object.values(Gender).includes(param);
};

const isHealthCheckRating = (param: any): param is HealthCheckRating => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return Object.keys(HealthCheckRating).includes(param);
};

const isSickLeave = (param: any): param is sickLeave => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if (param.startDate && param.endDate) return true;
    return false;
};

const isDischarge = (param: any): param is Discharge => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if (param.criteria && param.date) return true;
    return false;
};

const isDiagnosis = (param: any): param is DiagnosisOption[] => {
    if (Array.isArray(param) && param.every((p: DiagnosisOption) => p.value && p.label)) return true;
    return false;
};

const parseString = (field: any, msg: string): string => {
    if (!field || !isString(field)) {
      throw new Error(`Incorrect or missing ${msg}: ${field}`);
    }
    return field;
};

const parseDiagnosisCodes = (field: any, msg: string): Array<Diagnosis['code']> => {
    if (!field || !isDiagnosis(field)) {
      throw new Error(`Incorrect or missing ${msg}`);
    }
    return field.map(e => e.value);
};

const parseHealthCheckRating = (field: any, msg: string): HealthCheckRating => {
    if (!field || !isHealthCheckRating(field)) {
      throw new Error(`Incorrect or missing ${msg}: ${field}`);
    }
    return field;
};

const parseSickLeave = (field: any, msg: string): sickLeave => {
    if (!field || !isSickLeave(field) || !isDate(field.startDate) || !isDate(field.endDate)) {
      throw new Error(`Incorrect or missing ${msg}: ${field}`);
    }
    return field;
};

const parseDischarge = (field: any, msg: string): Discharge => {
    if (!field || !isDischarge(field) || !isDate(field.date) || !isString(field.criteria)) {
      throw new Error(`Incorrect or missing ${msg}: ${field}`);
    }
    return field;
};


const parseGender = (field: any, msg: string): Gender => {
    if (!field || !isGender(field)) {
      throw new Error(`Incorrect or missing ${msg}: ${field}`);
    }
    return field;
};

const parseDate = (field: any, msg: string): string => {
    if (!field || !isString(field) || !isDate(field)) {
      throw new Error(`Incorrect or missing ${msg}: ${field}`);
    }
    return field;
};
