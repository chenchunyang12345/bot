import React, { Component } from 'react';
import { connect } from 'dva';

import './index.less';

const initColor = '#c4c6cf';    // 初始颜色
const passColor = '#5584ff';    // 经过路径的颜色

class Scene extends Component {

    componentDidMount() {
        // 初始化canvas
        this.initCanvas();

        // 获取数据再渲染
        // new Promise((resolve, reject) => {
        //     this.props.dispatch({
        //         type: 'scene/getScenePointInfo',
        //         resolve,
        //         reject,
        //     })
        // }).then((data) => {
            // console.log(data[0])
            let data = [
                {
                    "totalGraph": {
                        "接洽":["目的","方便异议"],
                        "方便异议":["目的"],
                        "目的":["时间地点","见面异议"],
                        "见面异议":["时间地点"],
                        "时间地点":["总结","时间异议/地点异议"],
                        "时间异议/地点异议":["总结"]
                    },
                    "graphList": [["接洽","目的","见面异议","时间地点","总结"]],
                    "nodes": [
                      "时间地点",
                      "时间异议/地点异议",
                      "接洽",
                      "总结",
                      "方便异议",
                      "目的",
                      "见面异议"
                    ]
                  }
            ]
            let nodes = data[0].nodes;               // 所有点
            let passNodesList = data[0].graphList;   // 经过的点数组
            let totalGraph = data[0].totalGraph;     // 所有的有向线

            // 创建一个新的图形
            let graph = new Springy.Graph();

            // 创建点
            let arrNode = [];   // 暂存这些点，以便画线
            nodes.forEach((node, idx) => {
                arrNode[idx] = graph.newNode({label: node, color: this.judgeNodeColor(node, passNodesList)});
            })

            // 创建线
            let changeLineArr = this.changeLine(totalGraph);   // 改造数据
            let renderLineArr = this.relationLine(changeLineArr, arrNode)   // 将新数组里面每一项替换成对应的arrNode中每一项
            renderLineArr.forEach((line, idx) => {
                graph.newEdge(line[0], line[1], {color: this.judgeLineColor(line, passNodesList), weight: 3});
            })
            

            // 绘制
            $('#scene').springy({ graph: graph });
        // })
    }

    // 初始canvas尺寸
    initCanvas() {
        // 设置canvas的尺寸
        let canvas = document.getElementById('scene');
        canvas.width = 1200;
        canvas.height = document.documentElement.clientHeight - 5;
    }

    // 判断点的颜色
    judgeNodeColor(node, passNodesList) {
        let color = initColor;
        passNodesList.forEach((passNode, idx) => {
            passNode.forEach(nodeItem => {
                if(nodeItem === node) {
                    color = passColor;
                }
            })
        })
        return color;
    }

    // 改造有向线数组
    changeLine(obj) {
        let changelineArr = [];
        Object.keys(obj).forEach((key, idx) => {
            obj[key].forEach(item => {
                changelineArr.push([key, item])
            })
        })
        return changelineArr;
    }

    // 新有向线数组与点数组建立联系
    relationLine(lineArr, nodeArr) {
        lineArr.forEach(line => {
            line.forEach((item, idx) => {
                // 每一项去nodeArr里面找对应的
                nodeArr.forEach((node, node_idx) => {
                    if(node.data.label === item) {
                        line[idx] = node;
                    }
                })
            })
        })
        return lineArr;
    }
    

    // 判断线的颜色
    judgeLineColor(lineArr, passLineArr) {
        let color = initColor;
        // 判断两个点是否在经过的路径数组中为对应的前后关系
        passLineArr.forEach(line => {
            let a = line.findIndex(item => item === lineArr[0].data.label);
            let b = line.findIndex(item => item === lineArr[1].data.label);
            if(a === -1 || b === -1) {
                return;
            }
            if(b - a === 1) {
                color = passColor;
            }
        })
        return color;
    }

    render() {
        return (
            <canvas id='scene' style={{backgroundColor: 'white', borderLeft: '1px solid #ccc', borderRight: '1px solid #ccc'}}>当前浏览器不支持canvas，请升级或更换浏览器！</canvas>
        );
    }
}

function mapStateToProps({ scene }) {
    return { ...scene };
}

export default connect(mapStateToProps)(Scene);
