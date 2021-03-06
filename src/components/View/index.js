import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View } from '@tarojs/components/dist-h5/react';

export default class View1 extends Component {
	render() {
		const { style, children, ...others } = this.props;
		return (
			<View style={style} {...others}>
				{children}
			</View>
		);
	}
}

View1.propTypes = {
	hoverClass: PropTypes.string,
	hoverStartTime: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
	hoverStayTime: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
	style: PropTypes.string
};

View1.defaultProps = {
	hoverClass: 'none',
	hoverStartTime: 50,
	hoverStayTime: 400,
	style: ''
};
