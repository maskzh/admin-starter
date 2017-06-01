import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { routerRedux } from 'dva/router'
import { Button } from 'antd'
import Detail from '../components/User/Detail'


const UserDetail = ({ dispatch, location }) => {
  const { state: data } = location

  const back = () => dispatch(routerRedux.goBack())

  return (
    <div className="App-content-inner">
      <div className="flex pb15 mb20 bb1">
        <h2 className="flex1">客户详情</h2>
        <div>
          <Button type="default" icon="left" onClick={back}>返回</Button>
        </div>
      </div>
      {data && <Detail data={data} />}
    </div>
  )
}

UserDetail.propTypes = {
  location: PropTypes.shape(Object),
  dispatch: PropTypes.func,
}

export default connect()(UserDetail)
