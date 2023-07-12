import {
  startOfToday,
  format,
  startOfMonth,
  endOfMonth,
  getDaysInMonth,
  isToday,
  addMonths,
  subMonths,
  parse,
} from 'date-fns';
import { useState } from 'react';

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [date, setDate] = useState(startOfToday());
  const [month, setMonth] = useState(date);
  const daysInMonth = getDaysInMonth(month);
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const monthObj = [];

  // console.log(monthObj);

  for (let i = 1; i <= daysInMonth; i++) {
    monthObj.push({
      day: i,
      month: format(date, 'MMMM'),
      year: format(date, 'yyyy'),
      selected: false,
    });
  }

  function handleClick() {
    return setIsOpen((isOpen) => !isOpen);
  }

  function handleMonthClick(e) {
    if (e.target.className === 'next-month-button month-button')
      return setMonth(addMonths(month, 1));
    if (e.target.className === 'prev-month-button month-button')
      return setMonth(subMonths(month, 1));
  }

  function handleDayClick(e) {
    const dayButtons = Array.from(document.getElementsByClassName('date'));
    dayButtons.forEach((button) => {
      button.classList.remove('selected');
    });

    const findDay = (monthObj.find(
      (month) => month.day == e.currentTarget.value
    ).selected = true);

    return e.currentTarget.classList.add('selected');
  }

  return (
    <div className='date-picker-container'>
      <button onClick={handleClick} className='date-picker-button'>
        {format(date, 'LLLL do, yyyy')}
      </button>

      {isOpen && (
        <div className='date-picker '>
          <div className='date-picker-header'>
            <button
              className='prev-month-button month-button'
              onClick={handleMonthClick}
            >
              &larr;
            </button>
            <div className='current-month'>{format(month, 'LLLL - yyyy')}</div>
            <button
              value='next'
              className='next-month-button month-button'
              onClick={handleMonthClick}
            >
              &rarr;
            </button>
          </div>
          <div className='date-picker-grid-header date-picker-grid'>
            {days.map((day) => {
              return <div key={days.indexOf(day)}>{day}</div>;
            })}
          </div>
          <div className='date-picker-grid-dates date-picker-grid'>
            {monthObj.map((date) => {
              return (
                <button
                  value={date.day}
                  onClick={handleDayClick}
                  className={`date`}
                  key={monthObj.indexOf(date)}
                >
                  {date.day}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
