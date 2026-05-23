import React from 'react';

interface InvoicesTabProps {
  lang: 'vi' | 'en';
}

const translations = {
  vi: {
    title: "Lịch sử Hóa đơn & Thanh toán",
    subtitle: "Theo dõi và tải về các hóa đơn, biên lai thanh toán các gói can thiệp và dịch vụ chẩn đoán",
    invoiceId: "Mã hóa đơn",
    date: "Ngày thanh toán",
    amount: "Số tiền",
    service: "Dịch vụ",
    status: "Trạng thái",
    method: "Phương thức",
    action: "Thao tác",
    paid: "Đã thanh toán",
    unpaid: "Chưa thanh toán",
    download: "Tải PDF 💾",
    viewDetail: "Xem chi tiết 🔍",
    noData: "Không có hóa đơn nào được tìm thấy.",
    totalSpent: "Tổng chi tiêu can thiệp:"
  },
  en: {
    title: "Invoices & Payment History",
    subtitle: "Track and download invoices and receipts for intervention packages and diagnostic services",
    invoiceId: "Invoice ID",
    date: "Payment Date",
    amount: "Amount",
    service: "Service",
    status: "Status",
    method: "Method",
    action: "Action",
    paid: "Paid",
    unpaid: "Unpaid",
    download: "Download PDF 💾",
    viewDetail: "View Details 🔍",
    noData: "No invoices found.",
    totalSpent: "Total Intervention Spent:"
  }
};

const MOCK_INVOICES = [
  {
    id: "INV-2026-001",
    date: "2026-05-15",
    amount: 3500000,
    serviceVi: "Đánh giá chẩn đoán phổ tự kỷ lâm sàng chuyên sâu (CLIN-ADOS-2)",
    serviceEn: "Comprehensive Clinical Autism Assessment (CLIN-ADOS-2)",
    status: "paid",
    methodVi: "Chuyển khoản Ngân hàng (VNPAY)",
    methodEn: "Bank Transfer (VNPAY)"
  },
  {
    id: "INV-2026-002",
    date: "2026-05-02",
    amount: 6000000,
    serviceVi: "Gói Trị liệu Hành vi ABA Sớm cho trẻ tự kỷ - Khóa tháng 5 (24 buổi)",
    serviceEn: "Early ABA Behavioral Therapy Package - May Course (24 sessions)",
    status: "paid",
    methodVi: "Thẻ Tín dụng (Visa/Mastercard)",
    methodEn: "Credit Card (Visa/Mastercard)"
  },
  {
    id: "INV-2026-003",
    date: "2026-04-10",
    amount: 1500000,
    serviceVi: "Buổi tư vấn tâm lý phụ huynh và định hướng can thiệp sớm cùng chuyên gia",
    serviceEn: "Parent Psychological Counseling & Intervention Orientation with Specialist",
    status: "paid",
    methodVi: "Chuyển khoản Ngân hàng (VNPAY)",
    methodEn: "Bank Transfer (VNPAY)"
  },
  {
    id: "INV-2026-004",
    date: "2026-06-01",
    amount: 6200000,
    serviceVi: "Gói Trị liệu Hành vi ABA Sớm cho trẻ tự kỷ - Khóa học hè tháng 6",
    serviceEn: "Early ABA Behavioral Therapy Package - June Summer Course",
    status: "unpaid",
    methodVi: "Chờ thanh toán",
    methodEn: "Pending Payment"
  }
];

const InvoicesTab: React.FC<InvoicesTabProps> = ({ lang }) => {
  const t = translations[lang];

  const formatCurrency = (value: number) => {
    if (lang === 'vi') {
      return value.toLocaleString('vi-VN') + " đ";
    }
    return "$" + (value / 25000).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  const totalSpent = MOCK_INVOICES
    .filter(inv => inv.status === 'paid')
    .reduce((sum, inv) => sum + inv.amount, 0);

  return (
    <div className="profile-tab-content">
      <div className="tab-section-header">
        <h2 className="tab-section-title">🧾 {t.title}</h2>
        <p className="tab-section-subtitle">{t.subtitle}</p>
      </div>

      {/* Statistical Card */}
      <div className="invoice-stats-board">
        <div className="invoice-stat-card">
          <span className="invoice-stat-label">✨ {t.totalSpent}</span>
          <span className="invoice-stat-value">{formatCurrency(totalSpent)}</span>
        </div>
      </div>

      {/* Invoice List */}
      <div className="invoice-sticker-grid">
        {MOCK_INVOICES.map((invoice, idx) => (
          <div 
            key={invoice.id} 
            className="profile-sticker-card invoice-card"
            style={{ 
              animationDelay: `${idx * 80}ms`,
              transform: `rotate(${(idx % 2 === 0 ? 0.3 : -0.3)}deg)` 
            }}
          >
            <div className="invoice-card-header">
              <span className="invoice-card-code">{invoice.id}</span>
              <span className={`invoice-card-badge ${invoice.status === 'paid' ? 'status-paid' : 'status-unpaid'}`}>
                {invoice.status === 'paid' ? t.paid : t.unpaid}
              </span>
            </div>
            
            <div className="invoice-card-body">
              <h4 className="invoice-card-service">
                {lang === 'vi' ? invoice.serviceVi : invoice.serviceEn}
              </h4>
              
              <div className="invoice-card-details">
                <div className="invoice-detail-row">
                  <span className="invoice-detail-label">{t.date}:</span>
                  <span className="invoice-detail-value">{invoice.date}</span>
                </div>
                <div className="invoice-detail-row">
                  <span className="invoice-detail-label">{t.method}:</span>
                  <span className="invoice-detail-value">
                    {lang === 'vi' ? invoice.methodVi : invoice.methodEn}
                  </span>
                </div>
                <div className="invoice-detail-row invoice-detail-amount">
                  <span className="invoice-detail-label">{t.amount}:</span>
                  <span className="invoice-detail-value">{formatCurrency(invoice.amount)}</span>
                </div>
              </div>
            </div>

            <div className="invoice-card-footer">
              <button 
                type="button" 
                className="profile-page-btn-secondary invoice-action-btn"
                onClick={() => alert(lang === 'vi' ? 'Hiển thị chi tiết hóa đơn ' + invoice.id : 'Showing detail for ' + invoice.id)}
              >
                {t.viewDetail}
              </button>
              {invoice.status === 'paid' && (
                <button 
                  type="button" 
                  className="profile-page-btn-primary invoice-action-btn"
                  onClick={() => alert(lang === 'vi' ? 'Bắt đầu tải hóa đơn PDF ' + invoice.id : 'Downloading PDF for ' + invoice.id)}
                >
                  {t.download}
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InvoicesTab;
