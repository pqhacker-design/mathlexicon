import React, { useState } from 'react';
import {
  Database,
  Plus,
  Download,
  Upload,
  Trash2,
  Edit,
  AlertTriangle,
  CheckCircle2,
  FileSpreadsheet,
  FileCode,
  ShieldAlert,
  Search,
  Filter,
  Layers,
  Sparkles
} from 'lucide-react';
import { DictionaryTerm, WordType } from '../../types/dictionary';
import { DictionaryStorage } from '../../services/dictionaryStorage';
import { MATH_DISCIPLINES, getDisciplineById } from '../../data/mathDisciplines';

interface DataManagementViewProps {
  onSelectTerm: (term: DictionaryTerm) => void;
}

export const DataManagementView: React.FC<DataManagementViewProps> = ({
  onSelectTerm,
}) => {
  const [activeTab, setActiveTab] = useState<'terms_list' | 'add_term' | 'import_export' | 'duplicates'>('terms_list');
  const [terms, setTerms] = useState<DictionaryTerm[]>(DictionaryStorage.getAllTerms());
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubject, setSelectedSubject] = useState<string>('all');

  // New Term Form State
  const [newWord, setNewWord] = useState('');
  const [newIpaUk, setNewIpaUk] = useState('');
  const [newIpaUs, setNewIpaUs] = useState('');
  const [newWordType, setNewWordType] = useState<WordType>('noun');
  const [newPrimaryMeaning, setNewPrimaryMeaning] = useState('');
  const [newSimpleDef, setNewSimpleDef] = useState('');
  const [newSubjectId, setNewSubjectId] = useState('math');
  const [newGrades, setNewGrades] = useState('10, 11, 12');
  const [newTopic, setNewTopic] = useState('');
  const [newFormula, setNewFormula] = useState('');
  const [newDisciplineExplanation, setNewDisciplineExplanation] = useState('');
  const [newExEn, setNewExEn] = useState('');
  const [newExVi, setNewExVi] = useState('');
  const [newCollocations, setNewCollocations] = useState('');
  const [newUsageNotes, setNewUsageNotes] = useState('');

  const [formSuccess, setFormSuccess] = useState(false);
  const [importStatus, setImportStatus] = useState<string | null>(null);

  const reloadTerms = () => {
    setTerms(DictionaryStorage.getAllTerms());
  };

  const handleCreateTerm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newWord.trim() || !newPrimaryMeaning.trim()) {
      alert('Vui lòng nhập từ tiếng Anh và nghĩa tiếng Việt.');
      return;
    }

    const parsedGrades = newGrades
      .split(',')
      .map((g) => parseInt(g.trim(), 10))
      .filter((n) => !isNaN(n) && n >= 1 && n <= 12);

    const termToSave: DictionaryTerm = {
      id: 'term_custom_' + Date.now(),
      word: newWord.trim(),
      ipaUk: newIpaUk.trim() || '/.../',
      ipaUs: newIpaUs.trim() || newIpaUk.trim() || '/.../',
      wordType: newWordType,
      primaryMeaningVi: newPrimaryMeaning.trim(),
      simpleDefinitionEn: newSimpleDef.trim() || 'Educational specialized definition.',
      primarySubjectId: newSubjectId,
      applicableGrades: parsedGrades.length > 0 ? parsedGrades : [10],
      educationLevel:
        parsedGrades[0] <= 5 ? 'primary' : parsedGrades[0] <= 9 ? 'secondary' : 'high_school',
      senses: [
        {
          disciplineId: newSubjectId as any,
          subjectNameVi: getDisciplineById(newSubjectId)?.nameVi || 'Đại số & Giải tích',
          meaningVi: newPrimaryMeaning.trim(),
          disciplineExplanationVi: newDisciplineExplanation.trim() || newPrimaryMeaning.trim(),
          grades: parsedGrades.length > 0 ? parsedGrades : [10],
          topic: newTopic.trim() || 'Chủ đề kiến thức',
          formulaLatex: newFormula.trim() || undefined,
          examples: newExEn.trim()
            ? [
                {
                  sentenceEn: newExEn.trim(),
                  sentenceVi: newExVi.trim(),
                },
              ]
            : [],
        },
      ],
      synonyms: [],
      antonyms: [],
      relatedTerms: [],
      collocations: newCollocations
        .split(';')
        .map((c) => c.trim())
        .filter(Boolean),
      usageNotesVi: newUsageNotes.trim() || undefined,
      isCustom: true,
      createdAt: new Date().toISOString(),
    };

    DictionaryStorage.saveTerm(termToSave);
    reloadTerms();
    setFormSuccess(true);
    setTimeout(() => setFormSuccess(false), 3000);

    // Reset Form
    setNewWord('');
    setNewIpaUk('');
    setNewIpaUs('');
    setNewPrimaryMeaning('');
    setNewSimpleDef('');
    setNewDisciplineExplanation('');
    setNewFormula('');
    setNewExEn('');
    setNewExVi('');
    setNewCollocations('');
    setNewUsageNotes('');
  };

  const handleDeleteTerm = (id: string, word: string) => {
    if (confirm(`Bạn có chắc chắn muốn xóa thuật ngữ "${word}" khỏi cơ sở dữ liệu?`)) {
      DictionaryStorage.deleteTerm(id);
      reloadTerms();
    }
  };

  const handleDownloadSampleCsv = () => {
    const sampleHeaders =
      'Từ tiếng Anh (Word),Phiên âm UK,Phiên âm US,Loại từ,Nghĩa tiếng Việt,Định nghĩa tiếng Anh,Môn học chính,Các lớp áp dụng,Cụm từ đi kèm,Ví dụ tiếng Anh,Dịch ví dụ';
    const sampleRow1 =
      '"molecule","/ˈmɒl.ɪ.kjuːl/","/ˈmɑː.lɪ.kjuːl/","noun","Phân tử","A group of atoms bonded together","chemistry","8,9,10","molecular structure; polar molecule","Water is a molecule composed of two hydrogen atoms and one oxygen atom.","Nước là phân tử gồm hai nguyên tử hydro và một nguyên tử oxy."';
    const sampleRow2 =
      '"vector","/ˈvek.tər/","/ˈvek.tɚ/","noun","Vectơ","A quantity having direction as well as magnitude","math","10,11,12","unit vector; zero vector","A vector represents displacement and velocity.","Một vectơ biểu thị độ dịch chuyển và vận tốc."';

    const content = [sampleHeaders, sampleRow1, sampleRow2].join('\n');
    const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Mau_Nhap_Tu_Vung_EduLexicon.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImportCsv = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const csvText = event.target?.result as string;
      if (csvText) {
        const res = DictionaryStorage.importFromCsv(csvText);
        reloadTerms();
        setImportStatus(
          `Đã nhập thành công ${res.importedCount} thuật ngữ mới vào cơ sở dữ liệu!`
        );
      }
    };
    reader.readAsText(file);
  };

  const handleExportJson = () => {
    const jsonStr = DictionaryStorage.exportToJson();
    const blob = new Blob([jsonStr], { type: 'application/json;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `EduLexicon_Backup_${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleExportCsv = () => {
    const csvStr = DictionaryStorage.exportToCsv();
    const blob = new Blob([csvStr], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `EduLexicon_Terms_${Date.now()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const duplicates = DictionaryStorage.findDuplicates();

  const filteredTerms = terms.filter((t) => {
    if (selectedSubject !== 'all' && t.primarySubjectId !== selectedSubject) return false;
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      return (
        t.word.toLowerCase().includes(q) ||
        t.primaryMeaningVi.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-12">
      {/* Header Bar with Role Switch */}
      <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Database className="w-6 h-6 text-cyan-600" />
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
              Quản trị Hệ thống & Dữ liệu Từ điển
            </h1>
            <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-cyan-100 text-cyan-800 dark:bg-cyan-950 dark:text-cyan-300">
              Admin & Data
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Thêm mới thuật ngữ, nhập hàng loạt từ Excel/CSV, xuất sao lưu dữ liệu và kiểm tra tính toàn vẹn.
          </p>
        </div>

        {/* Database stats badge */}
        <div className="flex items-center gap-2 p-2 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 text-xs">
          <span className="text-slate-500">Cơ sở dữ liệu:</span>
          <span className="font-bold text-cyan-600 dark:text-cyan-400">
            {terms.length} thuật ngữ K-12
          </span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 dark:border-slate-700 overflow-x-auto gap-2">
        <button
          onClick={() => setActiveTab('terms_list')}
          className={`py-2 px-3 text-xs font-bold border-b-2 cursor-pointer transition-colors shrink-0 ${
            activeTab === 'terms_list'
              ? 'border-cyan-600 text-cyan-600'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          Danh sách thuật ngữ ({terms.length})
        </button>
        <button
          onClick={() => setActiveTab('add_term')}
          className={`py-2 px-3 text-xs font-bold border-b-2 cursor-pointer transition-colors shrink-0 flex items-center gap-1 ${
            activeTab === 'add_term'
              ? 'border-cyan-600 text-cyan-600'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Plus className="w-3.5 h-3.5" /> Thêm từ vựng mới
        </button>
        <button
          onClick={() => setActiveTab('import_export')}
          className={`py-2 px-3 text-xs font-bold border-b-2 cursor-pointer transition-colors shrink-0 flex items-center gap-1 ${
            activeTab === 'import_export'
              ? 'border-cyan-600 text-cyan-600'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <FileSpreadsheet className="w-3.5 h-3.5" /> Nhập / Xuất Excel & CSV
        </button>
        <button
          onClick={() => setActiveTab('duplicates')}
          className={`py-2 px-3 text-xs font-bold border-b-2 cursor-pointer transition-colors shrink-0 flex items-center gap-1 ${
            activeTab === 'duplicates'
              ? 'border-cyan-600 text-cyan-600'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <AlertTriangle className="w-3.5 h-3.5 text-amber-500" /> Kiểm tra từ trùng ({duplicates.length})
        </button>
      </div>

      {/* Tab 1: Terms List & Management */}
      {activeTab === 'terms_list' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-200 dark:border-slate-700">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Tìm từ tiếng Anh hoặc nghĩa tiếng Việt..."
                className="w-full pl-9 pr-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xs sm:text-sm text-slate-800 dark:text-white focus:outline-hidden"
              />
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-medium text-slate-500">Ngành:</span>
              <select
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                className="px-3 py-2 text-xs bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-700 dark:text-slate-200 focus:outline-hidden"
              >
                <option value="all">Tất cả ngành toán</option>
                {MATH_DISCIPLINES.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.nameVi} ({d.abbrevVi})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-xs">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-slate-900/60 text-slate-600 dark:text-slate-300 font-bold uppercase tracking-wider text-[11px] border-b border-slate-200 dark:border-slate-700">
                <tr>
                  <th className="px-4 py-3">Thuật ngữ tiếng Anh</th>
                  <th className="px-3 py-3">Phiên âm US</th>
                  <th className="px-4 py-3">Nghĩa tiếng Việt</th>
                  <th className="px-3 py-3">Môn học</th>
                  <th className="px-3 py-3">Lớp</th>
                  <th className="px-3 py-3 text-right">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-700/60">
                {filteredTerms.map((term) => {
                  const sub = getDisciplineById(term.discipline || 'algebra');
                  return (
                    <tr
                      key={term.id}
                      className="hover:bg-slate-50 dark:hover:bg-slate-700/40 transition-colors"
                    >
                      <td className="px-4 py-3 font-bold text-slate-900 dark:text-white">
                        <button
                          onClick={() => onSelectTerm(term)}
                          className="hover:text-blue-600 text-left font-bold cursor-pointer"
                        >
                          {term.word}
                        </button>
                      </td>
                      <td className="px-3 py-3 font-mono text-slate-500">
                        {term.ipaUs}
                      </td>
                      <td className="px-4 py-3 font-semibold text-blue-600 dark:text-blue-400">
                        {term.primaryMeaningVi}
                      </td>
                      <td className="px-3 py-3">
                        {sub && (
                          <span
                            className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                            style={{ backgroundColor: sub.bgLight, color: sub.color }}
                          >
                            {sub.nameVi}
                          </span>
                        )}
                      </td>
                      <td className="px-3 py-3 text-slate-500">
                        {term.applicableGrades.join(', ')}
                      </td>
                      <td className="px-3 py-3 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <button
                            onClick={() => onSelectTerm(term)}
                            className="p-1 text-slate-400 hover:text-blue-600 rounded cursor-pointer"
                            title="Xem chi tiết"
                          >
                            <Edit className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDeleteTerm(term.id, term.word)}
                            className="p-1 text-slate-400 hover:text-rose-600 rounded cursor-pointer"
                            title="Xóa thuật ngữ"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 2: Add Term Form */}
      {activeTab === 'add_term' && (
        <form
          onSubmit={handleCreateTerm}
          className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-xs space-y-4"
        >
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-700">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Plus className="w-5 h-5 text-cyan-600" />
              Thêm thuật ngữ chuyên ngành giáo dục mới
            </h2>
            {formSuccess && (
              <span className="text-xs text-emerald-600 font-bold flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4" /> Đã lưu thành công!
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            {/* Word */}
            <div className="space-y-1">
              <label className="font-bold text-slate-700 dark:text-slate-300">
                Từ tiếng Anh <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                value={newWord}
                onChange={(e) => setNewWord(e.target.value)}
                placeholder="Ví dụ: momentum, isotope, tangent..."
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-800 dark:text-white focus:outline-hidden"
              />
            </div>

            {/* IPA UK */}
            <div className="space-y-1">
              <label className="font-bold text-slate-700 dark:text-slate-300">
                Phiên âm UK (Anh - Anh)
              </label>
              <input
                type="text"
                value={newIpaUk}
                onChange={(e) => setNewIpaUk(e.target.value)}
                placeholder="/məˈmen.təm/"
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-800 dark:text-white focus:outline-hidden font-mono"
              />
            </div>

            {/* IPA US */}
            <div className="space-y-1">
              <label className="font-bold text-slate-700 dark:text-slate-300">
                Phiên âm US (Anh - Mỹ)
              </label>
              <input
                type="text"
                value={newIpaUs}
                onChange={(e) => setNewIpaUs(e.target.value)}
                placeholder="/moʊˈmen.t̬əm/"
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-800 dark:text-white focus:outline-hidden font-mono"
              />
            </div>

            {/* Word Type */}
            <div className="space-y-1">
              <label className="font-bold text-slate-700 dark:text-slate-300">
                Loại từ
              </label>
              <select
                value={newWordType}
                onChange={(e) => setNewWordType(e.target.value as WordType)}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-800 dark:text-white focus:outline-hidden"
              >
                <option value="noun">Danh từ (Noun)</option>
                <option value="verb">Động từ (Verb)</option>
                <option value="adjective">Tính từ (Adjective)</option>
                <option value="adverb">Trạng từ (Adverb)</option>
                <option value="phrase">Cụm từ (Phrase)</option>
              </select>
            </div>

            {/* Primary Discipline */}
            <div className="space-y-1">
              <label className="font-bold text-slate-700 dark:text-slate-300">
                Phân ngành Toán học <span className="text-rose-500">*</span>
              </label>
              <select
                value={newSubjectId}
                onChange={(e) => setNewSubjectId(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-800 dark:text-white focus:outline-hidden"
              >
                {MATH_DISCIPLINES.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.nameVi} ({d.abbrevVi})
                  </option>
                ))}
              </select>
            </div>

            {/* Grades */}
            <div className="space-y-1">
              <label className="font-bold text-slate-700 dark:text-slate-300">
                Khối lớp áp dụng (phân cách bởi dấu phẩy)
              </label>
              <input
                type="text"
                value={newGrades}
                onChange={(e) => setNewGrades(e.target.value)}
                placeholder="10, 11, 12"
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-800 dark:text-white focus:outline-hidden"
              />
            </div>
          </div>

          {/* Meaning & Definition */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="space-y-1">
              <label className="font-bold text-slate-700 dark:text-slate-300">
                Nghĩa tiếng Việt chuẩn <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                value={newPrimaryMeaning}
                onChange={(e) => setNewPrimaryMeaning(e.target.value)}
                placeholder="Ví dụ: Động lượng (Vật lí)"
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-800 dark:text-white focus:outline-hidden"
              />
            </div>

            <div className="space-y-1">
              <label className="font-bold text-slate-700 dark:text-slate-300">
                Chủ đề kiến thức (Topic)
              </label>
              <input
                type="text"
                value={newTopic}
                onChange={(e) => setNewTopic(e.target.value)}
                placeholder="Ví dụ: Cơ học & Các định luật bảo toàn"
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-800 dark:text-white focus:outline-hidden"
              />
            </div>
          </div>

          {/* LaTeX Formula */}
          <div className="space-y-1 text-xs">
            <label className="font-bold text-slate-700 dark:text-slate-300">
              Công thức toán/lý/hóa (LaTeX nếu có)
            </label>
            <input
              type="text"
              value={newFormula}
              onChange={(e) => setNewFormula(e.target.value)}
              placeholder="p = mv; hoặc H2O; hoặc y = ax + b"
              className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-800 dark:text-white focus:outline-hidden font-mono"
            />
          </div>

          {/* Discipline Explanation */}
          <div className="space-y-1 text-xs">
            <label className="font-bold text-slate-700 dark:text-slate-300">
              Giải thích chuyên ngành tiếng Việt
            </label>
            <textarea
              rows={3}
              value={newDisciplineExplanation}
              onChange={(e) => setNewDisciplineExplanation(e.target.value)}
              placeholder="Giải thích chi tiết theo chương trình sách giáo khoa GDPT..."
              className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-800 dark:text-white focus:outline-hidden"
            />
          </div>

          {/* Example EN & VI */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="space-y-1">
              <label className="font-bold text-slate-700 dark:text-slate-300">
                Ví dụ tiếng Anh (Example sentence)
              </label>
              <input
                type="text"
                value={newExEn}
                onChange={(e) => setNewExEn(e.target.value)}
                placeholder="Linear momentum is conserved in an isolated system."
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-800 dark:text-white focus:outline-hidden"
              />
            </div>

            <div className="space-y-1">
              <label className="font-bold text-slate-700 dark:text-slate-300">
                Dịch ví dụ sang tiếng Việt
              </label>
              <input
                type="text"
                value={newExVi}
                onChange={(e) => setNewExVi(e.target.value)}
                placeholder="Động lượng được bảo toàn trong một hệ kín."
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-800 dark:text-white focus:outline-hidden"
              />
            </div>
          </div>

          {/* Collocations & Usage notes */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="space-y-1">
              <label className="font-bold text-slate-700 dark:text-slate-300">
                Cụm từ đi kèm (phân cách bằng dấu chấm phẩy ;)
              </label>
              <input
                type="text"
                value={newCollocations}
                onChange={(e) => setNewCollocations(e.target.value)}
                placeholder="conservation of momentum; angular momentum"
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-800 dark:text-white focus:outline-hidden"
              />
            </div>

            <div className="space-y-1">
              <label className="font-bold text-slate-700 dark:text-slate-300">
                Lưu ý sư phạm / Bẫy thi cử
              </label>
              <input
                type="text"
                value={newUsageNotes}
                onChange={(e) => setNewUsageNotes(e.target.value)}
                placeholder="Động lượng là đại lượng vectơ, cùng hướng với vận tốc."
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-800 dark:text-white focus:outline-hidden"
              />
            </div>
          </div>

          <div className="pt-3 flex justify-end">
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white font-bold text-xs cursor-pointer shadow-xs transition-colors"
            >
              Lưu thuật ngữ vào cơ sở dữ liệu
            </button>
          </div>
        </form>
      )}

      {/* Tab 3: Import & Export Excel/CSV */}
      {activeTab === 'import_export' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Import */}
          <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-xs space-y-4">
            <div className="flex items-center gap-2">
              <Upload className="w-5 h-5 text-cyan-600" />
              <h3 className="font-bold text-slate-900 dark:text-white text-base">
                Nhập từ vựng hàng loạt từ file CSV / Excel
              </h3>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              Bạn có thể tải file mẫu có cấu trúc chuẩn, điền danh sách thuật ngữ từ sách giáo khoa và tải lên để hệ thống tự động nhận diện.
            </p>

            <button
              onClick={handleDownloadSampleCsv}
              className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
            >
              <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
              Tải file mẫu (CSV Template)
            </button>

            <div className="p-4 rounded-xl border border-dashed border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900/50 text-center space-y-2">
              <Upload className="w-8 h-8 text-slate-400 mx-auto" />
              <span className="text-xs text-slate-600 dark:text-slate-300 block font-medium">
                Chọn file CSV từ máy tính của bạn
              </span>
              <label className="inline-block px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white font-bold text-xs cursor-pointer">
                Tải lên tệp CSV
                <input
                  type="file"
                  accept=".csv"
                  onChange={handleImportCsv}
                  className="hidden"
                />
              </label>
            </div>

            {importStatus && (
              <div className="p-3 bg-emerald-50 text-emerald-800 rounded-xl text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{importStatus}</span>
              </div>
            )}
          </div>

          {/* Export */}
          <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-xs space-y-4">
            <div className="flex items-center gap-2">
              <Download className="w-5 h-5 text-blue-600" />
              <h3 className="font-bold text-slate-900 dark:text-white text-base">
                Xuất & Sao lưu toàn bộ từ điển
              </h3>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              Xuất toàn bộ hệ thống từ điển ({terms.length} thuật ngữ) để chia sẻ, in ấn giáo án hoặc lưu trữ dự phòng.
            </p>

            <div className="space-y-3 pt-2">
              <button
                onClick={handleExportCsv}
                className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-900 hover:bg-slate-100 border border-slate-200 dark:border-slate-700 flex items-center justify-between text-xs font-semibold text-slate-800 dark:text-slate-200 cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
                  <span>Xuất file Excel / CSV (Dành cho bảng tính & in ấn)</span>
                </div>
                <Download className="w-4 h-4 text-slate-400" />
              </button>

              <button
                onClick={handleExportJson}
                className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-900 hover:bg-slate-100 border border-slate-200 dark:border-slate-700 flex items-center justify-between text-xs font-semibold text-slate-800 dark:text-slate-200 cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <FileCode className="w-4 h-4 text-indigo-600" />
                  <span>Xuất file JSON (Bản sao lưu cấu trúc đầy đủ)</span>
                </div>
                <Download className="w-4 h-4 text-slate-400" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: Duplicates Checker */}
      {activeTab === 'duplicates' && (
        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-700">
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white text-base flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-amber-500" />
                Kiểm tra và xử lý thuật ngữ trùng lặp
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Rà soát các từ tiếng Anh có nhiều bản ghi để hợp nhất nghĩa môn học hoặc dọn dẹp.
              </p>
            </div>
          </div>

          {duplicates.length === 0 ? (
            <div className="p-8 text-center text-slate-500 text-xs flex flex-col items-center gap-2">
              <CheckCircle2 className="w-8 h-8 text-emerald-500" />
              <p className="font-bold text-slate-700 dark:text-slate-300">
                Cơ sở dữ liệu hoàn hảo! Không có thuật ngữ nào bị trùng lặp thừa thãi.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {duplicates.map((dup, i) => (
                <div
                  key={i}
                  className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900 flex items-center justify-between"
                >
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white text-sm">
                      {dup.word} ({dup.terms.length} bản ghi)
                    </h4>
                    <p className="text-xs text-slate-600 dark:text-slate-300">
                      Nghĩa: {dup.terms.map((t) => t.primaryMeaningVi).join(' | ')}
                    </p>
                  </div>
                  <button
                    onClick={() => onSelectTerm(dup.terms[0])}
                    className="px-3 py-1.5 rounded-lg bg-white text-xs font-semibold text-slate-700 shadow-xs border border-slate-200 hover:bg-slate-50 cursor-pointer"
                  >
                    Xem & Hợp nhất
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
