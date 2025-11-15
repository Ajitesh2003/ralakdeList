// src/CreateRoleForm.js

import React, { useState } from 'react';
import PermissionRow from '../Components/PermissionRow'; 
import SelectionRows from '../Components/SelectionRows';
import ConfirmationModal from '../Components/ConfirmationModal';
import reportGroupsData from '../Utils/ReportsData';
import { File } from 'lucide-react';

const CreateRoleForm = () => {
  // Define permissions columns for Contacts and Items sections
  const contactPermissions = ['Full', 'View', 'Create', 'Edit', 'Delete', 'Assign Owner'];
  const permissionColumns = ['fullAccess', 'view', 'export', 'schedule', 'share'];
  const itemPermissions = ['Full', 'View', 'Create', 'Edit', 'Delete'];
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [enableFullAccess, setEnableFullAccess] = useState(false);
  const [expandedReports, setExpandedReports] = useState({});
  const [reportPermissions, setReportPermissions] = useState({});

  const handleFullAccessChange = (e) => {
    if (e.target.checked) {
      setIsModalOpen(true);
    } else {
      setEnableFullAccess(false);
    }
  };

  const handleConfirmFullAccess = () => {
    setEnableFullAccess(true);
    setIsModalOpen(false);
  };

  const handleCancelFullAccess = () => {
    setEnableFullAccess(false);
    setIsModalOpen(false);
  };

  const toggleReportGroup = (group) => {
    setExpandedReports(prev => ({
      ...prev,
      [group]: !prev[group]
    }));
  };

  // Handle individual checkbox change
  const handlePermissionChange = (group, report, permission) => {
    const key = `${group}-${report}-${permission}`;
    setReportPermissions(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  // Check if a permission is checked
  const isPermissionChecked = (group, report, permission) => {
    const key = `${group}-${report}-${permission}`;
    return reportPermissions[key] || false;
  };

  // Handle "Select All" for a specific column in a group
  const handleSelectAll = (group, permission) => {
    const reports = reportGroupsData[group];
    const newPermissions = { ...reportPermissions };

    // Check if all are currently selected
    const allSelected = reports.every(report => {
      if (permission === 'fullAccess') {
        // For full access, check if all permissions are checked
        return permissionColumns.every(col => {
          const key = `${group}-${report}-${col}`;
          return reportPermissions[key];
        });
      } else {
        const key = `${group}-${report}-${permission}`;
        return reportPermissions[key];
      }
    });

    // Toggle: if all selected, unselect all; otherwise, select all
    reports.forEach(report => {
      if (permission === 'fullAccess') {
        // Full Access should check all columns
        permissionColumns.forEach(col => {
          const key = `${group}-${report}-${col}`;
          newPermissions[key] = !allSelected;
        });
      } else {
        const key = `${group}-${report}-${permission}`;
        newPermissions[key] = !allSelected;
      }
    });

    setReportPermissions(newPermissions);
  };

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
          <div className="flex justify-center text-sm text-gray-500 pl-4 py-2 border-l border-gray-200 border-b border-gray-200">
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
          <div className="flex justify-center text-sm text-gray-500 pl-4 py-2 ">
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

        {/* Banking Permission Section */}
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
        {/* Sales Permission Section */}
         <div className="border border-gray-200 rounded-md mb-8 overflow-hidden">
        <div className='bg-gray-50 py-3 px-4 border-b border-gray-200 '>
        <h2 className="text-xl font-semibold  text-left text-gray-800">Sales</h2>
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
          <PermissionRow module="Invoices" permissions={itemPermissions} hasApprove={true} />
          <PermissionRow module="Customer payments" permissions={itemPermissions} hasApprove={true} />
          <PermissionRow module="Quotes" permissions={itemPermissions} hasApprove={true} />
          <PermissionRow module="Sales Orders" permissions={itemPermissions} hasApprove={true} />
          <PermissionRow module="Picklist" permissions={itemPermissions} hasApprove={true} />
          <PermissionRow module="Package" permissions={itemPermissions} hasApprove={true} />
          <PermissionRow module="Shipment order" permissions={itemPermissions} hasApprove={true} />
          <PermissionRow module="Sales Return" permissions={itemPermissions} hasApprove={true} />
          <PermissionRow module="Sales Return Receive" permissions={itemPermissions} hasApprove={true} />
          <PermissionRow module="Credit Notes" permissions={itemPermissions} hasApprove={true} />
          
          
          {/* Add more rows here if needed */}
        </div>

        {/* Purchases Permission Settings */}
                 <div className="border border-gray-200 rounded-md mb-8 overflow-hidden">
        <div className='bg-gray-50 py-3 px-4 border-b border-gray-200 '>
        <h2 className="text-xl font-semibold  text-left text-gray-800">Purchases</h2>
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
          <PermissionRow module="Bills" permissions={itemPermissions} hasApprove={true} />
          <PermissionRow module="Vendor Payments" permissions={itemPermissions} hasApprove={true} />
          <PermissionRow module="Expenses" permissions={itemPermissions} hasApprove={true} />
          <PermissionRow module="Purchase Orders" permissions={itemPermissions} hasApprove={true} />
          <PermissionRow module="Purchase Receive" permissions={itemPermissions} hasApprove={true} />
          <PermissionRow module="Vendor Credits" permissions={itemPermissions} hasApprove={true} />
          
          
          
          {/* Add more rows here if needed */}
        </div>

          {/* Accountant Permissions Settings */}
                    <div className="border border-gray-200 rounded-md mb-8 overflow-hidden">
        <div className='bg-gray-50 py-3 px-4 border-b border-gray-200 '>
        <h2 className="text-xl font-semibold  text-left text-gray-800">Accountant</h2>
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
          <PermissionRow module="Chart Of Accountants" permissions={itemPermissions} hasApprove={true} />
          <PermissionRow module="Journals" permissions={itemPermissions} hasApprove={true} />
          <PermissionRow module="Budget" permissions={itemPermissions} hasApprove={true} />
         
          
          
          {/* Add more rows here if needed */}
        </div>

        {/* Timesheets Permission Settings */}
      
                <div className="border border-gray-200 rounded-md mb-8 overflow-hidden">
        <div className='bg-gray-50 py-3 px-4 border-b border-gray-200 '>
        <h2 className="text-xl font-semibold  text-left text-gray-800">Timesheets</h2>
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
          <PermissionRow module="Projects" permissions={itemPermissions} hasApprove={true} />
          
          
          <div className="flex justify-center text-sm text-gray-500 pl-4 py-2 border-l border-gray-200 border-b border-gray-200">
             <input
                type="checkbox"
                defaultChecked={true}
                className="form-checkbox h-4 w-4 text-blue-600 border-gray-300 self-center rounded mt-1 focus:ring-blue-500"
            />
            <p className="ml-2">
              Don't allow timesheet staffs to record expenses for the associated project(s).
            </p>
          </div>
          
          {/* Add more rows here if needed */}
        </div>

        {/* Small Options Documents */}
        
          <div className="border border-gray-200 rounded-md mb-8 overflow-hidden">
            {/* Header Option */}
        <div className=' flex bg-gray-50 py-3 px-4 border-b border-gray-200 '>
          <input
                type="checkbox"
                defaultChecked={false}
                className="form-checkbox h-4 w-4 text-blue-600 border-gray-300 self-center rounded mt-1 focus:ring-blue-500"
            />
        <h2 className="text-xl font-semibold ml-2 text-left text-gray-800">Documents</h2>
            </div>
          
         

          {/* Item Rows */}
          <SelectionRows RowName={'View Documents'} defaultChecked={false} />          
          <SelectionRows RowName={'Upload Documents'} defaultChecked={false} />          
          <SelectionRows RowName={'Delete Documents'} defaultChecked={false} />          
          <SelectionRows RowName={'Manage Folder'} defaultChecked={false} />          
         
          
          {/* Add more rows here if needed */}
        </div>

        {/* Vat Filling  */}
          <div className="border border-gray-200 rounded-md mb-8 overflow-hidden">
            {/* Header Option */}
        <div className=' flex bg-gray-50 py-3 px-4 border-b border-gray-200 '>
          <input
                type="checkbox"
                defaultChecked={false}
                className="form-checkbox h-4 w-4 text-blue-600 border-gray-300 self-center rounded mt-1 focus:ring-blue-500"
            />
        <h2 className="text-xl font-semibold ml-2 text-left text-gray-800">Vat Filling</h2>
            </div>
          
         

          {/* Item Rows */}
          <SelectionRows RowName={'View Agent Invitation Details'} defaultChecked={false} />          
          <SelectionRows RowName={'Manage Agent Invitation'} defaultChecked={false} />          
          <SelectionRows RowName={'Manage VAT Return'} defaultChecked={false} />          
          <SelectionRows RowName={'Submit VAT Return'} defaultChecked={false} />          
         
          
          {/* Add more rows here if needed */}
        </div>

        {/* Settings Options */}
          <div className="border border-gray-200 rounded-md mb-8 overflow-hidden">
            {/* Header Option */}
        <div className=' flex bg-gray-50 py-3 px-4 border-b border-gray-200 '>
          <input
                type="checkbox"
                defaultChecked={false}
                className="form-checkbox h-4 w-4 text-blue-600 border-gray-300 self-center rounded mt-1 focus:ring-blue-500"
            />
        <h2 className="text-xl font-semibold ml-2 text-left text-gray-800">Settings</h2>
            </div>
          
         

          {/* Item Rows */}
          <SelectionRows RowName={'Update Organization Profiles'} defaultChecked={false} />          
          <SelectionRows RowName={'Users'} defaultChecked={false} />          
          <SelectionRows RowName={'Export Data'} defaultChecked={false} />          
          <SelectionRows RowName={'General Preferences'} defaultChecked={false} iconName={'CircleQuestionMark'} />          
          <SelectionRows RowName={'Accountant Preferences'} defaultChecked={false} />          
          <SelectionRows RowName={'VAT Filling Settings'} defaultChecked={false} />          
          <SelectionRows RowName={'Taxes'} defaultChecked={false} />          
          <SelectionRows RowName={'Provide Access to Protected Data'} defaultChecked={false} iconName={'CircleQuestionMark'} />          
          <SelectionRows RowName={'Payment Terms'} defaultChecked={false} />          
          <SelectionRows RowName={'Templates'} defaultChecked={false} />          
          <SelectionRows RowName={'Email Templates'} defaultChecked={false} />          
          <SelectionRows RowName={'Reporting Tags'} defaultChecked={false} />          
          <SelectionRows RowName={'Manage Integration'} defaultChecked={false} />          
          <SelectionRows RowName={'Automation'} defaultChecked={false} iconName={'CircleQuestionMark'} />          
          <SelectionRows RowName={'Incoming Webhook'} defaultChecked={false} iconName={'CircleQuestionMark'} />          
          <SelectionRows RowName={'Signal'} defaultChecked={false} iconName={'CircleQuestionMark'} />          
         
          
          {/* Add more rows here if needed */}
        </div>

        {/* Dashboard Settings */}

           <div className="border border-gray-200 rounded-md mb-8 overflow-hidden">
            {/* Header Option */}
        <div className=' flex bg-gray-50 py-3 px-4 border-b border-gray-200 '>
          <input
                type="checkbox"
                defaultChecked={false}
                className="form-checkbox h-4 w-4 text-blue-600 border-gray-300 self-center rounded mt-1 focus:ring-blue-500"
            />
        <h2 className="text-xl font-semibold ml-2 text-left text-gray-800">Dashboard Settings</h2>
            </div>
          
         {/* Total Payables
Total Receivables
Cash Flow
Income and Expenses
Your Top Expense
Projects
Bank and Credit Cards
Account Watchlist */}


          {/* Item Rows */}
          <SelectionRows RowName={'Total Payables'} defaultChecked={false} />          
          <SelectionRows RowName={'Total Receivables'} defaultChecked={false} />          
          <SelectionRows RowName={'Cash Flow'} defaultChecked={false} />          
          <SelectionRows RowName={'Income and Expenses'} defaultChecked={false} />          
          <SelectionRows RowName={'Your Top Expense'} defaultChecked={false} />          
          <SelectionRows RowName={'Projects'} defaultChecked={false} />          
          <SelectionRows RowName={'Bank and Credit Cards'} defaultChecked={false} />          
          <SelectionRows RowName={'Account Watchlist'} defaultChecked={false} />          
               
         <div className="flex items-start p-4 bg-blue-50 rounded-sm m-2">
            <input
              id="accountantRole"
              type="checkbox"
              className="h-4 w-4 text-blue-600 border-gray-300 rounded mt-1 focus:ring-blue-500"
            />
            <div className="text-left ml-4 text-sm">
              <label htmlFor="accountantRole" className="font-medium text-left text-gray-900">
Allow Dashboard Management              </label>
              <p className="text-black">
Users with the following permission can create and customise dashboards              </p>
            </div>
          </div>
          
          {/* Add more rows here if needed */}
        </div>

         {/* --- Reports Permissions Section --- */}
          <div className="border border-gray-200 rounded-md mb-8 overflow-hidden">
    <div className='bg-gray-50  py-3 px-4 border-b border-gray-200'>
      <div className="flex items-center">
        <input
          type="checkbox"
          id="enableFullAccessReports"
          checked={enableFullAccess}
          onChange={handleFullAccessChange}
          className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
        />
        <label htmlFor="enableFullAccessReports" className="ml-2 text-xl font-semibold text-gray-700">
          Enable full access for all reports
        </label>
        <span className="ml-2 inline-flex items-center justify-center w-4 h-4 bg-gray-400 text-white text-xs rounded-full 
  cursor-help" title="Enable all report permissions">
          i
        </span>
      </div>
    </div>

    {/* Enable full access checkbox */}
    <div className="px-4 py-4 border-b border-gray-200">
      {/* Warning Message */}
      <div className="mt-3 flex items-start p-3 bg-orange-50 border-l-4 border-orange-400 rounded">
        <span className="text-orange-600 font-bold mr-2">⚠</span>
        <p className="text-sm text-gray-700">
          When new reports are introduced, you will have to edit the role and provide access to them.
        </p>
      </div>
    </div>

    {/* Header Row for Reports */}
    <div className="grid grid-cols-12 text-xs font-medium text-gray-500 uppercase py-3 px-4 border-b border-gray-200">
      <div className="col-span-3">Report Groups</div>
      <div className="col-span-9 grid grid-cols-5 text-center">
        <div>Full Access</div>
        <div>View</div>
        <div>Export</div>
        <div>Schedule</div>
        <div>Share</div>
      </div>
    </div>

    {/* Report Group Rows */}
    {Object.keys(reportGroupsData).map((group) => (
      <div key={group} className="border-b border-gray-100">
        <div
          className={`grid grid-cols-12 py-3 items-center text-sm cursor-pointer transition-colors duration-150 group 
  ${expandedReports[group] ? 'bg-gray-50' : 'bg-white hover:bg-gray-50'}`}
          onClick={() => toggleReportGroup(group)}
        >
          {/* Report Group Name with expand icon */}
          <div className="col-span-3 font-medium text-gray-700 pl-4 flex items-center">
            <svg
              className={`mr-2 w-4 h-4 transform transition-transform duration-200 ${expandedReports[group] ? 'rotate-90' : 
  ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            {group}
          </div>

          {/* Show "Select All" links when expanded, placeholder text when collapsed */}
          {expandedReports[group] ? (
            <div className="col-span-9 grid grid-cols-5 text-center text-xs">
              {permissionColumns.map((permission) => (
                <button
                  key={permission}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSelectAll(group, permission);
                  }}
                  className="text-blue-600 hover:text-blue-800 hover:underline font-medium"
                >
                  Select All
                </button>
              ))}
            </div>
          ) : (
            <div className="col-span-9 text-center text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity 
  duration-150">
              Click to configure access
            </div>
          )}
        </div>

        {/* Expanded content */}
        {expandedReports[group] && (
          <div className="bg-white border-t border-gray-200">
            {/* Individual Report Rows */}
            {reportGroupsData[group].map((report) => (
              <div
                key={report}
                className="grid grid-cols-12 py-2 px-4 text-sm border-b border-gray-100 hover:bg-gray-50"
              >
                <div className="col-span-3 text-gray-700 pl-6">{report}</div>
                <div className="col-span-9 grid grid-cols-5">
                  {permissionColumns.map((permission) => (
                    <div key={permission} className="flex justify-center items-center">
                      <input
                        type="checkbox"
                        checked={isPermissionChecked(group, report, permission)}
                        onChange={() => handlePermissionChange(group, report, permission)}
                        className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    ))}
  </div>
        {/* Confirmation Modal */} 
        <ConfirmationModal
          isOpen={isModalOpen}
          onClose={handleCancelFullAccess}
          onConfirm={handleConfirmFullAccess}
          title="Enable Full Access for All Reports"
          message="Are you sure you want to enable full access for all reports? This will grant all permissions to every report group."
        />


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