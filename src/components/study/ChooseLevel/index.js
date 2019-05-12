import React, { Component } from 'react';
import styles from './index.less';

import classnames from 'classnames';

// 设置难度级别
const LEVELS = [
    '难度1',
    '难度2',
    '难度3',
]

class ChooseCustom extends Component {
    constructor(props) {
        super(props);
        this.state = {
            practice_level: 1,
        }
    }

    render() {
        let { practice_level } = this.state;
        return (
            <div className={styles.content}>
                {
                    LEVELS.map((level, idx) => {
                        return (
                            <div className={classnames({
                                [styles.level_wrap]: true,
                                [styles.choose]: practice_level === idx + 1 ? true : false,
                            })}
                                // onClick={}
                                key={idx}    
                            >
                                {level}
                            </div>
                        )
                    })
                }
            </div>
        )
  }
}

export default ChooseCustom;