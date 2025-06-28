import React, { useState, useEffect } from 'react';
import Calendar from './components/Calendar';
import EventModal from './components/EventModal';
import './App.css';

export default function App() {
  const [events, setEvents] = useState(() => {
    const saved = localStorage.getItem('events');
    return saved ? JSON.parse(saved) : [];
  });

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [editingEvent, setEditingEvent] = useState(null);

  useEffect(() => {
    localStorage.setItem('events', JSON.stringify(events));
  }, [events]);

  const addEvent = (event) => {
    setEvents([...events, event]);
  };

  const updateEvent = (updatedEvent) => {
    const updatedEvents = events.map((e) =>
      e.id === updatedEvent.id ? updatedEvent : e
    );
    setEvents(updatedEvents);
  };

  const deleteEvent = (id) => {
    setEvents(events.filter((e) => e.id !== id));
  };

  return (
    <div className="App">
      <h1>📅 Event Calendar</h1>
      <Calendar
        events={events}
        openModal={(date, event = null) => {
          setSelectedDate(date);
          setEditingEvent(event);
          setModalOpen(true);
        }}
      />
      {modalOpen && (
        <EventModal
          close={() => setModalOpen(false)}
          date={selectedDate}
          addEvent={addEvent}
          updateEvent={updateEvent}
          deleteEvent={deleteEvent}
          editingEvent={editingEvent}
        />
      )}
    </div>
  );
}
