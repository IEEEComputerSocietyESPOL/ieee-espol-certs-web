import { useState, useMemo } from 'react';
import { Certificate, FilterState, Chapter, ActivityType } from '../types';

const initialFilters: FilterState = {
  chapter: 'Todos',
  activityType: 'Todos',
  year: 'Todos',
  search: '',
};

export function useCertificates(certificates: Certificate[]) {
  const [filters, setFilters] = useState<FilterState>(initialFilters);

  const availableYears = useMemo(() => {
    const years = [...new Set(certificates.map((c) => new Date(c.date).getFullYear()))];
    return years.sort((a, b) => b - a);
  }, [certificates]);

  const filtered = useMemo(() => {
    return certificates.filter((cert) => {
      if (filters.chapter !== 'Todos' && cert.chapter !== filters.chapter) return false;
      if (filters.activityType !== 'Todos' && cert.activityType !== filters.activityType) return false;
      if (filters.year !== 'Todos' && new Date(cert.date).getFullYear() !== filters.year) return false;
      if (filters.search) {
        const q = filters.search.toLowerCase();
        if (
          !cert.title.toLowerCase().includes(q) &&
          !cert.chapter.toLowerCase().includes(q) &&
          !cert.activityType.toLowerCase().includes(q) &&
          !(cert.speaker?.toLowerCase().includes(q))
        )
          return false;
      }
      return true;
    });
  }, [certificates, filters]);

  const stats = useMemo(() => {
    const thisYear = new Date().getFullYear();
    return {
      total: certificates.length,
      thisYear: certificates.filter((c) => new Date(c.date).getFullYear() === thisYear).length,
      totalHours: certificates.reduce((sum, c) => sum + c.hours, 0),
      chapters: new Set(certificates.map((c) => c.chapter)).size,
    };
  }, [certificates]);

  const setChapter = (chapter: Chapter | 'Todos') =>
    setFilters((f) => ({ ...f, chapter }));
  const setActivityType = (activityType: ActivityType | 'Todos') =>
    setFilters((f) => ({ ...f, activityType }));
  const setYear = (year: number | 'Todos') =>
    setFilters((f) => ({ ...f, year }));
  const setSearch = (search: string) =>
    setFilters((f) => ({ ...f, search }));
  const resetFilters = () => setFilters(initialFilters);

  return { filtered, filters, stats, availableYears, setChapter, setActivityType, setYear, setSearch, resetFilters };
}
