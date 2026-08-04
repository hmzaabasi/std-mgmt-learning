using System;
using System.Collections.Generic;
using System.Text;

namespace StudentManagement.Application.Common
{
    public interface IEventQueue
    {
        void Enqueue(IIntegrationEvent integrationEvent);
        Task<IIntegrationEvent> DequeueAsync(CancellationToken cancellationToken);
    }
}
