import React, { Component } from 'react';
import styles from './index.less';
import classnames from 'classnames';
import { connect } from 'dva';

class SceneCard extends Component {
    constructor(props) {
        super(props);
    }

    handleChoose(id) {
        this.props.dispatch({
            type: 'study_customize/setSceneId',
            payload: id,
        })
    }

    render() {
        let { detail, scene_id } = this.props;
        return (
            <div 
                className={classnames({
                    [styles.card_wrap]: true,
                    [styles.card_choose]: scene_id === detail.id ? true : false,
                })}
                onClick={() => this.handleChoose(detail.id)}
            >
                <div className={styles.bg_img}></div>
                <div className={styles.scene}>
                    场景：
                    <span>{detail.name}</span>
                </div>
                <div className={styles.task}>
                    任务：
                    <span>{detail.task}</span>
                </div>
            </div>
        )
  }
}

function mapStateToProps({ study_customize }) {
    return{ ...study_customize };
}

export default connect(mapStateToProps)(SceneCard);