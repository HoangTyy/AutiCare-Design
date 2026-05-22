import React, { useState } from 'react';

export interface Invoice {
  invoice_id: number;
  parent_id: string;
  service_package_name?: string;
  final_amount: number;
  status: 'Pending' | 'Paid' | 'Overdue';
  created_at: string;
}

const MOCK_PARENT_INVOICES: Invoice[] = [
  { invoice_id: 10001, parent_id: 'Auticare Admin', service_package_name: 'Gói Can thiệp 3 tháng (PECS)', final_amount: 15000000, status: 'Paid', created_at: '2026-05-10T10:00:00' },
  { invoice_id: 10002, parent_id: 'Auticare Admin', service_package_name: 'Khám sàng lọc ASQ-3', final_amount: 500000, status: 'Pending', created_at: '2026-05-20T14:30:00' },
];

interface ParentInvoicesModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: 'vi' | 'en';
  justBooked?: boolean;
}

const ParentInvoicesModal: React.FC<ParentInvoicesModalProps> = ({ isOpen, onClose, lang, justBooked }) => {
  const [invoices, setInvoices] = useState<Invoice[]>(MOCK_PARENT_INVOICES);
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [isProcessingPay, setIsProcessingPay] = useState(false);

  React.useEffect(() => {
    if (isOpen && justBooked) {
      // Simulate automatically creating an invoice for the newly booked appointment
      const newInvoice: Invoice = {
        invoice_id: 10003,
        parent_id: 'Auticare Admin',
        service_package_name: 'Lịch hẹn Tư vấn Chuyên gia',
        final_amount: 350000,
        status: 'Pending',
        created_at: new Date().toISOString()
      };
      
      const exists = invoices.find(i => i.invoice_id === 10003);
      if (!exists) {
        setInvoices([newInvoice, ...invoices]);
        setSelectedInvoice(newInvoice);
      }
    }
  }, [isOpen, justBooked]);

  if (!isOpen) return null;

  const t = {
    vi: {
      myInvoices: 'Hóa đơn của tôi',
      id: 'Mã HĐ',
      service: 'Dịch vụ / Gói',
      amount: 'Tổng tiền',
      status: 'Trạng thái',
      date: 'Ngày tạo',
      payNow: 'Thanh toán ngay',
      viewDetails: 'Xem chi tiết',
      checkoutTitle: 'Thanh toán Hóa đơn',
      checkoutSub: 'Vui lòng quét mã QR để thanh toán qua PayOS',
      confirmPay: 'Xác nhận đã chuyển khoản',
      processing: 'Đang xử lý...',
      bankName: 'Ngân hàng',
      accountName: 'Chủ tài khoản',
      accountNum: 'Số tài khoản',
      content: 'Nội dung CK'
    },
    en: {
      myInvoices: 'My Invoices',
      id: 'Invoice ID',
      service: 'Service Package',
      amount: 'Amount',
      status: 'Status',
      date: 'Created Date',
      payNow: 'Pay Now',
      viewDetails: 'View Details',
      checkoutTitle: 'Checkout Invoice',
      checkoutSub: 'Please scan the QR code to pay via PayOS',
      confirmPay: 'I have transferred',
      processing: 'Processing...',
      bankName: 'Bank',
      accountName: 'Account Name',
      accountNum: 'Account Number',
      content: 'Transfer Content'
    }
  }[lang];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
  };

  const handleSimulatePayment = () => {
    setIsProcessingPay(true);
    setTimeout(() => {
      setIsProcessingPay(false);
      if (selectedInvoice) {
        const updatedInvoices = invoices.map(inv => {
          if (inv.invoice_id === selectedInvoice.invoice_id) {
            return { ...inv, status: 'Paid' as const };
          }
          return inv;
        });
        setInvoices(updatedInvoices);
        setSelectedInvoice(null);
      }
    }, 2000);
  };

  return (
    <div className="modal-overlay">
      {!selectedInvoice ? (
        <div className="admin-modal animate-in" style={{ maxWidth: '800px', backgroundColor: '#F8FAFC' }}>
          <div className="modal-header">
            <h3 style={{ fontSize: '1.5rem', fontWeight: 800 }}>🧾 {t.myInvoices}</h3>
            <button className="close-modal" onClick={onClose}>×</button>
          </div>
          <div className="modal-body" style={{ padding: '1.5rem' }}>
            <div className="data-table-wrapper" style={{ margin: 0 }}>
              <table className="data-table">
                <thead>
                  <tr>
                    <th>{t.id}</th>
                    <th>{t.service}</th>
                    <th>{t.amount}</th>
                    <th>{t.status}</th>
                    <th>{t.date}</th>
                    <th style={{ textAlign: 'right' }}>Thao tác</th>
                  </tr>
                </thead>
                <tbody>
                  {invoices.map(inv => (
                    <tr key={inv.invoice_id}>
                      <td className="font-mono text-sm">#{inv.invoice_id}</td>
                      <td style={{ fontWeight: 600 }}>{inv.service_package_name}</td>
                      <td style={{ fontWeight: 700, color: '#0F172A' }}>{formatCurrency(inv.final_amount)}</td>
                      <td>
                        <span className={`invoice-badge ${inv.status.toLowerCase()}`}>
                          {inv.status}
                        </span>
                      </td>
                      <td>{new Date(inv.created_at).toLocaleDateString()}</td>
                      <td style={{ textAlign: 'right' }}>
                        {inv.status === 'Pending' ? (
                          <button className="btn-primary" style={{ padding: '6px 16px', fontSize: '0.85rem' }} onClick={() => setSelectedInvoice(inv)}>
                            {t.payNow}
                          </button>
                        ) : (
                          <button className="btn-secondary" style={{ padding: '6px 16px', fontSize: '0.85rem' }}>
                            {t.viewDetails}
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        /* PayOS QR Modal */
        <div className="payos-modal animate-in">
          <div className="payos-header">
            <div>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 800 }}>{t.checkoutTitle}</h3>
              <p style={{ color: '#64748b', fontSize: '0.9rem' }}>{t.checkoutSub}</p>
            </div>
            <button className="close-modal" onClick={() => setSelectedInvoice(null)} style={{ position: 'relative', top: 0, right: 0 }}>×</button>
          </div>

          <div className="qr-container">
            <div className="qr-box">
              <img src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=PAYOS_DEMO_${selectedInvoice.invoice_id}`} alt="PayOS QR" style={{ width: '100%', height: '100%' }} />
              <div className="qr-scanner"></div>
            </div>
          </div>

          <div className="bank-info-card">
            <div className="bank-row">
              <span>{t.bankName}</span>
              <strong>MB Bank</strong>
            </div>
            <div className="bank-row">
              <span>{t.accountName}</span>
              <strong>CTY TNHH AUTICARE</strong>
            </div>
            <div className="bank-row">
              <span>{t.accountNum}</span>
              <strong className="font-mono text-sm" style={{ fontSize: '1.1rem' }}>999988887777</strong>
            </div>
            <div className="bank-row">
              <span>{t.amount}</span>
              <strong style={{ color: '#0084FF', fontSize: '1.2rem' }}>{formatCurrency(selectedInvoice.final_amount)}</strong>
            </div>
            <div className="bank-row" style={{ borderTop: '1px dashed #CBD5E1', paddingTop: '0.5rem', marginTop: '0.5rem' }}>
              <span>{t.content}</span>
              <strong className="font-mono text-sm">AUTICARE {selectedInvoice.invoice_id}</strong>
            </div>
          </div>

          <button 
            className={`btn-primary w-full ${isProcessingPay ? 'loading' : ''}`} 
            style={{ marginTop: '1.5rem', padding: '1rem', fontSize: '1.05rem' }}
            onClick={handleSimulatePayment}
            disabled={isProcessingPay}
          >
            {isProcessingPay ? t.processing : t.confirmPay}
          </button>
        </div>
      )}
    </div>
  );
};

export default ParentInvoicesModal;
