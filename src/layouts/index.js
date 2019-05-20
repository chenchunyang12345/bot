import React, { Component } from 'react';
import styles from './index.less';
import { connect } from 'dva';

import { Menu, Popover } from 'antd';

class BasicLayout extends Component {
    constructor(props) {
        super(props);
    }

    renderContent() {
        let { message_list, clearMessage } = this.props;
        return (
            <div className={styles.msg_wrap}>
                <div className={styles.title}>通知</div>
                <div className={styles.check} onClick={() => clearMessage()}></div>
                {
                    message_list.length ? 
                    message_list.map((message, idx) => {
                        return (
                            <div className={styles.list} key={idx}>
                                <div className={styles.dot}></div>
                                <div className={styles.text}>行程更新( {message} )</div>
                            </div>
                        )
                    }):
                    <div style={{color: 'red', fontSize: '12px'}}>暂无通知</div>
                }
            </div>
        )
    }

    render() {
        let { current, handleClick, message_list } = this.props;
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
                            <Popover
                                placement="bottomRight" 
                                trigger="hover"
                                overlayClassName={styles.message_pop}
                                content={this.renderContent()}
                            >
                                <div className={styles.message}></div>
                                {/* 消息的个数 */}
                                {
                                    message_list.length ? 
                                    <div className={styles.budge}>{message_list.length}</div> :
                                    null
                                }
                            </Popover>
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

function mapStateToProps({ menu, message }) {
    return { ...menu, ...message };
}

function mapDispatchToProps(dispatch) {
    return {
        handleClick: (key) => {
            dispatch({
                type: 'menu/handleClick',
                payload: key
            })
        },
        clearMessage: () => {
            dispatch({
                type: 'message/clearMessage',
            })
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BasicLayout);
