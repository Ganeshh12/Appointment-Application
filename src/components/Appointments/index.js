import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import AppointmentItem from '../AppointmentItem'
import './index.css'

class Appointments extends Component {
  state = {
    title: '',
    date: '',
    appointmentsList: [
      {id: uuidv4(), title: 'eat', date: '2025-19-20', isStarred: false},
      {id: uuidv4(), title: 'eat', date: '2025-19-20', isStarred: false},
      {id: uuidv4(), title: 'eat', date: '2025-19-20', isStarred: false},
      {id: uuidv4(), title: 'eat', date: '2025-19-20', isStarred: false},
      {id: uuidv4(), title: 'eat', date: '2025-19-20', isStarred: false},
      {id: uuidv4(), title: 'eat', date: '2025-19-20', isStarred: false},
      {id: uuidv4(), title: 'eat', date: '2025-19-20', isStarred: false},
      {id: uuidv4(), title: 'eat', date: '2025-19-20', isStarred: false},
    ],
    isButtonStarred: false,
  }

  changeTitle = event => {
    const newTitle = event.target.value
    this.setState({title: newTitle})
  }

  setStarred = () => {
    this.setState(prev => ({isButtonStarred: !prev.isButtonStarred}))
  }

  changeDate = event => {
    const newDate = event.target.value
    this.setState({date: newDate})
  }

  starAnAppointment = id => {
    this.setState(prev => ({
      appointmentsList: prev.appointmentsList.map(ele => {
        if (ele.id === id) {
          return {...ele, isStarred: !ele.isStarred}
        }
        return ele
      }),
    }))
  }

  addAppointment = event => {
    event.preventDefault()
    const {title, date} = this.state
    if (title !== '' && date !== '') {
      const dateObj = new Date(date)
      const day = dateObj.getDate()
      const month = dateObj.toLocaleString('default', {month: 'long'})
      const year = dateObj.getFullYear()
      const weekday = dateObj.toLocaleString('default', {weekday: 'long'})
      const formattedDate = `Date: ${day} ${month} ${year}, ${weekday}`
      const newAppointment = {
        id: uuidv4(),
        title,
        date: formattedDate,
        isStarred: false,
      }
      this.setState(prev => ({
        appointmentsList: [...prev.appointmentsList, newAppointment],
        title: '',
        date: '',
      }))
    }
  }

  filterStarred = () => {
    const {appointmentsList} = this.state
    const filterIt = appointmentsList.filter(ele => ele.isStarred === true)
    return filterIt
  }

  render() {
    const {title, date, appointmentsList, isButtonStarred} = this.state
    const list = isButtonStarred ? this.filterStarred() : appointmentsList
    const style = isButtonStarred ? 'starred-button' : 'not-starred-button'
    return (
      <div className="main">
        <div className="inner-container">
          <div className="inner-innner-container">
            <div className="first-div">
              <h1>Add Appointment</h1>
              <form onSubmit={this.addAppointment}>
                <label htmlFor="title">TITLE</label>
                <br />
                <input
                  value={title}
                  id="title"
                  type="text"
                  placeholder="Title"
                  onChange={this.changeTitle}
                />
                <br />
                <label htmlFor="date">DATE</label>
                <br />
                <input
                  value={date}
                  id="date"
                  type="date"
                  onChange={this.changeDate}
                />
                <br />
                <button type="submit" className="add-button">
                  Add
                </button>
              </form>
            </div>
            <div>
              <img
                src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
                alt="appointments"
              />
            </div>
          </div>
          <hr />
          <div className="appointments-container">
            <div className="appointments-container-flex-1">
              <h1>Appointments</h1>
              <div>
                <button
                  className={style}
                  type="button"
                  onClick={this.setStarred}
                >
                  Starred
                </button>
              </div>
            </div>
            <ul>
              {list.map(ele => (
                <AppointmentItem
                  deets={ele}
                  key={ele.id}
                  starAnAppointment={this.starAnAppointment}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default Appointments
