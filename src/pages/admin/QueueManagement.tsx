
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Plus, CheckCircle, Clock, Trash2, Edit } from 'lucide-react';

// Mock queue data
const mockQueue = [
  { id: 1, name: 'John Doe', designation: 'Software Engineer', queueNumber: 1, status: 'waiting' },
  { id: 2, name: 'Jane Smith', designation: 'Product Manager', queueNumber: 2, status: 'checked-in' },
  { id: 3, name: 'Mike Johnson', designation: 'Designer', queueNumber: 3, status: 'waiting' },
  { id: 4, name: 'Sarah Wilson', designation: 'Data Scientist', queueNumber: 4, status: 'done' },
];

const QueueManagement = () => {
  const [queue, setQueue] = useState(mockQueue);
  const [newPerson, setNewPerson] = useState({ name: '', designation: '' });
  const [filter, setFilter] = useState('all');

  const addToQueue = () => {
    if (newPerson.name && newPerson.designation) {
      const newEntry = {
        id: Date.now(),
        ...newPerson,
        queueNumber: queue.length + 1,
        status: 'waiting'
      };
      setQueue([...queue, newEntry]);
      setNewPerson({ name: '', designation: '' });
    }
  };

  const updateStatus = (id: number, status: string) => {
    setQueue(queue.map(person => 
      person.id === id ? { ...person, status } : person
    ));
  };

  const removePerson = (id: number) => {
    setQueue(queue.filter(person => person.id !== id));
  };

  const filteredQueue = filter === 'all' 
    ? queue 
    : queue.filter(person => person.status === filter);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'waiting':
        return <Badge variant="outline" className="text-yellow-700 border-yellow-300">Waiting</Badge>;
      case 'checked-in':
        return <Badge variant="outline" className="text-blue-700 border-blue-300">Checked In</Badge>;
      case 'done':
        return <Badge variant="outline" className="text-green-700 border-green-300">Done</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Queue Management</h1>

      {/* Add Person Form */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Add Person to Queue</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <Input
              placeholder="Name"
              value={newPerson.name}
              onChange={(e) => setNewPerson({...newPerson, name: e.target.value})}
            />
            <Input
              placeholder="Designation"
              value={newPerson.designation}
              onChange={(e) => setNewPerson({...newPerson, designation: e.target.value})}
            />
            <Button onClick={addToQueue}>
              <Plus className="h-4 w-4 mr-2" />
              Add to Queue
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Filters */}
      <div className="flex gap-2 mb-6">
        <Button 
          variant={filter === 'all' ? 'default' : 'outline'}
          onClick={() => setFilter('all')}
        >
          All
        </Button>
        <Button 
          variant={filter === 'waiting' ? 'default' : 'outline'}
          onClick={() => setFilter('waiting')}
        >
          Waiting
        </Button>
        <Button 
          variant={filter === 'checked-in' ? 'default' : 'outline'}
          onClick={() => setFilter('checked-in')}
        >
          Checked In
        </Button>
        <Button 
          variant={filter === 'done' ? 'default' : 'outline'}
          onClick={() => setFilter('done')}
        >
          Done
        </Button>
      </div>

      {/* Queue Table */}
      <Card>
        <CardHeader>
          <CardTitle>Queue List</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Queue #</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Designation</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredQueue.map((person) => (
                <TableRow key={person.id}>
                  <TableCell className="font-medium">#{person.queueNumber}</TableCell>
                  <TableCell>{person.name}</TableCell>
                  <TableCell>{person.designation}</TableCell>
                  <TableCell>{getStatusBadge(person.status)}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      {person.status === 'waiting' && (
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => updateStatus(person.id, 'checked-in')}
                        >
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Check In
                        </Button>
                      )}
                      {person.status === 'checked-in' && (
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => updateStatus(person.id, 'done')}
                        >
                          <Clock className="h-4 w-4 mr-1" />
                          Mark Done
                        </Button>
                      )}
                      <Button 
                        size="sm" 
                        variant="outline"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => removePerson(person.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default QueueManagement;
