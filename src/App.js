import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import { useDispatch, useSelector } from "react-redux";
import { Fragment, useEffect } from "react";
import Notification from "./components/Notification/Notification";
import { fetchCartFromFirebase, sendData } from "./store/cart-slice";

let isInitial = true;

function App() {
  const isShowCart = useSelector((state) => state.UIReducer.isShowCart);
  const cart = useSelector((state) => state.CartReducer);
  const notification = useSelector((state) => state.UIReducer.notification);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isInitial) {
      isInitial = false;
      return;
    }
    if (!cart.isChanged) {
      dispatch(sendData(cart));
    }
  }, [cart, dispatch]);

  useEffect(() => {
    dispatch(fetchCartFromFirebase());
  }, [dispatch]);

  return (
    <Fragment>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
      <Layout>
        {isShowCart && <Cart />}
        <Products />
      </Layout>
    </Fragment>
  );
}

export default App;
