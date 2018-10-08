import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Icon, Menu } from 'antd';

export default class MenuMarkup extends PureComponent {
  static propTypes = {
    isMobile: PropTypes.bool.isRequired,
    showMenu: PropTypes.bool.isRequired,
    activeLinkKey: PropTypes.string.isRequired,
    onLinkClick: PropTypes.func.isRequired,
  }
  render() {
    return (
      this.props.showMenu ?
        <Menu
          onClick={this.props.onLinkClick}
          selectedKeys={[this.props.activeLinkKey]}
          mode={this.props.isMobile ? 'vertical' : 'horizontal'}
          style={{ background: 'transparent', borderBottom: '0' }}
        >
          <Menu.Item key="/" style={{ width: this.isMobile ? '100%' : null }}>
            <Icon type="dot-chart" />基础模块
          </Menu.Item>
          <Menu.Item key="/advanced" style={{ width: this.isMobile ? '100%' : null }}>
            <Icon type="appstore-o" />进阶模块
          </Menu.Item>
          <Menu.Item key="/templates" style={{ width: this.isMobile ? '100%' : null }}>
            <Icon type="gift" />模版
          </Menu.Item>
        </Menu>
        : null
    );
  }
}

