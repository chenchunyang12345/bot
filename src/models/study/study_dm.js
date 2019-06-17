import services from '../../services/services';
import { message } from 'antd';
import moment from 'moment';

export default {
    namespace: 'study_dm',
    state: {
        session_id: null,
        talk_history: [],
        visible_finish: false,
        card_detail: {},
        step_number: 0,     // 当前进行到的步骤序号
        all_steps: [],      // 所有的步骤点
        now_steps: [],      // 现在的步骤点
    },
    reducers: {
        setSessionId(state, { payload: session_id }) {
            return { ...state, session_id };
        },
        updateTalk(state, { payload, num }) {
            // 用展开符复制一份新的
            let new_history = [...state.talk_history];
            new_history.push({num, word: payload});
            return { ...state, talk_history: new_history };
        },
        resetTalk(state) {
            return { ...state, talk_history: [] };
        },
        setVisible(state, { payload: visible_finish }) {
            return { ...state, visible_finish };
        },
        // 继续上次未完成的对话
        initializeTalk(state, { payload }) {
            let talk_history = [];
            // 先在最上面插入时间背景
            let customerName = state.card_detail.customer.username;
            let time = moment(state.card_detail.createTime).format('YYYY年MM月DD日HH时mm分ss秒');
            let word = `${time}，经客户介绍的${customerName}已经接通了您的电话`;
            talk_history.push({ num: 3, word, });
            payload.forEach((item, idx) => {
                talk_history.push({ num: 1, word: item.query });
                talk_history.push({ num: 2, word: item.answer });
            })
            return { ...state, talk_history };
        },
        setCard_detail(state, { payload: card_detail }) {
            return { ...state, card_detail };
        },
        setAllSteps(state, { payload: all_steps }) {
            return { ...state, all_steps };
        },
        setNowStepNumber(state, { payload }) {    // payload: {name: "接洽", type: "single"}
        console.log(payload)
            let num;
            // 当前步骤对象去所有步骤点里面查是第几个
            state.all_steps.forEach((step, idx) => {
                if(JSON.stringify(step) === JSON.stringify(payload)) {
                    num = idx;
                }
            })
            return { ...state, step_number: num };
        },
        setNowSteps(state, { payload: now_steps }) {
            return { ...state, now_steps };
        }
    },
    effects: {
        *openSession({ id } , { call, put, select }) {
            // message.loading('正在开启对话功能...', 0);
            const res = yield call(services.study_dm['openSession'], { id });
            if(res.err) {
                message.error('开启对话失败', 2);
            } else {
                message.success('开启对话成功', 2);
                // 设置id
                yield put({ type: 'setSessionId', payload: res.data.msg.id });
                // 更新对话，添加时间背景
                let customerName = yield select(state => state.study_dm.card_detail.customer.username);
                let time = moment().format('YYYY年MM月DD日HH时mm分ss秒');
                let word = `${time}，经客户介绍的${customerName}已经接通了您的电话`;
                yield put({ type: 'updateTalk', payload: word, num: 3 })
                // 默认发送一条信息去获得初始化关键点信息
                const init_res = yield call(services.study_dm['talk'], { id: res.data.msg.id, payload: {'query': '初始化'} });
                if(init_res.err) {
                    message.error('初始化关键点信息失败', 2);
                } else {
                    yield put({ type: 'setAllSteps', payload: init_res.data.msg.instructions[0].params.all_node });
                    yield put({ type: 'setNowStepNumber', payload: init_res.data.msg.instructions[0].params.currentState });
                    yield put({ type: 'setNowSteps', payload: init_res.data.msg.instructions[0].params.walked });
                }
            }
        },
        *talk({ id, payload }, { call, put, select }) {
            const session_id = yield select(state => state.study_dm.session_id);
            if( !session_id ) {
                message.warn('请等待对话开启', 2);
                return;
            }
            yield put({ type: 'updateTalk', payload: payload.query, num: 1 });
            const res = yield call(services.study_dm['talk'], { id, payload });
            if(res.err) {
                message.error('对话失败', 2);
            } else {
                // 返回对象里面找到拿到需要的字段‘process’, 并触发对应reducer
                let obj;
                res.data.msg.instructions.forEach((item, idx) => {
                    if(item.type === 'process') {
                        obj = item.params;
                    }
                })
                yield put({ type: 'setNowStepNumber', payload: obj.currentState });
                yield put({ type: 'setNowSteps', payload: obj.walked });
                // 对话结束弹出查看报告modal
                if(res.data.msg.instructions[0].params.title === '结束') {
                    yield put({ type: 'setVisible', payload: true });
                }
                // 监听信息看里面有没有相应的信息点字段
                yield put({ type: 'message/listenMessage', payload: res.data.msg.instructions });
                // 渲染回答
                yield put({ type: 'updateTalk', payload: res.data.msg.result, num: 2 });
            }
        },
        *getHistory({ id }, { call, put }) {
            const res = yield call(services.study_dm['getHistory'], { id });
            if(res.err) {
                message.error('获取历史记录失败', 2);
            } else {
                yield put({ type: 'setSessionId', payload: id });
                yield put({ type: 'initializeTalk', payload: res.data.msg });
                // 初始化关键点信息
                const initHistoryRes = yield call(services.study_dm['getHistoryPoint'], { id });
                if(initHistoryRes.err) {
                    message.error('获取历史关键点信息失败', 2);
                } else {
                    // 判断initHistoryRes中的数据是否为null
                    if(!initHistoryRes.data.msg) {
                        // 默认发送一条信息去获得初始化关键点信息
                        const init_res = yield call(services.study_dm['talk'], { id: id, payload: {'query': '初始化'} });
                        if(init_res.err) {
                            message.error('初始化关键点信息失败', 2);
                        } else {
                            let obj;
                            init_res.data.msg.instructions.forEach((item, idx) => {
                                if(item.type === 'process') {
                                    obj = item.params;
                                }
                            })
                            yield put({ type: 'setAllSteps', payload: obj.all_node });
                            yield put({ type: 'setNowStepNumber', payload: obj.currentState });
                            yield put({ type: 'setNowSteps', payload: obj.walked });
                        }
                    } else {
                        let data = initHistoryRes.data.msg;
                        yield put({ type: 'setAllSteps', payload: data.all_node });
                        yield put({ type: 'setNowStepNumber', payload: data.currentState });
                        yield put({ type: 'setNowSteps', payload: data.walked });
                    }
                }
            }
        },
        *getCardInfo({ id, resolve, reject }, { call, put }) {
            const res = yield call(services.study_dm['getCardInfo'], { id });
            if(res.err) {
                message.error('获取当前场景任务信息失败', 2);
                reject();
            } else {
                yield put({ type: 'setCard_detail', payload: res.data.msg });
                resolve();
            }
        }
    },
    subscriptions: {
        setup({ dispatch, history }) {
            history.listen(location => {
                if(location.pathname === '/study/dm') {
                    // 先获取机器人信息,成功后再去获取历史消息
                    new Promise((resolve, reject) => {
                        dispatch({
                            type: 'getCardInfo',
                            id: location.query.id,
                            resolve,
                            reject,
                        })
                    }).then(() => {
                        // 地址栏如果传了sessionId，那么表示想继续对话
                        if(location.query.sessionId) {
                            dispatch({
                                type: 'getHistory',
                                id: location.query.sessionId,
                            })
                        // 开启了一个新对话
                        } else {
                            dispatch({
                                type: 'openSession',
                                id: location.query.id,
                            })
                        }
                    })
                } else {
                    dispatch({
                        type: 'resetTalk',
                    })
                }
            })
        }
    }
}