using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using StudentManagement.Application.Common;
using StudentManagement.Application.Departments.Events;
using StudentManagement.Application.Students.Events;
using StudentManagement.Infrastructure.Persistence;
using System;
using System.Collections.Generic;
using System.Text;

namespace StudentManagement.Infrastructure.Messaging
{
    public class PostgresSyncWorker : BackgroundService
    {
        private readonly IEventQueue _eventQueue;
        private readonly IServiceScopeFactory _scopeFactory;

        public PostgresSyncWorker(IEventQueue eventQueue, IServiceScopeFactory scopeFactory)
        {
            _eventQueue = eventQueue;
            _scopeFactory = scopeFactory;
        }

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            while (!stoppingToken.IsCancellationRequested)
            {
                var integrationEvent = await _eventQueue.DequeueAsync(stoppingToken);

                using var scope = _scopeFactory.CreateScope();
                var postgresContext = scope.ServiceProvider.GetRequiredService<PostgreSqlDbContext>();

                switch (integrationEvent)
                {
                    case StudentCreatedEvent created:
                        postgresContext.Students.Add(new Domain.Entities.Student
                        {
                            Id = created.Id,
                            Name = created.Name,
                            Email = created.Email,
                            Age = created.Age,
                            DepartmentId = created.DepartmentId
                        });
                        break;

                    case StudentUpdatedEvent updated:
                        var existing = await postgresContext.Students.FindAsync(new object[] { updated.Id }, stoppingToken);
                        if (existing != null)
                        {
                            existing.Name = updated.Name;
                            existing.Email = updated.Email;
                            existing.Age = updated.Age;
                            existing.DepartmentId = updated.DepartmentId;
                        }
                        break;

                    case StudentDeletedEvent deleted:
                        var toRemove = await postgresContext.Students.FindAsync(new object[] { deleted.Id }, stoppingToken);
                        if (toRemove != null)
                        {
                            postgresContext.Students.Remove(toRemove);
                        }
                        break;

                    case DepartmentCreatedEvent deptCreated:
                        postgresContext.Departments.Add(new Domain.Entities.Department
                        {
                            Id = deptCreated.Id,
                            Name = deptCreated.Name
                        });
                        break;

                    case DepartmentUpdatedEvent deptUpdated:
                        var existingDept = await postgresContext.Departments.FindAsync(new object[] { deptUpdated.Id }, stoppingToken);
                        if (existingDept != null)
                        {
                            existingDept.Name = deptUpdated.Name;
                        }
                        break;

                    case DepartmentDeletedEvent deptDeleted:
                        var deptToRemove = await postgresContext.Departments.FindAsync(new object[] { deptDeleted.Id }, stoppingToken);
                        if (deptToRemove != null)
                        {
                            postgresContext.Departments.Remove(deptToRemove);
                        }
                        break;
                }

                await postgresContext.SaveChangesAsync(stoppingToken);
            }
        }
    }
}
