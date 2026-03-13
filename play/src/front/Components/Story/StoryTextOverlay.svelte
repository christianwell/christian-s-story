<script lang="ts">
    import { fade } from "svelte/transition";
    import { storyTextStore } from "../../Stores/StoryTextStore";

    $: entry = $storyTextStore;
</script>

{#if entry}
    <div
        class="story-overlay pointer-events-none fixed inset-0 z-[2000] flex"
        class:items-start={entry.position === "top"}
        class:items-center={entry.position === "center"}
        class:items-end={entry.position === "bottom"}
        class:letterbox={entry.letterbox}
        in:fade={{ duration: entry.fadeIn }}
        out:fade={{ duration: entry.fadeOut }}
    >
        {#if entry.letterbox}
            <div class="letterbox-bar top" />
            <div class="letterbox-bar bottom" />
        {/if}
        <div
            class="story-text w-full text-center px-8 py-6"
            class:pt-20={entry.position === "top"}
            class:pb-20={entry.position === "bottom"}
        >
            <p
                class="inline-block max-w-3xl mx-auto leading-relaxed"
                class:story-cinematic={entry.style === "cinematic"}
                class:story-subtitle={entry.style === "subtitle"}
                class:story-narration={entry.style === "narration"}
                class:story-alert={entry.style === "alert"}
                style="color: {entry.color}; font-size: {entry.size}px;"
            >
                {entry.text}
            </p>
        </div>
    </div>
{/if}

<style lang="scss">
    .story-overlay {
        pointer-events: none;
        user-select: none;
    }

    .letterbox-bar {
        position: fixed;
        left: 0;
        right: 0;
        height: 60px;
        background: #000;
        z-index: 2001;

        &.top {
            top: 0;
        }
        &.bottom {
            bottom: 0;
        }
    }

    .story-cinematic {
        font-family: "Georgia", serif;
        font-weight: 300;
        letter-spacing: 0.05em;
        text-shadow: 0 2px 8px rgba(0, 0, 0, 0.8), 0 0 20px rgba(0, 0, 0, 0.5);
    }

    .story-subtitle {
        background: rgba(0, 0, 0, 0.7);
        padding: 8px 16px;
        border-radius: 4px;
        font-family: sans-serif;
    }

    .story-narration {
        font-family: "Georgia", serif;
        font-style: italic;
        font-weight: 300;
        letter-spacing: 0.03em;
        text-shadow: 0 2px 12px rgba(0, 0, 0, 0.9);
    }

    .story-alert {
        font-family: sans-serif;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.1em;
        text-shadow: 0 0 10px currentColor, 0 0 30px currentColor;
        animation: pulse 1.5s ease-in-out infinite;
    }

    @keyframes pulse {
        0%,
        100% {
            opacity: 1;
        }
        50% {
            opacity: 0.7;
        }
    }
</style>
