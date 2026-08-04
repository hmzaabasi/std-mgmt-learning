using System;
using System.Collections.Generic;
using System.Text;

using System.Threading.Channels;
using StudentManagement.Application.Common;

namespace StudentManagement.Infrastructure.Messaging
{
    public class InMemoryEventQueue : IEventQueue
    {
        private readonly Channel<IIntegrationEvent> _channel =
            Channel.CreateUnbounded<IIntegrationEvent>();

        public void Enqueue(IIntegrationEvent integrationEvent)
        {
            _channel.Writer.TryWrite(integrationEvent);
        }

        public async Task<IIntegrationEvent> DequeueAsync(CancellationToken cancellationToken)
        {
            return await _channel.Reader.ReadAsync(cancellationToken);
        }
    }
}
