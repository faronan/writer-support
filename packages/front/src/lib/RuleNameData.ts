export const BASE_RULES = {
  'sentence-length': '1文の長さは100文字以下とする',
  'max-ten': '1文に読点は3つまでとする',
  'ja-no-mixed-period': '文末には句点を使い文を区切る',
  'max-kanji-continuous-len': '連続する漢字は6文字までとする',
  'no-mix-dearu-desumasu': '「ですます調」「である調」を統一する',
};

export const CHECK_RULES = {
  'ja-no-abusage': 'よくある日本語の誤用をチェック',
  'ja-unnatural-alphabet': '不自然なアルファベットをチェック',
  'ja-hiragana-fukushi': '漢字の閉じ方、開き方をチェック',
};

export const QUALITY_RULES = {
  'no-double-negative-ja': '二重否定を使用しない',
  'no-dropping-the-ra': 'ら抜き言葉を使用しない',
  'ja-no-weak-phrase': '弱い日本語表現を使用しない',
  'ja-no-redundant-expression': '冗長な表現を使用しない',
  'no-doubled-joshi': '同じ助詞を連続して使用しない',
  'no-doubled-conjunctive-particle-ga': '同じ接続助詞を連続して使用しない',
  'no-doubled-conjunction': '同じ接続詞を連続して使用しない',
};

export const LINT_RULES = { ...BASE_RULES, ...CHECK_RULES, ...QUALITY_RULES };
