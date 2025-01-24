import React from 'react';

import './EventCard.css'; // Add relevant CSS file for styling

function EventCard({ event }) {
  return (
    <div className="event-card">
      <img src={event.poster} alt={event.title} className="event-poster" />
      <div className="event-details">
        <h2>{event.title}</h2>
        <p>Date: {event.date}</p>
        <p>Time: {event.time}</p>
        <p>Venue: {event.venue}</p>
        <p>District: {event.district}</p>
      </div>
      <div className="event-actions">
        <button className="favorite-button">
          <i className="fas fa-heart"></i>
        </button>
        <button className="comment-button">
          <i className="fas fa-comment"></i>
        </button>
      </div>
    </div>
  );
}

export default EventCard;
