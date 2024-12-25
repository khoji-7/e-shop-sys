import React, { useEffect, useRef } from 'react';

const UserModal = ({ user, closeModal }) => {
  const modalRef = useRef(null); // Ref to detect clicks outside of the modal

  // Close the modal when clicking outside the modal area
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        closeModal(); // Close the modal if clicked outside
      }
    };

    // Add event listener for clicks outside the modal
    document.addEventListener('mousedown', handleClickOutside);

    // Cleanup the event listener on component unmount
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [closeModal]);

  if (!user) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 z-50">
      <div
        ref={modalRef} // Attach the ref to the modal container
        className="bg-white p-6 rounded-lg w-4/5 max-w-4xl overflow-auto"
      >
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">User Details</h2>
          <button
            onClick={closeModal} // Close on clicking the close button
            className="text-xl text-gray-500"
          >
            ×
          </button>
        </div>

        {/* Table Layout inside the Modal */}
        <div className="mt-4">
          <table className="min-w-full table-auto border-collapse">
            <thead>
              <tr>
                <th className="py-2 px-4 text-left border-b">Field</th>
                <th className="py-2 px-4 text-left border-b">Details</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="py-2 px-4">Name</td>
                <td className="py-2 px-4">{user.name}</td>
              </tr>
              <tr>
                <td className="py-2 px-4">Email</td>
                <td className="py-2 px-4">{user.email}</td>
              </tr>
              <tr>
                <td className="py-2 px-4">Phone Number</td>
                <td className="py-2 px-4">{user.phone_number}</td>
              </tr>
              <tr>
                <td className="py-2 px-4">Product Name</td>
                <td className="py-2 px-4">{user.product_name}</td>
              </tr>
              <tr>
                <td className="py-2 px-4">Cost</td>
                <td className="py-2 px-4">{user.cost} so'm</td>
              </tr>
              <tr>
                <td className="py-2 px-4">Monthly Income</td>
                <td className="py-2 px-4">{user.monthly_income} so'm</td>
              </tr>
              <tr>
                <td className="py-2 px-4">Payment</td>
                <td className="py-2 px-4">{user.payment} so'm</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="flex justify-end mt-4">
          <button
            onClick={closeModal} // Close on clicking the close button
            className="bg-blue-500 text-white py-2 px-4 rounded-lg"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserModal;
