import React, { useEffect, useState } from 'react'

import _ from "lodash/fp";

import {useForm} from "react-hook-form";

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { getAllEmployees } from '../services/employee-http.service'

const FormDialog = (props) => {
    const {register, handleSubmit, errors} = useForm();
    const [rows, setRows] = useState([])

    useEffect(() => {
      getAllEmployees().then((res) => setRows(res.data))
    }, [])


    const onSubmit = data => {
      debugger
      Object.assign(data, { id: rows.length + 1 })
      props.handleSubmit(data);
    };


    return (
      <Dialog
        fullWidth={true}
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Add/Edit employee </DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              inputRef={register({ required: true })}
              name="first_name"
              margin="dense"
              id="first_name"
              label="Name"
              type="text"
              fullWidth
              defaultValue={props.selected.first_name}
            />
            {_.get('first_name.type', errors) === 'required' && (
              <p className="error">This field is required</p>
            )}
            <TextField
              inputRef={register({ required: true })}
              name="last_name"
              margin="dense"
              id="last_name"
              label="Surname"
              type="text"
              fullWidth
              defaultValue={props.selected.last_name}
            />
            {_.get('last_name.type', errors) === 'required' && (
              <p className="error">This field is required</p>
            )}
            <TextField
              inputRef={register({ required: true })}
              name="email"
              margin="dense"
              id="email"
              label="Email"
              type="text"
              fullWidth
              defaultValue={props.selected.email}
            />
            {_.get('email.type', errors) === 'required' && (
              <p className="error">This field is required</p>
            )}
            <Button onClick={props.handleClose} color="primary">
              Cancel
            </Button>
            <Button type="submit" color="primary">
              Submit
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    )
};

export default FormDialog;
