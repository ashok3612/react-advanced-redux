import classes from "./CartButton.module.css";
import { useDispatch } from "react-redux/es/exports";
import { uiActions } from "../../store/ui-slice";
import { useSelector } from "react-redux";

const CartButton = (props) => {
  const totalItemsCount = useSelector((state) => state.CartReducer.totalQuantity);

  const dispatcher = useDispatch();

  const cartButtonHandler = () => {
    dispatcher(uiActions.setShowCart());
  };
  return (
    <button className={classes.button} onClick={cartButtonHandler}>
      <span>My Cart</span>
      <span className={classes.badge}>{totalItemsCount}</span>
    </button>
  );
};

export default CartButton;
