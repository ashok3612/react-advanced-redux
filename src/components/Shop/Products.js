import ProductItem from "./ProductItem";
import classes from "./Products.module.css";

const DUMMY_ITEM = [
  {
    id: "p1",
    title: "First Book",
    description: "Its wonderful Book",
    price: 12.5,
  },
  {
    id: "p2",
    title: "Pen",
    description: "Its wonderful Pen",
    price: 3.5,
  },
];

const allItems = DUMMY_ITEM.map((product) => {
  return (
    <ProductItem
      key={product.id}
      id={product.id}
      title={product.title}
      price={product.price}
      description={product.description}
    />
  );
});
const Products = (props) => {
  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>{allItems}</ul>
    </section>
  );
};

export default Products;
