import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'
import { OpenLoading, CloseLoading } from "~/hooks/Loading";
const BodySlice = createSlice({
  name: 'products',
  initialState: { categoris: { Type: [], categori: [] }, products: { product: [], page: 1 }, comment: [], lenghtCard: 0, lenghtProduct: 0 },
  reducers: {
    search: (state, action) => {
      const result = []
      if (!action.payload.trim()) {
        state.products.product.forEach((pduct) => {
          result.push({ ...pduct, Status: 'visible' })
        })
      }
      else {
        state.products.product.forEach((pduct) => {
          if (pduct.Name.toLowerCase().includes(action.payload.toLowerCase())) {
            result.unshift({ ...pduct, Status: 'visible' })
          }
          else {
            result.push({ ...pduct, Status: 'hidden' })
          }
        })
      }
      state.products.product = result
      state.products.page = 1
    },
    nextPage: (state, action) => {
      if (state.products.page !== Math.ceil(state.products.product.length / 8)) {
        state.products.page = state.products.page + 1
      }
    },
    prevPage: (state, action) => {
      if (state.products.page > 1) {
        state.products.page = state.products.page - 1
      }
    },
    changePage: (state, action) => {
      state.products.page = action.payload
    },
    maxProduct: (state, action) => {
      const count = state.products.product.filter(item => item.Status === 'visible').length
      const newArr = [...state.products.product]
      for (let i = 0; i < count - 1; i++) {
        for (let j = 0; j < count - 1 - i; j++) {
          if (newArr[j].Price < newArr[j + 1].Price) {
            let temp = newArr[j];
            newArr[j] = newArr[j + 1];
            newArr[j + 1] = temp;
          }
        }
      }
      state.products.product = newArr
    },
    minProduct: (state, action) => {
      const count = state.products.product.filter(item => item.Status === 'visible').length
      const newArr = [...state.products.product]
      for (let i = 0; i < count - 1; i++) {
        for (let j = 0; j < count - 1 - i; j++) {
          if (newArr[j].Price > newArr[j + 1].Price) {
            let temp = newArr[j];
            newArr[j] = newArr[j + 1];
            newArr[j + 1] = temp;
          }
        }
      }
      state.products.product = newArr
    },
    newProduct: (state, action) => {
      const count = state.products.product.filter(item => item.Status === 'visible').length
      const newArr = [...state.products.product]
      for (let i = 0; i < count - 1; i++) {
        for (let j = 0; j < count - 1 - i; j++) {
          if (newArr[j].Id < newArr[j + 1].Id) {
            let temp = newArr[j];
            newArr[j] = newArr[j + 1];
            newArr[j + 1] = temp;
          }
        }
      }
      state.products.product = newArr
    },
    randomProduct: (state, action) => {
      const count = state.products.product.filter(item => item.Status === 'visible').length
      const newArr = [...state.products.product]
      for (let i = count - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
      }
      state.products.product = newArr
    },
    resetData: (state, action) => {
      state.categoris = { Type: [], categori: [], }
      state.products = { product: [], page: 1 }
    },
    resetDetailProduct: (state, action) => {
      state.comment = []
    },
    resetBody: (state, action) => {
      state.categoris.Type = []
      state.categoris.categori = []
      state.products.product = []
      state.comment = []
    },
  },
  extraReducers: builder => {
    builder.addCase(getProduct.pending, (state, action) => {
      OpenLoading()
    }).addCase(getProduct.fulfilled, (state, action) => {
      CloseLoading()
      state.products.product = action.payload[0]
      state.lenghtProduct = action.payload[1].Lenght
    }).addCase(getCate.fulfilled, (state, action) => {
      state.categoris.Type = action.payload[1]
      state.categoris.categori = action.payload[0]
    }).addCase(getComment.pending, (state, action) => {
      OpenLoading()
    }).addCase(filterCategoris.pending, (state, action) => {
      OpenLoading()
    }).addCase(filterCategoris.fulfilled, (state, action) => {
      CloseLoading()
      state.products.product = action.payload[0]
      state.lenghtProduct = action.payload[1].Lenght
    }).addCase(findProduct.pending, (state, action) => {
      OpenLoading()
    }).addCase(findProduct.fulfilled, (state, action) => {
      state.products.product = action.payload[0]
      state.lenghtProduct = action.payload[1][0].Lenght
      CloseLoading()
    }).addCase(getComment.fulfilled, (state, action) => {
      state.comment = action.payload
      CloseLoading()
    }).addCase(addCard.pending, (state, action) => {
    }).addCase(addCard.fulfilled, (state, action) => {
      if (action.payload === 'Thanh cong') {
        state.lenghtCard += 1
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Thành Công",
          showConfirmButton: false,
          timer: 1500
        });
      }
      else {
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: "Đã tồn tại",
          showConfirmButton: false,
          timer: 1000
        });
      }
    }).addCase(getLengthCard.fulfilled, (state, action) => {
      state.lenghtCard = action.payload
    })
  }
})
export const getProduct = createAsyncThunk('getProduct', async (page) => {
  const resProduct = await axios.get(`${process.env.REACT_APP_CALL_API}/api/v12/showproduct?page=${page}`)
  return [resProduct.data.data, resProduct.data.lenght]
})
export const getCate = createAsyncThunk('getCate', async () => {
  const resCate = await axios.get(`${process.env.REACT_APP_CALL_API}/api/v12/showcategori`)
  const resTypes = await axios.get(`${process.env.REACT_APP_CALL_API}/api/v12/showtype`)
  return [resCate.data.data, resTypes.data.data]
})
export const filterCategoris = createAsyncThunk('filterCategoris', async (Filter) => {
  const resFilterCate = await axios.get(`${process.env.REACT_APP_CALL_API}/api/v12/filtercategori?IdType=${Filter.IdType}&IdCate=${Filter.Cate}&page=${Filter.Page}`);
  return [resFilterCate.data.data,resFilterCate.data.lenght]
})
export const findProduct = createAsyncThunk('findProduct', async (Search) => {
  const resFindProduct = await axios.get(`${process.env.REACT_APP_CALL_API}/api/v12/search?keyword=${Search.value}&page=${Search.Page}`);
  return [resFindProduct.data.data,resFindProduct.data.lenght]
})
export const getComment = createAsyncThunk('getComment', async (IdProduct) => {
  const resComment = await axios.get(`${process.env.REACT_APP_CALL_API}/api/v12/showcomment?IdProduct=${IdProduct}`);
  return resComment.data.data
})
export const addCard = createAsyncThunk('addCard', async (Product) => {
  const resAddCard = await axios.post(`${process.env.REACT_APP_CALL_API}/api/v12/addcard`, { IdProduct: Product.IdProduct, token: Product.token });
  return resAddCard.data.massege
})
export const getLengthCard = createAsyncThunk('getLengthCard', async (Token) => {
  const resLenghtCard = await axios.get(`${process.env.REACT_APP_CALL_API}/api/v12/showlengthcard?token=${Token}`);
  return resLenghtCard.data.data
})
export const { resetData, resetDetailProduct, resetBody } = BodySlice.actions
export default BodySlice
