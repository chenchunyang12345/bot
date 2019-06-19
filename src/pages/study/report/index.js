import React, { Component } from 'react';
import styles from './index.less';
import { connect } from 'dva';
import moment from 'moment';

import { Spin, Tag } from 'antd';

import { CheckTalk } from '../../../components/study';
import CanvasScore from '../../../components/common/CanvasScore';

// 定义标签的颜色
const tagColor = ['purple', 'cyan', 'magenta', 'gold', 'green'];

class Report extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let { report_detail } = this.props;
        console.log(report_detail)
        if( report_detail ) {
            let { content, customer, scene } = report_detail;
            return (
                <div className={styles.container}>
                    {/* 返回 */}
                    <div className={styles.back}>
                        <a href="#/study">返回</a>
                    </div>
                    {/* 报告banner */}
                    <div className={styles.banner}>
                        <div className={styles.banner_title}>对话训练评测报告</div>
                        <div className={styles.line}></div>
                        <div className={styles.date}>{moment(report_detail.createTime).format('YYYY/MM/DD')}</div>
                    </div>
                    {/* 场景回顾 */}
                    <div className={styles.scene}>
                        <div className={styles.scene_title}>场景回顾</div>
                        <div className={styles.scene_content}>
                            <div className={styles.person}>
                                <div className={styles.little_title}>人物信息</div>
                                <div className={styles.person_img}></div>
                                <div className={styles.name}>姓名：{customer.username} </div>
                                <div className={styles.age}>年龄：{customer.age} </div>
                                <div className={styles.family}>家庭成员：{customer.familyMembers}</div>
                                <div className={styles.sex}>性别：{customer.gender === 'MALE' ? '男' : '女'}</div>
                                <div className={styles.job}>职业：{customer.profession}</div>
                            </div>
                            <div className={styles.scene_detail}>
                                <div className={styles.little_title}>场景信息</div>
                                <div className={styles.scene_img}></div>
                                <div className={styles.task1}>任务背景：{scene.name}</div>
                                <div className={styles.task2}>任务目标：{scene.task}</div>
                                <div className={styles.level}>难度：LV{report_detail.level}</div>
                            </div>
                        </div>
                    </div>
                    {/* 评价 */}
                    <div className={styles.score}>
                        <div className={styles.score_title}>综合评价</div>
                        <div className={styles.score_content}>
                            <div className={styles.content_top}>
                                <div className={styles.score_left}>
                                    <div className={styles.left_text}>智能评分</div>
                                    <div className={styles.left_img}>
                                        <CanvasScore 
                                            id='canvas1' 
                                            width={120}
                                            height={120}
                                            score={content.score}
                                            fillColor='#ECF8F9'
                                            borderColor='#80CFD4'
                                        />
                                    </div>
                                </div>
                                <div className={styles.score_right}>
                                    <div className={styles.right_text}>知识点掌握率</div>
                                    <div className={styles.right_img}>
                                        <CanvasScore 
                                            id='canvas2'
                                            width={120}
                                            height={120}
                                            score={content.masteryRate}
                                            fillColor='#FFF8E7'
                                            borderColor='#FAD060'
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className={styles.content_bottom}>
                                <div className={styles.hello}>亲爱的小红:</div>
                                    {
                                        content.remarks.map((remark, idx) => {
                                            return (
                                                <div key={idx} className={styles.evaluate}>{remark}</div>
                                            )
                                        })
                                    }
                                <div className={styles.tags}>
                                    {
                                        content.labels.map((label, idx) => {
                                            return (
                                                <Tag key={idx} color={tagColor[idx % 5]}>{label}</Tag>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* 对话回顾 */}
                    <div className={styles.talk_title}>对话回顾</div>
                    <CheckTalk></CheckTalk>
                </div>
            )
        } else {
            return (
                <Spin delay={500} tip='loading...'>
                    <div style={{width: '1200px', height: '500px'}}></div>
                </Spin>
            )
        }
  }
}

function mapStateToProps({ study_report }) {
    return { ...study_report };
}

export default connect(mapStateToProps)(Report);