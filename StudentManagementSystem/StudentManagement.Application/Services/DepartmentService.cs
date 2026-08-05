//using StudentManagement.Application.Common;
//using StudentManagement.Application.Departments.Events;
//using StudentManagement.Application.DTOs.Common;
//using StudentManagement.Application.DTOs.Department;
//using StudentManagement.Application.Interfaces.Repositories;
//using StudentManagement.Application.Interfaces.Services;
//using StudentManagement.Domain.Entities;
//using System;
//using System.Collections.Generic;
//using System.Text;

//namespace StudentManagement.Application.Services;

//public class DepartmentService : IDepartmentService
//{
//    private readonly IDepartmentRepository _departmentRepository;
//    private readonly IDepartmentReadRepository _departmentReadRepository;
//    private readonly IEventQueue _eventQueue;

//    public DepartmentService(
//        IDepartmentRepository departmentRepository,
//        IDepartmentReadRepository departmentReadRepository,
//        IEventQueue eventQueue)
//    {
//        _departmentRepository = departmentRepository;
//        _departmentReadRepository = departmentReadRepository;
//        _eventQueue = eventQueue;
//    }

//    public async Task<PagedResult<DepartmentDto>> GetAllAsync(PaginationDto pagination)
//    {
//        var result = await _departmentReadRepository.GetAllAsync(pagination);

//        var departmentDtos = result.Departments.Select(department => new DepartmentDto
//        {
//            Id = department.Id,
//            Name = department.Name
//        });

//        return new PagedResult<DepartmentDto>
//        {
//            Items = departmentDtos,
//            Page = pagination.Page,
//            PageSize = pagination.PageSize,
//            TotalRecords = result.TotalRecords
//        };
//    }
//    public async Task<DepartmentDto?> GetByIdAsync(int id)
//    {
//        var department = await _departmentReadRepository.GetByIdAsync(id);

//        if (department == null)
//            return null;

//        return new DepartmentDto
//        {
//            Id = department.Id,
//            Name = department.Name
//        };
//    }
//    public async Task<DepartmentDto> CreateAsync(CreateDepartmentDto dto)
//    {
//        var department = new Department
//        {
//            Name = dto.Name
//        };

//        await _departmentRepository.AddAsync(department);

//        await _departmentRepository.SaveChangesAsync();

//        _eventQueue.Enqueue(new DepartmentCreatedEvent
//        {
//            Id = department.Id,
//            Name = department.Name
//        });

//        return new DepartmentDto
//        {
//            Id = department.Id,
//            Name = department.Name
//        };
//    }
//    public async Task<bool> UpdateAsync(int id, UpdateDepartmentDto dto)
//    {
//        if (id != dto.Id)
//            return false;

//        var department = await _departmentRepository.GetByIdAsync(id);

//        if (department == null)
//            return false;


//        department.Name = dto.Name;

//        await _departmentRepository.UpdateAsync(department);

//        _eventQueue.Enqueue(new DepartmentUpdatedEvent
//        {
//            Id = department.Id,
//            Name = department.Name
//        });

//        return true;
//    }
//    public async Task<bool> DeleteAsync(int id)
//    {
//        var department = await _departmentRepository.GetByIdAsync(id);

//        if (department == null)
//            return false;

//        _departmentRepository.Delete(department);

//        _departmentRepository.Delete(department);

//        await _departmentRepository.SaveChangesAsync();

//        _eventQueue.Enqueue(new DepartmentDeletedEvent
//        {
//            Id = id
//        });

//        return true;
//    }
//}
