import axios from "axios";
import { Entry, EntryWOid, Patient, PatientFormValues, PatientWithEntries } from "../types";
import { apiBaseUrl } from "../constants";

const getAll = async () => {
  const { data } = await axios.get<Patient[]>(
    `${apiBaseUrl}/patients`
  );

  return data;
};

const findById = async (id: string) => {
  const { data } = await axios.get<PatientWithEntries>(
    `${apiBaseUrl}/patients/${id}`
  );
  
  return data
};

const create = async (object: PatientFormValues) => {
  const { data } = await axios.post<Patient>(
    `${apiBaseUrl}/patients`,
    object
  );

  return data;
};

const createEntry = async (id: string | undefined, object: EntryWOid) => {
  const { data } = await axios.post<Entry>(
    `${apiBaseUrl}/patients/${id}/entries`,
    object
  );

  return data;
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getAll, create, findById, createEntry
};

