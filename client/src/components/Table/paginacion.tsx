"use client";

import { FC } from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const renderButtons = () => {
    const buttons = [];

    if (currentPage > 1) {
      buttons.push(
        <button key={1} onClick={() => onPageChange(1)} className="p-2 text-sm sm:text-base border dark:border-white/10 border-black/10 rounded-md" aria-label="Ir a la primera página">
          1
        </button>
      );
    }

    if (currentPage > 3) {
      buttons.push(
        <span key="ellipsis-start" className="p-2 text-sm sm:text-base border border-black/10 dark:border-white/10 rounded-md">
          ...
        </span>
      );
    }

    if (currentPage > 2) {
      buttons.push(
        <button key={currentPage - 1} onClick={() => onPageChange(currentPage - 1)} className="p-2 text-sm sm:text-base border dark:border-white/10 border-black/10 rounded-md">
          {currentPage - 1}
        </button>
      );
    }

    buttons.push(
      <button key={currentPage} className="p-2 text-sm sm:text-base border border-black/10 dark:border-white/10 dark:bg-white/30 bg-black/10 rounded-md" disabled>
        {currentPage}
      </button>
    );

    if (currentPage < totalPages - 1) {
      buttons.push(
        <button key={currentPage + 1} onClick={() => onPageChange(currentPage + 1)} className="p-2 text-sm sm:text-base border dark:border-white/10 border-black/10 rounded-md">
          {currentPage + 1}
        </button>
      );
    }

    if (currentPage < totalPages - 2) {
      buttons.push(
        <span key="ellipsis-end" className="p-2 text-sm sm:text-base border border-black/10 dark:border-white/10 rounded-md">
          ...
        </span>
      );
    }

    if (currentPage < totalPages) {
      buttons.push(
        <button key={totalPages} onClick={() => onPageChange(totalPages)} className="p-2 text-sm sm:text-base border dark:border-white/10 border-black/10 rounded-md" aria-label={`Ir a la última página ${totalPages}`}>
          {totalPages}
        </button>
      );
    }

    return buttons;
  };

  return (
    <div className="flex items-center justify-center flex-wrap mt-4 gap-2">
      {currentPage > 1 && (
        <button onClick={() => onPageChange(currentPage - 1)} className="p-2 text-sm sm:text-base border dark:border-white/10 border-black/10 rounded-md font-semibold" aria-label="Página anterior">
          &lt;
        </button>
      )}

      {renderButtons()}

      {currentPage < totalPages && (
        <button onClick={() => onPageChange(currentPage + 1)} className="p-2 text-sm sm:text-base border dark:border-white/10 border-black/10 rounded-md" aria-label="Página siguiente">
          &gt;
        </button>
      )}
    </div>
  );
};

export default Pagination;
