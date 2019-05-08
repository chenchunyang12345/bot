import React, { Component } from 'react';
import { Carousel } from 'antd';

import styles from './index.less';

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
        return (
            <div className={styles.carousel_container}>
                <Carousel 
                    dots={false}
                    // autoplay={true}
                    ref={el => {this.changeIndex = el}}
                >
                    <div className={styles.card_wrap}>
                        <div className={styles.cardOne_1}>
                            <div className={styles.name_1}>虚拟小男</div>
                            <div className={styles.head_img_1}></div>
                            <div className={styles.sex_age_1}>男&nbsp;/&nbsp;<span>23岁</span></div>
                            <div className={styles.scene_1}>场景：<span>电话邀约---转介绍--接洽</span></div>
                            <div className={styles.task_1}>
                                任务：
                                <span>成功确认对方身份，介绍自己，确认对方是否方便，如果方便何时见面，面谈要点有哪些。成功确认对方身份，介绍自己，确认对方是否...</span>
                            </div>
                            <div className={styles.level_1}>难度指数：<LevelStar level={1}/></div>
                            <div className={styles.start_1}>开始</div>
                        </div>
                        <div className={styles.cardOne_2}>
                            <div className={styles.name_2}>虚拟小女</div>
                            <div className={styles.head_img_2}></div>
                            <div className={styles.sex_age_2}>女&nbsp;/&nbsp;<span>22岁</span></div>
                            <div className={styles.scene_2}>场景：<span>电话邀约---转介绍--接洽</span></div>
                            <div className={styles.task_2}>
                                任务：
                                <span>成功确认对方身份，介绍自己，确认对方是否方便，如果方便何时见面，面谈要点有哪些。成功确认对方身份，介绍自己，确认对方是否...</span>
                            </div>
                            <div className={styles.level_2}>难度指数：<LevelStar level={1}/></div>
                            <div className={styles.start_2}>开始</div>
                        </div>
                        <div className={styles.cardOne_3}>
                            <div className={styles.name_3}>真实小男</div>
                            <div className={styles.head_img_3}></div>
                            <div className={styles.sex_age_3}>男&nbsp;/&nbsp;<span>32岁</span></div>
                            <div className={styles.scene_3}>场景：<span>电话邀约---转介绍--接洽</span></div>
                            <div className={styles.task_3}>
                                任务：
                                <span>成功确认对方身份，介绍自己>成功确认对方身份，介绍自己，确认对方是否...</span>
                            </div>
                            <div className={styles.level_3}>难度指数：<LevelStar level={1}/></div>
                            <div className={styles.start_3}>开始</div>
                        </div>
                        <div className={styles.cardOne_4}>
                            <div className={styles.name_4}>真实小女</div>
                            <div className={styles.head_img_4}></div>
                            <div className={styles.sex_age_4}>女&nbsp;/&nbsp;<span>43岁</span></div>
                            <div className={styles.scene_4}>场景：<span>电话邀约---转介绍--接洽</span></div>
                            <div className={styles.task_4}>
                                任务：
                                <span>成功确认对方身份，介绍自己。成功确认对方身份，介绍自己，确认对方是否...</span>
                            </div>
                            <div className={styles.level_4}>难度指数：<LevelStar level={1}/></div>
                            <div className={styles.start_4}>开始</div>
                        </div>
                    </div>
                    <div className={styles.card_wrap}>
                        <div className={styles.cardTwo_1}>
                            <div className={styles.name_1}>虚拟小男</div>
                            <div className={styles.head_img_1}></div>
                            <div className={styles.sex_age_1}>男&nbsp;/&nbsp;<span>23岁</span></div>
                            <div className={styles.scene_1}>场景：<span>电话邀约---转介绍--接洽</span></div>
                            <div className={styles.task_1}>
                                任务：
                                <span>成功确认对方身份，介绍自己，确认对方是否方便，如果方便何时见面，面谈要点有哪些。成功确认对方身份，介绍自己，确认对方是否...</span>
                            </div>
                            <div className={styles.level_1}>难度指数：</div>
                            <div className={styles.start_1}>开始</div>
                        </div>
                        <div className={styles.cardTwo_2}>
                            <div className={styles.name_2}>虚拟小女</div>
                            <div className={styles.head_img_2}></div>
                            <div className={styles.sex_age_2}>女&nbsp;/&nbsp;<span>22岁</span></div>
                            <div className={styles.scene_2}>场景：<span>电话邀约---转介绍--接洽</span></div>
                            <div className={styles.task_2}>
                                任务：
                                <span>成功确认对方身份，介绍自己，确认对方是否方便，如果方便何时见面，面谈要点有哪些。成功确认对方身份，介绍自己，确认对方是否...</span>
                            </div>
                            <div className={styles.level_2}>难度指数：</div>
                            <div className={styles.start_2}>开始</div>
                        </div>
                        <div className={styles.cardTwo_3}>
                            <div className={styles.name_3}>真实小男</div>
                            <div className={styles.head_img_3}></div>
                            <div className={styles.sex_age_3}>男&nbsp;/&nbsp;<span>32岁</span></div>
                            <div className={styles.scene_3}>场景：<span>电话邀约---转介绍--接洽</span></div>
                            <div className={styles.task_3}>
                                任务：
                                <span>成功确认对方身份，介绍自己>成功确认对方身份，介绍自己，确认对方是否...</span>
                            </div>
                            <div className={styles.level_3}>难度指数：</div>
                            <div className={styles.start_3}>开始</div>
                        </div>
                        <div className={styles.cardTwo_4}>
                            <div className={styles.name_4}>真实小女</div>
                            <div className={styles.head_img_4}></div>
                            <div className={styles.sex_age_4}>女&nbsp;/&nbsp;<span>43岁</span></div>
                            <div className={styles.scene_4}>场景：<span>电话邀约---转介绍--接洽</span></div>
                            <div className={styles.task_4}>
                                任务：
                                <span>成功确认对方身份，介绍自己。成功确认对方身份，介绍自己，确认对方是否...</span>
                            </div>
                            <div className={styles.level_4}>难度指数：</div>
                            <div className={styles.start_4}>开始</div>
                        </div>
                    </div>
                    <div className={styles.card_wrap}>
                        <div className={styles.cardThree_1}>
                            <div className={styles.name_1}>虚拟小男</div>
                            <div className={styles.head_img_1}></div>
                            <div className={styles.sex_age_1}>男&nbsp;/&nbsp;<span>23岁</span></div>
                            <div className={styles.scene_1}>场景：<span>电话邀约---转介绍--接洽</span></div>
                            <div className={styles.task_1}>
                                任务：
                                <span>成功确认对方身份，介绍自己，确认对方是否方便，如果方便何时见面，面谈要点有哪些。成功确认对方身份，介绍自己，确认对方是否...</span>
                            </div>
                            <div className={styles.level_1}>难度指数：</div>
                            <div className={styles.start_1}>开始</div>
                        </div>
                        <div className={styles.cardThree_2}>
                            <div className={styles.name_2}>虚拟小女</div>
                            <div className={styles.head_img_2}></div>
                            <div className={styles.sex_age_2}>女&nbsp;/&nbsp;<span>22岁</span></div>
                            <div className={styles.scene_2}>场景：<span>电话邀约---转介绍--接洽</span></div>
                            <div className={styles.task_2}>
                                任务：
                                <span>成功确认对方身份，介绍自己，确认对方是否方便，如果方便何时见面，面谈要点有哪些。成功确认对方身份，介绍自己，确认对方是否...</span>
                            </div>
                            <div className={styles.level_2}>难度指数：</div>
                            <div className={styles.start_2}>开始</div>
                        </div>
                        <div className={styles.cardThree_3}>
                            <div className={styles.name_3}>真实小男</div>
                            <div className={styles.head_img_3}></div>
                            <div className={styles.sex_age_3}>男&nbsp;/&nbsp;<span>32岁</span></div>
                            <div className={styles.scene_3}>场景：<span>电话邀约---转介绍--接洽</span></div>
                            <div className={styles.task_3}>
                                任务：
                                <span>成功确认对方身份，介绍自己>成功确认对方身份，介绍自己，确认对方是否...</span>
                            </div>
                            <div className={styles.level_3}>难度指数：</div>
                            <div className={styles.start_3}>开始</div>
                        </div>
                        <div className={styles.cardThree_4}>
                            <div className={styles.name_4}>真实小女</div>
                            <div className={styles.head_img_4}></div>
                            <div className={styles.sex_age_4}>女&nbsp;/&nbsp;<span>43岁</span></div>
                            <div className={styles.scene_4}>场景：<span>电话邀约---转介绍--接洽</span></div>
                            <div className={styles.task_4}>
                                任务：
                                <span>成功确认对方身份，介绍自己。成功确认对方身份，介绍自己，确认对方是否...</span>
                            </div>
                            <div className={styles.level_4}>难度指数：</div>
                            <div className={styles.start_4}>开始</div>
                        </div>
                    </div>
                </Carousel>
                <div className={styles.left_btn} onClick={() => this.prevPage()}>&lt;</div>
                <div className={styles.right_btn} onClick={() => this.nextPage()}>&gt;</div>
            </div>
        )
  }
}

export default CarouselBot;