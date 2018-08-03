import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import ContainerDimensions from 'react-container-dimensions';
import { ThemeContext } from '@daojs/contexts';
import { Icon } from 'antd';
import buildinComponents from '@daojs/builtin-components';

const { MiniProgress } = buildinComponents;

const padding = 15; // px

function Comp3(props) {
  const {
    title,
    subTitle,
    percent,
    icon,
    footer,
  } = props;

  return (
    <div className="card3">
      <ThemeContext.Consumer>
        {({ primaryColor }) => (
          <ContainerDimensions>
            { ({ width }) => {
              const titleSize = _.round(width / 13);
              const subTitleSize = _.round(width / 20);

              return (
                <div style={{
                  width: '100%',
                  height: '100%',
                  padding: `${padding}px`,
                  display: 'flex',
                  flexDirection: 'column',
                  backgroundColor: primaryColor,
                  borderRadius: '5px',
                  position: 'relative',
                }}
                >
                  <div style={{ flex: 1, color: 'rgba(255, 255, 255, 0.8)', fontSize: subTitleSize }}>
                    { subTitle }
                  </div>
                  <div style={{ flex: 2, color: 'rgba(255, 255, 255, 1)', fontSize: titleSize }}>
                    { title }
                  </div>
                  <div style={{ flex: 2, display: 'flex', alignItems: 'center' }}>
                    <div style={{ flex: 1, height: '2px', background: '#333' }}>
                      <MiniProgress percent={percent} strokeWidth={2} color="rgba(255, 255, 255, 1)" />
                    </div>
                  </div>
                  <div style={{ flex: 1, color: 'rgba(255, 255, 255, 0.6)' }}>
                    { footer }
                  </div>
                  <div style={{ position: 'absolute', right: `-${subTitleSize}px`, bottom: `-${subTitleSize}px` }} >
                    <Icon type={icon} style={{ fontSize: `${_.round(titleSize * 5)}px`, color: 'rgba(255, 255, 255, 0.2)' }} />
                  </div>
                </div>
              );
            }}
          </ContainerDimensions>
          )
        }
      </ThemeContext.Consumer>
    </div>
  );
}

Comp3.propTypes = {
  title: PropTypes.string,
  subTitle: PropTypes.string,
  icon: PropTypes.string,
  percent: PropTypes.number,
  footer: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
};

Comp3.defaultProps = {
  title: '',
  subTitle: '',
  icon: '',
  percent: 0,
  footer: null,
};

export default Comp3;
