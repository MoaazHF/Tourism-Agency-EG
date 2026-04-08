import { Map, Settings, Award, CheckCircle, Tag, ShieldCheck } from 'lucide-react';

const Home = () => {
  const scrollToValueProp = () => {
    const section = document.getElementById('why-book-with-us');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const valueProps = [
    {
      icon: <Map className="w-10 h-10 text-gold-500 mb-4" />,
      title: "Specialization",
      description: "Deep local expertise in Egyptian travel."
    },
    {
      icon: <Settings className="w-10 h-10 text-gold-500 mb-4" />,
      title: "Exceptional Flexibility",
      description: "Customize any itinerary to your needs."
    },
    {
      icon: <Award className="w-10 h-10 text-gold-500 mb-4" />,
      title: "Award-Winning Services",
      description: "Recognized for excellence in tourism."
    },
    {
      icon: <CheckCircle className="w-10 h-10 text-gold-500 mb-4" />,
      title: "Easy To Book",
      description: "Simple process from inquiry to confirmation."
    },
    {
      icon: <Tag className="w-10 h-10 text-gold-500 mb-4" />,
      title: "Reasonable Pricing",
      description: "Best value without compromising quality."
    },
    {
      icon: <ShieldCheck className="w-10 h-10 text-gold-500 mb-4" />,
      title: "Secure Payment",
      description: "Trusted and protected transactions."
    }
  ];

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative w-full h-[50vh] min-h-[400px] flex items-center justify-center">
        {/* Background Image */}
        <div 
          className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1539650116574-8efeb43e2750?q=80&w=2070&auto=format&fit=crop')" }}
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-linear-to-b from-black/60 via-black/40 to-black/70" />

        {/* Content */}
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto flex flex-col items-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 drop-shadow-lg">
            Discover Egypt Like Never Before
          </h1>
          <p className="text-lg md:text-xl text-gray-100 mb-8 drop-shadow-md">
            Handcrafted Nile cruises, desert safaris & cultural excursions — tailored for you.
          </p>
          <button 
            onClick={scrollToValueProp}
            className="bg-gold-500 hover:bg-[#b8962c] text-white font-semibold py-3 px-8 rounded-md transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 duration-200"
          >
            Explore Our Trips
          </button>
        </div>
      </section>
      
      {/* Value Proposition Section */}
      <section id="why-book-with-us" className="min-h-[50vh] w-full py-20 px-4 bg-gray-50 flex flex-col justify-center">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
            Why Book With Us
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {valueProps.map((prop, index) => (
              <div 
                key={index}
                className="bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100 flex flex-col items-center text-center"
              >
                {prop.icon}
                <h3 className="text-xl font-bold text-gray-900 mb-3">{prop.title}</h3>
                <p className="text-gray-600">{prop.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
