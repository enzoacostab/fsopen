import { useEffect, useContext } from "react";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import { Button, Divider, Container, Typography } from '@mui/material';
import PatientPage from "./components/PatientPage";
import patientService from "./services/patients";
import PatientListPage from "./components/PatientListPage";
import { setPatientListContext, setPatients } from "./state";


const App = () => {
  const setPatientList = useContext(setPatientListContext)

  useEffect(() => {
    const fetchPatientList = async () => {
      const patients = await patientService.getAll();
      setPatientList(setPatients(patients));
    };
    void fetchPatientList();
  });
  
  return (
    <div className="App">
      <Router>
        <Container>
          <Typography variant="h3" style={{ marginBottom: "0.5em" }}>
            Patientor
          </Typography>
          <Button component={Link} to="/" variant="contained" color="primary">
            Home
          </Button>
          <Divider hidden />
          <Routes>
            <Route path="/" element={<PatientListPage/>} />
            <Route path="/patient/:id" element={<PatientPage/>} />
          </Routes>
        </Container>
      </Router>
    </div>
  );
};

export default App;
