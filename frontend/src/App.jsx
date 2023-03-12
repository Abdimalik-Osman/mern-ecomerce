import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import Navbar from "./components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "./features/productSlice";
import Product from "./components/Product";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Button, Card, Form, Modal } from "react-bootstrap";
function App() {
  // const [count, setCount] = useState(0)
  const [show, setShow] = useState(false);
  const [product,setProduct]= useState({
    name:"",
    imageUrl:"",
    description:"",
    price:0,
    countInStock:0
   });
  //  console.log(product.name)
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const { products, isError, isSuccess, isLoading, message } = useSelector(
    (state) => state.product
  );
  const dispatch = useDispatch();
  // console.log(products[1]);
  useEffect(() => {
    dispatch(getProducts());
  }, []);
  if (isLoading) {
    return <h1>LOADING.........</h1>;
  }


  // handle change
  const handleChange = (e)=>{
    const {name,value}= e.target;
    setProduct(prev =>{
      return{
        ...prev,
        [name]:value
      }
    })
   }
 
   // handle submit 
   const handleSubmit = (e) => {
      e.preventDefault();

      console.log(product)
   }
  return (
    <Container>
        <Button variant="primary" style={{marginLeft:1000, marginBottom:30,}} onClick={handleShow}>
          NEW PRODUCT
        </Button>
        <Modal show={show} onHide={handleClose} >
      <Modal.Header closeButton>
        <Modal.Title>Modal heading</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="description">
            <Form.Label>Product Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Product Name"
              autoFocus
              name="name"
              value={product.name}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="imageUrl">
            <Form.Label>Image URL</Form.Label>
            <Form.Control
              type="text"
              placeholder="Image URL"
              name="imageUrl"
              value={product.imageUrl}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="price">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="text"
              placeholder="Price"
              name="price"
              value={product.price}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="countInStock">
            <Form.Label>Count In Stock</Form.Label>
            <Form.Control
              type="text"
              placeholder="Count In Stock"
              name="countInStock"
              value={product.countInStock}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group
            className="mb-3"
            controlId="description"
          >
            <Form.Label>Description</Form.Label>
            <Form.Control as="textarea" rows={3}  
               name="description"
              value={product.description}
              onChange={handleChange}
              />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
          <Row>
          {products && products.map((product)=>{
            return(
                      <Col sm={4}>
                          
                <Card>
                  <Card.Img variant="top" src={product.imageUrl} />
                  <Card.Body>
                    <Card.Title>{product.name}</Card.Title>
                    <Card.Text>
                    <><b>Description: </b>{product.description}</><br />
                    <span><b>Price:</b> ${product.price}</span> <br />
                    <span><b>Count in Stock:</b> {product.countInStock}</span>

                    </Card.Text>
                    <Button variant="primary">Go somewhere</Button>
                  </Card.Body>
                </Card>
              </Col>
            )
          })}
          </Row>
    </Container>
  )
}
export default App;
