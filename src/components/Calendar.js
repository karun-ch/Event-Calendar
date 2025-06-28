import React, { useState } from 'react';
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  addMonths,
  subMonths,
  isSameMonth,
  isSameDay,
} from 'date-fns';

export default function Calendar({ events, openModal }) {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));

  const renderHeader = () => (
    <div className="header row flex-middle">
      <div className="col col-start">
        <div className="icon" onClick={prevMonth}>
          ‹
        </div>
      </div>
      <div className="col col-center">
        <span>{format(currentMonth, 'MMMM yyyy')}</span>
      </div>
      <div className="col col-end" onClick={nextMonth}>
        <div className="icon">›</div>
      </div>
    </div>
  );

  const renderDays = () => {
    const days = [];
    const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    for (let i = 0; i < 7; i++) {
      days.push(
        <div className="col col-center" key={i}>
          {weekDays[i]}
        </div>
      );
    }

    return <div className="days row">{days}</div>;
  };

  const renderCells = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const rows = [];
    let days = [];
    let day = startDate;

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        const cloneDay = day;
        days.push(
          <div
            className={`col cell ${
              !isSameMonth(day, monthStart)
                ? 'disabled'
                : isSameDay(day, new Date())
                ? 'today'
                : ''
            }`}
            key={day}
            onClick={() => openModal(cloneDay)}
          >
            <span className="number">{format(day, 'd')}</span>
            <div className="events">
              {events
                .filter(
                  (e) =>
                    format(new Date(e.date), 'yyyy-MM-dd') ===
                    format(day, 'yyyy-MM-dd')
                )
                .map((e) => (
                  <div
                    key={e.id}
                    className="event-item"
                    style={{ background: e.color || '#2196F3' }}
                    onClick={(ev) => {
                      ev.stopPropagation();
                      openModal(cloneDay, e);
                    }}
                  >
                    {e.title}
                  </div>
                ))}
            </div>
          </div>
        );
        day = addDays(day, 1);
      }
      rows.push(
        <div className="row" key={day}>
          {days}
        </div>
      );
      days = [];
    }

    return <div className="body">{rows}</div>;
  };

  return (
    <div className="calendar">
      {renderHeader()}
      {renderDays()}
      {renderCells()}
    </div>
  );
}
