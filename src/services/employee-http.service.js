import http from "../http-common";

export const getAllEmployees = () => {
  return http.get('/employees')
}

export const getEmployee = (id) => {
    return http.get(`/employees/${id}`);
};

export const createEmployee = (data) => {
    return http.post("/employees", data);
};

export const updateEmployee = (id, data) => {
    return http.put(`/employees/${id}`, data);
};

export const removeEmployee = (id) => {
    return http.delete(`/employees/${id}`);
};

