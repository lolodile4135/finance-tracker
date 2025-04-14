import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import FilterBar from './FilterBar';
import SortBar from './SortBar';

const TransactionList = () => {
    const [transactions, setTransactions] = useState([]);
    const [filteredTransactions, setFilteredTransactions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchTransactions();
    }, []);

    const fetchTransactions = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('http://localhost:5000/api/transactions', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setTransactions(response.data);
            setFilteredTransactions(response.data);
            setLoading(false);
        } catch (error) {
            toast.error('Failed to fetch transactions');
            setLoading(false);
        }
    };

    const handleFilterChange = (filters) => {
        let filtered = [...transactions];

        // Filter by type
        if (filters.type !== 'all') {
            filtered = filtered.filter(t => t.type === filters.type);
        }

        // Filter by date range
        const now = new Date();
        if (filters.dateRange === 'today') {
            filtered = filtered.filter(t => {
                const tDate = new Date(t.date);
                return tDate.toDateString() === now.toDateString();
            });
        } else if (filters.dateRange === 'week') {
            const weekAgo = new Date(now - 7 * 24 * 60 * 60 * 1000);
            filtered = filtered.filter(t => new Date(t.date) > weekAgo);
        } else if (filters.dateRange === 'month') {
            const monthAgo = new Date(now - 30 * 24 * 60 * 60 * 1000);
            filtered = filtered.filter(t => new Date(t.date) > monthAgo);
        }

        setFilteredTransactions(filtered);
    };

    const handleSort = (field, order) => {
        const sorted = [...filteredTransactions].sort((a, b) => {
            if (field === 'date') {
                return order === 'asc'
                    ? new Date(a.date) - new Date(b.date)
                    : new Date(b.date) - new Date(a.date);
            }
            if (field === 'amount') {
                return order === 'asc'
                    ? Number(a.amount) - Number(b.amount)
                    : Number(b.amount) - Number(a.amount);
            }
            if (field === 'title') {
                return order === 'asc'
                    ? a.title.localeCompare(b.title)
                    : b.title.localeCompare(a.title);
            }
            return 0;
        });
        setFilteredTransactions(sorted);
    };



const handleDelete = async (id) => {
        try {
            const token = localStorage.getItem('token');
            await axios.delete(`http://localhost:5000/api/transactions/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            toast.success('Transaction deleted');
            fetchTransactions();
        } catch (error) {
            toast.error('Failed to delete transaction');
        }
    };

    if (loading) {
        return <div className="text-center">Loading...</div>;
    }

    return (
        <div>
            <FilterBar onFilterChange={handleFilterChange} />
            <SortBar onSortChange={handleSort} />
            <div className="space-y-4">
                {filteredTransactions.map((transaction) => (
                    <div key={transaction._id}
                        className="bg-white p-4 rounded-lg shadow flex justify-between items-center">
                        <div>
                            <h3 className="font-medium">{transaction.title}</h3>
                            <p className="text-sm text-gray-500">{transaction.category}</p>
                            <p className="text-xs text-gray-400">
                                {new Date(transaction.date).toLocaleDateString()}
                            </p>
                        </div>
                        <div className="flex items-center space-x-4">
                            <span className={`font-bold ${transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
                                }`}>
                                {transaction.type === 'income' ? '+' : '-'}${transaction.amount}
                            </span>
                            <button
                                onClick={() => handleDelete(transaction._id)}
                                className="text-red-500 hover:text-red-700"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
                {filteredTransactions.length === 0 && (
                    <p className="text-center text-gray-500">No transactions found</p>
                )}
            </div>
        </div>
    );
};

export default TransactionList;