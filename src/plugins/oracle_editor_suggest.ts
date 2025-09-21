import {
  App,
  EditorSuggest,
  Editor,
  TFile,
  type EditorPosition,
  type EditorSuggestContext,
  type EditorSuggestTriggerInfo,
} from 'obsidian';

import {
  triggerHandler,
  suggestionHandler,
  selectionHandler,
} from '../handlers';
import { type SettingsReaderSync } from '../settings';

export class OracleEditorSuggest extends EditorSuggest<any> {
  #settingsReader: SettingsReaderSync;
  #_prefix: string = '';

  constructor(app: App, settingsReader: SettingsReaderSync) {
    super(app);
    this.#settingsReader = settingsReader;
  }

  get #prefix() {
    return this.#_prefix;
  }

  set #prefix(v: string) {
    if (!v) {
      v = '';
    }
    this.#_prefix = v;
  }

  // 1
  onTrigger(
    cursor: EditorPosition,
    editor: Editor,
    file: TFile | null,
  ): EditorSuggestTriggerInfo | null {
    const result = triggerHandler(
      editor.getLine(cursor.line),
      cursor.ch,
      this.#settingsReader.readSettingsSync().trigger,
    );
    if (!result) {
      return null;
    }

    const { prefix, ch, query } = result;
    this.#prefix = prefix;

    return {
      start: { line: cursor.line, ch },
      end: cursor,
      query,
    };
  }

  // 2
  getSuggestions(context: EditorSuggestContext): any[] | Promise<any[]> {
    const { suggestions, prefix, replacement } = suggestionHandler(
      this.#prefix,
      this.#settingsReader.readSettingsSync().trigger,
    );

    if (replacement) {
      context.editor.replaceRange(replacement, context.start, context.end);
    }
    this.#prefix = prefix;

    return suggestions;
  }

  // 3
  renderSuggestion(trigger: any, el: HTMLElement): void {
    el.createEl('div', { text: trigger });
  }

  // 4
  selectSuggestion(suggestion: any, evt: MouseEvent | KeyboardEvent): void {
    if (!this?.context?.editor) {
      return;
    }

    const rs = selectionHandler({ selected: suggestion, prefix: this.#prefix });
    (this.context.editor as Editor).replaceRange(
      `${rs} `,
      this.context.start,
      this.context.end,
    );

    this.#prefix = '';

    this.close();
  }
}
