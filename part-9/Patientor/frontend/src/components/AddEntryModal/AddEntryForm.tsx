import { Grid, Button } from "semantic-ui-react";
import { TextField, SelectField, TypeOptions, DiagnosisOptions, DiagnosisValueOptions, DiagnosisOption } from "./AddEntryComp";
import { EntryWOid, EntryTypes, HealthCheckRating } from "../../types";
import { Formik, Field, Form } from "formik";
import { useState, useContext, useEffect } from 'react'
import { HealthCheckFields, HospitalFields, OccupationalHealthcareFields } from "./FormFields";
import { diagnosesContext } from "../../state";
import Select from 'react-select'

interface Props {
  onCancel: () => void;
  onSubmit: (value: EntryWOid) => void;
}

const baseEntry = {
description: "",
date: "",
specialist: "",
diagnosisCodes: undefined,
}

export const AddEntryForm: React.FC<Props> = ({ onSubmit, onCancel }) => {
  const [type, setType] = useState('OccupationalHealthcare')
  const diagnoses = useContext(diagnosesContext);

  const [initialState, setInitialState] = useState<EntryWOid>({...baseEntry,
    employerName: "",
    type: EntryTypes.OccupationalHealthcare,
    sickLeave: undefined,
  })

  useEffect(() => {
    if (type === 'OccupationalHealthcare'){
      setInitialState({...baseEntry,
        employerName: "",
        type: EntryTypes.OccupationalHealthcare,
        sickLeave: undefined,
      })
    }
    if (type === 'HealthCheck'){
      setInitialState({...baseEntry,
        type: EntryTypes.HealthCheck,
        healthCheckRating: HealthCheckRating.Healthy
      })
    }
    if (type === 'Hospital'){
      setInitialState({...baseEntry,
        type: EntryTypes.Hospital,
        discharge: {date: '', criteria: ''}
      }) 
    }
  }, [type])


  return (
    <Formik
      initialValues = {initialState}
      onSubmit={onSubmit}
      validate={values => {
        const requiredError = "Field is required";
        const errors: { [field: string]: string } = {};
        if (!values.type) {
          errors.type = requiredError;
        }
        if (!values.date) {
          errors.date = requiredError;
        }
        if (!values.description) {
          errors.description = requiredError;
        }
        
        if (!values.specialist) {
          errors.specialist = requiredError;
        }
        if (values.type===EntryTypes.OccupationalHealthcare){
          if (!values.employerName) {
            errors.employerName = requiredError;
          }
        }
        if (values.type===EntryTypes.HealthCheck){
          if (!values.healthCheckRating) {
            errors.healthCheckRating = requiredError;
          }
        }
        if (values.type===EntryTypes.Hospital){
          if (!values.discharge.criteria || !values.discharge.date) {
            errors.discharge = requiredError;
          }
        }
        return errors;
      }}
    >
      {({ isValid, dirty, setFieldValue, values }) => {
        return (
          <Form className="form ui">
            <SelectField
              label="Type"
              name="type"
              optional={false}
              options={TypeOptions}
              setType={setType}
            />
            {diagnoses && <Select
              value={values.diagnosisCodes ? DiagnosisValueOptions(values.diagnosisCodes as unknown as DiagnosisOption[], diagnoses) : undefined}
              onChange={(diagnosis) => setFieldValue('diagnosisCodes', diagnosis)}
              isMulti
              name="diagnosisCodes"
              options={DiagnosisOptions(diagnoses)} 
              />
            }
            <Field
              label="Description"
              placeholder="Description"
              name="description"
              component={TextField}
            />
            <Field
              label="Date"
              placeholder="Date"
              name="date"
              component={TextField}
            />
            <Field
              label="Specialist"
              placeholder="Specialist"
              name="specialist"
              component={TextField}
            />
            {type === "OccupationalHealthcare" ? <OccupationalHealthcareFields/> : type === "HealthCheck" 
            ? <HealthCheckFields/> : <HospitalFields/>}
            
            <Grid>
              <Grid.Column floated="left" width={5}>
                <Button type="button" onClick={onCancel} color="red">
                  Cancel
                </Button>
              </Grid.Column>
              <Grid.Column floated="right" width={5}>
                <Button
                  type="submit"
                  floated="right"
                  color="green"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid.Column>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddEntryForm;