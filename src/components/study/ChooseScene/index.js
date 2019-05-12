import React, { Component } from 'react';
import { Pagination } from 'antd';
import classnames from 'classnames';

import styles from './index.less';

import SceneCard from './SceneCard';

class ChooseScene extends Component {
    constructor(props) {
        super(props);
        this.state = {
            choose_tab: 1,  // 选择的tab序号
        }
    }

    render() {
        let { choose_tab } = this.state;
        return (
            <div>
                <div className={styles.content}>
                    <div className={styles.tabs}>
                        <div className={classnames({
                            [styles.items]: true,
                            [styles.choose]: choose_tab === 1 ? true : false
                        })} onClick={() => this.setState({choose_tab: 1})}>电话邀约</div>
                        <div className={classnames({
                            [styles.items]: true,
                            [styles.choose]: choose_tab === 2 ? true : false
                        })} onClick={() => this.setState({choose_tab: 2})}>首次面谈</div>
                    </div>
                    <div className={styles.detail}>
                        <SceneCard></SceneCard>
                        <SceneCard></SceneCard>
                        <SceneCard></SceneCard>
                        <SceneCard></SceneCard>
                    </div>
                </div>
                <div className={styles.change_page}>
                    <Pagination></Pagination>
                </div>
            </div>
        )
  }
}

export default ChooseScene;