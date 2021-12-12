import { Button, Card, CardActionArea, CardContent, CardMedia, Grid, Typography } from '@mui/material';
import './Product.css';

const Product = ({ product, handleAddToCart }) => {
    const { image, name, price, stock, createdAt, material } = product;
    //format date here
    const timeStamp = new Date(createdAt).getTime();
    const day = new Date(timeStamp).getDate();
    const month = new Date(timeStamp).getMonth();
    const year = new Date(timeStamp).getFullYear();
    const dateFormat = `${day}-${month}-${year}`;
    //Thai currency Format
    const thai = new Intl.NumberFormat('th', { style: 'currency', currency: 'THB' }).format(price);
    return (
        <Grid item xs={12} md={4}>
            <Card>
                <CardActionArea>
                    <CardMedia
                        height="300"
                        component="img"
                        image={image}
                        alt="green iguana"
                    />
                    <CardContent sx={{ textAlign: "center" }}>
                        <Typography gutterBottom variant="h5" component="div" color="primary">
                            {name}
                        </Typography>
                        <Typography className="product-card-text price" variant="body2">
                            Price: {thai}
                        </Typography>
                        <Typography className={stock === 0 ? "stock-out" : "product-card-text"} variant="body2" color="text.secondary">
                            {stock === 0 ? "Out Of Stock" : `Stock: ${stock}`}
                        </Typography>
                        <Typography className="product-card-text" variant="body2" color="text.secondary">
                            Date: {dateFormat}
                        </Typography>
                        <Typography className="product-card-text" variant="body2" color="text.secondary">
                            Material: {material}
                        </Typography>
                        <div className="button-wrapper">
                            {
                                (stock === 0) ? <Button variant="outlined" disabled>Add To Cart</Button>
                                    : <Button onClick={() => handleAddToCart(product)} variant="outlined" color="primary">Add To Cart</Button>
                            }
                        </div>
                    </CardContent>
                </CardActionArea>
            </Card>
        </Grid >
    );
};

export default Product;