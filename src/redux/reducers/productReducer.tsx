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




// {
//     "id": 1,
//     "name": "vans black",
//     "alias": "vans-black-black",
//     "price": 200,
//     "feature": false,
//     "description": "about this shoe:Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. ",
//     "size": [
//       "32",
//       "33",
//       "34",
//       "35"
//     ],
//     "shortDescription": "about this shoe:Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
//     "quantity": 100,
//     "detaildetailedImages": [
//       "rotate(0deg)",
//       "rotateY(180deg)",
//       "rotate(45deg)",
//       "rotate(-45deg)"
//     ],
//     "image": "https://apistore.cybersoft.edu.vn/images/vans-black-black.png",
//     "imgLink": "vans-black-black.png",
//     "categories": [
//       {
//         "id": "VANS_CONVERSE",
//         "category": "VANS_CONVERSE"
//       }
//     ],
//     "relatedProducts": [
//       {
//         "id": 2,
//         "name": "vans old school",
//         "alias": "vans-old-school",
//         "feature": false,
//         "price": 200,
//         "description": "about this shoe:Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. ",
//         "shortDescription": "about this shoe:Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
//         "image": "https://apistore.cybersoft.edu.vn/images/van-old-school.png",
//         "imgLink": null
//       },
//       {
//         "id": 3,
//         "name": "converse chuck taylor",
//         "alias": "converse-chuck-taylor",
//         "feature": false,
//         "price": 250,
//         "description": "about this shoe:Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. ",
//         "shortDescription": "about this shoe:Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
//         "image": "https://apistore.cybersoft.edu.vn/images/converse-chuck-taylor.png",
//         "imgLink": null
//       },
//       {
//         "id": 1,
//         "name": "vans black",
//         "alias": "vans-black-black",
//         "feature": false,
//         "price": 200,
//         "description": "about this shoe:Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. ",
//         "shortDescription": "about this shoe:Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
//         "image": "https://apistore.cybersoft.edu.vn/images/vans-black-black.png",
//         "imgLink": null
//       }
//     ]
//   }
