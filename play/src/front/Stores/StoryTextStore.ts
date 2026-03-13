import { writable } from "svelte/store";

export interface StoryTextEntry {
    id: string;
    text: string;
    position: "top" | "center" | "bottom";
    style: "cinematic" | "subtitle" | "narration" | "alert";
    color: string;
    size: number;
    duration: number;
    fadeIn: number;
    fadeOut: number;
    letterbox: boolean;
}

function createStoryTextStore() {
    const { subscribe, set, update } = writable<StoryTextEntry | null>(null);
    const triggeredOnce = new Set<string>();

    let timeout: ReturnType<typeof setTimeout> | null = null;

    return {
        subscribe,

        show(
            text: string,
            options: {
                id?: string;
                position?: string;
                style?: string;
                color?: string;
                size?: number;
                duration?: number;
                fadeIn?: number;
                fadeOut?: number;
                letterbox?: boolean;
                once?: boolean;
            } = {}
        ): void {
            const id = options.id ?? text;

            if (options.once && triggeredOnce.has(id)) {
                return;
            }
            if (options.once) {
                triggeredOnce.add(id);
            }

            if (timeout) {
                clearTimeout(timeout);
                timeout = null;
            }

            const entry: StoryTextEntry = {
                id,
                text,
                position: (options.position as StoryTextEntry["position"]) ?? "bottom",
                style: (options.style as StoryTextEntry["style"]) ?? "cinematic",
                color: options.color ?? "#ffffff",
                size: options.size ?? 24,
                duration: options.duration ?? 4000,
                fadeIn: options.fadeIn ?? 500,
                fadeOut: options.fadeOut ?? 500,
                letterbox: options.letterbox ?? false,
            };

            set(entry);

            if (entry.duration > 0) {
                timeout = setTimeout(() => {
                    set(null);
                    timeout = null;
                }, entry.duration);
            }
        },

        hide(): void {
            if (timeout) {
                clearTimeout(timeout);
                timeout = null;
            }
            set(null);
        },

        resetTriggered(): void {
            triggeredOnce.clear();
        },
    };
}

export const storyTextStore = createStoryTextStore();
