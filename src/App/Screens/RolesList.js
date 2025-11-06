import rolesData from '../Utils/RolesData'; 
import Actions from '../Components/Actions';
import { ChevronsUpDown  } from 'lucide-react';
import { Link } from 'react-router-dom';


const RolesList = () => {
  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">Roles</h1>
        <Link to="/new-role">
        <button className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md text-sm">
          New Role
        </button>
        </Link>
      </div>

      {/* List/Table Container */}
      <div className="bg-white border border-gray-200 rounded-md shadow-sm">
        {/* Table Header */}
        <div className="grid grid-cols-12 gap-4 border-b border-gray-200 bg-gray-100 text-xs font-medium text-left text-gray-500 uppercase py-3 px-6">
          <div className="col-span-3 flex justify"><div className='m-1'>Role Name</div> <ChevronsUpDown size={24} /></div>
          <div className="col-span-7">Description</div>
          <div className="col-span-2 text-right"></div> 
        </div>

        {/* List Rows */}
        {rolesData.map((role, index) => (
          <div
            key={index}
            className="grid grid-cols-12 gap-4 items-center py-3 px-6 border-b border-gray-100 last:border-b-0 hover:bg-gray-50"
          >
            {/* Role Name */}
            <div className="col-span-3 text-sm text-blue-600 text-left font-medium cursor-pointer hover:underline">
              {role.name}
            </div>
            {/* Description */}
            <div className="col-span-7 text-sm text-left text-gray-700">
              {role.description}
            </div>
            {/* Actions */}
            <div className="col-span-2 text-left">
              <Actions />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RolesList;