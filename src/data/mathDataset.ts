import { DictionaryTerm } from '../types/dictionary';

export const MATH_DICTIONARY_DATASET: DictionaryTerm[] = [
  // --- K-12 TIỂU HỌC & SỐ HỌC CĂN BẢN ---
  {
    id: 'math-number',
    word: 'number',
    ipaUk: '/ˈnʌmbə(r)/',
    ipaUs: '/ˈnʌmbər/',
    wordType: 'noun',
    primaryMeaningVi: 'Số (toán học)',
    khktDefVi: 'Số; (đs.) số học, số đếm',
    khktTags: ['đs.', 'pt.'],
    khktPage: 300,
    khktSubEntries: [
      { phraseEn: 'even number', tag: 'đs.', meaningVi: 'Số chẵn (chia hết cho 2)' },
      { phraseEn: 'odd number', tag: 'đs.', meaningVi: 'Số lẻ' },
      { phraseEn: 'prime number', tag: 'đs.', meaningVi: 'Số nguyên tố' },
      { phraseEn: 'composite number', tag: 'đs.', meaningVi: 'Hợp số' },
      { phraseEn: 'cardinal number', tag: 'đs.', meaningVi: 'Số bản số, số đếm' },
      { phraseEn: 'ordinal number', tag: 'đs.', meaningVi: 'Số thứ tự' }
    ],
    oxfordDefEn: 'A mathematical object used to count, measure, and label, represented by digits or symbols.',
    oxfordCollocations: ['natural number', 'rational number', 'real number', 'complex number', 'number theory'],
    etymology: 'Từ tiếng Latinh "numerus" (số lượng, phép đếm) qua tiếng Pháp cổ "nombre".',
    discipline: 'k12_arithmetic',
    applicableGrades: [1, 2, 3, 4, 5, 6],
    educationLevel: 'primary',
    formulaLatex: 'n \\in \\mathbb{N} = \\{0, 1, 2, 3, \\dots\\}',
    pedagogyNotesVi: 'Phân biệt "number" (số - giá trị trừu tượng) và "digit" (chữ số - ký hiệu viết từ 0 đến 9).',
    senses: [
      {
        disciplineId: 'k12_arithmetic',
        disciplineNameVi: 'Số học phổ thông',
        meaningVi: 'Số đếm, đại lượng biểu thị số lượng',
        disciplineExplanationVi: 'Khái niệm nền tảng của toán học bắt đầu từ tập hợp các số tự nhiên N.',
        grades: [1, 2, 3],
        topic: 'Số tự nhiên và phép đếm',
        formulaLatex: 'n = 2k \\text{ (chẵn)} \\quad n = 2k+1 \\text{ (lẻ)}',
        examples: [
          { sentenceEn: 'Four is an even number, while seven is an odd number.', sentenceVi: 'Bốn là một số chẵn, trong khi bảy là một số lẻ.' }
        ]
      }
    ],
    synonyms: ['numeral', 'figure', 'digit'],
    antonyms: [],
    relatedTerms: ['digit', 'integer', 'arithmetic']
  },
  {
    id: 'math-digit',
    word: 'digit',
    ipaUk: '/ˈdɪdʒɪt/',
    ipaUs: '/ˈdɪdʒɪt/',
    wordType: 'noun',
    primaryMeaningVi: 'Chữ số (từ 0 đến 9)',
    khktDefVi: 'Chữ số; hàng số (đơn vị, chục, trăm...)',
    khktTags: ['đs.', 'mt.'],
    khktPage: 97,
    khktSubEntries: [
      { phraseEn: 'binary digit', tag: 'mt.', meaningVi: 'Chữ số nhị phân (bit: 0 hoặc 1)' },
      { phraseEn: 'decimal digit', tag: 'đs.', meaningVi: 'Chữ số thập phân (0 đến 9)' },
      { phraseEn: 'significant digit', tag: 'tk.', meaningVi: 'Chữ số có nghĩa' }
    ],
    oxfordDefEn: 'Any of the numerals from 0 to 9, especially when forming part of a larger number.',
    oxfordCollocations: ['two-digit number', 'single digit', 'binary digit'],
    etymology: 'Từ tiếng Latinh "digitus" (ngón tay, do thói quen đếm trên ngón tay).',
    discipline: 'k12_arithmetic',
    applicableGrades: [1, 2, 3, 4],
    educationLevel: 'primary',
    formulaLatex: 'd \\in \\{0, 1, 2, 3, 4, 5, 6, 7, 8, 9\\}',
    pedagogyNotesVi: 'Số 458 là một "number" có 3 "digits" (4, 5 và 8).',
    senses: [
      {
        disciplineId: 'k12_arithmetic',
        disciplineNameVi: 'Số học',
        meaningVi: 'Chữ số cấu tạo nên số',
        disciplineExplanationVi: 'Các ký tự đơn lẻ dùng trong hệ thống số thập phân.',
        grades: [1, 2],
        topic: 'Chữ số và giá trị vị trí',
        examples: [
          { sentenceEn: 'The number 2026 consists of four digits.', sentenceVi: 'Số 2026 gồm có bốn chữ số.' }
        ]
      }
    ],
    synonyms: ['figure', 'numeral'],
    antonyms: [],
    relatedTerms: ['number', 'binary', 'decimal']
  },
  {
    id: 'math-addition',
    word: 'addition',
    ipaUk: '/əˈdɪʃn/',
    ipaUs: '/əˈdɪʃn/',
    wordType: 'noun',
    primaryMeaningVi: 'Phép cộng (+)',
    khktDefVi: 'Phép cộng, sự cộng (kí hiệu: +)',
    khktTags: ['đs.', 'pt.'],
    khktPage: 4,
    khktSubEntries: [
      { phraseEn: 'addend', tag: 'đs.', meaningVi: 'Số hạng (trong phép cộng)' },
      { phraseEn: 'sum', tag: 'đs.', meaningVi: 'Tổng số' },
      { phraseEn: 'addition theorem', tag: 'gt.', meaningVi: 'Định lý cộng (lượng giác)' }
    ],
    oxfordDefEn: 'The process of calculating the total of two or more numbers or amounts.',
    oxfordCollocations: ['in addition to', 'matrix addition', 'vector addition', 'associative law of addition'],
    etymology: 'Từ tiếng Latinh "additio" (thêm vào, gia tăng).',
    discipline: 'k12_arithmetic',
    applicableGrades: [1, 2, 3, 4, 5],
    educationLevel: 'primary',
    formulaLatex: 'a + b = c \\quad (\\text{addend} + \\text{addend} = \\text{sum})',
    pedagogyNotesVi: 'Phân biệt động từ "add", giới từ "plus (+)" và danh từ kết quả "sum (tổng)".',
    senses: [
      {
        disciplineId: 'k12_arithmetic',
        disciplineNameVi: 'Số học',
        meaningVi: 'Phép toán gộp hai hay nhiều đại lượng lại với nhau',
        disciplineExplanationVi: 'Một trong bốn phép toán số học cơ bản, thỏa mãn tính chất giao hoán và kết hợp.',
        grades: [1, 2, 3],
        topic: 'Bốn phép tính cơ bản',
        formulaLatex: 'a + b = b + a \\quad (a + b) + c = a + (b + c)',
        examples: [
          { sentenceEn: 'Addition is commutative: five plus three equals eight.', sentenceVi: 'Phép cộng có tính giao hoán: năm cộng ba bằng tám.' }
        ]
      }
    ],
    synonyms: ['summation'],
    antonyms: ['subtraction'],
    relatedTerms: ['sum', 'plus', 'add']
  },
  {
    id: 'math-subtraction',
    word: 'subtraction',
    ipaUk: '/səbˈtrækʃn/',
    ipaUs: '/səbˈtrækʃn/',
    wordType: 'noun',
    primaryMeaningVi: 'Phép trừ (-)',
    khktDefVi: 'Phép trừ (kí hiệu: -)',
    khktTags: ['đs.', 'pt.'],
    khktPage: 406,
    khktSubEntries: [
      { phraseEn: 'minuend', tag: 'đs.', meaningVi: 'Số bị trừ' },
      { phraseEn: 'subtrahend', tag: 'đs.', meaningVi: 'Số trừ' },
      { phraseEn: 'difference', tag: 'đs.', meaningVi: 'Hiệu số' }
    ],
    oxfordDefEn: 'The process of taking one number or amount away from another.',
    oxfordCollocations: ['subtraction of vectors', 'perform subtraction'],
    etymology: 'Từ tiếng Latinh "subtractio" (rút bớt, lấy đi).',
    discipline: 'k12_arithmetic',
    applicableGrades: [1, 2, 3, 4],
    educationLevel: 'primary',
    formulaLatex: 'a - b = c \\quad (\\text{minuend} - \\text{subtrahend} = \\text{difference})',
    pedagogyNotesVi: 'Phép trừ không có tính giao hoán (a - b ≠ b - a khi a ≠ b).',
    senses: [
      {
        disciplineId: 'k12_arithmetic',
        disciplineNameVi: 'Số học',
        meaningVi: 'Phép lấy bớt một số lượng ra khỏi số lượng khác',
        disciplineExplanationVi: 'Phép toán ngược của phép cộng.',
        grades: [1, 2, 3],
        topic: 'Phép tính số học',
        examples: [
          { sentenceEn: 'In the subtraction 10 - 4 = 6, 6 is the difference.', sentenceVi: 'Trong phép trừ 10 - 4 = 6, 6 là hiệu số.' }
        ]
      }
    ],
    synonyms: ['deduction'],
    antonyms: ['addition'],
    relatedTerms: ['minus', 'difference', 'subtract']
  },
  {
    id: 'math-multiplication',
    word: 'multiplication',
    ipaUk: '/ˌmʌltɪplɪˈkeɪʃn/',
    ipaUs: '/ˌmʌltɪplɪˈkeɪʃn/',
    wordType: 'noun',
    primaryMeaningVi: 'Phép nhân (×)',
    khktDefVi: 'Phép nhân (kí hiệu: ×, •)',
    khktTags: ['đs.', 'pt.'],
    khktPage: 290,
    khktSubEntries: [
      { phraseEn: 'multiplicand', tag: 'đs.', meaningVi: 'Số bị nhân' },
      { phraseEn: 'multiplier', tag: 'đs.', meaningVi: 'Số nhân' },
      { phraseEn: 'product', tag: 'đs.', meaningVi: 'Tích số' },
      { phraseEn: 'multiplication table', tag: 'pt.', meaningVi: 'Bảng cửu chương' },
      { phraseEn: 'cross multiplication', tag: 'đs.', meaningVi: 'Nhân chéo (quy tắc tỉ lệ thức)' }
    ],
    oxfordDefEn: 'The act or process of multiplying numbers, or finding the product of two or more quantities.',
    oxfordCollocations: ['multiplication table', 'scalar multiplication', 'matrix multiplication'],
    etymology: 'Từ tiếng Latinh "multiplicare" (làm tăng lên gấp nhiều lần).',
    discipline: 'k12_arithmetic',
    applicableGrades: [2, 3, 4, 5],
    educationLevel: 'primary',
    formulaLatex: 'a \\times b = c \\quad (\\text{factor} \\times \\text{factor} = \\text{product})',
    pedagogyNotesVi: 'Lưu ý từ "product" trong toán là "tích", không phải là sản phẩm hàng hóa.',
    senses: [
      {
        disciplineId: 'k12_arithmetic',
        disciplineNameVi: 'Số học',
        meaningVi: 'Phép cộng lặp lại nhiều lần cùng một số hạng',
        disciplineExplanationVi: 'Phép toán hai ngôi căn bản, có tính giao hoán, kết hợp và phân phối đối với phép cộng.',
        grades: [2, 3, 4],
        topic: 'Phép nhân và bảng nhân',
        formulaLatex: 'a \\cdot (b + c) = a \\cdot b + a \\cdot c',
        examples: [
          { sentenceEn: 'The product of six and seven is forty-two.', sentenceVi: 'Tích của sáu và bảy là bốn mươi hai.' }
        ]
      }
    ],
    synonyms: [],
    antonyms: ['division'],
    relatedTerms: ['product', 'times', 'factor']
  },
  {
    id: 'math-division',
    word: 'division',
    ipaUk: '/dɪˈvɪʒn/',
    ipaUs: '/dɪˈvɪʒn/',
    wordType: 'noun',
    primaryMeaningVi: 'Phép chia (÷)',
    khktDefVi: 'Phép chia (kí hiệu: ÷, /)',
    khktTags: ['đs.', 'pt.'],
    khktPage: 100,
    khktSubEntries: [
      { phraseEn: 'dividend', tag: 'đs.', meaningVi: 'Số bị chia' },
      { phraseEn: 'divisor', tag: 'đs.', meaningVi: 'Số chia' },
      { phraseEn: 'quotient', tag: 'đs.', meaningVi: 'Thương số' },
      { phraseEn: 'remainder', tag: 'đs.', meaningVi: 'Số dư' },
      { phraseEn: 'division algorithm', tag: 'đs.', meaningVi: 'Thuật toán chia (phép chia có dư)' }
    ],
    oxfordDefEn: 'The process of calculating how many times one number is contained within another.',
    oxfordCollocations: ['division by zero', 'long division', 'integer division', 'synthetic division'],
    etymology: 'Từ tiếng Latinh "divisio" (sự phân chia, tách rời).',
    discipline: 'k12_arithmetic',
    applicableGrades: [2, 3, 4, 5],
    educationLevel: 'primary',
    formulaLatex: 'a = b \\cdot q + r \\quad (0 \\le r < b)',
    pedagogyNotesVi: 'Phép chia cho 0 là không xác định (division by zero is undefined).',
    senses: [
      {
        disciplineId: 'k12_arithmetic',
        disciplineNameVi: 'Số học',
        meaningVi: 'Phép chia một số thành các phần bằng nhau',
        disciplineExplanationVi: 'Phép toán ngược của phép nhân.',
        grades: [2, 3, 4, 5],
        topic: 'Phép chia có dư và chia hết',
        examples: [
          { sentenceEn: 'When fifteen is divided by four, the quotient is three and the remainder is three.', sentenceVi: 'Khi chia mười lăm cho bốn, thương là ba và số dư là ba.' }
        ]
      }
    ],
    synonyms: [],
    antonyms: ['multiplication'],
    relatedTerms: ['quotient', 'remainder', 'divisor']
  },
  {
    id: 'math-fraction',
    word: 'fraction',
    ipaUk: '/ˈfrækʃn/',
    ipaUs: '/ˈfrækʃn/',
    wordType: 'noun',
    primaryMeaningVi: 'Phân số',
    khktDefVi: 'Phân số, phân thức',
    khktTags: ['đs.', 'pt.'],
    khktPage: 181,
    khktSubEntries: [
      { phraseEn: 'numerator', tag: 'đs.', meaningVi: 'Tử số' },
      { phraseEn: 'denominator', tag: 'đs.', meaningVi: 'Mẫu số' },
      { phraseEn: 'proper fraction', tag: 'đs.', meaningVi: 'Phân số thực sự (tử nhỏ hơn mẫu)' },
      { phraseEn: 'improper fraction', tag: 'đs.', meaningVi: 'Phân số không thực sự (tử lớn hơn hoặc bằng mẫu)' },
      { phraseEn: 'mixed number / fraction', tag: 'pt.', meaningVi: 'Hỗn số' },
      { phraseEn: 'equivalent fractions', tag: 'pt.', meaningVi: 'Các phân số bằng nhau' }
    ],
    oxfordDefEn: 'A numerical quantity that is not a whole number (e.g. 1/2, 0.5), represented as one number divided by another.',
    oxfordCollocations: ['simplify a fraction', 'common denominator', 'partial fraction'],
    etymology: 'Từ tiếng Latinh "fractio" (sự bẻ gãy, từ fractus - vỡ vụn).',
    discipline: 'k12_arithmetic',
    applicableGrades: [3, 4, 5, 6],
    educationLevel: 'primary',
    formulaLatex: '\\frac{a}{b} \\quad (b \\neq 0)',
    pedagogyNotesVi: 'Học sinh hay nhầm lẫn giữa numerator (tử số - ở trên) và denominator (mẫu số - ở dưới).',
    senses: [
      {
        disciplineId: 'k12_arithmetic',
        disciplineNameVi: 'Số học',
        meaningVi: 'Biểu diễn một hay nhiều phần của một đơn vị',
        disciplineExplanationVi: 'Gồm tử số và mẫu số cách nhau bởi dấu gạch ngang phân số.',
        grades: [3, 4, 5],
        topic: 'Phân số và các phép tính phân số',
        examples: [
          { sentenceEn: 'To add fractions, you must first find a common denominator.', sentenceVi: 'Để cộng các phân số, trước hết bạn phải quy đồng mẫu số.' }
        ]
      }
    ],
    synonyms: ['rational number'],
    antonyms: ['integer'],
    relatedTerms: ['numerator', 'denominator', 'decimal']
  },
  {
    id: 'math-decimal',
    word: 'decimal',
    ipaUk: '/ˈdesɪml/',
    ipaUs: '/ˈdesɪml/',
    wordType: 'noun',
    primaryMeaningVi: 'Số thập phân; (thuộc) hệ thập phân',
    khktDefVi: 'Số thập phân; (thuộc) thập phân',
    khktTags: ['đs.', 'pt.'],
    khktPage: 87,
    khktSubEntries: [
      { phraseEn: 'decimal point', tag: 'pt.', meaningVi: 'Dấu phẩy/chấm thập phân' },
      { phraseEn: 'repeating decimal', tag: 'đs.', meaningVi: 'Số thập phân vô hạn tuần hoàn' },
      { phraseEn: 'terminating decimal', tag: 'đs.', meaningVi: 'Số thập phân hữu hạn' }
    ],
    oxfordDefEn: 'Relating to or using the system of counting based on the number ten; a fraction whose denominator is a power of ten.',
    oxfordCollocations: ['decimal places', 'decimal fraction', 'convert to decimal'],
    etymology: 'Từ tiếng Latinh "decimus" (thứ mười, số mười).',
    discipline: 'k12_arithmetic',
    applicableGrades: [4, 5, 6],
    educationLevel: 'primary',
    formulaLatex: '3.14159 = 3 + \\frac{1}{10} + \\frac{4}{100} + \\dots',
    pedagogyNotesVi: 'Tiếng Anh dùng dấu chấm (.) cho decimal point, trong khi SGK Việt Nam thường dùng dấu phẩy (,).',
    senses: [
      {
        disciplineId: 'k12_arithmetic',
        disciplineNameVi: 'Số học',
        meaningVi: 'Số viết dưới dạng có phần nguyên và phần thập phân',
        disciplineExplanationVi: 'Các chữ số sau dấu chấm biểu thị các phân số có mẫu là 10, 100, 1000...',
        grades: [4, 5],
        topic: 'Số thập phân',
        examples: [
          { sentenceEn: 'Round the decimal 3.14159 to two decimal places.', sentenceVi: 'Làm tròn số thập phân 3.14159 đến hai chữ số thập phân.' }
        ]
      }
    ],
    synonyms: [],
    antonyms: [],
    relatedTerms: ['fraction', 'percentage', 'point']
  },
  {
    id: 'math-percentage',
    word: 'percentage',
    ipaUk: '/pəˈsentɪdʒ/',
    ipaUs: '/pərˈsentɪdʒ/',
    wordType: 'noun',
    primaryMeaningVi: 'Phần trăm (%)',
    khktDefVi: 'Tỉ lệ phần trăm, phần trăm',
    khktTags: ['đs.', 'tk.', 'pt.'],
    khktPage: 322,
    khktSubEntries: [
      { phraseEn: 'percentage change', tag: 'tk.', meaningVi: 'Phần trăm thay đổi / tăng giảm' },
      { phraseEn: 'percentage error', tag: 'tk.', meaningVi: 'Sai số phần trăm' }
    ],
    oxfordDefEn: 'A rate, number, or amount in each hundred; any proportion or share in relation to a whole.',
    oxfordCollocations: ['percentage increase', 'calculate percentage', 'high percentage'],
    etymology: 'Từ gốc Latinh "per centum" (trên mỗi một trăm).',
    discipline: 'k12_arithmetic',
    applicableGrades: [4, 5, 6, 7],
    educationLevel: 'primary',
    formulaLatex: 'P = \\frac{Part}{Whole} \\times 100\\%',
    pedagogyNotesVi: 'Percent (%) là từ chỉ đơn vị (e.g. 50 percent), còn percentage là danh từ chỉ tỉ lệ (e.g. What percentage of the students?).',
    senses: [
      {
        disciplineId: 'k12_arithmetic',
        disciplineNameVi: 'Số học',
        meaningVi: 'Tỉ số có mẫu số là 100',
        disciplineExplanationVi: 'Dùng để so sánh các phần của một tổng thể hoặc biểu thị sự tăng giảm.',
        grades: [5, 6],
        topic: 'Tỉ số phần trăm',
        examples: [
          { sentenceEn: 'Seventy-five percent of the students passed the math exam.', sentenceVi: 'Bảy mươi lăm phần trăm học sinh đã vượt qua bài thi toán.' }
        ]
      }
    ],
    synonyms: ['proportion'],
    antonyms: [],
    relatedTerms: ['ratio', 'proportion', 'fraction']
  },
  {
    id: 'math-perimeter',
    word: 'perimeter',
    ipaUk: '/pəˈrɪmɪtə(r)/',
    ipaUs: '/pəˈrɪmɪtər/',
    wordType: 'noun',
    primaryMeaningVi: 'Chu vi',
    khktDefVi: 'Chu vi, đường chu vi (hh.)',
    khktTags: ['hh.', 'pt.'],
    khktPage: 323,
    khktSubEntries: [
      { phraseEn: 'perimeter of a polygon', tag: 'hh.', meaningVi: 'Chu vi đa giác' },
      { phraseEn: 'circumference', tag: 'hh.', meaningVi: 'Chu vi hình tròn (từ chuyên biệt cho đường tròn)' }
    ],
    oxfordDefEn: 'The continuous line forming the boundary of a closed geometric figure, or the total length of this line.',
    oxfordCollocations: ['calculate the perimeter', 'perimeter of rectangle', 'boundary perimeter'],
    etymology: 'Từ tiếng Hy Lạp "peri" (xung quanh) + "metron" (đo lường).',
    discipline: 'geometry_trig',
    applicableGrades: [3, 4, 5, 6, 7],
    educationLevel: 'primary',
    formulaLatex: 'P = 2(a + b) \\quad (\\text{hình chữ nhật}) \\quad P = 4a \\quad (\\text{hình vuông})',
    pedagogyNotesVi: 'Với hình tròn, người ta dùng từ riêng "circumference" thay cho "perimeter".',
    senses: [
      {
        disciplineId: 'geometry_trig',
        disciplineNameVi: 'Hình học',
        meaningVi: 'Tổng độ dài các cạnh bao quanh một hình phẳng khép kín',
        disciplineExplanationVi: 'Đại lượng đo lường một chiều (chiều dài).',
        grades: [3, 4, 5],
        topic: 'Chu vi và diện tích',
        examples: [
          { sentenceEn: 'The perimeter of a square with side length 5 cm is 20 cm.', sentenceVi: 'Chu vi của một hình vuông có cạnh dài 5 cm là 20 cm.' }
        ]
      }
    ],
    synonyms: ['circumference', 'boundary'],
    antonyms: [],
    relatedTerms: ['area', 'circumference', 'length']
  },
  {
    id: 'math-area',
    word: 'area',
    ipaUk: '/ˈeəriə/',
    ipaUs: '/ˈeriə/',
    wordType: 'noun',
    primaryMeaningVi: 'Diện tích',
    khktDefVi: 'Diện tích, miền (hh.)',
    khktTags: ['hh.', 'gt.', 'pt.'],
    khktPage: 21,
    khktSubEntries: [
      { phraseEn: 'surface area', tag: 'hh.', meaningVi: 'Diện tích toàn phần / bề mặt' },
      { phraseEn: 'lateral area', tag: 'hh.', meaningVi: 'Diện tích xung quanh' },
      { phraseEn: 'area under the curve', tag: 'gt.', meaningVi: 'Diện tích hình phẳng giới hạn bởi đường cong (tích phân)' }
    ],
    oxfordDefEn: 'The extent or measurement of a surface or piece of land, expressed in square units.',
    oxfordCollocations: ['surface area', 'cross-sectional area', 'unit of area'],
    etymology: 'Từ tiếng Latinh "area" (khoảng đất trống, mặt bằng phẳng).',
    discipline: 'geometry_trig',
    applicableGrades: [3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    educationLevel: 'primary',
    formulaLatex: 'S = a \\cdot b \\quad (\\text{chữ nhật}), \\quad S = \\pi r^2 \\quad (\\text{tròn}), \\quad S = \\int_a^b f(x)dx',
    pedagogyNotesVi: 'Diện tích đo bằng đơn vị vuông (m², cm²). Trong giải tích, diện tích tính bằng tích phân xác định.',
    senses: [
      {
        disciplineId: 'geometry_trig',
        disciplineNameVi: 'Hình học',
        meaningVi: 'Độ lớn bề mặt của một hình phẳng hai chiều',
        disciplineExplanationVi: 'Số đo đại diện cho kích thước của một vùng phẳng nằm trong một đường bao kín.',
        grades: [3, 4, 5],
        topic: 'Đo lường diện tích',
        examples: [
          { sentenceEn: 'The area of a triangle is half base times height.', sentenceVi: 'Diện tích hình tam giác bằng một nửa tích của đáy nhân với chiều cao.' }
        ]
      }
    ],
    synonyms: ['surface'],
    antonyms: [],
    relatedTerms: ['perimeter', 'volume', 'integral']
  },

  // --- TRUNG HỌC CƠ SỞ (LỚP 6 - 9): ĐẠI SỐ & HÌNH HỌC PHẲNG ---
  {
    id: 'math-prime-number',
    word: 'prime number',
    ipaUk: '/ˌpraɪm ˈnʌmbə(r)/',
    ipaUs: '/ˌpraɪm ˈnʌmbər/',
    wordType: 'noun',
    primaryMeaningVi: 'Số nguyên tố',
    khktDefVi: 'Số nguyên tố (đs.)',
    khktTags: ['đs.', 'pt.'],
    khktPage: 339,
    khktSubEntries: [
      { phraseEn: 'prime factorization', tag: 'đs.', meaningVi: 'Phân tích thành thừa số nguyên tố' },
      { phraseEn: 'twin primes', tag: 'đs.', meaningVi: 'Cặp số nguyên tố sinh đôi (hơn kém nhau 2 đơn vị)' },
      { phraseEn: 'relatively prime / coprime', tag: 'đs.', meaningVi: 'Nguyên tố cùng nhau' }
    ],
    oxfordDefEn: 'A positive integer greater than 1 that has no positive divisors other than 1 and itself.',
    oxfordCollocations: ['prime factor', 'prime factorization', 'Mersenne prime', 'infinite prime numbers'],
    etymology: 'Từ tiếng Latinh "primus" (đầu tiên, nền tảng cơ bản nhất).',
    discipline: 'algebra',
    applicableGrades: [6, 7, 8],
    educationLevel: 'secondary',
    formulaLatex: 'p > 1, \\quad \\text{divisors}(p) = \\{1, p\\}',
    pedagogyNotesVi: 'Số 1 KHÔNG PHẢI là số nguyên tố. Số 2 là số nguyên tố chẵn duy nhất.',
    senses: [
      {
        disciplineId: 'algebra',
        disciplineNameVi: 'Số học & Đại số',
        meaningVi: 'Số tự nhiên lớn hơn 1 chỉ có hai ước là 1 và chính nó',
        disciplineExplanationVi: 'Là "khối xây dựng" của mọi số tự nhiên theo Định lý cơ bản của số học (Fundamental Theorem of Arithmetic).',
        grades: [6, 7],
        topic: 'Ước và bội - Số nguyên tố',
        examples: [
          { sentenceEn: 'Two is the only even prime number.', sentenceVi: 'Hai là số nguyên tố chẵn duy nhất.' }
        ]
      }
    ],
    synonyms: ['prime'],
    antonyms: ['composite number'],
    relatedTerms: ['factor', 'divisor', 'integer']
  },
  {
    id: 'math-absolute-value',
    word: 'absolute value',
    ipaUk: '/ˌæbsəluːt ˈvæljuː/',
    ipaUs: '/ˌæbsəluːt ˈvæljuː/',
    wordType: 'noun',
    primaryMeaningVi: 'Giá trị tuyệt đối',
    khktDefVi: 'Giá trị tuyệt đối, môđun (đs., gt.)',
    khktTags: ['đs.', 'gt.', 'pt.'],
    khktPage: 2,
    khktSubEntries: [
      { phraseEn: 'absolute value function', tag: 'gt.', meaningVi: 'Hàm số giá trị tuyệt đối y = |x|' },
      { phraseEn: 'absolute convergence', tag: 'gt.', meaningVi: 'Hội tụ tuyệt đối' }
    ],
    oxfordDefEn: 'The non-negative value of a real number without regard to its sign, representing its distance from zero on the number line.',
    oxfordCollocations: ['absolute value inequality', 'absolute value notation', 'modulus of complex number'],
    etymology: 'Từ tiếng Latinh "absolutus" (tách rời, trọn vẹn, không phụ thuộc vào dấu).',
    discipline: 'algebra',
    applicableGrades: [6, 7, 8, 9, 10],
    educationLevel: 'secondary',
    formulaLatex: '|x| = \\begin{cases} x & \\text{khi } x \\ge 0 \\\\ -x & \\text{khi } x < 0 \\end{cases}',
    pedagogyNotesVi: 'Khoảng cách trên trục số luôn không âm: |x| ≥ 0 với mọi x. Với số phức, giá trị tuyệt đối chính là môđun.',
    senses: [
      {
        disciplineId: 'algebra',
        disciplineNameVi: 'Đại số',
        meaningVi: 'Khoảng cách từ điểm x đến gốc tọa độ 0 trên trục số',
        disciplineExplanationVi: 'Một trong các khái niệm quan trọng nhất của đại số sơ cấp và giải tích.',
        grades: [6, 7, 8],
        topic: 'Số thực và giá trị tuyệt đối',
        examples: [
          { sentenceEn: 'The absolute value of both -5 and +5 is 5.', sentenceVi: 'Giá trị tuyệt đối của cả -5 và +5 đều bằng 5.' }
        ]
      }
    ],
    synonyms: ['modulus'],
    antonyms: [],
    relatedTerms: ['modulus', 'norm', 'distance']
  },
  {
    id: 'math-pythagorean-theorem',
    word: 'Pythagorean theorem',
    ipaUk: '/pʌɪˌθaɡəˈrɪən ˈθɪərəm/',
    ipaUs: '/pəˌθæɡəˈriən ˈθiːərəm/',
    wordType: 'noun',
    primaryMeaningVi: 'Định lý Pytago',
    khktDefVi: 'Định lý Pitago (đối với tam giác vuông) (hh.)',
    khktTags: ['hh.', 'pt.'],
    khktPage: 345,
    khktSubEntries: [
      { phraseEn: 'Pythagorean triple', tag: 'đs.', meaningVi: 'Bộ ba số Pytago (ví dụ 3, 4, 5)' },
      { phraseEn: 'hypotenuse', tag: 'hh.', meaningVi: 'Cạnh huyền' }
    ],
    oxfordDefEn: 'A fundamental relation in Euclidean geometry among the three sides of a right triangle: the square of the hypotenuse equals the sum of the squares of the other two sides.',
    oxfordCollocations: ['proof of Pythagorean theorem', 'converse of Pythagorean theorem'],
    etymology: 'Đặt theo tên nhà toán học Hy Lạp cổ đại Pythagoras (khoảng 570 - 495 TCN).',
    discipline: 'geometry_trig',
    applicableGrades: [7, 8, 9],
    educationLevel: 'secondary',
    formulaLatex: 'a^2 + b^2 = c^2 \\quad (c: \\text{cạnh huyền})',
    pedagogyNotesVi: 'Định lý chỉ áp dụng cho tam giác VUÔNG. Định lý đảo dùng để chứng minh một tam giác là vuông.',
    senses: [
      {
        disciplineId: 'geometry_trig',
        disciplineNameVi: 'Hình học',
        meaningVi: 'Bình phương cạnh huyền bằng tổng bình phương hai cạnh góc vuông',
        disciplineExplanationVi: 'Định lý nền tảng nhất của hình học Euclid, cơ sở để thiết lập hệ tọa độ và khoảng cách.',
        grades: [7, 8],
        topic: 'Tam giác vuông - Hệ thức lượng',
        examples: [
          { sentenceEn: 'By the Pythagorean theorem, if the legs are 3 and 4, the hypotenuse is 5.', sentenceVi: 'Theo định lý Pytago, nếu hai cạnh góc vuông là 3 và 4 thì cạnh huyền là 5.' }
        ]
      }
    ],
    synonyms: ['Pythagoras theorem'],
    antonyms: [],
    relatedTerms: ['hypotenuse', 'triangle', 'right angle']
  },
  {
    id: 'math-equation',
    word: 'equation',
    ipaUk: '/ɪˈkweɪʒn/',
    ipaUs: '/ɪˈkweɪʒn/',
    wordType: 'noun',
    primaryMeaningVi: 'Phương trình',
    khktDefVi: 'Phương trình; hệ thức (đs.)',
    khktTags: ['đs.', 'gt.', 'pt.'],
    khktPage: 122,
    khktSubEntries: [
      { phraseEn: 'linear equation', tag: 'đs.', meaningVi: 'Phương trình bậc nhất' },
      { phraseEn: 'quadratic equation', tag: 'đs.', meaningVi: 'Phương trình bậc hai' },
      { phraseEn: 'system of equations', tag: 'đs.', meaningVi: 'Hệ phương trình' },
      { phraseEn: 'differential equation', tag: 'gt.', meaningVi: 'Phương trình vi phân' },
      { phraseEn: 'roots / solutions of an equation', tag: 'đs.', meaningVi: 'Nghiệm của phương trình' }
    ],
    oxfordDefEn: 'A statement that the values of two mathematical expressions are equal (indicated by the sign =).',
    oxfordCollocations: ['solve an equation', 'quadratic equation', 'algebraic equation', 'root of equation'],
    etymology: 'Từ tiếng Latinh "aequare" (làm cho bằng nhau, cân bằng).',
    discipline: 'algebra',
    applicableGrades: [6, 7, 8, 9, 10, 11, 12],
    educationLevel: 'secondary',
    formulaLatex: 'ax^2 + bx + c = 0 \\quad (a \\neq 0)',
    pedagogyNotesVi: 'Phân biệt "equation" (phương trình - tìm nghiệm thỏa mãn) và "identity" (đồng nhất thức - đúng với mọi giá trị của biến).',
    senses: [
      {
        disciplineId: 'algebra',
        disciplineNameVi: 'Đại số',
        meaningVi: 'Mệnh đề chứa biến khẳng định sự bằng nhau của hai biểu thức',
        disciplineExplanationVi: 'Tìm nghiệm của phương trình là một trong các nhiệm vụ trung tâm của toán học.',
        grades: [8, 9],
        topic: 'Phương trình và bất phương trình',
        examples: [
          { sentenceEn: 'The quadratic formula gives the solutions to any quadratic equation.', sentenceVi: 'Công thức nghiệm bậc hai cho phép tìm nghiệm của bất kỳ phương trình bậc hai nào.' }
        ]
      }
    ],
    synonyms: [],
    antonyms: ['inequality'],
    relatedTerms: ['inequality', 'variable', 'root', 'solution']
  },
  {
    id: 'math-coordinate-plane',
    word: 'coordinate plane',
    ipaUk: '/kəʊˈɔːdɪnət pleɪn/',
    ipaUs: '/koʊˈɔːrdnət pleɪn/',
    wordType: 'noun',
    primaryMeaningVi: 'Mặt phẳng tọa độ (Oxy)',
    khktDefVi: 'Mặt phẳng toạ độ (hh.)',
    khktTags: ['hh.', 'đs.', 'pt.'],
    khktPage: 73,
    khktSubEntries: [
      { phraseEn: 'x-axis (horizontal axis)', tag: 'hh.', meaningVi: 'Trục hoành (trục Ox)' },
      { phraseEn: 'y-axis (vertical axis)', tag: 'hh.', meaningVi: 'Trục tung (trục Oy)' },
      { phraseEn: 'origin', tag: 'hh.', meaningVi: 'Gốc tọa độ (điểm O(0,0))' },
      { phraseEn: 'quadrant', tag: 'hh.', meaningVi: 'Góc phần tư (I, II, III, IV)' },
      { phraseEn: 'abscissa', tag: 'hh.', meaningVi: 'Hoành độ' },
      { phraseEn: 'ordinate', tag: 'hh.', meaningVi: 'Tung độ' }
    ],
    oxfordDefEn: 'A two-dimensional plane formed by the intersection of a vertical line called y-axis and a horizontal line called x-axis.',
    oxfordCollocations: ['Cartesian coordinate plane', 'plot points on coordinate plane'],
    etymology: 'Từ tiếng Latinh "co-" (cùng) + "ordinare" (sắp xếp trật tự). Mang tên hệ tọa độ Descartes.',
    discipline: 'geometry_trig',
    applicableGrades: [7, 8, 9, 10],
    educationLevel: 'secondary',
    formulaLatex: '(x, y) \\in \\mathbb{R}^2, \\quad O(0, 0)',
    pedagogyNotesVi: 'Điểm M(x, y): x đứng trước gọi là hoành độ (abscissa), y đứng sau gọi là tung độ (ordinate).',
    senses: [
      {
        disciplineId: 'geometry_trig',
        disciplineNameVi: 'Hình học giải tích',
        meaningVi: 'Mặt phẳng xác định bởi hai trục vuông góc cắt nhau tại gốc O',
        disciplineExplanationVi: 'Cầu nối giữa đại số và hình học do René Descartes phát minh năm 1637.',
        grades: [7, 8, 9],
        topic: 'Hệ tọa độ Descartes',
        examples: [
          { sentenceEn: 'The point (3, -2) lies in the fourth quadrant of the coordinate plane.', sentenceVi: 'Điểm (3, -2) nằm ở góc phần tư thứ tư của mặt phẳng tọa độ.' }
        ]
      }
    ],
    synonyms: ['Cartesian plane'],
    antonyms: [],
    relatedTerms: ['axis', 'origin', 'quadrant']
  },

  // --- TRUNG HỌC PHỔ THÔNG (LỚP 10 - 12): GIẢI TÍCH, VÉC TƠ & XÁC SUẤT ---
  {
    id: 'math-function',
    word: 'function',
    ipaUk: '/ˈfʌŋkʃn/',
    ipaUs: '/ˈfʌŋkʃn/',
    wordType: 'noun',
    primaryMeaningVi: 'Hàm số',
    khktDefVi: 'Hàm số; ánh xạ (đs., gt.)',
    khktTags: ['đs.', 'gt.', 'pt.'],
    khktPage: 185,
    khktSubEntries: [
      { phraseEn: 'domain', tag: 'gt.', meaningVi: 'Tập xác định' },
      { phraseEn: 'range / codomain', tag: 'gt.', meaningVi: 'Tập giá trị / tập đích' },
      { phraseEn: 'composite function', tag: 'gt.', meaningVi: 'Hàm hợp (f ∘ g)' },
      { phraseEn: 'inverse function', tag: 'gt.', meaningVi: 'Hàm ngược (f⁻¹)' },
      { phraseEn: 'continuous function', tag: 'gt.', meaningVi: 'Hàm số liên tục' },
      { phraseEn: 'differentiable function', tag: 'gt.', meaningVi: 'Hàm số khả vi (có đạo hàm)' }
    ],
    oxfordDefEn: 'A relation between a set of inputs and a set of permissible outputs where each input is related to exactly one output.',
    oxfordCollocations: ['exponential function', 'trigonometric function', 'continuous function', 'derivative of a function'],
    etymology: 'Từ tiếng Latinh "functio" (sự thực hiện, bổn phận); do Leibniz đưa vào toán học năm 1673.',
    discipline: 'calculus_analysis',
    applicableGrades: [10, 11, 12, 13],
    educationLevel: 'high_school',
    formulaLatex: 'f: X \\to Y, \\quad y = f(x)',
    pedagogyNotesVi: 'Phân biệt "domain" (tập xác định - các giá trị x hợp lệ) và "range" (tập giá trị - tập các ảnh f(x)).',
    senses: [
      {
        disciplineId: 'calculus_analysis',
        disciplineNameVi: 'Giải tích',
        meaningVi: 'Quy tắc tương ứng mỗi phần tử x với duy nhất một phần tử y',
        disciplineExplanationVi: 'Đối tượng nghiên cứu cốt lõi của giải tích học.',
        grades: [10, 11, 12],
        topic: 'Hàm số và đồ thị',
        formulaLatex: 'y = f(x) \\implies \\forall x \\in D, \\exists! y \\in Y: y = f(x)',
        examples: [
          { sentenceEn: 'The domain of the natural logarithm function is the set of positive real numbers.', sentenceVi: 'Tập xác định của hàm logarit tự nhiên là tập hợp các số thực dương.' }
        ]
      }
    ],
    synonyms: ['mapping', 'transformation'],
    antonyms: [],
    relatedTerms: ['domain', 'range', 'derivative', 'integral']
  },
  {
    id: 'math-derivative',
    word: 'derivative',
    ipaUk: '/dɪˈrɪvətɪv/',
    ipaUs: '/dɪˈrɪvətɪv/',
    wordType: 'noun',
    primaryMeaningVi: 'Đạo hàm',
    khktDefVi: 'Đạo hàm; (hh.) hướng đạo hàm; dẫn xuất',
    khktTags: ['gt.', 'pt.'],
    khktPage: 92,
    khktSubEntries: [
      { phraseEn: 'partial derivative', tag: 'gt.', meaningVi: 'Đạo hàm riêng (∂f/∂x)' },
      { phraseEn: 'directional derivative', tag: 'gt.', meaningVi: 'Đạo hàm theo hướng' },
      { phraseEn: 'higher-order derivative', tag: 'gt.', meaningVi: 'Đạo hàm cấp cao' },
      { phraseEn: 'derivative of a quotient', tag: 'gt.', meaningVi: 'Đạo hàm của một thương (u/v)' },
      { phraseEn: 'chain rule for derivatives', tag: 'gt.', meaningVi: 'Quy tắc chuỗi (đạo hàm hàm hợp)' }
    ],
    oxfordDefEn: 'The instantaneous rate of change of a function with respect to one of its variables, equal to the slope of the tangent line to the graph.',
    oxfordCollocations: ['calculate derivative', 'first derivative', 'second derivative test', 'partial derivative'],
    etymology: 'Từ tiếng Latinh "derivare" (dẫn dòng nước chảy từ nguồn, dẫn xuất).',
    discipline: 'calculus_analysis',
    applicableGrades: [11, 12, 13],
    educationLevel: 'high_school',
    formulaLatex: 'f\'(x) = \\lim_{\\Delta x \\to 0} \\frac{f(x + \\Delta x) - f(x)}{\\Delta x} = \\frac{df}{dx}',
    pedagogyNotesVi: 'Ý nghĩa hình học của đạo hàm tại x₀ là hệ số góc của tiếp tuyến của đồ thị hàm số tại điểm đó.',
    senses: [
      {
        disciplineId: 'calculus_analysis',
        disciplineNameVi: 'Giải tích',
        meaningVi: 'Tỉ số biến thiên tức thời của hàm số',
        disciplineExplanationVi: 'Nền tảng của phép tính vi phân do Newton và Leibniz sáng lập độc lập vào thế kỷ 17.',
        grades: [11, 12],
        topic: 'Đạo hàm và ứng dụng khảo sát hàm số',
        formulaLatex: '(u \\cdot v)\' = u\'v + uv\' \\quad \\left(\\frac{u}{v}\\right)\' = \\frac{u\'v - uv\'}{v^2}',
        examples: [
          { sentenceEn: 'The derivative of distance with respect to time represents velocity.', sentenceVi: 'Đạo hàm của quãng đường theo thời gian biểu thị vận tốc.' }
        ]
      }
    ],
    synonyms: ['rate of change', 'differential quotient'],
    antonyms: ['integral', 'antiderivative'],
    relatedTerms: ['integral', 'limit', 'tangent', 'differential']
  },
  {
    id: 'math-integral',
    word: 'integral',
    ipaUk: '/ˈɪntɪɡrəl/',
    ipaUs: '/ˈɪntɪɡrəl/',
    wordType: 'noun',
    primaryMeaningVi: 'Tích phân; nguyên hàm',
    khktDefVi: 'Tích phân (gt.)',
    khktTags: ['gt.', 'pt.'],
    khktPage: 236,
    khktSubEntries: [
      { phraseEn: 'definite integral', tag: 'gt.', meaningVi: 'Tích phân xác định (có cận từ a đến b)' },
      { phraseEn: 'indefinite integral', tag: 'gt.', meaningVi: 'Tích phân bất định / Nguyên hàm (kèm hằng số C)' },
      { phraseEn: 'improper integral', tag: 'gt.', meaningVi: 'Tích phân suy rộng' },
      { phraseEn: 'multiple integral / double integral', tag: 'gt.', meaningVi: 'Tích phân bội / tích phân hai lớp' },
      { phraseEn: 'line integral / surface integral', tag: 'gt.', meaningVi: 'Tích phân đường / tích phân mặt' },
      { phraseEn: 'integration by parts', tag: 'gt.', meaningVi: 'Phương pháp tích phân từng phần (∫u dv = uv - ∫v du)' }
    ],
    oxfordDefEn: 'A function of which a given function is the derivative, whose value equals the area under the curve between two specified limits.',
    oxfordCollocations: ['definite integral', 'evaluate an integral', 'Riemann integral', 'Lebesgue integral'],
    etymology: 'Từ tiếng Latinh "integer" (toàn bộ, nguyên vẹn, gộp các vi phân nhỏ lại thành một thể hoàn chỉnh).',
    discipline: 'calculus_analysis',
    applicableGrades: [12, 13],
    educationLevel: 'high_school',
    formulaLatex: '\\int_a^b f(x)dx = F(b) - F(a) \\quad \\text{(Định lý Newton-Leibniz)}',
    pedagogyNotesVi: 'Phân biệt "indefinite integral" (nguyên hàm - trả về họ hàm số F(x) + C) và "definite integral" (tích phân xác định - trả về một con số thực).',
    senses: [
      {
        disciplineId: 'calculus_analysis',
        disciplineNameVi: 'Giải tích',
        meaningVi: 'Tổng vô hạn các đại lượng vô cùng bé, diện tích dưới đường cong',
        disciplineExplanationVi: 'Phép toán ngược của phép vi phân, kết nối qua Định lý cơ bản của Giải tích (Fundamental Theorem of Calculus).',
        grades: [12],
        topic: 'Nguyên hàm, tích phân và ứng dụng',
        formulaLatex: '\\int u dv = uv - \\int v du',
        examples: [
          { sentenceEn: 'The definite integral of velocity over a time interval gives the displacement.', sentenceVi: 'Tích phân xác định của vận tốc trên một khoảng thời gian cho ta độ dời.' }
        ]
      }
    ],
    synonyms: ['antiderivative'],
    antonyms: ['derivative'],
    relatedTerms: ['derivative', 'calculus', 'area']
  },
  {
    id: 'math-vector',
    word: 'vector',
    ipaUk: '/ˈvektə(r)/',
    ipaUs: '/ˈvektər/',
    wordType: 'noun',
    primaryMeaningVi: 'Véc-tơ (đại lượng có hướng)',
    khktDefVi: 'Véctơ, véc-tơ (đs., hh., vl.)',
    khktTags: ['đs.', 'hh.', 'cơ.', 'pt.'],
    khktPage: 441,
    khktSubEntries: [
      { phraseEn: 'unit vector', tag: 'hh.', meaningVi: 'Véc-tơ đơn vị (có độ dài bằng 1)' },
      { phraseEn: 'null vector / zero vector', tag: 'đs.', meaningVi: 'Véc-tơ không' },
      { phraseEn: 'dot product / scalar product', tag: 'đs.', meaningVi: 'Tích vô hướng (a • b)' },
      { phraseEn: 'cross product / vector product', tag: 'hh.', meaningVi: 'Tích có hướng (a × b)' },
      { phraseEn: 'vector space', tag: 'đs.', meaningVi: 'Không gian véc-tơ' },
      { phraseEn: 'collinear vectors', tag: 'hh.', meaningVi: 'Hai véc-tơ cùng phương' }
    ],
    oxfordDefEn: 'A quantity having direction as well as magnitude, especially as determining the position of one point in space relative to another.',
    oxfordCollocations: ['dot product of vectors', 'linearly independent vectors', 'eigenvector', 'vector field'],
    etymology: 'Từ tiếng Latinh "vehere" (mang theo, chuyển động chuyên chở). Do William Rowan Hamilton đặt ra năm 1846.',
    discipline: 'geometry_trig',
    applicableGrades: [10, 11, 12, 13],
    educationLevel: 'high_school',
    formulaLatex: '\\vec{a} \\cdot \\vec{b} = |\\vec{a}| |\\vec{b}| \\cos(\\vec{a}, \\vec{b})',
    pedagogyNotesVi: 'Phân biệt "dot product" (tích vô hướng - kết quả là một số) và "cross product" (tích có hướng - kết quả là một véc-tơ).',
    senses: [
      {
        disciplineId: 'geometry_trig',
        disciplineNameVi: 'Hình học & Đại số tuyến tính',
        meaningVi: 'Đoạn thẳng có hướng, xác định bởi điểm đầu và điểm cuối',
        disciplineExplanationVi: 'Được biểu diễn bằng tọa độ (x, y) hoặc (x, y, z) trong không gian Euclid.',
        grades: [10, 12],
        topic: 'Véc-tơ và hệ tọa độ trong không gian Oxyz',
        examples: [
          { sentenceEn: 'Two non-zero vectors are perpendicular if and only if their dot product is zero.', sentenceVi: 'Hai véc-tơ khác không vuông góc với nhau khi và chỉ khi tích vô hướng của chúng bằng 0.' }
        ]
      }
    ],
    synonyms: [],
    antonyms: ['scalar'],
    relatedTerms: ['scalar', 'magnitude', 'direction', 'matrix']
  },
  {
    id: 'math-matrix',
    word: 'matrix',
    ipaUk: '/ˈmeɪtrɪks/',
    ipaUs: '/ˈmeɪtrɪks/',
    wordType: 'noun',
    primaryMeaningVi: 'Ma trận',
    khktDefVi: 'Ma trận (đs.)',
    khktTags: ['đs.', 'mt.'],
    khktPage: 273,
    khktSubEntries: [
      { phraseEn: 'identity matrix', tag: 'đs.', meaningVi: 'Ma trận đơn vị (I)' },
      { phraseEn: 'inverse matrix', tag: 'đs.', meaningVi: 'Ma trận nghịch đảo (A⁻¹)' },
      { phraseEn: 'transpose of a matrix', tag: 'đs.', meaningVi: 'Ma trận chuyển vị (A^T)' },
      { phraseEn: 'matrix determinant', tag: 'đs.', meaningVi: 'Định thức của ma trận (det(A))' },
      { phraseEn: 'diagonal matrix', tag: 'đs.', meaningVi: 'Ma trận đường chéo' },
      { phraseEn: 'orthogonal matrix', tag: 'đs.', meaningVi: 'Ma trận trực giao' }
    ],
    oxfordDefEn: 'A rectangular array of numbers, symbols, or expressions arranged in rows and columns, used to facilitate the analysis of linear equations and transformations.',
    oxfordCollocations: ['matrix multiplication', 'invertible matrix', 'sparse matrix', 'square matrix', 'Hermitian matrix'],
    etymology: 'Từ tiếng Latinh "matrix" (dạ con, nguồn sinh dưỡng); Sylvester đặt thuật ngữ này năm 1850 ví như nơi sinh ra các định thức.',
    discipline: 'algebra',
    applicableGrades: [12, 13],
    educationLevel: 'high_school',
    formulaLatex: 'A = \\begin{pmatrix} a_{11} & a_{12} \\\\ a_{21} & a_{22} \\end{pmatrix}, \\quad A \\cdot A^{-1} = I',
    pedagogyNotesVi: 'Nhân ma trận KHÔNG CÓ tính chất giao hoán (AB ≠ BA nói chung). Số cột ma trận A phải bằng số dòng ma trận B.',
    senses: [
      {
        disciplineId: 'algebra',
        disciplineNameVi: 'Đại số tuyến tính',
        meaningVi: 'Bảng chữ nhật gồm các số xếp theo hàng và cột',
        disciplineExplanationVi: 'Công cụ then chốt trong giải hệ phương trình tuyến tính, đồ họa máy tính, máy học và cơ học lượng tử.',
        grades: [12, 13],
        topic: 'Đại số ma trận',
        examples: [
          { sentenceEn: 'A square matrix is invertible if and only if its determinant is non-zero.', sentenceVi: 'Một ma trận vuông khả nghịch khi và chỉ khi định thức của nó khác không.' }
        ]
      }
    ],
    synonyms: ['array'],
    antonyms: [],
    relatedTerms: ['determinant', 'vector', 'eigenvalue']
  },
  {
    id: 'math-determinant',
    word: 'determinant',
    ipaUk: '/dɪˈtɜːmɪnənt/',
    ipaUs: '/dɪˈtɜːrmɪnənt/',
    wordType: 'noun',
    primaryMeaningVi: 'Định thức (det)',
    khktDefVi: 'Định thức (đs.)',
    khktTags: ['đs.'],
    khktPage: 94,
    khktSubEntries: [
      { phraseEn: 'minor', tag: 'đs.', meaningVi: 'Định thức con' },
      { phraseEn: 'cofactor', tag: 'đs.', meaningVi: 'Phần bù đại số' },
      { phraseEn: 'Jacobian determinant', tag: 'gt.', meaningVi: 'Định thức Jacobi' },
      { phraseEn: 'Wronskian determinant', tag: 'gt.', meaningVi: 'Định thức Wronski' }
    ],
    oxfordDefEn: 'A scalar value that can be computed from the elements of a square matrix, encoding specific properties of the linear transformation.',
    oxfordCollocations: ['determinant of a matrix', 'Vandermonde determinant', 'calculate determinant'],
    etymology: 'Từ tiếng Latinh "determinare" (quy định, xác định tính chất). Được Gauss dùng năm 1801.',
    discipline: 'algebra',
    applicableGrades: [12, 13],
    educationLevel: 'high_school',
    formulaLatex: '\\det \\begin{pmatrix} a & b \\\\ c & d \\end{pmatrix} = ad - bc',
    pedagogyNotesVi: 'Định thức chỉ xác định cho MA TRẬN VUÔNG. Nếu det(A) = 0 thì ma trận suy biến (không có nghịch đảo).',
    senses: [
      {
        disciplineId: 'algebra',
        disciplineNameVi: 'Đại số tuyến tính',
        meaningVi: 'Đại lượng vô hướng đặc trưng cho ma trận vuông',
        disciplineExplanationVi: 'Biểu diễn hệ số phóng đại thể tích của phép biến đổi tuyến tính ứng với ma trận.',
        grades: [12, 13],
        topic: 'Ma trận và định thức',
        examples: [
          { sentenceEn: 'If the determinant equals zero, the system of equations does not have a unique solution.', sentenceVi: 'Nếu định thức bằng 0, hệ phương trình không có nghiệm duy nhất.' }
        ]
      }
    ],
    synonyms: [],
    antonyms: [],
    relatedTerms: ['matrix', 'eigenvalue', 'rank']
  },
  {
    id: 'math-limit',
    word: 'limit',
    ipaUk: '/ˈlɪmɪt/',
    ipaUs: '/ˈlɪmɪt/',
    wordType: 'noun',
    primaryMeaningVi: 'Giới hạn',
    khktDefVi: 'Giới hạn (gt.)',
    khktTags: ['gt.', 'pt.'],
    khktPage: 257,
    khktSubEntries: [
      { phraseEn: 'limit of a sequence', tag: 'gt.', meaningVi: 'Giới hạn của dãy số' },
      { phraseEn: 'limit of a function', tag: 'gt.', meaningVi: 'Giới hạn của hàm số' },
      { phraseEn: 'one-sided limit', tag: 'gt.', meaningVi: 'Giới hạn một bên (trái / phải)' },
      { phraseEn: 'infinite limit', tag: 'gt.', meaningVi: 'Giới hạn vô cực' },
      { phraseEn: 'indeterminate form', tag: 'gt.', meaningVi: 'Dạng vô định (0/0, ∞/∞, ∞ - ∞, 0·∞)' },
      { phraseEn: 'L’Hôpital’s rule', tag: 'gt.', meaningVi: 'Quy tắc L’Hôpital' }
    ],
    oxfordDefEn: 'A value that a function or sequence approaches as the input or index approaches some value.',
    oxfordCollocations: ['limit as x approaches infinity', 'evaluate limit', 'central limit theorem'],
    etymology: 'Từ tiếng Latinh "limes" (ranh giới, bờ cõi, giới hạn).',
    discipline: 'calculus_analysis',
    applicableGrades: [11, 12, 13],
    educationLevel: 'high_school',
    formulaLatex: '\\lim_{x \\to x_0} f(x) = L \\iff \\forall \\varepsilon > 0, \\exists \\delta > 0: 0 < |x - x_0| < \\delta \\implies |f(x) - L| < \\varepsilon',
    pedagogyNotesVi: 'Khái niệm epsilon-delta chuẩn xác do Cauchy và Weierstrass thiết lập, giải quyết các nghịch lý về vô cùng bé.',
    senses: [
      {
        disciplineId: 'calculus_analysis',
        disciplineNameVi: 'Giải tích',
        meaningVi: 'Giá trị mà hàm số hoặc dãy số tiến dần tới',
        disciplineExplanationVi: 'Khái niệm cốt lõi cho phép định nghĩa đạo hàm, tích phân và tính liên tục.',
        grades: [11, 12],
        topic: 'Giới hạn của dãy số và hàm số',
        examples: [
          { sentenceEn: 'The limit of sin(x)/x as x approaches zero equals one.', sentenceVi: 'Giới hạn của sin(x)/x khi x tiến tới 0 bằng 1.' }
        ]
      }
    ],
    synonyms: ['bound'],
    antonyms: [],
    relatedTerms: ['derivative', 'continuity', 'infinity']
  },
  {
    id: 'math-asymptote',
    word: 'asymptote',
    ipaUk: '/ˈæsɪmptəʊt/',
    ipaUs: '/ˈæsɪmptoʊt/',
    wordType: 'noun',
    primaryMeaningVi: 'Đường tiệm cận',
    khktDefVi: 'Đường tiệm cận (hh., gt.)',
    khktTags: ['hh.', 'gt.', 'pt.'],
    khktPage: 25,
    khktSubEntries: [
      { phraseEn: 'horizontal asymptote', tag: 'gt.', meaningVi: 'Tiệm cận ngang (y = y₀ khi x → ±∞)' },
      { phraseEn: 'vertical asymptote', tag: 'gt.', meaningVi: 'Tiệm cận đứng (x = x₀ khi y → ±∞)' },
      { phraseEn: 'oblique / slant asymptote', tag: 'gt.', meaningVi: 'Tiệm cận xiên (y = ax + b)' },
      { phraseEn: 'asymptotic behavior', tag: 'gt.', meaningVi: 'Hành vi tiệm cận' }
    ],
    oxfordDefEn: 'A straight line that a curve approaches increasingly closely as they both head towards infinity, without ever intersecting.',
    oxfordCollocations: ['horizontal asymptote', 'vertical asymptote', 'asymptotic expansion'],
    etymology: 'Từ tiếng Hy Lạp "asymptotos" (không bao giờ gặp nhau: a- không + sym cùng + piptein rơi vào).',
    discipline: 'calculus_analysis',
    applicableGrades: [12, 13],
    educationLevel: 'high_school',
    formulaLatex: '\\lim_{x \\to \\pm\\infty} [f(x) - (ax + b)] = 0',
    pedagogyNotesVi: 'Đồ thị có thể cắt tiệm cận ngang ở khoảng hữu hạn, nhưng khi x ra vô cực thì khoảng cách tiến về 0.',
    senses: [
      {
        disciplineId: 'calculus_analysis',
        disciplineNameVi: 'Giải tích',
        meaningVi: 'Đường thẳng mà đồ thị hàm số tiến sát tới vô hạn',
        disciplineExplanationVi: 'Giúp mô tả hình dáng đồ thị ở vô cực hoặc gần các điểm gián đoạn.',
        grades: [12],
        topic: 'Khảo sát và vẽ đồ thị hàm số',
        examples: [
          { sentenceEn: 'The rational function y = 1/x has a vertical asymptote at x = 0 and a horizontal asymptote at y = 0.', sentenceVi: 'Hàm phân thức y = 1/x có tiệm cận đứng tại x = 0 và tiệm cận ngang tại y = 0.' }
        ]
      }
    ],
    synonyms: [],
    antonyms: [],
    relatedTerms: ['limit', 'hyperbola', 'curve']
  },
  {
    id: 'math-probability',
    word: 'probability',
    ipaUk: '/ˌprɒbəˈbɪləti/',
    ipaUs: '/ˌprɑːbəˈbɪləti/',
    wordType: 'noun',
    primaryMeaningVi: 'Xác suất',
    khktDefVi: 'Xác suất (xs., tk.)',
    khktTags: ['xs.', 'tk.', 'pt.'],
    khktPage: 341,
    khktSubEntries: [
      { phraseEn: 'conditional probability', tag: 'xs.', meaningVi: 'Xác suất có điều kiện P(A|B)' },
      { phraseEn: 'probability distribution', tag: 'xs.', meaningVi: 'Phân phối xác suất' },
      { phraseEn: 'probability density function', tag: 'xs.', meaningVi: 'Hàm mật độ xác suất' },
      { phraseEn: 'independent events', tag: 'xs.', meaningVi: 'Các biến cố độc lập' },
      { phraseEn: 'Bayes’ theorem', tag: 'xs.', meaningVi: 'Công thức / Định lý Bayes' }
    ],
    oxfordDefEn: 'The extent to which an event is likely to occur, measured by the ratio of favorable cases to the whole number of cases possible.',
    oxfordCollocations: ['probability theory', 'calculate probability', 'high probability', 'joint probability'],
    etymology: 'Từ tiếng Latinh "probabilitas" (sự đáng tin cậy, khả năng xảy ra thực tế).',
    discipline: 'probability_statistics',
    applicableGrades: [10, 11, 12, 13],
    educationLevel: 'high_school',
    formulaLatex: 'P(A) = \\frac{n(A)}{n(\\Omega)}, \\quad 0 \\le P(A) \\le 1',
    pedagogyNotesVi: 'Tổng xác suất của toàn bộ không gian mẫu luôn bằng 1. Xác suất của biến cố rỗng luôn bằng 0.',
    senses: [
      {
        disciplineId: 'probability_statistics',
        disciplineNameVi: 'Xác suất & Thống kê',
        meaningVi: 'Thước đo khả năng xảy ra của một biến cố ngẫu nhiên',
        disciplineExplanationVi: 'Xây dựng trên hệ tiên đề Kolmogorov năm 1933.',
        grades: [10, 11, 12],
        topic: 'Lý thuyết xác suất cổ điển và hiện đại',
        formulaLatex: 'P(A|B) = \\frac{P(A \\cap B)}{P(B)} \\quad (P(B) > 0)',
        examples: [
          { sentenceEn: 'The probability of rolling a six on a fair die is one-sixth.', sentenceVi: 'Xác suất gieo được mặt sáu chấm trên một con xúc xắc cân đối là một phần sáu.' }
        ]
      }
    ],
    synonyms: ['likelihood', 'chance'],
    antonyms: ['impossibility'],
    relatedTerms: ['statistics', 'random', 'variance']
  },

  // --- TOÁN ĐẠI HỌC & CHUYÊN SÂU (KH&KT 1976 + OXFORD MATHEMATICS) ---
  {
    id: 'math-eigenvalue',
    word: 'eigenvalue',
    ipaUk: '/ˈaɪɡnvaljuː/',
    ipaUs: '/ˈaɪɡənvæljuː/',
    wordType: 'noun',
    primaryMeaningVi: 'Giá trị riêng (đặc trưng trị)',
    khktDefVi: 'Giá trị riêng, đặc trưng trị (đs., gt.)',
    khktTags: ['đs.', 'gt.'],
    khktPage: 112,
    khktSubEntries: [
      { phraseEn: 'eigenvector', tag: 'đs.', meaningVi: 'Véc-tơ riêng (véc-tơ đặc trưng)' },
      { phraseEn: 'eigenspace', tag: 'đs.', meaningVi: 'Không gian con riêng' },
      { phraseEn: 'characteristic polynomial', tag: 'đs.', meaningVi: 'Đa thức đặc trưng det(A - λI)' },
      { phraseEn: 'spectral theorem', tag: 'đs.', meaningVi: 'Định lý phổ' }
    ],
    oxfordDefEn: 'Each of a set of values of a parameter for which a differential equation or matrix transformation has a non-zero solution.',
    oxfordCollocations: ['eigenvalue problem', 'eigenvalue decomposition', 'principal eigenvalue'],
    etymology: 'Từ tiếng Đức "eigen" (riêng biệt, đặc trưng) kết hợp với "value" (giá trị). David Hilbert phổ biến năm 1904.',
    discipline: 'algebra',
    applicableGrades: [12, 13],
    educationLevel: 'university',
    formulaLatex: 'A \\vec{v} = \\lambda \\vec{v} \\quad (\\vec{v} \\neq \\vec{0})',
    pedagogyNotesVi: 'λ là giá trị riêng và v là véc-tơ riêng tương ứng. Phương trình đặc trưng để tìm λ là det(A - λI) = 0.',
    senses: [
      {
        disciplineId: 'algebra',
        disciplineNameVi: 'Đại số tuyến tính nâng cao',
        meaningVi: 'Hệ số tỉ lệ mà véc-tơ riêng bị co giãn qua phép biến đổi',
        disciplineExplanationVi: 'Nền tảng của thuật toán PageRank của Google, nén dữ liệu PCA, và cơ học lượng tử.',
        grades: [13],
        topic: 'Chéo hóa ma trận và định lý phổ',
        examples: [
          { sentenceEn: 'The eigenvalues of a symmetric matrix are always real numbers.', sentenceVi: 'Các giá trị riêng của một ma trận đối xứng luôn luôn là các số thực.' }
        ]
      }
    ],
    synonyms: ['characteristic value', 'proper value'],
    antonyms: [],
    relatedTerms: ['matrix', 'vector', 'determinant']
  },
  {
    id: 'math-topology',
    word: 'topology',
    ipaUk: '/təˈpɒlədʒi/',
    ipaUs: '/təˈpɑːlədʒi/',
    wordType: 'noun',
    primaryMeaningVi: 'Tôpô học; cấu trúc tôpô',
    khktDefVi: 'Tôpô, tôpô học (top.)',
    khktTags: ['top.'],
    khktPage: 421,
    khktSubEntries: [
      { phraseEn: 'general topology', tag: 'top.', meaningVi: 'Tôpô đại cương / tôpô tập điểm' },
      { phraseEn: 'algebraic topology', tag: 'top.', meaningVi: 'Tôpô đại số' },
      { phraseEn: 'topological space', tag: 'top.', meaningVi: 'Không gian tôpô (X, τ)' },
      { phraseEn: 'homeomorphism', tag: 'top.', meaningVi: 'Đồng phôi (ánh xạ bảo toàn tôpô)' },
      { phraseEn: 'compact space', tag: 'top.', meaningVi: 'Không gian compact' },
      { phraseEn: 'connected space', tag: 'top.', meaningVi: 'Không gian liên thông' }
    ],
    oxfordDefEn: 'The branch of mathematics concerned with the properties of geometric figures or solids that are not affected by continuous distortion or deformation.',
    oxfordCollocations: ['topological manifold', 'discrete topology', 'induced topology', 'differential topology'],
    etymology: 'Từ tiếng Hy Lạp "topos" (vị trí, không gian) + "logos" (khoa học, nghiên cứu). Do Listing đặt ra năm 1847.',
    discipline: 'topology',
    applicableGrades: [13],
    educationLevel: 'university',
    formulaLatex: '\\tau \\subseteq \\mathcal{P}(X): \\quad \\emptyset, X \\in \\tau; \\quad \\bigcup U_i \\in \\tau; \\quad \\bigcap_{i=1}^n U_i \\in \\tau',
    pedagogyNotesVi: 'Tôpô thường được ví von hài hước là "hình học của tấm cao su" (rubber-sheet geometry) vì không quan tâm đến khoảng cách mét mà chỉ xét tính liên tục.',
    senses: [
      {
        disciplineId: 'topology',
        disciplineNameVi: 'Tôpô học',
        meaningVi: 'Nghiên cứu các tính chất không đổi qua các biến dạng liên tục',
        disciplineExplanationVi: 'Một trong ba trụ cột vĩ đại của toán học hiện đại cùng với Đại số và Giải tích.',
        grades: [13],
        topic: 'Không gian tôpô và tính chất liên tục',
        examples: [
          { sentenceEn: 'In topology, a coffee mug and a doughnut are considered equivalent because both have one hole.', sentenceVi: 'Trong tôpô học, một chiếc cốc cà phê và một chiếc bánh donut được coi là tương đương vì cả hai đều có một lỗ thủng.' }
        ]
      }
    ],
    synonyms: [],
    antonyms: [],
    relatedTerms: ['homeomorphism', 'compact', 'manifold']
  },
  {
    id: 'math-group',
    word: 'group',
    ipaUk: '/ɡruːp/',
    ipaUs: '/ɡruːp/',
    wordType: 'noun',
    primaryMeaningVi: 'Nhóm (đại số trừu tượng)',
    khktDefVi: 'Nhóm (đs.)',
    khktTags: ['đs.'],
    khktPage: 200,
    khktSubEntries: [
      { phraseEn: 'Abelian group / commutative group', tag: 'đs.', meaningVi: 'Nhóm Abel (nhóm giao hoán)' },
      { phraseEn: 'subgroup', tag: 'đs.', meaningVi: 'Nhóm con' },
      { phraseEn: 'cyclic group', tag: 'đs.', meaningVi: 'Nhóm xiclic (nhóm tuần hoàn sinh bởi 1 phần tử)' },
      { phraseEn: 'permutation group / symmetric group', tag: 'đs.', meaningVi: 'Nhóm đối xứng S_n' },
      { phraseEn: 'Lie group', tag: 'gt.', meaningVi: 'Nhóm Lie (vừa là nhóm vừa là đa tạp trơn)' },
      { phraseEn: 'group isomorphism', tag: 'đs.', meaningVi: 'Đẳng cấu nhóm' }
    ],
    oxfordDefEn: 'A set of elements together with an operation that satisfies four fundamental axioms: closure, associativity, identity, and invertibility.',
    oxfordCollocations: ['group theory', 'order of a group', 'normal subgroup', 'quotient group'],
    etymology: 'Từ tiếng Pháp "groupe" do Évariste Galois dùng lần đầu vào năm 1830 khi nghiên cứu tính giải được bằng căn thức của phương trình bậc năm.',
    discipline: 'algebra',
    applicableGrades: [13],
    educationLevel: 'university',
    formulaLatex: '(G, *): \\quad (a*b)*c = a*(b*c); \\quad \\exists e, a*e = a; \\quad \\exists a^{-1}, a*a^{-1} = e',
    pedagogyNotesVi: 'Phân biệt "group" thông thường với "Abelian group" (nhóm có thêm tính chất giao hoán a * b = b * a).',
    senses: [
      {
        disciplineId: 'algebra',
        disciplineNameVi: 'Đại số trừu tượng',
        meaningVi: 'Cấu trúc đại số gồm tập hợp và phép toán 2 ngôi thỏa mãn 4 tiên đề',
        disciplineExplanationVi: 'Công cụ toán học chuẩn mực để mô tả tính đối xứng trong vật lý lượng tử, hóa học phân tử và mật mã học.',
        grades: [13],
        topic: 'Lý thuyết nhóm',
        examples: [
          { sentenceEn: 'The set of non-zero rational numbers under multiplication forms an abelian group.', sentenceVi: 'Tập hợp các số hữu tỉ khác 0 với phép nhân tạo thành một nhóm Abel.' }
        ]
      }
    ],
    synonyms: [],
    antonyms: [],
    relatedTerms: ['ring', 'field', 'homomorphism']
  },
  {
    id: 'math-compact',
    word: 'compact',
    ipaUk: '/kəmˈpækt/',
    ipaUs: '/kəmˈpækt/',
    wordType: 'adjective',
    primaryMeaningVi: 'Compact (tập compact / không gian compact)',
    khktDefVi: 'Com-pắc, compact (top., gt.)',
    khktTags: ['top.', 'gt.'],
    khktPage: 59,
    khktSubEntries: [
      { phraseEn: 'compact space', tag: 'top.', meaningVi: 'Không gian compact' },
      { phraseEn: 'compact set', tag: 'gt.', meaningVi: 'Tập compact' },
      { phraseEn: 'Heine-Borel theorem', tag: 'gt.', meaningVi: 'Định lý Heine-Borel (trong R^n: compact ⟺ đóng và bị chặn)' },
      { phraseEn: 'compact support', tag: 'gt.', meaningVi: 'Giá compact' }
    ],
    oxfordDefEn: 'A property of a space such that every open cover has a finite subcover.',
    oxfordCollocations: ['compact metric space', 'compact operator', 'locally compact'],
    etymology: 'Từ tiếng Latinh "compactus" (gắn kết chặt chẽ, kết đặc). Maurice Fréchet đưa vào năm 1906.',
    discipline: 'topology',
    applicableGrades: [13],
    educationLevel: 'university',
    formulaLatex: 'X = \\bigcup_{i \\in I} U_i \\implies \\exists \\{i_1, \\dots, i_n\\}: X = \\bigcup_{k=1}^n U_{i_k}',
    pedagogyNotesVi: 'Trong không gian Euclid R^n, một tập là compact khi và chỉ khi nó đồng thời ĐÓNG VÀ BỊ CHẶN (Heine-Borel).',
    senses: [
      {
        disciplineId: 'topology',
        disciplineNameVi: 'Tôpô & Giải tích thực',
        meaningVi: 'Khái niệm tổng quát hóa của tính hữu hạn cho các tập vô hạn',
        disciplineExplanationVi: 'Bảo đảm rằng mọi hàm liên tục trên tập compact đều đạt giá trị lớn nhất và nhỏ nhất (Định lý Weierstrass).',
        grades: [13],
        topic: 'Tập compact và không gian metric',
        examples: [
          { sentenceEn: 'A closed and bounded interval [a, b] in the real line is compact.', sentenceVi: 'Một đoạn đóng và bị chặn [a, b] trên trục số thực là một tập compact.' }
        ]
      }
    ],
    synonyms: [],
    antonyms: ['non-compact'],
    relatedTerms: ['topology', 'bounded', 'closed set']
  },
  {
    id: 'math-acceleration',
    word: 'acceleration',
    ipaUk: '/əkˌseləˈreɪʃn/',
    ipaUs: '/əkˌseləˈreɪʃn/',
    wordType: 'noun',
    primaryMeaningVi: 'Gia tốc (đạo hàm bậc hai của vị trí)',
    khktDefVi: 'Gia tốc (cơ., gt.)',
    khktTags: ['cơ.', 'gt.'],
    khktPage: 3,
    khktSubEntries: [
      { phraseEn: 'acceleration of gravity', tag: 'cơ.', meaningVi: 'Gia tốc trọng trường (g ≈ 9.8 m/s²)' },
      { phraseEn: 'angular acceleration', tag: 'cơ.', meaningVi: 'Gia tốc góc' },
      { phraseEn: 'centripetal acceleration', tag: 'cơ.', meaningVi: 'Gia tốc hướng tâm' },
      { phraseEn: 'tangential acceleration', tag: 'cơ.', meaningVi: 'Gia tốc tiếp tuyến' }
    ],
    oxfordDefEn: 'The rate of change of velocity per unit of time, mathematically the second derivative of position with respect to time.',
    oxfordCollocations: ['constant acceleration', 'angular acceleration', 'gravitational acceleration'],
    etymology: 'Từ tiếng Latinh "accelerare" (làm tăng tốc độ: ad- tới + celer nhanh chóng).',
    discipline: 'applied_mechanics',
    applicableGrades: [10, 11, 12, 13],
    educationLevel: 'high_school',
    formulaLatex: '\\vec{a} = \\frac{d\\vec{v}}{dt} = \\frac{d^2\\vec{r}}{dt^2}',
    pedagogyNotesVi: 'Gia tốc là đạo hàm cấp 1 của vận tốc, và là đạo hàm cấp 2 của véc-tơ tọa độ theo thời gian.',
    senses: [
      {
        disciplineId: 'applied_mechanics',
        disciplineNameVi: 'Toán ứng dụng & Cơ học',
        meaningVi: 'Tốc độ biến thiên của véc-tơ vận tốc theo thời gian',
        disciplineExplanationVi: 'Xuất hiện trong định luật II Newton F = ma.',
        grades: [10, 11],
        topic: 'Cơ học giải tích và chuyển động',
        examples: [
          { sentenceEn: 'In free fall, the acceleration of an object is approximately 9.8 meters per second squared.', sentenceVi: 'Trong sự rơi tự do, gia tốc của vật xấp xỉ 9.8 mét trên giây bình phương.' }
        ]
      }
    ],
    synonyms: [],
    antonyms: ['deceleration'],
    relatedTerms: ['velocity', 'derivative', 'time']
  },
  {
    id: 'math-conic-section',
    word: 'conic section',
    ipaUk: '/ˌkɒnɪk ˈsekʃn/',
    ipaUs: '/ˌkɑːnɪk ˈsekʃn/',
    wordType: 'noun',
    primaryMeaningVi: 'Đường conic (tiết diện cônic)',
    khktDefVi: 'Tiết diện cônic, đường cônic (hh.)',
    khktTags: ['hh.'],
    khktPage: 66,
    khktSubEntries: [
      { phraseEn: 'ellipse', tag: 'hh.', meaningVi: 'Hình elip (tâm sai e < 1)' },
      { phraseEn: 'parabola', tag: 'hh.', meaningVi: 'Đường parabol (tâm sai e = 1)' },
      { phraseEn: 'hyperbola', tag: 'hh.', meaningVi: 'Đường hypecbol (tâm sai e > 1)' },
      { phraseEn: 'eccentricity', tag: 'hh.', meaningVi: 'Tâm sai (e)' },
      { phraseEn: 'focus / foci', tag: 'hh.', meaningVi: 'Tiêu điểm' },
      { phraseEn: 'directrix', tag: 'hh.', meaningVi: 'Đường chuẩn' }
    ],
    oxfordDefEn: 'A curve obtained as the intersection of the surface of a cone with a plane, including the circle, ellipse, parabola, and hyperbola.',
    oxfordCollocations: ['degenerate conic section', 'equation of conic section', 'orbital mechanics conic'],
    etymology: 'Từ tiếng Hy Lạp "konos" (hình nón) + "sektio" (sự cắt). Apollonius xứ Perga viết chuyên khảo đầu tiên khoảng 200 TCN.',
    discipline: 'geometry_trig',
    applicableGrades: [10, 11, 12],
    educationLevel: 'high_school',
    formulaLatex: 'Ax^2 + Bxy + Cy^2 + Dx + Ey + F = 0 \\quad (B^2 - 4AC)',
    pedagogyNotesVi: 'Phân loại conic theo biệt thức: B² - 4AC < 0 là Elip; = 0 là Parabol; > 0 là Hypecbol.',
    senses: [
      {
        disciplineId: 'geometry_trig',
        disciplineNameVi: 'Hình học giải tích',
        meaningVi: 'Giao tuyến của mặt nón tròn xoay với một mặt phẳng',
        disciplineExplanationVi: 'Quỹ đạo chuyển động của các hành tinh trong Hệ Mặt Trời theo định luật Kepler là các đường conic.',
        grades: [10],
        topic: 'Ba đường conic trong mặt phẳng',
        examples: [
          { sentenceEn: 'Planets orbit the Sun along elliptical paths, which are a type of conic section.', sentenceVi: 'Các hành tinh quay quanh Mặt Trời theo quỹ đạo elip, vốn là một dạng đường conic.' }
        ]
      }
    ],
    synonyms: ['conic'],
    antonyms: [],
    relatedTerms: ['ellipse', 'parabola', 'hyperbola', 'focus']
  },
  {
    id: 'math-algorithm',
    word: 'algorithm',
    ipaUk: '/ˈælɡərɪðəm/',
    ipaUs: '/ˈælɡərɪðəm/',
    wordType: 'noun',
    primaryMeaningVi: 'Thuật toán / Giải thuật',
    khktDefVi: 'Thuật toán, thuật giải (mt., log.)',
    khktTags: ['mt.', 'log.'],
    khktPage: 14,
    khktSubEntries: [
      { phraseEn: 'Euclidean algorithm', tag: 'đs.', meaningVi: 'Thuật toán Euclid (tìm ước số chung lớn nhất)' },
      { phraseEn: 'computational complexity', tag: 'mt.', meaningVi: 'Độ phức tạp tính toán (O-lớn)' },
      { phraseEn: 'recursive algorithm', tag: 'mt.', meaningVi: 'Thuật toán đệ quy' },
      { phraseEn: 'sorting algorithm', tag: 'mt.', meaningVi: 'Thuật toán sắp xếp' }
    ],
    oxfordDefEn: 'A process or set of rules to be followed in calculations or other problem-solving operations, especially by a computer.',
    oxfordCollocations: ['genetic algorithm', 'greedy algorithm', 'divide and conquer algorithm', 'polynomial time algorithm'],
    etymology: 'Tên phiên âm Latinh của nhà toán học Ba Tư Muhammad ibn Musa al-Khwarizmi (thế kỷ thứ 9).',
    discipline: 'computing_cybernetics',
    applicableGrades: [10, 11, 12, 13],
    educationLevel: 'high_school',
    formulaLatex: '\\gcd(a, b) = \\gcd(b, a \\pmod b)',
    pedagogyNotesVi: 'Mọi thuật toán toán học cần đảm bảo 3 tính chất: tính dừng (finiteness), tính xác định (definiteness), và tính đúng đắn (correctness).',
    senses: [
      {
        disciplineId: 'computing_cybernetics',
        disciplineNameVi: 'Toán tin & Điều khiển',
        meaningVi: 'Quy trình các bước tuần tự rõ ràng để giải một bài toán',
        disciplineExplanationVi: 'Lý thuyết độ phức tạp tính toán Turing là nền móng của Khoa học máy tính.',
        grades: [10, 11, 12],
        topic: 'Toán rời rạc và thuật toán',
        examples: [
          { sentenceEn: 'The Euclidean algorithm is an efficient method for computing the greatest common divisor of two integers.', sentenceVi: 'Thuật toán Euclid là một phương pháp hiệu quả để tính ước số chung lớn nhất của hai số nguyên.' }
        ]
      }
    ],
    synonyms: ['procedure', 'method'],
    antonyms: [],
    relatedTerms: ['program', 'complexity', 'logic']
  }
];
