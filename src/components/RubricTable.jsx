import React from 'react';
import { portfolioData } from '../data/portfolioData';
import { Target, CheckCircle2, RefreshCw } from 'lucide-react';

export default function RubricTable() {
  const { projects } = portfolioData;

  // TỰ ĐỘNG ĐẾM: Quét qua toàn bộ bài tập để đếm số lượng tệp thật (không phải placeholder)
  const totalMilestones = projects.length * 2; // 6 bài x 2 mục (Báo cáo + Ảnh) = 12 mục dữ liệu
  
  const completedMilestones = projects.reduce((acc, project) => {
    const reportDone = project.report !== "Sẽ cập nhật sau" && project.report !== "" && project.report !== "Không yêu cầu";
    const imgDone = project.evidenceImg !== "Sẽ cập nhật sau" && project.evidenceImg !== "" && project.evidenceImg !== "Không yêu cầu";
    return acc + (reportDone ? 1 : 0) + (imgDone ? 1 : 0);
  }, 0);

  // Công thức tính tiến độ thực tế dựa trên số lượng file thật bạn đã cung cấp
  const progressPercent = Math.round(50 + (completedMilestones / totalMilestones) * 50);

  return (
    <div className="max-w-6xl mx-auto animate-fade-in pb-10 font-sans">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-slate-900 mb-2">Tự Đánh giá theo Rubric môn học</h2>
        <p className="text-slate-600 text-lg">Hệ thống đồng bộ dữ liệu tự động theo thời gian thực dựa trên tệp minh chứng thực tế của bạn.</p>
      </div>

      {/* THANH TIẾN ĐỘ TỰ ĐỘNG ĐỒNG BỘ */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 mb-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-3">
          <div>
            <h3 className="font-bold text-slate-800 mb-1 flex items-center gap-2">
              <RefreshCw size={16} className="text-blue-600 animate-spin" style={{ animationDuration: '8s' }} />
              Portfolio Readiness Score
            </h3>
            <p className="text-sm text-slate-500">
              Trạng thái minh chứng thật: Đã tích hợp thành công <span className="font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-100">{completedMilestones} trên {totalMilestones}</span> mục dữ liệu.
            </p>
          </div>
          <span className="text-3xl font-black text-blue-600 tracking-tight">{progressPercent}%</span>
        </div>
        <div className="w-full bg-slate-100 rounded-full h-3.5 overflow-hidden border border-slate-200/50">
          <div 
            className="bg-gradient-to-r from-blue-600 to-green-500 h-full rounded-full transition-all duration-700 ease-out" 
            style={{ width: `${progressPercent}%` }}
          ></div>
        </div>
      </div>

      {/* BẢNG TRẠNG THÁI ĐỘNG CẬP NHẬT THEO FILE DATA */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-slate-900 text-white text-sm">
                <th className="p-4 font-semibold w-1/4">Tiêu chí chấm điểm</th>
                <th className="p-4 font-semibold w-1/3">Yêu cầu tiêu chuẩn Xuất sắc (8.1 - 10)</th>
                <th className="p-4 font-semibold">Hiện trạng tiêu chí</th>
                <th className="p-4 font-semibold">Hành động cần thực hiện</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-sm">
              {/* Tiêu chí cố định về giao diện */}
              <tr className="hover:bg-slate-50/50 transition-colors">
                <td className="p-4 font-bold text-slate-800 flex items-start gap-2">
                  <Target className="text-blue-500 mt-0.5 flex-shrink-0" size={16} />
                  Thiết kế và cấu trúc Portfolio
                </td>
                <td className="p-4 text-slate-600">Giao diện chuyên nghiệp, cấu trúc rõ ràng, điều hướng mượt mà, chuẩn UI/UX học thuật.</td>
                <td className="p-4">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-bold border bg-blue-50 text-blue-700 border-blue-100">
                    <CheckCircle2 size={14} className="text-blue-600" /> Hoàn thành Layout
                  </span>
                </td>
                <td className="p-4 text-slate-400 line-through italic">Đã xong</td>
              </tr>

              {/* QUÉT ĐỘNG QUA TỪNG BÀI TẬP ĐỂ TỰ SINH CHỮ VÀ MÀU SẮC */}
              {projects.map((project) => {
                const isReportDone = project.report !== "Sẽ cập nhật sau" && project.report !== "" && project.report !== "Không yêu cầu";
                const isImgDone = project.evidenceImg !== "Sẽ cập nhật sau" && project.evidenceImg !== "" && project.evidenceImg !== "Không yêu cầu";
                const isFullyDone = isReportDone && isImgDone;

                return (
                  <tr key={project.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="p-4 font-bold text-slate-800 flex items-start gap-2">
                      <Target className="text-blue-500 mt-0.5 flex-shrink-0" size={16} />
                      {project.title.split(":")[0]}: Minh chứng thực hiện
                    </td>
                    <td className="p-4 text-slate-600 text-justify leading-relaxed">Đầy đủ file văn bản báo cáo chi tiết nội dung học tập và hình ảnh screenshot thực tế.</td>
                    <td className="p-4">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-bold border ${
                        isFullyDone 
                          ? "bg-blue-50 text-blue-700 border-blue-100" 
                          : "bg-amber-50 text-amber-700 border-amber-100"
                      }`}>
                        <CheckCircle2 size={14} className={isFullyDone ? "text-blue-600" : "text-amber-600"} /> 
                        {isFullyDone ? "Đạt chuẩn Xuất sắc" : "Thiếu minh chứng"}
                      </span>
                    </td>
                    <td className={`p-4 text-xs italic font-medium ${isFullyDone ? "text-slate-400 line-through" : "text-rose-600"}`}>
                      {isFullyDone 
                        ? "Đã đồng bộ" 
                        : `Cần bổ sung: ${!isReportDone ? "File báo cáo PDF" : ""} ${!isReportDone && !isImgDone ? "&" : ""} ${!isImgDone ? "Ảnh screenshot" : ""}`
                      }
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}