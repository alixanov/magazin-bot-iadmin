import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import "./card.css";
import DeleteIcon from '@mui/icons-material/Delete';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import CircularProgress from '@mui/material/CircularProgress';
import Navbar from "../navbar/Navbar"
import { Box, Button, Modal, TextField } from '@mui/material';

const App = () => {
  const [data, setData] = useState([]);
  const [deleteState, setDeleteState] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const [open, setOpen] = useState(false);
  const { register, handleSubmit, setValue } = useForm(); // Подключаем react-hook-form

  useEffect(() => {
    axios.get('https://magazin-bot-backend.vercel.app/api/getall')
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error('Ошибка при получении данных:', error);
      });
  }, [deleteState]);

  const handleDelete = (id) => {
    setIsLoading(true);
    axios.delete(`https://magazin-bot-backend.vercel.app/api/delete/${id}`)
      .then(res => {
        setIsLoading(false);
        setDeleteState(prev => !prev);
      })
      .catch(error => {
        console.error("Ошибка при удалении продукта:", error);
        setIsLoading(false);
      });
  };

  const handleEdit = (product) => {
    setEditProduct(product);
    setOpen(true);

    // Устанавливаем значения формы для редактирования
    setValue("titleProduct", product.titleProduct);
    setValue("swiperuchun", product.swiperuchun);
    setValue("img", product.img);
    setValue("nameproduct", product.nameproduct);
    setValue("price", product.price);
    setValue("productinfo", product.productinfo);
    setValue("nechtaqolgani", product.nechtaqolgani);
  };

  const handleCloseModal = () => {
    setOpen(false);
  };

  const handleUpdate = (updatedProduct) => {
    axios.put(`https://magazin-bot-backend.vercel.app/api/update/${editProduct._id}`, updatedProduct)
      .then(response => {
        setOpen(false);
        setDeleteState(prev => !prev);
      })
      .catch(error => {
        console.error('Ошибка при обновлении продукта:', error);
      });
  };

  return (
    <div className="big__card">
      <Navbar/>
      <hr />
      <div className='card'>
        {data.map((item, index) => (
          <div className="box" key={index}>
            <img src={item.img} alt={item.nameproduct} className="product-image" />
            <div className="title__map">
              <img src={item.swiperuchun} alt="" />
              <p>{item.titleProduct}</p>
            </div>
            <p>{item.nameproduct}</p>
            <h5>{item.productinfo}</h5>
            <h4>{item.nechtaqolgani} количество</h4>
            <span>{item.price} $</span>
            <div className="delete__create" style={{ display: 'flex', alignItems: "center", gap: "4px" }}>
              <button onClick={() => handleDelete(item._id)} disabled={isLoading}>
                {isLoading ? <CircularProgress size={20} /> : 'Удалить'}
                {!isLoading && <DeleteIcon sx={{ color: "crimson", cursor: 'pointer' }} />}
              </button>
              <button onClick={() => handleEdit(item)}>
                Изменить
                <BorderColorIcon sx={{ color: "lightgreen", cursor: 'pointer' }} />
              </button>
            </div>
          </div>
        ))}

        {open && (
          <Modal open={open} onClose={handleCloseModal}>
            <Box className='modal-content' sx={{ p: 4, backgroundColor: '#fff', borderRadius: 2 }}>
              <form onSubmit={handleSubmit(handleUpdate)}>
                <TextField
                  {...register("titleProduct")}
                  label="Общее название продукта *"
                  fullWidth
                  margin="normal"
                  required
                />
                <TextField
                  {...register("swiperuchun")}
                  label="Иконка для слайдера URL *"
                  fullWidth
                  margin="normal"
                  required
                />
                <TextField
                  {...register("img")}
                  label="Добавить URL изображения"
                  fullWidth
                  margin="normal"
                />
                <TextField
                  {...register("nameproduct")}
                  label="Главное название продукта *"
                  fullWidth
                  margin="normal"
                  required
                />
                <TextField
                  {...register("price")}
                  label="Цена *"
                  type="number"
                  fullWidth
                  margin="normal"
                  required
                />
                <TextField
                  {...register("productinfo")}
                  label="Информация о продукте *"
                  fullWidth
                  margin="normal"
                  multiline
                  rows={4}
                  required
                />
                <TextField
                  {...register("nechtaqolgani")}
                  label="Количество оставшихся *"
                  type="number"
                  fullWidth
                  margin="normal"
                  required
                />
                <Button type="submit" variant="contained" color="primary" fullWidth>
                  Отправить данные
                </Button>
              </form>
            </Box>
          </Modal>
        )}
      </div>
 </div>
  );
};

export default App;
