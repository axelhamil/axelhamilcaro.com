interface AccentTitleProps {
  text: string;
}

const PUNCTUATION = /^[?!:;/.,]+$/;
const CLAUSE_END = /[,:]$/;

const countWords = (words: string[]) =>
  words.filter((word) => !PUNCTUATION.test(word)).length;

const findSplit = (words: string[]) => {
  const candidates = words
    .map((_, index) => index)
    .filter(
      (index) =>
        index >= 1 &&
        countWords(words.slice(index)) >= 2 &&
        !PUNCTUATION.test(words[index] ?? ""),
    );
  const clause = candidates.find((index) =>
    CLAUSE_END.test(words[index - 1] ?? ""),
  );

  if (clause !== undefined) return clause;

  const target = words.join(" ").length / 2;
  const distance = (index: number) =>
    Math.abs(words.slice(0, index).join(" ").length - target);

  return candidates.reduce<number | undefined>(
    (best, index) =>
      best === undefined || distance(index) < distance(best) ? index : best,
    undefined,
  );
};

export function AccentTitle({ text }: AccentTitleProps) {
  const words = text.split(" ");
  const split = findSplit(words);

  if (split === undefined) return text;

  return (
    <>
      <span className="block">{words.slice(0, split).join(" ")}</span>{" "}
      <span className="marqueur">{words.slice(split).join(" ")}</span>
    </>
  );
}
