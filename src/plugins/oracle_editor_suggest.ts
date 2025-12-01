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
import { type Settings, reader } from '../settings';

export class OracleEditorSuggest extends EditorSuggest<string> {
  #settings: Settings = reader.settings;
  #prefixValue: string = '';

  constructor(app: App) {
    super(app);
    reader.onChange((settings: Settings) => {
      this.#settings = settings;
    });
  }

  get #prefix() {
    return this.#prefixValue;
  }

  set #prefix(v: string) {
    if (!v) {
      v = '';
    }
    this.#prefixValue = v;
  }

  get #trigger() {
    return this.#settings.trigger;
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
      this.#trigger,
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
  getSuggestions(context: EditorSuggestContext): string[] | Promise<string[]> {
    const { suggestions, prefix, replacement } = suggestionHandler(
      this.#prefix,
      this.#trigger,
    );

    if (replacement) {
      context.editor.replaceRange(replacement, context.start, context.end);
    }
    this.#prefix = prefix;

    return suggestions;
  }

  // 3
  renderSuggestion(suggestion: string, el: HTMLElement): void {
    el.createEl('div', { text: suggestion });
  }

  // 4
  selectSuggestion(suggestion: string, evt: MouseEvent | KeyboardEvent): void {
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
