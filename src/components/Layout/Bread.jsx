import React from 'react'
import PropTypes from 'prop-types'
import { Breadcrumb } from 'antd'
import './Bread.css'

const Bread = ({ routes, params }) => (
  <div className="App-bread">
    <Breadcrumb routes={routes} params={params} />
  </div>
)

Bread.propTypes = {
  routes: PropTypes.arrayOf(Object).isRequired,
  params: PropTypes.shape(Object).isRequired,
}

export default Bread
