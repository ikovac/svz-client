import React from 'react';

const Checkbox = ({name, checked = true, onCheckboxChange, id}) => (
    <input type="checkbox" name={name} checked={checked} onChange={onCheckboxChange} id={id}/>
);
 
export default Checkbox;