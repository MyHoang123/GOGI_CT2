import { createSelector } from "@reduxjs/toolkit";
const productsSelector = (state) => state.products.products
const categorisSelector = (state) => state.products.categoris.categori
const listTypeSelector = (state) => state.products.categoris.Type
const getCommentSelector = (state) => state.products.comment
const lenghtCardSelector = (state) => state.products.lenghtCard
const lenghtProductSelector = (state) => state.products.lenghtProduct
export const listProductSelectorAll = createSelector(productsSelector,lenghtProductSelector, (listProducts,lenght) => {
    let trang = Math.ceil(lenght / 8)
    return [listProducts.product,listProducts.page,trang]
})
export const lenghtProductSelect = createSelector(lenghtProductSelector, (lenght) => {
    return lenght
})
export const numPage =  createSelector(productsSelector,lenghtProductSelector, (listProducts,lenght) => {
    let trang = Math.ceil(lenght / 8)
    return [trang,listProducts.page]
})
export const listCategoris = createSelector(categorisSelector, (listCategoris) => {
    return listCategoris
})
export const listTypes = createSelector(listTypeSelector, (listTypeSelector) => {
    return listTypeSelector
})
export const listComment = createSelector(getCommentSelector, (listComment) => {
    return listComment
})
export const lenghtCard = createSelector(lenghtCardSelector, (lenghtCardSelector) => {
    return lenghtCardSelector
})