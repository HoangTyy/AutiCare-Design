import React, { useState } from 'react';
import type { Child, Parent } from './familyData';
import { makeChildId, makeParentId, makeToday, makeUsername } from './familyData';

interface ParentsTabProps {
  lang: 'vi' | 'en';
  parents: Parent[];
  setParents: React.Dispatch<React.SetStateAction<Parent[]>>;
  children: Child[];
  setChildren: React.Dispatch<React.SetStateAction<Child[]>>;
}

type ModalMode = 'create' | 'edit' | 'delete' | 'view' | 'ban';

const translations = {
  vi: {
    title: 'Quan ly Phu huynh',
    searchPlaceholder: 'Tim kiem phu huynh...',
    addNew: 'Them phu huynh',
    parentId: 'Parent ID',
    username: 'Username',
    fullName: 'Full Name',
    email: 'Email',
    phoneNumber: 'Phone Number',
    job: 'Job',
    address: 'Address',
    createdAt: 'Created At',
    updatedAt: 'Updated At',
    status: 'Status',
    actions: 'Thao tac',
    childList: 'Children List',
    childId: 'Child ID',
    childName: 'Child Name',
    dateOfBirth: 'Date of Birth',
    sex: 'Sex',
    male: 'Male',
    female: 'Female',
    other: 'Other',
    active: 'Hoat dong',
    inactive: 'Tam ngung',
    banned: 'Da khoa',
    noChildren: 'Phu huynh nay chua co ho so tre dang hoat dong',
    parentHasChildPrompt: 'Already have a child profile? Add child to this parent',
    createQuickChildPrompt: 'Need to create a child quickly?',
    quickChildId: 'Child ID',
    quickChildInfo: 'Child information',
    addExistingChild: 'Add existing child',
    quickChildName: 'Quick child name',
    quickChildDob: 'Quick date of birth',
    quickChildSex: 'Quick sex',
    addAnotherChild: 'Add another child',
    removeChildDraft: 'Remove',
    noResults: 'Khong tim thay ket qua phu hop',
    createTitle: 'Them moi phu huynh',
    editTitle: 'Cap nhat phu huynh',
    deleteTitle: 'Xac nhan xoa',
    viewTitle: 'Chi tiet phu huynh',
    banTitle: 'Khoa phu huynh',
    unbanTitle: 'Mo khoa phu huynh',
    deleteConfirm: 'Ban co chac chan muon xoa phu huynh',
    banConfirm: 'Ban co chac chan muon khoa phu huynh',
    unbanConfirm: 'Ban co chac chan muon mo khoa phu huynh',
    deleteSub: 'Hanh dong nay khong the hoan tac.',
    banSub: 'Tai khoan phu huynh se khong the dang nhap sau khi bi khoa.',
    unbanSub: 'Tai khoan phu huynh se duoc kich hoat lai.',
    cancel: 'Huy bo',
    close: 'Dong',
    save: 'Luu thay doi',
    create: 'Tao moi',
    confirmDelete: 'Xac nhan xoa',
    confirmBan: 'Xac nhan khoa',
    confirmUnban: 'Xac nhan mo khoa',
    operationSuccess: 'Thao tac thanh cong!'
  },
  en: {
    title: 'Manage Parents',
    searchPlaceholder: 'Search parents...',
    addNew: 'Add Parent',
    parentId: 'Parent ID',
    username: 'Username',
    fullName: 'Full Name',
    email: 'Email',
    phoneNumber: 'Phone Number',
    job: 'Job',
    address: 'Address',
    createdAt: 'Created At',
    updatedAt: 'Updated At',
    status: 'Status',
    actions: 'Actions',
    childList: 'Children List',
    childId: 'Child ID',
    childName: 'Child Name',
    dateOfBirth: 'Date of Birth',
    sex: 'Sex',
    male: 'Male',
    female: 'Female',
    other: 'Other',
    active: 'Active',
    inactive: 'Inactive',
    banned: 'Banned',
    noChildren: 'This parent has no active child profiles',
    parentHasChildPrompt: 'Already have a child profile? Add child to this parent',
    createQuickChildPrompt: 'Need to create a child quickly?',
    quickChildId: 'Child ID',
    quickChildInfo: 'Child information',
    addExistingChild: 'Add existing child',
    quickChildName: 'Quick child name',
    quickChildDob: 'Quick date of birth',
    quickChildSex: 'Quick sex',
    addAnotherChild: 'Add another child',
    removeChildDraft: 'Remove',
    noResults: 'No matching results found',
    createTitle: 'Create New Parent',
    editTitle: 'Update Parent',
    deleteTitle: 'Confirm Delete',
    viewTitle: 'Parent Details',
    banTitle: 'Ban Parent',
    unbanTitle: 'Unban Parent',
    deleteConfirm: 'Are you sure you want to delete parent',
    banConfirm: 'Are you sure you want to ban parent',
    unbanConfirm: 'Are you sure you want to unban parent',
    deleteSub: 'This action cannot be undone.',
    banSub: 'This parent account will not be able to log in after being banned.',
    unbanSub: 'This parent account will be activated again.',
    cancel: 'Cancel',
    close: 'Close',
    save: 'Save Changes',
    create: 'Create',
    confirmDelete: 'Confirm Delete',
    confirmBan: 'Confirm Ban',
    confirmUnban: 'Confirm Unban',
    operationSuccess: 'Operation Successful!'
  }
};

