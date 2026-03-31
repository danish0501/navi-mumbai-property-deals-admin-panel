import { useState } from 'react';
import {
  Save,
  ChevronLeft,
  ChevronRight,
  Info,
  AlignLeft,
  Users,
  IndianRupee,
  MapPin,
  Layers,
  Sparkles,
  Camera,
  Map,
  CheckCircle2,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import BasicInfo from '../components/property-form/BasicInfo';
import PropertyDescription from '../components/property-form/PropertyDescription';
import RentalSuitability from '../components/property-form/RentalSuitability';
import Pricing from '../components/property-form/Pricing';
import LocationInfo from '../components/property-form/LocationInfo';
import PropertyDetails from '../components/property-form/PropertyDetails';
import AmenitiesFeatures from '../components/property-form/AmenitiesFeatures';
import ImageUpload from '../components/property-form/ImageUpload';
import NearbyPlaces from '../components/property-form/NearbyPlaces';

const PropertyForm = ({ initialData, onSave, onCancel }) => {
  const [activeTab, setActiveTab] = useState('basic');
  const [formData, setFormData] = useState(() => {
    const data = initialData || {};
    return {
      title: data.title || "",
      purpose: data.purpose?.toLowerCase() || "sell",
      propertyType: data.propertyType || data.category?.toLowerCase() || "",
      configuration: data.configuration || "",
      configDetails: data.configDetails || "",
      postedBy: data.postedBy || "owner",
      description: data.description || "",
      suitableFor: data.suitableFor || [],
      availableFrom: data.availableFrom || "",
      price: data.price || "",
      priceType: data.priceType?.toLowerCase() || "fixed",
      pricePerSqft: data.pricePerSqft || "",
      maintenance: data.maintenance || "",
      isReraVerified: data.isReraVerified || false,
      rentPrice: data.rentPrice || "",
      securityDeposit: data.securityDeposit || "",
      address: data.address || "",
      location: data.location || "",
      area: data.area || "",
      furnishing: data.furnishing || "",
      facing: data.facing || "",
      floor: data.floor || "",
      totalFloors: data.totalFloors || "",
      parking: data.parking || "",
      constructionStatus: data.constructionStatus || "",
      age: data.age || "",
      amenities: data.amenities || [],
      features: data.features || [],
      gallery: data.gallery || data.images || [],
      nearbyPlaces: data.nearbyPlaces || [],
    };
  });

  const updateFormData = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const sections = [
    { id: 'basic', label: 'Basic Info', icon: Info, component: BasicInfo },
    { id: 'description', label: 'Description', icon: AlignLeft, component: PropertyDescription },
    { id: 'rental', label: 'Rental Preferences', icon: Users, component: RentalSuitability, show: formData.purpose === 'rent' },
    { id: 'pricing', label: 'Pricing', icon: IndianRupee, component: Pricing },
    { id: 'location', label: 'Location', icon: MapPin, component: LocationInfo },
    { id: 'details', label: 'Details', icon: Layers, component: PropertyDetails },
    { id: 'amenities', label: 'Amenities', icon: Sparkles, component: AmenitiesFeatures },
    { id: 'gallery', label: 'Gallery', icon: Camera, component: ImageUpload },
    { id: 'nearby', label: 'Nearby', icon: Map, component: NearbyPlaces },
  ];

  const visibleSections = sections.filter(s => s.show !== false);
  const currentIndex = visibleSections.findIndex(s => s.id === activeTab);

  const isSectionValid = (sectionId) => {
    switch (sectionId) {
      case 'basic':
        return !!(formData.title?.trim() && formData.propertyType && formData.configuration && (formData.propertyType !== 'residential' || !!formData.configDetails?.trim()));
      case 'description':
        return !!formData.description?.trim() && formData.description !== '<p><br></p>';
      case 'rental':
        if (formData.purpose !== 'rent') return true;
        return (formData.suitableFor || []).length > 0 && !!formData.availableFrom;
      case 'pricing':
        if (formData.purpose === 'sell') {
          return !!formData.price?.trim();
        } else {
          return !!formData.rentPrice?.trim() && !!formData.securityDeposit?.trim();
        }
      case 'location':
        return !!formData.address?.trim() && !!formData.location?.trim();
      case 'details':
        const basicDetails = !!(formData.area?.trim() && formData.furnishing && formData.facing && formData.floor?.trim() && formData.totalFloors && formData.parking && formData.age);
        if (formData.purpose === 'sell') {
          return basicDetails && !!formData.constructionStatus;
        }
        return basicDetails;
      case 'gallery':
        return (formData.gallery || []).length > 0;
      case 'amenities':
      case 'nearby':
      default:
        return true;
    }
  };

  const handleNext = () => {
    if (!isSectionValid(activeTab)) return;
    if (currentIndex < visibleSections.length - 1) {
      setActiveTab(visibleSections[currentIndex + 1].id);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setActiveTab(visibleSections[currentIndex - 1].id);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const canNavigateTo = (targetId) => {
    const targetIndex = visibleSections.findIndex(s => s.id === targetId);
    if (targetIndex <= currentIndex) return true;
    
    // Check if all previous sections are valid
    for (let i = 0; i < targetIndex; i++) {
      if (!isSectionValid(visibleSections[i].id)) return false;
    }
    return true;
  };

  const ActiveComponent = visibleSections.find(s => s.id === activeTab)?.component || BasicInfo;

  return (
    <div className="max-w-6xl mx-auto">
      {/* Navigation Header */}
      <div className="bg-white/70 backdrop-blur-xl border border-zinc-100 rounded-[32px] p-2 mb-8 flex items-center justify-between overflow-x-auto no-scrollbar scroll-smooth">
        <div className="flex items-center gap-1 p-1">
          {visibleSections.map((section) => {
            const Icon = section.icon;
            const isActive = activeTab === section.id;
            const isCompleted = visibleSections.indexOf(section) < currentIndex;
            const isDisabled = !canNavigateTo(section.id);

            return (
              <button
                key={section.id}
                onClick={() => !isDisabled && setActiveTab(section.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-full text-[13px] font-black transition-all whitespace-nowrap
                  ${isActive
                    ? 'bg-brand-primary text-white shadow-lg shadow-brand-primary/20 cursor-default'
                    : isCompleted
                      ? 'text-brand-primary bg-brand-primary/10 hover:bg-brand-primary/20 cursor-pointer'
                      : isDisabled
                        ? 'text-brand-muted opacity-100 cursor-not-allowed'
                        : 'text-brand-paragraph hover:text-brand-heading hover:bg-zinc-100 cursor-pointer'}`}
              >
                {isCompleted ? <CheckCircle2 size={16} /> : <Icon size={16} />}
                {section.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10, scale: 0.99 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.99 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            <ActiveComponent
              formData={formData}
              updateFormData={updateFormData}
            />
          </motion.div>
        </AnimatePresence>
      </div>


      {/* Footer Actions */}
      <div className="w-full mt-12 px-2">
        <motion.div
          className="relative bg-white border border-zinc-100 rounded-[32px] p-2 shadow-sm flex items-center justify-between gap-4 overflow-hidden"
        >
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className={`flex items-center gap-2 md:gap-3 bg-zinc-900 text-white px-5 md:px-8 py-3.5 md:py-4 max-[426px]:py-3 rounded-full text-[13px] md:text-[14px] font-bold hover:bg-black transition-all cursor-pointer shadow-xl shadow-zinc-900/10 disabled:opacity-30 disabled:pointer-events-none`}
          >
            <ChevronLeft size={18} className="md:w-5 md:h-5" />
            <span className="hidden min-[500px]:inline">Back Section</span>
            <span className="min-[500px]:hidden">Back</span>
          </motion.button>

          {/* Step Indicator */}
          <div className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center min-w-[120px] pointer-events-none">
            <motion.span
              key={activeTab}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-brand-muted mb-1 flex items-center gap-1.5 md:gap-2"
            >
              <span className="text-brand-primary">Step {currentIndex + 1}</span>
              <span className="h-1 w-1 rounded-full bg-zinc-300 hidden sm:block" />
              <span className="hidden sm:inline text-slate-500">{visibleSections[currentIndex].label}</span>
            </motion.span>
            <div className="flex items-center gap-1 md:gap-1.5">
              {visibleSections.map((_, idx) => (
                <div
                  key={idx}
                  className={`h-1 md:h-1.5 rounded-full transition-all duration-500 ${idx === currentIndex ? 'w-4 md:w-6 bg-brand-primary' : idx < currentIndex ? 'w-1.5 md:w-2 bg-brand-primary/40' : 'w-1 md:w-1.5 bg-zinc-200'}`}
                />
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2 md:gap-3">


            {currentIndex < visibleSections.length - 1 ? (
              <motion.button
                whileHover={isSectionValid(activeTab) ? { scale: 1.02 } : {}}
                whileTap={isSectionValid(activeTab) ? { scale: 0.98 } : {}}
                onClick={handleNext}
                disabled={!isSectionValid(activeTab)}
                className={`flex items-center gap-2 md:gap-3 bg-zinc-900 text-white px-5 md:px-8 py-3.5 md:py-4 max-[426px]:py-3 rounded-full text-[13px] md:text-[14px] font-bold transition-all shadow-xl shadow-zinc-900/10
                  ${isSectionValid(activeTab) ? 'hover:bg-black cursor-pointer' : 'opacity-30 cursor-not-allowed'}`}
              >
                <span className="hidden min-[500px]:inline">Next Section</span>
                <span className="min-[500px]:hidden">Next</span>
                <ChevronRight size={18} className="md:w-5 md:h-5" />
              </motion.button>
            ) : (
              <motion.button
                whileHover={isSectionValid(activeTab) ? { scale: 1.02 } : {}}
                whileTap={isSectionValid(activeTab) ? { scale: 0.98 } : {}}
                onClick={() => isSectionValid(activeTab) && onSave(formData)}
                disabled={!isSectionValid(activeTab)}
                className={`flex items-center gap-2 md:gap-3 bg-brand-primary text-white px-5 max-[426px]:px-3 md:px-10 py-3.5 max-[426px]:py-3 md:py-4 rounded-full text-[13px] md:text-[14px] font-bold transition-all shadow-xl shadow-brand-primary/20
                  ${isSectionValid(activeTab) ? 'hover:bg-brand-primary-dark cursor-pointer' : 'opacity-30 cursor-not-allowed'}`}
              >
                <Save size={18} className="md:w-5 md:h-5" />
                <span className="hidden min-[500px]:inline">Publish Property</span>
                <span className="min-[500px]:hidden">Publish</span>
              </motion.button>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PropertyForm;
