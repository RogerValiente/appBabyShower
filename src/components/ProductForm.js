import React, { useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';

const ProductForm = ({ onCreateProduct }) => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        price: 0,
        imgUrl: '',
        url: '',
        state: 'Disponible',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === "price") {
            setFormData((prevData) => ({
                ...prevData,
                [name]: parseInt(value, 10),
            }));
        } else {
            setFormData((prevData) => ({
                ...prevData,
                [name]: value,
            }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Validar que los campos obligatorios estén completos
        if (formData.title.trim() === '' || formData.price <= 0) {
            // Mostrar mensaje de error
            alert('Por favor, complete los campos obligatorios.');
            return;
        }

        // Llamar a la función para crear un nuevo producto
        onCreateProduct(formData);

        // Limpiar el formulario después de crear el producto
        setFormData({
            title: '',
            description: '',
            price: 0,
            imgUrl: '',
            url: '',
            state: 'Disponible',
        });
    };

    return (
        <Container className="mt-4">
            <Form onSubmit={handleSubmit} className="mx-auto" style={{ maxWidth: '50%' }}>
                <Form.Group controlId="title">
                    <Form.Label>Título</Form.Label>
                    <Form.Control
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group controlId="description">
                    <Form.Label>Descripción</Form.Label>
                    <Form.Control
                        type="text"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group controlId="price">
                    <Form.Label>Precio</Form.Label>
                    <Form.Control
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group controlId="imgUrl">
                    <Form.Label>URL de la imagen</Form.Label>
                    <Form.Control
                        type="text"
                        name="imgUrl"
                        value={formData.imgUrl}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group controlId="url">
                    <Form.Label>URL del producto</Form.Label>
                    <Form.Control
                        type="text"
                        name="url"
                        value={formData.url}
                        onChange={handleChange}
                    />
                </Form.Group>

                <Form.Group controlId="state">
                    <Form.Label>Estado</Form.Label>
                    <Form.Control
                        as="select"
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                    >
                        <option value="Disponible">Disponible</option>
                        <option value="Reservado">Reservado</option>
                    </Form.Control>
                </Form.Group>
                <Button className='mt-3' type="submit">Crear Producto</Button>
            </Form>
        </Container>
    );
};

export default ProductForm;
