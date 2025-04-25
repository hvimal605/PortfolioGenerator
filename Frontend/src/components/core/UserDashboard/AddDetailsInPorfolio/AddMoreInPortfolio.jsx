import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPortfoliosForUser } from '../../../../services/operations/PortfolioApi';
import { setPortfolio } from '../../../../slices/PortfolioSlice';
import AddDetails from './AddDetails';


const AddMoreInPortfolio = () => {
    const { token } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const [portfolios, setPortfolios] = useState([]);
    const [selectedPortfolio, setSelectedPortfolio] = useState(null);

    useEffect(() => {
        const fetchPortfolios = async () => {
            try {
                const res = await getPortfoliosForUser(token);

                if (res?.success) {
                    // Mapping portfolios to set the _id
                    const deployedPortfolios = res.portfolios
                        .filter((portfolio) => portfolio.deployLink)
                        .map((portfolio) => ({
                            ...portfolio,
                            _id: portfolio.portfolioId,  // Using _id instead of portfolioId
                        }));
                    setPortfolios(deployedPortfolios);
                }
            } catch (err) {
                console.error("Failed to fetch portfolios:", err);
            }
        };

        if (token) {
            fetchPortfolios();
        }
    }, [token]);

    useEffect(() => {
        if (portfolios.length > 0) {
            const firstPortfolio = portfolios[0];
            setSelectedPortfolio(firstPortfolio); // Set the first portfolio by default
            dispatch(setPortfolio(firstPortfolio)); // Dispatch the first portfolio by default
        }
    }, [portfolios, dispatch]);

    // Handle portfolio change
    const handlePortfolioChange = (e) => {
        const selectedId = e.target.value;
        const selected = portfolios.find((p) => p._id === selectedId);  // Match by _id
        setSelectedPortfolio(selected);
        dispatch(setPortfolio(selected));
    };

    return (
        <div className="min-h-screen text-white p-6 md:p-8 space-y-6">
            <h1 className="text-3xl md:text-4xl font-extrabold text-center pb-4 uppercase tracking-wide bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-pink-500">
                Add Details in Portfolios
            </h1>

            <div className="relative bg-gradient-to-br from-indigo-600/10 via-indigo-400/20 to-indigo-800/0 backdrop-blur-md p-6 md:p-8 rounded-3xl shadow-lg border border-indigo-500/20 w-full max-w-md mx-auto group transition-all duration-300 ease-in-out">
                <div className="absolute inset-0 z-0 rounded-3xl border border-indigo-500/20 blur-[4px] opacity-20 pointer-events-none"></div>

                <label className="block text-sm md:text-base mb-4 font-semibold tracking-wider text-white">
                     <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400">
                        Choose Your Deployed Portfolio
                    </span>
                </label>

                <select
                    className="relative z-10 bg-gradient-to-br from-gray-900/80 to-gray-700/90 text-white p-3 md:p-3.5 rounded-xl w-full border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/70 focus:border-indigo-400 transition duration-300 shadow-lg shadow-indigo-600/20 text-sm md:text-base"
                    value={selectedPortfolio ? selectedPortfolio._id : ''} // Match by _id here
                    onChange={handlePortfolioChange}
                >
                    {portfolios.length > 0 ? (
                        portfolios.map((p) => (
                            <option key={p._id} value={p._id} className="text-black bg-gradient-to-r from-gray-100 to-gray-200">
                                {p.deployLink}
                            </option>
                        ))
                    ) : (
                        <option disabled>No deployed portfolios found</option>
                    )}
                </select>
            </div>




            {selectedPortfolio && (
                <div>

                    <AddDetails />

                </div>)}

        </div>
    );
};

export default AddMoreInPortfolio;
