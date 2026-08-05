using StudentManagement.Application.Interfaces.Repositories;
using StudentManagement.Application.Common;
using StudentManagement.Application.Students.Events;

namespace StudentManagement.Application.Students.Commands.DeleteStudent
{
    public class DeleteStudentCommandHandler
    {
        private readonly IStudentRepository _studentRepository;
        private readonly IEventQueue _eventQueue;

        public DeleteStudentCommandHandler(
            IStudentRepository studentRepository,
            IEventQueue eventQueue)
        {
            _studentRepository = studentRepository;
            _eventQueue = eventQueue;
        }

        public async Task<bool> Handle(DeleteStudentCommand command)
        {
            var student = await _studentRepository.GetByIdAsync(command.Id);

            if (student == null)
                return false;

            _studentRepository.Delete(student);

            await _studentRepository.SaveChangesAsync();

            _eventQueue.Enqueue(new StudentDeletedEvent
            {
                Id = command.Id
            });

            return true;
        }
    }
}