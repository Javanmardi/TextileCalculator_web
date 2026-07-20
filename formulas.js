// ═══════════════════════════════════════════════
//  FORMULA DATA
// ═══════════════════════════════════════════════
const DATA = [

  /* ── ذوب ریسی ── */
  { title: 'ذوب ریسی', formulas: [

    { title: 'محاسبه مقدار تولید در دقیقه',
      unit: 'کیلوگرم/دقیقه',
      inputs: [
        { id:'v',  label:'سرعت (متر/دقیقه)' },
        { id:'n',  label:'تعداد سر نخ/پوزیشن' },
        { id:'d',  label:'نمره به دنیر' },
      ],
      calc: v => (v.d * v.n * v.v) / 9000000
    },

    { title: 'محاسبه مقدار تولید در زمان فعالیت',
      unit: 'کیلوگرم',
      inputs: [
        { id:'tm', label:'مقدار تولید در دقیقه (کیلوگرم/دقیقه)' },
        { id:'wt', label:'زمان کارکرد ماشین (دقیقه)' },
      ],
      calc: v => v.tm * v.wt
    },

    { title: 'وزن تئوری محصول تولیدی',
      unit: 'کیلوگرم',
      inputs: [
        { id:'mp',  label:'درصد مستربچ' },
        { id:'chw', label:'وزن چیپس' },
        { id:'op',  label:'درصد روغن' },
      ],
      calc: v => v.chw + ((v.mp/100) * v.chw) + ((v.chw/100) + v.op) / 10000
    },

    { title: 'تعداد بوبین کامل تئوری',
      unit: 'عدد',
      inputs: [
        { id:'wtp', label:'وزن تئوری محصول تولیدی' },
        { id:'wbh', label:'وزن بوبین کامل' },
      ],
      calc: v => v.wtp / v.wbh
    },

    { title: 'وزن ضایعات کل',
      unit: 'کیلوگرم',
      inputs: [
        { id:'cs',  label:'ضایعات ثابت' },
        { id:'lsw', label:'وزن ضایعات خط' },
      ],
      calc: v => v.cs + v.lsw
    },

    { title: 'راندمان تولید',
      unit: '%',
      inputs: [
        { id:'wap', label:'وزن محصول نهایی واقعی' },
        { id:'wta', label:'وزن تئوری تولید در زمان فعالیت' },
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
        { id:'wrc', label:'وزن گرد بر' },
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
        /*-- { id:'gauge',  label:'گیج دستگاه (۱/اینچ)' }, --*/ /*-- Decimal gauge only --*/
        /*-- { id:'gauge',  label:'گیج دستگاه (۱/اینچ)', type:'fraction' }, --*/ /*-- Fraction gauge --*/
        { id:'gauge', label:'گیج دستگاه (۱/اینچ)', type:'select',
          options: [
            { label:'۵/۶۴',  value: 5/64 },
            { label:'۱/۱۰',  value: 1/10 },
            { label:'۱/۸',  value: 1/8 },
            { label:'۵/۳۲', value: 5/32 },
            { label:'۳/۱۶', value: 3/16 },
            { label:'۵/۱۶', value: 5/16 },
            { label:'۵/۸', value: 5/8 },
          ]
        },
        { id:'stitch', label:'تعداد بخیه (بخیه/دسی‌متر)' },
        { id:'pile', label:'طول پایل (میلی‌متر)' },
        { id:'den', label:'نمره نخ (دنیر)' },
      ],
      calc: v => (1/v.gauge) * (1000/25.4) * v.stitch * 10 * ((v.pile * 2) + (100/v.stitch)) * 0.001 * (v.den / 9000)
    },

    { title: 'وزن بافته شده تافتینگ لوپ',
      unit: 'گرم/مترمربع',
      inputs: [
        /*-- { id:'gauge',  label:'گیج دستگاه (۱/اینچ)' }, --*/ /*-- Decimal gauge only --*/
        /*-- { id:'gauge',  label:'گیج دستگاه (۱/اینچ)', type:'fraction' }, --*/ /*-- Fraction gauge --*/
        { id:'gauge', label:'گیج دستگاه (۱/اینچ)', type:'select',
          options: [
            { label:'۵/۶۴',  value: 5/64 },
            { label:'۱/۱۰',  value: 1/10 },
            { label:'۱/۸',  value: 1/8 },
            { label:'۵/۳۲', value: 5/32 },
            { label:'۳/۱۶', value: 3/16 },
            { label:'۵/۱۶', value: 5/16 },
            { label:'۵/۸', value: 5/8 },
          ]
        },
        { id:'stitch', label:'تعداد بخیه (بخیه/دسی‌متر)' },
        { id:'pile', label:'طول پایل (میلی‌متر)' },
        { id:'den', label:'نمره نخ (دنیر)' },
      ],
      calc: v => (1/v.gauge) * (1000/25.4) * v.stitch * 10 * ((v.pile * 2) + (200/v.stitch)) * 0.001 * (v.den / 9000)
    },
  ]},
];
