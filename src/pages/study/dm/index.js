import React, { Component } from 'react';
import styles from './index.less';
import { connect } from 'dva';
import router from 'umi/router';
import { Steps } from 'antd';

const { Step } = Steps;

import { Spin } from 'antd';
// // 所有步骤点
// const ALLSTEPS = [
//     {
//         "name": "接洽",
//         "type": "single"
//     },
//     {
//         "name": "方便异议",
//         "type": "single"

//     },
//     {
//         "name": "目的",
//         "type": "single"

//     },
//     {
//         "name": "时间/地点",
//         "type": "multiple"
//     },
//     {
//         "name": "时间异议/地点异议",
//         "type": "multiple"
//     },
//     {
//         "name": "总结",
//         "type": "single"
//     }
// ]

// const NOWSTEPS = [
//     {
//         "name": "接洽",
//         "type": "single",
//     },
//     {
//         "name": "方便异议",
//         "type": "single",
//         "times":"3"
//     },
//     {
//         "name": "目的",
//         "type": "single"
//     },
//     {
//         "name": "时间/地点",
//         "type": "multiple",
//         "chosen": "时间"
//     },
//     {
//         "name":"时间异议/地点异议",
//         "type":"multiple",
//         "chosen":"时间异议",
//         "times":"2"
//     },
//     {
//         "name":"时间/地点",
//         "type":"multiple",
//         "chosen":"地点"
//     },
// ]

// const CURRENTSTATE = {
//     "name": "时间/地点",
//     "type": "multiple"
// }

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
                case 3: 
                    return <MsgTips word={item.word} key={idx} />;
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

    // 渲染进度条
    renderSteps() {
        let { step_number, all_steps } = this.props;
        return (
            <Steps direction="vertical" size="small" current={step_number}>
                {
                    all_steps.map((step, idx) => {
                        return (
                            step.type === 'single' ? 
                            <Step key={idx} title={this.renderSinger(step.name)} /> :
                            <Step key={idx} title={this.renderMultipleTitle(step.name)} />
                        )
                    })
                }
            </Steps>
        )
    }

    // 渲染单个的title(为了处理times)
    renderSinger(name) {
        let { now_steps } = this.props;
        let pass;   // 定义是否经过
        now_steps.forEach((step, idx) => {
            if(step.name === name) {
                pass = step.times && step.times > 1 ? step.times : 0;     // 没有times或times等于1则pass为0， times大于1则pass为times
            }
        })
        return (
            <div>
                {/* pass不为0和undefined则渲染 */}
                {name}{pass ? '(' + pass + ')' : null}      
            </div>
        )
    }

    // 渲染多选的进度条title
    renderMultipleTitle(name) {
        let { now_steps } = this.props;
        let newArr = name.split('和');   // 变成数组
        let arrBoolean = [];            // 声明映射数组(根据布尔值决定渲染的样式)
        let arrTimes = [];              // 声明次数映射数组
        newArr.forEach((item, idx) => {
            now_steps.forEach((step, idx2) => {
                if(step.name === name && step.chosen === item) {
                    arrBoolean[idx] = true;

                    if(step.times) {
                        arrTimes[idx] = step.times;
                    }
                }
            })
        })
        return (
            newArr.map((item, arr_idx) => {
                return (
                    <div key={arr_idx} className={arrBoolean[arr_idx] ? styles.pass : styles.nopass}>
                        {item}{arrTimes[arr_idx] ? '(' + arrTimes[arr_idx] + ')' : null}
                    </div>
                )
            })
        )
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
                {/* 固定定位进度条 */}
                <div className={styles.steps}>
                    { this.renderSteps() }
                </div>
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