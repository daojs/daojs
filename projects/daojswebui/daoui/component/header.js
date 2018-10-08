import React from 'react';
import { withRouter } from 'react-router-dom';
import {
  Layout,
  Button,
} from 'antd';
import _ from 'lodash';
import PropTypes from 'prop-types';
import ResponsiveNav from './ResponsiveNav';
import MenuMarkup from './MenuMarkup';

class Header extends React.PureComponent {
  static propTypes = {
    location: PropTypes.objectOf(PropTypes.any).isRequired,
    history: PropTypes.objectOf(PropTypes.any).isRequired,
  };
  constructor(props) {
    super(props);
    this.state = {
      viewportWidth: 0,
      hasClickWithMobile: false,
    };
  }
  componentDidMount() {
    this.saveViewportDimensions();
    window.addEventListener('resize', this.saveViewportDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.saveViewportDimensions);
  }

  onNavigate = ({ key }) => {
    if (key === this.props.location.pathname) {
      return;
    }
    this.props.history.push(key);
  }

  saveViewportDimensions = _.throttle(() => {
    this.setState({
      viewportWidth: window.innerWidth,
    });
  }, 250);

  render() {
    const mobileBreakPoint = 1000;
    const style = {
      background: '#f0f2f5',
      display: 'flex',
      flexDirection: 'row',
      height: '50px',
      borderBottom: '1px solid #E8E8E8',
      alignItems: 'center',
    };
    const mobile = this.state.viewportWidth <= mobileBreakPoint;
    if (mobile) {
      style.flexDirection = 'column';
      if (this.state.hasClickWithMobile) {
        style.height = '244px';
      } else {
        style.height = '100px';
      }
    }
    return (
      <Layout.Header
        style={style}
      >
        <div style={{
              backgroundImage: 'url(http://daojs.koreasouth.cloudapp.azure.com/img/logo.png)',
              width: '50px',
              height: mobile ? '100' : '90%',
              backgroundSize: 'contain',
              backgroundRepeat: 'no-repeat',
            }}
        />
        <Button
          ghost
          style={{
              marginRight: '40px',
              fontSize: '18px',
              fontWeight: 'bold',
              cursor: 'default',
              color: '#666',
              border: '0',
            }}
        >
            Dao Registry
        </Button>
        <ResponsiveNav
          activeLinkKey={this.props.location.pathname}
          menuMarkup={MenuMarkup}
          click={(key) => {
            this.onNavigate(key);
            this.setState(prev => ({ hasClickWithMobile: !prev.hasClickWithMobile }));
          }}
          isMobile={mobile}
          clickMenuWithMobile={() => (
            this.setState(prev => ({ hasClickWithMobile: !prev.hasClickWithMobile })))}
          hasClickWithMobile={this.state.hasClickWithMobile}
        />
      </Layout.Header>
    );
  }
}

export default withRouter(Header);
