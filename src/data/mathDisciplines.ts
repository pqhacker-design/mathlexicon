import { MathDisciplineInfo, MathDisciplineId } from '../types/dictionary';

export const MATH_DISCIPLINES: MathDisciplineInfo[] = [
  {
    id: 'algebra',
    nameVi: 'Đại số (Algebra)',
    nameEn: 'Algebra',
    abbrevVi: 'đs.',
    icon: 'Variable',
    color: '#2563EB', // Blue
    bgLight: '#EFF6FF',
    descriptionVi: 'Đại số sơ cấp, Đại số tuyến tính, Đại số trừu tượng (nhóm, vành, trường, ma trận, không gian véc-tơ)',
  },
  {
    id: 'geometry_trig',
    nameVi: 'Hình học & Lượng giác',
    nameEn: 'Geometry & Trigonometry',
    abbrevVi: 'hh.',
    icon: 'Shapes',
    color: '#0891B2', // Cyan
    bgLight: '#ECFEFF',
    descriptionVi: 'Hình học phẳng, Hình học không gian, Đường conic, Hình học vi phân, Hàm số lượng giác',
  },
  {
    id: 'calculus_analysis',
    nameVi: 'Giải tích (Calculus & Analysis)',
    nameEn: 'Calculus & Mathematical Analysis',
    abbrevVi: 'gt.',
    icon: 'TrendingUp',
    color: '#7C3AED', // Violet
    bgLight: '#F5F3FF',
    descriptionVi: 'Giới hạn, Đạo hàm, Tích phân, Chuỗi số, Phương trình vi phân, Giải tích hàm, Giải tích phức',
  },
  {
    id: 'probability_statistics',
    nameVi: 'Xác suất & Thống kê',
    nameEn: 'Probability & Statistics',
    abbrevVi: 'xs., tk.',
    icon: 'BarChart2',
    color: '#059669', // Emerald
    bgLight: '#ECFDF5',
    descriptionVi: 'Biến ngẫu nhiên, Phân phối xác suất, Kỳ vọng, Phương sai, Thống kê suy diễn, Hồi quy, Mẫu khảo sát',
  },
  {
    id: 'discrete_logic',
    nameVi: 'Toán Logic & Rời rạc',
    nameEn: 'Logic & Discrete Mathematics',
    abbrevVi: 'log.',
    icon: 'Network',
    color: '#D97706', // Amber
    bgLight: '#FFFBEB',
    descriptionVi: 'Lý thuyết tập hợp, Mệnh đề logic, Đại số Boole, Tổ hợp, Lý thuyết đồ thị, Quy nạp toán học',
  },
  {
    id: 'topology',
    nameVi: 'Tôpô học (Topology)',
    nameEn: 'Topology',
    abbrevVi: 'top.',
    icon: 'Boxes',
    color: '#EA580C', // Orange
    bgLight: '#FFF7ED',
    descriptionVi: 'Không gian metric, Không gian tôpô, Tập compact, Tập mở/đóng, Đồng phôi, Đa tạp',
  },
  {
    id: 'computing_cybernetics',
    nameVi: 'Toán Tin & Điều khiển học',
    nameEn: 'Computing & Cybernetics',
    abbrevVi: 'mt., xib.',
    icon: 'Binary',
    color: '#4F46E5', // Indigo
    bgLight: '#EEF2FF',
    descriptionVi: 'Toán tính toán, Độ phức tạp thuật toán, Phương pháp số, Mật mã học toán, Điều khiển tự động',
  },
  {
    id: 'applied_mechanics',
    nameVi: 'Toán ứng dụng & Cơ học',
    nameEn: 'Applied Math & Mechanics',
    abbrevVi: 'cơ., vl.',
    icon: 'Cpu',
    color: '#DB2777', // Pink
    bgLight: '#FDF2F8',
    descriptionVi: 'Quy hoạch toán học, Tối ưu hóa, Cơ học giải tích, Phương trình đạo hàm riêng vật lý toán',
  },
  {
    id: 'k12_arithmetic',
    nameVi: 'Số học & Toán phổ thông (K-12)',
    nameEn: 'K-12 School Mathematics',
    abbrevVi: 'pt.',
    icon: 'GraduationCap',
    color: '#0D9488', // Teal
    bgLight: '#F0FDFA',
    descriptionVi: 'Số học cơ bản, Phân số, Tỉ số, Định lý Pytago, Phương trình, Bất đẳng thức lớp 1 đến lớp 12',
  },
];

export function getDisciplineById(id: string): MathDisciplineInfo | undefined {
  return MATH_DISCIPLINES.find((d) => d.id === id);
}

export function getGradeLabel(grade?: number): string {
  if (!grade || grade === 0) return 'Tất cả các lớp';
  if (grade <= 5) return `Tiểu học • Lớp ${grade}`;
  if (grade <= 9) return `THCS • Lớp ${grade}`;
  if (grade <= 12) return `THPT • Lớp ${grade}`;
  return 'Toán đại học / Chuyên sâu';
}
