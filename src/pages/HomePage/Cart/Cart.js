import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import './Cart.css';

const Cart = ({ cart, handleDecrease, handleIncrease }) => {
    let total = 0;
    let totalQuantity = 0;
    for (const product of cart) {
        if (!product.quantity) {
            product.quantity = 1;
        }
        totalQuantity = totalQuantity + product.quantity;
        total = total + product.price * product.quantity;
    }

    //Thai currency Format
    const thaiFormatCurrency = new Intl.NumberFormat('th', { style: 'currency', currency: 'THB' }).format(total);
    return (
        <div style={{ position: "fixed" }}>
            <div>
                <h2 className='cart-header'>Cart</h2>
                <h3>Total Ordered  Robot:  {totalQuantity}</h3>
                <h3>Total Cost: {thaiFormatCurrency}</h3>
            </div>
            {
                cart.map(product =>
                    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", }}>

                        <div className="product-name">
                            <h4>{product.name}</h4>
                        </div>

                        <div className="quantity-wrapper">
                            <Button onClick={() => handleDecrease(product.name)} className="quantity-Minus-button" variant="outline"> <RemoveIcon /> </Button>
                            <span>{product.quantity}</span>
                            <Button onClick={() => handleIncrease(product.name)} className="quantity-plus-button" variant="outline"><AddIcon /></Button>

                        </div>

                    </div>
                )
            }
        </div>
    );
};

export default Cart;