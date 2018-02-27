import React, { Component } from 'react';
import { connect } from 'react-redux';
//import { bindActionCreators } from 'redux';
import { addReminder, deleteReminder, clearReminders } from './actions';
import moment from 'moment';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: '',
      dueDate: ''
    }
  }

  addReminder() {
    this.props.addReminder(this.state.text, this.state.dueDate);

    this.setState({
      text: '',
      dueDate: ''
    });
  }

  deleteReminder(id) {
    this.props.deleteReminder(id);
  }

  renderReminders() {
    const { reminders } = this.props;
    return (
      <ul className="list-group">
        {
          reminders.map(reminder => {
            return (
              <li key={reminder.id} className="list-group-item">
                <div className="list-item">
                  <div>{reminder.text}</div>
                  <div><em>{moment(new Date(reminder.dueDate)).fromNow()}</em></div>
                </div>
                <div
                  className="list-item delete-button"
                  onClick={() => this.deleteReminder(reminder.id)}
                  >
                    &#x2715;
                  </div>
              </li>
            )
          })
        }
      </ul>
    );
  }

  render() {
    return (
      <div className="App">
        <div className="title">
          Reminder
        </div>
        <div className="form-inline reminder-form">
          <div className="form-group">
              <input
                className="form-control"
                placeholder="I have to..."
                value={this.state.text}
                onChange={event => this.setState({ text: event.target.value })}
              />
              <input
                className="form-control"
                type="datetime-local"
                value={this.state.dueDate}
                onChange={event => this.setState({ dueDate: event.target.value })}
              />  
          </div>
          <button
            type="button"
            className="btn btn-success"
            onClick={() => this.addReminder()}
          >Add reminder</button>
        </div>
        <div className="reminder-wrap">
          { this.renderReminders() }
        </div>
        <div className="btn btn-danger" onClick={() => this.props.clearReminders()}>
          Clear Reminders
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    reminders: state
  }
}

/*function mapDispatchToProps(dispatch) {
  return bindActionCreators({ addReminder, removeReminder }, dispatch);
}*/

export default connect(mapStateToProps, { addReminder, deleteReminder, clearReminders })(App);
