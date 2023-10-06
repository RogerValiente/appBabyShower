import React, { useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import { supabase } from '../supabase/client'

export const EditProductModal = ({ isOpen, onClose, product, onUpdateProduct }) => {
    const [editedProductData, setEditedProductData] = useState({ ...product });

    const handleSave = async () => {
        // Realiza la actualización en Supabase con los datos editados
        try {
            const { data, error } = await supabase
                .from('products')
                .update([
                    {
                        id: editedProductData.id,
                        title: editedProductData.title,
                        description: editedProductData.description,
                        price: editedProductData.price,
                        imgUrl: editedProductData.imgUrl,
                        url: editedProductData.url,
                        state: editedProductData.state,
                    },
                ]);

            if (error) {
                console.error('Error al actualizar en la base de datos:', error);
                return;
            }

            // Actualiza la lista de productos
            onUpdateProduct(data[0]);

            // Cierra el modal de edición
            onClose();
        } catch (error) {
            console.error('Error al actualizar en la base de datos:', error);
        }
    };

    return (
        <Modal show={isOpen} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>Editar Producto</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="editTitle">
                        <Form.Label>Título</Form.Label>
                        <Form.Control
                            type="text"
                            value={editedProductData.title}
                            onChange={(e) =>
                                setEditedProductData({
                                    ...editedProductData,
                                    title: e.target.value,
                                })
                            }
                        />
                    </Form.Group>
                    {/* Resto de campos de edición aquí */}
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>
                    Cerrar
                </Button>
                <Button variant="primary" onClick={handleSave}>
                    Guardar Cambios
                </Button>
            </Modal.Footer>
        </Modal>
    );
};
