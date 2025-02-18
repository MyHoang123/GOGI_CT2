
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faListUl } from '@fortawesome/free-solid-svg-icons';
import { Fragment, useRef, useState, memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listCategoris, listTypes } from '../reduxBody/BodySelector';
import { Link } from 'react-router-dom';
function Categoris({ cx }) {
    const categoris = useSelector(listCategoris)
    const types = useSelector(listTypes)
    const [Active, setActive] = useState(null)
    const [ActiveType, setActiveTye] = useState(null)
    const CheckCategori = useRef([])
    const CheckType = useRef([])
    const handleOnClickCategori = (cate) => {
        CheckCategori.current.forEach((element, index) => {
            if (index === cate) {
                element.classList.add(cx('active'))
                setActive(cate)
            }
            else {
                element.classList.remove(cx('active'))
            }
            if (cate === Active) {
                element.classList.remove(cx('active'))
                setActive(null)
            }
        });
    }
    const handleOnClickType = (type) => {
        CheckType.current.forEach((element, index) => {
            if (index === type) {
                element.classList.add(cx('active'))
                setActiveTye(type)
            }
            else {
                element.classList.remove(cx('active'))
            }
            if (type === ActiveType) {
                element.classList.remove(cx('active'))
                setActiveTye(null)
            }
        });
    }
    // useEffect(() => {
    //     dispatch(getCate())
    // },[])
    return (
        <div className={cx('Categoris_Container')}>
            <div className={cx('Categoris_Container_header')}>
                <FontAwesomeIcon className={cx('Categoris_Container_header-icon')} icon={faListUl} />
                <h2>DANH MỤC SẢN PHẨM</h2>
            </div>
            <div className={cx('Categoris_Container_header-body')}>
                <div className={cx('panel')}>
                    <label onClick={() => handleOnClickCategori(0)} className={cx('accordion')} htmlFor='Title_categori'>Gọi món</label>
                    <input className={cx('panel_title')} id='Title_categori' type='checkbox' />
                    <ul ref={e => CheckCategori.current[0] = e} className={cx('panel_item')}>
                        {categoris.map((cate) => (
                            <Fragment key={cate.Id}>
                                <li><Link to={`/${cate.Name}`}>
                                    {cate.Name}
                                </Link></li>
                            </Fragment>
                        ))}
                    </ul>
                </div>
                <div className={cx('panel')}>
                    <label onClick={() => handleOnClickCategori(1)} className={cx('accordion')} htmlFor='Title_categori'>Buffet</label>
                    <input className={cx('panel_title')} id='Title_categori' type='checkbox' />
                    <ul ref={e => CheckCategori.current[1] = e} className={cx('panel_item')}>
                        {Object.keys(types).map((key, i) => (
                            <div key={i} className={cx('panel')}>
                                <label onClick={() => handleOnClickType(i)} style={{ paddingLeft: '2vw' }} className={cx('accordion')} htmlFor='Title_categori'>{key}</label>
                                <input className={cx('panel_title')} id='Title_categori' type='checkbox' />
                                <ul ref={e => CheckType.current[i] = e} className={cx('panel_item')}>
                                    {types[key].map((cate, i) => (
                                        <Fragment key={i}>
                                            <li><Link to={`/${cate.NameCate}?type=${cate.IdType}&page=1`}>{cate.NameCate}</Link></li>
                                        </Fragment>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </ul>
                </div>
                <div className={cx('panel')}>
                    <Link to='/all?page=1' className={cx('accordion')} htmlFor='Title_categori'>Tất cả</Link>
                </div>
            </div>
        </div>
    );
}

export default memo(Categoris);