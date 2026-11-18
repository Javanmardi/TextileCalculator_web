// ═══════════════════════════════════════════════
//  SHARED GAUGE OPTIONS
//  Used by all tufting formulas (forward + reverse)
//  so the option list only needs to be edited in one place.
// ═══════════════════════════════════════════════
const GAUGE_OPTIONS = [
  { label:'۵/۶۴', value: 5/64 },
  { label:'۱/۱۰', value: 1/10 },
  { label:'۱/۸',  value: 1/8 },
  { label:'۵/۳۲', value: 5/32 },
  { label:'۳/۱۶', value: 3/16 },
  { label:'۵/۱۶', value: 5/16 },
  { label:'۵/۸',  value: 5/8 },
];

const YARN_TYPE = [
  { label:'پلی‌استر', value: 1.38 },
  { label:'پلی‌پروپیلن', value: 0.91 },
  { label:'نایلون ۶',  value: 1.13 },
  { label:'نایلون ۶۶', value: 1.15 },
  { label:'پلی‌اتیلن', value: 0.93 },
  { label:'اکریلیک', value: 1.17 },
  { label:'شیشه E',  value: 2.58 },
];

// ═══════════════════════════════════════════════
//  FORMULA DATA
// ═══════════════════════════════════════════════
const DATA = [

  /* ── مبدل قطر و نمره ── */
  { title: 'تبدیل قطر و نمره', formulas: [

    { title: 'محاسبه نمره از قطر',
      type: 'multi',
      inputs: [
        { id:'dm',  label:'قطر (میکرومتر)' },
        { id:'tp', label:'جنس نخ', type:'select', options: YARN_TYPE },
      ],
      results: [
        { label: 'نمره به تکس', unit: 'Tex',     calc: tex => 0.0007854 * (tex.dm **2) * tex.tp },
        { label: 'نمره به دی‌تکس', unit: 'dTex',  calc: dtex => 0.007854 * (dtex.dm **2) * dtex.tp },
        { label: 'نمره دنیر',  unit: 'den',      calc: den => 0.0070686 * (den.dm **2) * den.tp },
      ]
    },

    { title: 'محاسبه قطر از نمره تکس',
      unit: 'میکرومتر',
      inputs: [
        { id:'tex',  label:'نمره (تکس)' },
        { id:'tp', label:'جنس نخ', type:'select', options: YARN_TYPE },
      ],
      calc: dm => 35.68 * ((dm.tex / dm.tp) ** 0.5)
    },

    { title: 'محاسبه قطر از نمره دی‌تکس',
      unit: 'میکرومتر',
      inputs: [
        { id:'dtex',  label:'نمره (دی‌تکس)' },
        { id:'tp', label:'جنس نخ', type:'select', options: YARN_TYPE },
      ],
      calc: dm => 11.283 * ((dm.dtex / dm.tp) ** 0.5)
    },

    { title: 'محاسبه قطر از نمره دنیر',
      unit: 'میکرومتر',
      inputs: [
        { id:'den',  label:'نمره (دنیر)' },
        { id:'tp', label:'جنس نخ', type:'select', options: YARN_TYPE },
      ],
      calc: dm => 11.894 * ((dm.den / dm.tp) ** 0.5)
    },
  ]},

  /* ── ذوب ریسی ── */
  { title: 'ذوب ریسی', formulas: [

    { title: 'محاسبه مقدار تولید',
      type: 'multi',
      inputs: [
        { id:'v',  label:'سرعت (متر/دقیقه)' },
        { id:'n',  label:'تعداد سر نخ/پوزیشن' },
        { id:'d',  label:'نمره به دنیر' },
      ],
      results: [
        { label: 'تولید در دقیقه', unit: 'کیلوگرم/دقیقه', calc: v => (v.d * v.n * v.v) / 9000000 },
        { label: 'تولید در ساعت', unit: 'کیلوگرم/ساعت',   calc: v => (v.d * v.n * v.v * 60) / 9000000 },
        { label: 'تولید در روز',  unit: 'کیلوگرم/روز',    calc: v => (v.d * v.n * v.v * 60 * 24) / 9000000 },
      ]
    },

    { title: 'راندمان کیفی (%)',
      unit: '%',
      inputs: [
        { id:'zkt',  label:'میزان کل تولید سالم (کیلوگرم)' },
        { id:'zdt', label:'میزان درجات کیفی تولید شده (کیلوگرم)' },
        { id:'zzt',  label:'میزان ضایعات تولید شده (کیلوگرم)' },
      ],
      calc: v => (v.zdt / ( v.zkt + v.ktd + v.zzt )) * 100
    },

    // لازم است پس از تایید حذف شود
    // { title: 'محاسبه مقدار تولید در زمان فعالیت',
    //   unit: 'کیلوگرم',
    //   inputs: [
    //     { id:'tm', label:'مقدار تولید در دقیقه (کیلوگرم/دقیقه)' },
    //     { id:'wt', label:'زمان کارکرد ماشین (دقیقه)' },
    //   ],
    //   calc: v => v.tm * v.wt
    // },

    { title: 'وزن تئوری محصول تولیدی',
      unit: 'کیلوگرم',
      inputs: [
        { id:'mp',  label:'درصد مستربچ' },
        { id:'chw', label:'وزن چیپس (کیلوگرم)' },
        { id:'op',  label:'درصد روغن' },
      ],
      calc: v => v.chw + ((v.mp/100) * v.chw) + ((v.chw/100) + v.op) 
    },

    // لازم است پس از نایید حذف شود
    // { title: 'تعداد بوبین کامل تئوری',
    //   unit: 'عدد',
    //   inputs: [
    //     { id:'wtp', label:'وزن تئوری محصول تولیدی (کیلوگرم)' },
    //     { id:'wbh', label:'وزن بوبین کامل (کیلوگرم)' },
    //   ],
    //   calc: v => v.wtp / v.wbh
    // },

    { title: 'وزن ضایعات کل',
      unit: 'کیلوگرم',
      inputs: [
        { id:'cs',  label:'ضایعات ثابت (کیلوگرم)' },
        { id:'lsw', label:'وزن ضایعات خط (کیلوگرم)' },
      ],
      calc: v => v.cs + v.lsw
    },

    { title: 'راندمان تولید',
      unit: '%',
      inputs: [
        { id:'wap', label:'وزن محصول نهایی واقعی (کیلوگرم)' },
        { id:'wta', label:'وزن تئوری تولید در زمان فعالیت (کیلوگرم)' },
      ],
      calc: v => (v.wap / v.wta) * 100
    },
  ]},

  /* ── تکسچره ── */
  { title: 'تکسچره', formulas: [

    { title: 'وزن تئوری تولید (کیلوگرم)',
      unit: 'کیلوگرم',
      inputs: [
        { id:'np',  label:'تعداد پوزیشن' },
        { id:'pt',  label:'مدت زمان تولید (دقیقه)' },
        { id:'pv',  label:'سرعت تولید (متر/دقیقه)' },
        { id:'ont', label:'نمره نخ خروجی (دنیر)' },
      ],
      calc: v => (v.pv * v.pt * v.np * v.ont) / 9000000
    },

    { title: 'نمره نخ خروجی (دنیر)',
      unit: 'دنیر',
      inputs: [
        { id:'tin', label:'نمره نخ ورودی (دسی تکس)' },
        { id:'vr',  label:'نسبت کشش' },
        { id:'orv', label:'درصد روغن (%)' },
        { id:'fvp', label:'درصد تغذیه کش', default: 0, placeholder: '0 (اختیاری)' },
        { id:'vn',  label:'نمره کش', default: 0, placeholder: '0 (اختیاری)' },
      ],
      calc: v => ((v.tin * 0.9) / v.vr)
               + ((v.orv / 100) * (v.tin / v.vr))
               + ((v.fvp / 100) * v.vn)
    },

    { title: 'راندمان تولید (%)',
      unit: '%',
      inputs: [
        { id:'troa', label:'میزان نخ تولید شده واقعی (کیلوگرم)' },
        { id:'ptwk', label:'وزن تئوری تولید (کیلوگرم)' },
      ],
      calc: v => (v.troa / v.ptwk) * 100
    },

    { title: 'راندمان کیفی (%)',
      unit: '%',
      inputs: [
        { id:'rta',  label:'میزان نخ کل تولید (کیلوگرم)' },
        { id:'adqp', label:'میزان درجات کیفی تولید شده (کیلوگرم)' },
      ],
      calc: v => (v.adqp / v.rta) * 100
    },
  ]},

  /* ── تابندگی ── */
  { title: 'تابندگی', formulas: [

    { title: 'تعداد تاب در متر',
      unit: 'تاب/متر',
      inputs: [
        { id:'vc',  label:'سرعت برداشت (متر/دقیقه)' },
        { id:'vts', label:'سرعت تویستر (دور/دقیقه)' },
      ],
      calc: v => v.vts / v.vc
    },

    { title: 'نمره نخ خروجی',
      unit: '',
      inputs: [
        { id:'etn', label:'نمره نخ ورودی' },
        { id:'tnm', label:'تعداد تاب در متر' },
      ],
      calc: v => v.etn + (v.etn * (v.tnm / 35000))
    },
  ]},

  /* ── بافندگی ── */
  { title: 'بافندگی', formulas: [

    { title: 'وزن گرد بر',
      unit: 'گرم/دسی‌متر مربع',
      inputs: [
        { id:'tnd', label:'نمره تار (دنیر)' },
        { id:'ttt', label:'تراکم تار (در ۱۰ سانتی‌متر)' },
        { id:'tts', label:'جمع شدگی تار (درصد)', default: 0, placeholder: '0 (اختیاری)' },
        { id:'pnd', label:'نمره پود (دنیر)' },
        { id:'ptt', label:'تراکم پود (در ۱۰ سانتی‌متر)' },
        { id:'pts', label:'جمع شدگی پود (درصد)', default: 0, placeholder: '0 (اختیاری)' },
      ],
      calc: v => ((v.tnd * v.ttt * ((v.tts + 100) / 100)) + (v.pnd * v.ptt * ((v.pts + 100) / 100))) / 9000
    },

    { title: 'وزن متر طول',
      unit: 'گرم/متر',
      inputs: [
        { id:'wwv', label:'عرض' },
        { id:'wrc', label:'وزن گرد بر (گرم)' },
      ],
      calc: v => v.wrc * v.wwv
    },

    { title: 'تعداد رشته نخ چله‌پیچی',
      unit: 'رشته',
      inputs: [
        { id:'scc',  label:'ظرفیت قفسه' },
        { id:'tntn', label:'تعداد سرنخ کل' },
      ],
      calc: v => Math.floor(v.tntn / (Math.floor(v.tntn / v.scc) + 1))
    },
  ]},
  
  /* ── تافتینگ ── */
  { title: 'تافتینگ', formulas: [

    { title: 'وزن بافته شده تافتینگ کات',
      unit: 'گرم/مترمربع',
      inputs: [
        { id:'gauge', label:'گیج دستگاه (۱/اینچ)', type:'select', options: GAUGE_OPTIONS },
        { id:'stitch', label:'تعداد بخیه (بخیه/دسی‌متر)' },
        { id:'pile', label:'طول پایل (میلی‌متر)' },
        { id:'den', label:'نمره نخ (دنیر)' },
      ],
      calc: v => (1/v.gauge) * (1000/25.4) * v.stitch * 10 * ((v.pile * 2) + (100/v.stitch)) * 0.001 * (v.den / 9000)
    },

    { title: 'وزن بافته شده تافتینگ لوپ',
      unit: 'گرم/مترمربع',
      inputs: [
        { id:'gauge', label:'گیج دستگاه (۱/اینچ)', type:'select', options: GAUGE_OPTIONS },
        { id:'stitch', label:'تعداد بخیه (بخیه/دسی‌متر)' },
        { id:'pile', label:'طول پایل (میلی‌متر)' },
        { id:'den', label:'نمره نخ (دنیر)' },
      ],
      calc: v => (1/v.gauge) * (1000/25.4) * v.stitch * 10 * ((v.pile * 2) + (200/v.stitch)) * 0.001 * (v.den / 9000)
    },
    
    { title: 'محاسبه معکوس تافتینگ کات (بخیه از وزن)',
      type: 'range',
      unit: 'بخیه/دسی‌متر',
      fixedInputs: [
        { id:'gauge',  label:'گیج دستگاه (۱/اینچ)', type:'select', options: GAUGE_OPTIONS },
        { id:'weight', label:'وزن درخواستی (گرم/مترمربع)' },
        { id:'den',    label:'نمره نخ (دنیر)' },
      ],
      range: {
        id: 'pile',
        label: 'بازه تغییرات ارتفاع پایل (میلی‌متر)',
        defaultMin: 6, defaultMax: 12, defaultStep: 1
      },
      calc: (f, pile) => {
        const A = (1/f.gauge) * (1000/25.4) * 10 * 0.001 * (f.den/9000);
        return (f.weight - 100*A) / (2*A*pile);
      }
    },

    { title: 'محاسبه معکوس تافتینگ لوپ (بخیه از وزن)',
      type: 'range',
      unit: 'بخیه/دسی‌متر',
      fixedInputs: [
        { id:'gauge',  label:'گیج دستگاه (۱/اینچ)', type:'select', options: GAUGE_OPTIONS },
        { id:'weight', label:'وزن درخواستی (گرم/مترمربع)' },
        { id:'den',    label:'نمره نخ (دنیر)' },
      ],
      range: {
        id: 'pile',
        label: 'بازه تغییرات ارتفاع پایل (میلی‌متر)',
        defaultMin: 6, defaultMax: 12, defaultStep: 1
      },
      calc: (f, pile) => {
        const A = (1/f.gauge) * (1000/25.4) * 10 * 0.001 * (f.den/9000);
        return (f.weight - 200*A) / (2*A*pile);
      }
    },
  ]},
];
