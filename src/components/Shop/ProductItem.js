import Card from "../UI/Card";
import classes from "./ProductItem.module.css";
import { useDispatch } from "react-redux/es/hooks/useDispatch";
import { cartActions } from "../../store/cart-slice";

const ProductItem = (props) => {
  const { id, title, price, description } = props;
  const dispatcher = useDispatch();

  const AddCartButtonHandler = () => {
    const addItem = {
      id,
      price,
      description,
      title,
      quantity: 1,
    };
    dispatcher(cartActions.addItemToCart(addItem));
  };
  return (
    <li className={classes.item}>
      <Card>
        <header>
          <h3>{title}</h3>
          <div className={classes.price}>${price.toFixed(2)}</div>
        </header>
        <p>{description}</p>
        <div className={classes.actions}>
          <button onClick={AddCartButtonHandler}>Add to Cart</button>
        </div>
      </Card>
    </li>
  );
};

export default ProductItem;
