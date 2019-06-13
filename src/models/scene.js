import services from '../services/services';

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
    },
    subscriptions: {
        setup({ dispatch, history }) {
            console.log(history)
        }
    }
}