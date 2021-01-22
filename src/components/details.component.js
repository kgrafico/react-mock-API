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

    const getTime = (emp) => {
      let time = 0
      return emp.journeywork.map((el, i, arr) => {
        if ( i === 0 ){
          return '0:00'
        }
        const obj = {
          Make: () => (time = time + 150),
          Serve: () => (time = time + 60),
          'Take a break': () => (time = time + 60)
        }

        return getMinutes(obj[arr[i - 1].action]())
      })
    }

    const getMinutes = (time) => {
      const hrs = ~~(time / 3600)
      const mins = ~~((time % 3600) / 60)
      const secs = ~~time % 60
      let ret = ''
      if (hrs > 0) {
        ret += `${hrs}:${mins < 10 ? '0' : ''}`
      }
      ret += `${mins}:${secs < 10 ? '0' : ''}`
      ret += `${secs}`
      return ret
    }

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
              <div className="journeyworkList">
                <h3>Journeywork</h3>
                {employee.journeywork.map((row) => (
                  <div className="journeyworkBox" key={row.id}>
                    <div
                      className={`journeyworkDetail ${row.product ? 'show' : 'hidden'}`}
                    >
                      {`${getTime(employee)[row.id-1]} ${row.action} a ${row.product} for ${row.client}`}
                    </div>
                    <div className={`journeyworkDetail ${row.action === 'Take a break' ? 'show' : 'hidden'}`}>
                      {`${getTime(employee)[row.id-1]} ${row.action}`}
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
