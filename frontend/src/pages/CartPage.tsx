import { useNavigate } from 'react-router-dom';
import type { CartItem } from '../types/cartItem';
import { useCart } from '../context/CartContext';
import WelcomeBand from '../components/WelcomeBand';

function CartPage() {
    const navigate = useNavigate();
    const { cart, removeFromCart } = useCart();

    const totalAmount = cart.reduce((sum, item) => sum + item.donationAmount, 0);

    return (
        <>
            <WelcomeBand />
            <div>
                <h2>Your Cart</h2>

                {cart.length === 0 ? (
                    <p>Your cart is empty</p>
                ) : (
                    <ul>
                        {cart.map((item: CartItem) => (
                            <li key={item.projectId}>
                                {item.projectName}: ${item.donationAmount.toFixed(2)}
                                <button onClick={() => removeFromCart(item.projectId)}>Remove</button>
                            </li>
                        ))}
                    </ul>
                )}

                <h3>Total: ${totalAmount.toFixed(2)}</h3>
                <button>Checkout</button>
                <button onClick={() => navigate('/projects')}>Continue Browsing</button>
            </div>
        </>
    );
}

export default CartPage;
