import * as func from './function';

const notepadTheme={
    state: func.theme_local.get() || {
        theme: 'blue'
    },
    getters:{
        getTheme(states){
            return states.theme;
        },
    },
    mutations:{
        SWITCHTHEME(states, obj){
            states.theme = obj.theme;
            func.theme_local.set(states);
        }
    },
    actions:{
        switch_theme : ({commit}, param) => commit('SWITCHTHEME',{theme: param})
    }
}

export default notepadTheme;