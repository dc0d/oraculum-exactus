import { App, PluginSettingTab, Setting, Plugin } from 'obsidian';
import { type SettingsStorage, type Settings } from '../settings';

export class SettingTab<
  T extends Plugin & SettingsStorage,
> extends PluginSettingTab {
  #settingStorage: SettingsStorage;

  constructor(app: App, plugin: T) {
    super(app, plugin);
    this.#settingStorage = plugin;
  }

  display(): void {
    let { containerEl } = this;

    containerEl.empty();

    const settings = this.#settingStorage.readSettingsSync();
    new Setting(containerEl).setName('Trigger').addText((text) =>
      text
        .setPlaceholder(settings.trigger)
        .setValue(settings.trigger)
        .onChange(async (value) => {
          settings.trigger = value;
          await this.#settingStorage.writeSettings(settings);
        }),
    );
  }
}
