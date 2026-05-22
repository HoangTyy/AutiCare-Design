import React, { useState } from 'react';

export interface Invoice {
  invoice_id: number;
  parent_id: string;
  service_package_name?: string;
  final_amount: number;
  status: 'Pending' | 'Paid' | 'Overdue';
  created_at: string;
}

const MOCK_INVOICES: Invoice[] = [
  { invoice_id: 10001, parent_id: 'P-001 (Nguyễn Văn A)', service_package_name: 'Gói Can thiệp 3 tháng (PECS)', final_amount: 15000000, status: 'Paid', created_at: '2026-05-10T10:00:00' },
  { invoice_id: 10002, parent_id: 'P-002 (Trần Thị B)', service_package_name: 'Khám sàng lọc ASQ-3', final_amount: 500000, status: 'Pending', created_at: '2026-05-20T14:30:00' },
];

interface InvoicesTabProps {
  lang: 'vi' | 'en';
}

const InvoicesTab: React.FC<InvoicesTabProps> = ({ lang }) => {
  const [invoices, setInvoices] = useState<Invoice[]>(MOCK_INVOICES);
  const [searchTerm, setSearchTerm] = useState('');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);

  const [newInvoice, setNewInvoice] = useState<Partial<Invoice>>({
    status: 'Pending',
    final_amount: 0
  });

  const t = lang === 'vi' ? {
    title: 'Quản lý Hóa đơn',
    searchPlaceholder: 'Tìm theo ID hoặc tên Phụ huynh...',
    createBtn: 'Tạo Hóa đơn mới',
    id: 'Mã HĐ',
    parent: 'Phụ huynh',
    service: 'Dịch vụ / Gói',
    amount: 'Tổng tiền (VND)',
    status: 'Trạng thái',
    date: 'Ngày tạo',
    actions: 'Thao tác',
    viewDetails: 'Xem chi tiết',
    createTitle: 'Khởi tạo Hóa đơn',
    save: 'Tạo Hóa đơn',
    cancel: 'Hủy',
    detailTitle: 'Chi tiết Hóa đơn'
  } : {
    title: 'Invoices Management',
    searchPlaceholder: 'Search by ID or Parent name...',
    createBtn: 'Create Invoice',
    id: 'Invoice ID',
    parent: 'Parent',
    service: 'Service Package',
    amount: 'Amount (VND)',
    status: 'Status',
    date: 'Created Date',
    actions: 'Actions',
    viewDetails: 'View Details',
    createTitle: 'Create New Invoice',
    save: 'Create',
    cancel: 'Cancel',
    detailTitle: 'Invoice Details'
  };

  const filteredInvoices = invoices.filter(inv => 
    inv.parent_id.toLowerCase().includes(searchTerm.toLowerCase()) || 
    inv.invoice_id.toString().includes(searchTerm)
  );

  const handleCreateInvoice = (e: React.FormEvent) => {
    e.preventDefault();
    const created: Invoice = {
      ...newInvoice as Invoice,
      invoice_id: invoices.length > 0 ? Math.max(...invoices.map(i => i.invoice_id)) + 1 : 10001,
      created_at: new Date().toISOString()
    };
    setInvoices([created, ...invoices]);
    setIsCreateModalOpen(false);
    setNewInvoice({ status: 'Pending', final_amount: 0 });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
  };

  return (
    <div className="dashboard-content-area">
      <div className="table-header" style={{ marginBottom: '1.5rem' }}>
        <h2 className="table-title">{t.title}</h2>
        <div className="table-actions" style={{ display: 'flex', gap: '1rem' }}>
          <div className="search-bar">
            <span className="search-icon">🔍</span>
            <input 
              type="text" 
              placeholder={t.searchPlaceholder} 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="add-btn" onClick={() => setIsCreateModalOpen(true)}>
            + {t.createBtn}
          </button>
        </div>
      </div>

      <div className="data-table-wrapper">
        <table className="data-table">
          <thead>
            <tr>
              <th>{t.id}</th>
              <th>{t.parent}</th>
              <th>{t.service}</th>
              <th>{t.amount}</th>
              <th>{t.status}</th>
              <th>{t.date}</th>
              <th style={{ textAlign: 'right' }}>{t.actions}</th>
            </tr>
          </thead>
          <tbody>
            {filteredInvoices.map(inv => (
              <tr key={inv.invoice_id}>
                <td className="id-col">#{inv.invoice_id}</td>
                <td style={{ fontWeight: 600 }}>{inv.parent_id}</td>
                <td>{inv.service_package_name}</td>
                <td style={{ fontWeight: 700, color: '#0F172A' }}>{formatCurrency(inv.final_amount)}</td>
                <td>
                  <span className={`invoice-badge ${inv.status.toLowerCase()}`}>
                    {inv.status}
                  </span>
                </td>
                <td>{new Date(inv.created_at).toLocaleDateString()}</td>
                <td style={{ textAlign: 'right' }}>
                  <button className="btn-secondary" style={{ padding: '4px 12px', fontSize: '0.85rem' }} onClick={() => setSelectedInvoice(inv)}>
                    {t.viewDetails}
                  </button>
                </td>
              </tr>
            ))}
            {filteredInvoices.length === 0 && (
              <tr>
                <td colSpan={7} style={{ textAlign: 'center', padding: '2rem' }}>No invoices found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {isCreateModalOpen && (
        <div className="modal-overlay">
          <div className="admin-modal animate-in" style={{ maxWidth: '500px' }}>
            <div className="modal-header">
              <h3>{t.createTitle}</h3>
              <button className="close-modal" onClick={() => setIsCreateModalOpen(false)}>×</button>
            </div>
            <form onSubmit={handleCreateInvoice}>
              <div className="modal-body">
                <div className="form-group">
                  <label>{t.parent} (ID hoặc Tên)</label>
                  <input type="text" required value={newInvoice.parent_id || ''} onChange={e => setNewInvoice({...newInvoice, parent_id: e.target.value})} placeholder="VD: P-003" />
                </div>
                <div className="form-group">
                  <label>{t.service}</label>
                  <input type="text" required value={newInvoice.service_package_name || ''} onChange={e => setNewInvoice({...newInvoice, service_package_name: e.target.value})} placeholder="Tên dịch vụ..." />
                </div>
                <div className="form-group">
                  <label>{t.amount}</label>
                  <input type="number" required value={newInvoice.final_amount || 0} onChange={e => setNewInvoice({...newInvoice, final_amount: Number(e.target.value)})} min="0" step="10000" />
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn-secondary" onClick={() => setIsCreateModalOpen(false)}>{t.cancel}</button>
                <button type="submit" className="btn-primary">{t.save}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {selectedInvoice && (
        <div className="modal-overlay">
          <div className="admin-modal receipt-modal animate-in" style={{ maxWidth: '600px', backgroundColor: '#F8FAFC' }}>
            <div className="modal-header" style={{ borderBottom: 'none' }}>
              <button className="close-modal" onClick={() => setSelectedInvoice(null)}>×</button>
            </div>
            <div className="modal-body receipt-body">
              <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <h2 style={{ fontSize: '1.75rem', fontWeight: 900, letterSpacing: '-0.5px' }}>AUTICARE RECEIPT</h2>
                <p style={{ color: '#64748B', marginTop: '0.25rem' }}>{t.id}: #{selectedInvoice.invoice_id}</p>
              </div>

              <div className="receipt-row">
                <span style={{ color: '#64748B' }}>{t.date}:</span>
                <strong>{new Date(selectedInvoice.created_at).toLocaleString()}</strong>
              </div>
              <div className="receipt-row">
                <span style={{ color: '#64748B' }}>{t.parent}:</span>
                <strong>{selectedInvoice.parent_id}</strong>
              </div>
              <div className="receipt-row">
                <span style={{ color: '#64748B' }}>{t.status}:</span>
                <span className={`invoice-badge ${selectedInvoice.status.toLowerCase()}`}>{selectedInvoice.status}</span>
              </div>

              <div className="receipt-divider"></div>

              <div className="receipt-row">
                <span>{selectedInvoice.service_package_name}</span>
                <span>{formatCurrency(selectedInvoice.final_amount)}</span>
              </div>

              <div className="receipt-divider"></div>

              <div className="receipt-row receipt-total">
                <span>TOTAL</span>
                <span style={{ color: '#0084FF' }}>{formatCurrency(selectedInvoice.final_amount)}</span>
              </div>

            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InvoicesTab;
