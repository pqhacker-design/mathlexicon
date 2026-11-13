import { DictionaryTerm } from '../types/dictionary';

export const MATH_DICTIONARY_TERMS: DictionaryTerm[] = [
  // ==========================================
  // CẤP TIỂU HỌC (LỚP 1 - LỚP 5): SỐ HỌC VÀ HÌNH HỌC CƠ BẢN
  // LỚP 1 - LỚP 3: CÁC PHÉP TÍNH VÀ KHÁI NIỆM NỀN TẢNG
  // ==========================================
  {
    id: 'math_number_digit',
    word: 'number / digit',
    ipaUk: '/ˈnʌm.bər/ /ˈdɪdʒ.ɪt/',
    ipaUs: '/ˈnʌm.bɚ/ /ˈdɪdʒ.ɪt/',
    wordType: 'noun',
    primaryMeaningVi: 'Số / Chữ số (Even number: số chẵn, Odd number: số lẻ)',
    simpleDefinitionEn: 'A mathematical object used to count, measure, and label; a digit is a single symbol from 0 to 9.',
    primarySubjectId: 'math',
    applicableGrades: [1, 2, 3],
    educationLevel: 'primary',
    senses: [
      {
        subjectId: 'math',
        subjectNameVi: 'Toán học',
        meaningVi: 'Số và Chữ số',
        disciplineExplanationVi: 'Chữ số (Digit) là 10 ký tự cơ bản từ 0 đến 9 dùng để ghi số. Số (Number) biểu thị số lượng. Số chẵn (Even number) tận cùng bằng 0, 2, 4, 6, 8. Số lẻ (Odd number) tận cùng bằng 1, 3, 5, 7, 9.',
        grades: [1, 2, 3],
        topic: 'Số học cơ bản lớp 1-3',
        formulaLatex: '\\text{Digit} \\in \\{0, 1, 2, 3, 4, 5, 6, 7, 8, 9\\}',
        examples: [
          {
            sentenceEn: '14 is an even number because its last digit is 4.',
            sentenceVi: '14 là một số chẵn vì chữ số tận cùng của nó là 4.'
          },
          {
            sentenceEn: 'An odd number cannot be divided evenly by two.',
            sentenceVi: 'Một số lẻ không thể chia hết cho hai.'
          }
        ]
      }
    ],
    synonyms: ['numeral', 'figure', 'integer'],
    antonyms: [],
    relatedTerms: ['even number', 'odd number', 'digit', 'place value'],
    collocations: ['even number', 'odd number', 'single digit', 'two-digit number'],
    usageNotesVi: 'Phân biệt "digit" (chữ số đơn lẻ từ 0 đến 9) và "number" (số gồm một hay nhiều chữ số ghép lại).'
  },
  {
    id: 'math_addition',
    word: 'addition (+)',
    ipaUk: '/əˈdɪʃ.ən/',
    ipaUs: '/əˈdɪʃ.ən/',
    wordType: 'noun',
    primaryMeaningVi: 'Phép cộng (Add / Plus: cộng, Sum: tổng)',
    simpleDefinitionEn: 'The arithmetic operation of combining two or more numbers into a single total.',
    primarySubjectId: 'math',
    applicableGrades: [1, 2, 3],
    educationLevel: 'primary',
    senses: [
      {
        subjectId: 'math',
        subjectNameVi: 'Toán học',
        meaningVi: 'Phép cộng',
        disciplineExplanationVi: 'Phép tính gộp hai hoặc nhiều số hạng (addends) để nhận được tổng (sum). Dấu cộng biểu diễn là (+). Động từ "add" hoặc "plus" mang nghĩa cộng thêm.',
        grades: [1, 2, 3],
        topic: 'Phép tính số học',
        formulaLatex: 'a + b = c \\quad (\\text{số hạng} + \\text{số hạng} = \\text{tổng})',
        examples: [
          {
            sentenceEn: 'Add 7 and 5 to find the sum of 12.',
            sentenceVi: 'Cộng 7 và 5 để tìm được tổng là 12.'
          },
          {
            sentenceEn: 'Three plus four equals seven (3 + 4 = 7).',
            sentenceVi: 'Ba cộng bốn bằng bảy (3 + 4 = 7).'
          }
        ]
      }
    ],
    synonyms: ['summation', 'plus'],
    antonyms: ['subtraction'],
    relatedTerms: ['add', 'plus', 'sum', 'addend'],
    collocations: ['addition table', 'in addition to', 'find the sum', 'add together'],
    usageNotesVi: '"Add" là động từ (cộng), "sum" là danh từ (kết quả tổng), "plus" là giới từ/dấu cộng.'
  },
  {
    id: 'math_subtraction',
    word: 'subtraction (-)',
    ipaUk: '/səbˈtræk.ʃən/',
    ipaUs: '/səbˈtræk.ʃən/',
    wordType: 'noun',
    primaryMeaningVi: 'Phép trừ (Subtract / Minus: trừ, Difference: hiệu)',
    simpleDefinitionEn: 'The arithmetic operation of taking one number away from another to find the difference.',
    primarySubjectId: 'math',
    applicableGrades: [1, 2, 3],
    educationLevel: 'primary',
    senses: [
      {
        subjectId: 'math',
        subjectNameVi: 'Toán học',
        meaningVi: 'Phép trừ',
        disciplineExplanationVi: 'Phép tính bớt đi một lượng: Số bị trừ (Minuend) trừ đi Số trừ (Subtrahend) thu được Hiệu (Difference). Ký hiệu dấu trừ là (-).',
        grades: [1, 2, 3],
        topic: 'Phép tính số học',
        formulaLatex: 'a - b = c \\quad (\\text{số bị trừ} - \\text{số trừ} = \\text{hiệu})',
        examples: [
          {
            sentenceEn: 'If you subtract 4 from 10, the difference is 6.',
            sentenceVi: 'Nếu bạn lấy 10 trừ đi 4, hiệu số là 6.'
          },
          {
            sentenceEn: 'Nine minus five equals four (9 - 5 = 4).',
            sentenceVi: 'Chín trừ năm bằng bốn (9 - 5 = 4).'
          }
        ]
      }
    ],
    synonyms: ['deduction', 'minus'],
    antonyms: ['addition'],
    relatedTerms: ['subtract', 'minus', 'difference', 'minuend', 'subtrahend'],
    collocations: ['subtract from', 'find the difference', 'subtraction with regrouping'],
    usageNotesVi: 'Trong bài toán tìm hiệu, câu hỏi "What is the difference between A and B?" có nghĩa là "Tìm hiệu giữa A và B".'
  },
  {
    id: 'math_multiplication',
    word: 'multiplication (×)',
    ipaUk: '/ˌmʌl.tɪ.plɪˈkeɪ.ʃən/',
    ipaUs: '/ˌmʌl.tə.plɪˈkeɪ.ʃən/',
    wordType: 'noun',
    primaryMeaningVi: 'Phép nhân (Multiply / Times: nhân, Product: tích)',
    simpleDefinitionEn: 'The mathematical operation of repeated addition of a number.',
    primarySubjectId: 'math',
    applicableGrades: [2, 3, 4],
    educationLevel: 'primary',
    senses: [
      {
        subjectId: 'math',
        subjectNameVi: 'Toán học',
        meaningVi: 'Phép nhân',
        disciplineExplanationVi: 'Bản chất là phép cộng lặp lại nhiều lần cùng một số hạng. Thừa số (factor) nhân với thừa số bằng tích (product). Dấu nhân ký hiệu là (×) hoặc (*).',
        grades: [2, 3, 4],
        topic: 'Bảng nhân và phép tính',
        formulaLatex: 'a \\times b = c \\quad (\\text{thừa số} \\times \\text{thừa số} = \\text{tích})',
        examples: [
          {
            sentenceEn: 'Multiply 6 by 7 to get the product of 42.',
            sentenceVi: 'Nhân 6 với 7 để được tích là 42.'
          },
          {
            sentenceEn: 'Five times four equals twenty (5 × 4 = 20).',
            sentenceVi: 'Năm nhân bốn bằng hai mươi (5 × 4 = 20).'
          }
        ]
      }
    ],
    synonyms: ['times'],
    antonyms: ['division'],
    relatedTerms: ['multiply', 'times', 'product', 'factor', 'times table'],
    collocations: ['multiplication table', 'multiply by', 'find the product'],
    usageNotesVi: '"Times table" là bảng cửu chương. "Product" là kết quả của phép nhân (tích).'
  },
  {
    id: 'math_division',
    word: 'division (÷)',
    ipaUk: '/dɪˈvɪʒ.ən/',
    ipaUs: '/dɪˈvɪʒ.ən/',
    wordType: 'noun',
    primaryMeaningVi: 'Phép chia (Divide: chia, Quotient: thương, Remainder: số dư)',
    simpleDefinitionEn: 'The mathematical operation of splitting a quantity into equal parts.',
    primarySubjectId: 'math',
    applicableGrades: [2, 3, 4, 5],
    educationLevel: 'primary',
    senses: [
      {
        subjectId: 'math',
        subjectNameVi: 'Toán học',
        meaningVi: 'Phép chia',
        disciplineExplanationVi: 'Số bị chia (Dividend) chia cho Số chia (Divisor) được Thương (Quotient) và Số dư (Remainder). Nếu số dư bằng 0 là phép chia hết.',
        grades: [2, 3, 4, 5],
        topic: 'Phép tính số học',
        formulaLatex: 'a \\div b = q \\text{ dư } r \\quad (a = b \\times q + r, \\, 0 \\le r < b)',
        examples: [
          {
            sentenceEn: 'Divide 20 by 4 to get a quotient of 5.',
            sentenceVi: 'Chia 20 cho 4 để được thương số là 5.'
          },
          {
            sentenceEn: 'When 17 is divided by 5, the quotient is 3 and the remainder is 2.',
            sentenceVi: 'Khi chia 17 cho 5, thương là 3 và số dư là 2.'
          }
        ]
      }
    ],
    synonyms: ['split', 'partition'],
    antonyms: ['multiplication'],
    relatedTerms: ['divide', 'quotient', 'remainder', 'dividend', 'divisor'],
    collocations: ['divided by', 'long division', 'division with remainder'],
    usageNotesVi: 'Lưu ý không thể chia cho số 0 (division by zero is undefined).'
  },
  {
    id: 'math_geometry_shape',
    word: 'geometry / shape',
    ipaUk: '/dʒiˈɒm.ə.tri/ /ʃeɪp/',
    ipaUs: '/dʒiˈɑː.mə.tri/ /ʃeɪp/',
    wordType: 'noun',
    primaryMeaningVi: 'Hình học / Hình khối',
    simpleDefinitionEn: 'The branch of mathematics concerned with shapes, sizes, dimensions, and properties of figures.',
    primarySubjectId: 'math',
    applicableGrades: [1, 2, 3, 4, 5],
    educationLevel: 'primary',
    senses: [
      {
        subjectId: 'math',
        subjectNameVi: 'Toán học',
        meaningVi: 'Hình học và Hình khối',
        disciplineExplanationVi: 'Nghiên cứu hình dạng 2D (hình phẳng như tam giác, vuông, chữ nhật, tròn) và hình khối 3D (khối hộp chữ nhật, khối lập phương, khối cầu).',
        grades: [1, 2, 3, 4, 5],
        topic: 'Hình học cơ bản',
        examples: [
          {
            sentenceEn: 'Elementary geometry introduces students to basic 2D shapes and 3D solids.',
            sentenceVi: 'Hình học tiểu học giới thiệu cho học sinh các hình phẳng 2D và hình khối 3D cơ bản.'
          }
        ]
      }
    ],
    synonyms: ['figure', 'form'],
    antonyms: [],
    relatedTerms: ['2D shape', '3D shape', 'cube', 'cuboid', 'solid'],
    collocations: ['geometric shape', 'plane geometry', 'solid shape'],
    usageNotesVi: 'Phân biệt "plane shape" (hình phẳng 2 chiều) và "solid shape" (hình khối 3 chiều).'
  },
  {
    id: 'math_point_line_segment',
    word: 'point / line / segment',
    ipaUk: '/pɔɪnt/ /laɪn/ /ˈseɡ.mənt/',
    ipaUs: '/pɔɪnt/ /laɪn/ /ˈseɡ.mənt/',
    wordType: 'noun',
    primaryMeaningVi: 'Điểm / Đường thẳng / Đoạn thẳng',
    simpleDefinitionEn: 'Fundamental geometric concepts: a point has position, a line extends infinitely, and a segment has two endpoints.',
    primarySubjectId: 'math',
    applicableGrades: [1, 2, 3, 4],
    educationLevel: 'primary',
    senses: [
      {
        subjectId: 'math',
        subjectNameVi: 'Toán học',
        meaningVi: 'Điểm, Đường thẳng, Đoạn thẳng',
        disciplineExplanationVi: 'Điểm (Point) là vị trí không có kích thước. Đường thẳng (Line) kéo dài vô tận về hai phía. Đoạn thẳng (Segment) bị giới hạn bởi hai đầu mút và có độ dài xác định.',
        grades: [1, 2, 3, 4],
        topic: 'Hình học cơ bản',
        formulaLatex: '\\text{Segment } AB = d(A, B)',
        examples: [
          {
            sentenceEn: 'Line segment AB connects point A and point B and has a measurable length.',
            sentenceVi: 'Đoạn thẳng AB nối điểm A và điểm B và có độ dài đo được.'
          }
        ]
      }
    ],
    synonyms: [],
    antonyms: [],
    relatedTerms: ['ray', 'endpoint', 'midpoint', 'straight line'],
    collocations: ['line segment', 'point of intersection', 'straight line'],
    usageNotesVi: '"Line" kéo dài vô tận về 2 phía, "Ray" (tia) có 1 gốc và kéo dài 1 phía, "Line segment" (đoạn thẳng) có 2 điểm mút.'
  },
  {
    id: 'math_shapes_basic',
    word: 'triangle / square / rectangle / circle',
    ipaUk: '/ˈtraɪ.æŋ.ɡəl/ /skweər/ /ˈrek.tæŋ.ɡəl/ /ˈsɜː.kəl/',
    ipaUs: '/ˈtraɪ.æŋ.ɡəl/ /skwer/ /ˈrek.tæŋ.ɡəl/ /ˈsɝː.kəl/',
    wordType: 'noun',
    primaryMeaningVi: 'Hình tam giác / Hình vuông / Hình chữ nhật / Hình tròn',
    simpleDefinitionEn: 'The four fundamental two-dimensional geometric plane shapes.',
    primarySubjectId: 'math',
    applicableGrades: [1, 2, 3, 4],
    educationLevel: 'primary',
    senses: [
      {
        subjectId: 'math',
        subjectNameVi: 'Toán học',
        meaningVi: 'Các hình học phẳng cơ bản',
        disciplineExplanationVi: 'Tam giác (3 cạnh, 3 góc); Hình vuông (4 cạnh bằng nhau, 4 góc vuông); Hình chữ nhật (2 cặp cạnh đối song song và bằng nhau, 4 góc vuông); Hình tròn (tập hợp các điểm cách đều tâm một khoảng bằng bán kính).',
        grades: [1, 2, 3, 4],
        topic: 'Hình học phẳng tiểu học',
        formulaLatex: 'P_{\\text{square}} = 4a, \\quad P_{\\text{rect}} = 2(a+b), \\quad C_{\\text{circle}} = 2\\pi r',
        examples: [
          {
            sentenceEn: 'A rectangle has opposite sides that are equal in length and four right angles.',
            sentenceVi: 'Hình chữ nhật có các cạnh đối diện dài bằng nhau và có bốn góc vuông.'
          }
        ]
      }
    ],
    synonyms: [],
    antonyms: [],
    relatedTerms: ['side', 'vertex', 'angle', 'radius', 'diameter'],
    collocations: ['right triangle', 'equilateral triangle', 'circle radius'],
    usageNotesVi: 'Phân biệt "circle" (đường tròn / hình tròn) và "sphere" (hình cầu 3D).'
  },

  // ==========================================
  // LỚP 4 - LỚP 5: PHÂN SỐ, THẬP PHÂN VÀ ĐO LƯỜNG
  // ==========================================
  {
    id: 'math_decimal',
    word: 'decimal',
    ipaUk: '/ˈdes.ɪ.məl/',
    ipaUs: '/ˈdes.ə.məl/',
    wordType: 'noun',
    primaryMeaningVi: 'Số thập phân (Decimal point: dấu phẩy thập phân)',
    simpleDefinitionEn: 'A number based on powers of ten, containing a decimal point.',
    primarySubjectId: 'math',
    applicableGrades: [4, 5],
    educationLevel: 'primary',
    senses: [
      {
        subjectId: 'math',
        subjectNameVi: 'Toán học',
        meaningVi: 'Số thập phân',
        disciplineExplanationVi: 'Số gồm phần nguyên và phần thập phân, ngăn cách bởi dấu phẩy thập phân (trong tiếng Anh dùng dấu chấm decimal point). Ví dụ: 3.14.',
        grades: [4, 5],
        topic: 'Số thập phân lớp 5',
        formulaLatex: '3.75 = 3 + \\frac{7}{10} + \\frac{5}{100}',
        examples: [
          {
            sentenceEn: 'Convert the fraction 3/4 into the decimal 0.75.',
            sentenceVi: 'Chuyển đổi phân số 3/4 thành số thập phân 0,75.'
          }
        ]
      }
    ],
    synonyms: ['decimal fraction'],
    antonyms: ['whole number'],
    relatedTerms: ['decimal point', 'tenth', 'hundredth', 'thousandth'],
    collocations: ['decimal point', 'decimal place', 'convert to decimal'],
    usageNotesVi: 'Trong tiếng Anh, dấu ngăn cách phần thập phân là dấu chấm (.) gọi là "decimal point", còn tiếng Việt dùng dấu phẩy (,).'
  },
  {
    id: 'math_percentage',
    word: 'percentage (%)',
    ipaUk: '/pəˈsen.tɪdʒ/',
    ipaUs: '/pɚˈsen.tɪdʒ/',
    wordType: 'noun',
    primaryMeaningVi: 'Phần trăm (%) / Tỉ số phần trăm',
    simpleDefinitionEn: 'A rate, number, or amount in each hundred; represented by the percent symbol (%).',
    primarySubjectId: 'math',
    applicableGrades: [5, 6],
    educationLevel: 'primary',
    senses: [
      {
        subjectId: 'math',
        subjectNameVi: 'Toán học',
        meaningVi: 'Tỉ số phần trăm',
        disciplineExplanationVi: 'Phân số có mẫu số là 100, ký hiệu là %. Ví dụ: 25% = 25/100 = 0.25.',
        grades: [5, 6],
        topic: 'Tỉ số phần trăm lớp 5',
        formulaLatex: 'p\\% = \\frac{p}{100}',
        examples: [
          {
            sentenceEn: 'Fifty percent (50%) of forty is equal to twenty.',
            sentenceVi: 'Năm mươi phần trăm (50%) của bốn mươi bằng hai mươi.'
          }
        ]
      }
    ],
    synonyms: ['percent', 'proportion'],
    antonyms: [],
    relatedTerms: ['percent', 'ratio', 'fraction'],
    collocations: ['calculate percentage', 'percentage increase', 'percentage discount'],
    usageNotesVi: '"Percent" dùng sau một con số cụ thể (e.g. 20 percent), "percentage" là danh từ chung (e.g. a high percentage).'
  },
  {
    id: 'math_average',
    word: 'average',
    ipaUk: '/ˈæv.ər.ɪdʒ/',
    ipaUs: '/ˈæv.ɚ.ɪdʒ/',
    wordType: 'noun',
    primaryMeaningVi: 'Trung bình cộng',
    simpleDefinitionEn: 'The sum of a group of numbers divided by the count of those numbers.',
    primarySubjectId: 'math',
    applicableGrades: [4, 5, 7],
    educationLevel: 'primary',
    senses: [
      {
        subjectId: 'math',
        subjectNameVi: 'Toán học',
        meaningVi: 'Số trung bình cộng',
        disciplineExplanationVi: 'Muốn tìm số trung bình cộng của nhiều số, ta tính tổng các số đó rồi chia tổng tìm được cho số các số hạng.',
        grades: [4, 5],
        topic: 'Số trung bình cộng lớp 4',
        formulaLatex: '\\bar{x} = \\frac{x_1 + x_2 + \\dots + x_n}{n}',
        examples: [
          {
            sentenceEn: 'To find the average of 8, 10, and 12, add them together and divide by 3.',
            sentenceVi: 'Để tìm trung bình cộng của 8, 10 và 12, hãy cộng chúng lại rồi chia cho 3.'
          }
        ]
      }
    ],
    synonyms: ['mean', 'arithmetic mean'],
    antonyms: [],
    relatedTerms: ['mean', 'median', 'mode'],
    collocations: ['arithmetic average', 'calculate the average', 'average score'],
    usageNotesVi: 'Trong toán học nâng cao, "average" thường đồng nghĩa với "arithmetic mean" (số trung bình cộng).'
  },
  {
    id: 'math_length_mass_capacity',
    word: 'length / mass / capacity',
    ipaUk: '/leŋθ/ /mæs/ /kəˈpæs.ə.ti/',
    ipaUs: '/leŋθ/ /mæs/ /kəˈpæs.ə.t̬i/',
    wordType: 'noun',
    primaryMeaningVi: 'Chiều dài / Khối lượng / Dung tích (thể tích chứa)',
    simpleDefinitionEn: 'Standard physical quantities of measurement: distance, weight/mass, and volume of liquid.',
    primarySubjectId: 'math',
    applicableGrades: [2, 3, 4, 5],
    educationLevel: 'primary',
    senses: [
      {
        subjectId: 'math',
        subjectNameVi: 'Toán học',
        meaningVi: 'Đại lượng đo lường: Chiều dài, Khối lượng, Dung tích',
        disciplineExplanationVi: 'Đo chiều dài bằng mét (m), km; đo khối lượng bằng gam (g), kilôgam (kg), tấn; đo dung tích chất lỏng bằng lít (l), mililít (ml).',
        grades: [2, 3, 4, 5],
        topic: 'Đo lường tiểu học',
        formulaLatex: '1\\text{ km} = 1000\\text{ m}, \\, 1\\text{ kg} = 1000\\text{ g}, \\, 1\\text{ l} = 1000\\text{ ml}',
        examples: [
          {
            sentenceEn: 'The bottle has a capacity of 500 milliliters.',
            sentenceVi: 'Bình nước này có dung tích là 500 mililít.'
          }
        ]
      }
    ],
    synonyms: [],
    antonyms: [],
    relatedTerms: ['meter', 'kilogram', 'liter', 'weight', 'volume'],
    collocations: ['unit of length', 'measure capacity', 'total mass'],
    usageNotesVi: '"Capacity" là dung tích sức chứa của vật rỗng (bình, bể), còn "volume" là thể tích không gian vật chiếm chỗ.'
  },
  {
    id: 'math_perimeter',
    word: 'perimeter',
    ipaUk: '/pəˈrɪm.ɪ.tər/',
    ipaUs: '/pəˈrɪm.ə.t̬ɚ/',
    wordType: 'noun',
    primaryMeaningVi: 'Chu vi',
    simpleDefinitionEn: 'The total distance around the boundary of a two-dimensional geometric shape.',
    primarySubjectId: 'math',
    applicableGrades: [3, 4, 5],
    educationLevel: 'primary',
    senses: [
      {
        subjectId: 'math',
        subjectNameVi: 'Toán học',
        meaningVi: 'Chu vi hình học',
        disciplineExplanationVi: 'Độ dài đường bao quanh một hình phẳng khép kín (tổng độ dài tất cả các cạnh). Chu vi hình chữ nhật P = (dài + rộng) × 2; Chu vi hình vuông P = cạnh × 4.',
        grades: [3, 4, 5],
        topic: 'Chu vi và diện tích',
        formulaLatex: 'P = a + b + c \\quad (\\text{tam giác}), \\quad P = 2(a + b) \\quad (\\text{hình chữ nhật})',
        examples: [
          {
            sentenceEn: 'The perimeter of a square with a side length of 5 cm is 20 cm.',
            sentenceVi: 'Chu vi của một hình vuông có cạnh 5 cm là 20 cm.'
          }
        ]
      }
    ],
    synonyms: ['circumference (for circles)', 'boundary'],
    antonyms: [],
    relatedTerms: ['area', 'boundary', 'circumference'],
    collocations: ['calculate the perimeter', 'perimeter of a rectangle'],
    usageNotesVi: 'Đối với hình tròn, từ chuyên dùng cho chu vi là "circumference", trong khi đa giác dùng "perimeter".'
  },
  {
    id: 'math_area',
    word: 'area',
    ipaUk: '/ˈeə.ri.ə/',
    ipaUs: '/ˈer.i.ə/',
    wordType: 'noun',
    primaryMeaningVi: 'Diện tích',
    simpleDefinitionEn: 'The measurement of the surface size of a two-dimensional flat shape, measured in square units.',
    primarySubjectId: 'math',
    applicableGrades: [3, 4, 5],
    educationLevel: 'primary',
    senses: [
      {
        subjectId: 'math',
        subjectNameVi: 'Toán học',
        meaningVi: 'Diện tích hình học',
        disciplineExplanationVi: 'Đại lượng biểu thị độ lớn bề mặt của một hình phẳng. Đo bằng đơn vị vuông (cm², m², ha). Diện tích chữ nhật S = dài × rộng; Diện tích hình vuông S = cạnh × cạnh.',
        grades: [3, 4, 5],
        topic: 'Chu vi và diện tích',
        formulaLatex: 'S = a \\times b \\quad (\\text{hình chữ nhật}), \\quad S = a^2 \\quad (\\text{hình vuông})',
        examples: [
          {
            sentenceEn: 'The area of the rectangular classroom is 60 square meters.',
            sentenceVi: 'Diện tích của phòng học hình chữ nhật là 60 mét vuông.'
          }
        ]
      }
    ],
    synonyms: ['surface area', 'acreage'],
    antonyms: [],
    relatedTerms: ['perimeter', 'square centimeter', 'square meter', 'surface'],
    collocations: ['surface area', 'calculate area', 'square units'],
    usageNotesVi: 'Phân biệt "perimeter" (đơn vị đo độ dài mét, cm) và "area" (đơn vị đo diện tích mét vuông, cm²).'
  },
  {
    id: 'math_word_problem',
    word: 'word problem',
    ipaUk: '/wɜːd ˈprɒb.ləm/',
    ipaUs: '/wɝːd ˈprɑː.bləm/',
    wordType: 'noun',
    primaryMeaningVi: 'Bài toán đố có lời văn',
    simpleDefinitionEn: 'A mathematical problem described in words and everyday language rather than purely numbers and symbols.',
    primarySubjectId: 'math',
    applicableGrades: [1, 2, 3, 4, 5],
    educationLevel: 'primary',
    senses: [
      {
        subjectId: 'math',
        subjectNameVi: 'Toán học',
        meaningVi: 'Bài toán có lời văn',
        disciplineExplanationVi: 'Dạng bài toán được diễn đạt bằng tình huống thực tế hoặc ngôn ngữ đời sống, đòi hỏi học sinh phân tích đề bài, tóm tắt và thực hiện các phép tính để tìm đáp số.',
        grades: [1, 2, 3, 4, 5],
        topic: 'Giải toán có lời văn',
        examples: [
          {
            sentenceEn: 'Students must read word problems carefully to identify given information and what needs to be solved.',
            sentenceVi: 'Học sinh phải đọc kỹ bài toán có lời văn để xác định dữ kiện đã cho và điều cần giải quyết.'
          }
        ]
      }
    ],
    synonyms: ['story problem', 'applied problem'],
    antonyms: [],
    relatedTerms: ['equation', 'solution', 'steps of solution'],
    collocations: ['solve a word problem', 'step-by-step word problem'],
    usageNotesVi: 'Bao gồm các bài toán tìm hai số khi biết tổng và hiệu, tìm hai số khi biết tổng và tỉ số, v.v.'
  },

  // ==========================================
  // CẤP THCS (LỚP 6 - LỚP 9): ĐẠI SỐ CƠ BẢN VÀ HÌNH HỌC PHẲNG
  // LỚP 6 - LỚP 7: SỐ HỌC MỞ RỘNG VÀ TỈ LỆ
  // ==========================================
  {
    id: 'math_number_sets',
    word: 'natural / integer / rational / real number',
    ipaUk: '/ˈnætʃ.ər.əl/ /ˈɪn.tɪ.dʒər/ /ˈræʃ.ən.əl/ /rɪəl ˈnʌm.bər/',
    ipaUs: '/ˈnætʃ.ɚ.əl/ /ˈɪn.t̬ə.dʒɚ/ /ˈræʃ.ən.əl/ /ˈriː.əl ˈnʌm.bɚ/',
    wordType: 'noun',
    primaryMeaningVi: 'Số tự nhiên (N) / Số nguyên (Z) / Số hữu tỉ (Q) / Số thực (R)',
    simpleDefinitionEn: 'The fundamental hierarchy of number systems in algebra.',
    primarySubjectId: 'math',
    applicableGrades: [6, 7, 10],
    educationLevel: 'secondary',
    senses: [
      {
        subjectId: 'math',
        subjectNameVi: 'Toán học',
        meaningVi: 'Các tập hợp số cơ bản',
        disciplineExplanationVi: 'Số tự nhiên N = {0, 1, 2, ...}; Số nguyên Z gồm số nguyên âm, số 0 và số nguyên dương; Số hữu tỉ Q có dạng a/b (b khác 0); Số thực R gồm số hữu tỉ và số vô tỉ.',
        grades: [6, 7, 10],
        topic: 'Tập hợp các số',
        formulaLatex: '\\mathbb{N} \\subset \\mathbb{Z} \\subset \\mathbb{Q} \\subset \\mathbb{R}',
        examples: [
          {
            sentenceEn: '-5 is an integer and a rational number, but not a natural number.',
            sentenceVi: '-5 là một số nguyên và số hữu tỉ, nhưng không phải là số tự nhiên.'
          }
        ]
      }
    ],
    synonyms: [],
    antonyms: [],
    relatedTerms: ['irrational number', 'subset', 'number line'],
    collocations: ['set of integers', 'rational number', 'real number line'],
    usageNotesVi: 'Ký hiệu tập hợp chuẩn quốc tế: N (Natural), Z (Zahlen - Integer), Q (Quotient - Rational), R (Real).'
  },
  {
    id: 'math_prime_number',
    word: 'prime number',
    ipaUk: '/praɪm ˈnʌm.bər/',
    ipaUs: '/praɪm ˈnʌm.bɚ/',
    wordType: 'noun',
    primaryMeaningVi: 'Số nguyên tố (Composite number: hợp số)',
    simpleDefinitionEn: 'A whole number greater than 1 that has only two positive divisors: 1 and itself.',
    primarySubjectId: 'math',
    applicableGrades: [6],
    educationLevel: 'secondary',
    senses: [
      {
        subjectId: 'math',
        subjectNameVi: 'Toán học',
        meaningVi: 'Số nguyên tố',
        disciplineExplanationVi: 'Số tự nhiên lớn hơn 1 chỉ có hai ước là 1 và chính nó. Số 2 là số nguyên tố chẵn duy nhất. Các số tự nhiên lớn hơn 1 không phải số nguyên tố gọi là hợp số (composite number).',
        grades: [6],
        topic: 'Số học lớp 6',
        formulaLatex: '\\text{Primes} = \\{2, 3, 5, 7, 11, 13, 17, 19, 23, \\dots\\}',
        examples: [
          {
            sentenceEn: '2 is the smallest prime number and the only even prime.',
            sentenceVi: '2 là số nguyên tố nhỏ nhất và cũng là số nguyên tố chẵn duy nhất.'
          }
        ]
      }
    ],
    synonyms: ['prime'],
    antonyms: ['composite number'],
    relatedTerms: ['divisor', 'factor', 'prime factorization', 'composite number'],
    collocations: ['prime factorization', 'prime factor', 'twin prime'],
    usageNotesVi: 'Lưu ý số 0 và số 1 không phải là số nguyên tố cũng không phải là hợp số.'
  },
  {
    id: 'math_divisibility',
    word: 'divisibility',
    ipaUk: '/dɪˌvɪz.əˈbɪl.ə.ti/',
    ipaUs: '/dɪˌvɪz.əˈbɪl.ə.t̬i/',
    wordType: 'noun',
    primaryMeaningVi: 'Tính chia hết (Divisor: ước số, Multiple: bội số)',
    simpleDefinitionEn: 'The property of an integer being divided by another without leaving a remainder.',
    primarySubjectId: 'math',
    applicableGrades: [6],
    educationLevel: 'secondary',
    senses: [
      {
        subjectId: 'math',
        subjectNameVi: 'Toán học',
        meaningVi: 'Tính chia hết, Ước và Bội',
        disciplineExplanationVi: 'Nếu có số tự nhiên q sao cho a = b × q thì ta nói a chia hết cho b (a ⋮ b). Khi đó a là bội của b, b là ước của a. GCD (Ước chung lớn nhất), LCM (Bội chung nhỏ nhất).',
        grades: [6],
        topic: 'Số học lớp 6',
        formulaLatex: 'a \\,\\vdots\\, b \\iff \\exists q \\in \\mathbb{Z}: a = b \\cdot q',
        examples: [
          {
            sentenceEn: '12 is a multiple of 4, and 4 is a divisor of 12.',
            sentenceVi: '12 là một bội số của 4, và 4 là một ước số của 12.'
          }
        ]
      }
    ],
    synonyms: [],
    antonyms: [],
    relatedTerms: ['divisor', 'multiple', 'greatest common divisor', 'least common multiple'],
    collocations: ['divisibility rules', 'common divisor', 'least common multiple'],
    usageNotesVi: '"Divisor" là ước số, "Multiple" là bội số. "GCD" = Ước chung lớn nhất, "LCM" = Bội chung nhỏ nhất.'
  },
  {
    id: 'math_power_exponent',
    word: 'power / exponent',
    ipaUk: '/paʊər/ /ɪkˈspəʊ.nənt/',
    ipaUs: '/ˈpaʊ.ɚ/ /ɪkˈspoʊ.nənt/',
    wordType: 'noun',
    primaryMeaningVi: 'Lũy thừa / Số mũ (Base: cơ số)',
    simpleDefinitionEn: 'The mathematical operation representing repeated multiplication of a base number by itself.',
    primarySubjectId: 'math',
    applicableGrades: [6, 7],
    educationLevel: 'secondary',
    senses: [
      {
        subjectId: 'math',
        subjectNameVi: 'Toán học',
        meaningVi: 'Lũy thừa và Số mũ',
        disciplineExplanationVi: 'Lũy thừa bậc n của cơ số a là tích của n thừa số bằng nhau, mỗi thừa số bằng a. Ký hiệu a^n (a là cơ số - base, n là số mũ - exponent).',
        grades: [6, 7],
        topic: 'Lũy thừa số học',
        formulaLatex: 'a^n = \\underbrace{a \\cdot a \\dots a}_{n \\text{ thừa số}}, \\quad a^m \\cdot a^n = a^{m+n}',
        examples: [
          {
            sentenceEn: 'In 2^5 = 32, 2 is the base, 5 is the exponent, and 32 is the power.',
            sentenceVi: 'Trong 2^5 = 32, 2 là cơ số, 5 là số mũ và 32 là lũy thừa.'
          }
        ]
      }
    ],
    synonyms: ['index', 'power'],
    antonyms: [],
    relatedTerms: ['base', 'exponent', 'squared', 'cubed'],
    collocations: ['raised to the power of', 'base of power', 'laws of exponents'],
    usageNotesVi: 'Phân biệt "base" (cơ số nằm dưới) và "exponent" (số mũ viết nhỏ ở trên).'
  },
  {
    id: 'math_absolute_value',
    word: 'absolute value',
    ipaUk: '/ˈæb.sə.luːt ˈvæl.juː/',
    ipaUs: '/ˈæb.sə.luːt ˈvæl.juː/',
    wordType: 'noun',
    primaryMeaningVi: 'Giá trị tuyệt đối (|x|)',
    simpleDefinitionEn: 'The non-negative magnitude of a real number without regard to its sign, representing distance from zero.',
    primarySubjectId: 'math',
    applicableGrades: [6, 7, 8],
    educationLevel: 'secondary',
    senses: [
      {
        subjectId: 'math',
        subjectNameVi: 'Toán học',
        meaningVi: 'Giá trị tuyệt đối',
        disciplineExplanationVi: 'Khoảng cách từ điểm biểu diễn số đó đến gốc số 0 trên trục số. Giá trị tuyệt đối của số dương là chính nó, của số âm là số đối của nó, của 0 là 0.',
        grades: [6, 7],
        topic: 'Số thực và Số nguyên',
        formulaLatex: '|x| = \\begin{cases} x & \\text{khi } x \\ge 0 \\\\ -x & \\text{khi } x < 0 \\end{cases}',
        examples: [
          {
            sentenceEn: 'The absolute value of both -7 and +7 is 7.',
            sentenceVi: 'Giá trị tuyệt đối của cả -7 và +7 đều bằng 7.'
          }
        ]
      }
    ],
    synonyms: ['magnitude', 'modulus'],
    antonyms: [],
    relatedTerms: ['distance', 'modulus', 'sign'],
    collocations: ['absolute value equation', 'absolute value function'],
    usageNotesVi: 'Giá trị tuyệt đối luôn luôn không âm (|x| ≥ 0).'
  },
  {
    id: 'math_ratio_proportion',
    word: 'ratio / proportion',
    ipaUk: '/ˈreɪ.ʃi.əʊ/ /prəˈpɔː.ʃən/',
    ipaUs: '/ˈreɪ.ʃi.oʊ/ /prəˈpɔːr.ʃən/',
    wordType: 'noun',
    primaryMeaningVi: 'Tỉ số / Tỉ lệ thức',
    simpleDefinitionEn: 'A ratio compares two quantities; a proportion is an equation stating that two ratios are equal.',
    primarySubjectId: 'math',
    applicableGrades: [6, 7],
    educationLevel: 'secondary',
    senses: [
      {
        subjectId: 'math',
        subjectNameVi: 'Toán học',
        meaningVi: 'Tỉ số và Tỉ lệ thức',
        disciplineExplanationVi: 'Tỉ số của hai số a và b (b khác 0) là thương a : b. Tỉ lệ thức là đẳng thức của hai tỉ số: a/b = c/d (tích ngoại tỉ bằng tích trung tỉ: a.d = b.c).',
        grades: [6, 7],
        topic: 'Tỉ lệ thức và đại lượng tỉ lệ',
        formulaLatex: '\\frac{a}{b} = \\frac{c}{d} \\iff a \\cdot d = b \\cdot c',
        examples: [
          {
            sentenceEn: 'In a proportion a/b = c/d, the product of the extremes equals the product of the means.',
            sentenceVi: 'Trong tỉ lệ thức a/b = c/d, tích của hai ngoại tỉ bằng tích của hai trung tỉ.'
          }
        ]
      }
    ],
    synonyms: ['fraction', 'relationship'],
    antonyms: [],
    relatedTerms: ['cross multiplication', 'direct proportion', 'inverse proportion'],
    collocations: ['direct proportion', 'inverse proportion', 'ratio of a to b'],
    usageNotesVi: '"Ratio" là tỉ số giữa 2 đại lượng (a : b); "Proportion" là phương trình tỉ lệ thức giữa 2 tỉ số (a/b = c/d).'
  },
  {
    id: 'math_angle',
    word: 'angle',
    ipaUk: '/ˈæŋ.ɡəl/',
    ipaUs: '/ˈæŋ.ɡəl/',
    wordType: 'noun',
    primaryMeaningVi: 'Góc (Acute: góc nhọn, Right: góc vuông, Obtuse: góc tù, Straight: góc bẹt)',
    simpleDefinitionEn: 'The figure formed by two rays sharing a common endpoint called the vertex.',
    primarySubjectId: 'math',
    applicableGrades: [6, 7],
    educationLevel: 'secondary',
    senses: [
      {
        subjectId: 'math',
        subjectNameVi: 'Toán học',
        meaningVi: 'Các loại góc hình học',
        disciplineExplanationVi: 'Hình gồm hai tia chung gốc (đỉnh). Phân loại: Góc nhọn (Acute: 0° < α < 90°), Góc vuông (Right: α = 90°), Góc tù (Obtuse: 90° < α < 180°), Góc bẹt (Straight: α = 180°).',
        grades: [6, 7],
        topic: 'Hình học phẳng THCS',
        formulaLatex: '0^\\circ < \\alpha_{\\text{acute}} < 90^\\circ, \\quad \\alpha_{\\text{right}} = 90^\\circ, \\quad 90^\\circ < \\alpha_{\\text{obtuse}} < 180^\\circ',
        examples: [
          {
            sentenceEn: 'An acute angle measures less than 90 degrees, while an obtuse angle is between 90 and 180 degrees.',
            sentenceVi: 'Góc nhọn có số đo bé hơn 90 độ, trong khi góc tù nằm giữa 90 và 180 độ.'
          }
        ]
      }
    ],
    synonyms: [],
    antonyms: [],
    relatedTerms: ['vertex', 'degree', 'protractor', 'supplementary angles', 'complementary angles'],
    collocations: ['right angle', 'acute angle', 'obtuse angle', 'straight angle'],
    usageNotesVi: '"Complementary angles" là hai góc phụ nhau (tổng bằng 90°); "Supplementary angles" là hai góc bù nhau (tổng bằng 180°).'
  },
  {
    id: 'math_parallel_perpendicular',
    word: 'parallel / perpendicular lines',
    ipaUk: '/ˈpær.ə.lel/ /ˌpɜː.pənˈdɪk.jə.lər laɪnz/',
    ipaUs: '/ˈper.ə.lel/ /ˌpɝː.pənˈdɪk.jə.lɚ laɪnz/',
    wordType: 'noun',
    primaryMeaningVi: 'Đường thẳng song song / Đường thẳng vuông góc',
    simpleDefinitionEn: 'Parallel lines never intersect; perpendicular lines intersect at a right angle of 90 degrees.',
    primarySubjectId: 'math',
    applicableGrades: [6, 7],
    educationLevel: 'secondary',
    senses: [
      {
        subjectId: 'math',
        subjectNameVi: 'Toán học',
        meaningVi: 'Quan hệ song song và vuông góc',
        disciplineExplanationVi: 'Hai đường thẳng song song (a // b) không có điểm chung nào. Hai đường thẳng vuông góc (a ⊥ b) cắt nhau và tạo thành các góc vuông 90°.',
        grades: [6, 7],
        topic: 'Hình học phẳng lớp 7',
        formulaLatex: 'a \\parallel b, \\quad a \\perp b \\iff \\angle(a, b) = 90^\\circ',
        examples: [
          {
            sentenceEn: 'Perpendicular lines intersect to form four 90-degree right angles.',
            sentenceVi: 'Hai đường thẳng vuông góc cắt nhau tạo thành bốn góc vuông 90 độ.'
          }
        ]
      }
    ],
    synonyms: [],
    antonyms: ['intersecting lines'],
    relatedTerms: ['intersection', 'right angle', 'slope', 'alternate interior angles'],
    collocations: ['parallel lines', 'perpendicular lines', 'perpendicular bisector'],
    usageNotesVi: 'Ký hiệu // biểu thị song song (parallel), ký hiệu ⊥ biểu thị vuông góc (perpendicular).'
  },
  {
    id: 'math_theorem',
    word: 'theorem',
    ipaUk: '/ˈθɪə.rəm/',
    ipaUs: '/ˈθɪr.əm/',
    wordType: 'noun',
    primaryMeaningVi: 'Định lý (ví dụ: Pythagorean theorem - Định lý Pytago)',
    simpleDefinitionEn: 'A general mathematical statement proved on the basis of previously established statements or axioms.',
    primarySubjectId: 'math',
    applicableGrades: [7, 8, 9],
    educationLevel: 'secondary',
    senses: [
      {
        subjectId: 'math',
        subjectNameVi: 'Toán học',
        meaningVi: 'Định lý toán học',
        disciplineExplanationVi: 'Khẳng định suy ra từ những khẳng định được coi là đúng, gồm Giả thiết (Hypothesis) và Kết luận (Conclusion). Định lý Pytago: Trong tam giác vuông, bình phương cạnh huyền bằng tổng bình phương hai cạnh góc vuông.',
        grades: [7, 8, 9],
        topic: 'Hình học phẳng & Chứng minh',
        formulaLatex: 'a^2 + b^2 = c^2 \\quad (\\text{Định lý Pytago})',
        examples: [
          {
            sentenceEn: 'The Pythagorean theorem states that in a right-angled triangle, a squared plus b squared equals c squared.',
            sentenceVi: 'Định lý Pytago phát biểu rằng trong tam giác vuông, a bình phương cộng b bình phương bằng c bình phương.'
          }
        ]
      }
    ],
    synonyms: ['proposition', 'rule'],
    antonyms: ['axiom (tiên đề)'],
    relatedTerms: ['proof', 'hypothesis', 'conclusion', 'corollary', 'axiom'],
    collocations: ['Pythagorean theorem', 'prove a theorem', 'fundamental theorem'],
    usageNotesVi: '"Axiom" (tiên đề) là mệnh đề hiển nhiên không cần chứng minh; "Theorem" (định lý) bắt buộc phải chứng minh logic.'
  },

  // ==========================================
  // LỚP 8 - LỚP 9: PHƯƠNG TRÌNH VÀ CĂN BẬC HAI
  // ==========================================
  {
    id: 'math_variable',
    word: 'variable',
    ipaUk: '/ˈveə.ri.ə.bəl/',
    ipaUs: '/ˈver.i.ə.bəl/',
    wordType: 'noun',
    primaryMeaningVi: 'Biến số (ví dụ: x, y)',
    simpleDefinitionEn: 'A symbol, usually a letter like x or y, representing an unknown or changing quantity in algebra.',
    primarySubjectId: 'math',
    applicableGrades: [7, 8, 9],
    educationLevel: 'secondary',
    senses: [
      {
        subjectId: 'math',
        subjectNameVi: 'Toán học',
        meaningVi: 'Biến số trong đại số',
        disciplineExplanationVi: 'Chữ cái đại diện cho đại lượng có thể nhận các giá trị khác nhau trong tập hợp xác định. Thường dùng x, y, z làm ẩn số hoặc biến số.',
        grades: [7, 8, 9],
        topic: 'Đại số & Biểu thức',
        formulaLatex: 'f(x) = 2x + 1 \\quad (x \\text{ là biến số})',
        examples: [
          {
            sentenceEn: 'Solve for the variable x in the equation 2x + 5 = 15.',
            sentenceVi: 'Giải tìm biến số x trong phương trình 2x + 5 = 15.'
          }
        ]
      }
    ],
    synonyms: ['unknown'],
    antonyms: ['constant'],
    relatedTerms: ['constant', 'coefficient', 'unknown', 'dependent variable', 'independent variable'],
    collocations: ['solve for the variable', 'independent variable', 'dependent variable'],
    usageNotesVi: 'Phân biệt "variable" (biến số - thay đổi) và "constant" (hằng số - cố định không đổi).'
  },
  {
    id: 'math_coefficient_constant',
    word: 'coefficient / constant',
    ipaUk: '/ˌkəʊ.ɪˈfɪʃ.ənt/ /ˈkɒn.stənt/',
    ipaUs: '/ˌkoʊ.əˈfɪʃ.ənt/ /ˈkɑːn.stənt/',
    wordType: 'noun',
    primaryMeaningVi: 'Hệ số / Hằng số',
    simpleDefinitionEn: 'A coefficient is a numerical factor multiplying a variable; a constant is a fixed numerical value.',
    primarySubjectId: 'math',
    applicableGrades: [7, 8, 9],
    educationLevel: 'secondary',
    senses: [
      {
        subjectId: 'math',
        subjectNameVi: 'Toán học',
        meaningVi: 'Hệ số và Hằng số',
        disciplineExplanationVi: 'Trong đơn thức hoặc đa thức ax² + bx + c: a và b là hệ số (coefficients) nhân với lũy thừa của biến; c là hệ số tự do hay hằng số (constant).',
        grades: [7, 8, 9],
        topic: 'Đơn thức & Đa thức',
        formulaLatex: 'P(x) = ax^2 + bx + c \\quad (a, b: \\text{hệ số}, \\, c: \\text{hằng số})',
        examples: [
          {
            sentenceEn: 'In 5x^2, 5 is the coefficient of x^2.',
            sentenceVi: 'Trong biểu thức 5x^2, 5 là hệ số của x^2.'
          }
        ]
      }
    ],
    synonyms: ['factor', 'fixed value'],
    antonyms: ['variable'],
    relatedTerms: ['term', 'leading coefficient', 'constant term'],
    collocations: ['leading coefficient', 'constant term', 'numerical coefficient'],
    usageNotesVi: '"Leading coefficient" là hệ số của số hạng bậc cao nhất trong đa thức.'
  },
  {
    id: 'math_expression_polynomial',
    word: 'expression / polynomial',
    ipaUk: '/ɪkˈspreʃ.ən/ /ˌpɒl.iˈnəʊ.mi.əl/',
    ipaUs: '/ɪkˈspreʃ.ən/ /ˌpɑː.lɪˈnoʊ.mi.əl/',
    wordType: 'noun',
    primaryMeaningVi: 'Biểu thức / Đa thức',
    simpleDefinitionEn: 'An expression is a combination of symbols; a polynomial is an expression consisting of variables and coefficients.',
    primarySubjectId: 'math',
    applicableGrades: [7, 8, 9],
    educationLevel: 'secondary',
    senses: [
      {
        subjectId: 'math',
        subjectNameVi: 'Toán học',
        meaningVi: 'Biểu thức đại số và Đa thức',
        disciplineExplanationVi: 'Đa thức là một tổng của những đơn thức. Bậc của đa thức là bậc của hạng tử có bậc cao nhất trong dạng thu gọn.',
        grades: [7, 8],
        topic: 'Đại số lớp 7-8',
        formulaLatex: 'P(x) = a_n x^n + a_{n-1} x^{n-1} + \\dots + a_1 x + a_0',
        examples: [
          {
            sentenceEn: 'A quadratic polynomial has a degree of two.',
            sentenceVi: 'Một đa thức bậc hai có bậc bằng hai.'
          }
        ]
      }
    ],
    synonyms: ['algebraic expression'],
    antonyms: [],
    relatedTerms: ['monomial', 'binomial', 'trinomial', 'degree of polynomial'],
    collocations: ['algebraic expression', 'factor a polynomial', 'degree of polynomial'],
    usageNotesVi: 'Monomial (đơn thức - 1 số hạng), Binomial (nhị thức - 2 số hạng), Trinomial (tam thức - 3 số hạng), Polynomial (đa thức nói chung).'
  },
  {
    id: 'math_equation',
    word: 'equation',
    ipaUk: '/ɪˈkweɪ.ʒən/',
    ipaUs: '/ɪˈkweɪ.ʒən/',
    wordType: 'noun',
    primaryMeaningVi: 'Phương trình',
    simpleDefinitionEn: 'A mathematical statement asserting that two expressions are equal, containing one or more variables.',
    primarySubjectId: 'math',
    applicableGrades: [7, 8, 9, 10],
    educationLevel: 'secondary',
    senses: [
      {
        subjectId: 'math',
        subjectNameVi: 'Toán học',
        meaningVi: 'Phương trình',
        disciplineExplanationVi: 'Mệnh đề chứa biến có dạng f(x) = g(x). Nghiệm của phương trình là giá trị của biến số làm cho hai vế có giá trị bằng nhau. Giải phương trình là tìm tất cả các nghiệm.',
        grades: [7, 8, 9],
        topic: 'Phương trình bậc nhất và bậc hai',
        formulaLatex: 'ax + b = 0 \\quad (a \\neq 0), \\quad ax^2 + bx + c = 0',
        examples: [
          {
            sentenceEn: 'Solve the linear equation 3x - 9 = 0 to get x = 3.',
            sentenceVi: 'Giải phương trình bậc nhất 3x - 9 = 0 thu được nghiệm x = 3.'
          }
        ]
      }
    ],
    synonyms: ['equality'],
    antonyms: ['inequality'],
    relatedTerms: ['root', 'solution', 'linear equation', 'quadratic equation'],
    collocations: ['solve an equation', 'quadratic equation', 'system of equations'],
    usageNotesVi: 'Phân biệt "equation" (phương trình có dấu =) và "expression" (biểu thức không có dấu =).'
  },
  {
    id: 'math_inequality',
    word: 'inequality',
    ipaUk: '/ˌɪn.ɪˈkwɒl.ə.ti/',
    ipaUs: '/ˌɪn.ɪˈkwɑː.lə.t̬i/',
    wordType: 'noun',
    primaryMeaningVi: 'Bất phương trình / Bất đẳng thức (<, >, ≤, ≥)',
    simpleDefinitionEn: 'A mathematical relationship stating that one value is greater than, less than, or not equal to another.',
    primarySubjectId: 'math',
    applicableGrades: [8, 9, 10],
    educationLevel: 'secondary',
    senses: [
      {
        subjectId: 'math',
        subjectNameVi: 'Toán học',
        meaningVi: 'Bất đẳng thức và Bất phương trình',
        disciplineExplanationVi: 'Hệ thức có dạng a < b hoặc a > b (bất đẳng thức). Bất phương trình chứa biến f(x) > g(x). Khi nhân hoặc chia hai vế với số âm, phải đảo chiều dấu bất phương trình.',
        grades: [8, 9, 10],
        topic: 'Bất đẳng thức & Bất phương trình',
        formulaLatex: 'a < b \\iff a - b < 0, \\quad ax + b > 0',
        examples: [
          {
            sentenceEn: 'When multiplying an inequality by a negative number, reverse the inequality sign.',
            sentenceVi: 'Khi nhân cả hai vế của bất phương trình với một số âm, ta phải đổi chiều dấu bất phương trình.'
          }
        ]
      }
    ],
    synonyms: [],
    antonyms: ['equality', 'equation'],
    relatedTerms: ['less than', 'greater than', 'solution set'],
    collocations: ['solve the inequality', 'linear inequality', 'strict inequality'],
    usageNotesVi: 'Quy tắc vàng: Nhân/chia 2 vế với số âm luôn phải đổi chiều dấu bất đẳng thức!'
  },
  {
    id: 'math_system_of_equations',
    word: 'system of equations',
    ipaUk: '/ˈsɪs.təm əv ɪˈkweɪ.ʒənz/',
    ipaUs: '/ˈsɪs.təm əv ɪˈkweɪ.ʒənz/',
    wordType: 'noun',
    primaryMeaningVi: 'Hệ phương trình',
    simpleDefinitionEn: 'A set of two or more equations with the same variables solved simultaneously.',
    primarySubjectId: 'math',
    applicableGrades: [9, 10],
    educationLevel: 'secondary',
    senses: [
      {
        subjectId: 'math',
        subjectNameVi: 'Toán học',
        meaningVi: 'Hệ phương trình bậc nhất hai ẩn',
        disciplineExplanationVi: 'Tập hợp gồm nhiều phương trình có cùng các ẩn số. Nghiệm của hệ là bộ giá trị thỏa mãn đồng thời tất cả các phương trình. Giải bằng phương pháp thế hoặc phương pháp cộng đại số.',
        grades: [9, 10],
        topic: 'Hệ phương trình',
        formulaLatex: '\\begin{cases} a_1 x + b_1 y = c_1 \\\\ a_2 x + b_2 y = c_2 \\end{cases}',
        examples: [
          {
            sentenceEn: 'We can solve this system of linear equations using the elimination method.',
            sentenceVi: 'Chúng ta có thể giải hệ phương trình tuyến tính này bằng phương pháp cộng đại số (khử ẩn).'
          }
        ]
      }
    ],
    synonyms: ['simultaneous equations'],
    antonyms: [],
    relatedTerms: ['elimination method', 'substitution method', 'simultaneous equations'],
    collocations: ['solve a system of equations', 'system of linear equations'],
    usageNotesVi: 'Trong tiếng Anh Anh thường gọi là "simultaneous equations".'
  },
  {
    id: 'math_square_cube_root',
    word: 'square root / cube root',
    ipaUk: '/skweər ruːt/ /kjuːb ruːt/',
    ipaUs: '/skwer ruːt/ /kjuːb ruːt/',
    wordType: 'noun',
    primaryMeaningVi: 'Căn bậc hai / Căn bậc ba (√x, ³√x)',
    simpleDefinitionEn: 'Radical values that, when multiplied by itself once or twice, give the original quantity.',
    primarySubjectId: 'math',
    applicableGrades: [7, 9],
    educationLevel: 'secondary',
    senses: [
      {
        subjectId: 'math',
        subjectNameVi: 'Toán học',
        meaningVi: 'Căn bậc hai và Căn bậc ba',
        disciplineExplanationVi: 'Căn bậc hai số học của a ≥ 0 là số x ≥ 0 sao cho x² = a. Căn bậc ba của a là số x sao cho x³ = a (mọi số thực đều có duy nhất một căn bậc ba).',
        grades: [7, 9],
        topic: 'Căn thức bậc hai và bậc ba',
        formulaLatex: '\\sqrt{a} = x \\iff x \\ge 0 \\text{ và } x^2 = a, \\quad \\sqrt[3]{a} = y \\iff y^3 = a',
        examples: [
          {
            sentenceEn: 'The square root of 64 is 8, and the cube root of 64 is 4.',
            sentenceVi: 'Căn bậc hai của 64 là 8, và căn bậc ba của 64 là 4.'
          }
        ]
      }
    ],
    synonyms: ['radical'],
    antonyms: ['square', 'cube'],
    relatedTerms: ['radical', 'radicand', 'surd'],
    collocations: ['calculate square root', 'cube root of a number'],
    usageNotesVi: 'Biểu thức dưới dấu căn gọi là "radicand". Biểu thức căn thức gọi là "radical".'
  },
  {
    id: 'math_coordinate_plane',
    word: 'coordinate plane',
    ipaUk: '/kəʊˈɔː.dɪ.nət pleɪn/',
    ipaUs: '/koʊˈɔːr.dən.ət pleɪn/',
    wordType: 'noun',
    primaryMeaningVi: 'Mặt phẳng tọa độ (X-axis: trục hoành, Y-axis: trục tung, Origin: gốc tọa độ)',
    simpleDefinitionEn: 'A two-dimensional number plane formed by the intersection of a horizontal X-axis and a vertical Y-axis.',
    primarySubjectId: 'math',
    applicableGrades: [7, 8, 9, 10],
    educationLevel: 'secondary',
    senses: [
      {
        subjectId: 'math',
        subjectNameVi: 'Toán học',
        meaningVi: 'Mặt phẳng tọa độ Oxy',
        disciplineExplanationVi: 'Hệ trục tọa độ Descartes gồm trục hoành Ox nằm ngang, trục tung Oy thẳng đứng vuông góc nhau tại gốc tọa độ O(0,0). Mỗi điểm M được xác định bởi cặp số tọa độ (x; y).',
        grades: [7, 9, 10],
        topic: 'Hệ tọa độ Descartes Oxy',
        formulaLatex: 'M(x_M; y_M), \\quad O(0; 0), \\quad Ox \\perp Oy',
        examples: [
          {
            sentenceEn: 'The point (3, -2) lies in the fourth quadrant of the coordinate plane.',
            sentenceVi: 'Điểm (3, -2) nằm ở góc phần tư thứ tư của mặt phẳng tọa độ.'
          }
        ]
      }
    ],
    synonyms: ['Cartesian plane'],
    antonyms: [],
    relatedTerms: ['Cartesian coordinates', 'quadrant', 'x-axis', 'y-axis', 'origin'],
    collocations: ['plot on the coordinate plane', 'Cartesian coordinate system'],
    usageNotesVi: 'Trục hoành là "X-axis" (hoành độ là x-coordinate / abscissa), trục tung là "Y-axis" (tung độ là y-coordinate / ordinate).'
  },
  {
    id: 'math_polygon',
    word: 'polygon',
    ipaUk: '/ˈpɒl.i.ɡɒn/',
    ipaUs: '/ˈpɑː.li.ɡɑːn/',
    wordType: 'noun',
    primaryMeaningVi: 'Đa giác (Tam giác, Tứ giác, Ngũ giác, Lục giác...)',
    simpleDefinitionEn: 'A closed plane figure with at least three straight sides and angles.',
    primarySubjectId: 'math',
    applicableGrades: [8, 9],
    educationLevel: 'secondary',
    senses: [
      {
        subjectId: 'math',
        subjectNameVi: 'Toán học',
        meaningVi: 'Đa giác lồi và đa giác đều',
        disciplineExplanationVi: 'Hình gồm n đoạn thẳng (n ≥ 3) khép kín nối các đỉnh. Đa giác đều có tất cả các cạnh bằng nhau và tất cả các góc bằng nhau. Tổng các góc trong của đa giác n cạnh là (n - 2) × 180°.',
        grades: [8, 9],
        topic: 'Hình học phẳng lớp 8',
        formulaLatex: 'S_{\\text{angles}} = (n - 2) \\times 180^\\circ',
        examples: [
          {
            sentenceEn: 'A regular hexagon is a six-sided polygon with all equal sides and 120-degree interior angles.',
            sentenceVi: 'Hình lục giác đều là đa giác 6 cạnh có tất cả các cạnh bằng nhau và góc trong bằng 120 độ.'
          }
        ]
      }
    ],
    synonyms: ['multilateral figure'],
    antonyms: [],
    relatedTerms: ['regular polygon', 'quadrilateral', 'pentagon', 'hexagon', 'octagon'],
    collocations: ['regular polygon', 'convex polygon', 'interior angles of a polygon'],
    usageNotesVi: 'Phân loại: Triangle (3 cạnh), Quadrilateral (4 cạnh), Pentagon (5 cạnh), Hexagon (6 cạnh), Octagon (8 cạnh), Decagon (10 cạnh).'
  },
  {
    id: 'math_similarity',
    word: 'similarity',
    ipaUk: '/ˌsɪm.ɪˈlær.ə.ti/',
    ipaUs: '/ˌsɪm.əˈler.ə.t̬i/',
    wordType: 'noun',
    primaryMeaningVi: 'Sự đồng dạng (Similar triangles: tam giác đồng dạng)',
    simpleDefinitionEn: 'Geometric figures having the same shape with proportional corresponding sides and equal corresponding angles.',
    primarySubjectId: 'math',
    applicableGrades: [8, 9],
    educationLevel: 'secondary',
    senses: [
      {
        subjectId: 'math',
        subjectNameVi: 'Toán học',
        meaningVi: 'Tam giác đồng dạng',
        disciplineExplanationVi: 'Hai tam giác gọi là đồng dạng nếu các góc tương ứng bằng nhau và các cạnh tương ứng tỉ lệ. Ba trường hợp đồng dạng: c-c-c, c-g-c, g-g. Tỉ số diện tích bằng bình phương tỉ số đồng dạng k².',
        grades: [8],
        topic: 'Tam giác đồng dạng lớp 8',
        formulaLatex: '\\Delta ABC \\sim \\Delta A\'B\'C\' \\iff \\frac{AB}{A\'B\'} = \\frac{BC}{B\'C\'} = \\frac{CA}{C\'A\'} = k, \\, \\frac{S}{S\'} = k^2',
        examples: [
          {
            sentenceEn: 'Similar triangles have identical interior angles and proportional corresponding side lengths.',
            sentenceVi: 'Các tam giác đồng dạng có các góc trong tương ứng bằng nhau và các cạnh tương ứng tỉ lệ.'
          }
        ]
      }
    ],
    synonyms: ['geometric similarity'],
    antonyms: ['congruence (bằng nhau/tam giác bằng nhau)'],
    relatedTerms: ['similar triangles', 'ratio of similarity', 'congruent triangles'],
    collocations: ['similar triangles', 'ratio of similarity', 'criteria for triangle similarity'],
    usageNotesVi: 'Phân biệt "congruent" (bằng nhau hoàn toàn cả hình dạng và kích thước, k = 1) và "similar" (đồng dạng, cùng hình dáng nhưng kích thước tỉ lệ k).'
  },

  // ==========================================
  // CẤP TRUNG HỌC PHỔ THÔNG (LỚP 10 - LỚP 12)
  // LỚP 10: TẬP HỢP, VECTƠ VÀ LƯỢNG GIÁC
  // ==========================================
  {
    id: 'math_set',
    word: 'set',
    ipaUk: '/set/',
    ipaUs: '/set/',
    wordType: 'noun',
    primaryMeaningVi: 'Tập hợp (Subset: tập con, Union: hợp, Intersection: giao)',
    simpleDefinitionEn: 'A well-defined collection of distinct objects or elements.',
    primarySubjectId: 'math',
    applicableGrades: [10],
    educationLevel: 'high_school',
    senses: [
      {
        subjectId: 'math',
        subjectNameVi: 'Toán học',
        meaningVi: 'Tập hợp và các phép toán tập hợp',
        disciplineExplanationVi: 'Gồm các phần tử phân biệt. Phép toán: Tập con (A ⊂ B); Phép hợp (A ∪ B) lấy phần tử thuộc A hoặc B; Phép giao (A ∩ B) lấy phần tử thuộc cả A và B; Hiệu (A \\ B); Phần bù (C_E A).',
        grades: [10],
        topic: 'Mệnh đề và Tập hợp lớp 10',
        formulaLatex: 'A \\cup B = \\{x \\mid x \\in A \\text{ hoặc } x \\in B\\}, \\quad A \\cap B = \\{x \\mid x \\in A \\text{ và } x \\in B\\}',
        examples: [
          {
            sentenceEn: 'The intersection of sets A and B contains only the elements shared by both sets.',
            sentenceVi: 'Giao của hai tập hợp A và B chỉ chứa các phần tử chung của cả hai tập hợp.'
          }
        ]
      }
    ],
    synonyms: ['collection'],
    antonyms: ['empty set (tập rỗng)'],
    relatedTerms: ['subset', 'element', 'union', 'intersection', 'Venn diagram', 'empty set'],
    collocations: ['subset of', 'union of sets', 'intersection of sets', 'empty set'],
    usageNotesVi: 'Ký hiệu ∪ là hợp (Union), ∩ là giao (Intersection), ∅ là tập rỗng (empty set).'
  },
  {
    id: 'math_vector',
    word: 'vector',
    ipaUk: '/ˈvek.tər/',
    ipaUs: '/ˈvek.tɚ/',
    wordType: 'noun',
    primaryMeaningVi: 'Vectơ (Coordinates: tọa độ, Scalar product / Dot product: tích vô hướng)',
    simpleDefinitionEn: 'A mathematical quantity characterized by both magnitude and direction.',
    primarySubjectId: 'math',
    applicableGrades: [10, 11, 12],
    educationLevel: 'high_school',
    senses: [
      {
        subjectId: 'math',
        subjectNameVi: 'Toán học',
        meaningVi: 'Vectơ trong hình học và đại số',
        disciplineExplanationVi: 'Đoạn thẳng có hướng. Vectơ có điểm đầu và điểm cuối. Tích vô hướng của hai vectơ là một số: a.b = |a|.|b|.cos(a, b). Hai vectơ vuông góc khi tích vô hướng bằng 0.',
        grades: [10],
        topic: 'Vectơ lớp 10',
        formulaLatex: '\\vec{a} \\cdot \\vec{b} = |\\vec{a}| \\cdot |\\vec{b}| \\cdot \\cos(\\vec{a}, \\vec{b}) = a_1 b_1 + a_2 b_2',
        examples: [
          {
            sentenceEn: 'Two non-zero vectors are perpendicular if and only if their scalar product is zero.',
            sentenceVi: 'Hai vectơ khác không vuông góc với nhau khi và chỉ khi tích vô hướng của chúng bằng không.'
          }
        ]
      }
    ],
    synonyms: [],
    antonyms: ['scalar (vô hướng)'],
    relatedTerms: ['magnitude', 'dot product', 'scalar product', 'coordinates', 'unit vector'],
    collocations: ['dot product', 'scalar product', 'vector coordinates', 'unit vector'],
    usageNotesVi: 'Phân biệt "scalar" (đại lượng vô hướng, chỉ có độ lớn) và "vector" (đại lượng có cả hướng và độ lớn).'
  },
  {
    id: 'math_trigonometry',
    word: 'trigonometry',
    ipaUk: '/ˌtrɪɡ.əˈnɒm.ə.tri/',
    ipaUs: '/ˌtrɪɡ.əˈnɑː.mə.tri/',
    wordType: 'noun',
    primaryMeaningVi: 'Lượng giác (Sine, Cosine, Tangent, Cotangent)',
    simpleDefinitionEn: 'The branch of mathematics dealing with the relationships between the sides and angles of triangles.',
    primarySubjectId: 'math',
    applicableGrades: [9, 10, 11],
    educationLevel: 'high_school',
    senses: [
      {
        subjectId: 'math',
        subjectNameVi: 'Toán học',
        meaningVi: 'Hệ thức lượng và Giá trị lượng giác',
        disciplineExplanationVi: 'Định nghĩa trên đường tròn lượng giác: sin, cos, tan, cot. Các công thức lượng giác cơ bản: sin²α + cos²α = 1, công thức cộng, công thức nhân đôi, định lý sin, định lý cosin trong tam giác.',
        grades: [10, 11],
        topic: 'Lượng giác lớp 10 & 11',
        formulaLatex: '\\sin^2 \\alpha + \\cos^2 \\alpha = 1, \\quad \\tan \\alpha = \\frac{\\sin \\alpha}{\\cos \\alpha}, \\quad a^2 = b^2 + c^2 - 2bc\\cos A',
        examples: [
          {
            sentenceEn: 'The Law of Cosines generalizes the Pythagorean theorem to any arbitrary triangle.',
            sentenceVi: 'Định lý Cosin tổng quát hóa định lý Pytago cho một tam giác bất kỳ.'
          }
        ]
      }
    ],
    synonyms: [],
    antonyms: [],
    relatedTerms: ['sine', 'cosine', 'tangent', 'cotangent', 'unit circle', 'Law of Cosines'],
    collocations: ['trigonometric function', 'unit circle', 'Law of Sines', 'Law of Cosines'],
    usageNotesVi: 'Từ viết tắt: sin (sine), cos (cosine), tan (tangent), cot (cotangent).'
  },
  {
    id: 'math_statistics',
    word: 'statistics',
    ipaUk: '/stəˈtɪs.tɪks/',
    ipaUs: '/stəˈtɪs.tɪks/',
    wordType: 'noun',
    primaryMeaningVi: 'Thống kê (Mean: số trung bình, Median: trung vị, Variance: phương sai, Standard deviation: độ lệch chuẩn)',
    simpleDefinitionEn: 'The science of collecting, organizing, analyzing, and interpreting numerical data.',
    primarySubjectId: 'math',
    applicableGrades: [10, 12],
    educationLevel: 'high_school',
    senses: [
      {
        subjectId: 'math',
        subjectNameVi: 'Toán học',
        meaningVi: 'Các đặc trưng đo xu thế trung tâm và mức độ phân tán',
        disciplineExplanationVi: 'Đo xu thế trung tâm gồm Số trung bình (Mean), Trung vị (Median), Mốt (Mode). Đo mức độ phân tán gồm Khoảng biến thiên, Khoảng tứ phân vị, Phương sai (Variance s²), Độ lệch chuẩn (Standard deviation s = √s²).',
        grades: [10],
        topic: 'Thống kê mô tả lớp 10',
        formulaLatex: 's^2 = \\frac{1}{n} \\sum_{i=1}^n (x_i - \\bar{x})^2, \\quad s = \\sqrt{s^2}',
        examples: [
          {
            sentenceEn: 'Standard deviation measures the average dispersion of data points around the mean.',
            sentenceVi: 'Độ lệch chuẩn đo lường mức độ phân tán trung bình của các điểm dữ liệu xung quanh giá trị trung bình.'
          }
        ]
      }
    ],
    synonyms: [],
    antonyms: [],
    relatedTerms: ['mean', 'median', 'mode', 'variance', 'standard deviation', 'quartile'],
    collocations: ['standard deviation', 'sample variance', 'arithmetic mean'],
    usageNotesVi: '"Variance" là phương sai (s²), "Standard deviation" là độ lệch chuẩn (s) cùng đơn vị với biến lượng ban đầu.'
  },

  // ==========================================
  // LỚP 11: DÃY SỐ, GIỚI HẠN VÀ ĐẠO HÀM
  // ==========================================
  {
    id: 'math_sequence_progression',
    word: 'sequence / progression',
    ipaUk: '/ˈsiː.kwəns/ /prəˈɡreʃ.ən/',
    ipaUs: '/ˈsiː.kwəns/ /prəˈɡreʃ.ən/',
    wordType: 'noun',
    primaryMeaningVi: 'Dãy số (Arithmetic progression: cấp số cộng, Geometric progression: cấp số nhân)',
    simpleDefinitionEn: 'An ordered list of numbers following a specific rule or formula.',
    primarySubjectId: 'math',
    applicableGrades: [11],
    educationLevel: 'high_school',
    senses: [
      {
        subjectId: 'math',
        subjectNameVi: 'Toán học',
        meaningVi: 'Dãy số, Cấp số cộng và Cấp số nhân',
        disciplineExplanationVi: 'Cấp số cộng (AP): số hạng sau bằng số hạng trước cộng công sai d (u_n = u_1 + (n-1)d). Cấp số nhân (GP): số hạng sau bằng số hạng trước nhân công bội q (u_n = u_1 . q^(n-1)).',
        grades: [11],
        topic: 'Dãy số lớp 11',
        formulaLatex: 'u_n = u_1 + (n-1)d, \\quad u_n = u_1 \\cdot q^{n-1}, \\quad S_n = \\frac{n(u_1 + u_n)}{2}',
        examples: [
          {
            sentenceEn: 'An arithmetic progression has a constant common difference between consecutive terms.',
            sentenceVi: 'Một cấp số cộng có công sai không đổi giữa các số hạng liên tiếp.'
          }
        ]
      }
    ],
    synonyms: ['series', 'progression'],
    antonyms: [],
    relatedTerms: ['arithmetic progression', 'geometric progression', 'common difference', 'common ratio'],
    collocations: ['arithmetic progression', 'geometric progression', 'common difference', 'common ratio'],
    usageNotesVi: 'Viết tắt: AP (Arithmetic Progression - Cấp số cộng), GP (Geometric Progression - Cấp số nhân).'
  },
  {
    id: 'math_combinatorics',
    word: 'combinatorics',
    ipaUk: '/kəmˌbaɪ.nəˈtɒr.ɪks/',
    ipaUs: '/kəmˌbaɪ.nəˈtɔːr.ɪks/',
    wordType: 'noun',
    primaryMeaningVi: 'Đại số tổ hợp (Permutation: hoán vị/chỉnh hợp, Combination: tổ hợp)',
    simpleDefinitionEn: 'The branch of mathematics dealing with counting, arrangements, and selections of sets.',
    primarySubjectId: 'math',
    applicableGrades: [10, 11],
    educationLevel: 'high_school',
    senses: [
      {
        subjectId: 'math',
        subjectNameVi: 'Toán học',
        meaningVi: 'Đại số tổ hợp: Quy tắc đếm, Hoán vị, Chỉnh hợp, Tổ hợp',
        disciplineExplanationVi: 'Quy tắc cộng, quy tắc nhân. Hoán vị P_n = n! sắp xếp có thứ tự n phần tử. Chỉnh hợp A_n^k chọn k phần tử và có xếp thứ tự. Tổ hợp C_n^k chọn k phần tử không quan tâm thứ tự.',
        grades: [10],
        topic: 'Đại số tổ hợp lớp 10',
        formulaLatex: 'P_n = n!, \\quad A_n^k = \\frac{n!}{(n-k)!}, \\quad C_n^k = \\frac{n!}{k!(n-k)!}',
        examples: [
          {
            sentenceEn: 'Use combinations when the order of selection does not matter, and permutations when order matters.',
            sentenceVi: 'Sử dụng tổ hợp khi thứ tự chọn không quan trọng, và dùng chỉnh hợp/hoán vị khi thứ tự là quan trọng.'
          }
        ]
      }
    ],
    synonyms: ['counting theory'],
    antonyms: [],
    relatedTerms: ['permutation', 'combination', 'factorial', 'binomial theorem'],
    collocations: ['permutation and combination', 'binomial theorem', 'factorial notation'],
    usageNotesVi: 'Phân biệt cốt lõi: Permutation (quan tâm đến thứ tự sắp xếp), Combination (chỉ chọn nhóm, không phân biệt thứ tự).'
  },
  {
    id: 'math_probability',
    word: 'probability',
    ipaUk: '/ˌprɒb.əˈbɪl.ə.ti/',
    ipaUs: '/ˌprɑː.bəˈbɪl.ə.t̬i/',
    wordType: 'noun',
    primaryMeaningVi: 'Xác suất (Sample space: không gian mẫu, Event: biến cố)',
    simpleDefinitionEn: 'A numerical measure of the likelihood that an event will occur, ranging from 0 to 1.',
    primarySubjectId: 'math',
    applicableGrades: [10, 11, 12],
    educationLevel: 'high_school',
    senses: [
      {
        subjectId: 'math',
        subjectNameVi: 'Toán học',
        meaningVi: 'Xác suất cổ điển và Biến cố',
        disciplineExplanationVi: 'Không gian mẫu (Ω) là tập hợp mọi kết quả có thể xảy ra. Biến cố A là tập con của không gian mẫu. Xác suất cổ điển P(A) = n(A) / n(Ω). Quy tắc cộng và nhân xác suất.',
        grades: [10, 11, 12],
        topic: 'Xác suất cổ điển và có điều kiện',
        formulaLatex: 'P(A) = \\frac{n(A)}{n(\\Omega)}, \\quad 0 \\le P(A) \\le 1, \\quad P(A \\cup B) = P(A) + P(B) - P(A \\cap B)',
        examples: [
          {
            sentenceEn: 'The probability of rolling an even number on a fair six-sided die is 3/6 or 0.5.',
            sentenceVi: 'Xác suất để gieo được một mặt số chẵn trên con xúc xắc 6 mặt đồng chất là 3/6 hay 0,5.'
          }
        ]
      }
    ],
    synonyms: ['likelihood', 'chance'],
    antonyms: ['impossibility'],
    relatedTerms: ['sample space', 'event', 'conditional probability', 'independent events'],
    collocations: ['sample space', 'conditional probability', 'probability distribution'],
    usageNotesVi: 'Xác suất của biến cố chắc chắn bằng 1, của biến cố không thể bằng 0.'
  },
  {
    id: 'math_limit',
    word: 'limit',
    ipaUk: '/ˈlɪm.ɪt/',
    ipaUs: '/ˈlɪm.ɪt/',
    wordType: 'noun',
    primaryMeaningVi: 'Giới hạn (Dãy số và Hàm số)',
    simpleDefinitionEn: 'The value that a function or sequence approaches as the input or index approaches some point.',
    primarySubjectId: 'math',
    applicableGrades: [11],
    educationLevel: 'high_school',
    senses: [
      {
        subjectId: 'math',
        subjectNameVi: 'Toán học',
        meaningVi: 'Giới hạn của dãy số và hàm số',
        disciplineExplanationVi: 'Khái niệm nền tảng của Giải tích toán học, dẫn tới định nghĩa đạo hàm và tích phân. Ký hiệu lim. Dạng vô định: 0/0, ∞/∞, ∞ - ∞, 0 × ∞.',
        grades: [11],
        topic: 'Giới hạn & Tính liên tục',
        formulaLatex: '\\lim_{x \\to x_0} f(x) = L, \\quad \\lim_{x \\to 0} \\frac{\\sin x}{x} = 1',
        examples: [
          {
            sentenceEn: 'The limit of 1/n as n approaches infinity equals zero.',
            sentenceVi: 'Giới hạn của 1/n khi n dần tới vô cực bằng không.'
          }
        ]
      }
    ],
    synonyms: ['boundary'],
    antonyms: [],
    relatedTerms: ['continuous function', 'indeterminate form', 'one-sided limit', 'infinity'],
    collocations: ['evaluate the limit', 'approach infinity', 'indeterminate form'],
    usageNotesVi: '"Indeterminate form" là dạng vô định cần khử trước khi tính giới hạn.'
  },
  {
    id: 'math_solid_geometry',
    word: 'solid geometry',
    ipaUk: '/ˈsɒl.ɪd dʒiˈɒm.ə.tri/',
    ipaUs: '/ˈsɑː.lɪd dʒiˈɑː.mə.tri/',
    wordType: 'noun',
    primaryMeaningVi: 'Hình học không gian (Plane: mặt phẳng, Prism: hình lăng trụ, Pyramid: hình chóp)',
    simpleDefinitionEn: 'The branch of geometry dealing with three-dimensional figures and spatial relations.',
    primarySubjectId: 'math',
    applicableGrades: [11, 12],
    educationLevel: 'high_school',
    senses: [
      {
        subjectId: 'math',
        subjectNameVi: 'Toán học',
        meaningVi: 'Hình học không gian cổ điển',
        disciplineExplanationVi: 'Nghiên cứu quan hệ song song và vuông góc giữa đường thẳng và mặt phẳng trong không gian; tính khoảng cách, góc; nghiên cứu các hình đa diện (lăng trụ, chóp, hộp) và khối tròn xoay.',
        grades: [11],
        topic: 'Hình học không gian lớp 11',
        formulaLatex: 'V_{\\text{pyramid}} = \\frac{1}{3} S_{\\text{base}} \\cdot h, \\quad V_{\\text{prism}} = S_{\\text{base}} \\cdot h',
        examples: [
          {
            sentenceEn: 'A regular pyramid has a base that is a regular polygon and its apex projects to the center of the base.',
            sentenceVi: 'Một hình chóp đều có đáy là đa giác đều và đỉnh hình chiếu vuông góc lên tâm của đáy.'
          }
        ]
      }
    ],
    synonyms: ['3D geometry', 'spatial geometry'],
    antonyms: ['plane geometry'],
    relatedTerms: ['plane', 'prism', 'pyramid', 'apex', 'cross section', 'dihedral angle'],
    collocations: ['spatial geometry', 'parallel planes', 'angle between planes'],
    usageNotesVi: 'Phân biệt "prism" (hình lăng trụ có 2 đáy song song và bằng nhau) và "pyramid" (hình chóp chỉ có 1 đáy và chụm về đỉnh apex).'
  },

  // ==========================================
  // LỚP 12: GIẢI TÍCH NÂNG CAO VÀ HÌNH OXYZ
  // ==========================================
  {
    id: 'math_application_of_derivatives',
    word: 'application of derivatives',
    ipaUk: '/ˌæp.lɪˈkeɪ.ʃən əv dɪˈrɪv.ə.tɪvz/',
    ipaUs: '/ˌæp.ləˈkeɪ.ʃən əv dɪˈrɪv.ə.t̬ɪvz/',
    wordType: 'noun',
    primaryMeaningVi: 'Ứng dụng đạo hàm (Monotonicity: tính đơn điệu, Maximum / Minimum / Extrema: GTLN / GTNN / Cực trị, Asymptote: đường tiệm cận)',
    simpleDefinitionEn: 'Using calculus derivatives to study function behavior, graph sketching, optimization, and rates of change.',
    primarySubjectId: 'math',
    applicableGrades: [12],
    educationLevel: 'high_school',
    senses: [
      {
        subjectId: 'math',
        subjectNameVi: 'Toán học',
        meaningVi: 'Ứng dụng đạo hàm khảo sát hàm số',
        disciplineExplanationVi: 'Dùng dấu của đạo hàm f\'(x) để xét tính đồng biến, nghịch biến (monotonicity); f\'(x)=0 tìm điểm cực trị (local extrema); tìm giá trị lớn nhất (Max), nhỏ nhất (Min); tính giới hạn tìm tiệm cận đứng và tiệm cận ngang (asymptote).',
        grades: [12],
        topic: 'Ứng dụng đạo hàm lớp 12',
        formulaLatex: 'f\'(x) > 0 \\implies f \\text{ đồng biến}; \\quad \\lim_{x \\to \\pm\\infty} f(x) = y_0 \\implies y = y_0 \\text{ (tiệm cận ngang)}',
        examples: [
          {
            sentenceEn: 'The horizontal asymptote of a rational function is found by calculating limits as x approaches infinity.',
            sentenceVi: 'Đường tiệm cận ngang của hàm phân thức được tìm bằng cách tính giới hạn khi x dần tới vô cực.'
          }
        ]
      }
    ],
    synonyms: [],
    antonyms: [],
    relatedTerms: ['monotonicity', 'extrema', 'asymptote', 'inflection point', 'concavity'],
    collocations: ['vertical asymptote', 'horizontal asymptote', 'local maximum', 'local minimum'],
    usageNotesVi: 'Từ chuyên ngành thi THPT: Asymptote (tiệm cận), Extrema (cực trị), Monotonicity (tính đơn điệu - đồng biến/nghịch biến).'
  },
  {
    id: 'math_logarithm_exponential',
    word: 'logarithm / exponential function',
    ipaUk: '/ˈlɒɡ.ə.rɪ.ðəm/ /ˌek.spəˈnen.ʃəl ˈfʌŋk.ʃən/',
    ipaUs: '/ˈlɑː.ɡə.rɪ.ðəm/ /ˌek.spoʊˈnen.ʃəl ˈfʌŋk.ʃən/',
    wordType: 'noun',
    primaryMeaningVi: 'Lôgarit / Hàm số mũ (log_a b, y = a^x)',
    simpleDefinitionEn: 'Inverse operations: the logarithm is the power to which a base must be raised to produce a given number.',
    primarySubjectId: 'math',
    applicableGrades: [11, 12],
    educationLevel: 'high_school',
    senses: [
      {
        subjectId: 'math',
        subjectNameVi: 'Toán học',
        meaningVi: 'Hàm số mũ và Hàm số Lôgarit',
        disciplineExplanationVi: 'Cho a > 0, a ≠ 1. Lôgarit cơ số a của b (b > 0) là số α sao cho a^α = b. Hàm số mũ y = a^x và hàm số lôgarit y = log_a x là hai hàm số ngược nhau. Lôgarit tự nhiên ln x có cơ số e ≈ 2.718.',
        grades: [11, 12],
        topic: 'Hàm số mũ và Lôgarit',
        formulaLatex: '\\log_a b = \\alpha \\iff a^\\alpha = b, \\quad \\ln x = \\log_e x, \\quad \\log_a(x \\cdot y) = \\log_a x + \\log_a y',
        examples: [
          {
            sentenceEn: 'The natural logarithm has the mathematical constant e as its base.',
            sentenceVi: 'Lôgarit tự nhiên có cơ số là hằng số toán học e.'
          }
        ]
      }
    ],
    synonyms: ['log', 'natural log'],
    antonyms: [],
    relatedTerms: ['natural logarithm', 'Euler\'s number e', 'common logarithm', 'exponential growth'],
    collocations: ['natural logarithm', 'exponential growth', 'change of base formula'],
    usageNotesVi: 'Phân biệt "common log" (lôgarit thập phân log hay lg, cơ số 10) và "natural log" (lôgarit tự nhiên ln, cơ số e).'
  },
  {
    id: 'math_complex_number',
    word: 'complex number',
    ipaUk: '/ˈkɒm.pleks ˈnʌm.bər/',
    ipaUs: '/ˈkɑːm.pleks ˈnʌm.bɚ/',
    wordType: 'noun',
    primaryMeaningVi: 'Số phức (Real part: phần thực, Imaginary part: phần ảo, Modulus: mô-đun)',
    simpleDefinitionEn: 'A number of the form a + bi, where a and b are real numbers and i is the imaginary unit (i² = -1).',
    primarySubjectId: 'math',
    applicableGrades: [12],
    educationLevel: 'high_school',
    senses: [
      {
        subjectId: 'math',
        subjectNameVi: 'Toán học',
        meaningVi: 'Số phức',
        disciplineExplanationVi: 'Mở rộng từ tập số thực: z = a + bi (a là phần thực - real part, b là phần ảo - imaginary part, i là đơn vị ảo với i² = -1). Mô-đun của số phức |z| = √(a² + b²). Số phức liên hợp là z̄ = a - bi.',
        grades: [12],
        topic: 'Số phức lớp 12',
        formulaLatex: 'z = a + bi \\quad (a, b \\in \\mathbb{R}, \\, i^2 = -1), \\quad |z| = \\sqrt{a^2 + b^2}, \\quad \\bar{z} = a - bi',
        examples: [
          {
            sentenceEn: 'The modulus of the complex number 3 + 4i is equal to 5.',
            sentenceVi: 'Mô-đun của số phức 3 + 4i bằng 5.'
          }
        ]
      }
    ],
    synonyms: [],
    antonyms: ['real number (khi phần ảo bằng 0)'],
    relatedTerms: ['imaginary unit', 'modulus', 'complex conjugate', 'Argand plane'],
    collocations: ['real part', 'imaginary part', 'complex conjugate', 'modulus of a complex number'],
    usageNotesVi: 'Phần ảo của số phức z = a + bi là số thực b (không chứa ký hiệu i).'
  },
  {
    id: 'math_volume',
    word: 'volume',
    ipaUk: '/ˈvɒl.juːm/',
    ipaUs: '/ˈvɑːl.juːm/',
    wordType: 'noun',
    primaryMeaningVi: 'Thể tích',
    simpleDefinitionEn: 'The amount of three-dimensional space enclosed within a container or occupied by an object.',
    primarySubjectId: 'math',
    applicableGrades: [5, 9, 12],
    educationLevel: 'high_school',
    senses: [
      {
        subjectId: 'math',
        subjectNameVi: 'Toán học',
        meaningVi: 'Thể tích khối đa diện và khối tròn xoay',
        disciplineExplanationVi: 'Đại lượng đo lường không gian ba chiều mà vật chiếm chỗ, tính bằng đơn vị khối (m³, cm³). Thể tích khối tròn xoay quanh trục Ox tính bằng tích phân: V = π ∫ [f(x)]² dx.',
        grades: [12],
        topic: 'Ứng dụng tích phân & Khối tròn xoay',
        formulaLatex: 'V = \\pi \\int_a^b [f(x)]^2 \\, dx, \\quad V_{\\text{sphere}} = \\frac{4}{3}\\pi r^3',
        examples: [
          {
            sentenceEn: 'Calculate the volume of the solid of revolution generated by revolving the curve y = f(x) around the x-axis.',
            sentenceVi: 'Tính thể tích khối tròn xoay sinh ra khi quay đường cong y = f(x) quanh trục hoành Ox.'
          }
        ]
      }
    ],
    synonyms: ['cubic capacity', 'spatial content'],
    antonyms: [],
    relatedTerms: ['solid of revolution', 'integral', 'cubic meter'],
    collocations: ['volume of a cylinder', 'volume of revolution', 'cubic units'],
    usageNotesVi: 'Trong môn Vật lí, "volume" còn có thể là âm lượng âm thanh, nhưng trong môn Toán học luôn luôn là "thể tích".'
  },
  {
    id: 'math_coordinate_space_oxyz',
    word: 'coordinate geometry in space (Oxyz)',
    ipaUk: '/kəʊˈɔː.dɪ.nət dʒiˈɒm.ə.tri ɪn speɪs/',
    ipaUs: '/koʊˈɔːr.dən.ət dʒiˈɑː.mə.tri ɪn speɪs/',
    wordType: 'noun',
    primaryMeaningVi: 'Hình học tọa độ trong không gian (Oxyz) (Sphere: mặt cầu, Cylinder: hình trụ, Cone: hình nón)',
    simpleDefinitionEn: 'Three-dimensional analytic geometry using three mutually perpendicular axes: Ox, Oy, and Oz.',
    primarySubjectId: 'math',
    applicableGrades: [12],
    educationLevel: 'high_school',
    senses: [
      {
        subjectId: 'math',
        subjectNameVi: 'Toán học',
        meaningVi: 'Phương pháp tọa độ trong không gian Oxyz',
        disciplineExplanationVi: 'Hệ tọa độ không gian gồm 3 trục Ox, Oy, Oz đôi một vuông góc. Phương trình mặt phẳng, phương trình đường thẳng, phương trình mặt cầu (x - a)² + (y - b)² + (z - c)² = R². Khối trụ (cylinder), khối nón (cone).',
        grades: [12],
        topic: 'Hình học giải tích Oxyz lớp 12',
        formulaLatex: '(x - a)^2 + (y - b)^2 + (z - c)^2 = R^2, \\quad Ax + By + Cz + D = 0',
        examples: [
          {
            sentenceEn: 'In Oxyz space, the normal vector of a plane determines its spatial orientation.',
            sentenceVi: 'Trong không gian Oxyz, vectơ pháp tuyến của mặt phẳng xác định hướng không gian của nó.'
          }
        ]
      }
    ],
    synonyms: ['3D analytic geometry', 'Cartesian space'],
    antonyms: [],
    relatedTerms: ['normal vector', 'direction vector', 'sphere', 'cylinder', 'cone'],
    collocations: ['equation of a plane', 'equation of a sphere', 'normal vector'],
    usageNotesVi: 'Vectơ chỉ phương của đường thẳng là "direction vector", vectơ pháp tuyến của mặt phẳng là "normal vector".'
  }
];
