import { App, Plugin, type PluginManifest } from 'obsidian';
import { OracleEditorSuggest } from './src/plugins';
import { type Settings, reader } from './src/settings';
import { SettingTab } from './src/tabs';
import { readerWriter } from './src/settings/store';

export default class OraculumExactusPlugin extends Plugin {
  constructor(app: App, manifest: PluginManifest) {
    super(app, manifest);
  }

  async onload() {
    await this.loadSettings();

    this.addSettingTab(
      new SettingTab(this.app, this, (settings: Settings) =>
        this.writeSettings(settings),
      ),
    );
    this.registerEditorSuggest(new OracleEditorSuggest(this.app));
  }

  async onunload(): Promise<void> {}

  private async loadSettings(): Promise<void> {
    readerWriter.settings = Object.assign(
      {},
      reader.settings,
      await this.loadData(),
    );
  }

  private async writeSettings(settings: Settings): Promise<void> {
    readerWriter.settings = settings;
    await this.saveData(readerWriter.settings);
  }
}
