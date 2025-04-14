import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Navbar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        toast.success('Logged out successfully');
        navigate('/login');
    };

    return (
        <nav className="bg-blue-600 p-4">
            <div className="container mx-auto flex justify-between items-center">
                <h1 className="text-white text-xl font-bold">Finance Tracker</h1>
                <button
                    onClick={handleLogout}
                    className="bg-white text-blue-600 px-4 py-2 rounded hover:bg-gray-100"
                >
                    Logout
                </button>
            </div>
        </nav>
    );
};

export default Navbar;