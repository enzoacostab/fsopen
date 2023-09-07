export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other"
}

export interface PatientWithEntries extends Patient {
  entries: Array<Entry>
}

export interface Patient {
  id: string;
  name: string;
  occupation: string;
  gender: Gender;
  ssn?: string;
  dateOfBirth?: string;
}

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

interface Discharge {
  date: string,
  criteria: string
}

export enum EntryTypes {
  Hospital = 'Hospital',
  OccupationalHealthcare = "OccupationalHealthcare",
  HealthCheck = "HealthCheck"
} 

export type Entry = HospitalEntry | OccupationalHealthcareEntry | HealthCheckEntry;
export type EntryWOid = Omit<HospitalEntry, 'id'> | Omit<OccupationalHealthcareEntry, 'id'> | Omit<HealthCheckEntry, 'id'>;

export type PatientFormValues = Omit<Patient, "id">;
