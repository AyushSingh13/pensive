import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex)

// Settings
import { wordsApiKey } from "../settings";
import { vocabularyRef, documentsDbRef } from "../firebase";

export default new Vuex.Store({
    state: {
        existingWords: [],
        documents: [],
        activeSidebar: "VocabularySet",
        searchTerm: "",
        textareaValue: "",
        isInsertModalOpen: false,
        wordsApiKey: wordsApiKey,
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
        textareaValue: state => state.textareaValue,
        filteredVocabulary: state => filterFunc => (
            state.existingWords.filter(filterFunc)
        )
    },
    mutations: {
        toggleInsertModal: state => {
            state.isInsertModalOpen = !state.isInsertModalOpen
        },
        updateExistingWords: (state, { updatedWords }) => {
            state.existingWords = updatedWords;
        },
        updateSearchTermValue: (state, newSearchTerm) => {
            state.searchTerm = newSearchTerm
        },
        updateTextareaValue: (state, newTextareaValue) => {
            state.textareaValue = newTextareaValue
        },
        changeSidebarTab: (state, sidebarValue) => {
            state.activeSidebar = sidebarValue
        },
        updateDocs: (state, { updatedDocuments }) => {
            state.documents = updatedDocuments
        }
    },
    actions: {
        getArrayOfAllWordsFromDB: ({ commit }) => (
            vocabularyRef.onSnapshot(collection => {
                const updatedWords = collection.docs.map(doc => Object.assign(doc.data(), { id: doc.id }))
                commit('updateExistingWords', { updatedWords: updatedWords })
            })
        ),
        getArrayOfAllDocsFromDb: ({ commit }) => (
            documentsDbRef.onSnapshot(collection => {
                const updatedDocuments = collection.docs.map(doc => Object.assign(doc.data(), { id: doc.id }))
                commit('updateDocs', { updatedDocuments: updatedDocuments })
            })
        )
    }
})