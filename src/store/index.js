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
        wordsApiKey: configSettings.wordsApiKey,
        editorOptions: {
            scrollingContainer: `#quillEditor`,
            modules: {
                toolbar: false
            },
            placeholder: `Write your masterpiece while including some fancy words here...
            
            This editor uses markdown so you can start off with some of the basics such as:

                    - # for headings
                    - **bold**
                    - _italics_
                    - and more!
            `,
            theme: "snow"
        }
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
                    // TODO: Functional
                    let fbKeys, fbVals;
                    [fbKeys, fbVals] = [Object.keys(snap.val()), Object.values(snap.val())];
                    commit('updateExistingWords', { updatedWordsArray: fbVals.map((obj, index) => Object.assign(obj, { key: fbKeys[index] })) });
                } else {
                    commit('updateExistingWords', { updatedWordsArray: [] })
                }
            });
        }
    }
})