import {
  eachDayOfInterval,
  format,
  startOfWeek,
  startOfMonth,
  endOfWeek,
  endOfMonth,
  subMonths,
  addMonths,
  isSameWeek,
  isSameMonth,
  isPast,
  addDays,
  isToday,
} from 'date-fns';
import { FormEvent, useState } from 'react';
import { EventForm } from './EventForm';

export function DatePicker() {
  const [visibleMonth, setVisibleMonth] = useState<Date>(new Date());
  const [isFormVisible, setIsFormVisible] = useState<boolean>(false);
  const [name, setName] = useState<string>();
  const [allDay, setAllDay] = useState<boolean>(false);
  const [startTime, setStartTime] = useState<Date>(new Date());
  const [endTime, setEndTime] = useState<Date>(new Date());
  const [color, setColor] = useState<string>();

  console.log(name);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = e.currentTarget;
    const formElements = form.elements as typeof form.elements & {
      name: { value: string };
      startTime: { value: Date };
      endTime: { value: Date };
      color: { value: string };
    };

    console.log(formElements.name.value);
    // console.log(formElements.allDay.checked);
    // console.log(allDay);
    // console.log(formElements.startTime.value);
    // console.log(formElements.endTime.value);
    // console.log(formElements.color.value);
  }

  const visibleDates = eachDayOfInterval({
    start: startOfWeek(startOfMonth(visibleMonth)),
    end: endOfWeek(endOfMonth(visibleMonth)),
  });

  function showPrevMonth() {
    setVisibleMonth((currentMonth) => {
      return subMonths(currentMonth, 1);
    });
  }

  function showNextMonth() {
    setVisibleMonth((currentMonth) => {
      return addMonths(currentMonth, 1);
    });
  }

  function showToday() {
    return setVisibleMonth(new Date());
  }

  return (
    <>
      <div className='header'>
        <button className='btn' onClick={showToday}>
          Today
        </button>
        <div>
          <button className='month-change-btn' onClick={showPrevMonth}>
            &lt;
          </button>
          <button className='month-change-btn' onClick={showNextMonth}>
            &gt;
          </button>
        </div>
        <span className='month-title'>{format(visibleMonth, 'MMMM yyyy')}</span>
      </div>
      <div className='days'>
        {visibleDates.map((day, index) => {
          return (
            <div
              key={index}
              className={`day ${
                !isSameMonth(day, visibleMonth) ? 'non-month-day' : ''
              } ${isPast(addDays(day, 1)) ? 'old-month-day' : ''}`}
            >
              <div className='day-header'>
                {isSameWeek(startOfWeek(startOfMonth(visibleMonth)), day) && (
                  <div className='week-name'>{format(day, 'EEE')}</div>
                )}
                <div className={`day-number ${isToday(day) ? 'today' : ''}`}>
                  {format(day, 'd')}
                </div>
                <button
                  className='add-event-btn'
                  onClick={() => setIsFormVisible(true)}
                >
                  +
                </button>
              </div>
            </div>
          );
        })}
        {isFormVisible && (
          <EventForm
            name={name}
            allDay={allDay}
            startTime={startTime}
            endTime={endTime}
            color={color}
            handleSubmit={handleSubmit}
            setAllDay={setAllDay}
          />
        )}
      </div>
    </>
  );
}
