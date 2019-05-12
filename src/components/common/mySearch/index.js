import React, { Component } from 'react';
import styles from './index.less';

import { Input, Icon } from 'antd';

class MySearch extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let { ...props } = this.props;
        return (
            <div className={styles.content}>
                <Input {...props}></Input>
                <div className={styles.icon}></div>
            </div>
        )
  }
}

export default MySearch;