import { Col, Card, Button } from "react-bootstrap";

const cardStyle = {
  width: "100%",
  height: "100%",
  display: "flex",
  flexDirection: "column",
};

const imageStyle = {
  maxWidth: "100%",
  maxHeight: "200px",
};

export const ProductCard = ({ title, description, imgUrl, url, price, state, onReserve }) => {
  return (
    <Col xs={12} sm={6} md={6} lg={4} xl={3} className="mb-4">
      <Card style={cardStyle}>
        <Card.Img variant="top" src={imgUrl} style={imageStyle} />
        <Card.Body>
          <Card.Title className="text-black">{title}</Card.Title>
          <span className="text-black-50 mb-2">{description}</span>
          <div className="mt-2">
            <span className="text-dark fw-bold">Precio: </span>
            <span className="text-black-50 fw-bold ms-2"> $ {price.toLocaleString()}</span>
          </div>
        </Card.Body>
        <Card.Footer>
          <div className="d-flex justify-content-center mt-2">
            {state !== "Disponible" ? (
              <>
                <div className="d-flex flex-column align-items-center justify-content-center">
                  <a href={url} target="_blank" rel="noopener noreferrer">
                    <Button className="m-1 btn btn-warning">Ir al comercio</Button>
                  </a>
                  <Button className="m-1 btn btn-info" disabled>{state}</Button>
                </div>

              </>
            ) : (
              <>
                <a href={url} target="_blank" rel="noopener noreferrer">
                  <Button className="m-1 btn btn-warning">Ir al comercio</Button>
                </a>
                <Button className="m-1 btn btn-primary" onClick={onReserve}>Reservar</Button>
              </>
            )}
          </div>
        </Card.Footer>
      </Card>
    </Col>
  )
}
