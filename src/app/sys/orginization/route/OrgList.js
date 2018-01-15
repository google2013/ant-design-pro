import React, { Component } from 'react';
import { Table, Alert, Popconfirm, Divider, Badge, Button, Card, Input, Row, Col } from 'antd';
import { hasChildren } from '../../../../core/utils/DataHelper';

import styles from './Orginization.less';
import tableStyle from '../../../../core/style/Table.less';

const { Search } = { ...Input };

// 部门管理列表
export default class OrgList extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'orginization/listOrg',
    });
  }
  // 新增
  handleAdd = () => {
    const { dispatch } = this.props;
  };

  // 启用/停用
  handleEnable = () => {
    console.info('停用/启用');
  };

  // 删除
  handleDelete = () => {
    console.info('删除');
  };

  // 批量删除
  handleBatchDelete = () => {
    const { dispatch, selectedRowKeys, data } = this.props;
    const blockItem = hasChildren(data, selectedRowKeys);
    console.info(blockItem);
    // 存在子节点的不允许删除
  };

  // 编辑
  handleEdit = () => {
    console.info('编辑');
  };
  // 搜索
  handleSearch = (val) => {
    console.info(`搜索：${val}`);
  };
  // 行选
  handleSelectRows = (rows) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'orginization/updateState',
      payload: { selectedRowKeys: rows },
    });
  };

  render(){
    const { data, selectedRowKeys } = { ...this.props };

    const statusMap = ['error', 'success'];
    const status = ['已停用', '正常'];

    const column = [{
      title: '单位/部门名称',
      dataIndex: 'name',
    }, {
      title: '所属单位/部门',
      dataIndex: 'parent',
    }, {
      title: '排序',
      dataIndex: 'order',
    }, {
      title: '状态',
      dataIndex: 'status',
      render: (text) => {
        return <Badge status={statusMap[text]} text={status[text]} />;
      },
    }, {
      title: '操作',
      render: (text, record) => (
        <div>
          <a onClick={e => this.handleEdit(record, e)}>编辑</a>
          <Divider type="vertical" />
          <a onClick={e => this.handleAdd(record, e)}>添加下级</a>
        </div>
      ),
    }, {
      title: '是否启用',
      width: 150,
      render: (text, record) => (
        <div>
          {record.status === '0' ?
            <a onClick={e => this.handleEnable(record, e, '1')}>启用</a>
            : <a onClick={e => this.handleEnable(record, e, '0')}>停用</a>}
          <Divider type="vertical" />
          <a onClick={e => this.handleDelete(record, e)}>删除</a>
        </div>
      ),
    }];

    const rowSelection = {
      fixed: true,
      selectedRowKeys,
      onChange: (selectedKeys) => {
        this.handleSelectRows(selectedKeys);
      },
    };

    return (
      <Card bordered={false}>
        <Row gutter={24} type="flex" justify="space-between" className={tableStyle.tableActionBtn}>
          <Col xl={6} lg={6} md={6} sm={6} xs={6}>
            <div>
              <Button icon="plus" type="primary" onClick={() => this.handleAdd()}>新增</Button>
              {
                selectedRowKeys.length > 0 && (
                  <span>
                  <Popconfirm title="确定要删除选中的条目吗?" placement="top" onConfirm={() => this.handleBatchDelete()}>
                    <Button>删除菜单</Button>
                  </Popconfirm>
                </span>
                )
              }
            </div>
          </Col>
          <Col xl={6} lg={6} md={6} sm={6} xs={6} offset={12}>
            <Search
              placeholder="输入组织名称以搜索"
              onSearch={value => this.handleSearch(value)}
              style={{ width: '100%' }}
            />
          </Col>
        </Row>
        {/* 已选提示 */}
        <Alert
          className={tableStyle.tableAlert}
          message={(
            <div>
              已选择
              已选择 <a style={{ fontWeight: 600 }}>{selectedRowKeys.length}</a> 项&nbsp;&nbsp;
              <a style={{ marginLeft: 24 }} onClick={() => this.handleSelectRows([])}>清空选择</a>
            </div>
          )}
          type="info"
          showIcon
        />
        {/* 列表 */}
        <Table
          columns={column}
          dataSource={data}
          rowClassName={(record) => {
            return record.status === '0' ? styles.disabled : styles.enabled;
          }}
          rowKey={record => record.key}
          rowSelection={rowSelection}
        />
      </Card>
    );
  }
};
