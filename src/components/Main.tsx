import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/Main.css"; // Assicurati di avere un file CSS per gli stili personalizzati
import { useNavigate } from "react-router-dom";

const Main: React.FC = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/ingredients");
  };
  return (
    <div className="main-container container mt-5">
      <Container>
        <Row className="text-center my-5">
          <Col>
            <h1 className="main-heading text-white">Welcome to Our Recipe App</h1>
            <p className="main-subheading">Explore a variety of recipes and discover new favorites.</p>
            <Button variant="primary" className="btn-main" onClick={() => handleClick()}>
              Get Started
            </Button>
          </Col>
        </Row>
        <Row className="my-5">
          <Col md={4} className="text-center">
            <div className="icon-container">
              <i className="fas fa-utensils fa-3x mb-3"></i>
              <h3>Delicious Recipes</h3>
              <p>Find recipes that suit your taste and dietary preferences.</p>
            </div>
          </Col>
          <Col md={4} className="text-center">
            <div className="icon-container">
              <i className="fas fa-search fa-3x mb-3"></i>
              <h3>Easy Search</h3>
              <p>Use our search functionality to quickly find what you’re looking for.</p>
            </div>
          </Col>
          <Col md={4} className="text-center">
            <div className="icon-container">
              <i className="fas fa-star fa-3x mb-3"></i>
              <h3>Rating & Reviews</h3>
              <p>Rate and review recipes to help others make their choice.</p>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Main;
