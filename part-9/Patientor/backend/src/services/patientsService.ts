import patients from '../../data/patients';
import { Patient, newPatientEntry, PublicPatient, OccupationalHealthcareEntry, HospitalEntry, HealthCheckEntry } from '../types';
import { toNewPatientEntry } from '../utils';
import { v4 as uuid } from 'uuid';

const patientEntries: Patient [] = patients.map(obj => {
  const object = toNewPatientEntry(obj) as Patient;
  object.id = obj.id;
  return object;
});


const getEntries = (): PublicPatient[] => {
  return patientEntries.map(({id, name, dateOfBirth, gender, occupation}) => ({
    id, name, dateOfBirth, gender, occupation
  }));
};

const findById = (id: string): Patient | undefined => {
  return patients.find(patient => patient.id === id);
};

const addOccupationalHealthcareEntry = (id: string, entry: Omit<OccupationalHealthcareEntry, "id">): OccupationalHealthcareEntry => {
  const eid: string = uuid();
  const patient = patientEntries.find(pat => pat.id === id);
  const entryWId: OccupationalHealthcareEntry = {...entry, id: eid};
  patient?.entries.push(entryWId);
  patients.map(e => e.id === id ? patient : e);
  return entryWId;
};

const addHospitalEntry = (id: string, entry: Omit<HospitalEntry, "id">): HospitalEntry => {
  const eid: string = uuid();
  const patient = patientEntries.find(pat => pat.id === id);
  const entryWId: HospitalEntry = {...entry, id: eid};
  patient?.entries.push(entryWId);
  patients.map(e => e.id === id ? patient : e);
  return entryWId;
};

const addHealthCheckEntry = (id: string, entry: Omit<HealthCheckEntry, "id">): HealthCheckEntry => {
  const eid: string = uuid();
  const patient = patientEntries.find(pat => pat.id === id);
  const entryWId: HealthCheckEntry = {...entry, id: eid};
  patient?.entries.push(entryWId);
  patients.map(e => e.id === id ? patient : e);
  return entryWId;
};

const addPatient = (entry: newPatientEntry): Patient => {
  const id: string = uuid();
  const obj: Patient = {id: id, ...entry, entries: []};
  patients.push(obj);
  return obj;
};

export default {
  getEntries,
  addPatient,
  findById,
  addOccupationalHealthcareEntry,
  addHealthCheckEntry,
  addHospitalEntry
};