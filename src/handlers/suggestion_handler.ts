import { suggest, commandsList } from './suggester';

export const suggestionList = (prefix: string = ''): string[] => {
  if (!prefix) {
    return commandsList();
  }

  return suggest(prefix);
};

export const suggestionHandler = (prefix: string = '', trigger: string) => {
  const suggestions = suggestionList(prefix);

  if (!suggestions || suggestions?.length === 0) {
    return {
      suggestions: [prefix],
      prefix,
      replacement: null,
    };
  }

  let replacement = null;
  if (suggestions?.length === 1) {
    const singleSuggestion = suggestions[0];
    replacement = `${trigger}${singleSuggestion}`;
    prefix = singleSuggestion as string;
  }

  return { suggestions, prefix, replacement };
};
