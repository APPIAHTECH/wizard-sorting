import {mount} from '@vue/test-utils';
import {describe, expect, it} from 'vitest';
import ChatMessage from './../chats/ChatMessage.vue';


describe('ChatMessage.vue', () => {
    it('renders the message correctly', () => {
        const message = "Hello, how can I assist you?";
        const wrapper = mount(ChatMessage, {
            props: { message, isUser: false }
        });

        // Check if the message is rendered
        expect(wrapper.text()).toContain(message);
    });

    it('applies correct classes based on isUser prop', () => {
        const userMessage = "I'm a user message.";
        const botMessage = "I'm a bot message.";

        // Test for user message
        let wrapper = mount(ChatMessage, {
            props: { message: userMessage, isUser: true }
        });
        expect(wrapper.classes()).toContain('user');
        expect(wrapper.classes()).not.toContain('bot');

        // Test for bot message
        wrapper = mount(ChatMessage, {
            props: { message: botMessage, isUser: false }
        });
        expect(wrapper.classes()).toContain('bot');
        expect(wrapper.classes()).not.toContain('user');
    });

    it('displays the bot label when isUser is false', () => {
        const message = "I'm the bot.";
        const wrapper = mount(ChatMessage, {
            props: { message, isUser: false }
        });

        // Check if the bot label is displayed
        expect(wrapper.find('.bot-label').exists()).toBe(true);
    });

    it('does not display the bot label when isUser is true', () => {
        const message = "I'm a user.";
        const wrapper = mount(ChatMessage, {
            props: { message, isUser: true }
        });

        // Check that the bot label is not displayed
        expect(wrapper.find('.bot-label').exists()).toBe(false);
    });
});
