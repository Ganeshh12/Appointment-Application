import {Component} from 'react'
import './index.css'

class AppointmentItem extends Component {
  star = () => {
    const {deets, starAnAppointment} = this.props
    const {id} = deets
    starAnAppointment(id)
  }

  render() {
    const {deets} = this.props
    const {title, date, isStarred} = deets
    const url = isStarred
      ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'
    return (
      <li>
        <div className="first-flex">
          <p className="appointment-title">{title}</p>
          <div>
            <button type="button" data-testid="star" className="star-button">
              <img
                className="star-image"
                src={url}
                alt="star"
                onClick={this.star}
              />
            </button>
          </div>
        </div>
        <p className="appointment-date">{date}</p>
      </li>
    )
  }
}

export default AppointmentItem
