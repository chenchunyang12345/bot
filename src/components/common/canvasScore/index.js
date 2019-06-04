import React, { Component } from 'react';
import styles from './index.less';

const BORDERWIDTH = 8; // 设置边框的宽度
const OFFSET = 0.01;   // 圆环两端变为圆角后会变长，所以画圆边框时要考虑一点偏差

class CanvasScore extends Component {

    componentDidMount() {
        // 获取canvas及画笔
        let { id, width, height, score, fillColor, borderColor } = this.props;
        let canvas = document.getElementById(id);
        let context = canvas.getContext('2d');

        // 设置半径
        canvas.width = width;
        canvas.height = height;
        
        // 绘制(起始位置为-0.5π, 转一圈到1.5π)
        
        // 内填充
        context.beginPath();
        context.arc(width / 2, height / 2, width / 2, -0.5 * Math.PI, 1.5 * Math.PI, false);
        context.fillStyle = fillColor;
        context.fill();
        context.closePath();
        
        // 外边框
        context.beginPath();
        let percent = this.toPercent(score);
        context.arc(width / 2, height / 2, width / 2 - BORDERWIDTH / 2, (-0.5 + OFFSET) * Math.PI, (percent - OFFSET) * Math.PI, false);
        context.strokeStyle = borderColor;
        context.lineWidth = BORDERWIDTH;
        context.lineCap = 'round';
        context.stroke();
        context.closePath();
        
    }

    // 根据分数算π前面的数值
    toPercent(score) {
        // 经过数学规律计算可得
        return score * 2 / 100 - 0.5;
    }

    render() {
        let { id, width, height, score } = this.props;
        // 分数的样式
        const fontStyle = {
            width: width, 
            height: height, 
            lineHeight: height + 'px', 
            textAlign: 'center',
            color: '#333',
            fontSize: '38px',
            fontWeight: 'bold',
        }
        return (
            <div>
                <canvas id={id}>
                    您的浏览器不支持canvas，请升级！！
                </canvas>
                {/* 设置一个垂直居中的分数 */}
                <div 
                    className={styles.score} 
                    style={fontStyle}
                >{score}</div>
            </div>
        );
    }
}

export default CanvasScore;
