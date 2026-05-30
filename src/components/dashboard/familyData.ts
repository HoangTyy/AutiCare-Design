export type EntityStatus = 'Active' | 'Inactive' | 'Banned';

export interface Parent {
  parentId: string;
  username: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  job: string;
  address: string;
  createdAt: string;
  updatedAt: string;
  status: EntityStatus;
}

export interface Child {
  childId: string;
  childName: string;
  dateOfBirth: string;
  sex: 'Male' | 'Female' | 'Other';
  parentId: string;
  status: EntityStatus;
  createdAt: string;
  updatedAt: string;
}

export const initialParents: Parent[] = [
  {
    parentId: 'PR001',
    username: 'minhanh_parent',
    fullName: 'Nguyen Thi Minh Anh',
    email: 'phuhuynh.minhanh@gmail.com',
    phoneNumber: '0901234567',
    job: 'Office staff',
    address: 'District 1, Ho Chi Minh City',
    createdAt: '2026-01-12',
    updatedAt: '2026-05-10',
    status: 'Active'
  },
  {
    parentId: 'PR002',
    username: 'quocbao_parent',
    fullName: 'Tran Quoc Bao',
    email: 'quocbao.parent@gmail.com',
    phoneNumber: '0912345678',
    job: 'Engineer',
    address: 'Thu Duc City, Ho Chi Minh City',
    createdAt: '2026-02-18',
    updatedAt: '2026-05-12',
    status: 'Active'
  },
  {
    parentId: 'PR003',
    username: 'lanhuong_parent',
    fullName: 'Le Lan Huong',
    email: 'lanhuong.parent@gmail.com',
    phoneNumber: '0987654321',
    job: 'Accountant',
    address: 'Cau Giay, Hanoi',
    createdAt: '2026-03-04',
    updatedAt: '2026-04-25',
    status: 'Active'
  }
];

export const initialChildren: Child[] = [
  {
    childId: 'CH001',
    childName: 'Nguyen Minh Khoi',
    dateOfBirth: '2020-09-14',
    sex: 'Male',
    parentId: 'PR001',
    status: 'Active',
    createdAt: '2026-01-15',
    updatedAt: '2026-05-18'
  },
  {
    childId: 'CH002',
    childName: 'Tran Duc Nam',
    dateOfBirth: '2019-11-21',
    sex: 'Male',
    parentId: 'PR002',
    status: 'Active',
    createdAt: '2026-02-21',
    updatedAt: '2026-05-16'
  },
  {
    childId: 'CH003',
    childName: 'Le Ngoc An',
    dateOfBirth: '2021-03-08',
    sex: 'Female',
    parentId: 'PR003',
    status: 'Inactive',
    createdAt: '2026-03-12',
    updatedAt: '2026-04-20'
  }
];

export const makeToday = () => new Date().toISOString().slice(0, 10);

export const makeParentId = (parents: Parent[]) => {
  const maxNumber = parents.reduce((max, parent) => {
    const value = Number(parent.parentId.replace(/\D/g, ''));
    return Number.isNaN(value) ? max : Math.max(max, value);
  }, 0);

  return `PR${String(maxNumber + 1).padStart(3, '0')}`;
};

export const makeChildId = (children: Child[]) => {
  const maxNumber = children.reduce((max, child) => {
    const value = Number(child.childId.replace(/\D/g, ''));
    return Number.isNaN(value) ? max : Math.max(max, value);
  }, 0);

  return `CH${String(maxNumber + 1).padStart(3, '0')}`;
};

export const makeUsername = (email: string, fullName: string) => {
  const emailName = email.split('@')[0]?.trim();
  if (emailName) return emailName.toLowerCase().replace(/[^a-z0-9._-]/g, '');

  return fullName.toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_|_$/g, '') || 'parent_user';
};
