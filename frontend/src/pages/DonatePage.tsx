import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import type { CartItem } from '../types/cartItem';
import { useCart } from '../context/CartContext';
import WelcomeBand from '../components/WelcomeBand';

function DonatePage() {
    const navigate = useNavigate();
    const { projectName, projectId } = useParams();
    const { addToCart } = useCart();
    const [donationAmount, setDonationAmount] = useState<number>(0);

    const handleAddToCart = () => {
        const newItem: CartItem = {
            projectId: Number(projectId),  // useParams gives strings; cast to number
            projectName: projectName ?? 'No project found',
            donationAmount: donationAmount,
        };
        addToCart(newItem);
        navigate('/cart');
    };

    return (
        <>
            <WelcomeBand />
            <h2>Donate to {projectName}</h2>
            <div>
                <input
                    type="number"
                    placeholder="Enter donation amount"
                    value={donationAmount}
                    onChange={(e) => setDonationAmount(Number(e.target.value))}
                />
                <button onClick={handleAddToCart}>Add to Cart</button>
                <button onClick={() => navigate(-1)}>Go Back</button>
            </div>
        </>
    );
}

export default DonatePage;
