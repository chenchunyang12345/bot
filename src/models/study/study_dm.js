import services from '../../services/services';
import { message } from 'antd';

export default {
    namespace: 'study_dm',
    state: {
        session_id: null,
        talk_history: [],
        visible_finish: false,
        card_detail: {},
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
            payload.forEach((item, idx) => {
                talk_history.push({ num: 1, word: item.query });
                talk_history.push({ num: 2, word: item.answer });
            })
            return { ...state, talk_history };
        },
        setCard_detail(state, { payload: card_detail }) {
            return { ...state, card_detail };
        }
    },
    effects: {
        *openSession({ id } , { call, put }) {
            // message.loading('正在开启对话功能...', 0);
            const res = yield call(services.study_dm['openSession'], { id });
            if(res.err) {
                console.log(res)
                message.error('开启对话失败', 2);
            } else {
                message.success('开启对话成功', 2);
                yield put({ type: 'setSessionId', payload: res.data.msg.id });
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
            }
        },
        *getCardInfo({ id }, { call, put }) {
            const res = yield call(services.study_dm['getCardInfo'], { id });
            if(res.err) {
                message.error('获取当前场景任务信息失败', 2);
            } else {
                yield put({ type: 'setCard_detail', payload: res.data.msg });
            }
        }
    },
    subscriptions: {
        setup({ dispatch, history }) {
            history.listen(location => {
                if(location.pathname === '/study/dm') {
                    dispatch({
                        type: 'getCardInfo',
                        id: location.query.id,
                    })
                    // 地址栏如果传了sessionId，那么表示想继续对话
                    if(location.query.sessionId) {
                        dispatch({
                            type: 'getHistory',
                            id: location.query.sessionId,
                        })
                    } else {
                        dispatch({
                            type: 'openSession',
                            id: location.query.id,
                        })
                    }
                } else {
                    dispatch({
                        type: 'resetTalk',
                    })
                }
            })
        }
    }
}