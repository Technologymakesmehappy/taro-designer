import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { toJS } from 'mobx';
import { Picker } from '@tarojs/components/dist-h5/react';

export default class Picker1 extends Component {
	render() {
		const { style, children, ...others } = this.props;
		return (
			<Picker style={toJS(style)} {...others}>
				滚动选择器
				{children}
			</Picker>
		);
	}
}

Picker1.propTypes = {
	mode: PropTypes.string,
	disabled: PropTypes.bool,
	style: PropTypes.string
};

Picker1.defaultProps = {
	mode: 'selector',
	disabled: false,
	style: ''
};
