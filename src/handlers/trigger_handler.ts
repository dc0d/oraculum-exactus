export const triggerHandler = (
  lineContents: string,
  cursorCh: number,
  trigger: string,
) => {
  lineContents = lineContents.toLowerCase();

  const triggerTextIndex = lineContents.indexOf(trigger);
  if (triggerTextIndex === -1) {
    return null;
  }

  const newPrefix = lineContents.slice(
    triggerTextIndex + trigger.length,
    cursorCh,
  );

  return { prefix: newPrefix, ch: triggerTextIndex, query: trigger };
};
