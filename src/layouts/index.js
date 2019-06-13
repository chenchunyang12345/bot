import React, { Component } from 'react';
import styles from './index.less';
import { connect } from 'dva';
import Link from 'umi/link';

import { Menu, Dropdown } from 'antd';

import MyModal from '../components/common/modal';
import PassWordForm from './PassWordForm';

class BasicLayout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false, // 控制修改密码的显隐
        }
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
    renderMenu() {
        let { handleClick } = this.props;
        return (
            <Menu>
                <Menu.Item>
                    <Link to="/info" onClick={() => handleClick('info')}>基本信息</Link>
                </Menu.Item>
                <Menu.Item>
                    <a onClick={() => this.setState({visible: true})}>修改密码</a>
                </Menu.Item>
                <Menu.Item>
                    <Link to="/scene" onClick={() => handleClick('scene')}>场景点图</Link>
                </Menu.Item>
                <Menu.Item>
                    <Link to="/login">退出登录</Link>
                </Menu.Item>
            </Menu>
        )
    }

    render() {
        let { visible } = this.state;
        // 如果路由里面存在login，用另一个layout
        if(location.hash.indexOf('login') !== -1) {
            return <div style={{width: '100%', height: '100%'}}>{this.props.children}</div>
        } else {
            let { current, handleClick, message_list } = this.props;
            return (
                <div className={styles.wrap_page}>
                    <div className={styles.nav}>
                        {/* 头像 */}
                        <Dropdown overlayClassName={styles.head_menu} overlay={this.renderMenu()}>
                            <div className={styles.user} ref='user'>
                                <div className={styles.dots}>.&nbsp;.&nbsp;.</div>
                            </div>
                        </Dropdown>
                        {/* 菜单 */}
                        <Menu
                            onClick={e => handleClick(e.key)}
                            selectedKeys={[current]}
                            mode='vertical'
                        >
                            <Menu.Item key='message'>
                                <Link to='/message' className={styles.nav_message}></Link>
                            </Menu.Item>
                            <Menu.Item key='phonebook'>
                                <Link to='/phonebook' className={styles.nav_phonebook}></Link>
                            </Menu.Item>
                            <Menu.Item key='work'>
                                <Link to='/work' className={styles.nav_work}></Link>
                            </Menu.Item>
                            <Menu.Item key='study'>
                                <Link to='/study' className={styles.nav_study}></Link>
                            </Menu.Item>
                        </Menu>
                        {/* logo */}
                        <div className={styles.logo}></div>
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
                    {/* 修改密码 */}
                    <MyModal
                        visible={visible}
                        okText={'确认'}
                        cancelText={'取消'}
                        onCancel={() => this.setState({visible: false})}
                        onClose={() => this.setState({visible: false})}
                        maskClosable={false}
                        // 设置位置
                        style={{top: '18%'}}
                    >
                        <PassWordForm></PassWordForm>
                    </MyModal>
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
        // clearMessage: () => {
        //     dispatch({
        //         type: 'message/clearMessage',
        //     })
        // }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BasicLayout);
