// ═══════════════════════════════════════════════
//  UNIT CONVERSION
//  All conversions route through Tex as the pivot unit.
//  Adding a 6th unit later only requires one entry in
//  UNITS plus one case in toTex()/fromTex() — no other
//  file needs to change.
// ═══════════════════════════════════════════════

const UNITS = [
  { id: 'tex',    label: 'Tex' },
  { id: 'dtex',   label: 'dTex' },
  { id: 'denier', label: 'دنیر (Denier)' },
  { id: 'nm',     label: 'Nm (نمره متریک)' },
  { id: 'ne',     label: 'Ne (نمره انگلیسی)' },
];

// Convert a value FROM the given unit INTO Tex
function toTex(value, unit) {
  switch (unit) {
    case 'tex':    return value;
    case 'dtex':   return value / 10;
    case 'denier': return value / 9;
    case 'nm':     return 1000 / value;
    case 'ne':     return 590.54 / value;
  }
}

// Convert a Tex value INTO the given target unit
function fromTex(texValue, unit) {
  switch (unit) {
    case 'tex':    return texValue;
    case 'dtex':   return texValue * 10;
    case 'denier': return texValue * 9;
    case 'nm':     return 1000 / texValue;
    case 'ne':     return 590.54 / texValue;
  }
}

// ═══════════════════════════════════════════════
//  SIDEBAR NAV DESCRIPTOR
//  Kept here (not in formulas.js) so unit-conversion
//  logic and formula logic stay in separate files.
//  buildNav() in app.js prepends this before DATA.
// ═══════════════════════════════════════════════
const UNIT_CONVERTER_NAV = {
  title: 'تبدیل واحد',
  formulas: [
    { title: 'تبدیل واحد نمره نخ', type: 'converter' }
  ]
};
