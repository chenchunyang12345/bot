import React, { Component } from 'react';
import styles from './index.less';
import { connect } from 'dva';

import classnames from 'classnames';

// 设置难度级别
const LEVELS = [
    '难度1',
    '难度2',
    '难度3',
]

class ChooseCustom extends Component {

    changeLevel(lv) {
        this.props.dispatch({
            type: 'study_customize/setLevel',
            payload: lv,
        })
    }

    render() {
        let { level } = this.props;
        return (
            <div className={styles.content}>
                {
                    LEVELS.map((item, idx) => {
                        return (
                            <div className={classnames({
                                [styles.level_wrap]: true,
                                [styles.choose]: level === idx + 1 ? true : false,
                            })}
                                onClick={() => this.changeLevel(idx + 1)}
                                key={idx}    
                            >
                                {item}
                            </div>
                        )
                    })
                }
            </div>
        )
  }
}

function mapStateToProps({ study_customize }) {
    return { ...study_customize };
}

export default connect(mapStateToProps)(ChooseCustom);