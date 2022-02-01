

import {configureStore} from '@reduxjs/toolkit';
// import thunk from 'redux-thunk';
import tableSlicer from './tableSlicer';

export default configureStore({
    reducer:{
        rowData:tableSlicer,
        
    },

})
