import React, { useState, useEffect } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Bookmark,
  Info,
  RotateCcw,
  FileText
} from 'lucide-react';

interface LetterIndex {
  letter: string;
  page: number;
  sampleWord: string;
}

const A_Z_INDEX: LetterIndex[] = [
  { letter: 'A', page: 2, sampleWord: 'abacus, algebra, asymptote' },
  { letter: 'B', page: 27, sampleWord: 'basis, bijection, binomial' },
  { letter: 'C', page: 37, sampleWord: 'calculus, circle, cone' },
  { letter: 'D', page: 104, sampleWord: 'derivative, determinant, domain' },
  { letter: 'E', page: 138, sampleWord: 'eigenvalue, ellipse, equation' },
  { letter: 'F', page: 169, sampleWord: 'factor, field, function' },
  { letter: 'G', page: 205, sampleWord: 'geometry, gradient, group' },
  { letter: 'H', page: 220, sampleWord: 'harmonic, homeomorphism, hyperbola' },
  { letter: 'I', page: 229, sampleWord: 'identity, integral, isomorphism' },
  { letter: 'J', page: 252, sampleWord: 'jacobian, Jordan form' },
  { letter: 'K', page: 253, sampleWord: 'kernel, knot theory' },
  { letter: 'L', page: 255, sampleWord: 'lattice, lemma, limit, linear' },
  { letter: 'M', page: 272, sampleWord: 'manifold, matrix, modulus' },
  { letter: 'N', page: 300, sampleWord: 'natural number, norm, null set' },
  { letter: 'O', page: 308, sampleWord: 'operator, origin, orthogonal' },
  { letter: 'P', page: 318, sampleWord: 'parabola, polygon, probability' },
  { letter: 'Q', page: 350, sampleWord: 'quadratic, quantifier, quotient' },
  { letter: 'R', page: 354, sampleWord: 'radius, rational, ring, root' },
  { letter: 'S', page: 373, sampleWord: 'sequence, series, set, sphere' },
  { letter: 'T', page: 416, sampleWord: 'tangent, tensor, theorem, topology' },
  { letter: 'U', page: 435, sampleWord: 'union, unique, unit vector' },
  { letter: 'V', page: 439, sampleWord: 'variable, variance, vector' },
  { letter: 'W', page: 447, sampleWord: 'wave equation, wedge product' },
  { letter: 'X-Z', page: 450, sampleWord: 'x-axis, y-axis, zero divisor' },
];

export type PdfDocId = 'khkt_1976' | 'toan_6' | 'toan_7' | 'toan_8' | 'toan_9';

interface PdfDocMeta {
  id: PdfDocId;
  shortLabel: string;
  title: string;
  subtitle: string;
  url: string;
  maxPages: number;
  defaultPage: number;
}

const PDF_DOCS: PdfDocMeta[] = [
  {
    id: 'khkt_1976',
    shortLabel: 'Từ điển KH&KT 1976',
    title: 'Từ điển Toán học Anh – Việt (NXB KH&KT 1976)',
    subtitle: 'Tài liệu kinh điển gồm hơn 17.000 thuật ngữ toán học do GS. Lê Văn Thiêm, GS. Hoàng Tuỵ, GS. Phan Đức Chính... biên soạn.',
    url: '/assets/aistudio/Tu_dien_toan_hoc_Anh_Viet_e5675988.pdf',
    maxPages: 451,
    defaultPage: 2,
  },
  {
    id: 'toan_6',
    shortLabel: 'Toán 6 (2026)',
    title: 'Tài liệu hướng dẫn dạy học bằng Tiếng Anh – Toán Lớp 6',
    subtitle: 'Bộ Giáo dục và Đào tạo (Hà Nội, 2026) — 9 Chương, 43 Bài học kèm từ vựng, cách đọc ký hiệu, mẫu câu lớp học và bài tập.',
    url: '/assets/aistudio/Toan_6_6a76902e.pdf',
    maxPages: 250,
    defaultPage: 1,
  },
  {
    id: 'toan_7',
    shortLabel: 'Toán 7 (2026)',
    title: 'Tài liệu hướng dẫn dạy học bằng Tiếng Anh – Toán Lớp 7',
    subtitle: 'Bộ Giáo dục và Đào tạo (Hà Nội, 2026) — 10 Chương, 37 Bài học (Số hữu tỉ, Số thực, Tam giác bằng nhau, Đa thức một biến...).',
    url: '/assets/aistudio/Toan_7_0914de78.pdf',
    maxPages: 250,
    defaultPage: 1,
  },
  {
    id: 'toan_8',
    shortLabel: 'Toán 8 (2026)',
    title: 'Tài liệu hướng dẫn dạy học bằng Tiếng Anh – Toán Lớp 8',
    subtitle: 'Bộ Giáo dục và Đào tạo (Hà Nội, 2026) — 10 Chương, 39 Bài học (Hằng đẳng thức, Thalès, Hàm số bậc nhất, Tam giác đồng dạng...).',
    url: '/assets/aistudio/Toan_8_221209d5.pdf',
    maxPages: 250,
    defaultPage: 1,
  },
  {
    id: 'toan_9',
    shortLabel: 'Toán 9 (2026)',
    title: 'Tài liệu hướng dẫn dạy học bằng Tiếng Anh – Toán Lớp 9',
    subtitle: 'Bộ Giáo dục và Đào tạo (Hà Nội, 2026) — 10 Chương, 32 Bài học (Hệ phương trình, Căn thức, Tỉ số lượng giác, Đường tròn, Viète...).',
    url: '/assets/aistudio/Toan_9_2b2c38dd.pdf',
    maxPages: 250,
    defaultPage: 1,
  },
];

