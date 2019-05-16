import React, { Component } from 'react';
import styles from './index.less';
import { connect } from 'dva';

import TabsDetail from './TabsDetail';
import AskMsg from '../AskMsg';
import AnsMsg from '../AnsMsg';

class CheckTalk extends Component {
    constructor(props) {
        super(props);
    }

    // 渲染对话流
    renderTalk(dialogueHistories) {
        return dialogueHistories.map((item, idx) => {
            return (
                <div key={idx}>
                    <div className={styles.ask_wrap}>
                        <span className={styles.badge}>{idx + 1}</span>
                        <AskMsg word={item.question}></AskMsg>
                    </div>
                    <div className={styles.ans_wrap}>
                        <AnsMsg word={item.answer}></AnsMsg>
                    </div>
                </div>
            )
        })
    }

    // 渲染评价
    renderEvaluate(dialogueHistories) {
        return dialogueHistories.map((item, idx) => {
            return (
                <div key={idx} className={styles.tabs_wrap}>
                    <span className={styles.badge}>{idx + 1}</span>
                    <TabsDetail detail={item}></TabsDetail>
                </div>
            )
        })
    }

    render() {
        let { report_detail: { content: { dialogueHistories } } } = this.props;
        return (
            <div className={styles.container}>
                <div className={styles.left}>
                    <div className={styles.left_wrap}>
                        {
                            this.renderTalk(dialogueHistories)
                        }
                    </div>
                </div>
                <div className={styles.right}>
                    {
                        this.renderEvaluate(dialogueHistories)
                    }
                </div>
            </div>
        )
  }
}

function mapStateToProps({ study_report }) {
    return {...study_report};
}

export default connect(mapStateToProps)(CheckTalk);