import React, { Component } from 'react';
import styles from './index.less';

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
            visible_finish: true,  // 完成的modal
        }
    }

    // 返回的按钮
    goBack() {
        this.setState({
            visible_leave: true,
        })
    }

    render() {
        let { visible_leave, visible_finish } = this.state;
        return (
            <div className={styles.content}>
                {/* 页面左 */}
                <div className={styles.left}>
                    <div className={styles.back}>
                        <a href="javascript: void(0)" onClick={() => this.goBack()}>返回</a>
                    </div>
                    <div className={styles.botDetail}>
                        <div className={styles.head_img}></div>
                        <div className={styles.dots}></div>
                        <div className={styles.name}>小红/设计师/女/<span>23岁</span></div>
                        <div className={styles.scene}>
                            场景：
                            <span>电话邀约---转介绍--接洽</span>
                        </div>
                        <div className={styles.task}>
                            任务：
                            <span>成功确认对方身份，介绍自己，确认对方是否方便，如果方便何时见面，面谈要点有哪些。成功确认对方身份，介绍自己，确认对方是否...</span>
                        </div>
                        <div className={styles.level}>难度指数：<Level level={1}></Level></div>
                    </div>
                </div>
                {/* 页面右 */}
                <div className={styles.right}>
                    <div className={styles.header}>
                        <span>小红</span>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;设计师/女/23岁
                    </div>
                    <div className={styles.msg_content}>
                        {/* 三种组件 */}
                        <MsgTips></MsgTips>
                        <AskMsg></AskMsg>
                        <AnsMsg></AnsMsg>
                    </div>
                    <div className={styles.text_input}>
                        <div className={styles.camera}></div>
                        <div className={styles.mike}></div>
                        <textarea className={styles.text}>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enimminim veniam, quis nostrud exercitation </textarea>
                        <div className={styles.send}>发送</div>
                    </div>
                </div>
                {/* 离开的确认框 */}
                <MyModal
                    visible={visible_leave}
                    okText={'继续'}
                    cancelText={'离开'}
                    onOk={() => this.setState({visible_leave: false})}
                    onCancel={() => this.setState({visible_leave: false})}
                    maskClosable={false}
                >坚持做完好吗？你一定可以的！</MyModal>
                {/* 任务完成框 */}
                <MyModal
                    visible={visible_finish}
                    oneBtn={true}
                    onCancel={() => this.setState({visible_finish: false})}
                    maskClosable={false}
                >恭喜您，您的任务达成了！</MyModal>
            </div>
        )
  }
}

export default Dm;