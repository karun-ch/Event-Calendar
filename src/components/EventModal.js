import React, { useState, useEffect } from 'react';

export default function EventModal({
  close,
  date,
  addEvent,
  updateEvent,
  deleteEvent,
  editingEvent,
}) {
  const [title, setTitle] = useState('');
  const [time, setTime] = useState('');
  const [description, setDescription] = useState('');
  const [recurrence, setRecurrence] = useState('None');
  const [color, setColor] = useState('#2196F3');

  useEffect(() => {
    if (editingEvent) {
      setTitle(editingEvent.title);
      setTime(editingEvent.time);
      setDescription(editingEvent.description);
      setRecurrence(editingEvent.recurrence);
      setColor(editingEvent.color);
    }
  }, [editingEvent]);

  const handleSubmit = () => {
    const newEvent = {
      id: editingEvent ? editingEvent.id : Date.now(),
      title,
      date: date,
      time,
      description,
      recurrence,
      color,
    };
    editingEvent ? updateEvent(newEvent) : addEvent(newEvent);
    close();
  };

  const handleDelete = () => {
    if (editingEvent) deleteEvent(editingEvent.id);
    close();
  };

  return (
    <div className="modal">
      <h3>{editingEvent ? 'Edit Event' : 'Add Event'}</h3>
      <input
        type="text"
        placeholder="Event Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="time"
        value={time}
        onChange={(e) => setTime(e.target.value)}
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      ></textarea>
      <select value={recurrence} onChange={(e) => setRecurrence(e.target.value)}>
        <option>None</option>
        <option>Daily</option>
        <option>Weekly</option>
        <option>Monthly</option>
      </select>
      <input type="color" value={color} onChange={(e) => setColor(e.target.value)} />
      <button onClick={handleSubmit}>{editingEvent ? 'Update' : 'Add'} Event</button>
      {editingEvent && <button onClick={handleDelete}>Delete</button>}
      <button onClick={close}>Cancel</button>
    </div>
  );
}
