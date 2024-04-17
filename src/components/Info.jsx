import React,{useState} from 'react'

const Info = () => {
    const countries = [
        { code: 'US', name: 'United States' },
        { code: 'CA', name: 'Canada' },
        { code: 'GB', name: 'United Kingdom' },
        // Add more countries as needed
      ];
      
      
        const [selectedCountry, setSelectedCountry] = useState('');
      
        const handleCountryChange = (e) => {
          setSelectedCountry(e.target.value);
        }
  return (
    <form  className="max-w-md mx-auto mt-20">
    <div className="flex flex-col gap-5">
        <div>
        <label htmlFor="" className="block text-gray-700 font-bold mb-2">Date de naicense</label>
        <input type="date" id="date" name="date" placeholder='20/05/1990'  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500" />
        </div>
        <div>
      <label htmlFor="country" className="block text-gray-700 font-bold mb-2">Country</label>
      <select id="country" name="country" value={selectedCountry} onChange={handleCountryChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500">
        <option value="">Algeria</option>
        {countries.map((country) => (
          <option key={country.code} value={country.code}>{country.name}</option>
        ))}
      </select>
    </div>
    <div>
        <h3 className='text-xl font-semibold mb-8 mt-5'>Contact</h3>
        <label htmlFor="" className="block text-gray-700 font-bold mb-2">Phone</label>
        <input type="text" id="text"  placeholder='+213458596'  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500" />
    </div>
    
  </div>
  <div className="flex justify-between mt-8">
      <button type="submit" className="bg-mainColor  text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Save Changes</button>
      <button type="button"  className="bg-white  border border-mainColor  text-mainColor font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Cancel</button>
    </div>
  </form>
  )
}

export default Info