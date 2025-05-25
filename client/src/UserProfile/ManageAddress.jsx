import React, { useEffect, useState } from 'react'
import AddressForm from './AddressForm'
import axios from 'axios'

const ManageAddress = () => {
    const [form, setForm] = useState(false);
    const [savedAddresses, setSavedAddresses] = useState([]);
    const [editData, setEditData] = useState(null);
    const token = localStorage.getItem('token');
    const fetchSavedAddresses = async () => {
        try {
            const res = await axios.get('http://localhost:4000/api/address/my', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setSavedAddresses(res.data);
        } catch (error) {
            console.error("Error fetching addresses:", error);
        }
    };
    useEffect(() => {
        fetchSavedAddresses();
    }, []);

    // Delete
    const handleDelete = async (id) => {
        await axios.delete(`http://localhost:4000/api/address/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        fetchSavedAddresses();
    };

    //Edit
    const handleEdit = (addressObj) => {
        setEditData(addressObj); 
        setForm(true); 
    };
    


    return (
        <div className=' w-full h-full'>
            <h1 className='text-xl font-semibold mb-4 mt-3'>Manage Address</h1>

            {/* Form */}
            <div>
                {!form ? (
                    <button className='bg-green-600 px-4 p-1 rounded font-semibold text-white'
                        onClick={() => setForm(true)}>Add New Address</button>
                ) : (
                    <div>
                        <div className='bg-white w-[70vw]  mt-5 px-5 py-4 rounded-xl shadow-2xs relative'>
                            <AddressForm show={setForm} add={fetchSavedAddresses} editData={editData}  setEditData={setEditData}/>
                        </div>

                        <button className='absolute bg-gray-300 px-4 py-1 rounded top-[59.5vh] left-[36vw]  '
                         onClick={()=>setForm(false)}>cancel</button>
                    </div>
                )}
            </div>

            {/* List of saved addresses */}
            {savedAddresses.length > 0 && (
                <>
                    <div className="mt-6">
                        <h2 className="text-lg font-semibold mb-2">Saved Addresses</h2>
                        <ul className="space-y-3">
                            {savedAddresses.map((entry) => (
                                <li key={entry._id} className="border rounded p-3 bg-gray-50 shadow-sm flex justify-between">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-gray-800">
                                        <div className="flex items-center space-x-2">
                                            <span>👤</span>
                                            <p>{entry.name}</p>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <span>📞</span>
                                            <p>{entry.phoneno}</p>
                                        </div>
                                        <div className="flex items-start space-x-2 col-span-2">
                                            <span>🏠</span>
                                            <p>{entry.address}<br />{entry.city}, {entry.state} - {entry.pincode}</p>
                                        </div>
                                    </div>
                                    <div className='space-x-2'>
                                        <button onClick={()=>handleEdit(entry)} className='bg-blue-500 text-white px-3 py-1 rounded'>Edit</button>
                                        <button onClick={()=>handleDelete(entry._id)} className='bg-red-500 text-white px-3 py-1 rounded'>Delete</button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </>
            )}
        </div>
    )
}

export default ManageAddress
