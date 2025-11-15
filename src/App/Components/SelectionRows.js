import React from 'react'
import { icons, File } from 'lucide-react';

const SelectionRows = ({RowName, iconName, defaultChecked}) => {
    const LucideIcon = icons[iconName];
  return (
<div className="flex text-sm text-gray-500 pl-4 py-2 border-l border-gray-200 ">
             <input
                type="checkbox"
                defaultChecked={defaultChecked}
                className="form-checkbox h-4 w-4 text-blue-600 border-gray-300 self-center rounded mt-1 focus:ring-blue-500"
            />
            <p className="ml-2 mr-2">
                {RowName}
            </p>
           {LucideIcon? <LucideIcon size={15}/>: null}
          </div>  )
}

export default SelectionRows;