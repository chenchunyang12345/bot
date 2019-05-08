import React, { Component } from 'react';
import { Menu } from 'antd';
import styles from './index.less';

class BasicLayout extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={styles.wrap_page}>
                <div className={styles.header}>
                    <div className={styles.inner}>
                        <div className={styles.logo}>
                            <h1>华来知识</h1>
                        </div>
                        <div className={styles.nav}>
                            <Menu
                                mode="horizontal"
                            >
                                <Menu.Item>
                                    <a href="/#/">首页</a>
                                </Menu.Item>
                                <Menu.Item>
                                    <a href="/#/study">客户</a>
                                </Menu.Item>
                                <Menu.Item>
                                    <a href="/#/study">销售</a>
                                </Menu.Item>
                                <Menu.Item>
                                    <a href="/#/study">学习</a>
                                </Menu.Item>
                                <Menu.Item>
                                    <a href="/#/study">个人</a>
                                </Menu.Item>
                                <Menu.Item>
                                    <a href="/#/study">帮助</a>
                                </Menu.Item>
                                <Menu.Item>
                                    <a href="/#/study">登录</a>
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

export default BasicLayout;
