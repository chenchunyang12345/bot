import React, { Component } from 'react';
import styles from './index.less';

class MyInput extends Component {
    render() {
        let { placeholder, className, prefix } = this.props;
        return (
            <div className={className} style={{position: 'relative', borderBottom: '2px solid #DCDEE3'}}>
                <img src={prefix} className={styles.img} />
                <input 
                    type="text" 
                    className={styles.my_input}
                    placeholder={placeholder}
                ></input>
            </div>
        );
    }
}

export default MyInput;
