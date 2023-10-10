npm install @mui/material @emotion/react @emotion/styled


import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';

interface DatePickerRangeProps {
  onStartDateSelect: (date: Date | null) => void;
  onEndDateSelect: (date: Date | null) => void;
}

const DatePickerRangeComponent: React.FC<DatePickerRangeProps> = ({ onStartDateSelect, onEndDateSelect }) => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const handleStartDateChange = (date: Date | null) => {
    setStartDate(date);
    onStartDateSelect(date);
  };

  const handleEndDateChange = (date: Date | null) => {
    setEndDate(date);
    onEndDateSelect(date);
  };

  return (
    <div>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
          label="Start Date"
          value={startDate}
          onChange={handleStartDateChange}
          renderInput={(params) => <TextField {...params} />}
        />
        <DatePicker
          label="End Date"
          value={endDate}
          onChange={handleEndDateChange}
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>
    </div>
  );
};

export default DatePickerRangeComponent;


import React, { useState } from 'react';
import DatePickerRangeComponent from './DatePickerRangeComponent';

const ParentComponent: React.FC = () => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const handleStartDateSelect = (date: Date | null) => {
    setStartDate(date);
  };

  const handleEndDateSelect = (date: Date | null) => {
    setEndDate(date);
  };

  return (
    <div>
      <h2>Selected Start Date: {startDate ? startDate.toDateString() : 'No start date selected'}</h2>
      <h2>Selected End Date: {endDate ? endDate.toDateString() : 'No end date selected'}</h2>
      <DatePickerRangeComponent
        onStartDateSelect={handleStartDateSelect}
        onEndDateSelect={handleEndDateSelect}
      />
    </div>
  );
};

export default ParentComponent;


const dayjs = require('dayjs');

const date = dayjs(); // 创建一个 Day.js 时间对象（当前时间）
const formattedDate = date.format('YYYY-MM-DD HH:mm:ss'); // 将时间对象格式化为字符串

console.log(formattedDate); // 输出格式化后的时间字符串



