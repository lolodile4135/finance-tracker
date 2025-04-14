import TransactionForm from '../transactions/TransactionForm';
import TransactionList from '../transactions/TransactionList';
import Navbar from '../layout/Navbar';
import Summary from '../layout/Summary';

const Dashboard = () => {
    return (
        <div>
            <Navbar />
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-8">Finance Dashboard</h1>
                <Summary />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <TransactionForm onTransactionAdded={() => window.location.reload()} />
                    <TransactionList />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;