import {describe, expect, it} from 'vitest';
import {mount} from '@vue/test-utils'
import ChatBox from './../chats/ChatBox.vue';
import ChatMessage from './../chats/ChatMessage.vue';


describe('ChatBox.vue', () => {
    const messages = [
        {text: 'Hello', isUser: true},
        {text: 'Hi there!', isUser: false},
    ];

    it('renders messages correctly', () => {
        const wrapper = mount(ChatBox, {
            props: {messages}
        });

        // Check if the correct number of messages are rendered
        const chatMessages = wrapper.findAllComponents(ChatMessage);
        expect(chatMessages).toHaveLength(messages.length);

        // Verify the contents of the first message
        expect(chatMessages[0].props('message')).toBe('Hello');
        expect(chatMessages[0].props('isUser')).toBe(true);

        // Verify the contents of the second message
        expect(chatMessages[1].props('message')).toBe('Hi there!');
        expect(chatMessages[1].props('isUser')).toBe(false);
    });

    it('scrolls to the bottom on update', async () => {
        const wrapper = mount(ChatBox, {
            props: {messages}
        });

        // Mocking $refs
        wrapper.vm.$refs.chatBox = {
            scrollTop: 0,
            scrollHeight: 1000,
        };

        // Trigger an update
        await wrapper.vm.$nextTick();

        // Assert that scrollTop equals scrollHeight
        expect(wrapper.vm.$refs.chatBox.scrollTop).toBe(wrapper.vm.$refs.chatBox.scrollHeight);
    });
});
