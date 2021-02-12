import Vue from 'vue';
import Vuex from 'vuex';

import modal from "./modules/modal"
import data from "@/utils/data.json"

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        alphabet: data.alphabet
    },
    modules: {
        modal
    },
    
    
});

export default store;