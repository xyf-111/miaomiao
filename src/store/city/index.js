const state = {
    nm: window.localStorage.getItem('nowCity') || '北京',
    id: window.localStorage.getItem('nowCityid') || '110100'
};
const mutations = {
    cityMutation(state, payload) {
        state.nm = payload.nm
        state.id = payload.id
    }
};
const actions = {

};
export default ({
    namespaced: true,
    state,
    mutations,
    actions
})