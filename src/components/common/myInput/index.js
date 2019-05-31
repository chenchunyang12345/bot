import React, { Component } from 'react';
import styles from './index.less';

class MyInput extends Component {
    render() {
        let { placeholder, className, prefix, icon_width, icon_height } = this.props;
        return (
            <div className={className} style={{position: 'relative', borderBottom: '2px solid #DCDEE3'}}>
                {/* 如果同时传递了图片的宽度和长度，就设置图片为传递的 */}
                {
                    icon_width && icon_height ?
                    <img src={prefix} className={styles.img} style={{width: icon_width, height: icon_height}}/> :
                    <img src={prefix} className={styles.img}/>
                }
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
