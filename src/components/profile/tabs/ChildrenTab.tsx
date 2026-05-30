import React, { useState } from 'react';
import ChildDetailView from './ChildDetailView';

interface ChildrenTabProps {
  lang: 'vi' | 'en';
}

type ChildSex = 'Male' | 'Female' | 'Other';
type ChildStatus = 'Active' | 'Inactive' | 'Banned';
type ModalMode = 'create' | 'edit' | 'delete';

interface HomepageChild {
  childId: string;
  childName: string;
  dateOfBirth: string;
  sex: ChildSex;
  status: ChildStatus;
  parentId: string;
  parentName: string;
  address: string;
  parentJob: string;
  createdAt: string;
  updatedAt: string;
  id: string;
  name: string;
  dob: string;
  gender: string;
  avatar: string;
  level: string;
  lastAssessed: string;
}

const translations = {
  vi: {
    title: 'Ho so tre em',
    subtitle: 'Danh sach ho so tre voi bo truong dong bo view list cua Manage Children',
    addBtn: 'Them ho so tre',
    childId: 'Child ID',
    childName: 'Child Name',
    dateOfBirth: 'Date of Birth',
    sex: 'Sex',
    male: 'Male',
    female: 'Female',
    other: 'Other',
    status: 'Child Status',
    active: 'Active',
    inactive: 'Inactive',
    banned: 'Banned',
    parentName: 'Parent Name',
    createdAt: 'Created At',
    updatedAt: 'Updated At',
    createTitle: 'Create New Child',
    editTitle: 'Update Child',
    deleteTitle: 'Delete Child',
    deleteConfirm: 'Are you sure you want to delete child profile',
    cancel: 'Huy',
    create: 'Create Child',
    save: 'Save Changes',
    delete: 'Delete',
    successCreate: 'Da tao ho so tre thanh cong: ',
    successUpdate: 'Da cap nhat ho so tre thanh cong: ',
    successDelete: 'Da xoa ho so tre thanh cong.',
    noData: 'Chua co ho so tre nao.',
    detailBtn: 'Ho so chi tiet',
    editBtn: 'Sua',
    deleteBtn: 'Xoa'
  },
  en: {
    title: 'Children Profiles',
    subtitle: 'Child profile list aligned with the Manage Children list view',
    addBtn: 'Add Child Profile',
    childId: 'Child ID',
    childName: 'Child Name',
    dateOfBirth: 'Date of Birth',
    sex: 'Sex',
    male: 'Male',
    female: 'Female',
    other: 'Other',
    status: 'Child Status',
    active: 'Active',
    inactive: 'Inactive',
    banned: 'Banned',
    parentName: 'Parent Name',
    createdAt: 'Created At',
    updatedAt: 'Updated At',
    createTitle: 'Create New Child',
    editTitle: 'Update Child',
    deleteTitle: 'Delete Child',
    deleteConfirm: 'Are you sure you want to delete child profile',
    cancel: 'Cancel',
    create: 'Create Child',
    save: 'Save Changes',
    delete: 'Delete',
    successCreate: 'Child profile created successfully: ',
    successUpdate: 'Child profile updated successfully: ',
    successDelete: 'Child profile deleted successfully.',
    noData: 'No child profiles found.',
    detailBtn: 'Detailed Profile',
    editBtn: 'Edit',
    deleteBtn: 'Delete'
  }
};

const DEFAULT_PARENT = {
  parentId: 'PR001',
  parentName: 'Nguyen Thi Minh Anh',
  address: 'District 1, Ho Chi Minh City',
  parentJob: 'Office staff'
};

const toDetailAlias = (
  child: Omit<HomepageChild, 'id' | 'name' | 'dob' | 'gender' | 'avatar' | 'level' | 'lastAssessed'>
): HomepageChild => ({
  ...child,
  id: child.childId,
  name: child.childName,
  dob: child.dateOfBirth,
  gender: child.sex.toLowerCase(),
  avatar: child.sex === 'Female' ? 'F' : child.sex === 'Male' ? 'M' : 'O',
  level: 'mild',
  lastAssessed: child.updatedAt
});

