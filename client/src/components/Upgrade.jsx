import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Upgrade = () => {
    const token = useSelector(state => state.token.token);
    const navigate = useNavigate();

    const handleUpgrade = () => {
        token ? navigate('/checkout') : window.alert('Please login first');
    };

    return (
        <div className="container mx-auto py-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:flex md:items-center">
                    <img src="./images/man.png" alt="Upgrade Image" className="mx-auto md:w-full md:max-w-sm h-80 w-28 " />
                </div>
                <div className="md:flex md:items-center">
                    <div className="text-center md:text-left">
                        <h2 className="text-3xl text-white font-bold mb-4"> Why you should Upgrade Now?</h2>
                        <p className="text-white mb-4">Upgrading will give you extra benefit of uploading images to your notes/</p>
                        <p className="text-white mb-4">Cost to upgrade is : $2</p>

                        <button onClick={handleUpgrade} className="bg-blue-900 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            Upgrade
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Upgrade;
