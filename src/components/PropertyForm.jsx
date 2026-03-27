import React, { useState } from 'react';
import { 
  Plus, 
  Trash2, 
  Upload, 
  Check, 
  X, 
  MapPin, 
  IndianRupee, 
  Home, 
  Image as ImageIcon,
  Tag,
  Save,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

const PropertyForm = ({ initialData, onSave }) => {
  const [activeTab, setActiveTab] = useState('basic');
  const [formData, setFormData] = useState(initialData || {
    title: '',
    description: '',
    location: '',
    price: '',
    category: 'Apartment',
    purpose: 'Sale', // Sale/Rent
    status: 'Active',
    amenities: [],
    images: [],
    priceType: 'Fixed',
  });

  const tabs = [
    { id: 'basic', label: 'Basic Info', icon: <Home size={18} /> },
    { id: 'pricing', label: 'Pricing', icon: <IndianRupee size={18} /> },
    { id: 'gallery', label: 'Gallery', icon: <ImageIcon size={18} /> },
    { id: 'amenities', label: 'Amenities', icon: <Tag size={18} /> },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleTabChange = (dir) => {
    const currentIndex = tabs.findIndex(tab => tab.id === activeTab);
    if (dir === 'next' && currentIndex < tabs.length - 1) {
      setActiveTab(tabs[currentIndex + 1].id);
    } else if (dir === 'prev' && currentIndex > 0) {
      setActiveTab(tabs[currentIndex - 1].id);
    }
  };

  const renderBasicInfo = () => (
    <div className="space-y-6 animate-fade-in">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-bold text-slate-700">Property Title</label>
          <input 
            type="text" 
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            placeholder="Enter property name"
            className="ag-input"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-bold text-slate-700">Location</label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              placeholder="Address / Area"
              className="ag-input pl-10"
            />
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-bold text-slate-700">Property Description</label>
        <textarea 
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          rows="5"
          placeholder="Describe the property highlights, surroundings etc."
          className="ag-input resize-none"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-bold text-slate-700">Category</label>
          <select 
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            className="ag-input appearance-none"
          >
            <option>Apartment</option>
            <option>Villa</option>
            <option>Penthouse</option>
            <option>Flat</option>
            <option>Plot</option>
            <option>Commercial</option>
          </select>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-bold text-slate-700">Purpose</label>
          <div className="flex bg-slate-100 p-1 rounded-xl">
              <button 
                onClick={() => setFormData({...formData, purpose: 'Sale'})}
                className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${formData.purpose === 'Sale' ? 'bg-white text-primary shadow-sm' : 'text-slate-400'}`}
              >
                  For Sale
              </button>
              <button 
                onClick={() => setFormData({...formData, purpose: 'Rent'})}
                className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${formData.purpose === 'Rent' ? 'bg-white text-primary shadow-sm' : 'text-slate-400'}`}
              >
                  For Rent
              </button>
          </div>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-bold text-slate-700">Status</label>
          <select 
            name="status"
            value={formData.status}
            onChange={handleInputChange}
            className="ag-input appearance-none"
          >
            <option>Active</option>
            <option>Sold</option>
            <option>Draft</option>
          </select>
        </div>
      </div>
    </div>
  );

  const renderPricing = () => (
    <div className="space-y-6 animate-fade-in">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-bold text-slate-700">Expected Price</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold">₹</span>
            <input 
              type="text" 
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              placeholder="e.g. 1.2 Cr"
              className="ag-input pl-8"
            />
          </div>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-bold text-slate-700">Price Type</label>
          <select 
            name="priceType"
            value={formData.priceType}
            onChange={handleInputChange}
            className="ag-input appearance-none"
          >
            <option>Fixed</option>
            <option>Negotiable</option>
            <option>Auction</option>
          </select>
        </div>
      </div>
    </div>
  );

  const renderGallery = () => (
    <div className="space-y-6 animate-fade-in">
      <div className="border-2 border-dashed border-slate-200 rounded-2xl p-12 text-center bg-slate-50 hover:bg-slate-100/50 transition-all cursor-pointer group">
        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto text-primary shadow-sm group-hover:scale-110 transition-transform">
          <Upload size={24} />
        </div>
        <h4 className="mt-4 text-lg font-bold text-slate-900">Drag & Drop Property Images</h4>
        <p className="text-slate-500 text-sm">Or click to browse from your computer</p>
        <p className="text-[10px] text-slate-400 mt-2 uppercase tracking-widest font-bold">PNG, JPG up to 10MB</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {/* Placeholder images */}
        {[1, 2, 3].map(i => (
          <div key={i} className="relative aspect-square bg-slate-100 rounded-xl overflow-hidden group">
            <div className="w-full h-full bg-slate-200 animate-pulse" />
            <button className="absolute top-2 right-2 p-1.5 bg-white/80 hover:bg-red-500 hover:text-white rounded-lg text-slate-500 transition-all opacity-0 group-hover:opacity-100 backdrop-blur-sm">
                <Trash2 size={16} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );

  const renderAmenities = () => {
    const commonAmenities = ['Parking', 'Swimming Pool', 'Gym', 'Garden', 'Security', 'Clubhouse', 'Power Backup', 'Water Supply', 'Lift', 'Balcony'];
    return (
      <div className="space-y-6 animate-fade-in">
          <h4 className="font-bold text-slate-800">Select Available Features</h4>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {commonAmenities.map(item => (
                  <button 
                      key={item}
                      onClick={() => {
                          const newAmenities = formData.amenities.includes(item)
                              ? formData.amenities.filter(a => a !== item)
                              : [...formData.amenities, item];
                          setFormData({...formData, amenities: newAmenities});
                      }}
                      className={`
                          flex items-center p-3 rounded-xl border text-sm font-semibold transition-all
                          ${formData.amenities.includes(item) 
                              ? 'bg-primary/5 border-primary text-primary' 
                              : 'bg-white border-slate-100 text-slate-500 hover:border-slate-200'}
                      `}
                  >
                      <div className={`w-5 h-5 rounded-lg border flex items-center justify-center mr-3 transition-colors ${formData.amenities.includes(item) ? 'bg-primary border-primary text-white' : 'border-slate-200'}`}>
                          {formData.amenities.includes(item) && <Check size={12} />}
                      </div>
                      {item}
                  </button>
              ))}
          </div>
      </div>
    );
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
        {/* Tab Header */}
        <div className="flex border-b border-slate-50 overflow-x-auto no-scrollbar">
            {tabs.map(tab => (
                <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`
                        flex items-center px-8 py-5 text-sm font-bold border-b-2 transition-all whitespace-nowrap
                        ${activeTab === tab.id 
                            ? 'border-primary text-primary bg-primary/5' 
                            : 'border-transparent text-slate-400 hover:text-slate-600'}
                    `}
                >
                    <span className="mr-2">{tab.icon}</span>
                    {tab.label}
                </button>
            ))}
        </div>

        {/* Tab Content */}
        <div className="p-8 md:p-10 min-h-[400px]">
            {activeTab === 'basic' && renderBasicInfo()}
            {activeTab === 'pricing' && renderPricing()}
            {activeTab === 'gallery' && renderGallery()}
            {activeTab === 'amenities' && renderAmenities()}
        </div>

        {/* Footer Actions */}
        <div className="px-8 py-6 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
            <button 
                onClick={() => handleTabChange('prev')}
                disabled={activeTab === 'basic'}
                className="flex items-center px-6 py-2.5 rounded-xl font-bold text-slate-500 hover:text-slate-800 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
                <ChevronLeft size={20} className="mr-2" />
                Previous
            </button>
            
            <div className="flex items-center space-x-3">
                {activeTab !== 'amenities' ? (
                    <button 
                     onClick={() => handleTabChange('next')}
                     className="ag-button flex items-center !px-8"
                    >
                        Continue
                        <ChevronRight size={20} className="ml-2" />
                    </button>
                ) : (
                    <button 
                        onClick={() => onSave(formData)}
                        className="ag-button flex items-center !px-8 !bg-emerald-600 hover:!bg-emerald-700"
                    >
                        <Save size={20} className="mr-2" />
                        List Property
                    </button>
                )}
            </div>
        </div>
    </div>
  );
};

export default PropertyForm;
