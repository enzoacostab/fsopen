import diagnoses from '../../data/diagnoses.json';
import { Diagnosis } from '../types'; 

const getEntries = (): Array<Diagnosis> => {
  return diagnoses;
};

const addEntry = () => {
  return null;
};

export default {
  getEntries,
  addEntry
};