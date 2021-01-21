//React imports
import React, {useEffect, useState} from 'react';
// Router imports
import {Link} from "@reach/router"
//Material UI imports
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import LinearProgress from '@material-ui/core/LinearProgress';

import { getEmployee, getAllEmployees } from '../services/employee-http.service'
import Card from "@material-ui/core/Card";

const EmployeeDetails = (props) => {
    const [expanded, setExpanded] = useState('panel1');
    const [employee, setEmployee] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('Error');

    useEffect(() => {
        getEmployee(props.id).then(res => {
            setEmployee(res.data);
            setIsLoading(false);
        }).catch((err) => {
            setIsError(true);
            setIsLoading(false);
            if (err.response) {
                setErrorMessage(err.response.data.error);
            }
        });
    }, [props.id]);

    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };

    if (isLoading) {
        return <LinearProgress/>;
    } else if (isError) {
        return (
            <Card variant="outlined">
                <Typography variant="h5" component="h2">
                    {errorMessage}
                </Typography>
            </Card>);
    } else {
        return (
          <div>
            <Link to="..">Go Back</Link>
            <Accordion
              expanded={expanded === 'panel1'}
              onChange={handleChange('panel1')}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography>Employee details</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography component={'span'}>
                  <div>
                    Name: {`${employee.first_name} ${employee.last_name}`}
                  </div>
                  <div>Capital: {employee.email}</div>
                </Typography>
              </AccordionDetails>
            </Accordion>
          </div>
        )
    }

};
export default EmployeeDetails;
