import Card from "../UI/Card";
import classes from "./Cart.module.css";
import CartItem from "./CartItem";
import { useSelector } from "react-redux/es/hooks/useSelector";

const Cart = (props) => {
  const items = useSelector((state) => state.CartReducer.items);
  const cartItems = items.map((item) => {
    return (
      <CartItem
        key={item.id}
        item={{ 
          id: item.id,
          title: item.title,
          quantity: item.quantity,
          total: item.itemTotalPrice,
          price: item.price,
          description: item.description,
        }}
      />
    );
  });
  return (
    <Card className={classes.cart}>
      <h2>Your Shopping Cart</h2>
      <ul>{cartItems}</ul>
    </Card>
  );
};

export default Cart;
