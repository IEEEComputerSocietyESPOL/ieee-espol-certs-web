export type Chapter =
  | 'Rama General'
  | 'IEEE CS'
  | 'IEEE WIE'
  | 'IEEE PES'
  | 'IEEE RAS'
  | 'IEEE EMBS'
  | 'IEEE CIS'
  | 'IEEE IAS'
  | 'IEEE COMSOC'
  | 'IEEE CSS'
  | 'IEEE PHS'
  | 'IEEE OES'
  | 'IEEE SIGHT'
  | 'IEEE GRSS';

export type ActivityType = 'Charla' | 'Taller' | 'Hackathon' | 'Conferencia' | 'Seminario' | 'Competencia';

export interface Certificate {
  id: string;
  title: string;
  chapter: Chapter;
  activityType: ActivityType;
  date: string;
  hours: number;
  description: string;
  speaker?: string;
  pdfUrl?: string;
}

export interface Member {
  id: string;
  name: string;
  initials: string;
  email: string;
  studentId: string;
  career: string;
  joinDate: string;
  certificates: Certificate[];
}

export interface FilterState {
  chapter: Chapter | 'Todos';
  activityType: ActivityType | 'Todos';
  year: number | 'Todos';
  search: string;
}