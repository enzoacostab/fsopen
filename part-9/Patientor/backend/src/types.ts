export interface Diagnosis{
    code: string,
    name: string,
    latin?: string
}

export interface Patient{
    id: string
    name: string,
    dateOfBirth?: string,
    ssn?: string,
    gender: Gender,
    occupation: string,
    entries: Entry[]
}

export type PublicPatient = Omit<Patient, 'ssn' | 'entries'>;

export enum Gender {
    Male = 'male',
    Female = 'female',
    Other = 'other'
  }

export type newPatientEntry = Omit<Patient, 'id' | 'entries'>;


interface BaseEntry {
    id: string;
    description: string;
    date: string;
    specialist: string;
    diagnosisCodes?: Array<Diagnosis['code']>;
  }

  export enum HealthCheckRating {
    "Healthy" = 0,
    "LowRisk" = 1,
    "HighRisk" = 2,
    "CriticalRisk" = 3
  }
  
  export interface HealthCheckEntry extends BaseEntry {
    type: EntryTypes.HealthCheck;
    healthCheckRating: HealthCheckRating;
  }

  export interface OccupationalHealthcareEntry extends BaseEntry {
    type: EntryTypes.OccupationalHealthcare,
    employerName: string,
    sickLeave?: sickLeave
  }

  export interface sickLeave {
    startDate: string,
    endDate: string
  }


  export interface HospitalEntry extends BaseEntry {
    type: EntryTypes.Hospital,
    discharge: Discharge
  }

  export interface Discharge {
    date: string,
    criteria: string
  }

  export enum EntryTypes {
    Hospital = 'Hospital',
    OccupationalHealthcare = "OccupationalHealthcare",
    HealthCheck = "HealthCheck"
  } 

  export type DiagnosisOption = {
    value: string;
    label: string;
  };

  export type Entry = HospitalEntry | OccupationalHealthcareEntry | HealthCheckEntry;