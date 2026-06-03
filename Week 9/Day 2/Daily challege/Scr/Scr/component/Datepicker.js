import React from 'react';
import { connect } from 'react-redux';
import { selectDay } from '../redux/actions';

function DatePicker({ selectedDay, dispatchSelectDay }) {
  return (
    <div className="date-picker-box">
      <label htmlFor="planner-date" className="date-label">Target Planning Day:</label>
      <input
        id="planner-date"
        type="date"
        value={selectedDay}
        onChange={(e) => dispatchSelectDay(e.target.value)}
        className="date-input"
      />
    </div>
  );
}

const mapStateToProps = (state) => ({
  selectedDay: state.selectedDay,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchSelectDay: (dateString) => dispatch(selectDay(dateString)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DatePicker);
