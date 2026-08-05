using StudentManagement.Application.Common;
using StudentManagement.Application.Students.Events;
using StudentManagement.Application.Departments.Events;
using StudentManagement.Infrastructure.Persistence;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.DependencyInjection;

namespace StudentManagement.Infrastructure.Messaging
{
    public class PostgresSyncWorker : IHostedService
    {
        private readonly IEventQueue _eventQueue;
        private readonly IServiceScopeFactory _scopeFactory;
        private Task? _executingTask;
        private CancellationTokenSource? _cts;

        public PostgresSyncWorker(IEventQueue eventQueue, IServiceScopeFactory scopeFactory)
        {
            _eventQueue = eventQueue;
            _scopeFactory = scopeFactory;
        }

        public Task StartAsync(CancellationToken cancellationToken)
        {
            _cts = CancellationTokenSource.CreateLinkedTokenSource(cancellationToken);
            _executingTask = RunLoopAsync(_cts.Token);
            return Task.CompletedTask;
        }

        public async Task StopAsync(CancellationToken cancellationToken)
        {
            if (_executingTask == null) return;

            _cts!.Cancel();
            await Task.WhenAny(_executingTask, Task.Delay(Timeout.Infinite, cancellationToken));
        }

        private async Task RunLoopAsync(CancellationToken stoppingToken)
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
                        var existingStudent = await postgresContext.Students.FindAsync(new object[] { updated.Id }, stoppingToken);
                        if (existingStudent != null)
                        {
                            existingStudent.Name = updated.Name;
                            existingStudent.Email = updated.Email;
                            existingStudent.Age = updated.Age;
                            existingStudent.DepartmentId = updated.DepartmentId;
                        }
                        break;

                    case StudentDeletedEvent deleted:
                        var toRemoveStudent = await postgresContext.Students.FindAsync(new object[] { deleted.Id }, stoppingToken);
                        if (toRemoveStudent != null)
                        {
                            postgresContext.Students.Remove(toRemoveStudent);
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