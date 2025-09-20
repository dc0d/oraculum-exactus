import { App, Plugin, type PluginManifest } from 'obsidian';
import { OracleEditorSuggest } from './src/plugins';
import {
  type Settings,
  getDefaultSettings,
  type SettingsStorage,
} from './src/settings';
import { SettingTab } from './src/tabs';

export default class OraculumExactusPlugin
  extends Plugin
  implements SettingsStorage
{
  settings: Settings = getDefaultSettings();

  constructor(app: App, manifest: PluginManifest) {
    super(app, manifest);
  }

  async onload() {
    await this.#loadSettings();

    this.addSettingTab(new SettingTab(this.app, this));
    this.registerEditorSuggest(new OracleEditorSuggest(this.app, this));
  }

  async onunload() {}

  // SettingsStorage implementation

  async readSettings(): Promise<Settings> {
    await this.#loadSettings();
    return this.settings;
  }

  readSettingsSync(): Settings {
    return { ...this.settings };
  }

  async writeSettings(settings: Settings): Promise<void> {
    this.settings = settings;
    await this.#saveSettings();
  }

  // Support functions

  async #loadSettings() {
    this.settings = Object.assign(
      {},
      getDefaultSettings(),
      await this.loadData(),
    );
  }

  async #saveSettings() {
    await this.saveData(this.settings);
  }
}
