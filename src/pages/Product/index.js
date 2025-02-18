import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faHeart } from '@fortawesome/free-solid-svg-icons';
import { useSelector, useDispatch } from "react-redux";
import { RenderStar } from '~/hooks';
import { Cookies } from 'react-cookie';
import { listProductSelectorAll } from '../../components/Layout/DefaultLayout/Body/reduxBody/BodySelector';
import { filterCategoris, getComment, addCard } from '../../components/Layout/DefaultLayout/Body/reduxBody/BodySlice';
import { Fragment, memo, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { useRef } from 'react';
import DetailProduct from "./detailProduct";

import Pages from './Pages'
import styles from './Products.module.scss'
import classNames from "classnames/bind"
const cx = classNames.bind(styles)

function ProductPage() {

    const { Categori } = useParams()
    const location = useLocation();
    const cookies = new Cookies()
    const navigate = useNavigate()
    const params = new URLSearchParams(location.search)
    const type = params.get('type')
    const page = params.get('page')
    const dispatch = useDispatch()
    const ModalDetail = useRef()
    const ALLStar = useRef()
    const productAll = useSelector(listProductSelectorAll)
    const handleClickShowDetail = (Id, Star) => {
        dispatch(getComment(Id))
        ModalDetail.current.classList.add(cx('active'))
        ALLStar.current.innerText = `${Star !== null ? Star : 0}/5`
    }
    const handleClickAddCard = (Id) => {
        if (cookies.get('AccessToken') !== undefined) {
            const Product = {
                IdProduct: Id,
                token: cookies.get('AccessToken')
            }
            dispatch(addCard(Product))
        } else {
            navigate('/login')
        }
    }
    useEffect(() => {
        if (Categori !== undefined) {
            type === null ? dispatch(filterCategoris({ Cate: Categori, IdType: null, Page: page !== null ? page : 1 })) : dispatch(filterCategoris({ Cate: Categori, IdType: type, Page: page !== null ? page : 1 }))
        }
    }, [Categori, page, type])
    return (
        <Fragment>
            <div className={cx('Products_Container_contain')}>
                {productAll[0].map((product) => (
                    (product.Status === 'visible' ? (
                        <div key={product.Id} className={cx('card')}>
                            <div className={cx('image-container')}>
                                <img loading='lazy' src={`${process.env.REACT_APP_CALL_API}/api/v12/showimgproduct/${product.Img}`} />
                            </div>
                            <FontAwesomeIcon className={cx('heart_product')} icon={faHeart} />
                            <div className={cx('content')}>
                                <div className={cx('brand')}>{product.Name}</div>
                                <div className={cx('color-size-container')}>
                                    <div className={cx('colors')}>
                                        <ul className={cx('colors-container')}>
                                            <span>Giá:</span>
                                            <span className={cx('price_product')}>{product.Price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.') + '₫'}</span>
                                        </ul>
                                    </div>
                                    <div className={cx('sizes')}>
                                        <span className={cx('title_cate')}>LOẠI</span>
                                        <div className={cx('size-container')}>
                                            <span className={cx('name')}>{product.NameCate}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className={cx('rating')}>
                                    <RenderStar Star={product.Star} />
                                    <span className={cx('sales')}>đã bán {product.Sales}</span>
                                </div>
                            </div>
                            {product.Visible === 1 ? (
                                <div className={cx('button-container')}>
                                    <button onClick={() => handleClickShowDetail(product.Id, product.Star)} className={cx('detailproduct_button')}>Xem đánh giá</button>
                                    <button onClick={() => handleClickAddCard(product.Id)} className={cx('cart-button', 'button')}>
                                        <FontAwesomeIcon className={cx('cart_icon')} icon={faCartShopping} />
                                    </button>
                                </div>
                            ) : (
                                <div className={cx('container_product_off')}><span>Hết món</span></div>
                            )}
                        </div>
                    ) : null)
                ))}
            </div>
            <div className={cx('Container_page')}>
                <Pages cx={cx} numPage={page !== null ? parseInt(page) : 1} PageAll={productAll[2]} Cate={Categori} Type={type} />
            </div>
            <DetailProduct ModalDetail={ModalDetail} ALLStar={ALLStar} />
        </Fragment>
    );
}

export default memo(ProductPage);