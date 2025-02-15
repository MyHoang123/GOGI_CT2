import { lazy } from "react";
// import DefaultLayout from "~/components/Layout/DefaultLayout";
// import LoginLayout from "~/components/Layout/LoginLayout";
// import CardLayout from "~/components/Layout/CardLayout";
// import PurchaseLayout from "~/components/Layout/PurchaseLayout";
// import ModalAuthen from "~/pages/ModalAuthen";
// import Purchase from "~/pages/Purchase";
// import DetailBill from "~/pages/DetailBill";
// import User from "~/pages/User"
// import OTPAuthen from "~/pages/ModalAuthen/Authen.js"
const DefaultLayout = lazy(() => import('~/components/Layout/DefaultLayout'))
const PurchaseLayout = lazy(() => import('~/components/Layout/PurchaseLayout'))   
const LoginLayout = lazy(() => import('~/components/Layout/LoginLayout'))   
const CardLayout = lazy(() => import('~/components/Layout/CardLayout'))
const ModalAuthen = lazy(() => import('~/pages/ModalAuthen'))
const Purchase = lazy(() => import('~/pages/Purchase'))
const DetailBill = lazy(() => import('~/pages/DetailBill'))
const OTPAuthen = lazy(() => import('~/pages/ModalAuthen/Authen.js'))
const User = lazy(() => import('~/pages/User'))




const publicRoutes = [
    {path: '/user', component: User, layout: PurchaseLayout ,},
    {path: '/login', component: ModalAuthen, layout: LoginLayout ,},
    {path: '/login/OTPAuthen', component: OTPAuthen, layout: LoginLayout ,},
    {path: '/purchase', component: Purchase, layout: PurchaseLayout ,},
    {path: '/purchase/detail/:IdBill', component: DetailBill, layout: PurchaseLayout ,},
    {path: '/card', component: null, layout: CardLayout ,},
    {path: '/', component: null, layout: DefaultLayout ,},
]
export { publicRoutes }