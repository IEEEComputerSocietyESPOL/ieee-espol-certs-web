import { useState, useMemo } from 'react';
import { Certificate, FilterState, Chapter, ActivityType } from '../types';

const initialFilters: FilterState = {
  chapter: 'Todos',
  activityType: 'Todos',
  year: 'Todos',
  search: '',
};

const PAGE_SIZE = 6;

export function useCertificates(certificates: Certificate[]) {
  const [filters, setFilters] = useState<FilterState>(initialFilters);
  const [currentPage, setCurrentPage] = useState(1);

  const availableYears = useMemo(() => {
    const years = [...new Set(certificates.map((c) => new Date(c.date).getFullYear()))];
    return years.sort((a, b) => b - a);
  }, [certificates]);

  const filtered = useMemo(() => {
    return [...certificates]
      .filter((cert) => {
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
          ) return false;
        }
        return true;
      })
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [certificates, filters]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);

  const paginated = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return filtered.slice(start, start + PAGE_SIZE);
  }, [filtered, currentPage]);

  const stats = useMemo(() => {
    const thisYear = new Date().getFullYear();
    return {
      total: certificates.length,
      thisYear: certificates.filter((c) => new Date(c.date).getFullYear() === thisYear).length,
      totalHours: certificates.reduce((sum, c) => sum + c.hours, 0),
      chapters: new Set(certificates.map((c) => c.chapter)).size,
    };
  }, [certificates]);

  const goToPage = (page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const resetFiltersAndPage = () => {
    setFilters(initialFilters);
    setCurrentPage(1);
  };

  const setChapter = (chapter: Chapter | 'Todos') => { setFilters((f) => ({ ...f, chapter })); setCurrentPage(1); };
  const setActivityType = (activityType: ActivityType | 'Todos') => { setFilters((f) => ({ ...f, activityType })); setCurrentPage(1); };
  const setYear = (year: number | 'Todos') => { setFilters((f) => ({ ...f, year })); setCurrentPage(1); };
  const setSearch = (search: string) => { setFilters((f) => ({ ...f, search })); setCurrentPage(1); };

  return {
    filtered,
    paginated,
    filters,
    stats,
    availableYears,
    currentPage,
    totalPages,
    goToPage,
    setChapter,
    setActivityType,
    setYear,
    setSearch,
    resetFilters: resetFiltersAndPage,
  };
}