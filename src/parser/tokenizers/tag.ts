import { Spec } from '../../primitives';
import { Tokenizer } from './index';

/**
 * Splits the `@prefix` from remaining `Spec.lines[].token.description` into the `tag` token,
 * and populates `spec.tag`
 */
export default function tagTokenizer(): Tokenizer {
  return (spec: Spec): Spec => {
    const { tokens } = spec.source[0];
    const match = tokens.description.match(/\s*(@(\S+))(\s*)/);

    if (match === null) {
      spec.problems.push({
        code: 'spec:tag:prefix',
        message: 'tag should start with "@" symbol',
        line: spec.source[0].number,
        critical: true,
      });
      return spec;
    }

    tokens.tag = match[1];
    tokens.postTag = match[3];
    tokens.description = tokens.description.slice(match[0].length);

    spec.tag = match[2];
    return spec;
  };
}
