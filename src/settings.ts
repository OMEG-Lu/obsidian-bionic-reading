import { App, PluginSettingTab, Setting } from "obsidian";
import type BionicReadingPlugin from "./main";

export interface BionicReadingSettings {
	enabled: boolean;
	/** Fixation strength from 1 (light) to 5 (heavy), mapped to 0.3 - 0.7 */
	fixationLevel: number;
}

export const DEFAULT_SETTINGS: BionicReadingSettings = {
	enabled: true,
	fixationLevel: 3,
};

export function fixationFromLevel(level: number): number {
	return 0.2 + level * 0.1;
}

export class BionicReadingSettingTab extends PluginSettingTab {
	plugin: BionicReadingPlugin;

	constructor(app: App, plugin: BionicReadingPlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const { containerEl } = this;
		containerEl.empty();

		new Setting(containerEl)
			.setName("Enable bionic reading")
			.setDesc("Toggle the bionic reading effect in reading view.")
			.addToggle((toggle) =>
				toggle
					.setValue(this.plugin.settings.enabled)
					.onChange(async (value) => {
						this.plugin.settings.enabled = value;
						await this.plugin.saveSettings();
					})
			);

		new Setting(containerEl)
			.setName("Fixation strength")
			.setDesc(
				"Controls how many letters per word are bolded (1 = light, 5 = heavy)."
			)
			.addSlider((slider) =>
				slider
					.setLimits(1, 5, 1)
					.setValue(this.plugin.settings.fixationLevel)
					.setDynamicTooltip()
					.onChange(async (value) => {
						this.plugin.settings.fixationLevel = value;
						await this.plugin.saveSettings();
					})
			);
	}
}
