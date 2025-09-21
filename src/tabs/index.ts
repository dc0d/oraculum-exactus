import { App, PluginSettingTab, Setting, Plugin } from 'obsidian';
import { type Settings, reader } from '../settings';

export class SettingTab<T extends Plugin> extends PluginSettingTab {
  constructor(
    app: App,
    plugin: T,
    private settingsWriter: (
      settings: Settings,
    ) => Promise<void> = async () => {},
  ) {
    super(app, plugin);
  }

  display(): void {
    let { containerEl } = this;

    containerEl.empty();

    const settings: Settings = reader.settings;
    new Setting(containerEl).setName('Trigger').addText((text) =>
      text
        .setPlaceholder(settings.trigger)
        .setValue(settings.trigger)
        .onChange(async (value) => {
          await this.settingsWriter({ ...settings, trigger: value });
        }),
    );
  }
}
