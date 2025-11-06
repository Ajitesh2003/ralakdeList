// src/CreateRoleForm.js

import React from 'react';
import PermissionRow from '../Components/PermissionRow'; 

const CreateRoleForm = () => {
  // Define permissions columns for Contacts and Items sections
  const contactPermissions = ['Full', 'View', 'Create', 'Edit', 'Delete', 'Assign Owner'];
  const itemPermissions = ['Full', 'View', 'Create', 'Edit', 'Delete'];

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      {/* Top Section */}
      <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 ">
        
        {/* Form Fields */}
        <div className="mb-8">
          <div className="mb-4 flex justify">
            <label htmlFor="roleName" className="block text-sm mr-10 mt-2 font-medium text-gray-700">
              <span className="text-red-500">Role Name*</span>
            </label>
            <input
              type="text"
              id="roleName"
              className="ml-10 block w-1/2 border border-gray-300 rounded-md shadow-sm px-1 py-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          
          <div className="mb-6 flex justify">
            <label htmlFor="description" className="block text-sm mr-10 mt-2 font-medium text-gray-700">
              Description
            </label>
            <textarea
              id="description"
              rows="3"
              maxLength="500"
              placeholder="Max. 500 characters"
              className="ml-11 block w-1/2 border border-gray-300 rounded-md shadow-sm px-1 py-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            ></textarea>
          </div>

          <div className="flex items-start p-4 bg-blue-50 rounded-sm mb-8">
            <input
              id="accountantRole"
              type="checkbox"
              className="h-4 w-4 text-blue-600 border-gray-300 rounded mt-1 focus:ring-blue-500"
            />
            <div className="text-left ml-4 text-sm">
              <label htmlFor="accountantRole" className="font-medium text-left text-gray-900">
                This role is for Accountant users
              </label>
              <p className="text-black">
                If you mark this option, all users who are added with this role will be an accountant user.
              </p>
            </div>
          </div>
        </div>
        
        {/* --- Contacts Permissions Section --- */}
        <div className="border border-gray-200 rounded-md mb-8 overflow-hidden">
            <div className='bg-gray-50 py-3 px-4 border-b border-gray-200 '>
        <h2 className="text-xl font-semibold  text-left text-gray-800">Contacts</h2>
            </div>
                
          
          {/* Header Row for Contacts */}
          <div className="grid grid-cols-12  text-xs font-medium text-gray-500 uppercase py-3 px-4 border-b border-gray-200">
            <div className="col-span-3 text-left border-r border-gray-200 ">Particulars</div>
            <div className="col-span-6 grid grid-cols-6 divide-x divide-gray-200 text-center">
              <div >Full</div>
              <div >View</div>
              <div >Create</div>
              <div >Edit</div>
              <div >Delete</div>
              <div >Assign Owner</div>
            </div>
            <div className="col-span-3 text-right border-l border-gray-200">Others</div>
          </div>

          {/* Customer Row */}
          <PermissionRow module="Customers" permissions={contactPermissions} />
          <div className="flex items-start text-sm text-gray-500 pl-4 py-2 border-l border-gray-200 border-b border-gray-200">
             <input
                type="checkbox"
                defaultChecked={true}
                className="form-checkbox h-4 w-4 text-blue-600 border-gray-300 self-center rounded mt-1 focus:ring-blue-500"
            />
            <p className="ml-2">
              Allow users to handle the data and transactions for assigned customers only.
            </p>
          </div>

          {/* Vendor Row */}
          <PermissionRow module="Vendors" permissions={contactPermissions} />
          <div className="flex items-start text-sm text-gray-500 pl-4 py-2 ">
            <input
                type="checkbox"
                defaultChecked={false}
                className="form-checkbox h-4 w-4 text-blue-600 border-gray-300 rounded mt-1 focus:ring-blue-500"
            />
            <p className="ml-2">
              Allow users to add, edit and delete vendor's bank account details.
            </p>
          </div>
        </div>

        {/* --- Items Permissions Section --- */}
        <div className="border border-gray-200 rounded-md mb-8 overflow-hidden">
        <div className='bg-gray-50 py-3 px-4 border-b border-gray-200 '>
        <h2 className="text-xl font-semibold  text-left text-gray-800">Items</h2>
            </div>
          
          {/* Header Row for Items */}
          <div className="grid grid-cols-12  text-xs font-medium text-gray-500 uppercase py-3 px-4 border-b border-gray-200">
            <div className="col-span-3">Particulars</div>
            <div className="col-span-7 grid grid-cols-6 text-center">
              <div>Full</div>
              <div>View</div>
              <div>Create</div>
              <div>Edit</div>
              <div>Delete</div>
              <div>Approve</div>
            </div>
            <div className="col-span-2 text-right">Others</div>
          </div>

          {/* Item Rows */}
          <PermissionRow module="Item" permissions={itemPermissions} hasApprove={true} />
          <PermissionRow module="Composite Items" permissions={itemPermissions} hasApprove={true} />
          <PermissionRow module="Warehouses" permissions={itemPermissions} hasApprove={true} />
          <PermissionRow module="Transfer Orders" permissions={itemPermissions} hasApprove={true} />
          <PermissionRow module="Inventory Adjustments " permissions={itemPermissions} hasApprove={true} />
          <PermissionRow module="Stock Counting " permissions={itemPermissions} hasApprove={true} />
          
          {/* Add more rows here if needed */}
        </div>

        {/* Contacts Permission Section */}
         <div className="border border-gray-200 rounded-md mb-8 overflow-hidden">
        <div className='bg-gray-50 py-3 px-4 border-b border-gray-200 '>
        <h2 className="text-xl font-semibold  text-left text-gray-800">Banking</h2>
            </div>
          
          {/* Header Row for Items */}
          <div className="grid grid-cols-12  text-xs font-medium text-gray-500 uppercase py-3 px-4 border-b border-gray-200">
            <div className="col-span-3">Particulars</div>
            <div className="col-span-7 grid grid-cols-6 text-center">
              <div>Full</div>
              <div>View</div>
              <div>Create</div>
              <div>Edit</div>
              <div>Delete</div>
              <div>Approve</div>
            </div>
            <div className="col-span-2 text-right">Others</div>
          </div>

          {/* Item Rows */}
          <PermissionRow module="Banking" permissions={itemPermissions} hasApprove={true} />
          
          
          {/* Add more rows here if needed */}
        </div>


        {/* Action Buttons (Not visible in image, but typical for a form) */}
        <div className="flex justify-end pt-4 border-t border-gray-200">
            <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium py-2 px-4 rounded-md mr-2 text-sm">
                Cancel
            </button>
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md text-sm">
                Save Role
            </button>
        </div>
        
      </div>
    </div>
  );
};

export default CreateRoleForm;