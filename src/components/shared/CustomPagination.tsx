
import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CustomPaginationProps {
    page: number;
    totalUsersCount?: number;
    totalCount?: number;
    pageSize?: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    onPageChange: (newPage: number) => void;
    isLoading?: boolean;
}

const CustomPagination: React.FC<CustomPaginationProps> = ({ page, totalUsersCount, totalCount, pageSize = 30, hasNextPage, hasPreviousPage, onPageChange, isLoading = false }) => {
    const count = totalCount ?? totalUsersCount ?? 0;
    const totalPages = Math.max(1, Math.ceil(count / pageSize));

    if (count === 0 && !isLoading) {
        return null;
    }

    // Generate visible page numbers
    const getVisiblePages = () => {
        const pages: number[] = [];
        const maxVisible = 5;
        let start = Math.max(1, page - Math.floor(maxVisible / 2));
        let end = start + maxVisible - 1;

        if (end > totalPages) {
            end = totalPages;
            start = Math.max(1, end - maxVisible + 1);
        }

        for (let i = start; i <= end; i++) {
            pages.push(i);
        }
        return pages;
    };

    const visiblePages = getVisiblePages();

    return (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-border-color/50 text-xs text-description">
            {/* Page Info */}
            <div>
                Showing page <span className="text-white font-semibold">{page}</span> of{' '}
                <span className="text-white font-semibold">{totalPages}</span>
                {count > 0 && (
                    <>
                        {' '}(Total:{' '}
                        <span className="text-white font-semibold">{count}</span>)
                    </>
                )}
            </div>

            {/* Pagination Controls */}
            <div className="flex items-center gap-2">
                {/* Previous Button */}
                <button
                    type="button"
                    disabled={!hasPreviousPage && page <= 1 || isLoading}
                    onClick={() => onPageChange(page - 1)}
                    className="px-3 py-1.5 bg-[#040812] border border-border-color hover:border-[#0071E3] text-white rounded-lg flex items-center gap-1 transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                >
                    <ChevronLeft className="w-4 h-4" />
                    <span>Previous</span>
                </button>

                {/* Page Numbers */}
                {visiblePages.map((pageNum) => (
                    <button
                        key={pageNum}
                        type="button"
                        disabled={isLoading}
                        onClick={() => onPageChange(pageNum)}
                        className={`w-8 h-8 rounded-lg text-xs font-semibold transition-all cursor-pointer ${page === pageNum
                                ? 'bg-[#0071E3] text-white shadow-sm font-bold'
                                : 'bg-[#040812] border border-border-color text-description hover:text-white'
                            }`}
                    >
                        {pageNum}
                    </button>
                ))}

                {/* Next Button */}
                <button
                    type="button"
                    disabled={!hasNextPage && page >= totalPages || isLoading}
                    onClick={() => onPageChange(page + 1)}
                    className="px-3 py-1.5 bg-[#040812] border border-border-color hover:border-[#0071E3] text-white rounded-lg flex items-center gap-1 transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                >
                    <span>Next</span>
                    <ChevronRight className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
};

export default CustomPagination;
