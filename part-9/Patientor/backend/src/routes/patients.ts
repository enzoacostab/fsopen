import express from "express";
import patientsService from "../services/patientsService";
import { toNewPatientEntry, toNewEntry } from "../utils";

const router = express.Router();

router.get("/", (_req, res) => {
    res.send(patientsService.getEntries());
});

router.get('/:id', (req, res) => {
    const patient = patientsService.findById(req.params.id);
    if (patient){
      res.send(patient);
    } 
    else{
      res.sendStatus(404);
    }
});

router.post("/", (req, res) => {
    try{
        const newPatientEntry = toNewPatientEntry(req.body);
        const newPatient = patientsService.addPatient(newPatientEntry);
        res.json(newPatient);
    }
    catch(err){
        err instanceof Error && res.status(400).send(err.message);
    }
});

router.post("/:id/entries", (req, res) => {
    try{
        const id = req.params.id;
        const newEntry = toNewEntry(id, req.body);
        res.json(newEntry);
    }
    catch(err){
        err instanceof Error && res.status(400).send(err.message);
    }
});

export default router;