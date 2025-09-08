
import React, { useEffect, useState, type ReactElement } from 'react'
import type { DispatchType, RootState } from '../redux/store'
import { useDispatch, useSelector } from 'react-redux';
import { useParams, type Params } from 'react-router-dom';
import {getProductDetailApiThunk, type RelatedProductModel} from '../redux/reducers/productReducer';
import CardProduct from '../components/CardProduct';
type Props = {}

const Detail = (props: Props) => {
  const prodDetail = useSelector((state:RootState)=> state.productReducer.productDetail);
  const [rotateDeg,setRotateDeg] = useState<string>('rotate(0deg)');
  const params = useParams<{id:string | undefined}>();
  const dispatch:DispatchType = useDispatch();
  const getProductDetailApi = async () => {
    const actionThunk = getProductDetailApiThunk(params.id);
    dispatch(actionThunk);
  }

  useEffect(()=>{
    getProductDetailApi();
  },[params.id]);

  return (
    <div className='container'>
      DemoUseParam
      paramID: {params.id}
      <div className="container py-4">
        <div className="row">
          {/* Sidebar images */}
          <div className="col-1 d-flex flex-column align-items-center gap-2">
            {prodDetail?.detaildetailedImages?.map((item, index) => {
              return <div className='border' key={index} style={{cursor:'pointer'}} onClick={()=>{
                setRotateDeg(item);
              }}>
                <img src={prodDetail.image} className="img-fluid  rounded" alt="thumb1" style={{ transform: item }} />
              </div>
            })}


          </div>
          {/* Main image */}
          <div className="col-6">
            <div className="bg-light d-flex align-items-center justify-content-center" style={{ height: '420px', position: 'relative' }}>
              <img style={{transform:rotateDeg}} src={prodDetail?.image} className="img-fluid" alt="main" />
              <button className="btn btn-light position-absolute" style={{ bottom: 10, left: '45%' }}>&lt;</button>
              <button className="btn btn-light position-absolute" style={{ bottom: 10, left: '50%' }}>&gt;</button>
            </div>
          </div>
          {/* Product info */}
          <div className="col-5">
            <h6 className="mb-1 fs-1">{prodDetail?.name?.toUpperCase()}</h6>
            <div className="text-muted small mb-1">{prodDetail?.shortDescription}</div>
            <div className="mb-3 fw-bold">{prodDetail?.price}$</div>
            {/* Color options */}
            <div className="d-flex gap-2 mb-3">
              <img src="https://dummyimage.com/50/f00e38/0011ff" className="img-thumbnail border-2 border-dark" alt="color1" />
              <img src="https://dummyimage.com/50/09eb8d/0011ff" className="img-thumbnail" alt="color2" />
              <img src="https://dummyimage.com/50/09eeee/e4f222" className="img-thumbnail" alt="color3" />
            </div>
            {/* Size selection */}
            <div className="d-flex justify-content-between align-items-center mb-2">
              <span>Select Size</span>
              <span className="text-decoration-underline small" style={{ cursor: 'pointer' }}>Size Guide</span>
            </div>
            <div className="row g-2 mb-3">
              {prodDetail?.size?.map((item, index) => {
                return <div className="col-4"><button className="btn btn-outline-secondary w-100" key={index}>EU {item}</button></div>

              })}

            </div>
            {/* Add to bag & Favourite */}
            <button className="btn btn-dark w-100 mb-2">Add to Bag</button>
            <button className="btn btn-outline-secondary w-100 mb-3">Favourite <span className="ms-1">&#9825;</span></button>
            {/* Description */}
            <div className="mb-2 small">
              Comfortable, durable and timeless—it's number one for a reason. This AF-1 pairs crisp leather with mini metal accents to create a clean, classic look.
            </div>
            <ul className="small">
              <li>Colour Shown: White/Metallic Gold/Black</li>
              <li>Style: IB6543-101</li>
              <li>Country/Region of Origin: China</li>
            </ul>
            <div className="small text-decoration-underline mb-3" style={{ cursor: 'pointer' }}>View Product Details</div>
            {/* Delivery & Reviews */}
            <div className="fw-bold mb-2">Free Delivery and Returns <span className="float-end">&#8964;</span></div>
            <div className="fw-bold mb-2">Reviews (0) <span className="ms-2 text-warning">&#9733;&#9733;&#9733;&#9733;&#9733;</span></div>
          </div>
        </div>
      </div>
      <h3 className='mt-2 fs-1'>Related Products</h3>
      <div className='row mt-2'>
        {prodDetail?.relatedProducts?.map((item:RelatedProductModel, index) => {
          return <div className='col-4 mt-2' key={index}>
            <CardProduct productModel={item} />
          </div>
        })}
      </div>

    </div>
  )
}

export default Detail


//React.FC: (props)=> jsx, ReactElement: jsx <thẻ jsx>




