import React from 'react';

const SearchField = ({ value, onChange, disabled }) => {
  // Input
  const input = (
    <input 
      className="form-control form-control-lg"
      type="search"
      disabled={disabled}
      value={value}
      onChange={onChange}
      placeholder="Search for a planet" />
  )

  return (
    <div className="form-group">
      {/* Input */}
      {input}
    </div>
  )
}

export default SearchField;