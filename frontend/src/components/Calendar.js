import '../assets/css/Calendar.css';
import React, { forwardRef } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FaCalendarAlt } from 'react-icons/fa';

// Define the CustomInput component
function CustomInput({ value, onClick }, ref) {
  return (
    <div className='input-group'>
      <input
        type='text'
        className='form-control'
        value={value}
        onClick={onClick}
        readOnly
      />
      <div className='input-group-append'>
        <span className='input-group-text'>
          <FaCalendarAlt />
        </span>
      </div>
    </div>
  );
}

// Export CustomInput as a named export
export { CustomInput };

