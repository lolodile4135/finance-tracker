import { useState } from 'react';

const FilterBar = ({ onFilterChange }) => {
    const [filters, setFilters] = useState({
        type: 'all',
        dateRange: 'all'
    });

    const handleFilterChange = (key, value) => {
        const newFilters = { ...filters, [key]: value };
        setFilters(newFilters);
        onFilterChange(newFilters);
    };

    return (
        <div className="flex flex-wrap gap-4 mb-6 p-4 bg-white rounded-lg shadow">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                <select
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    // value={filters.type}
                    onChange={(e) => handleFilterChange('type', e.target.value)}
                >
                    <option value="all">All</option>
                    <option value="income">Income</option>
                    <option value="expense">Expense</option>
                </select>
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date Range</label>
                <select
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    value={filters.dateRange}
                    onChange={(e) => handleFilterChange('dateRange', e.target.value)}
                >
                    <option value="all">All Time</option>
                    <option value="today">Today</option>
                    <option value="week">This Week</option>
                    <option value="month">This Month</option>
                </select>
            </div>
        </div>
    );
};

export default FilterBar;