/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { ChromePicker } from 'react-color';
import styled from 'styled-components';

const Container = styled.div``;

class ColorPicker extends React.Component {
  constructor(props) {
    super(props);

    this.state = { displayColorPicker: false, color: props.color || '#fff' };
  }

  handleClick = () => {
    const { displayColorPicker } = this.state;
    this.setState({ displayColorPicker: !displayColorPicker });
  };

  handleClose = () => {
    this.setState({ displayColorPicker: false });
  };

  handleChange = (color) => {
    const { onChange } = this.props;

    this.setState({ color: color.rgb });
    onChange(color.hex);
  };

  render() {
    const { displayColorPicker, color, ...otherProps } = this.state;
    const { selectColor } = this.props;
    const styles = {
      color: {
        width: '36px',
        height: '14px',
        borderRadius: '2px',
        background:
          selectColor || `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`,
      },
      swatch: {
        padding: '5px',
        background: '#fff',
        borderRadius: '1px',
        boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
        display: 'inline-block',
        cursor: 'pointer',
      },
      popover: {
        position: 'absolute',
        zIndex: '2',
      },
      cover: {
        position: 'fixed',
        top: '0px',
        right: '0px',
        bottom: '0px',
        left: '0px',
      },
    };

    return (
      <Container>
        <div style={styles.swatch} onClick={this.handleClick}>
          <div style={styles.color} />
        </div>
        {displayColorPicker ? (
          <div style={styles.popover}>
            <div style={styles.cover} onClick={this.handleClose} />
            <ChromePicker
              color={color}
              onChange={this.handleChange}
              {...otherProps}
            />
          </div>
        ) : null}
      </Container>
    );
  }
}

export default ColorPicker;
