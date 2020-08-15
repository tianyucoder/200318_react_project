import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  Alert,
  Table as AntdTable,
} from "antd";
import {
  InfoCircleOutlined,
} from "@ant-design/icons";
import screenfull from "screenfull";

import "./index.less";


class Table extends Component {
  static propTypes = {
    container: PropTypes.any,
    title: PropTypes.string,
    extra: PropTypes.array,
    selectedRowKeys: PropTypes.array,
    onSelectChange: PropTypes.func,
    onRefresh: PropTypes.func,
  };

  static defaultProps = {
    onSelectChange: () => {},
    onRefresh: () => {},
  };

  state = {
    isScreenfull: false,
    checkedList: [], // 选择列
    plainOptions: [], // 全部列
    indeterminate: false,
    checkAll: true,
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    const plainOptions = nextProps.columns.map((item) => item.title);

    for (let i = 0; i < plainOptions.length; i++) {
      const prevItem = prevState.plainOptions[i];
      const nextItem = plainOptions[i];

      if (prevItem !== nextItem) {
        return {
          checkedList: plainOptions,
          plainOptions,
        };
      }
    }

    return null;
  }

  onCheckAllChange = (e) => {
    this.setState({
      checkedList: e.target.checked ? this.state.plainOptions : [],
      indeterminate: false,
      checkAll: e.target.checked,
    });
  };

  onCheckChange = (checkedList) => {
    const { plainOptions } = this.state;

    const isCheckAll = plainOptions.length === checkedList.length;

    this.setState({
      checkedList,
      indeterminate:
        !!checkedList.length && checkedList.length < plainOptions.length,
      checkAll: isCheckAll,
    });
  };

  resetCheckbox = () => {
    const { plainOptions } = this.state;
    this.setState({
      checkedList: plainOptions,
      indeterminate: false,
      checkAll: true,
    });
  };

  screenFull = () => {
    const { container } = this.props;
    const { isScreenfull } = this.state;
    if (isScreenfull) {
      screenfull.exit();
    } else {
      screenfull.request(container.current);
    }
  };

  screenfullChange = () => {
    const { isScreenfull } = this.state;
    this.setState({
      isScreenfull: !isScreenfull,
    });
  };

  componentDidMount() {
    screenfull.on("change", this.screenfullChange);
  }

  componentWillUnmount() {
    screenfull.off("change", this.screenfullChange);
  }

  render() {
    const {
      title,
      extra,
      selectedRowKeys,
      onSelectChange,
      onRefresh,
      columns,
      ...props
    } = this.props;

    const {
      checkedList,
    } = this.state;

    const btnsWidth = 80 + extra.length * 100;

    const rowSelection = {
      selectedRowKeys,
      onChange: onSelectChange,
    };


    const currentColumns = columns.filter(
      (item) => checkedList.indexOf(item.title) > -1
    );

    return (
      <div className="table-header-wrap">
        <div className="table-header">
          <h3>{title}</h3>
          <div className="table-header-btns" style={{ width: btnsWidth }}>
            {extra}
          </div>
        </div>
        <Alert
          message={
            <span>
              <InfoCircleOutlined className="table-header-icon" />
              {`已选择 ${selectedRowKeys.length} 项`}
            </span>
          }
          type="info"
          className="table-alert"
        />
        <AntdTable
          {...props}
          columns={currentColumns}
          rowSelection={rowSelection}
        />
      </div>
    );
  }
}

export default Table;
