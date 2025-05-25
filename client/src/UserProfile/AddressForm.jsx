import React, { useEffect, useState } from 'react'
import api from '../Api/axiosInstance'
const AddressForm = ({ show, add, editData, setEditData }) => {
    const [address, setAddress] = useState('');
    const [phoneno, setPhoneno] = useState('');
    const [name, setName] = useState('');
    const [pincode, setPincode] = useState('');
    const [city, setCity] = useState('');
    const [stateName, setStateName] = useState('');
    const [savedAddresses, setSavedAddresses] = useState([]);
    const [editAddressId, setEditAddressId] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const token = localStorage.getItem('token');

    useEffect(() => {
        if (editData) {
            setName(editData.name || '');
            setPhoneno(editData.phoneno || '');
            setAddress(editData.address || '');
            setPincode(editData.pincode || '');
            setCity(editData.city || '');
            setStateName(editData.state || '');
            setEditAddressId(editData._id);
        }
    }, [editData]);

    const resetForm = () => {
        setName('');
        setPhoneno('');
        setAddress('');
        setPincode('');
        setCity('');
        setStateName('');
        setEditAddressId(null);
        show(false);
    };
    const handleSubmit = async (e) => {
        e.preventDefault();

        const addressData = { name, phoneno, address, pincode, city, state: stateName };


        try {
            if (editAddressId) {
                await api.put(`/api/address/${editAddressId}`, addressData, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                show(false);
                add(editAddressId); 
            } else {
                const res = await api.post('/api/address/add', addressData, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                show(false);
                add(res.data._id); 
            }
        }
        catch (error) {
            console.error('Submit error:', error);
            if (error.response && error.response.status === 409) {
                setErrorMessage(' Same Address already exists');
            }
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className='mb-3 space-y-2'>
                    <input type='text' value={name} onChange={(e) => setName(e.target.value)} className='border rounded px-2 py-1  w-full' placeholder='Name' required />
                    <input type="number" value={phoneno} onChange={(e) => setPhoneno(e.target.value)} className="border rounded px-2 py-1 w-full" placeholder='Enter 10-digit No' required />
                    <input type='text' value={pincode} onChange={(e) => setPincode(e.target.value)} className='border rounded px-2 py-1 w-full' placeholder='Pincode No' required />
                </div>
                <div className='space-x-2 flex'>
                    <textarea value={address} onChange={(e) => setAddress(e.target.value)} rows={3} className="border rounded px-2 py-1  w-[48%] resize-none align-top" required placeholder='Enter Your Address' />
                    <div className='flex flex-col'>
                        <input type="text" value={stateName} onChange={(e) => setStateName(e.target.value)} placeholder='State' className='border rounded px-2 py-1 ml-3 ' required />
                        <input type="text" value={city} onChange={(e) => setCity(e.target.value)} placeholder='City/District' className='border rounded px-2 py-1 ml-3 mt-3 ' required />
                    </div>
                </div>
                <div className='mt-2 space-x-2 '>
                    <button type='submit' className="bg-green-600 text-white px-4 py-1 rounded ">
                        {editAddressId ? 'Update Address' : 'Add Address'}
                    </button>
                    {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                </div>
            </form>
        </div>
    )
}

export default AddressForm
