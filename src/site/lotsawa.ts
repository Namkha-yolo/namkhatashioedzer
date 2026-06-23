// The Lotsawa Standard — the author's paper, presented as a readable document.
// Full PDF lives at /public/lotsawa-standard.pdf. Prose transcribed faithfully
// from the paper (hyphenation/PDF artifacts cleaned).

export const lotsawaMeta = {
  title: 'The Lotsawa Standard',
  subtitle:
    'A Phonetic Input Protocol for Tibetan, with Statistical Disambiguation and a Computational Sumtak Grammar',
  author: 'Namkha Tashi Oedzer',
  email: 'oedzernamkha@gmail.com',
  pdf: '/lotsawa-standard.pdf',
}

export interface DocSection {
  heading: string
  paras: string[]
}

export const lotsawaSections: DocSection[] = [
  {
    heading: 'Abstract',
    paras: [
      'Chinese has Pinyin. Japanese has romaji-to-kana-to-kanji. Tibetan has nothing comparable, and has not had it for any of the thirty years since Tibetan entered Unicode. The existing Roman transliteration schemes — Wylie, EWTS, THL, Tournadre, and the SASM/GNC/SRC standard (ZWPY, 1982) — all solve a transcription problem: given a Tibetan word, how should its pronunciation be written in Roman letters. None solves the inverse problem that keyboard input requires: given a Roman-letter string produced by a user, determine the correct Tibetan orthographic form.',
      'We propose the Lotsawa Standard, a phonetic input protocol for Tibetan, together with a cross-platform reference implementation that demonstrates the standard is realizable on every major computing platform. The standard is specified as three layers. A normalization layer maps arbitrary romanized input — Wylie, EWTS, THL, Tournadre, ZWPY, and unmarked user phonetics alike — to a canonical phonetic representation. A statistical disambiguation layer, the load-bearing component of the standard, resolves canonical forms to correct Tibetan orthography through corpus-trained n-gram models, text-domain classification, fuzzy phonetic matching, and a BiLSTM context model, with a curated dictionary and a computational formalization of the Sumtak (སུམ་རྟགས་) grammar acting as hard constraints. A personalization layer adapts resolution to individual users entirely on-device.',
      'The reference implementation, Lotsawa, ships as a shared Swift package with iOS, macOS, and Android host integrations. On 20,000 held-out sentence-level queries the full hybrid pipeline reaches 52.4% top-1 and 71.7% top-5 accuracy, versus 21.4% top-1 for a frequency-only dictionary baseline — a 31 percentage-point improvement attributable to statistical disambiguation. The BiLSTM contains 877,096 parameters and compiles to a 3.45 MB CoreML artifact; the shipping iOS keyboard runs the complete pipeline locally, with no cloud connectivity.',
    ],
  },
  {
    heading: 'Introduction',
    paras: [
      "Between the 8th and 9th centuries, under the patronage of the Tibetan imperial court, a generation of scholar-translators — among them Padmasambhava, Vimalamitra, and Vairotsana — rendered the Sanskrit Buddhist canon into Tibetan with such philosophical exactness that several Sanskrit originals, since lost, have been reconstructed from their Tibetan translations alone. The framework established by these translators, the lotsawas (ལོ་ཙཱ་བ), was standardized by royal decree in the Mahāvyutpatti glossary and became the foundation of a literary civilization that has transmitted the Buddha's teachings across fourteen centuries.",
      'That tradition now reaches global audiences, and the most faithful access to it still requires the Tibetan language itself. The safest bet, as it has always been, is to learn Tibetan. But learning it in the digital age — and especially writing it — confronts an immediate, unaddressed computational barrier.',
      'Every major script-bearing civilization has built a Roman-input pathway into its own orthography. Chinese has Hanyu Pinyin, whose statistical half was not practical until Chen and Lee (2000) introduced trigram language models; before that paper Pinyin IMEs forced the user to pick each character by hand, and after it a user could type whole sentences and receive the right characters most of the time. Tibetan has five Roman transcription schemes but no input standard — each solves a transcription problem, and none solves the inverse problem keyboard input requires.',
      'Tibetan orthography is among the most precise writing systems ever devised, encoding consonant stacking, prefix classes, and suffix structures that carry real grammatical and semantic weight. A single phonetic input such as dak corresponds to distinct forms including བདག (self), དག (pure), and བརྡག (to strike), with correct resolution depending entirely on sentential context, text domain, and user intent. The same ambiguity runs through Tibetan grammar: the genitive, agentive, and dative particles each take multiple written allomorphs governed by the Sumtak (སུམ་རྟགས་), all sharing one spoken form across modern dialects.',
    ],
  },
  {
    heading: 'Contributions',
    paras: [
      '1.  We identify and formalize the Tibetan phonetic resolution problem as distinct from existing transcription standardization, and show that it requires statistical inference.',
      '2.  We propose the Lotsawa Standard, the first unified protocol for resolving arbitrary romanized input to correct Tibetan orthography — three normative layers, conformance-tested by a published accuracy threshold.',
      '3.  We present a statistical disambiguation engine — n-gram models, text-domain classification, fuzzy phonetic matching, and a BiLSTM — responsible for a 31-point absolute gain in top-1 accuracy over the strongest dictionary baseline.',
      '4.  We give the first computational formalization of the Sumtak particle-selection rules as a hard deterministic constraint over the statistical engine.',
      '5.  We release Lotsawa, a cross-platform reference implementation that runs the full pipeline within the memory and latency budget of a mobile keyboard extension.',
    ],
  },
  {
    heading: 'Background — the Sumtak syllable',
    paras: [
      'A Tibetan syllable is built from up to seven components: [Prefix] + [Super] + Root + [Sub] + [Vowel] + [Suffix] + [Post-suffix]. The prefix (སྔོན་འཇུག) is one of five silent letters (ག ད བ མ འ); the superscript one of three (ར ལ ས); the root any of the thirty consonants; the subscript one of four (ཡ ར ལ ཝ); the vowel one of four marks or the inherent /a/; the suffix one of ten; and the post-suffix one of ད ས.',
      'In Lhasa pronunciation, prefixes and superscripts are silent but modify tone; final -r, -l, -s are silent; and historical voicing has merged into tone class. Dozens of orthographically distinct syllables therefore share a single Lhasa pronunciation. All five romanization conventions are transcription functions from Tibetan to Roman; keyboard input needs the inverse, and because the forward map is not injective, that inverse is not a function but a relation — resolvable only with context, text domain, and user intent. This is the phonetic resolution problem the standard formalizes.',
    ],
  },
  {
    heading: 'Related work',
    paras: [
      "Lotsawa is the direct Tibetan counterpart to Chen and Lee's (2000) statistical reformulation of Pinyin, under three harder conditions: Tibetan orthography encodes historical information absent from pronunciation; four mutually unintelligible dialect groups produce incompatible transcriptions; and training resources are three orders of magnitude smaller. The disambiguation layer adopts the noisy-channel framing of Kernighan et al. (1990), and its BiLSTM borrows from Arabic diacritization (Belinkov and Glass, 2015), the closest structural analogue. The TLUE benchmark shows frontier LLMs at or below the 25% random baseline on Tibetan — GPT-3.5-Turbo at 3.42%, the best model at 35.63% — confirming that linguistically informed, targeted engineering remains necessary.",
    ],
  },
  {
    heading: 'The standard — three layers',
    paras: [
      'Layer 1, Normalization. Maps arbitrary romanized input to a canonical internal representation. A conformant implementation must accept Wylie, EWTS, THL, Tournadre, ZWPY, and untrained phonetics without the user declaring a scheme, and should handle Lhasa, Dzongkha, Amdo, and Kham variants. Parsing uses maximal-initial match (nga as ng+a, tsha as tsh+a) and is accepting: one input may yield several canonical candidates, all forwarded to disambiguation.',
      'Layer 2, Statistical disambiguation. The load-bearing layer; a pure rule-based or dictionary-lookup implementation is not conformant. Four trained signals are combined by linear interpolation: an n-gram model (bigram, trigram, 4-gram); a BiLSTM context model (~877K parameters, 3.45 MB compiled) over a 5,000-word vocabulary; text-domain classification across dharma, colloquial, formal, and numerical registers; and fuzzy phonetic matching. Two deterministic components constrain the proposals: a curated dictionary of 184,180 entries that filters non-attested candidates, and the computational Sumtak rules that override the statistical top-1 when a particle is predicted. The operating principle is simple — statistics propose; rules constrain. The deterministic components cannot invent candidates; they can only pass, reject, or substitute.',
      'Layer 3, Personalization. Re-ranks candidates using four locally-stored signals: selection history with a 30-day half-life, correction tracking, retroactive one-tap phrase correction after commit, and a personal vocabulary with a flat 3× multiplier. A conformant implementation must not transmit personalization data off-device.',
      'The Sumtak (སུམ་རྟགས་) governs particle allomorph selection from the orthographic final of the preceding word; in speech the allomorphs collapse to one sound, in writing they stay distinct. To our knowledge this is its first computational formalization for a real-time Tibetan input method. A system is Lotsawa-conformant if and only if it accepts all five legacy schemes without declaration, implements all three layers, incorporates a trained model, consults the Sumtak tables, reaches ≥45% top-1 and ≥65% top-5 on the conformance set, runs entirely on-device, and supports Standard Tibetan (བོད་ཡིག) and Dzongkha (རྫོང་ཁ). The regime is method-agnostic: anything passing the accuracy floor is equally conformant.',
    ],
  },
  {
    heading: 'Reference implementation',
    paras: [
      'Lotsawa is structured as a shared LotsawaCore Swift package containing the entire three-layer pipeline, consumed by thin host integrations for iOS (shipping), macOS (in progress, via InputMethodKit), and Android (planned). All language logic is platform-independent, and the complete pipeline runs locally within a 50 MB memory budget. The n-gram engine stores 66,193 bigrams, 226,524 trigrams, and 287,062 4-grams, auto-committing when confidence exceeds 0.80 with a margin over the runner-up above 0.20. The dictionary is an 82 MB memory-mapped SQLite database of 184,180 phonetic entries.',
    ],
  },
  {
    heading: 'Data',
    paras: [
      'The training corpus combines 98,596 parallel (Tibetan, phonetic) sentence pairs from Billingsmoore (2024), the Monlam Grand Dictionary (107,064 entries), the SOAS Tibetan Lexicon, and a Tibetan verbs database. Only 3.7% of sentences have exact one-to-one token alignment; a dynamic-programming alignment that lets each phonetic token consume up to three Tibetan syllables recovers 99.3% of sentences. From these, 701,951 training pairs were produced and split 80/10/10.',
    ],
  },
  {
    heading: 'Evaluation',
    paras: [
      'Four systems were evaluated on 20,000 held-out sentence-level queries. The 31 percentage-point top-1 gap between the best non-statistical baseline and the hybrid confirms the central claim: no non-statistical system reaches the 45% conformance floor. The hybrid adds a further 3.5 points over the pure BiLSTM — the dictionary filter eliminating invalid proposals, the n-gram signal contributing complementary information — at 0.46 ms per query on Apple Silicon and under 50 MB resident memory.',
    ],
  },
  {
    heading: 'Conclusion',
    paras: [
      'Chinese typing became practical in 2000 when trigram language models entered the Pinyin pipeline; hundreds of millions now type Chinese on the statistical descendants of that one paper. This work is the direct Tibetan counterpart, twenty-five years later, under harder conditions imposed by a richer orthography, four dialect groups, and three orders of magnitude less data.',
      'The Mahāvyutpatti standardized, by royal decree, how Sanskrit was to be rendered into Tibetan. The Lotsawa Standard standardizes, for a community, how Tibetan is to be typed from a Roman keyboard. If it succeeds, the typing of Tibetan will one day be as effortless as the typing of Chinese — no more remarkable, and no less faithful, than what the great translators achieved twelve hundred years ago.',
    ],
  },
]

export const lotsawaResults = [
  { system: 'Frequency-only (dictionary)', top1: '21.4%', top5: '28.1%' },
  { system: 'N-gram context', top1: '24.6%', top5: '28.4%' },
  { system: 'BiLSTM only', top1: '48.9%', top5: '68.0%' },
  { system: 'Hybrid (Lotsawa)', top1: '52.4%', top5: '71.7%' },
]
