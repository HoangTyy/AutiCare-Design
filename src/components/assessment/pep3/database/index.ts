import cvpData from './CVP.json';
import elData from './EL.json';
import rlData from './RL.json';
import fmData from './FM.json';
import gmData from './GM.json';
import vmiData from './VMI.json';
import aeData from './AE.json';
import srData from './SR.json';
import cmbData from './CMB.json';
import cvbData from './CVB.json';
import pbData from './PB.json';
import pscData from './PSC.json';
import abData from './AB.json';

export interface PEP3ItemSource {
  id: number; // local id in subtest JSON
  name: { vi: string; en: string };
  materials: { vi: string; en: string };
  administration: { vi: string; en: string };
  scoring: {
    vi: { "0": string; "1": string; "2": string };
    en: { "0": string; "1": string; "2": string };
  };
  adaptationGuide: { vi: string; en: string };
}

export interface PEP3Item {
  id: number; // globally generated id (1 to N)
  subtestCode: string;
  subtestName: { vi: string; en: string };
  name: { vi: string; en: string };
  materials: { vi: string; en: string };
  administration: { vi: string; en: string };
  scoring: {
    vi: { "0": string; "1": string; "2": string };
    en: { "0": string; "1": string; "2": string };
  };
  adaptationGuide: { vi: string; en: string };
}

const subtestsMeta: Record<string, { vi: string; en: string }> = {
  CVP: { vi: 'Nhận thức có lời/trước lời', en: 'Cognitive Verbal/Preverbal' },
  EL: { vi: 'Ngôn ngữ diễn đạt', en: 'Expressive Language' },
  RL: { vi: 'Tiếp thu ngôn ngữ', en: 'Receptive Language' },
  FM: { vi: 'Vận động tinh', en: 'Fine Motor' },
  GM: { vi: 'Vận động thô', en: 'Gross Motor' },
  VMI: { vi: 'Liên kết tay - mắt', en: 'Visual-Motor Imitation' },
  AE: { vi: 'Diễn đạt cảm xúc', en: 'Affective Expression' },
  SR: { vi: 'Tương tác xã hội', en: 'Social Reciprocity' },
  CMB: { vi: 'Những hành vi vận động đặc trưng', en: 'Characteristic Motor Behaviors' },
  CVB: { vi: 'Những hành vi lời nói đặc trưng', en: 'Characteristic Verbal Behaviors' },
  PB: { vi: 'Các vấn đề về hành vi', en: 'Problem Behaviors' },
  PSC: { vi: 'Tính tự lập', en: 'Personal Self-Care' },
  AB: { vi: 'Hành vi thích ứng', en: 'Adaptive Behaviors' }
};

const rawSources: { code: string; data: any[] }[] = [
  { code: 'CVP', data: cvpData },
  { code: 'EL', data: elData },
  { code: 'RL', data: rlData },
  { code: 'FM', data: fmData },
  { code: 'GM', data: gmData },
  { code: 'VMI', data: vmiData },
  { code: 'AE', data: aeData },
  { code: 'SR', data: srData },
  { code: 'CMB', data: cmbData },
  { code: 'CVB', data: cvbData },
  { code: 'PB', data: pbData },
  { code: 'PSC', data: pscData },
  { code: 'AB', data: abData }
];

const buildPEP3Database = (): PEP3Item[] => {
  const db: PEP3Item[] = [];
  let globalId = 1;

  rawSources.forEach(source => {
    const meta = subtestsMeta[source.code];
    source.data.forEach((item: PEP3ItemSource) => {
      db.push({
        id: globalId,
        subtestCode: source.code,
        subtestName: {
          vi: `${meta.vi} (${source.code})`,
          en: `${meta.en} (${source.code})`
        },
        name: item.name,
        materials: item.materials,
        administration: item.administration,
        scoring: item.scoring,
        adaptationGuide: item.adaptationGuide
      });
      globalId++;
    });
  });

  return db;
};

export const pep3ItemsList = buildPEP3Database();
