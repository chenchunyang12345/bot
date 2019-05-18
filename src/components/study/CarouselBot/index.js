import React, { Component } from 'react';
import styles from './index.less';
import { connect } from 'dva';

import { Carousel, Spin } from 'antd';

// 难度指数的组件
const LevelStar = (props) => {
    let { level } = props;
    return (
        <div style={{display: 'flex', width: '44px', justifyContent: 'space-between', alignItems: 'center'}}>
            <div className={level >= 1 ? styles.star_fill : styles.star}></div>
            <div className={level >= 2 ? styles.star_fill : styles.star}></div>
            <div className={level === 3 ? styles.star_fill : styles.star}></div>
        </div>
    )
}

class CarouselBot extends Component {
    constructor(props) {
        super(props);
        this.changeIndex = null;
    }

    // 下一页走马灯
    nextPage() {
        this.changeIndex.next();
    }

    // 上一页走马灯
    prevPage() {
        this.changeIndex.prev();
    }

    render() {
        let { recommend_list } = this.props;
        // 暂时填补一下
        recommend_list = recommend_list.concat([recommend_list[0], recommend_list[1], recommend_list[2]]);
        // list里面的渲染顺序是，数组第一个在第一页第一个，数组第二个在第二页第一个，数组第三、四、五个分别在每页的最后一个，后面其他的依次渲染
        console.log(recommend_list)
        if( recommend_list[0] ) {
            return (
                <div className={styles.carousel_container}>
                    <Carousel 
                        dots={false}
                        autoplay={true}
                        ref={el => {this.changeIndex = el}}
                    >
                        <div className={styles.card_wrap}>
                            <div className={styles.cardOne_1}>
                                <div className={styles.name_1}>{recommend_list[0].customer.username}</div>
                                <div className={styles.head_img_1}></div>
                                <div className={styles.sex_age_1}>{recommend_list[0].customer.gender === 'MALE' ? '男' : '女'}&nbsp;/&nbsp;<span>{recommend_list[0].customer.age}岁</span></div>
                                <div className={styles.scene_1}>场景：<span>{recommend_list[0].scene.name}</span></div>
                                <div className={styles.task_1}>
                                    任务：
                                    <span>{recommend_list[0].scene.task}</span>
                                </div>
                                <div className={styles.level_1}>难度指数：<LevelStar level={recommend_list[0].level}/></div>
                                <a className={styles.start_1} href={`#/study/dm?id=${recommend_list[0].id}`}>开始</a>
                            </div>
                            <div className={styles.cardOne_2}>
                                <div className={styles.name_2}>{recommend_list[5].customer.username}</div>
                                <div className={styles.head_img_2}></div>
                                <div className={styles.sex_age_2}>{recommend_list[5].customer.gender === 'MALE' ? '男' : '女'}&nbsp;/&nbsp;<span>{recommend_list[5].customer.age}岁</span></div>
                                <div className={styles.scene_2}>场景：<span>{recommend_list[5].scene.name}</span></div>
                                <div className={styles.task_2}>
                                    任务：
                                    <span>{recommend_list[5].scene.task}</span>
                                </div>
                                <div className={styles.level_2}>难度指数：<LevelStar level={recommend_list[5].level}/></div>
                                <a className={styles.start_2} href={`#/study/dm?id=${recommend_list[5].id}`}>开始</a>
                            </div>
                            <div className={styles.cardOne_3}>
                                <div className={styles.name_3}>{recommend_list[6].customer.username}</div>
                                <div className={styles.head_img_3}></div>
                                <div className={styles.sex_age_3}>{recommend_list[6].customer.gender === 'MALE' ? '男' : '女'}&nbsp;/&nbsp;<span>{recommend_list[6].customer.age}岁</span></div>
                                <div className={styles.scene_3}>场景：<span>{recommend_list[6].scene.name}</span></div>
                                <div className={styles.task_3}>
                                    任务：
                                    <span>{recommend_list[6].scene.task}</span>
                                </div>
                                <div className={styles.level_3}>难度指数：<LevelStar level={recommend_list[6].level}/></div>
                                <a className={styles.start_3} href={`#/study/dm?id=${recommend_list[6].id}`}>开始</a>
                            </div>
                            <div className={styles.cardOne_4}>
                                <div className={styles.name_4}>{recommend_list[2].customer.username}</div>
                                <div className={styles.head_img_4}></div>
                                <div className={styles.sex_age_4}>{recommend_list[2].customer.gender === 'MALE' ? '男' : '女'}&nbsp;/&nbsp;<span>{recommend_list[2].customer.age}岁</span></div>
                                <div className={styles.scene_4}>场景：<span>{recommend_list[2].scene.name}</span></div>
                                <div className={styles.task_4}>
                                    任务：
                                    <span>{recommend_list[2].scene.task}</span>
                                </div>
                                <div className={styles.level_4}>难度指数：<LevelStar level={recommend_list[2].level}/></div>
                                <a className={styles.start_4} href={`#/study/dm?id=${recommend_list[2].id}`}>开始</a>
                            </div>
                        </div>
                        <div className={styles.card_wrap}>
                            <div className={styles.cardTwo_1}>
                                <div className={styles.name_1}>{recommend_list[1].customer.username}</div>
                                <div className={styles.head_img_1}></div>
                                <div className={styles.sex_age_1}>{recommend_list[1].customer.gender === 'MALE' ? '男' : '女'}&nbsp;/&nbsp;<span>{recommend_list[1].customer.age}岁</span></div>
                                <div className={styles.scene_1}>场景：<span>{recommend_list[1].scene.name}</span></div>
                                <div className={styles.task_1}>
                                    任务：
                                    <span>{recommend_list[1].scene.task}</span>
                                </div>
                                <div className={styles.level_1}>难度指数：<LevelStar level={recommend_list[1].level}/></div>
                                <a className={styles.start_1} href={`#/study/dm?id=${recommend_list[1].id}`}>开始</a>
                            </div>
                            <div className={styles.cardTwo_2}>
                                <div className={styles.name_2}>{recommend_list[7].customer.username}</div>
                                <div className={styles.head_img_2}></div>
                                <div className={styles.sex_age_2}>{recommend_list[7].customer.gender === 'MALE' ? '男' : '女'}&nbsp;/&nbsp;<span>{recommend_list[7].customer.age}岁</span></div>
                                <div className={styles.scene_2}>场景：<span>{recommend_list[7].scene.name}</span></div>
                                <div className={styles.task_2}>
                                    任务：
                                    <span>{recommend_list[7].scene.task}</span>
                                </div>
                                <div className={styles.level_2}>难度指数：<LevelStar level={recommend_list[7].level}/></div>
                                <a className={styles.start_2} href={`#/study/dm?id=${recommend_list[7].id}`}>开始</a>
                            </div>
                            <div className={styles.cardTwo_3}>
                                <div className={styles.name_3}>{recommend_list[8].customer.username}</div>
                                <div className={styles.head_img_3}></div>
                                <div className={styles.sex_age_3}>{recommend_list[8].customer.gender === 'MALE' ? '男' : '女'}&nbsp;/&nbsp;<span>{recommend_list[8].customer.age}岁</span></div>
                                <div className={styles.scene_3}>场景：<span>{recommend_list[8].scene.name}</span></div>
                                <div className={styles.task_3}>
                                    任务：
                                    <span>{recommend_list[8].scene.task}</span>
                                </div>
                                <div className={styles.level_3}>难度指数：<LevelStar level={recommend_list[8].level}/></div>
                                <a className={styles.start_3} href={`#/study/dm?id=${recommend_list[8].id}`}>开始</a>
                            </div>
                            <div className={styles.cardTwo_4}>
                                <div className={styles.name_4}>{recommend_list[3].customer.username}</div>
                                <div className={styles.head_img_4}></div>
                                <div className={styles.sex_age_4}>{recommend_list[3].customer.gender === 'MALE' ? '男' : '女'}&nbsp;/&nbsp;<span>{recommend_list[3].customer.age}岁</span></div>
                                <div className={styles.scene_4}>场景：<span>{recommend_list[3].scene.name}</span></div>
                                <div className={styles.task_4}>
                                    任务：
                                    <span>{recommend_list[3].scene.task}</span>
                                </div>
                                <div className={styles.level_4}>难度指数：<LevelStar level={recommend_list[3].level}/></div>
                                <a className={styles.start_4} href={`#/study/dm?id=${recommend_list[3].id}`}>开始</a>
                            </div>
                        </div>
                        <div className={styles.card_wrap}>
                            <div className={styles.cardThree_1}>
                                <div className={styles.name_1}>{recommend_list[9].customer.username}</div>
                                <div className={styles.head_img_1}></div>
                                <div className={styles.sex_age_1}>{recommend_list[9].customer.gender === 'MALE' ? '男' : '女'}&nbsp;/&nbsp;<span>{recommend_list[9].customer.age}岁</span></div>
                                <div className={styles.scene_1}>场景：<span>{recommend_list[9].scene.name}</span></div>
                                <div className={styles.task_1}>
                                    任务：
                                    <span>{recommend_list[9].scene.task}</span>
                                </div>
                                <div className={styles.level_1}>难度指数：<LevelStar level={recommend_list[9].level}/></div>
                                <a className={styles.start_1} href={`#/study/dm?id=${recommend_list[9].id}`}>开始</a>
                            </div>
                            <div className={styles.cardThree_2}>
                                <div className={styles.name_2}>{recommend_list[10].customer.username}</div>
                                <div className={styles.head_img_2}></div>
                                <div className={styles.sex_age_2}>{recommend_list[10].customer.gender === 'MALE' ? '男' : '女'}&nbsp;/&nbsp;<span>{recommend_list[10].customer.age}岁</span></div>
                                <div className={styles.scene_2}>场景：<span>{recommend_list[10].scene.name}</span></div>
                                <div className={styles.task_2}>
                                    任务：
                                    <span>{recommend_list[10].scene.task}</span>
                                </div>
                                <div className={styles.level_2}>难度指数：<LevelStar level={recommend_list[10].level}/></div>
                                <a className={styles.start_2} href={`#/study/dm?id=${recommend_list[10].id}`}>开始</a>
                            </div>
                            <div className={styles.cardThree_3}>
                                <div className={styles.name_3}>{recommend_list[11].customer.username}</div>
                                <div className={styles.head_img_3}></div>
                                <div className={styles.sex_age_3}>{recommend_list[11].customer.gender === 'MALE' ? '男' : '女'}&nbsp;/&nbsp;<span>{recommend_list[11].customer.age}岁</span></div>
                                <div className={styles.scene_3}>场景：<span>{recommend_list[11].scene.name}</span></div>
                                <div className={styles.task_3}>
                                    任务：
                                    <span>{recommend_list[11].scene.task}</span>
                                </div>
                                <div className={styles.level_3}>难度指数：<LevelStar level={recommend_list[11].level}/></div>
                                <a className={styles.start_3} href={`#/study/dm?id=${recommend_list[11].id}`}>开始</a>
                            </div>
                            <div className={styles.cardThree_4}>
                                <div className={styles.name_4}>{recommend_list[4].customer.username}</div>
                                <div className={styles.head_img_4}></div>
                                <div className={styles.sex_age_4}>{recommend_list[4].customer.gender === 'MALE' ? '男' : '女'}&nbsp;/&nbsp;<span>{recommend_list[4].customer.age}岁</span></div>
                                <div className={styles.scene_4}>场景：<span>{recommend_list[4].scene.name}</span></div>
                                <div className={styles.task_4}>
                                    任务：
                                    <span>{recommend_list[4].scene.task}</span>
                                </div>
                                <div className={styles.level_4}>难度指数：<LevelStar level={recommend_list[4].level}/></div>
                                <a className={styles.start_4} href={`#/study/dm?id=${recommend_list[4].id}`}>开始</a>
                            </div>
                        </div>
                    </Carousel>
                    <div className={styles.left_btn} onClick={() => this.prevPage()}>&lt;</div>
                    <div className={styles.right_btn} onClick={() => this.nextPage()}>&gt;</div>
                </div>
            )
        } else {
            return (
                <Spin delay={500} tip='loading...'>
                    <div style={{width: '1200px', height: '400px', backgroundColor: '#eee'}}></div>
                </Spin>
            )
        }
  }
}

function mapStateToProps({ study }) {
    return {...study};
}

export default connect(mapStateToProps)(CarouselBot);