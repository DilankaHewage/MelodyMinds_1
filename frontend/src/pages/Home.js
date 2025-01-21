
//dfhdjfdfkjkede
//jodsjfjsdfifj
import React, { useState } from 'react';
import EventCard from '../components/EventCard';
import DatePicker from 'react-datepicker'; // Importing react-datepicker
import 'react-datepicker/dist/react-datepicker.css'; // Importing react-datepicker CSS
import './Home.css'; // Add relevant CSS file for grid layout and filters

const events = [
  {
    id: 1,
    title: 'Ahas Yaathra Live in Colombo',
    date: '2024-11-09', // ISO format for better date handling
    time: '7 pm',
    venue: 'Waters Edge Outdoor',
    district: 'Colombo',
    poster: '/images/ahasyathracolombo.jpg',
  },
  {
    id: 2,
    title: 'Lankan Mega Carnival',
    date: '2024-11-24',
    time: '10 am - 8 pm',
    venue: 'Galle Face Green',
    district: 'Gampaha',
    poster: '/images/event2.jpg',
  },
  {
    id: 3,
    title: 'Rock Fest Colombo',
    date: '2024-01-07',
    time: '6 pm onwards',
    venue: 'Colombo City',
    district: 'Kandy',
    poster: '/images/event3.jpg',
  },
  {
    id: 4,
    title: 'Thala in Concert',
    date: '2024-12-15', // ISO format for better date handling
    time: '8 pm',
    venue: 'AIE Ground',
    district: 'Kandy',
    poster: '/images/ahasyathracolombo.jpg',
  },
  {
    id: 5,
    title: 'Nadagama',
    date: '2024-12-20', // ISO format for better date handling
    time: '8 pm',
    venue: 'Galle Face Green',
    district: 'Colombo',
    poster: '/images/event3.jpg',
  },
  {
    id: 6,
    title: 'X-Ban',
    date: '2024-12-21', // ISO format for better date handling
    time: '7 pm',
    venue: 'Bandaranayake College',
    district: 'Gampaha',
    poster: '/images/ahasyathracolombo.jpg',
  },
  {
    id: 7,
    title: 'Christmas Eve',
    date: '2024-12-24',
    time: '8 pm',
    venue: 'Galle Face Green',
    district: 'Colombo',
    poster: '/images/event2.jpg',
  },
  {
    id: 8,
    title: 'Nadagama',
    date: '2024-12-22',
    time: '6 pm onwards',
    venue: 'Miracle Dome',
    district: 'Kandy',
    poster: '/images/event3.jpg',
  },
  {
    id: 9,
    title: 'Murukku',
    date: '2024-12-26', // ISO format for better date handling
    time: '8 pm',
    venue: 'AIE Ground',
    district: 'Galle',
    poster: '/images/ahasyathracolombo.jpg',
  },
  {
    id: 10,
    title: 'Victorious',
    date: '2024-12-27', // ISO format for better date handling
    time: '8 pm',
    venue: 'Samanala Ground',
    district: 'Galle',
    poster: '/images/event3.jpg',
  },
  // Add more events as needed
];

const districts = [
  'Colombo', 'Gampaha', 'Kalutara', 'Kandy', 'Matale', 'Nuwara Eliya',
  'Galle', 'Matara', 'Hambantota', 'Jaffna', 'Kilinochchi', 'Mannar',
  'Vavuniya', 'Mullaitivu', 'Batticaloa', 'Ampara', 'Trincomalee',
  'Kurunegala', 'Puttalam', 'Anuradhapura', 'Polonnaruwa', 'Badulla',
  'Monaragala', 'Ratnapura', 'Kegalle'
];

function Home() {
  // State for filters and search
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedDistricts, setSelectedDistricts] = useState([]);
  const [isDistrictListVisible, setIsDistrictListVisible] = useState(false);

  // Filter and search events based on filters and search term
  const filteredEvents = events.filter(event => {
    const isSearchMatch = event.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const isDateMatch = selectedDate
      ? new Date(event.date).toDateString() === selectedDate.toDateString()
      : true;
    const isDistrictMatch = selectedDistricts.length > 0
      ? selectedDistricts.includes(event.district)
      : true;
    return isSearchMatch && isDateMatch && isDistrictMatch;
  });

  const handleDistrictChange = district => {
    setSelectedDistricts(prevState =>
      prevState.includes(district)
        ? prevState.filter(d => d !== district) // Remove if already selected
        : [...prevState, district] // Add if not already selected
    );
  };

  const clearFilters = () => {
    setSelectedDate(null);
    setSelectedDistricts([]);
    setSearchTerm('');
    setIsDistrictListVisible(false);
  };

  return (
    <div className="home-page">
      {/* Search Bar Section */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Explore Your Musical World"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Filter Section */}
      <div className="filter-section">
        <h2>Filter Events</h2>

        {/* Date Filter */}
        <div className="filter-date">
          <label>Select Date: </label>
          <DatePicker
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            dateFormat="dd/MM/yyyy"
            isClearable
            placeholderText="Select a Date"
          />
        </div>

        {/* District Filter */}
        <div className="filter-district">
          <label>Select District(s): </label>
          <button
            className="toggle-district-btn"
            onClick={() => setIsDistrictListVisible(!isDistrictListVisible)}
          >
            {isDistrictListVisible ? 'Hide District List' : 'Select District'}
          </button>
          {isDistrictListVisible && (
            <div className="district-list">
              {districts.map((district, index) => (
                <div key={index}>
                  <input
                    type="checkbox"
                    id={district}
                    value={district}
                    onChange={() => handleDistrictChange(district)}
                  />
                  <label htmlFor={district}>{district}</label>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Clear Filters */}
        <div className="clear-filters">
          <button onClick={clearFilters}>Clear Filters</button>
        </div>
      </div>

      {/* Event Cards */}
      <div className="event-grid">
        {filteredEvents.length > 0 ? (
          filteredEvents.map(event => (
            <EventCard key={event.id} event={event} />
          ))
        ) : (
          <p>No events match your filters</p>
        )}
      </div>
    </div>
  );
}

export default Home;
