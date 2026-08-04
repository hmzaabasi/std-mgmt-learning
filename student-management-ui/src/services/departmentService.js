import api from "../api/axios";

export const getDepartments = (
    page = 1,
    pageSize = 5,
    search = "",
    sortBy = "id",
    sortOrder = "asc"
) =>
    api.get(
        `/Department?page=${page}&pageSize=${pageSize}&search=${search}&sortBy=${sortBy}&sortOrder=${sortOrder}`
    )
export const getDepartment = (id) => api.get(`/Department/${id}`);

export const createDepartment = (department) =>
    api.post("/Department", department);

export const updateDepartment = (id, department) =>
    api.put(`/Department/${id}`, department);

export const deleteDepartment = (id) =>
    api.delete(`/Department/${id}`);