interface PdfDictionaryViewProps {
  initialPage?: number;
  initialDocId?: PdfDocId;
}

export const PdfDictionaryView: React.FC<PdfDictionaryViewProps> = ({
  initialPage = 2,
  initialDocId = 'khkt_1976',
}) => {
  const [selectedDocId, setSelectedDocId] = useState<PdfDocId>(initialDocId);
  const activeDoc = PDF_DOCS.find((d) => d.id === selectedDocId) || PDF_DOCS[0];

  const [currentPage, setCurrentPage] = useState<number>(initialPage);
  const [inputPage, setInputPage] = useState<string>(String(initialPage));
  const [showInfo, setShowInfo] = useState<boolean>(true);

  const pdfUrl = `${activeDoc.url}#page=${currentPage}`;

  useEffect(() => {
    setSelectedDocId(initialDocId);
  }, [initialDocId]);

  useEffect(() => {
    if (initialPage && initialPage >= 1 && initialPage <= activeDoc.maxPages) {
      setCurrentPage(initialPage);
      setInputPage(String(initialPage));
    }
  }, [initialPage, activeDoc.maxPages]);

  const handleSelectDoc = (doc: PdfDocMeta) => {
    setSelectedDocId(doc.id);
    setCurrentPage(doc.defaultPage);
    setInputPage(String(doc.defaultPage));
  };

  const handlePageChange = (newPage: number) => {
    const clamped = Math.max(1, Math.min(activeDoc.maxPages, newPage));
    setCurrentPage(clamped);
    setInputPage(String(clamped));
  };

  const handleInputSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = parseInt(inputPage, 10);
    if (!isNaN(parsed) && parsed >= 1 && parsed <= activeDoc.maxPages) {
      setCurrentPage(parsed);
    } else {
      setInputPage(String(currentPage));
    }
  };

  return (
    <div className="space-y-4 max-w-6xl mx-auto pb-12">
      {/* Document Switcher Tabs */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-2 flex flex-wrap gap-1.5">
        {PDF_DOCS.map((doc) => {
          const active = doc.id === selectedDocId;
          return (
            <button
              key={doc.id}
              type="button"
              onClick={() => handleSelectDoc(doc)}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
                active
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>{doc.shortLabel}</span>
            </button>
          );
        })}
      </div>

      {/* Top Banner */}
      <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-sky-700 text-white rounded-2xl p-6 shadow-lg">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-1">
            <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight">
              {activeDoc.title}
            </h1>
            <p className="text-blue-100 text-xs sm:text-sm max-w-3xl">
              {activeDoc.subtitle}
            </p>
          </div>

          <a
            href={activeDoc.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-lg bg-white text-blue-800 hover:bg-blue-50 transition-colors shadow-sm shrink-0"
          >
            <ExternalLink className="w-4 h-4" />
            Mở thẻ mới toàn màn hình
          </a>
        </div>
      </div>

      {/* Contextual Note for KH&KT 1976 */}
      {selectedDocId === 'khkt_1976' && showInfo && (
        <div className="bg-blue-50/80 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/60 rounded-xl p-4 text-xs sm:text-sm text-slate-700 dark:text-slate-300 flex items-start justify-between gap-3">
          <div className="flex items-start gap-3">
            <Info className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p className="font-semibold text-blue-950 dark:text-blue-200">
                Ký hiệu viết tắt ngành toán học trong sách 1976:
              </p>
              <div className="flex flex-wrap gap-2 text-xs">
                <span><strong>đs.</strong> = đại số</span>
                <span>•</span>
                <span><strong>gt.</strong> = giải tích</span>
                <span>•</span>
                <span><strong>hh.</strong> = hình học</span>
                <span>•</span>
                <span><strong>xs.</strong> = xác suất</span>
                <span>•</span>
                <span><strong>tk.</strong> = thống kê</span>
                <span>•</span>
                <span><strong>top.</strong> = tôpô</span>
                <span>•</span>
                <span><strong>log.</strong> = toán logic</span>
              </div>
            </div>
          </div>
          <button
            onClick={() => setShowInfo(false)}
            className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-xs shrink-0 cursor-pointer"
          >
            Ẩn
          </button>
        </div>
      )}

      {/* A-Z Jump Navigation Bar (only for 1976 dictionary) */}
      {selectedDocId === 'khkt_1976' && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-3 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-xs font-medium text-slate-600 dark:text-slate-400">
            <span className="flex items-center gap-1.5 font-semibold text-slate-800 dark:text-slate-200">
              <Bookmark className="w-3.5 h-3.5 text-blue-600" />
              Nhảy nhanh đến mục chữ cái A - Z:
            </span>
            <span className="text-[11px] text-slate-500 tabular-nums">
              Trang hiện tại: <strong>{currentPage}</strong> / 451
            </span>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {A_Z_INDEX.map((item) => {
              const isActive =
                currentPage >= item.page &&
                (A_Z_INDEX[A_Z_INDEX.indexOf(item) + 1]
                  ? currentPage < A_Z_INDEX[A_Z_INDEX.indexOf(item) + 1].page
                  : true);

              return (
                <button
                  key={item.letter}
                  onClick={() => handlePageChange(item.page)}
                  title={`Chữ ${item.letter} (từ trang ${item.page}): ${item.sampleWord}`}
                  className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-all cursor-pointer ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-sm ring-2 ring-blue-400'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-blue-100 dark:hover:bg-blue-900/40 hover:text-blue-700'
                  }`}
                >
                  {item.letter}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* PDF Controls Toolbar */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-3 shadow-sm flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage <= 1}
            className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 disabled:opacity-40 transition-colors cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
            Trang trước
          </button>

          <form onSubmit={handleInputSubmit} className="flex items-center gap-1.5">
            <span className="text-xs text-slate-500">Trang:</span>
            <input
              type="number"
              min={1}
              max={activeDoc.maxPages}
              value={inputPage}
              onChange={(e) => setInputPage(e.target.value)}
              className="w-16 px-2 py-1 text-xs font-medium text-center rounded-md border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:outline-hidden focus:ring-2 focus:ring-blue-500 tabular-nums"
            />
            <button
              type="submit"
              className="px-2.5 py-1 text-xs font-semibold rounded-md bg-blue-600 text-white hover:bg-blue-700 transition-colors cursor-pointer"
            >
              Đi tới
            </button>
          </form>

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage >= activeDoc.maxPages}
            className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 disabled:opacity-40 transition-colors cursor-pointer"
          >
            Trang sau
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <button
          onClick={() => handlePageChange(activeDoc.defaultPage)}
          className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Về trang đầu
        </button>
      </div>

      {/* PDF Embed Viewer Frame */}
      <div className="bg-slate-800 rounded-2xl overflow-hidden border border-slate-300 dark:border-slate-700 shadow-xl h-[76vh] flex flex-col">
        <iframe
          key={`pdf-frame-${selectedDocId}-${currentPage}`}
          src={pdfUrl}
          title={activeDoc.title}
          className="w-full h-full border-none"
        />
      </div>
    </div>
  );
};
