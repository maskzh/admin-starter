import React, { PropTypes } from 'react'
import { Breadcrumb, Icon } from 'antd'
import { camelize } from 'humps'
import menu from '../../../config/menu'
import './style.css'

const pathSet = []

const getPathSet = (menuArray, parentPath = '/') =>
  menuArray.forEach((item) => {
    pathSet[camelize((parentPath + item.key).replace(/\//g, '-'))] = {
      path: parentPath + item.key,
      name: item.name,
      icon: item.icon || '',
    }
    if (item.child) {
      getPathSet(item.child, `${parentPath}${item.key}/`)
    }
  })

getPathSet(menu)

const Bread = ({ location }) => {
  const pathNames = []

  location.pathname.substr(1).split('/').forEach((item, key) => {
    if (key > 0) {
      pathNames.push(camelize(`${pathNames[key - 1]}-${item}`))
    } else {
      pathNames.push(camelize(`-${item}`))
    }
  })

  const breads = pathNames.map((item, key) =>
    <Breadcrumb.Item key={key} {...pathNames.length - 1 === key ? '' : { href: `#${pathSet[item].path}` }}>
      {pathSet[item].icon
        ? <Icon type={pathSet[item].icon} />
        : ''}
      <span>{pathSet[item].name}</span>
    </Breadcrumb.Item>,
  )

  return (
    <div className="App-bread">
      <Breadcrumb>
        <Breadcrumb.Item href="#/"><Icon type="home" />
          <span>主页</span>
        </Breadcrumb.Item>
        {breads}
      </Breadcrumb>
    </div>
  )
}

Bread.propTypes = {
  location: PropTypes.shape(Object),
}

export default Bread
