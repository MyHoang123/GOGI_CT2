import { Fragment, memo } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom";
// import BodySlice from '../../components/Layout/DefaultLayout/Body/reduxBody/BodySlice';

function Pages({ cx, numPage, PageAll, Cate, Type }) {
    const handlePageChangeButton = (btn) => {
        if (btn === 0) {

        } else if (btn === 1) {


        }
    }
    const createPapge = () => {
        const ArrPage = []
        let prev = numPage - 1
        let next = numPage + 1
        if (numPage === 1) {
            next = next += 1
        }
        if (numPage === PageAll) {
            prev = prev + - 1
        }
        for (let i = 1; i <= PageAll; i++) {
            if (i >= prev && i <= next) {
                ArrPage.push(i)
            }
        }
        return ArrPage
    }
    const newArr = createPapge()
    if (newArr !== undefined) {
        return (
            <ul className={cx('Products_Container_page-list')}>
                <li onClick={() => handlePageChangeButton(0)}><FontAwesomeIcon icon={faChevronLeft} /></li>
                {newArr.map((page) => (
                    <Fragment key={page}>
                        <li>
                            <Link to={`/${Cate !== undefined ? Cate : 'all'}?page=${page}${Type !== null ? `&type=${Type}` : ''}`} className={page === numPage ? cx('active') : null}>{page}</Link>
                        </li>
                    </Fragment>
                ))}
                <li onClick={() => handlePageChangeButton(1)}><FontAwesomeIcon icon={faChevronRight} /></li>
            </ul>
        )
    }
}
export default memo(Pages)