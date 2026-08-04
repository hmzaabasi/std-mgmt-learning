import api from "../api/axios";

export const getStudents = (
    page = 1,
    pageSize = 5,
    search = "",
    sortBy = "id",
    sortOrder = "asc"
) =>
    api.get(
        `/Student?page=${page}&pageSize=${pageSize}&search=${encodeURIComponent(search)}&sortBy=${sortBy}&sortOrder=${sortOrder}`
    )

export const getStudent = (id) => api.get(`/Student/${id}`);

export const createStudent = (student) =>
    api.post("/Student", student);

export const updateStudent = (id, student) =>
    api.put(`/Student/${id}`, student);

export const deleteStudent = (id) =>
    api.delete(`/Student/${id}`);