// Optimized art images live in public/art/ as art-001.jpg … art-NNN.jpg
// (generated from the ./art source folder). Update COUNT if more are added.
const COUNT = 56

export interface ArtPiece {
  src: string
  title?: string
  description?: string
  year?: string
}

// ── Captions ────────────────────────────────────────────────────────────
// Add a title / description / year for any image, keyed by its 1-based number
// (the number shown in the lightbox, e.g. "03 / 59"). Anything left out shows
// as "untitled" with no description. Example:
//
// const captions: Record<number, Omit<ArtPiece, 'src'>> = {
//    3:  { title: 'morning sketch', description: 'ballpoint, on the train.', year: '2024' },
//     12: { title: 'thangka study',  description: 'gouache + gold.' },
// }
const captions: Record<number, Omit<ArtPiece, 'src'>> = {
  // key = the image's 1-based number (the "NN / 56" shown in the lightbox)
  1: { title: 'Rongzompa', description: "this is what i think Rongzompa looked like. Well dressed and neat, with eyes so piercing they would stop all thoughts", year: "2019?" },
  2: { title: 'Khenrinpoche', description: "like the eye on my forehead", year: "2020" },
  3: { title: 'Longchenpa and Vimalamitra in the rain', description: 'rain or water?', year: '20?'},
  4: { title: 'Shiva', description: 'mad with desire', year: '20?'},
  5: { title: 'Uma', description: 'longing and being longed for', year: "20?"},
  6: { title: '???', description: 'dont remember doing this but definitely is mine', year: '20?'},
  7: { title: 'Vimalamitra', description: 'one and only', year: '20?'},
  8: { title: 'Ling Gesar', description: 'KiKi SoSo LhagyalOO', year: '20?'},
  9: { title: 'Pedgyal Lingpa', description: "meymeys lama", year: '20?'},
  10: { title: 'Pedays eyes', description: 'eyes blue like the atlantic', year: '20?'},
  11: { title: 'INC', description: 'incomplete like my goals ya', year: '20?'},
  12: { title: 'StonyBrook Art Exhibition', description: 'what i submitted for art quiz, ~ "what is in your head"', year: '2020'},
  13: { title: 'Garuda', description: 'my favorite bird ', year: '20?'},
  14: { title: 'Garuda', description: 'my favorite bird ', year: '20?'},
  15: { title: 'For uncle lama', description: 'a logo i made that intended personell did not use', year: '20?'},
  16: { title: 'For uncle not lama', description: 'a logo i made that intended personell did not use', year: '20?'},
  17: { title: 'Kunkhyen Rinpoches Seal', description: 'Longchen Rabjam Zangpos Vajra Seal', year: '20?'},
  18: { title: 'PemPems beautiful fingers', description: 'yup, i asked her to hand-model for me', year: '20?'},
  19: { title: 'StonyBrook Art presentation', description: '"what is happiness to you?"', year: '2020'},
  // add more like: 12: { title: 'thangka study', description: 'gouache + gold.', year: '2024' },
}

export const artPieces: ArtPiece[] = Array.from({ length: COUNT }, (_, i) => ({
  src: `/art/art-${String(i + 1).padStart(3, '0')}.jpg`,
  ...captions[i + 1],
}))
