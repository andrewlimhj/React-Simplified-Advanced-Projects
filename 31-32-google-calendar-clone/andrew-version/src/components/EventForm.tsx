import { Dispatch, FormEventHandler, SetStateAction } from 'react';

type EventFormProps = {
  handleSubmit: FormEventHandler<HTMLFormElement>;
  setAllDay: Dispatch<SetStateAction<boolean>>;
  name?: string;
  allDay?: boolean;
  startTime?: Date;
  endTime?: Date;
  color?: string;
};

export function EventForm({
  handleSubmit,
  setAllDay,
  name,
  allDay,
  startTime,
  endTime,
  color,
}: EventFormProps) {
  return (
    <>
      <div className='modal'>
        <div className='overlay'></div>
        <div className='modal-body'>
          <div className='modal-title'>
            <div>Add Event</div>
            <small>6/8/23</small>
            <button className='close-btn'>&times;</button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className='form-group'>
              <label htmlFor='name'>Name</label>
              <input type='text' name='name' id='name' />
            </div>
            <div className='form-group checkbox'>
              <input
                type='checkbox'
                name='all-day'
                id='all-day'
                onChange={(e) => setAllDay(e.target.checked)}
              />
              <label htmlFor='all-day'>All Day?</label>
            </div>
            <div className='row'>
              <div className='form-group'>
                <label htmlFor='start-time'>Start Time</label>
                <input type='time' name='start-time' id='start-time' />
              </div>
              <div className='form-group'>
                <label htmlFor='end-time'>End Time</label>
                <input type='time' name='end-time' id='end-time' />
              </div>
            </div>
            <div className='form-group'>
              <label>Color</label>
              <div className='row left'>
                <input
                  type='radio'
                  name='color'
                  value='blue'
                  id='blue'
                  checked
                  className='color-radio'
                />
                <label htmlFor='blue'>
                  <span className='sr-only'>Blue</span>
                </label>
                <input
                  type='radio'
                  name='color'
                  value='red'
                  id='red'
                  className='color-radio'
                />
                <label htmlFor='red'>
                  <span className='sr-only'>Red</span>
                </label>
                <input
                  type='radio'
                  name='color'
                  value='green'
                  id='green'
                  className='color-radio'
                />
                <label htmlFor='green'>
                  <span className='sr-only'>Green</span>
                </label>
              </div>
            </div>
            <div className='row'>
              <button className='btn btn-success' type='submit'>
                Add
              </button>
              <button className='btn btn-delete' type='button'>
                Delete
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
