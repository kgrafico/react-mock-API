import React, {useEffect, useState} from 'react';

import {Link} from "@reach/router"

import LinearProgress from '@material-ui/core/LinearProgress';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

import { getEmployee } from '../services/employee-http.service'

import './details.compoent.scss'

const EmployeeDetails = (props) => {
    const [employee, setEmployee] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false)


    const [errorMessage, setErrorMessage] = useState('Error')

    useEffect(() => {
        getEmployee(props.id).then(res => {
            setEmployee(res.data);
            setIsLoading(false);
        }).catch((err) => {
            setIsError(true);
            setIsLoading(false);
            if (err.response) {
              setErrorMessage(err.response.data.error)
            }
        });
    }, [props.id]);

    if (isLoading) {
        return <LinearProgress/>;
    } else {
        return (
          <div className="contentDetail">
            <h2>Journeywork of employees</h2>

            <Link to="..">
              <ArrowBackIosIcon />
            </Link>

            <div className="details-box">
              <div className={`errorMessage ${isError ? 'show' : 'hidden'}`}>
                <p>{errorMessage}</p>
              </div>

              <div className="employee-information">
                <div>
                  <b>Name:</b> {`${employee.first_name} ${employee.last_name}`}
                </div>
                <div>
                  <b>Email:</b> {employee.email}
                </div>
              </div>
              <div>
                <h3>Journeywork</h3>
                {employee.journeywork.map((row) => (
                  <div className="journeyworkList" key={row.id}>
                    <div
                      className={`journeyworkDetail ${
                        row.product ? 'show' : 'hidden'
                      }`}
                    >
                      {`${row.action} a ${row.product} for ${row.client}`}
                    </div>
                    <div
                      className={`journeyworkDetail ${
                        row.action === 'Take a break' ? 'show' : 'hidden'
                      }`}
                    >
                      {`${row.action}`}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )
    }
};
export default EmployeeDetails;
