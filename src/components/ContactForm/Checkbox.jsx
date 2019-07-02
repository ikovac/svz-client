import React from 'react';

const Checkbox = ({name, checked = true, onCheckboxChange, id}) => (
    <input type="checkbox" name={name} checked={checked} onChange={onCheckboxChange} id={id} aria-label={`Checkbox za ${name}`} />
);
 
export default Checkbox;