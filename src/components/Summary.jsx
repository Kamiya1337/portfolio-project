import React from 'react';
import { Quote } from 'lucide-react';

export default function Summary() {
  return (
    <div className="max-w-4xl mx-auto animate-fade-in pb-10">
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold text-slate-900 mb-2">Tổng kết & Suy ngẫm</h2>
        <p className="text-slate-600 text-lg">Nhìn lại hành trình học tập và cam kết phát triển.</p>
      </div>

      <div className="space-y-6">
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 relative overflow-hidden">
          <Quote className="absolute top-4 right-4 text-slate-100 rotate-180" size={80} />
          <h3 className="text-xl font-bold text-blue-900 mb-4 relative z-10">Kiến thức & Kỹ năng đã đạt được</h3>
          <p className="text-slate-700 leading-relaxed relative z-10 text-justify">
            Thông qua học phần "Nhập môn Công nghệ số và Ứng dụng AI", tôi không chỉ hệ thống hóa lại được cách tổ chức dữ liệu khoa học, an toàn, mà còn bước đầu làm quen với tư duy tương tác cùng Trí tuệ Nhân tạo. Kỹ năng Prompt Engineering và việc áp dụng AI vào quy trình làm việc/học tập nhóm (như sử dụng công cụ quản lý dự án trực tuyến, tạo nội dung tự động) đã giúp tôi tiết kiệm đáng kể thời gian và nâng cao hiệu suất.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white p-8 rounded-2xl shadow-sm border-t-4 border-amber-400 border-x border-b border-x-slate-200 border-b-slate-200">
            <h3 className="text-lg font-bold text-slate-800 mb-3">Khó khăn gặp phải</h3>
            <p className="text-slate-600 text-sm leading-relaxed text-justify">
              Quá trình xây dựng chiếc portfolio này gặp rào cản lớn về việc tổng hợp và thiết kế lại các minh chứng rải rác từ đầu kỳ. Bên cạnh đó, việc chọn lọc công cụ AI phù hợp (giữa quá nhiều công cụ mới ra mắt) để hoàn thành các tác vụ đặc thù cũng đòi hỏi nhiều thời gian thử nghiệm.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-sm border-t-4 border-green-500 border-x border-b border-x-slate-200 border-b-slate-200">
            <h3 className="text-lg font-bold text-slate-800 mb-3">Kế hoạch hoàn thiện</h3>
            <p className="text-slate-600 text-sm leading-relaxed text-justify">
              Mục tiêu tiếp theo là thu thập đầy đủ ảnh chụp màn hình (screenshot) và xuất file PDF các báo cáo của 7 bài tập để gắn link thực tế thay thế cho trạng thái "Sẽ cập nhật sau", đảm bảo Portfolio sẵn sàng 100% trước khi nộp cho giảng viên.
            </p>
          </div>
        </div>

        <div className="bg-slate-900 text-white p-8 rounded-2xl shadow-lg mt-8 text-center">
          <h3 className="text-xl font-bold text-blue-400 mb-3">Cam kết Liêm chính Học thuật</h3>
          <p className="text-slate-300 text-sm leading-relaxed max-w-2xl mx-auto italic">
            "Tôi, Vũ Hoàng Long, cam đoan các nội dung, sản phẩm học tập và minh chứng trình bày trong Portfolio này là kết quả học tập và nghiên cứu của chính bản thân. Các công cụ AI được sử dụng hoàn toàn minh bạch như những trợ lý hỗ trợ tối ưu hiệu suất, không vi phạm các nguyên tắc về đạo văn hay liêm chính học thuật của Đại học Quốc gia Hà Nội."
          </p>
        </div>
      </div>
    </div>
  );
}