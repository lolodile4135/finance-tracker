import { useState } from 'react';

const SortBar = ({ onSortChange }) => {
    const [sortBy, setSortBy] = useState('date');
    const [sortOrder, setSortOrder] = useState('desc');

    const handleSortChange = (field) => {
        if (field === sortBy) {
            const newOrder = sortOrder === 'asc' ? 'desc' : 'asc';
            setSortOrder(newOrder);
            onSortChange(field, newOrder);
        } else {
            setSortBy(field);
            setSortOrder('desc');
            onSortChange(field, 'desc');
        }
    };

    return (
        <div className="flex gap-4 mb-4">
            <button
                onClick={() => handleSortChange('date')}
                className={`px-3 py-1 rounded ${sortBy === 'date' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            >
                Date {sortBy === 'date' && (sortOrder === 'asc' ? '↑' : '↓')}
            </button>
            <button
                onClick={() => handleSortChange('amount')}
                className={`px-3 py-1 rounded ${sortBy === 'amount' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            >
                Amount {sortBy === 'amount' && (sortOrder === 'asc' ? '↑' : '↓')}
            </button>
            <button
                onClick={() => handleSortChange('title')}
                className={`px-3 py-1 rounded ${sortBy === 'title' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            >
                Title {sortBy === 'title' && (sortOrder === 'asc' ? '↑' : '↓')}
            </button>
        </div>
    );
};

export default SortBar;