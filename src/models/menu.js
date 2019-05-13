export default {
    namespace: 'menu',
    state: {
        current: 'home',   // 当前导航栏选中项
    },
    reducers: {
        handleClick(state, { payload }) {
            return {...state, current: payload};
        }
    },
    effects: {

    },
    subscriptions: {
        setup({ dispatch, history }) {
            // 根据路由看哪个导航被选中
            const pathname = history.location.pathname;
            if (!pathname.lastIndexOf('/')) {
                // 说明路径为'/'+路由
                dispatch({
                    type: 'handleClick',
                    payload: pathname.slice(1)
                })
            } else {
                // 说明路径为'/'+路由+'/'+...
                dispatch({
                    type: 'handleClick',
                    payload: pathname.match(/^\/(\w+)\//)[1]
                })
            }
        }
    }
}