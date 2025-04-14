import { useState, useEffect } from 'react';
import axios from 'axios';

const Summary = () => {
    const [stats, setStats] = useState({
        totalIncome: 0,
        totalExpense: 0,
        balance: 0
    });

    useEffect(() => {
        fetchTransactions();
    }, []);

    const fetchTransactions = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('http://localhost:5000/api/transactions', {
                headers: { Authorization: `Bearer ${token}` }
            });

            const transactions = response.data;
            const income = transactions
                .filter(t => t.type === 'income')
                .reduce((acc, t) => acc + Number(t.amount), 0);
            const expense = transactions
                .filter(t => t.type === 'expense')
                .reduce((acc, t) => acc + Number(t.amount), 0);

            setStats({
                totalIncome: income,
                totalExpense: expense,
                balance: income - expense
            });
        } catch (error) {
            console.error('Error fetching transactions:', error);
        }
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-green-100 p-4 rounded-lg shadow">
                <h3 className="text-lg font-semibold text-green-800">Total Income</h3>
                <p className="text-2xl font-bold text-green-600">${stats.totalIncome}</p>
            </div>
            <div className="bg-red-100 p-4 rounded-lg shadow">
                <h3 className="text-lg font-semibold text-red-800">Total Expenses</h3>
                <p className="text-2xl font-bold text-red-600">${stats.totalExpense}</p>
            </div>
            <div className="bg-blue-100 p-4 rounded-lg shadow">
                <h3 className="text-lg font-semibold text-blue-800">Balance</h3>
                <p className="text-2xl font-bold text-blue-600">${stats.balance}</p>
            </div>
        </div>
    );
};

export default Summary;