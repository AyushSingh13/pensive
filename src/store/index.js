import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex)

// Settings
import { wordsApiKey } from "../settings";
import { vocabularyRef, documentsDbRef } from "../firebase";

import marked from "marked";

let markdown =
    `# Heading 1
## Heading 2
### Heading 3
#### Heading 4
##### Heading 5
###### Heading 6

This is _italics_ and this is **bold**.

### List
- [ ] item 1
- [ ] item 2
- [x] item 3 (done)

\`\`\`javascript
let add = (x, y) => x + y;
\`\`\`

Maths:
$\\omega$
`;

export default new Vuex.Store({
    state: {
        existingWords: [],
        documents: [],
        activeSidebar: "VocabularySet",
        searchTerm: "",
        textareaValue: "",
        markdown: markdown,
        isMarkdownPreviewMode: false,
        codeMirrorOptions: {
            tabSize: 2,
            lineWrapping: true,
            mode: 'text/x-markdown',
            theme: 'base16-light',
            autofocus: true,
        },
        isInsertModalOpen: false,
        wordsApiKey: wordsApiKey,
    },
    getters: {
        searchTerm: state => state.searchTerm,
        textareaValue: state => state.textareaValue,
        markdown: state => state.markdown,
        filteredVocabulary: state => filterFunc => (
            state.existingWords.filter(filterFunc)
        ),
        compiledMarkdown: state => marked(state.markdown, {
            sanitize: true,
            smartLists: true,
        })
    },
    mutations: {
        toggleInsertModal: state => Object.assign(
            state, { isInsertModalOpen: !state.isInsertModalOpen }
        ),
        toggleMarkdownPreview: state => Object.assign(
            state, { isMarkdownPreviewMode: !state.isMarkdownPreviewMode }
        ),
        updateExistingWords: (state, { updatedWords }) => Object.assign(
            state, { existingWords: updatedWords }
        ),
        updateSearchTermValue: (state, newSearchTerm) => Object.assign(
            state, { searchTerm: newSearchTerm }
        ),
        updateMarkdownValue: (state, updatedMarkdownValue) => Object.assign(
            state, { markdown: updatedMarkdownValue }
        ),
        updateTextareaValue: (state, newTextareaValue) => Object.assign(
            state, { textareaValue: newTextareaValue }
        ),
        changeSidebarTab: (state, sidebarValue) => Object.assign(
            state, { activeSidebar: sidebarValue }
        ),
        updateDocs: (state, { updatedDocuments }) => Object.assign(
            state, { documents: updatedDocuments }
        )
    },
    actions: {
        getArrayOfAllWordsFromDb: ({ commit }) => (
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