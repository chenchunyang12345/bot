import React, { Component } from 'react';
import styles from './index.less';

import { Input } from 'antd';

class MySearch extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let { handleSearch, ...props } = this.props;
        return (
            <div className={styles.content}>
                <Input {...props}></Input>
                <div className={styles.icon} onClick={() => handleSearch()}></div>
            </div>
        )
  }
}

export default MySearch;