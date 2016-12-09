import React, { PropTypes } from 'react'
import './style.css'

const Dot = ({ type = 'default' }) =>
  <i className={`Dot Dot-${type}`}>&#8226;</i>

Dot.propTypes = {
  type: PropTypes.string,
}

export default Dot
