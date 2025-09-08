import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import type { DispatchType, RootState } from '../redux/store';
import { getAllProductApiThunk, type ProductModel } from '../redux/reducers/productReducer';
import CardProduct from '../components/CardProduct';

type Props = {}

const Home = (props: Props) => {

    const { arrProduct } = useSelector((state: RootState) => state.productReducer);
    const dispatch: DispatchType = useDispatch();

    const getAllProductApi = () => {
        const actionThunk = getAllProductApiThunk();
        dispatch(actionThunk);
    }
    useEffect(() => {
        getAllProductApi();
    }, [])

    return (
        <div className='container'>
            <h1>Product list</h1>
            <div className='row'>
                {arrProduct.map((item: ProductModel, index) => {
                    return <div  className='col-3 mt-2' key={index} >
                        <CardProduct productModel={item} />
                    </div>
                })}
            </div>

        </div>
    )
}

export default Home