import services from '../services/services';
import { message } from 'antd';

export default {
    namespace: 'scene',
    state: {

    },
    reducers: {

    },
    effects: {
        *getScenePointInfo({ resolve, reject }, { call }) {
            const res = yield call(services.scene['getScenePointInfo']);
            if(res.err) {
                reject(res);
            } else {
                resolve(res.data.msg);
            }
        },
        *deleteProgress({}, { call }) {
            yield call(services.scene['deleteProgress']);
            message.success('已清空');
        },
    },
    subscriptions: {
        setup({ dispatch, history }) {
            console.log(history)
        }
    }
}