const INITIAL_CHILDREN: HomepageChild[] = [
  toDetailAlias({
    childId: 'CH001',
    childName: 'Nguyen Minh Khoi',
    dateOfBirth: '2020-09-14',
    sex: 'Male',
    parentId: 'PR001',
    parentName: 'Nguyen Thi Minh Anh',
    address: 'District 1, Ho Chi Minh City',
    parentJob: 'Office staff',
    status: 'Active',
    createdAt: '2026-01-15',
    updatedAt: '2026-05-18'
  }),
  toDetailAlias({
    childId: 'CH002',
    childName: 'Tran Duc Nam',
    dateOfBirth: '2019-11-21',
    sex: 'Male',
    parentId: 'PR001',
    parentName: 'Nguyen Thi Minh Anh',
    address: 'District 1, Ho Chi Minh City',
    parentJob: 'Office staff',
    status: 'Active',
    createdAt: '2026-02-21',
    updatedAt: '2026-05-16'
  })
];

const makeChildId = (children: HomepageChild[]) => {
  const maxNumber = children.reduce((max, child) => {
    const value = Number(child.childId.replace(/\D/g, ''));
    return Number.isNaN(value) ? max : Math.max(max, value);
  }, 0);

  return `CH${String(maxNumber + 1).padStart(3, '0')}`;
};

const getToday = () => new Date().toISOString().slice(0, 10);

