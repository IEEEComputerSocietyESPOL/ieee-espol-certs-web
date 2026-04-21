import { Chapter, ActivityType } from '../types';

export const CHAPTER_CONFIG: Record<
  Chapter,
  { color: string; bg: string; border: string; label: string; abbr: string }
> = {
  'Rama General': {
    color: '#003087',
    bg: '#E6F1FB',
    border: '#B5D4F4',
    label: 'Rama General',
    abbr: 'RAMA',
  },
  'IEEE CS': {
    color: '#a36200',
    bg: '#FFF5E0',
    border: '#FFD980',
    label: 'Computer Society',
    abbr: 'CS',
  },
  'IEEE WIE': {
    color: '#522367',
    bg: '#F3EAF8',
    border: '#D9B8EC',
    label: 'Women in Engineering',
    abbr: 'WIE',
  },
  'IEEE PES': {
    color: '#004d26',
    bg: '#E6F4ED',
    border: '#99D1B3',
    label: 'Power & Energy Society',
    abbr: 'PES',
  },
  'IEEE RAS': {
    color: '#862633',
    bg: '#FAECEE',
    border: '#F0B8BF',
    label: 'Robotics & Automation Society',
    abbr: 'RAS',
  },
  'IEEE EMBS': {
    color: '#5a1a63',
    bg: '#F6EAF7',
    border: '#D9A8E0',
    label: 'Medicine & Biology Society',
    abbr: 'EMBS',
  },
  'IEEE CIS': {
    color: '#006e94',
    bg: '#E0F5FC',
    border: '#80D4EE',
    label: 'Computational Intelligence Society',
    abbr: 'CIS',
  },
  'IEEE IAS': {
    color: '#005a2b',
    bg: '#E6F4ED',
    border: '#80C9A1',
    label: 'Industry Applications Society',
    abbr: 'IAS',
  },
  'IEEE COMSOC': {
    color: '#007aaa',
    bg: '#E0F4FB',
    border: '#80CEEE',
    label: 'Communications Society',
    abbr: 'COM',
  },
  'IEEE CSS': {
    color: '#012431',
    bg: '#E3EEF1',
    border: '#8BBAC4',
    label: 'Control Systems Society',
    abbr: 'CSS',
  },
  'IEEE PHS': {
    color: '#2a8faa',
    bg: '#E8F7FB',
    border: '#94D9EB',
    label: 'Photonics Society',
    abbr: 'PHS',
  },
  'IEEE OES': {
    color: '#010e7a',
    bg: '#E6E8FA',
    border: '#8890E8',
    label: 'Oceanic Engineering Society',
    abbr: 'OES',
  },
  'IEEE SIGHT': {
    color: '#b33700',
    bg: '#FDEEE8',
    border: '#F7B899',
    label: 'Special Interest Group on Humanitarian Technology',
    abbr: 'SIGHT',
  },
  'IEEE GRSS': {
    color: '#004d26',
    bg: '#E6F4ED',
    border: '#80C9A1',
    label: 'Geoscience and Remote Sensing Society',
    abbr: 'GRSS',
  },
};

export const ACTIVITY_TYPE_COLORS: Record<ActivityType, { color: string; bg: string }> = {
  Charla:      { color: '#185FA5', bg: '#E6F1FB' },
  Taller:      { color: '#3B6D11', bg: '#EAF3DE' },
  Hackathon:   { color: '#712B13', bg: '#FAECE7' },
  Conferencia: { color: '#534AB7', bg: '#EEEDFE' },
  Seminario:   { color: '#854F0B', bg: '#FAEEDA' },
  Competencia: { color: '#993556', bg: '#FBEAF0' },
};

export function formatDate(isoDate: string): string {
  const date = new Date(isoDate + 'T00:00:00');
  return date.toLocaleDateString('es-EC', { day: 'numeric', month: 'short', year: 'numeric' });
}

export const ALL_CHAPTERS: Chapter[] = [
  'Rama General',
  'IEEE CS',
  'IEEE WIE',
  'IEEE PES',
  'IEEE RAS',
  'IEEE EMBS',
  'IEEE CIS',
  'IEEE IAS',
  'IEEE COMSOC',
  'IEEE CSS',
  'IEEE PHS',
  'IEEE OES',
  'IEEE SIGHT',
  'IEEE GRSS',
];

export const ALL_ACTIVITY_TYPES: ActivityType[] = [
  'Charla', 'Taller', 'Hackathon', 'Conferencia', 'Seminario', 'Competencia',
];