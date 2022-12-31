﻿import { computed, useAttrs, inject } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'
import { classNames, errorResponseExcept } from 'https://unpkg.com/@servicestack/client/dist/servicestack-client.mjs'

export default {
    template: `
    <div v-if="errorSummary" :class="classNames('bg-red-50 dark:bg-red-200 border-l-4 border-red-400 p-4 rounded-b overflow-hidden', $props.class)" role="alert">
        <div class="flex">
            <div class="flex-shrink-0">
                <svg class="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
                </svg>
            </div>
            <div class="ml-3">
                <p class="text-sm text-red-700 dark:text-red-800">{{ errorSummary }}</p>
            </div>
        </div>
    </div>
    `,
    props: ['status', 'except'],
    setup(props) {
        let ctx = inject('ApiState', undefined)
        const errorSummary = computed(() => props.status || map(ctx, x => x.error.value)
            ? errorResponseExcept.call({ responseStatus: props.status || map(ctx, x => x.error.value) }, props.except)
            : null)

        return {
            cls,
            classNames,
            errorSummary,
        }
    }
}
