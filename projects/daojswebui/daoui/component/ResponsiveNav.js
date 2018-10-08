import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'antd';

function ResponsiveNav(props) {
  const MenuMarkup = props.menuMarkup;
  return (
    <div style={{ width: props.isMobile ? '110%' : null }}>
      {props.isMobile ? <Icon
        className="iconHamburger"
        type="menu"
        onClick={props.clickMenuWithMobile}
      /> : null
      }
      <MenuMarkup
        onLinkClick={props.click}
        activeLinkKey={props.activeLinkKey}
        isMobile={props.isMobile}
        showMenu={!(props.isMobile && !props.hasClickWithMobile)}
      />
    </div>
  );
}

ResponsiveNav.propTypes = {
  isMobile: PropTypes.bool.isRequired,
  activeLinkKey: PropTypes.string.isRequired,
  clickMenuWithMobile: PropTypes.func.isRequired,
  hasClickWithMobile: PropTypes.bool.isRequired,
  click: PropTypes.func.isRequired,
  menuMarkup: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.object,
  ]).isRequired,
};

export default ResponsiveNav;
