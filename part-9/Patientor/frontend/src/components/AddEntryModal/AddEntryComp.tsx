import {  Field, ErrorMessage, FieldProps } from 'formik'
import { Form } from 'semantic-ui-react'
import { Diagnosis, EntryTypes, HealthCheckRating } from '../../types';
import { ChangeEvent } from 'react'

export type TypeOption = {
    value: EntryTypes;
    label: string;
  };

export type DiagnosisOption = {
    value: string;
    label: string;
  };

export type healthCheckRatingOption = {
    value: HealthCheckRating;
    label: string;
  };

  export const TypeOptions: TypeOption[] = [
    { value: EntryTypes.Hospital, label: "Hospital" },
    { value: EntryTypes.OccupationalHealthcare, label: "Occupational Health Care" },
    { value: EntryTypes.HealthCheck, label: "Health Check" }
  ];

  export const healthCheckRatingOptions: healthCheckRatingOption[] = [
    { value: HealthCheckRating.Healthy, label: "Healthy" },
    { value: HealthCheckRating.LowRisk, label: "Low Risk" },
    { value: HealthCheckRating.HighRisk, label: "High Risk" },
    { value: HealthCheckRating.CriticalRisk, label: "Critical Risk" }
  ];

  export const DiagnosisOptions = (diagnoses: Array<Diagnosis>): DiagnosisOption[] =>{
    return diagnoses.map(diagnosis => {return {value: diagnosis.code, label: diagnosis.name}})
  }

  export const DiagnosisValueOptions = (diag: DiagnosisOption[], diagnoses: Array<Diagnosis>): DiagnosisOption[] => {
    diagnoses = diagnoses.filter(e => diag.some(d=> d.value.includes(e.code)))
    return diagnoses.map(diagnosis=> {return {value: diagnosis.code, label: diagnosis.name}})
  }

  type SelectFieldProps = {
    name: string;
    label: string;
    optional: boolean;
    options: TypeOption[] | DiagnosisOption[] | healthCheckRatingOption[];
    setType: React.Dispatch<React.SetStateAction<string>> | undefined
  };

  export const SelectField: React.FC<SelectFieldProps> = ({
    name,
    label,
    options,
    setType,
    optional
  }: SelectFieldProps) => (

    setType ? 

    <Form.Field onChange={({target}:ChangeEvent<HTMLInputElement>):void => setType(target.value)} >
      <label>{label}</label>
      <Field as="select" name={name} className="ui dropdown">
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label || option.value}
          </option>
        ))}
      </Field>
    </Form.Field> 

    :

    <Form.Field >
    <label>{label}</label>
    <Field as="select" name={name} className="ui dropdown">
      {optional ? <option value={undefined}>No</option> : null}
      {options.map(option => (
        <option key={option.value} value={option.value}>
          {option.label || option.value}
        </option>
      ))}
    </Field>
    </Form.Field> 
  );

  interface TextProps extends FieldProps {
    label: string;
    placeholder: string;
  }
  
  export const TextField: React.FC<TextProps> = ({ field, label, placeholder }) => (
    <Form.Field>
      <label>{label}</label>
      <Field placeholder={placeholder} {...field} />
      <div style={{ color:'red' }}>
        <ErrorMessage name={field.name} />
      </div>
    </Form.Field>
  );



