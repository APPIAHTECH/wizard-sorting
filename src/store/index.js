// store/index.js
import {createStore} from 'vuex';

const store = createStore({
    state: {
        messages: [
            {text: 'Welcome to the Sorting Hat Test!', isUser: false},
            {text: 'What is your name?', isUser: false},
        ],
        askingName: true,
        title: "Sorting hat",
        currentQuestion: null,
        currentQuestionIndex: 0, // Use to track number of questions left.
        totalQuestions: 1,
        scores: {g: 0, r: 0, h: 0, s: 0},
        questions: [],
        loading: true,
        houseDescriptions: {
            g: "Gryffindor — bravery, helping others and chivalry",
            r: "Ravenclaw — intelligence, knowledge, planning ahead and wit",
            h: "Hufflepuff — hard work, patience, loyalty and fair play",
            s: "Slytherin — ambition, cunningness, heritage and resourcefulness",
        },
        randomResponses: [
            "That's interesting!",
            "Tell me more.",
            "I see.",
            "Can you elaborate?",
            "That's cool!",
            "What else?",
            "How does that make you feel?",
            "I'm here to help!",
            "Let's dive deeper.",
            "Sounds great!",
        ],
    },
    mutations: {
        ADD_MESSAGE(state, message) {
            state.messages.push(message);
        },
        SET_ASKING_NAME(state, asking) {
            state.askingName = asking;
        },
        SET_CURRENT_QUESTION(state, question) {
            state.currentQuestion = question;
        },
        UPDATE_SCORES(state, scores) {
            state.scores.g += scores.g || 0;
            state.scores.r += scores.r || 0;
            state.scores.h += scores.h || 0;
            state.scores.s += scores.s || 0;
        },
        SET_QUESTIONS(state, questions) {
            state.questions = questions;
        },
        SET_LOADING(state, loading) {
            state.loading = loading;
        },
        SET_TOTAL_QUESTIONS(state, totalQuestions) {
            state.totalQuestions = totalQuestions;
        },
        INCREASE_QUESTION_INDEX(state) {
            state.currentQuestionIndex += 1
        },
        RESET_CHAT(state) {
            state.messages = [
                {text: 'Welcome to the Sorting Hat Test!', isUser: false},
                {text: 'What is your name?', isUser: false},
            ];
            state.askingName = true;
            state.currentQuestion = null;
            state.scores = {g: 0, r: 0, h: 0, s: 0};
            state.questions = [];
            state.loading = true;
            state.currentQuestionIndex = 0;
        },
    },
    actions: {
        async fetchQuestions({commit}) {
            commit('SET_LOADING', true);
            try {
                const response = await fetch('/src/assets/questions.json');
                const data = await response.json();
                commit('SET_QUESTIONS', data);
                commit('SET_TOTAL_QUESTIONS', data.length);
            } catch (error) {
                console.error('Error fetching questions:', error);
            } finally {
                commit('SET_LOADING', false);
            }
        },
    },
    getters: {
        getRandomResponses(state) {
            return state.randomResponses;
        },
        getChatWindowTitle(state) {
            return state.title;
        },
        getTotalQuestions(state) {
            return state.totalQuestions;
        },
        getRemainingQuestions(state) {
            return state.totalQuestions - state.currentQuestionIndex
        },
    },
});

export default store;
