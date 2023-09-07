import { Field } from 'formik'
import { TextField, SelectField } from './AddEntryComp'
import { healthCheckRatingOptions } from './AddEntryComp'

export const OccupationalHealthcareFields = () =>{
    return(
    <div>
        <Field
            label="Employer Name"
            placeholder="Employer Name"
            name="employerName"
            component={TextField}
            />
        <Field
            label="Sick Leave"
            placeholder="Start Date"
            name="sickLeave['startDate']"
            component={TextField}
        />
        <Field
            placeholder="End Date"
            name="sickLeave['endDate']"
            component={TextField}
        />
    </div>
    )
}

export const HospitalFields = () =>{
    return(
    <div>
        <Field
            label="Discharge"
            placeholder="Date"
            name="discharge['date']"
            component={TextField}
        />
        <Field
            placeholder="Criteria"
            name="discharge['criteria']"
            component={TextField}
        />
    </div>
    )
}

export const HealthCheckFields = () =>{
    return(
        <SelectField 
            name='healthCheckRating'
            label='Health Check Rating'
            optional={false}
            options={healthCheckRatingOptions}
            setType={undefined}
        />
    )
}