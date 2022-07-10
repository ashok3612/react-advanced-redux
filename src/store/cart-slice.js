import { createSlice } from "@reduxjs/toolkit";
import { uiActions } from "./ui-slice";

const defaultState = {
  items: [],
  totalPrice: 0,
  totalQuantity: 0,
  isChanged: true,
};

const cartSlice = createSlice({
  name: "cart",
  initialState: defaultState,
  reducers: {
    replaceCartItems: (prevState, action) => {
      prevState.items = action.payload.items;
      prevState.totalPrice = action.payload.totalPrice;
      prevState.totalQuantity = action.payload.totalQuantity;
    },
    addItemToCart: (prevState, action) => {
      const addItemIndex = prevState.items.findIndex(
        (item) => item.id === action.payload.id
      );
      if (addItemIndex >= 0) {
        const currentItem = prevState.items[addItemIndex];
        currentItem.quantity++;
        currentItem.itemTotalPrice =
          currentItem.itemTotalPrice + action.payload.price;

        prevState.items[addItemIndex] = currentItem;
      } else {
        prevState.items.push({
          id: action.payload.id,
          title: action.payload.title,
          price: action.payload.price,
          quantity: action.payload.quantity,
          itemTotalPrice: action.payload.price,
          description: action.payload.description,
        });
      }
      prevState.totalQuantity++;
      prevState.totalPrice = prevState.totalPrice + action.payload.price;
      prevState.isChanged = false;
    },
    deleteItemFormCart: (prevState, action) => {
      const addItemIndex = prevState.items.findIndex(
        (item) => item.id === action.payload
      );
      const currentItem = prevState.items[addItemIndex];
      if (currentItem.quantity === 1) {
        prevState.items.splice(addItemIndex, 1);
      } else {
        currentItem.quantity--;
        currentItem.itemTotalPrice =
          currentItem.itemTotalPrice - currentItem.price;

        prevState.items[addItemIndex] = currentItem;
      }
      prevState.totalQuantity--;
      prevState.totalPrice = prevState.totalPrice - currentItem.price;
      prevState.isChanged = false;
    },
  },
});

export const sendData = (items) => {
  return async (dispatch) => {
    dispatch(
      uiActions.showNotification({
        status: "pending",
        title: "Sending",
        message: "Cart data is being send...",
      })
    );
    const sendToFirebase = async () => {
      const response = await fetch(
        "https://react-learn-77d04-default-rtdb.firebaseio.com/cart.json",
        {
          method: "PUT",
          body: JSON.stringify(items),
        }
      );
      if (!response.ok) {
        throw new Error("Something went wrong!!!");
      }
    };

    sendToFirebase()
      .then(() => {
        dispatch(
          uiActions.showNotification({
            status: "success",
            title: "Success",
            message: "Cart Updated Successfully...",
          })
        );
      })
      .catch((error) => {
        console.log(error);
        dispatch(
          uiActions.showNotification({
            status: "error",
            title: "Failure",
            message: "Something went wrong!!!",
          })
        );
      });
  };
};

export const fetchCartFromFirebase = () => {
  return async (dispatch) => {
    const fetchFromFirebase = async () => {
      const response = await fetch(
        "https://react-learn-77d04-default-rtdb.firebaseio.com/cart.json",
        {
          method: "GET",
        }
      );
      if (!response.ok) {
        throw new Error("Something went wrong!!!");
      }
      const data = await response.json();
      return data;
    };

    try {
      const fromCart = await fetchFromFirebase();
      dispatch(
        cartActions.replaceCartItems({
          items: fromCart.items || [],
          totalQuantity: fromCart.totalQuantity,
          totalPrice: fromCart.totalPrice,
          isChanged: true,
        })
      );
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Failure",
          message: "Faile getting Cart Data!!!",
        })
      );
    }
  };
};

export const cartSliceReducer = cartSlice.reducer;
export const cartActions = cartSlice.actions;
