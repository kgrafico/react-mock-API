import React, {useEffect, useState} from 'react';

import {Link} from "@reach/router"

import Typography from '@material-ui/core/Typography';
import LinearProgress from '@material-ui/core/LinearProgress';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'

import { getEmployee } from '../services/employee-http.service'
import Card from "@material-ui/core/Card";

import './details.compoent.scss'

const EmployeeDetails = (props) => {
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
          <div className="contentDetail">
            <h2>Journeywork of employees</h2>

            <Link to="..">
              <ArrowBackIosIcon />
            </Link>

            <div className="details-box">
              <div className="employee-information">
                <div>
                  <b>Name:</b> {`${employee.first_name} ${employee.last_name}`}
                </div>
                <div>
                  <b>Capital:</b> {employee.email}
                </div>
              </div>
            </div>
          </div>
        )
    }

};
export default EmployeeDetails;
