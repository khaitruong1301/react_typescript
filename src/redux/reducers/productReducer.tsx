//rxslice
import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { DispatchType } from '../store';
import type { RootState } from '@reduxjs/toolkit/query';
import { httClientStoreApi } from '../../util/setting';

export interface ProductModel {
    sizes: number[];
    id: number;
    name: string;
    alias: string;
    price: number;
    description: string;
    size: string;
    shortDescription: string;
    quantity: number;
    deleted: boolean;
    categories: string;
    relatedProducts: string;
    feature: boolean;
    image: string;
    imgLink: string;
}

export interface ProductDetailModel {
    id: number;
    name: string;
    alias: string;
    price: number;
    feature: boolean;
    description: string;
    size: string[];
    shortDescription: string;
    quantity: number;
    detaildetailedImages: string[];
    image: string;
    imgLink: string;
    categories: CategoryModel[];
    relatedProducts: RelatedProductModel[];
}
export interface CategoryModel {
    id: string;
    category: string;
}

export interface RelatedProductModel {
    id: number;
    name: string;
    alias: string;
    feature: boolean;
    price: number;
    description: string;
    shortDescription: string;
    image: string;
    imgLink: null;
}



interface ProductState {
    arrProduct: ProductModel[],
    productDetail: ProductDetailModel | null
}
const initialState: ProductState = {
    arrProduct: [],
    productDetail: null
}

const productReducer = createSlice({
    name: 'productReducer',
    initialState,
    reducers: {
        setArrayProductAction: (state: ProductState, action: PayloadAction<ProductModel[]>) => {
            state.arrProduct = action.payload;
        },
        setProductDetailAction: (state:ProductState,action:PayloadAction<ProductDetailModel>) => {
            state.productDetail = action.payload;
        }
    }
});

export const { setArrayProductAction ,setProductDetailAction} = productReducer.actions

export default productReducer.reducer

//Action thunk call api
export const getAllProductApiThunk = () => {

    return async (dispatch: DispatchType) => {
        try {
            const res = await httClientStoreApi.get('/product');
            //Sau khi lấy dữ liệu từ api => action payload dispatch lên reducer
            const actionPayload: PayloadAction<ProductModel[]> = setArrayProductAction(res.data.content);
            dispatch(actionPayload);
        } catch (err) {
            console.log(err);
        }

    }
}

export const getProductDetailApiThunk = (id:string | undefined) =>{
    return async (dispatch:DispatchType) => {
        try {
            const res = await httClientStoreApi.get(`/Product/getbyid?id=${id}`);
            const actionPayload = setProductDetailAction(res.data.content);
            dispatch(actionPayload);
        }catch(err) {
            console.log(err)
        }
    }
} 

