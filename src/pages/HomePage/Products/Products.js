import { Grid, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Products.css';
import swal from 'sweetalert';


const Products = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);
    const [displayProducts, setDisplayProducts] = useState([]);
    //product Load from API
    useEffect(() => {
        fetch('http://localhost:8000/api/robots')
            .then(response => response.json())
            .then(data => {
                setProducts(data.data);
                setDisplayProducts(data.data)
            })
    }, []);
    // Product Search Function
    const searchProduct = (e) => {
        const searchText = e.target.value;
        console.log(searchText)
        const matchProducts = products.filter(product => product.material.toLowerCase().includes(searchText.toLowerCase()));
        setDisplayProducts(matchProducts);
    }

    //Add To cart Function
    const handleAddToCart = product => {
        const newCart = [...cart];
        const exists = newCart.find(cartProduct => cartProduct.name === product.name);
        if (exists) {
            exists.quantity += 1;
            decreaseStock(exists.name)
        }
        else {
            if (cart.length >= 5) {
                swal("Opps!", "You can not add more than 5 different Robots.", "warning");
                return;
            }
            const newCartProduct = { ...product };
            newCartProduct.quantity = 1;
            newCart.push(newCartProduct);
            decreaseStock(newCartProduct.name)
        }
        setCart(newCart);

    }

    //Decrease stock
    const decreaseStock = (name) => {
        const decreaseProduct = products.find(product => product.name === name);
        if (decreaseProduct.stock === 0) {
            return;
        }
        decreaseProduct.stock -= 1;
    }
    // Handle Decrease button 
    const handleDecrease = (name) => {
        let newCart = [...cart];
        // add product stock after decrease
        const increaseProductStock = products.find(product => product.name === name);
        increaseProductStock.stock += 1;
        //decrease product quantity from cart
        const productDecreaseFromCart = newCart.find(product => product.name === name);
        productDecreaseFromCart.quantity -= 1;
        setCart(newCart);
    }
    //Handle Increase Button
    const handleIncrease = (name) => {
        const product = products.find(product => product.name === name);
        if (product.stock) {
            handleAddToCart(product);
        } else {
            swal("Opps!", "Product Stock Out.", "warning");
        }

    }

    return (
        <section className='main-section'>
            <Grid container spacing={2}>
                <Grid item xs={12} md={9}>
                    <div className="search-field">
                        <TextField
                            className="input-box"
                            onChange={searchProduct}
                            id="filled-search"
                            label="Search Robot by Material"
                            type="search"
                            variant="outlined"
                        />
                    </div>

                    <Grid container spacing={2}>

                        {
                            displayProducts.map(product => <Product product={product} handleAddToCart={handleAddToCart} key={product.name}></Product>)
                        }
                    </Grid>
                </Grid>
                <Grid item xs={12} md={3}>
                    <Cart
                        cart={cart}
                        key={cart.name}
                        handleDecrease={handleDecrease}
                        handleIncrease={handleIncrease}
                    ></Cart>
                </Grid>
            </Grid>
        </section>
    );
};

export default Products;