import React from 'react'
import type { ProductModel, RelatedProductModel } from '../redux/reducers/productReducer'
import { NavLink } from 'react-router-dom'

type Props = {
    productModel: ProductModel | RelatedProductModel | Partial<ProductModel>
}

const CardProduct = ({productModel}: Props) => {

  return (
    <div className='card'>
        <img src={productModel.image} alt='...' />
        <div className='card-body'>
            <h3>{productModel.name}</h3>
            <p>{productModel.price}</p>
            <NavLink to={`/detail/${productModel.id}`} className={'btn btn-dark'}>Detail</NavLink>
        </div>
    </div>
  )
}

export default CardProduct