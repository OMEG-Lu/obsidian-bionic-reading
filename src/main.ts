import { Plugin } from "obsidian";
import { bionicifyElement } from "./bionic";
import {
	BionicReadingSettingTab,
	DEFAULT_SETTINGS,
	fixationFromLevel,
	type BionicReadingSettings,
} from "./settings";

export default class BionicReadingPlugin extends Plugin {
	settings: BionicReadingSettings = DEFAULT_SETTINGS;

	async onload(): Promise<void> {
		await this.loadSettings();
		this.addSettingTab(new BionicReadingSettingTab(this.app, this));

		this.registerMarkdownPostProcessor((el, _ctx) => {
			if (!this.settings.enabled) return;
			const fixation = fixationFromLevel(this.settings.fixationLevel);
			bionicifyElement(el, fixation);
		});
	}

	async loadSettings(): Promise<void> {
		this.settings = Object.assign(
			{},
			DEFAULT_SETTINGS,
			await this.loadData()
		);
	}

	async saveSettings(): Promise<void> {
		await this.saveData(this.settings);
	}
}
