import React, { useState } from 'react';
import { portfolioData } from '../data/portfolioData';
import { ChevronRight, ArrowLeft, FileText, Image as ImageIcon, BookOpen, X, ExternalLink } from 'lucide-react';

export default function ProjectsTab() {
  const [selectedProject, setSelectedProject] = useState(null);
  const { projects } = portfolioData;

  // THÊM MỚI: State quản lý việc hiển thị Pop-up xem trước file
  const [previewData, setPreviewData] = useState({ isOpen: false, url: '', type: '' });

  // THÊM MỚI: Hàm mở và đóng Pop-up Modal
  const openPreview = (e, url, type) => {
    e.preventDefault();
    setPreviewData({ isOpen: true, url, type });
  };

  const closePreview = () => {
    setPreviewData({ isOpen: false, url: '', type: '' });
  };

  if (selectedProject) {
    return (
      <div className="max-w-4xl mx-auto animate-fade-in pb-10 relative">
        
        {/* KHỐI POP-UP (MODAL) HIỂN THỊ TRỰC TIẾP TRÊN WEB */}
        {previewData.isOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/80 backdrop-blur-sm p-4 md:p-10 animate-fade-in print:hidden">
            <div className="bg-white w-full max-w-5xl h-full max-h-[90vh] rounded-2xl flex flex-col overflow-hidden shadow-2xl border border-slate-200">
              {/* Header Pop-up */}
              <div className="flex justify-between items-center p-4 border-b border-slate-200 bg-slate-50">
                <h3 className="font-bold text-slate-800">
                  {previewData.type === 'pdf' ? 'Trình xem PDF (Báo cáo)' : 'Trình xem Hình ảnh (Screenshot)'}
                </h3>
                <div className="flex items-center gap-4">
                  <a href={previewData.url} target="_blank" rel="noreferrer" className="text-sm text-blue-600 hover:underline font-medium">
                    Mở thẻ mới
                  </a>
                  <button onClick={closePreview} className="p-1.5 bg-slate-200 hover:bg-rose-500 hover:text-white text-slate-700 rounded-lg transition-colors">
                    <X size={20} />
                  </button>
                </div>
              </div>
              
              {/* Nội dung nhúng file */}
              <div className="flex-1 bg-slate-200 flex justify-center items-center overflow-auto p-4">
                {previewData.type === 'pdf' ? (
                  <iframe 
                    src={previewData.url} 
                    title="PDF Preview" 
                    className="w-full h-full rounded shadow-sm border-none bg-white"
                  />
                ) : (
                  <img 
                    src={previewData.url} 
                    alt="Minh chứng" 
                    className="max-w-full max-h-full object-contain rounded shadow-sm bg-white"
                  />
                )}
              </div>
            </div>
          </div>
        )}

        {/* Nút quay lại */}
        <button 
          onClick={() => setSelectedProject(null)}
          className="flex items-center gap-2 text-slate-500 hover:text-blue-600 mb-6 font-medium bg-white px-4 py-2 rounded-lg shadow-sm border border-slate-200 w-fit transition-colors"
        >
          <ArrowLeft size={18} /> Quay lại danh sách
        </button>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          {/* Detail Header - Giao diện Dark Theme chuyên nghiệp */}
          <div className="bg-slate-900 p-8 text-white relative overflow-hidden">
            
            {/* Lớp z-0: Hoa văn khắc chìm (Watermark VNU - UET) */}
            <div className="absolute top-0 right-0 w-96 h-96 opacity-10 scale-125 translate-x-1/4 -translate-y-1/4 z-0 pointer-events-none text-slate-300">
              <svg viewBox="0 0 500 500" className="w-full h-full" fill="none" stroke="currentColor">
                {/* Vòng tròn đồng tâm */}
                <circle cx="250" cy="250" r="240" strokeWidth="4" strokeDasharray="12 12" opacity="0.4" />
                <circle cx="250" cy="250" r="220" strokeWidth="1.5" opacity="0.5" />
                <circle cx="250" cy="250" r="200" strokeWidth="8" opacity="0.7" />
                
                {/* Tia sáng lan tỏa */}
                <g strokeWidth="2" opacity="0.3">
                  <path d="M250 10 V 50 M490 250 H 450 M250 490 V 450 M10 250 H 50" />
                  <path d="M80 80 L 110 110 M420 80 L 390 110 M420 420 L 390 390 M80 420 L 110 390" />
                </g>

                {/* Khung lục giác công nghệ lõi */}
                <polygon points="250,90 388,170 388,330 250,410 112,330 112,170" strokeWidth="2.5" opacity="0.5" />
                
                {/* Gợn sóng tri thức */}
                <path d="M130 280 Q 190 240 250 280 T 370 280" strokeWidth="3.5" opacity="0.8"/>
                <path d="M150 310 Q 200 280 250 310 T 350 310" strokeWidth="2" opacity="0.6"/>
                
                {/* Cuốn sách mở & Mạng lưới node (Computer Engineering) */}
                <path d="M250 270 V 160 M250 160 L 160 130 V 240 L 250 270 Z" strokeWidth="2.5" opacity="0.9"/>
                <path d="M250 160 L 340 130 V 240 L 250 270 Z" strokeWidth="2.5" opacity="0.9"/>
                <circle cx="250" cy="160" r="8" fill="currentColor" opacity="0.9"/>
                <circle cx="160" cy="130" r="5" fill="currentColor" opacity="0.7"/>
                <circle cx="340" cy="130" r="5" fill="currentColor" opacity="0.7"/>
                <circle cx="250" cy="270" r="10" fill="currentColor" opacity="1"/>
              </svg>
            </div>

            {/* Lớp z-10: Nội dung hiển thị nổi lên trên */}
            <div className="relative z-10">
              <span className="px-3 py-1 bg-blue-500/30 text-blue-200 text-xs font-bold rounded uppercase tracking-wider mb-4 inline-block backdrop-blur-sm border border-blue-400/20">
                {selectedProject.chapter}
              </span>
              <h2 className="text-3xl font-bold mb-3 leading-tight drop-shadow-md">{selectedProject.title}</h2>
              <p className="text-slate-300 text-lg max-w-3xl drop-shadow">{selectedProject.shortDesc}</p>
            </div>
          </div>

          {/* Detail Body */}
          <div className="p-8 space-y-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-bold text-slate-800 mb-3 flex items-center gap-2">
                  <div className="w-2 h-6 bg-blue-500 rounded-full"></div>
                  Mục tiêu nhiệm vụ
                </h3>
                <p className="text-slate-600 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-100">
                  {selectedProject.target}
                </p>
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-800 mb-3 flex items-center gap-2">
                  <div className="w-2 h-6 bg-green-500 rounded-full"></div>
                  Kỹ năng áp dụng
                </h3>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.skills?.map((skill, idx) => (
                    <span key={idx} className="px-3 py-1.5 bg-slate-100 text-slate-700 text-sm font-medium rounded-lg border border-slate-200">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-bold text-slate-800 mb-3 border-b pb-2">Quá trình thực hiện</h3>
              <p className="text-slate-700 leading-relaxed text-justify">
                {selectedProject.process}
              </p>
            </div>

            {/* Evidence Section - ĐÃ ĐỒNG BỘ POP-UP & CÓ LẠI LINK DRIVE */}
            <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
              <h3 className="text-lg font-bold text-slate-800 mb-4">Sản phẩm & Minh chứng</h3>
              
              {/* Sửa md:grid-cols-2 thành grid-cols-1 md:grid-cols-3 */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                
                {/* 1. Khối Báo cáo */}
                <div className="bg-white p-4 rounded-lg border-2 border-dashed border-slate-300 flex flex-col items-center justify-center text-center gap-2 h-40 hover:border-blue-400 transition-colors">
                  <FileText className="text-slate-400" size={32} />
                  <span className="text-sm font-medium text-slate-600">Báo cáo (PDF/Word)</span>
                  
                  {selectedProject.report === "Sẽ cập nhật sau" || !selectedProject.report ? (
                    <span className="text-xs font-bold px-3 py-1.5 bg-amber-100 text-amber-700 rounded-md mt-1">Sẽ cập nhật sau</span>
                  ) : selectedProject.report === "Không yêu cầu" ? (
                    <span className="text-xs font-bold px-3 py-1.5 bg-gray-200 text-gray-600 rounded-md mt-1">Không yêu cầu</span>
                  ) : (
                    <a 
                      href={selectedProject.report} 
                      onClick={(e) => openPreview(e, selectedProject.report, 'pdf')}
                      className="px-4 py-2 bg-blue-600 text-white text-sm font-bold rounded hover:bg-blue-700 transition-colors mt-1 shadow-md hover:shadow-lg"
                    >
                      Xem Báo cáo
                    </a>
                  )}
                </div>

                {/* 2. Khối Hình ảnh */}
                <div className="bg-white p-4 rounded-lg border-2 border-dashed border-slate-300 flex flex-col items-center justify-center text-center gap-2 h-40 hover:border-blue-400 transition-colors">
                  <ImageIcon className="text-slate-400" size={32} />
                  <span className="text-sm font-medium text-slate-600">Ảnh chụp màn hình</span>
                  
                  {selectedProject.evidenceImg === "Sẽ cập nhật sau" || !selectedProject.evidenceImg ? (
                    <span className="text-xs font-bold px-3 py-1.5 bg-amber-100 text-amber-700 rounded-md mt-1">Sẽ cập nhật sau</span>
                  ) : selectedProject.evidenceImg === "Không yêu cầu" ? (
                    <span className="text-xs font-bold px-3 py-1.5 bg-gray-200 text-gray-600 rounded-md mt-1">Không yêu cầu</span>
                  ) : (
                    <a 
                      href={selectedProject.evidenceImg} 
                      onClick={(e) => openPreview(e, selectedProject.evidenceImg, 'img')}
                      className="px-4 py-2 bg-green-600 text-white text-sm font-bold rounded hover:bg-green-700 transition-colors mt-1 shadow-md hover:shadow-lg"
                    >
                      Xem Hình ảnh
                    </a>
                  )}
                </div>

                {/* 3. Khối Link Sản phẩm / Google Drive */}
                <div className="bg-white p-4 rounded-lg border-2 border-dashed border-slate-300 flex flex-col items-center justify-center text-center gap-2 h-40 hover:border-blue-400 transition-colors">
                  <ExternalLink className="text-slate-400" size={32} />
                  <span className="text-sm font-medium text-slate-600">Tài nguyên Google Drive</span>
                  
                  {selectedProject.driveLink === "Sẽ cập nhật sau" || !selectedProject.driveLink ? (
                    <span className="text-xs font-bold px-3 py-1.5 bg-amber-100 text-amber-700 rounded-md mt-1">Sẽ cập nhật sau</span>
                  ) : (
                    <a 
                      href={selectedProject.driveLink} 
                      target="_blank" 
                      rel="noreferrer" 
                      className="px-4 py-2 bg-amber-600 text-white text-sm font-bold rounded hover:bg-amber-700 transition-colors mt-1 shadow-md hover:shadow-lg"
                    >
                      Mở Google Drive
                    </a>
                  )}
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Grid View
  return (
    <div className="max-w-6xl mx-auto pb-10 animate-fade-in">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-slate-900 mb-2">Các bài tập thành phần</h2>
        <p className="text-slate-600 text-lg">Danh sách các bài học trọng tâm từ Chương 1 đến Chương 6.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <div key={project.id} className="bg-white rounded-2xl shadow-sm border border-slate-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col overflow-hidden">
            <div className="p-6 flex-1">
              <div className="flex justify-between items-start mb-4">
                <span className="px-2.5 py-1 bg-blue-50 text-blue-700 text-xs font-bold rounded uppercase tracking-wide border border-blue-100">
                  {project.chapter}
                </span>
                <span className="px-2 py-1 bg-amber-50 text-amber-600 text-xs font-semibold rounded border border-amber-100 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-pulse"></span>
                  Đang HT
                </span>
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-2 line-clamp-2">{project.title}</h3>
              <p className="text-slate-500 text-sm mb-4 line-clamp-3">{project.shortDesc}</p>
              
              <div className="flex flex-wrap gap-1.5 mt-auto">
                {project.skills?.slice(0, 2).map((skill, idx) => (
                  <span key={idx} className="text-[11px] font-medium px-2 py-1 bg-slate-100 text-slate-600 rounded">
                    {skill}
                  </span>
                ))}
                {project.skills?.length > 2 && <span className="text-[11px] font-medium px-2 py-1 bg-slate-100 text-slate-600 rounded">+{project.skills.length - 2}</span>}
              </div>
            </div>
            
            <button 
              onClick={() => setSelectedProject(project)}
              className="w-full py-4 bg-slate-50 text-blue-600 font-semibold border-t border-slate-100 hover:bg-blue-600 hover:text-white transition-colors flex justify-center items-center gap-2 group"
            >
              Xem chi tiết báo cáo <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}