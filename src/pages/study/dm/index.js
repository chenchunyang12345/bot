import React, { Component } from 'react';
import styles from './index.less';
import { connect } from 'dva';
import router from 'umi/router';

import { Spin } from 'antd';

// 引入对话框中的3种组件
import { MsgTips, AskMsg, AnsMsg } from '../../../components/study';
// 提示框
import MyModal from '../../../components/common/modal';

// 难度系数的组件
const Level = (props) => {
    let { level } = props;
    return (
        <div style={{display: 'flex', width: '44px', justifyContent: 'space-between', alignItems: 'center'}}>
            <div className={level >= 1 ? styles.star_fill : styles.star}></div>
            <div className={level >= 2 ? styles.star_fill : styles.star}></div>
            <div className={level === 3 ? styles.star_fill : styles.star}></div>
        </div>
    )
}

class Dm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible_leave: false,   // 离开的modal
            input_value: '',        // 输入框内容
        }
    }

    // 返回的按钮
    goBack() {
        this.setState({
            visible_leave: true,
        })
    }

    // 渲染对话
    renderTalk() {
        let { talk_history } = this.props;
        return talk_history.map((item, idx) => {
            switch (item.num) {
                case 1: 
                    return <AskMsg word={item.word} key={idx} />;
                case 2: 
                    return <AnsMsg word={item.word} key={idx} />;
            }
        })
    }

    // 发送信息
    sendMsg() {
        let { input_value } = this.state;
        if(input_value === '') {
            return;
        }
        let { session_id } = this.props;
        this.props.dispatch({
            type: 'study_dm/talk',
            payload: {
                query: input_value,
            },
            id: session_id,
        })
        this.setState({
            input_value: '',
        })
    }

    componentDidUpdate() {
        this.refs.content.scrollTop = 99999;
    }

    render() {
        let { visible_leave, input_value } = this.state;
        let { visible_finish, card_detail, session_id } = this.props;
        let { customer, scene } = card_detail;
        return (
            <div className={styles.content}>
                {/* 页面左 */}
                <div className={styles.left}>
                    <div className={styles.back}>
                        <a href="javascript: void(0)" onClick={() => this.goBack()}>返回</a>
                    </div>
                    {
                         customer === undefined ? 
                         <Spin tip='正在获取数据信息...'>
                             <div style={{width: '400px', height: '200px'}}></div>
                         </Spin>  :
                        <div className={styles.botDetail}>
                            <div className={styles.head_img}></div>
                            <div className={styles.dots}></div>
                            <div className={styles.name}>{customer.username}/{customer.profession}/{customer.gender === 'MALE' ? '男' : '女'}/<span>{customer.age}岁</span></div>
                            <div className={styles.scene}>
                                场景：
                                <span>{scene.name}</span>
                            </div>
                            <div className={styles.task}>
                                任务：
                                <span>{scene.task}</span>
                            </div>
                            <div className={styles.level}>难度指数：<Level level={card_detail.level}></Level></div>
                        </div>
                    }
                </div>
                {/* 页面右 */}
                <div className={styles.right}>
                    <div className={styles.header}>
                        {
                            customer === undefined ? 
                            null :
                            <div>
                                <span>{customer.username}</span>
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{customer.profession}/{customer.gender === 'MALE' ? '男' : '女'}/{customer.age}岁
                            </div>
                        }
                    </div>
                    <div className={styles.msg_content} ref='content'>
                        {
                            this.renderTalk()
                        }
                    </div>
                    <div className={styles.text_input}>
                        <div className={styles.camera}></div>
                        <div className={styles.mike}></div>
                        <textarea 
                            className={styles.text} 
                            value={input_value}
                            onChange={e => this.setState({ input_value: e.target.value })}
                            onKeyDown={e => {
                                if(e.keyCode === 13) {
                                    e.preventDefault();
                                    this.sendMsg()
                                }
                            }}
                        ></textarea>
                        <div 
                            className={styles.send} 
                            onClick={() => this.sendMsg()}
                        >发送</div>
                    </div>
                </div>
                {/* 离开的确认框 */}
                <MyModal
                    visible={visible_leave}
                    okText={'继续'}
                    cancelText={'离开'}
                    onOk={() => this.setState({visible_leave: false})}
                    onClose={() => this.setState({visible_leave: false})}
                    onCancel={() => {
                        this.setState({visible_leave: false});
                        router.push('/study');
                    }}
                    maskClosable={false}
                >坚持做完好吗？你一定可以的！</MyModal>
                {/* 任务完成框 */}
                <MyModal
                    visible={visible_finish}
                    oneBtn={true}
                    onClose={() => this.props.dispatch({type: 'study_dm/setVisible', payload: false})}
                    session_id={session_id}
                    maskClosable={false}
                >恭喜您，您的任务达成了！</MyModal>
            </div>
        )
  }
}

function mapStateToProps({ study_dm }) {
    return { ...study_dm };
}

export default connect(mapStateToProps)(Dm);