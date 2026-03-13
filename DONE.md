# Christian's Story — What's Been Done

## ✅ 1. Player Name Hard-Coded to "Christian"
- **File:** `play/src/front/Phaser/Login/LoginScene.ts`
- The login screen is completely skipped — no name input needed
- Player name is automatically set to **"Christian"** on every launch

## ✅ 2. Story Zone System (Tiled Integration)
18 new custom properties added to the engine so you can place story triggers directly in **Tiled**.

### New Properties (use in Tiled)
| Property | Type | Description |
|---|---|---|
| `storyText` | string | Text to display on screen when Christian enters the zone |
| `storyTextPosition` | string | `top`, `center`, or `bottom` (default: `bottom`) |
| `storyTextDuration` | int | How long text stays on screen in ms (default: `4000`) |
| `storyTextStyle` | string | `cinematic`, `subtitle`, `narration`, or `alert` |
| `storyTextColor` | string | Hex color like `#ff0000` (default: `#ffffff`) |
| `storyTextSize` | int | Font size in px (default: `24`) |
| `storyVideo` | string | Video URL to play |
| `storyVideoSkippable` | bool | Can player skip the video? |
| `storyMusic` | string | Background music URL |
| `storyMusicLoop` | bool | Loop the music? |
| `storySetFlag` | string | Set a story progress flag |
| `storyRequireFlag` | string | Only trigger if this flag is set |
| `storyOnce` | bool | Only trigger once per playthrough |
| `storyFadeIn` | int | Fade-in duration in ms |
| `storyFadeOut` | int | Fade-out duration in ms |
| `storyLetterbox` | bool | Show cinematic black bars |
| `storyTrigger` | string | `onenter` or `onaction` |
| `storyTriggerMessage` | string | Custom "Press SPACE to..." text |

### Files Created
- `play/src/front/Stores/StoryTextStore.ts` — Svelte store managing story text state
- `play/src/front/Components/Story/StoryTextOverlay.svelte` — Overlay component with 4 text styles

### Files Modified
- `libs/map-editor/src/types.ts` — Added 18 story properties to `GameMapProperties` enum
- `play/src/front/Phaser/Game/GameMapPropertiesListener.ts` — Listens for `storyText` property changes
- `play/src/front/Components/MainLayout.svelte` — Wired in `StoryTextOverlay` component

## ✅ 3. Demo Map
- **File:** `maps/christian-story-demo/map.json`
- 20x20 tile map with 5 story zones demonstrating all text styles:
  - **Intro Zone** — Cinematic + letterbox, triggers once
  - **Narration Zone** — Italic blue whisper text
  - **Danger Zone** — Red pulsing alert, 36px
  - **Subtitle Zone** — NPC dialogue with dark background
  - **Discovery Zone** — Cinematic + letterbox, triggers once

## 🗺️ How to Use in Tiled
1. Open any map in Tiled
2. Create an **Object Layer** (e.g., `story_zones`)
3. Draw a **rectangle** where you want the trigger
4. Add **Custom Properties** to the rectangle (e.g., `storyText`, `storyTextStyle`, etc.)
5. Save — the game reads them automatically when Christian walks in

## 📁 All Changed/Created Files
```
NEW:  play/src/front/Stores/StoryTextStore.ts
NEW:  play/src/front/Components/Story/StoryTextOverlay.svelte
NEW:  maps/christian-story-demo/map.json
NEW:  DONE.md
MOD:  libs/map-editor/src/types.ts
MOD:  play/src/front/Phaser/Login/LoginScene.ts
MOD:  play/src/front/Phaser/Game/GameMapPropertiesListener.ts
MOD:  play/src/front/Components/MainLayout.svelte
```
