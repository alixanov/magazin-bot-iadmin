import React, { useState } from 'react';
import './add.css';
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';
import axios from "axios"
import { useForm } from 'react-hook-form';
const Add = ({ onClose }) => {
  const { register, handleSubmit, reset } = useForm()



  const notyf = new Notyf({
    position: {
      x: 'center',
      y: 'top',
    },
  });



  function send(data) {
    console.log(data);
    data.nechtaqolgani = Number(data.nechtaqolgani);
    data.price = Number(data.price);
    axios.post("https://magazin-bot-backend.vercel.app/api/add/admin", data)
      .then(res => {
        notyf.success("Готово! Продукт теперь в каталоге.");
        onClose();
        window.location.reload();
      })
      .catch(err => {
        console.log(err);
        notyf.error("Ошибка при отправке данных");
      });
  }

  return (
    <div className='modal'>
      <div className="modal-content">
        <span className='close' onClick={onClose}>&times;</span>
        <form onSubmit={handleSubmit(send)} className='form'>
          <input

            {...register("titleProduct")}
            type="text"
            placeholder='Общий название продукта *'
            required
          />
          <input

            {...register("swiperuchun")}
            type="text"
            placeholder='Икон для слайдера URL *'
            required
          />
          <input

            {...register("img")}
            type="text"
            placeholder='Добавить URL изображения'
          />


          <input

            {...register("nameproduct")}
            type="text"
            placeholder='Главная название продукта *'
            required
          />
          <input
            {...register("price")}
            type="number"
            placeholder='Цена *'
            required
          />
          <textarea
            placeholder='Информация о продукте *'
            required
            {...register("productinfo")}
          />
          <input
            {...register("nechtaqolgani")}
            type="number"
            placeholder='Количество оставшихся *'
            required
          />
          <button type="submit">Отправка данных</button>
        </form>
      </div>
    </div>
  );
};

export default Add;
