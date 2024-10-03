import {mount} from '@vue/test-utils';
import {describe, expect, it} from 'vitest';
import ChatButton from './../chats/ChatButton.vue';

describe('ChatButton.vue', () => {

    it('toggles chat state when button is clicked', async () => {
        const wrapper = mount(ChatButton);

        // Initial state
        expect(wrapper.vm.isChatOpen).toBe(false);

        // Simulate button click
        await wrapper.find('.chat-button').trigger('click');

        // Check if the chat state is toggled
        expect(wrapper.vm.isChatOpen).toBe(true);

        // Check if toggle-chat event is emitted
        expect(wrapper.emitted('toggle-chat')).toBeTruthy();

        // Simulate another click
        await wrapper.find('.chat-button').trigger('click');

        // Check if the chat state is toggled back
        expect(wrapper.vm.isChatOpen).toBe(false);
    });
});
