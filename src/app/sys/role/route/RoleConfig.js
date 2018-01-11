import React, { Component } from 'react';
import { Modal, Switch, List } from 'antd';
// 权限参数配置
export default class RoleConfig extends Component {

  render() {
    const { operateType, data, loading } = this.props;
    return (
      <Modal visible={operateType==='config'}
             title="选择授权参数"
             okText="保存"
             cancelText="取消"
             onCancel={() => this.props.handleCancel()}
             width={400}
             bodyStyle={ { height:480,overflowY: 'auto',overflowX: 'auto' }}>
        <List
          dataSource={data}
          loading={loading}
          itemLayout="horizontal"
          split={false}
          renderItem = { (item) => (
            <List.Item>
              <List.Item.Meta title={item.keyName} />
              <div>
                <Switch key={item.id} checkedChildren="启用" unCheckedChildren="关闭" checked={item.checked} />
              </div>
            </List.Item>
          )
        }/>

      </Modal>
    )
  }
}
