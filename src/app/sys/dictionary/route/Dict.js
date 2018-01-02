import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Row, Col, Card } from 'antd';
import PageHeaderLayout from '../../../../core/layouts/PageHeaderLayout';

@connect( state => ({
    dict: state.dict
}))
export default class Dict extends PureComponent {
  componentDidMount() {

  }

  render() {
    return (
      <PageHeaderLayout title="字典信息管理">

        <Row gutter={24} style={{ background: '#ffffff'}}>
          {/*左侧列表*/}
          <Col xl={6} lg={6} md={6} sm={6} xs={6}>
            左侧列表
          </Col>
          {/*右-上-字典键值列表*/}
          {/*右-下-字典键值新增/编辑区域*/}
          <Col xl={18} lg={18} md={18} sm={18} xs={18}>
            右侧明细
          </Col>
        </Row>

      </PageHeaderLayout>
    )
  }
}