import React, { useState } from 'react';

const SearchComponent = ({ employees, setFilteredData }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredDataLocal] = useState([]);

  const handleSearch = () => {
    if (searchQuery.trim() === '') {
      setFilteredDataLocal([]); // Clear filteredData
    } else {
      const filtered = employees.filter(employee =>
        employee.empName.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredDataLocal(filtered);
    }
  };

  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="Search by employee name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      <ul>
        {filteredData.length > 0 ? (
          filteredData.map((employee, index) => (
            <li key={index}>
              {employee.empId}<br />
              {employee.empName}
            </li>
          ))
        ) : (
          employees.map((employee, index) => (
            <li key={index}>
              {employee.empId}<br />
              {employee.empName}
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default SearchComponent;