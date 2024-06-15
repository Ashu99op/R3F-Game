import React from 'react';
import useGame from './stores/useGame';

const SSRCheckBox = () => {
    const isSSR = useGame((state) => state.SSREffect);
    const setSSREffrct = useGame((state) => state.setSSREffrct);
  

  return (
      <div className="checkbox-container">
        <label className="checkbox-label">
          <input 
            type="checkbox" 
            checked={isSSR} 
            onChange={()=> setSSREffrct()}
            onKeyDown={(e)=> e.preventDefault()}
        />
          SSR Effects
        </label>
      </div>
  );
}

export default SSRCheckBox;
