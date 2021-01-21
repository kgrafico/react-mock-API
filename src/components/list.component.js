import React, {useEffect, useState} from "react";

import Button from "@material-ui/core/Button";

//Local imports
import { createEmployee, getAllEmployees, removeEmployee, updateEmployee } from "../services/employee-http.service";
import CountryFormDialog from "./form-dialog.component";
import { ComponentTable } from './table.component'
import { AlertBar } from "./alert-bar.component";

import './list.compoent.scss'

const EmployeeList = () => {

    const [rows, setRows] = useState([]);
    const [alertMeta, setAlertMeta] = useState({severity: '', message: ''});
    const [isEmployeeListManipulated, setEmployeeListManipulated] = useState(false);
    const [isDialogOpen, setDialogOpen] = useState(false);
    const [isAlertOpen, setAlertOpen] = useState(false);
    const [selected, setSelected] = useState({id: '', name: '', capital: ''});

    useEffect(() => {
        getAllEmployees().then(res => setRows(res.data));
    }, []);

    useEffect(() => {
        if (isEmployeeListManipulated) {
            getAllEmployees().then(res => setRows(res.data));
        }
        setEmployeeListManipulated(false);
    }, [isEmployeeListManipulated]);

    const add = (data) => {
        createEmployee(data)
            .then(() => {
                showAlert("success", "Create success");
                closeDialog();
            })
            .catch(() => showAlert("error", "Create failed"));
    };

    const showAlert = (severity, message) => {
        setEmployeeListManipulated(true);
        setAlertMeta({severity, message});
        setAlertOpen(true);
    };

    const closeDialog = () => {
        setDialogOpen(false);
        setSelected({id: '', name: '', email: ''});
    };

    const edit = (data) => {
        data.id = selected.id;
        updateEmployee(data.id, data)
            .then(() => {
                showAlert("success", "Update success");
                closeDialog();
            })
            .catch(() => showAlert("error", "Update failed"));
    };

    const remove = (row) => {
        removeEmployee(row.id)
            .then(() => showAlert("success", "Delete success"))
            .catch(() => showAlert("error", "Delete failed"));
    };

    const openCreateDialog = () => {
        openCountryFormDialog({id: '', name: '', email: ''});
    };

    const openEditDialog = (row) => {
        openCountryFormDialog(row);
    };

    const openCountryFormDialog = (row) => {
        setDialogOpen(true);
        setSelected(row);
    };

    const handleSubmit = (employee) => {
        if (selected.id) {
            edit(employee);
        } else {
            add(employee);
        }
    };

    const handleAlertClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setAlertOpen(false);
    };

    return (
        <div className="content">
            <AlertBar open={isAlertOpen} onClose={handleAlertClose} alertMeta={alertMeta}/>
            <CountryFormDialog open={isDialogOpen} handleClose={closeDialog} handleSubmit={handleSubmit} selected={selected}/>
            <ComponentTable rows={rows} onDelete={remove} openEditModal={openEditDialog}/>
            <Button variant="outlined" color="primary" onClick={openCreateDialog}>Add new</Button>
        </div>
    );
};

export default EmployeeList;