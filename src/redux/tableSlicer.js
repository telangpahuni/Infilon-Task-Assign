import { createSlice } from "@reduxjs/toolkit";
import { ApiCall } from "../services/ApiCall";


export const fetch = () => (dispatch) => {
    return ApiCall.fetch()
      .then((res) => res.json())
      .then((val) => {
        dispatch(getTable(val.data));
      });
  };

export const tableSlicer = createSlice({
  name: "rowData",
  initialState: {
    value: {
      loading: true,
      data: [],
    },
  },
  reducers: {
    getTable: (state, action) => {

      localStorage.setItem("payload", JSON.stringify(action.payload));
      state.value = { loading: false, data: action.payload };
    },

    editRow: (state, action) => {
      const payload = action.payload;
      const updatedData = [...state.value.data];
      updatedData[payload.editIndex] = payload.formData;
      state.value.data = updatedData;
      localStorage.setItem("payload", JSON.stringify(updatedData));
      // console.log(payload);
    },
    deleteRow: (state, action) => {
      const updatedData = [...state.value.data];
      updatedData.splice(action.payload, 1);
      state.value.data = updatedData;
      localStorage.setItem("payload", JSON.stringify(updatedData));
    },
  },
});



export const { getTable, editRow, deleteRow } = tableSlicer.actions;
export default tableSlicer.reducer;
