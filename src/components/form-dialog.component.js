import React from 'react';

import _ from "lodash/fp";

import {useForm} from "react-hook-form";

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

const FormDialog = (props) => {
    const {register, handleSubmit, errors} = useForm();

    const onSubmit = data => {
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
              name="id"
              autoFocus
              margin="dense"
              id="id"
              label="Id"
              type="text"
              fullWidth
              defaultValue={props.selected.id}
              disabled={!!props.selected.id}
            />
            {_.get('id.type', errors) === 'required' && (
              <p className="error">This field is required</p>
            )}
            <TextField
              inputRef={register({ required: true })}
              name="name"
              margin="dense"
              id="name"
              label="Name"
              type="text"
              fullWidth
              defaultValue={props.selected.first_name}
            />
            {_.get('name.type', errors) === 'required' && (
              <p className="error">This field is required</p>
            )}
            <TextField
              inputRef={register({ required: true })}
              name="surname"
              margin="dense"
              id="surname"
              label="Surname"
              type="text"
              fullWidth
              defaultValue={props.selected.last_name}
            />
            {_.get('surname.type', errors) === 'required' && (
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
              <p>This field is required</p>
            )}
            <Button onClick={props.handleClose} color="primary">Cancel</Button>
            <Button type="submit" color="primary">Submit</Button>
          </form>
        </DialogContent>
      </Dialog>
    )
};

export default FormDialog;
