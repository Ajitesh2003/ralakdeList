import React from "react";
import { Trash2 } from 'lucide-react';


const Actions = () => (
  <div className="flex justify-end text-sm">
    <button className="text-gray-500 bg-gray-100 border border-gray-200 hover:bg-gray-200 hover:text-blue-600 py-1 px-2 rounded-tl rounded-bl text-sm">Edit</button>
    <button className="text-gray-500 bg-gray-100 border border-gray-200 hover:bg-gray-200 hover:text-blue-600 py-1 px-2 text-sm">Clone</button>
    {/* Using an icon for delete/trash, represented as a simple button */}
    <button className="text-gray-500 bg-gray-100 border border-gray-200 hover:bg-gray-200 hover:text-red-600 py-1 px-2 rounded-tr rounded-br text-sm">
     <Trash2 size={15} />
       
    </button>
  </div>
);

export default Actions;