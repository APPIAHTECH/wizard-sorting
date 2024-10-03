import {mount} from '@vue/test-utils';
import {beforeEach, describe, expect, it} from 'vitest';
import QuestionCard from './../chats/QuestionCard.vue';

import {createStore} from 'vuex';

describe('QuestionCard.vue', () => {
    let wrapper;
    let store;

    const mockStore = {
        state: {
            currentQuestionIndex: 0,
        },
        getters: {
            getTotalQuestions: () => 5,
            getRemainingQuestions: () => 4,
        },
        mutations: {},
        actions: {},
    };

    beforeEach(() => {
        store = createStore(mockStore);
        wrapper = mount(QuestionCard, {
            props: {
                question: {
                    title: 'What is your favorite color?',
                    answers: [
                        {title: 'Red'},
                        {title: 'Blue'},
                        {title: 'Green'},
                        {title: 'Yellow'},
                    ],
                },
            },
            global: {
                plugins: [store],
            },
        });
    });

    it('renders the question title and answers correctly', () => {
        expect(wrapper.find('.question-title').text()).toBe('What is your favorite color?');
        const answerButtons = wrapper.findAll('.answer-button');
        expect(answerButtons).toHaveLength(4);
        expect(answerButtons[0].text()).toBe('Red');
        expect(answerButtons[1].text()).toBe('Blue');
        expect(answerButtons[2].text()).toBe('Green');
        expect(answerButtons[3].text()).toBe('Yellow');
    });


});
