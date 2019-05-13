import React, { Component } from 'react';
import styles from './index.less';

import { Progress } from 'antd';

import { CheckTalk } from '../../../components/study';

class Report extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={styles.container}>
                {/* 返回 */}
                <div className={styles.back}>
                    <a href="">返回</a>
                </div>
                {/* 报告banner */}
                <div className={styles.banner}>
                    <div className={styles.title}>对话训练评测报告</div>
                    <div className={styles.line}></div>
                    <div className={styles.date}>2019/04/29</div>
                </div>
                {/* 场景回顾 */}
                <div className={styles.scene}>
                    <div className={styles.scene_title}>场景回顾</div>
                    <div className={styles.scene_content}>
                        <div className={styles.person}>
                            <div className={styles.little_title}>人物信息</div>
                            <div className={styles.person_img}></div>
                            <div className={styles.name}>姓名：航三 </div>
                            <div className={styles.age}>年龄：39 </div>
                            <div className={styles.family}>家庭成员：3</div>
                            <div className={styles.sex}>性别：男</div>
                            <div className={styles.job}>职业：企业高管</div>
                        </div>
                        <div className={styles.scene_detail}>
                            <div className={styles.little_title}>场景信息</div>
                            <div className={styles.scene_img}></div>
                            <div className={styles.task1}>任务背景：朋友为你介绍了一个潜在客户，你通过微信和他进行的沟通 </div>
                            <div className={styles.task2}>任务目标：让潜在客户同意与你见面</div>
                            <div className={styles.level}>难度：LV2</div>
                        </div>
                    </div>
                </div>
                {/* 评价 */}
                <div className={styles.score}>
                    <div className={styles.score_title}>场景回顾</div>
                    <div className={styles.score_content}>
                        <div className={styles.content_top}>
                            <div className={styles.score_left}>
                                <div className={styles.left_text}>智能评分</div>
                                <div className={styles.left_img}>
                                    <Progress type='circle' percent={75} format={percent => `${percent}`} strokeColor='#80CFD4'></Progress>
                                </div>
                            </div>
                            <div className={styles.score_right}>
                                <div className={styles.right_text}>知识点掌握率</div>
                                <div className={styles.right_img}>
                                    <Progress type='circle' percent={88} format={percent => `${percent}`} strokeColor='#FAD060'></Progress>
                                </div>
                            </div>
                        </div>
                        <div className={styles.content_bottom}>
                            <div className={styles.hello}>亲爱的小红:</div>
                            <div className={styles.evaluate}>恭喜你完成了本次练习，并达成任务目标，你的表现可圈可点。你很有礼貌，全程使用尊称，用尊重赢得客户信任； 你拥有丰富的技巧，在谈话过程中恰当地运用各种小技巧，比如赞美客户、使用利他原则，巧妙地引导客户没想你的目标； 你有足够的耐心，面对客户的不配合与异议，从容不迫地化解困难，让客户感受到你的专业； 当然，你还有一些细节的处理有待提高，建议你多多练习，让自己变得更强大。 总的来说，这是一次非常成功的练习。但你不能松懈，还要查漏补缺，勤加练习，在我的帮助下变得更优秀。</div>
                            <div className={styles.tags}></div>
                        </div>
                    </div>
                </div>
                {/* 对话回顾 */}
                <div className={styles.talk_title}>对话回顾</div>
                <CheckTalk></CheckTalk>
            </div>
        )
  }
}

export default Report;