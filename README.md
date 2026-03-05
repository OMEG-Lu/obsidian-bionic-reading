# Bionic Reading for Obsidian

An Obsidian plugin that applies a bionic reading effect in **Reading View** -- the first portion of each word is bolded, creating artificial fixation points that help your eyes glide through text faster.

## What it looks like

> **Th**is **is** **wh**at **yo**ur **no**tes **wi**ll **lo**ok **li**ke **wi**th **bio**nic **rea**ding **ena**bled.

Normal text becomes easier to scan as your brain uses the bolded anchors to predict the rest of each word.

## Features

- Works automatically in **Reading View** (source/editor mode is untouched)
- **Latin-only** -- only processes English and other Latin-alphabet text; Chinese, Japanese, Korean, and other scripts are left untouched
- Skips code blocks, inline code, math blocks, and SVG elements
- Non-destructive -- your markdown files are never modified
- Configurable fixation strength

## Settings

| Setting | Description |
|---------|-------------|
| **Enable bionic reading** | Toggle the effect on/off without uninstalling the plugin |
| **Fixation strength** | Slider from 1 (light) to 5 (heavy) -- controls how many letters per word are bolded |

## Installation

### From Community Plugins (once approved)

1. Open **Settings > Community plugins**
2. Search for **Bionic Reading**
3. Click **Install**, then **Enable**

### Manual Installation

1. Download `main.js`, `manifest.json`, and `styles.css` from the [latest release](https://github.com/yufenglu/obsidian-bionic-reading/releases/latest)
2. Create a folder at `<your-vault>/.obsidian/plugins/bionic-reading/`
3. Copy the three files into that folder
4. Restart Obsidian and enable the plugin in **Settings > Community plugins**

## Development

```bash
npm install
npm run dev    # watch mode
npm run build  # production build
```
