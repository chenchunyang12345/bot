import React, { Component } from 'react';
import styles from './index.less';
import { connect } from 'dva';
import router from 'umi/router';

import { Menu, Tooltip } from 'antd';

class BasicLayout extends Component {
    constructor(props) {
        super(props);
    }

    // 渲染行程消息
    // renderContent() {
    //     let { message_list, clearMessage } = this.props;
    //     return (
    //         <div className={styles.msg_wrap}>
    //             <div className={styles.title}>通知</div>
    //             <div className={styles.check} onClick={() => clearMessage()}></div>
    //             {
    //                 message_list.length ? 
    //                 message_list.map((message, idx) => {
    //                     return (
    //                         <div className={styles.list} key={idx}>
    //                             <div className={styles.dot}></div>
    //                             <div className={styles.text}>行程更新( {message} )</div>
    //                         </div>
    //                     )
    //                 }):
    //                 <div style={{color: 'red', fontSize: '12px'}}>暂无通知</div>
    //             }
    //         </div>
    //     )
    // }

    // 鼠标移入导航栏头像
    renderTips() {
        return (
            <ul>
                <li>基本信息</li>
                <li>修改密码</li>
                <li onClick={() => this.loginOut()}>退出登录</li>
            </ul>
        )
    }

    // 退出登录
    loginOut() {
        router.push('/login');
    }

    render() {
        // 如果路由里面存在login，用另一个layout
        if(location.hash.indexOf('login') !== -1) {
            return <div style={{width: '100%', height: '100%'}}>{this.props.children}</div>
        } else {
            let { current, handleClick, message_list } = this.props;
            return (
                <div className={styles.wrap_page}>
                    <div className={styles.nav}>
                        {/* 头像 */}
                        <Tooltip
                            overlayClassName={styles.head_tooltip}
                            placement='rightTop'
                            title={this.renderTips()}
                        >
                            <div className={styles.user}>
                                <div className={styles.dots}>.&nbsp;.&nbsp;.</div>
                            </div>
                        </Tooltip>
                        {/* 菜单 */}
                        <Menu
                            onClick={e => handleClick(e.key)}
                            selectedKeys={[current]}
                            mode='vertical'
                        >
                            <Menu.Item key='message'>
                                <a href='#/message' className={styles.nav_message}></a>
                            </Menu.Item>
                            <Menu.Item key='phonebook'>
                                <a href='#/phonebook' className={styles.nav_phonebook}></a>
                            </Menu.Item>
                            <Menu.Item key='work'>
                                <a href='#/work' className={styles.nav_work}></a>
                            </Menu.Item>
                            <Menu.Item key='study'>
                                <a href='#/study' className={styles.nav_study}></a>
                            </Menu.Item>
                        </Menu>
                        {/* <Popover
                            placement='bottomRight' 
                            trigger='hover'
                            overlayClassName={styles.message_pop}
                            content={this.renderContent()}
                        >
                            <div className={styles.message}></div>
                        </Popover> */}
                    </div>
                    {/* 宽度70px用来占位，使右边的主要内容在右边白色的背景里居中 */}
                    <div style={{width: '70px'}}></div>
                    <div className={styles.content}>
                        <div className={styles.inner}>
                            {/* 渲染主要内容的位置 */}
                            {this.props.children}
                        </div>
                    </div>
                </div>
            )
        }
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
