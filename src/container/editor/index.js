import React, { Component, createRef } from 'react';
import { action, computed, observable } from 'mobx';
import { observer } from 'mobx-react';
import { Button } from 'cloud-react';

import Components, { CONFIGS } from '@components';
import { parseStyles } from '@utils';

import store from '../store';
import TargetBox from '../drag-drop/targetBox';

import './style.less';

@observer
class Editor extends Component {
	@observable
	ref = createRef();

	@computed
	get isShowPlaceholder() {
		if (this.ref.current) {
			return this.ref.current.children.length === 0;
		}
		return false;
	}

	@action.bound
	handleClick({ id, type }, event) {
		event.stopPropagation();
		store.setCurrentData(id, type);
	}

	renderContent(data) {
		const { id, type, props = {}, styles = {}, childrens } = data;
		const CurrentComponet = Components[type];
		const { canPlace, defaultProps } = CONFIGS[type];

		const finalProps = { ...defaultProps, ...props };

		let childs = null;
		if (childrens && childrens.length) {
			childs = childrens.map(child => this.renderContent(child));
		}

		const CommonComponent = () => {
			return (
				<CurrentComponet
					key={id}
					id={id}
					style={parseStyles(styles)}
					type={type}
					{...finalProps}
					onClick={event => this.handleClick({ id, type }, event)}>
					{childs}
				</CurrentComponet>
			);
		};

		if (canPlace) {
			return (
				<TargetBox id={id}>
					<CommonComponent />
				</TargetBox>
			);
		}

		return <CommonComponent />;
	}

	handleReset = () => {
		store.reset();
	};

	render() {
		return (
			<section className="editor">
				<header>页面编辑区</header>
				{this.isShowPlaceholder && <div className="tips">设计区，可拖拽左侧元素到此处，单击元素可编辑属性，蓝色虚线框可放置子组件</div>}
				<Button size="small" onClick={this.handleReset} style={{ margin: '10px 0' }}>
					清空工作区
				</Button>
				<div className="edit" ref={this.ref}>
					{this.renderContent(store.pageData[0])}
				</div>
			</section>
		);
	}
}

export default Editor;