const ParentsTab: React.FC<ParentsTabProps> = ({ lang, parents, setParents, children, setChildren }) => {
  const t = translations[lang];

  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<ModalMode>('create');
  const [selectedParent, setSelectedParent] = useState<Parent | null>(null);
  const [expandedChildId, setExpandedChildId] = useState<string | null>(null);
  const [showExistingChildLink, setShowExistingChildLink] = useState(false);
  const [showQuickChildCreate, setShowQuickChildCreate] = useState(false);
  const [existingChildLookupId, setExistingChildLookupId] = useState('');
  const [quickChildDraftIds, setQuickChildDraftIds] = useState<number[]>([1]);

  const openModal = (mode: ModalMode, parent: Parent | null = null) => {
    setModalMode(mode);
    setSelectedParent(parent);
    setExpandedChildId(null);
    setShowExistingChildLink(false);
    setShowQuickChildCreate(false);
    setExistingChildLookupId('');
    setQuickChildDraftIds([1]);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedParent(null);
    setExpandedChildId(null);
    setShowExistingChildLink(false);
    setShowQuickChildCreate(false);
    setExistingChildLookupId('');
    setQuickChildDraftIds([1]);
  };

  const addQuickChildDraft = () => {
    setQuickChildDraftIds((current) => [...current, Math.max(...current) + 1]);
  };

  const removeQuickChildDraft = (draftId: number) => {
    setQuickChildDraftIds((current) => (current.length === 1 ? current : current.filter((id) => id !== draftId)));
  };

  const getStatusLabel = (status?: Parent['status']) => {
    if (status === 'Active') return t.active;
    if (status === 'Banned') return t.banned;
    return t.inactive;
  };

  const getSexLabel = (sex: Child['sex']) => {
    if (sex === 'Male') return t.male;
    if (sex === 'Female') return t.female;
    return t.other;
  };

  const handleSave = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (modalMode === 'delete' && selectedParent) {
      setParents((current) => current.filter((parent) => parent.parentId !== selectedParent.parentId));
      alert(t.operationSuccess);
      closeModal();
      return;
    }

    if (modalMode === 'ban' && selectedParent) {
      setParents((current) =>
        current.map((parent) =>
          parent.parentId === selectedParent.parentId
            ? { ...parent, status: parent.status === 'Banned' ? 'Active' : 'Banned', updatedAt: makeToday() }
            : parent
        )
      );
      alert(t.operationSuccess);
      closeModal();
      return;
    }

    const formData = new FormData(event.currentTarget);
    const fullName = String(formData.get('fullName') || '').trim();
    const email = String(formData.get('email') || '').trim();
    const phoneNumber = String(formData.get('phoneNumber') || '').trim();
    const job = String(formData.get('job') || '').trim();
    const address = String(formData.get('address') || '').trim();
    const today = makeToday();

    if (modalMode === 'create') {
      setParents((current) => [
        ...current,
        {
          parentId: makeParentId(current),
          username: makeUsername(email, fullName),
          fullName,
          email,
          phoneNumber,
          job,
          address,
          createdAt: today,
          updatedAt: today,
          status: 'Active'
        }
      ]);
    }

    if (modalMode === 'edit' && selectedParent) {
      setParents((current) =>
        current.map((parent) =>
          parent.parentId === selectedParent.parentId
            ? {
                ...parent,
                fullName,
                email,
                phoneNumber,
                job,
                address,
                updatedAt: today
              }
            : parent
        )
      );

      const quickExistingChildId = String(formData.get('quickExistingChildId') || '').trim();
      if (showExistingChildLink && quickExistingChildId) {
        setChildren((current) =>
          current.map((child) =>
            child.childId.toLowerCase() === quickExistingChildId.toLowerCase()
              ? { ...child, parentId: selectedParent.parentId, updatedAt: today }
              : child
          )
        );
      }

      if (showQuickChildCreate) {
        setChildren((current) => {
          let nextChildren = [...current];

          quickChildDraftIds.forEach((draftId) => {
            const quickChildName = String(formData.get(`quickChildName-${draftId}`) || '').trim();
            const quickChildDob = String(formData.get(`quickChildDob-${draftId}`) || '').trim();
            const quickChildSex = String(formData.get(`quickChildSex-${draftId}`) || 'Male') as Child['sex'];

            if (!quickChildName || !quickChildDob) return;

            nextChildren = [
              ...nextChildren,
              {
                childId: makeChildId(nextChildren),
                childName: quickChildName,
                dateOfBirth: quickChildDob,
                sex: quickChildSex,
                parentId: selectedParent.parentId,
                status: 'Active',
                createdAt: today,
                updatedAt: today
              }
            ];
          });

          return nextChildren;
        });
      }
    }

    alert(t.operationSuccess);
    closeModal();
  };

  const filteredParents = parents.filter((parent) => {
    const term = searchTerm.toLowerCase();

    return (
      parent.status !== 'Inactive' &&
      (parent.parentId.toLowerCase().includes(term) ||
        parent.username.toLowerCase().includes(term) ||
        parent.fullName.toLowerCase().includes(term) ||
        parent.email.toLowerCase().includes(term) ||
        parent.phoneNumber.toLowerCase().includes(term) ||
        parent.job.toLowerCase().includes(term) ||
        parent.address.toLowerCase().includes(term))
    );
  });

  const selectedParentChildren = children.filter(
    (child) => child.parentId === selectedParent?.parentId && child.status !== 'Inactive'
  );
  const existingChildLookup = children.find(
    (child) => child.childId.toLowerCase() === existingChildLookupId.toLowerCase()
  );

  const renderParentChildren = () => (
    <div className="parent-children-panel">
      <div className="parent-children-header">
        <h4>{t.childList}</h4>
        <span>{selectedParentChildren.length}</span>
      </div>

      {selectedParentChildren.length === 0 ? (
        <div className="parent-children-empty">{t.noChildren}</div>
      ) : (
        <div className="parent-children-table">
          {selectedParentChildren.map((child) => {
            const isExpanded = expandedChildId === child.childId;

            return (
              <div className="parent-child-row" key={child.childId}>
                <div className="parent-child-summary">
                  <span className="id-col">{child.childId}</span>
                  <strong>{child.childName}</strong>
                  <span>{getSexLabel(child.sex)}</span>
                  <span className={`badge ${child.status.toLowerCase()}`}>{getStatusLabel(child.status)}</span>
                  <button
                    className="parent-child-expand-btn"
                    type="button"
                    aria-expanded={isExpanded}
                    onClick={() => setExpandedChildId(isExpanded ? null : child.childId)}
                  >
                    {isExpanded ? '^' : 'v'}
                  </button>
                </div>

                {isExpanded && (
                  <div className="parent-child-details">
                    <div>
                      <span>{t.childName}</span>
                      <strong>{child.childName}</strong>
                    </div>
                    <div>
                      <span>{t.dateOfBirth}</span>
                      <strong>{child.dateOfBirth}</strong>
                    </div>
                    <div>
                      <span>{t.sex}</span>
                      <strong>{getSexLabel(child.sex)}</strong>
                    </div>
                    <div>
                      <span>{t.status}</span>
                      <strong>{getStatusLabel(child.status)}</strong>
                    </div>
                    <div>
                      <span>{t.createdAt}</span>
                      <strong>{child.createdAt}</strong>
                    </div>
                    <div>
                      <span>{t.updatedAt}</span>
                      <strong>{child.updatedAt}</strong>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );

  const renderParentForm = (readOnly: boolean) => {
    const formContent = (
      <>
        <div className="modal-form modal-form-grid">
          {modalMode !== 'create' && (
            <>
              <div className="form-group">
                <label>{t.parentId}</label>
                <input type="text" defaultValue={selectedParent?.parentId || ''} disabled />
              </div>

              <div className="form-group">
                <label>{t.username}</label>
                <input type="text" defaultValue={selectedParent?.username || ''} disabled />
              </div>
            </>
          )}

          <div className="form-group">
            <label>{t.fullName}</label>
            <input
              name="fullName"
              type="text"
              defaultValue={selectedParent?.fullName || ''}
              required
              disabled={readOnly}
              spellCheck="false"
            />
          </div>

          <div className="form-group">
            <label>{t.email}</label>
            <input
              name="email"
              type="email"
              defaultValue={selectedParent?.email || ''}
              required
              disabled={readOnly}
              spellCheck="false"
            />
          </div>

          <div className="form-group">
            <label>{t.phoneNumber}</label>
            <input
              name="phoneNumber"
              type="tel"
              defaultValue={selectedParent?.phoneNumber || ''}
              disabled={readOnly}
              spellCheck="false"
            />
          </div>

          <div className="form-group">
            <label>{t.job}</label>
            <input
              name="job"
              type="text"
              defaultValue={selectedParent?.job || ''}
              disabled={readOnly}
              spellCheck="false"
            />
          </div>

          <div className="form-group form-group-full">
            <label>{t.address}</label>
            <textarea
              name="address"
              defaultValue={selectedParent?.address || ''}
              rows={3}
              disabled={readOnly}
              spellCheck="false"
            />
          </div>

          {modalMode !== 'create' && (
            <>
              <div className="form-group">
                <label>{t.createdAt}</label>
                <input type="text" defaultValue={selectedParent?.createdAt || ''} disabled />
              </div>

              <div className="form-group">
                <label>{t.updatedAt}</label>
                <input type="text" defaultValue={selectedParent?.updatedAt || ''} disabled />
              </div>
            </>
          )}
        </div>

        {modalMode === 'edit' && selectedParent && (
          <div className="parent-quick-child-panel">
            <label className="parent-quick-toggle">
              <input
                type="checkbox"
                checked={showExistingChildLink}
                onChange={(event) => setShowExistingChildLink(event.target.checked)}
              />
              {t.parentHasChildPrompt}
            </label>

            {showExistingChildLink && (
              <div className="modal-form modal-form-grid parent-quick-grid">
                <div className="form-group">
                  <label>{t.quickChildId}</label>
                  <input
                    name="quickExistingChildId"
                    type="text"
                    value={existingChildLookupId}
                    onChange={(event) => setExistingChildLookupId(event.target.value)}
                    spellCheck="false"
                  />
                </div>
                <div className="form-group">
                  <label>{t.quickChildInfo}</label>
                  <input
                    type="text"
                    value={
                      existingChildLookup
                        ? `${existingChildLookup.childName} - ${getSexLabel(existingChildLookup.sex)}`
                        : ''
                    }
                    disabled
                  />
                </div>
              </div>
            )}

            <label className="parent-quick-toggle">
              <input
                type="checkbox"
                checked={showQuickChildCreate}
                onChange={(event) => setShowQuickChildCreate(event.target.checked)}
              />
              {t.createQuickChildPrompt}
            </label>

            {showQuickChildCreate && (
              <div className="parent-quick-drafts">
                {quickChildDraftIds.map((draftId, index) => (
                  <div className="modal-form modal-form-grid parent-quick-grid" key={draftId}>
                    <div className="parent-quick-draft-title form-group-full">
                      <span>
                        {t.quickChildInfo} {index + 1}
                      </span>
                      {quickChildDraftIds.length > 1 && (
                        <button type="button" onClick={() => removeQuickChildDraft(draftId)}>
                          {t.removeChildDraft}
                        </button>
                      )}
                    </div>
                    <div className="form-group">
                      <label>{t.quickChildName}</label>
                      <input
                        name={`quickChildName-${draftId}`}
                        type="text"
                        required={showQuickChildCreate}
                        spellCheck="false"
                      />
                    </div>
                    <div className="form-group">
                      <label>{t.quickChildDob}</label>
                      <input name={`quickChildDob-${draftId}`} type="date" required={showQuickChildCreate} />
                    </div>
                    <div className="form-group form-group-full">
                      <label>{t.quickChildSex}</label>
                      <select name={`quickChildSex-${draftId}`} defaultValue="Male">
                        <option value="Male">{t.male}</option>
                        <option value="Female">{t.female}</option>
                        <option value="Other">{t.other}</option>
                      </select>
                    </div>
                  </div>
                ))}

                <button className="parent-add-child-draft-btn" type="button" onClick={addQuickChildDraft}>
                  + {t.addAnotherChild}
                </button>
              </div>
            )}
          </div>
        )}
      </>
    );

    if ((modalMode === 'view' || modalMode === 'edit') && selectedParent) {
      return (
        <div className="parent-modal-layout">
          <div className="parent-modal-main">{formContent}</div>
          <aside className="parent-modal-side">{renderParentChildren()}</aside>
        </div>
      );
    }

    return formContent;
  };

  return (
    <div className="dashboard-content-area">
      <style>{`
        .admin-modal {
          max-width: 1120px;
          width: min(1120px, 95vw);
        }

        .parent-modal-layout {
          display: grid;
          grid-template-columns: minmax(0, 1.05fr) minmax(360px, 0.95fr);
          gap: 1rem;
          align-items: start;
        }

        .parent-modal-main {
          min-width: 0;
        }

        .parent-modal-side {
          min-width: 0;
        }

        .parent-modal-side .parent-children-panel {
          margin-top: 0;
          max-height: min(560px, calc(100vh - 270px));
          overflow: auto;
        }

        .parent-modal-side .parent-children-header,
        .parent-modal-side .parent-child-summary {
          grid-template-columns: 86px minmax(0, 1fr) 64px 88px 36px;
          gap: 0.45rem;
        }

        .parent-modal-side .parent-child-summary {
          font-size: 0.78rem;
        }

        .modal-form-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 14px 18px;
        }

        .modal-form-grid .form-group {
          margin-bottom: 0;
        }

        .modal-form-grid .form-group-full {
          grid-column: 1 / -1;
        }

        .modal-form-grid input,
        .modal-form-grid select,
        .modal-form-grid textarea,
        .modal-form-grid .view-detail-text {
          width: 100%;
          box-sizing: border-box;
        }

        .parent-children-panel {
          margin-top: 1.2rem;
          padding: 1rem;
          border: 3px solid #1E293B;
          border-radius: 16px;
          background: #FFFDF5;
          box-shadow: 4px 4px 0 #1E293B;
        }

        .parent-children-header,
        .parent-child-summary {
          display: grid;
          grid-template-columns: 110px minmax(150px, 1fr) 90px 110px 42px;
          align-items: center;
          gap: 0.75rem;
        }

        .parent-children-header {
          margin-bottom: 0.75rem;
        }

        .parent-children-header h4 {
          grid-column: 1 / 3;
          margin: 0;
          font-size: 0.95rem;
          font-weight: 900;
          text-transform: uppercase;
        }

        .parent-children-header span {
          justify-self: end;
          grid-column: 5;
          width: 32px;
          height: 32px;
          display: grid;
          place-items: center;
          border: 2px solid #1E293B;
          border-radius: 999px;
          background: #FBBF24;
          font-weight: 900;
        }

        .parent-children-empty {
          padding: 1rem;
          border: 2px dashed #CBD5E1;
          border-radius: 12px;
          color: #64748B;
          font-weight: 800;
          text-align: center;
        }

        .parent-child-row {
          border: 2px solid #1E293B;
          border-radius: 12px;
          background: #FFFFFF;
          box-shadow: 3px 3px 0 #1E293B;
          overflow: hidden;
        }

        .parent-child-row + .parent-child-row {
          margin-top: 0.65rem;
        }

        .parent-child-summary {
          padding: 0.75rem;
        }

        .parent-child-expand-btn {
          width: 34px;
          height: 34px;
          border: 2px solid #1E293B;
          border-radius: 10px;
          background: #FBBF24;
          box-shadow: 2px 2px 0 #1E293B;
          cursor: pointer;
          font-weight: 900;
        }

        .parent-child-details {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 0.65rem;
          padding: 0.85rem;
          border-top: 2px solid #1E293B;
          background: #F8FAFC;
        }

        .parent-child-details div {
          display: grid;
          gap: 0.2rem;
        }

        .parent-child-details span {
          color: #64748B;
          font-size: 0.68rem;
          font-weight: 900;
          text-transform: uppercase;
        }

        .parent-child-details strong {
          color: #1E293B;
          font-size: 0.86rem;
        }

        .parent-quick-child-panel {
          display: grid;
          gap: 0.75rem;
          margin-top: 1rem;
          padding: 1rem;
          border: 3px solid #1E293B;
          border-radius: 16px;
          background: #F8FAFC;
          box-shadow: 4px 4px 0 #1E293B;
        }

        .parent-quick-toggle {
          display: flex;
          align-items: center;
          gap: 0.55rem;
          margin: 0;
          color: #1E293B;
          font-size: 0.86rem;
          font-weight: 900;
        }

        .parent-quick-toggle input,
        .parent-quick-radio-row input {
          width: auto;
        }

        .parent-quick-grid {
          margin-bottom: 0.4rem;
        }

        .parent-quick-drafts {
          display: grid;
          gap: 0.8rem;
        }

        .parent-quick-draft-title {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 0.75rem;
          margin-bottom: -0.1rem;
          color: #1E293B;
          font-size: 0.82rem;
          font-weight: 900;
          text-transform: uppercase;
        }

        .parent-quick-draft-title button,
        .parent-add-child-draft-btn {
          border: 2px solid #1E293B;
          border-radius: 10px;
          background: #FFFFFF;
          box-shadow: 2px 2px 0 #1E293B;
          color: #1E293B;
          cursor: pointer;
          font-size: 0.78rem;
          font-weight: 900;
          padding: 0.45rem 0.7rem;
        }

        .parent-add-child-draft-btn {
          justify-self: start;
          background: #DBEAFE;
        }

        .parent-quick-radio-row {
          min-height: 48px;
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 0 0.25rem;
        }

        .parent-quick-radio-row label {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          margin: 0;
          font-weight: 900;
        }

        .parent-quick-radio-row input {
          accent-color: #7C3AED;
        }

        @media (max-width: 920px) {
          .admin-modal {
            width: min(95vw, 880px);
          }

          .parent-modal-layout {
            grid-template-columns: 1fr;
          }

          .parent-modal-side .parent-children-panel {
            max-height: none;
          }
        }

        @media (max-width: 720px) {
          .modal-form-grid,
          .parent-child-details {
            grid-template-columns: 1fr;
          }

          .parent-children-header,
          .parent-child-summary {
            grid-template-columns: 1fr;
          }

          .parent-children-header h4,
          .parent-children-header span {
            grid-column: auto;
            justify-self: start;
          }
        }
      `}</style>

      <div className="table-header">
        <h2 className="table-title">{t.title}</h2>

        <div className="table-actions">
          <div className="search-bar">
            <span className="search-icon">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
                <path d="M9.5 3a6.5 6.5 0 0 1 5.17 10.44l4.45 4.44-1.24 1.24-4.44-4.45A6.5 6.5 0 1 1 9.5 3zm0 1.75a4.75 4.75 0 1 0 0 9.5 4.75 4.75 0 0 0 0-9.5z" />
              </svg>
            </span>
            <input
              type="text"
              placeholder={t.searchPlaceholder}
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
            />
          </div>

          <button className="add-btn" onClick={() => openModal('create')}>
            + {t.addNew}
          </button>
        </div>
      </div>

      <div className="data-table-wrapper">
        <table className="data-table">
          <thead>
            <tr>
              <th style={{ width: '110px' }}>{t.parentId}</th>
              <th>{t.fullName}</th>
              <th>{t.email}</th>
              <th>{t.createdAt}</th>
              <th>{t.updatedAt}</th>
              <th>{t.status}</th>
              <th style={{ textAlign: 'right', width: '130px' }}>{t.actions}</th>
            </tr>
          </thead>

          <tbody>
            {filteredParents.length > 0 ? (
              filteredParents.map((parent) => (
                <tr key={parent.parentId}>
                  <td className="id-col">{parent.parentId}</td>
                  <td className="name-col">{parent.fullName}</td>
                  <td>{parent.email}</td>
                  <td>{parent.createdAt}</td>
                  <td>{parent.updatedAt}</td>
                  <td>
                    <span className={`badge ${parent.status.toLowerCase()}`}>
                      {getStatusLabel(parent.status)}
                    </span>
                  </td>
                  <td>
                    <div className="action-btns" style={{ justifyContent: 'flex-end', display: 'flex', gap: '5px' }}>
                      <button className="view-btn-v2" title={t.viewTitle} onClick={() => openModal('view', parent)}>
                        <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                          <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
                        </svg>
                      </button>

                      <button className="edit-btn-v2" title={t.editTitle} onClick={() => openModal('edit', parent)}>
                        <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                          <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
                        </svg>
                      </button>

                      <button
                        className="ban-btn-v2"
                        title={parent.status === 'Banned' ? t.unbanTitle : t.banTitle}
                        onClick={() => openModal('ban', parent)}
                      >
                        <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                          <path d={parent.status === 'Banned' ? 'M17 8V7a5 5 0 0 0-9.58-2H10a3 3 0 0 1 5 2v1H5v13h14V8h-2z' : 'M17 8V7a5 5 0 0 0-10 0v1H5v13h14V8h-2zm-8 0V7a3 3 0 0 1 6 0v1H9z'} />
                        </svg>
                      </button>

                      <button className="delete-btn-v2" title={t.deleteTitle} onClick={() => openModal('delete', parent)}>
                        <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                          <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} style={{ textAlign: 'center', padding: '3rem', color: '#94A3B8' }}>
                  {t.noResults}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="admin-modal animate-in">
            <div className="modal-header">
              <h3>
                {modalMode === 'create' && t.createTitle}
                {modalMode === 'edit' && t.editTitle}
                {modalMode === 'delete' && t.deleteTitle}
                {modalMode === 'view' && t.viewTitle}
                {modalMode === 'ban' && (selectedParent?.status === 'Banned' ? t.unbanTitle : t.banTitle)}
              </h3>

              <button className="close-modal" onClick={closeModal}>
                X
              </button>
            </div>

            <form onSubmit={handleSave}>
              <div className="modal-body">
                {modalMode === 'delete' && (
                  <div className="delete-confirm">
                    <div className="warning-icon">
                      <svg viewBox="0 0 24 24" width="46" height="46" fill="currentColor" aria-hidden="true">
                        <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
                      </svg>
                    </div>
                    <p>
                      {t.deleteConfirm} "{selectedParent?.fullName}"?
                    </p>
                    <p className="sub-text">{t.deleteSub}</p>
                  </div>
                )}

                {modalMode === 'ban' && (
                  <div className="delete-confirm">
                    <div className="warning-icon">
                      <svg viewBox="0 0 24 24" width="46" height="46" fill="currentColor" aria-hidden="true">
                        <path
                          d={
                            selectedParent?.status === 'Banned'
                              ? 'M17 8V7a5 5 0 0 0-9.58-2H10a3 3 0 0 1 5 2v1H5v13h14V8h-2z'
                              : 'M17 8V7a5 5 0 0 0-10 0v1H5v13h14V8h-2zm-8 0V7a3 3 0 0 1 6 0v1H9z'
                          }
                        />
                      </svg>
                    </div>
                    <p>
                      {selectedParent?.status === 'Banned' ? t.unbanConfirm : t.banConfirm} "{selectedParent?.fullName}"?
                    </p>
                    <p className="sub-text">{selectedParent?.status === 'Banned' ? t.unbanSub : t.banSub}</p>
                  </div>
                )}

                {modalMode === 'view' && selectedParent && renderParentForm(true)}

                {(modalMode === 'create' || modalMode === 'edit') && renderParentForm(false)}
              </div>

              <div className="modal-footer">
                <button type="button" className="btn-secondary" onClick={closeModal}>
                  {modalMode === 'view' ? t.close : t.cancel}
                </button>

                {modalMode !== 'view' && (
                  <button type="submit" className={`btn-primary ${modalMode === 'delete' || modalMode === 'ban' ? 'btn-danger' : ''}`}>
                    {modalMode === 'delete'
                      ? t.confirmDelete
                      : modalMode === 'ban'
                        ? selectedParent?.status === 'Banned'
                          ? t.confirmUnban
                          : t.confirmBan
                        : modalMode === 'create'
                          ? t.create
                          : t.save}
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ParentsTab;
