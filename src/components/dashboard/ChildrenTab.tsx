import React, { useState } from 'react';
import type { Child, Parent } from './familyData';
import { makeChildId, makeParentId, makeToday, makeUsername } from './familyData';

interface ChildrenTabProps {
  lang: 'vi' | 'en';
  parents: Parent[];
  setParents: React.Dispatch<React.SetStateAction<Parent[]>>;
  children: Child[];
  setChildren: React.Dispatch<React.SetStateAction<Child[]>>;
}

type ModalMode = 'create' | 'edit' | 'delete' | 'view';

const translations = {
  vi: {
    title: 'Quan ly Tre em',
    searchPlaceholder: 'Tim kiem ho so tre...',
    addNew: 'Them tre em',
    childId: 'Child ID',
    childName: 'Child Name',
    dateOfBirth: 'Date of Birth',
    sex: 'Sex',
    male: 'Male',
    female: 'Female',
    other: 'Other',
    parentId: 'Parent ID',
    parentName: 'Parent Name',
    parentJob: 'Parent Job',
    address: 'Address',
    status: 'Child Status',
    createdAt: 'Created At',
    updatedAt: 'Updated At',
    actions: 'Thao tac',
    active: 'Hoat dong',
    inactive: 'Tam ngung',
    banned: 'Da khoa',
    noParent: 'Khong tim thay parent id',
    noResults: 'Khong tim thay ket qua phu hop',
    createParentPrompt: 'No parent yet? Create now',
    createParentNow: 'Create parent',
    parentPhone: 'Phone Number',
    parentEmail: 'Email',
    parentFullName: 'Full Name',
    createTitle: 'Them moi tre em',
    editTitle: 'Cap nhat tre em',
    deleteTitle: 'Xac nhan xoa',
    viewTitle: 'Chi tiet tre em',
    deleteConfirm: 'Ban co chac chan muon xoa ho so tre',
    deleteSub: 'Hanh dong nay khong the hoan tac.',
    cancel: 'Huy bo',
    close: 'Dong',
    save: 'Luu thay doi',
    create: 'Tao moi',
    confirmDelete: 'Xac nhan xoa',
    operationSuccess: 'Thao tac thanh cong!'
  },
  en: {
    title: 'Manage Children',
    searchPlaceholder: 'Search child profiles...',
    addNew: 'Add Child',
    childId: 'Child ID',
    childName: 'Child Name',
    dateOfBirth: 'Date of Birth',
    sex: 'Sex',
    male: 'Male',
    female: 'Female',
    other: 'Other',
    parentId: 'Parent ID',
    parentName: 'Parent Name',
    parentJob: 'Parent Job',
    address: 'Address',
    status: 'Child Status',
    createdAt: 'Created At',
    updatedAt: 'Updated At',
    actions: 'Actions',
    active: 'Active',
    inactive: 'Inactive',
    banned: 'Banned',
    noParent: 'No parent found for this ID',
    noResults: 'No matching results found',
    createParentPrompt: 'No parent yet? Create now',
    createParentNow: 'Create parent',
    parentPhone: 'Phone Number',
    parentEmail: 'Email',
    parentFullName: 'Full Name',
    createTitle: 'Create New Child',
    editTitle: 'Update Child',
    deleteTitle: 'Confirm Delete',
    viewTitle: 'Child Details',
    deleteConfirm: 'Are you sure you want to delete child profile',
    deleteSub: 'This action cannot be undone.',
    cancel: 'Cancel',
    close: 'Close',
    save: 'Save Changes',
    create: 'Create Child',
    confirmDelete: 'Confirm Delete',
    operationSuccess: 'Operation Successful!'
  }
};

