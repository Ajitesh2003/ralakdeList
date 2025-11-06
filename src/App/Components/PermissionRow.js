// src/PermissionRow.js

import React from 'react';

const PermissionRow = ({ module, permissions, hasApprove = false }) => {
  return (
    <div className="grid grid-cols-12 py-2 border-b border-gray-100 items-center text-sm hover:bg-gray-50">
      {/* Module Name */}
      <div className="col-span-3 font-medium text-gray-700 pl-4">{module}</div>

      {/* Permissions Checkboxes */}
      <div className={`col-span-${hasApprove ? '7' : '6'} grid grid-cols-6 text-center`}>
        {permissions.map((perm) => (
          <div key={perm} className="col-span-1 flex justify-center">
            <input
              type="checkbox"
              // Set some permissions as checked for visual match
              defaultChecked={perm === 'Full' || (module === 'Customers' && perm !== 'Assign Owner') || (module === 'Vendors' && perm !== 'Assign Owner') || (module === 'Item' && perm !== 'Approve')}
              className="form-checkbox h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
          </div>
        ))}
        {/* Approve Column (only if present) */}
        {hasApprove && (
          <div className="col-span-1 flex justify-center">
             <input
              type="checkbox"
              // Set 'Item' Approve as unchecked
              defaultChecked={module === 'Composite Items' || module === 'Warehouses'}
              className="form-checkbox h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
          </div>
        )}
      </div>

      {/* Others / More Permissions */}
      <div className={`col-span-${hasApprove ? '2' : '3'} text-right pr-4`}>
        <button className="text-blue-600 hover:text-blue-800 text-xs font-medium">
          More Permissions
        </button>
      </div>
    </div>
  );
};

export default PermissionRow;