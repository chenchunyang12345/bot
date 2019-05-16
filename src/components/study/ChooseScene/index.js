import React, { Component } from 'react';
import styles from './index.less';
import { connect } from 'dva';

import { Pagination } from 'antd';
import classnames from 'classnames';

import SceneCard from './SceneCard';

class ChooseScene extends Component {
    constructor(props) {
        super(props);
        this.state = {
            choose_tab: 1,  // 选择的tab序号
        }
    }

    renderTabs() {
        let { choose_tab } = this.state;
        let { scene_type } = this.props;
        return scene_type.map((scene, idx) => {
            return (
                <div 
                    key={idx}
                    className={classnames({
                        [styles.items]: true,
                        [styles.choose]: choose_tab === idx + 1 ? true : false
                    })} 
                    onClick={() => this.setState({choose_tab: idx + 1})}
                >{scene}</div>
            )
        })
    }

    renderCards() {
        let { scene_list } = this.props;
        return scene_list.map((scene, idx) => {
            return <SceneCard
                        key={idx}
                        detail={scene}
                    />
        })
    }

    render() {
        console.log(this.props)
        let { scene_total, scene_size, scene_current } = this.props;
        return (
            <div>
                <div className={styles.content}>
                    <div className={styles.tabs}>
                        {
                            this.renderTabs()
                        }
                    </div>
                    <div className={styles.detail}>
                        {
                            this.renderCards()
                        }
                    </div>
                </div>
                <div className={styles.change_page}>
                    <Pagination
                        current={scene_current}
                        pageSize={scene_size}
                        total={10}
                        // onChange={() => }
                    ></Pagination>
                </div>
            </div>
        )
  }
}

function mapStateToProps({ study_customize }) {
    return {...study_customize};
}

export default connect(mapStateToProps)(ChooseScene);