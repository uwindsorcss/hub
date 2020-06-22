import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

const Hello = props => (
  <div>{props.name}</div>
)

Hello.defaultProps = {
  name: 'Aman'
}

Hello.propTypes = {
  name: PropTypes.string
}

export default Hello