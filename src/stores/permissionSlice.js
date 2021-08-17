import { createSlice } from "@reduxjs/toolkit";
 

export const PermissionSlice = createSlice({
    name:'PermissionSlice',
    initialState:{
        permissions:[]
    },
    reducers:{
        checkPermission:(state,action)=>{
             JSON.parse(action.payload.per).map(i=>{
                const exist = state.permissions.findIndex(e=>e==i)
                if(exist == -1)
                {
                    state.permissions.push(i)
                }
                  
             })
        }
    }
})

export const {checkPermission} = PermissionSlice.actions
export default PermissionSlice.reducer