const ChildrenTab: React.FC<ChildrenTabProps> = ({ lang, parents, setParents, children, setChildren }) => {
  const t = translations[lang];

  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<ModalMode>('create');
  const [selectedChild, setSelectedChild] = useState<Child | null>(null);
  const [parentLookupId, setParentLookupId] = useState('');
  const [showQuickParentCreate, setShowQuickParentCreate] = useState(false);

  const openModal = (mode: ModalMode, child: Child | null = null) => {
    setModalMode(mode);
    setSelectedChild(child);
    setParentLookupId(child?.parentId || '');
    setShowQuickParentCreate(false);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedChild(null);
    setParentLookupId('');
    setShowQuickParentCreate(false);
  };

  const getStatusLabel = (status?: Child['status']) => {
    if (status === 'Active') return t.active;
    if (status === 'Banned') return t.banned;
    return t.inactive;
  };

  const getSexLabel = (sex: Child['sex']) => {
    if (sex === 'Male') return t.male;
    if (sex === 'Female') return t.female;
    return t.other;
  };
  const findParent = (parentId: string) => parents.find((parent) => parent.parentId.toLowerCase() === parentId.toLowerCase());
  const selectedParent = findParent(parentLookupId);

  const createParentFromForm = (form: HTMLFormElement) => {
    const formData = new FormData(form);
    const fullName = String(formData.get('quickParentFullName') || '').trim();
    const email = String(formData.get('quickParentEmail') || '').trim();
    const phoneNumber = String(formData.get('quickParentPhone') || '').trim();
    const job = String(formData.get('quickParentJob') || '').trim();
    const address = String(formData.get('quickParentAddress') || '').trim();

    if (!fullName || !email) return;

    const today = makeToday();
    const newParent: Parent = {
      parentId: makeParentId(parents),
      username: makeUsername(email, fullName),
      fullName,
      email,
      phoneNumber,
      job,
      address,
      createdAt: today,
      updatedAt: today,
      status: 'Active'
    };

    setParents((current) => [...current, newParent]);
    setParentLookupId(newParent.parentId);
  };

  const handleSave = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (modalMode === 'delete' && selectedChild) {
      setChildren((current) => current.filter((child) => child.childId !== selectedChild.childId));
      alert(t.operationSuccess);
      closeModal();
      return;
    }

    const formData = new FormData(event.currentTarget);
    const childName = String(formData.get('childName') || '').trim();
    const dateOfBirth = String(formData.get('dateOfBirth') || '').trim();
    const sex = String(formData.get('sex') || selectedChild?.sex || 'Male') as Child['sex'];
    const parentId = String(formData.get('parentId') || '').trim();
    const today = makeToday();

    if (modalMode === 'create') {
      setChildren((current) => [
        ...current,
        {
          childId: makeChildId(current),
          childName,
          dateOfBirth,
          sex,
          parentId,
          status: 'Active',
          createdAt: today,
          updatedAt: today
        }
      ]);
    }

    if (modalMode === 'edit' && selectedChild) {
      setChildren((current) =>
        current.map((child) =>
          child.childId === selectedChild.childId
            ? {
                ...child,
                childName,
                dateOfBirth,
                sex,
                parentId,
                updatedAt: today
              }
            : child
        )
      );
    }

    alert(t.operationSuccess);
    closeModal();
  };

  const filteredChildren = children.filter((child) => {
    const parent = findParent(child.parentId);
    const term = searchTerm.toLowerCase();

    return (
      child.status !== 'Inactive' &&
      (child.childId.toLowerCase().includes(term) ||
        child.childName.toLowerCase().includes(term) ||
        child.sex.toLowerCase().includes(term) ||
        child.parentId.toLowerCase().includes(term) ||
        parent?.fullName.toLowerCase().includes(term) ||
        false)
    );
  });

  const renderSexField = (readOnly: boolean) => {
    if (readOnly) {
      return <input type="text" value={getSexLabel(selectedChild?.sex || 'Male')} disabled />;
    }

    return (
      <select name="sex" defaultValue={selectedChild?.sex || 'Male'}>
        <option value="Male">{t.male}</option>
        <option value="Female">{t.female}</option>
        <option value="Other">{t.other}</option>
      </select>
    );
  };

  const renderQuickParentCreate = () =>
    modalMode === 'create' && (
      <div className="child-quick-parent-panel">
        <label className="child-quick-toggle">
          <input
            type="checkbox"
            checked={showQuickParentCreate}
            onChange={(event) => setShowQuickParentCreate(event.target.checked)}
          />
          {t.createParentPrompt}
        </label>

        {showQuickParentCreate && (
          <div className="modal-form modal-form-grid child-form-grid child-quick-parent-grid">
            <div className="form-group child-fullname">
              <label>{t.parentFullName}</label>
              <input name="quickParentFullName" type="text" spellCheck="false" />
            </div>
            <div className="form-group child-dob">
              <label>{t.parentEmail}</label>
              <input name="quickParentEmail" type="email" spellCheck="false" />
            </div>
            <div className="form-group child-parent-id">
              <label>{t.parentPhone}</label>
              <input name="quickParentPhone" type="tel" spellCheck="false" />
            </div>
            <div className="form-group child-parent-name">
              <label>{t.parentJob}</label>
              <input name="quickParentJob" type="text" spellCheck="false" />
            </div>
            <div className="form-group child-address">
              <label>{t.address}</label>
              <textarea name="quickParentAddress" rows={3} spellCheck="false" />
            </div>
            <div className="form-group child-parent-job child-create-parent-action">
              <button className="btn-secondary" type="button" onClick={(event) => createParentFromForm(event.currentTarget.form!)}>
                {t.createParentNow}
              </button>
            </div>
          </div>
        )}
      </div>
    );

  const renderChildForm = (readOnly: boolean) => (
    <>
      {renderQuickParentCreate()}

      <div className={`modal-form modal-form-grid child-form-grid ${modalMode === 'create' ? 'child-form-create' : 'child-form-detail'}`}>
        {modalMode !== 'create' && (
          <div className="form-group child-id">
            <label>{t.childId}</label>
            <input type="text" defaultValue={selectedChild?.childId || ''} disabled />
          </div>
        )}

        <div className="form-group child-name">
          <label>{t.childName}</label>
          <input
            name="childName"
            type="text"
            defaultValue={selectedChild?.childName || ''}
            required
            disabled={readOnly}
            spellCheck="false"
          />
        </div>

        <div className="form-group child-dob">
          <label>{t.dateOfBirth}</label>
          <input
            name="dateOfBirth"
            type="date"
            defaultValue={selectedChild?.dateOfBirth || ''}
            required
            disabled={readOnly}
          />
        </div>

        <div className="form-group child-sex">
          <label>{t.sex}</label>
          {renderSexField(readOnly)}
        </div>

        {modalMode !== 'create' && (
          <div className="form-group child-status">
            <label>{t.status}</label>
            <input type="text" defaultValue={getStatusLabel(selectedChild?.status)} disabled />
          </div>
        )}

        <div className="form-group child-parent-id">
          <label>{t.parentId}</label>
          <input
            name="parentId"
            type="text"
            value={parentLookupId}
            required
            disabled={readOnly}
            onChange={(event) => setParentLookupId(event.target.value)}
            spellCheck="false"
          />
        </div>

        <div className="form-group child-parent-name">
          <label>{t.parentName}</label>
          <input type="text" value={selectedParent?.fullName || (parentLookupId ? t.noParent : '')} disabled />
        </div>

        <div className="form-group child-address">
          <label>{t.address}</label>
          <textarea value={selectedParent?.address || ''} rows={3} disabled />
        </div>

        <div className="form-group child-parent-job">
          <label>{t.parentJob}</label>
          <input type="text" value={selectedParent?.job || ''} disabled />
        </div>

        {modalMode !== 'create' && (
          <>
            <div className="form-group child-created">
              <label>{t.createdAt}</label>
              <input type="text" defaultValue={selectedChild?.createdAt || ''} disabled />
            </div>

            <div className="form-group child-updated">
              <label>{t.updatedAt}</label>
              <input type="text" defaultValue={selectedChild?.updatedAt || ''} disabled />
            </div>
          </>
        )}
      </div>
    </>
  );

  return (
    <div className="dashboard-content-area">
      <style>{`
        .admin-modal {
          max-width: 900px;
          width: min(900px, 95vw);
        }

        .modal-form-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 14px 18px;
        }

        .modal-form-grid .form-group {
          margin-bottom: 0;
        }

        .modal-form-grid input,
        .modal-form-grid select,
        .modal-form-grid textarea {
          width: 100%;
          box-sizing: border-box;
        }

        .child-form-detail {
          grid-template-areas:
            "childId childName"
            "dob sex"
            "status status"
            "parentId parentName"
            "address address"
            "parentJob parentJob"
            "created updated";
        }

        .child-form-create {
          grid-template-areas:
            "childName dob"
            "sex sex"
            "parentId parentName"
            "parentJob parentJob"
            "address address";
        }

        .child-id { grid-area: childId; }
        .child-name { grid-area: childName; }
        .child-dob { grid-area: dob; }
        .child-sex { grid-area: sex; }
        .child-status { grid-area: status; }
        .child-parent-id { grid-area: parentId; }
        .child-parent-name { grid-area: parentName; }
        .child-address { grid-area: address; }
        .child-parent-job { grid-area: parentJob; }
        .child-created { grid-area: created; }
        .child-updated { grid-area: updated; }

        .child-radio-inline {
          min-height: 48px;
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 0 0.25rem;
        }

        .child-radio-inline label {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          margin: 0;
          font-weight: 900;
        }

        .child-radio-inline input,
        .child-quick-toggle input {
          width: auto;
          accent-color: #7C3AED;
        }

        .child-quick-parent-panel {
          margin-bottom: 1rem;
          padding: 1rem;
          border: 3px solid #1E293B;
          border-radius: 16px;
          background: #F8FAFC;
          box-shadow: 4px 4px 0 #1E293B;
        }

        .child-quick-toggle {
          display: flex;
          align-items: center;
          gap: 0.55rem;
          margin: 0;
          color: #1E293B;
          font-size: 0.86rem;
          font-weight: 900;
        }

        .child-quick-parent-grid {
          margin-top: 0.85rem;
          grid-template-areas:
            "childName dob"
            "parentId parentName"
            "address address"
            "parentJob parentJob";
        }

        .child-create-parent-action {
          align-self: end;
        }

        @media (max-width: 720px) {
          .modal-form-grid,
          .child-form-detail,
          .child-form-create,
          .child-quick-parent-grid {
            grid-template-columns: 1fr;
            grid-template-areas: none;
          }

          .child-id,
          .child-name,
          .child-dob,
          .child-sex,
          .child-status,
          .child-parent-id,
          .child-parent-name,
          .child-address,
          .child-parent-job,
          .child-created,
          .child-updated {
            grid-area: auto;
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
              <th style={{ width: '110px' }}>{t.childId}</th>
              <th>{t.childName}</th>
              <th>{t.sex}</th>
              <th>{t.parentName}</th>
              <th>{t.status}</th>
              <th>{t.createdAt}</th>
              <th>{t.updatedAt}</th>
              <th style={{ textAlign: 'right', width: '130px' }}>{t.actions}</th>
            </tr>
          </thead>

          <tbody>
            {filteredChildren.length > 0 ? (
              filteredChildren.map((child) => {
                const parent = findParent(child.parentId);

                return (
                  <tr key={child.childId}>
                    <td className="id-col">{child.childId}</td>
                    <td className="name-col">{child.childName}</td>
                    <td>{getSexLabel(child.sex)}</td>
                    <td>{parent?.fullName || child.parentId}</td>
                    <td>
                      <span className={`badge ${child.status.toLowerCase()}`}>
                        {getStatusLabel(child.status)}
                      </span>
                    </td>
                    <td>{child.createdAt}</td>
                    <td>{child.updatedAt}</td>
                    <td>
                      <div className="action-btns" style={{ justifyContent: 'flex-end', display: 'flex', gap: '5px' }}>
                        <button className="view-btn-v2" title={t.viewTitle} onClick={() => openModal('view', child)}>
                          <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                            <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
                          </svg>
                        </button>

                        <button className="edit-btn-v2" title={t.editTitle} onClick={() => openModal('edit', child)}>
                          <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                            <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
                          </svg>
                        </button>

                        <button className="delete-btn-v2" title={t.deleteTitle} onClick={() => openModal('delete', child)}>
                          <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                            <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={8} style={{ textAlign: 'center', padding: '3rem', color: '#94A3B8' }}>
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
                      {t.deleteConfirm} "{selectedChild?.childName}"?
                    </p>
                    <p className="sub-text">{t.deleteSub}</p>
                  </div>
                )}

                {modalMode === 'view' && selectedChild && renderChildForm(true)}

                {(modalMode === 'create' || modalMode === 'edit') && renderChildForm(false)}
              </div>

              <div className="modal-footer">
                <button type="button" className="btn-secondary" onClick={closeModal}>
                  {modalMode === 'view' ? t.close : t.cancel}
                </button>

                {modalMode !== 'view' && (
                  <button type="submit" className={`btn-primary ${modalMode === 'delete' ? 'btn-danger' : ''}`}>
                    {modalMode === 'delete' ? t.confirmDelete : modalMode === 'create' ? t.create : t.save}
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

export default ChildrenTab;
