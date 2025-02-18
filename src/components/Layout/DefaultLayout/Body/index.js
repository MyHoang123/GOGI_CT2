
import { memo } from "react";
import { MemoizedHeaderBody, MemoizedLogoResource } from "./HeaderBody";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from "react-redux";
import Categoris from "./products/Categories";
import BodySlice from "./reduxBody/BodySlice";

import SlideImgPage from "./SlideImgPage";
import PageNews from "./PageNews";
import classNames from "classnames/bind";
import styles from "./BodyLayout.module.scss";
const cx = classNames.bind(styles);
function Body({ Animation, Children }) {
    const dispatch = useDispatch()
    const hanldeClickRanDom = () => {
        dispatch(BodySlice.actions.randomProduct())
    }
    const handleClickNewProduct = () => {
        dispatch(BodySlice.actions.newProduct())
    }
    const handleClickMinProduct = () => {
        dispatch(BodySlice.actions.minProduct())
    }
    const handleClickMaxProduct = () => {
        dispatch(BodySlice.actions.maxProduct())
    }
    return (
        <div ref={e => Animation.current[1] = e} className={cx('Body_container')}>
            <MemoizedHeaderBody cx={cx} />
            <div className={cx('Body_container_contain')}>
                <div className={cx('Body_container_contain_categories')}>
                    <Categoris cx={cx} />
                </div>
                <div className={cx('Body_container_contain_products')}>
                    <div className={cx('Products_Container_header')}>
                        <h2>SẢN PHẨM NỔI BẬT</h2>
                        <div className={cx('Products_Container_header-filter')}>
                            <div className={cx('group')}>
                                <FontAwesomeIcon className={cx('icon')} icon={faMagnifyingGlass} />
                                <input className={cx('input')} type="text" placeholder="Search" />
                                <div className={cx('load_contain')}>
                                    <FontAwesomeIcon className={cx('icon_load')} icon={faSpinner} />
                                </div>
                            </div>
                        </div>
                        <div className={cx('Products_Container_header_button')}>
                            <button className={cx('Products_Container_header_button_icon')} onClick={hanldeClickRanDom}>Ngẫu nhiên</button>
                            <button className={cx('Products_Container_header_button_icon')} onClick={handleClickNewProduct}>Mới nhất</button>
                            <button className={cx('Products_Container_header_button_icon')} onClick={handleClickMinProduct}>Giá thấp</button>
                            <button className={cx('Products_Container_header_button_icon')} onClick={handleClickMaxProduct}>Giá cao</button>
                        </div>
                    </div>
                    {Children}
                </div>
            </div>
            <SlideImgPage cx={cx} />
            <MemoizedLogoResource cx={cx} />
            <PageNews cx={cx} />
        </div>
    );
}

export default memo(Body);