const ChildrenTab: React.FC<ChildrenTabProps> = ({ lang }) => {
  const t = translations[lang];

  const [children, setChildren] = useState(INITIAL_CHILDREN);
  const [modalMode, setModalMode] = useState<ModalMode>('create');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedChild, setSelectedChild] = useState<HomepageChild | null>(null);
  const [childName, setChildName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [sex, setSex] = useState<ChildSex>('Male');
  const [status, setStatus] = useState<ChildStatus>('Active');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [selectedChildForDetail, setSelectedChildForDetail] = useState<HomepageChild | null>(null);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const getSexLabel = (value: ChildSex) => {
    if (value === 'Male') return t.male;
    if (value === 'Female') return t.female;
    return t.other;
  };

  const getStatusLabel = (value: ChildStatus) => {
    if (value === 'Active') return t.active;
    if (value === 'Banned') return t.banned;
    return t.inactive;
  };

  const resetForm = () => {
    setChildName('');
    setDateOfBirth('');
    setSex('Male');
    setStatus('Active');
    setSelectedChild(null);
  };

  const openCreateModal = () => {
    resetForm();
    setModalMode('create');
    setIsModalOpen(true);
  };

  const openEditModal = (child: HomepageChild) => {
    setSelectedChild(child);
    setChildName(child.childName);
    setDateOfBirth(child.dateOfBirth);
    setSex(child.sex);
    setStatus(child.status);
    setModalMode('edit');
    setIsModalOpen(true);
  };

  const openDeleteModal = (child: HomepageChild) => {
    setSelectedChild(child);
    setModalMode('delete');
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    resetForm();
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (modalMode === 'delete' && selectedChild) {
      setChildren((current) => current.filter((child) => child.childId !== selectedChild.childId));
      showToast(t.successDelete);
      closeModal();
      return;
    }

    const today = getToday();

    if (modalMode === 'edit' && selectedChild) {
      setChildren((current) =>
        current.map((child) =>
          child.childId === selectedChild.childId
            ? toDetailAlias({
                ...child,
                childName,
                dateOfBirth,
                sex,
                status,
                updatedAt: today
              })
            : child
        )
      );
      showToast(t.successUpdate + childName);
      closeModal();
      return;
    }

    const newChild = toDetailAlias({
      childId: makeChildId(children),
      childName,
      dateOfBirth,
      sex,
      parentId: DEFAULT_PARENT.parentId,
      parentName: DEFAULT_PARENT.parentName,
      address: DEFAULT_PARENT.address,
      parentJob: DEFAULT_PARENT.parentJob,
      status: 'Active',
      createdAt: today,
      updatedAt: today
    });

    setChildren((current) => [...current, newChild]);
    showToast(t.successCreate + childName);
    closeModal();
  };

  if (selectedChildForDetail) {
    return <ChildDetailView child={selectedChildForDetail} onBack={() => setSelectedChildForDetail(null)} lang={lang} />;
  }

  return (
    <div className="profile-tab-content">
      <style>{`
        .child-list-view-fields {
          display: flex;
          flex-direction: column;
          gap: 0.65rem;
          margin-top: 1rem;
        }

        .child-list-row {
          display: flex;
          justify-content: space-between;
          gap: 0.9rem;
          border-bottom: 1px solid #F1F5F9;
          padding-bottom: 0.55rem;
        }

        .child-list-row:last-child {
          border-bottom: 0;
          padding-bottom: 0;
        }

        .child-list-label {
          color: #64748B;
          font-size: 0.76rem;
          font-weight: 900;
        }

        .child-list-value {
          color: #1E293B;
          font-size: 0.86rem;
          font-weight: 900;
          text-align: right;
          overflow-wrap: anywhere;
        }

        .child-card-actions {
          display: grid;
          grid-template-columns: 1fr auto auto;
          gap: 0.45rem;
          width: 100%;
        }

        .child-mini-action {
          min-width: 42px;
          border: 2px solid #1E293B;
          border-radius: 10px;
          background: #FFFFFF;
          box-shadow: 2px 2px 0 #1E293B;
          color: #1E293B;
          cursor: pointer;
          font-size: 0.78rem;
          font-weight: 900;
          padding: 0.45rem 0.65rem;
        }

        .child-mini-action.delete {
          background: #FEE2E2;
          color: #991B1B;
        }

        .homepage-child-form-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 1rem;
        }

        .homepage-child-form-grid .full {
          grid-column: 1 / -1;
        }

        .homepage-delete-copy {
          color: #1E293B;
          font-weight: 900;
          margin: 0;
          text-align: center;
        }

        @media (max-width: 720px) {
          .homepage-child-form-grid {
            grid-template-columns: 1fr;
          }

          .homepage-child-form-grid .full {
            grid-column: auto;
          }

          .child-card-actions {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      {toastMessage && <div className="profile-toast animate-toast">{toastMessage}</div>}

      <div className="tab-section-header support-header-flex">
        <div>
          <h2 className="tab-section-title">{t.title}</h2>
          <p className="tab-section-subtitle">{t.subtitle}</p>
        </div>
        <button
          type="button"
          className="profile-page-btn-primary support-create-btn"
          onClick={(event) => {
            event.preventDefault();
            event.stopPropagation();
            openCreateModal();
          }}
        >
          {t.addBtn}
        </button>
      </div>

      <div className="children-sticker-grid">
        {children.length === 0 && <div className="profile-sticker-card">{t.noData}</div>}

        {children.map((child, index) => (
          <div
            key={child.childId}
            className="profile-sticker-card child-card"
            style={{
              animationDelay: `${index * 80}ms`,
              transform: `rotate(${index % 2 === 0 ? 0.3 : -0.3}deg)`
            }}
          >
            <div className="child-card-header">
              <span className="child-card-code">{child.childId}</span>
              <span className={`child-gender-badge gender-${child.sex.toLowerCase()}`}>
                {getSexLabel(child.sex)}
              </span>
            </div>

            <div className="child-card-body">
              <div className="child-avatar-display">{child.avatar}</div>
              <h3 className="child-card-name">{child.childName}</h3>

              <div className="child-list-view-fields">
                <div className="child-list-row">
                  <span className="child-list-label">{t.sex}</span>
                  <span className="child-list-value">{getSexLabel(child.sex)}</span>
                </div>
                <div className="child-list-row">
                  <span className="child-list-label">{t.parentName}</span>
                  <span className="child-list-value">{child.parentName}</span>
                </div>
                <div className="child-list-row">
                  <span className="child-list-label">{t.status}</span>
                  <span className="child-list-value">{getStatusLabel(child.status)}</span>
                </div>
                <div className="child-list-row">
                  <span className="child-list-label">{t.createdAt}</span>
                  <span className="child-list-value">{child.createdAt}</span>
                </div>
                <div className="child-list-row">
                  <span className="child-list-label">{t.updatedAt}</span>
                  <span className="child-list-value">{child.updatedAt}</span>
                </div>
              </div>
            </div>

            <div className="child-card-footer">
              <div className="child-card-actions">
                <button
                  type="button"
                  className="profile-page-btn-secondary child-detail-btn"
                  onClick={() => setSelectedChildForDetail(child)}
                >
                  {t.detailBtn}
                </button>
                <button type="button" className="child-mini-action" onClick={() => openEditModal(child)}>
                  {t.editBtn}
                </button>
                <button type="button" className="child-mini-action delete" onClick={() => openDeleteModal(child)}>
                  {t.deleteBtn}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="profile-modal-overlay" onClick={closeModal}>
          <div className="profile-admin-modal" onClick={(event) => event.stopPropagation()}>
            <div className="profile-modal-header child-modal-header">
              <h3 className="profile-modal-title">
                {modalMode === 'create' && t.createTitle}
                {modalMode === 'edit' && t.editTitle}
                {modalMode === 'delete' && t.deleteTitle}
              </h3>
              <button type="button" className="profile-modal-close-btn" onClick={closeModal}>
                X
              </button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="profile-modal-body homepage-child-form-grid">
                {modalMode === 'delete' ? (
                  <div className="profile-page-form-group full">
                    <p className="homepage-delete-copy">
                      {t.deleteConfirm} "{selectedChild?.childName}"?
                    </p>
                  </div>
                ) : (
                  <>
                    {modalMode === 'edit' && (
                      <div className="profile-page-form-group full">
                        <label className="profile-page-field-label">{t.childId}</label>
                        <input className="profile-page-input" type="text" value={selectedChild?.childId || ''} disabled />
                      </div>
                    )}

                    <div className="profile-page-form-group">
                      <label className="profile-page-field-label">{t.childName}</label>
                      <input
                        type="text"
                        className="profile-page-input"
                        value={childName}
                        onChange={(event) => setChildName(event.target.value)}
                        required
                        spellCheck="false"
                      />
                    </div>

                    <div className="profile-page-form-group">
                      <label className="profile-page-field-label">{t.dateOfBirth}</label>
                      <input
                        type="date"
                        className="profile-page-input"
                        value={dateOfBirth}
                        onChange={(event) => setDateOfBirth(event.target.value)}
                        required
                      />
                    </div>

                    <div className="profile-page-form-group">
                      <label className="profile-page-field-label">{t.sex}</label>
                      <select
                        className="profile-page-input filter-select"
                        value={sex}
                        onChange={(event) => setSex(event.target.value as ChildSex)}
                        style={{ background: '#F8FAFC' }}
                      >
                        <option value="Male">{t.male}</option>
                        <option value="Female">{t.female}</option>
                        <option value="Other">{t.other}</option>
                      </select>
                    </div>

                    {modalMode === 'edit' && (
                      <div className="profile-page-form-group">
                        <label className="profile-page-field-label">{t.status}</label>
                        <select
                          className="profile-page-input filter-select"
                          value={status}
                          onChange={(event) => setStatus(event.target.value as ChildStatus)}
                          style={{ background: '#F8FAFC' }}
                        >
                          <option value="Active">{t.active}</option>
                          <option value="Inactive">{t.inactive}</option>
                          <option value="Banned">{t.banned}</option>
                        </select>
                      </div>
                    )}
                  </>
                )}
              </div>
              <div className="profile-modal-footer">
                <button type="button" className="profile-page-btn-secondary" onClick={closeModal}>
                  {t.cancel}
                </button>
                <button
                  type="submit"
                  className={modalMode === 'delete' ? 'profile-page-btn-secondary child-mini-action delete' : 'profile-page-btn-primary'}
                >
                  {modalMode === 'create' && t.create}
                  {modalMode === 'edit' && t.save}
                  {modalMode === 'delete' && t.delete}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChildrenTab;
