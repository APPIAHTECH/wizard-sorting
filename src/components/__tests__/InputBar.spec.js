import {mount} from '@vue/test-utils';
import {describe, expect, it, beforeEach} from 'vitest';
import InputBar from './../chats/InputBar.vue';


describe('InputBar.vue', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = mount(InputBar);
    });

    it('renders the input field correctly', () => {
        const input = wrapper.find('input');
        expect(input.exists()).toBe(true);
        expect(input.attributes('placeholder')).toBe('Type a message here...');
    });

    it('updates the userInput data property when typing', async () => {
        const input = wrapper.find('input');
        await input.setValue('Hello, World!');
        expect(wrapper.vm.userInput).toBe('Hello, World!');
    });

    it('emits "message-sent" with the correct message when Enter is pressed', async () => {
        const input = wrapper.find('input');
        await input.setValue('Hello, World!');

        // Trigger the Enter key
        await input.trigger('keyup.enter');

        // Check that the correct event has been emitted
        expect(wrapper.emitted('message-sent')).toBeTruthy();
        expect(wrapper.emitted('message-sent')[0]).toEqual(['Hello, World!']);
    });

    it('does not emit "message-sent" if the input is empty', async () => {
        const input = wrapper.find('input');
        await input.setValue(''); // Set empty input

        // Trigger the Enter key
        await input.trigger('keyup.enter');

        // Check that no event has been emitted
        expect(wrapper.emitted('message-sent')).toBeUndefined();
    });

    it('applies the focused class when the input is focused', async () => {
        const input = wrapper.find('input');
        await input.trigger('focus');
        expect(wrapper.classes()).toContain('input-bar-focused');
    });

    it('removes the focused class when the input is blurred', async () => {
        const input = wrapper.find('input');
        await input.trigger('focus'); // Focus the input
        await input.trigger('blur'); // Then blur it
        expect(wrapper.classes()).not.toContain('input-bar-focused');
    });
});
