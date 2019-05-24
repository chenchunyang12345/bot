export default {
    namespace: 'message',
    state: {
        message_list: [],   // 要展示的消息
    },
    reducers: {
        listenMessage(state, { payload }) {
            let newTip = [];
            payload.forEach(item => {
                if(item.type === 'message_tip') {
                    newTip.push(item.params.content);
                }
            })
            let newList = state.message_list.concat(newTip);
            return { ...state, message_list: newList };
        },
        clearMessage(state) {
            return { ...state, message_list: [] };
        },
    },
    effects: {

    },
    subscriptions: {
        setup({ dispatch, history }) {
            
        }
    }
}