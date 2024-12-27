// Pagination.js
import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    return (
        <div className="flex justify-between items-center mt-4">
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
            >
                Previous
            </button>
            <div>
                Page {currentPage} of {totalPages}
            </div>
            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
            >
                Next
            </button>
        </div>
    );
};

export default Pagination;
