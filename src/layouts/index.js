import React, { Component } from 'react';
import styles from './index.less';
import { connect } from 'dva';

import { Menu } from 'antd';

class BasicLayout extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let { current, handleClick } = this.props;
        return (
            <div className={styles.wrap_page}>
                <div className={styles.header}>
                    <div className={styles.inner}>
                        <div className={styles.logo}>
                            <h1>华来知识</h1>
                        </div>
                        <div className={styles.nav}>
                            <Menu
                                onClick={e => handleClick(e.key)}
                                selectedKeys={[current]}
                                mode="horizontal"
                            >
                                <Menu.Item key="home">
                                    <a href="#/home">首页</a>
                                </Menu.Item>
                                <Menu.Item key="customer">
                                    <a href="#/customer">客户</a>
                                </Menu.Item>
                                <Menu.Item key="sale">
                                    <a href="#/sale">销售</a>
                                </Menu.Item>
                                <Menu.Item key="study">
                                    <a href="#/study">学习</a>
                                </Menu.Item>
                                <Menu.Item key="personal">
                                    <a href="#/personal">个人</a>
                                </Menu.Item>
                                <Menu.Item key="help">
                                    <a href="#/help">帮助</a>
                                </Menu.Item>
                                <Menu.Item>
                                    <a href="#/logo">登录</a>
                                </Menu.Item>
                            </Menu>
                            <div className={styles.message}></div>
                        </div>
                    </div>
                </div>
                <div className={styles.content}>
                    <div className={styles.inner}>
                        {/* 渲染主要内容的位置 */}
                        {this.props.children}
                    </div>
                </div>
                <div className={styles.footer}></div>
            </div>
        )
  }
}

function mapStateToProps({ menu }) {
    return {...menu};
}

function mapDispatchToProps(dispatch) {
    return {
        handleClick: (key) => {
            dispatch({
                type: 'menu/handleClick',
                payload: key
            })
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BasicLayout);
