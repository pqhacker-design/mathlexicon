import { SubjectInfo } from '../types/dictionary';

export const SUBJECTS: SubjectInfo[] = [
  {
    id: 'math',
    nameVi: 'Toán học',
    nameEn: 'Mathematics',
    category: 'natural',
    icon: 'Calculator',
    color: '#2563EB', // Blue
    bgLight: '#EFF6FF',
    descriptionVi: 'Đại số, hình học, giải tích, xác suất thống kê'
  },
  {
    id: 'physics',
    nameVi: 'Vật lí',
    nameEn: 'Physics',
    category: 'natural',
    icon: 'Zap',
    color: '#0284C7', // Sky Blue
    bgLight: '#F0F9FF',
    descriptionVi: 'Cơ học, nhiệt học, quang học, điện từ, vật lí lượng tử'
  },
  {
    id: 'chemistry',
    nameVi: 'Hóa học',
    nameEn: 'Chemistry',
    category: 'natural',
    icon: 'FlaskConical',
    color: '#0D9488', // Teal
    bgLight: '#F0FDFA',
    descriptionVi: 'Hóa vô cơ, hóa hữu cơ, phản ứng hóa học, bảng tuần hoàn'
  },
  {
    id: 'biology',
    nameVi: 'Sinh học',
    nameEn: 'Biology',
    category: 'natural',
    icon: 'Dna',
    color: '#059669', // Emerald
    bgLight: '#ECFDF5',
    descriptionVi: 'Tế bào học, di truyền, tiến hóa, sinh thái học, cơ thể người'
  },
  {
    id: 'natural_science',
    nameVi: 'Khoa học tự nhiên',
    nameEn: 'Natural Science',
    category: 'natural',
    icon: 'Atom',
    color: '#0891B2', // Cyan
    bgLight: '#ECFEFF',
    descriptionVi: 'Môn tích hợp Vật lí - Hóa học - Sinh học cấp THCS'
  },
  {
    id: 'informatics',
    nameVi: 'Tin học',
    nameEn: 'Informatics',
    category: 'natural',
    icon: 'Binary',
    color: '#4F46E5', // Indigo
    bgLight: '#EEF2FF',
    descriptionVi: 'Khoa học máy tính, lập trình thuật toán, cơ sở dữ liệu'
  },
  {
    id: 'technology',
    nameVi: 'Công nghệ',
    nameEn: 'Technology',
    category: 'natural',
    icon: 'Cpu',
    color: '#D97706', // Amber
    bgLight: '#FFFBEB',
    descriptionVi: 'Công nghệ kỹ thuật điện tử, nông nghiệp, thiết kế cơ khí'
  },
  {
    id: 'english',
    nameVi: 'Tiếng Anh',
    nameEn: 'English',
    category: 'social',
    icon: 'Languages',
    color: '#7C3AED', // Violet
    bgLight: '#F5F3FF',
    descriptionVi: 'Ngữ pháp, ngữ âm, từ vựng, 4 kỹ năng ngôn ngữ'
  },
  {
    id: 'literature',
    nameVi: 'Ngữ văn',
    nameEn: 'Literature',
    category: 'social',
    icon: 'BookOpen',
    color: '#E11D48', // Rose
    bgLight: '#FFF1F2',
    descriptionVi: 'Văn học, phương thức biểu đạt, biện pháp tu từ, nghị luận'
  },
  {
    id: 'history',
    nameVi: 'Lịch sử',
    nameEn: 'History',
    category: 'social',
    icon: 'Hourglass',
    color: '#B45309', // Brown amber
    bgLight: '#FEF3C7',
    descriptionVi: 'Lịch sử Việt Nam và thế giới qua các thời kỳ'
  },
  {
    id: 'geography',
    nameVi: 'Địa lí',
    nameEn: 'Geography',
    category: 'social',
    icon: 'Globe2',
    color: '#16A34A', // Green
    bgLight: '#F0FDF4',
    descriptionVi: 'Địa lí tự nhiên, địa lí kinh tế xã hội, bản đồ học'
  },
  {
    id: 'civic_education',
    nameVi: 'Giáo dục công dân',
    nameEn: 'Civic Education',
    category: 'social',
    icon: 'Scale',
    color: '#9333EA', // Purple
    bgLight: '#FAF5FF',
    descriptionVi: 'Đạo đức, kỹ năng sống và pháp luật cơ bản'
  },
  {
    id: 'economics_law',
    nameVi: 'Giáo dục kinh tế & pháp luật',
    nameEn: 'Economic and Legal Education',
    category: 'social',
    icon: 'Landmark',
    color: '#0369A1', // Ocean Blue
    bgLight: '#F0F9FF',
    descriptionVi: 'Kinh tế vi mô, vĩ mô, hệ thống chính trị và pháp luật THPT'
  },
  {
    id: 'pe',
    nameVi: 'Giáo dục thể chất',
    nameEn: 'Physical Education',
    category: 'arts_physical',
    icon: 'Activity',
    color: '#EA580C', // Orange
    bgLight: '#FFF7ED',
    descriptionVi: 'Vận động thể thao, rèn luyện sức khỏe, điền kinh'
  },
  {
    id: 'music',
    nameVi: 'Âm nhạc',
    nameEn: 'Music',
    category: 'arts_physical',
    icon: 'Music',
    color: '#C026D3', // Fuchsia
    bgLight: '#FDF4FF',
    descriptionVi: 'Lí thuyết âm nhạc, xướng âm, nhạc cụ, thanh nhạc'
  },
  {
    id: 'fine_arts',
    nameVi: 'Mĩ thuật',
    nameEn: 'Fine Arts',
    category: 'arts_physical',
    icon: 'Palette',
    color: '#DB2777', // Pink
    bgLight: '#FDF2F8',
    descriptionVi: 'Hội họa, đồ họa, điêu khắc, thẩm mĩ thị giác'
  },
  {
    id: 'arts',
    nameVi: 'Nghệ thuật',
    nameEn: 'Arts',
    category: 'arts_physical',
    icon: 'Sparkles',
    color: '#A855F7',
    bgLight: '#FAF5FF',
    descriptionVi: 'Tổ hợp môn Mĩ thuật và Âm nhạc'
  },
  {
    id: 'experiential',
    nameVi: 'Hoạt động trải nghiệm, hướng nghiệp',
    nameEn: 'Experiential & Career Guidance',
    category: 'cross_discipline',
    icon: 'Compass',
    color: '#059669',
    bgLight: '#ECFDF5',
    descriptionVi: 'Phát triển cá nhân, hướng nghiệp, trải nghiệm sáng tạo'
  },
  {
    id: 'local_education',
    nameVi: 'Giáo dục địa phương',
    nameEn: 'Local Education',
    category: 'cross_discipline',
    icon: 'MapPin',
    color: '#475569', // Slate
    bgLight: '#F8FAFC',
    descriptionVi: 'Lịch sử, văn hóa, địa lí, kinh tế của tỉnh/thành phố'
  }
];

export const GRADE_LEVELS = [
  { level: 'primary', label: 'Tiểu học', grades: [1, 2, 3, 4, 5], badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-200' },
  { level: 'secondary', label: 'THCS', grades: [6, 7, 8, 9], badgeColor: 'bg-blue-100 text-blue-800 border-blue-200' },
  { level: 'high_school', label: 'THPT', grades: [10, 11, 12], badgeColor: 'bg-purple-100 text-purple-800 border-purple-200' }
] as const;

export function getSubjectById(id: string): SubjectInfo | undefined {
  return SUBJECTS.find(s => s.id === id);
}

export function getGradeLabel(grade: number): string {
  if (grade <= 5) return `Lớp ${grade} (Tiểu học)`;
  if (grade <= 9) return `Lớp ${grade} (THCS)`;
  return `Lớp ${grade} (THPT)`;
}
