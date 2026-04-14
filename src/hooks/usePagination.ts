import { useState, useMemo } from 'react';

interface UsePaginationOptions {
  defaultPageSize?: number;
}

export function usePagination<T>(data: T[], options?: UsePaginationOptions) {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(options?.defaultPageSize ?? 10);

  const totalPages = Math.max(1, Math.ceil(data.length / pageSize));

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return data.slice(start, start + pageSize);
  }, [data, currentPage, pageSize]);

  const handlePageChange = (page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };

  const handlePageSizeChange = (size: number) => {
    setPageSize(size);
    setCurrentPage(1);
  };

  return {
    paginatedData,
    currentPage,
    pageSize,
    totalPages,
    totalItems: data.length,
    handlePageChange,
    handlePageSizeChange,
  };
}
