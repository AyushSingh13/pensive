import Vue from 'vue';
import Vuex from 'vuex';

// Settings
import configSettings from "../assets/configSettings.json";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        existingWords: [],
        searchTerm: "",
        isInsertModalOpen: false,
        wordsApiKey: configSettings.wordsApiKey
    },
    getters: {
        searchTerm: state => state.searchTerm,
        filteredVocabulary: state => filterFunc => (
            state.existingWords.filter(filterFunc)
        )
    },
    mutations: {
        toggleInsertModal: state => {
            state.isInsertModalOpen = !state.isInsertModalOpen
        },
        updateExistingWords: (state, payload) => {
            state.existingWords = payload.updatedWordsArray
        },
        updateSearchTermValue: (state, newSearchTerm) => {
            state.searchTerm = newSearchTerm
        }
    },
    actions: {
        getArrayOfAllWordsFromDB: ({ commit }, payload) => {
            payload.db.on("value", snap => {
                if (snap.val() != null && snap.val() != undefined) {
                    commit('updateExistingWords', { updatedWordsArray: Object.values(snap.val()) })
                }
            });
        }
    }
})