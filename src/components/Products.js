import React, { useEffect, useState } from "react";
import { Container, Row, Col, Tab } from "react-bootstrap";
import { ProductCard } from "./ProductCard";
import 'animate.css';
import TrackVisibility from 'react-on-screen';
import ProductForm from './ProductForm';
import Swal from 'sweetalert2';
import { supabase } from '../supabase/client';

export const Products = () => {
  const [products, setProducts] = useState([]);
  const [sortOption, setSortOption] = useState("default");
  const [showForm, setShowForm] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const productsCollections = supabase.from('products');

  const createProduct = async (newProductData) => {
    try {
      const { data, error } = await productsCollections.insert([
        {
          ...newProductData,
        },
      ]);
      if (error) {
        console.error('Error al crear el producto:', error);
        return;
      }

      const createdProduct = data[0];
      setProducts((prevProducts) => [...prevProducts, createdProduct]);
    } catch (error) {
      console.error('Error al crear el producto:', error);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      try {
        const { data: productsData, error } = await supabase
          .from('products')
          .select('*')
          .order('state', { ascending: false });

        if (error) {
          console.error('Error fetching data:', error);
          setIsLoading(false);
          return;
        }

        let sortedProducts = [...productsData];

        if (sortOption === "default") {
          sortedProducts.sort((a, b) => {
            if (a.state === "Disponible" && b.state !== "Disponible") {
              return -1;
            } else if (a.state !== "Disponible" && b.state === "Disponible") {
              return 1;
            } else {
              return 0;
            }
          });
        } else if (sortOption === "alphabetical") {
          sortedProducts.sort((a, b) => a.title.localeCompare(b.title));
        } else if (sortOption === "priceMenor") {
          sortedProducts.sort((a, b) => a.price - b.price);
        } else if (sortOption === "priceMayor") {
          sortedProducts.sort((a, b) => b.price - a.price);
        }

        setProducts(sortedProducts);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setIsLoading(false);
        return;
      }
    };

    fetchData();
  }, [sortOption]);

  const handleSortChange = (e) => {
    const newSortOption = e.target.value;
    setSortOption(newSortOption);
  };

  const postUpdateProducts = async (id) => {
    Swal.fire({
      title: 'Confirmar Reserva',
      html: `
        <p>¿Está seguro de que desea reservar este producto?</p>
        <input type="text" id="username" class="swal2-input" placeholder="Ingrese un alias">
      `,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar',
      preConfirm: async () => {
        try {
          const username = Swal.getPopup().querySelector('#username').value;
          if (!username) {
            throw new Error('Por favor, ingrese un alias o nombre');
          }
          setIsLoading(true);
          const { error } = await supabase
            .from('products')
            .update({ state: `Reservado por: ${username}` })
            .match({ id: id });

          if (error) {
            console.error('Error al actualizar en la base de datos:', error);
            setIsLoading(false);
            throw new Error('Error al actualizar en la base de datos');
          }
          const updatedProducts = products.map((product) => {
            if (product.id === id) {
              return { ...product, state: `Reservado por: ${username}` };
            }
            return product;
          });
          setProducts(updatedProducts);
          setIsLoading(false);

          Swal.fire('Reservado', `El producto ha sido reservado por ${username}, con éxito`, 'success');
        } catch (error) {
          console.error('Error en la confirmación:', error);
          Swal.showValidationMessage(error.message);
        }
      }
    });
  };

  const handleShowFormClick = () => {
    Swal.fire({
      title: 'Ingrese la contraseña',
      input: 'password',
      inputAttributes: {
        autocapitalize: 'off'
      },
      showCancelButton: true,
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar',
      preConfirm: async (password) => {
        const enteredPasswordBase64 = btoa(unescape(encodeURIComponent(password)));
        console.log(enteredPasswordBase64)
        if (enteredPasswordBase64 === 'U2FtdWVsMjAyMw==') {
          setShowForm(true);
        } else {
          Swal.showValidationMessage('Contraseña incorrecta');
        }
      }
    });
  };

  return (
    <section className="project" id="projects">
      <Container>
        {isLoading ? <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Cargando...</span>
          </div>
        </div> :
          <Row>
            <Col size={12}>
              <TrackVisibility>
                {({ isVisible }) =>
                  <div className={isVisible ? "animate__animated animate__fadeIn" : ""}>
                    <h2 style={{ marginTop: '-60px' }}>Lista De Regalos</h2>
                    <Tab.Container id="projects-tabs" defaultActiveKey="first">
                      <Tab.Content id="slideInUp" className={isVisible ? "animate__animated animate__slideInUp" : ""}>
                        <Tab.Pane eventKey="first" style={{ marginTop: '20px' }}>
                          {showForm ? (
                            <ProductForm onCreateProduct={createProduct} />
                          ) : (
                            <div>
                              <button onClick={handleShowFormClick} className="btn btn-sm-light">
                                Mostrar formulario
                              </button>
                            </div>
                          )}
                          <Container>
                            <div className="d-flex  justify-content-end mb-5">
                              <select className="form-select w-100 mt-3 w-auto" value={sortOption} onChange={handleSortChange}>
                                <option value="default">Ordenar por...</option>
                                <option value="alphabetical">A-Z</option>
                                <option value="priceMenor">Precio (Menor a Mayor)</option>
                                <option value="priceMayor">Precio (Mayor a Menor)</option>
                              </select>
                            </div>
                            <Row>
                              {
                                products.map((item) => {
                                  return (
                                    <ProductCard
                                      key={item.id}
                                      {...item}
                                      onReserve={() => postUpdateProducts(item.id)}
                                    />
                                  )
                                })
                              }
                            </Row>
                          </Container>
                        </Tab.Pane>
                        <Tab.Pane eventKey="section">
                          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque quam, quod neque provident velit, rem explicabo excepturi id illo molestiae blanditiis, eligendi dicta officiis asperiores delectus quasi inventore debitis quo.</p>
                        </Tab.Pane>
                        <Tab.Pane eventKey="third">
                          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque quam, quod neque provident velit, rem explicabo excepturi id illo molestiae blanditiis, eligendi dicta officiis asperiores delectus quasi inventore debitis quo.</p>
                        </Tab.Pane>
                      </Tab.Content>
                    </Tab.Container>
                  </div>}
              </TrackVisibility>
            </Col>
          </Row>
        }

        {/* <EditProductModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          product={selectedProductForEdit}
          onUpdateProduct={(updatedProduct) => {
            // Actualiza la lista de productos con el producto actualizado
            const updatedProducts = products.map((product) =>
              product.id === updatedProduct.id ? updatedProduct : product
            );
            setProducts(updatedProducts);
          }}
        /> */}

      </Container >
    </section >
  )
}
