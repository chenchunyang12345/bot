import React, { Component } from 'react';
import styles from './index.less';

class ContactList extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={styles.container}>
                <div className={styles.row}>
                    <div className={styles.head_img}></div>
                    <div className={styles.name}>A 杨羊羊</div>
                    {/* <div className={styles.no_choose}></div> */}
                    <div className={styles.choose}></div>
                </div>
                <div className={styles.row}>
                    <div className={styles.head_img}></div>
                    <div className={styles.name}>A 杨羊羊</div>
                    {/* <div className={styles.no_choose}></div> */}
                    <div className={styles.choose}></div>
                </div>
            </div>
        )
  }
}

export default ContactList;