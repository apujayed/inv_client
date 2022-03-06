import { createContext, useState } from 'react'
import Accounts from '../pages/Accounts';

const BioData = createContext();
function ThingsContext() {
  
    return (
        <BioData.Provider value={"kkkkkkkk"}>
            <Accounts />
        </BioData.Provider>
    )
}

export default ThingsContext
export {BioData}