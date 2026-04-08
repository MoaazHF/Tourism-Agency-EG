const Home = () => {
  const scrollToValueProp = () => {
    const section = document.getElementById('why-book-with-us');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

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
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />

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
      
      {/* Value prop placeholder for scroll target */}
      <div id="why-book-with-us" className="h-10"></div>
    </div>
  );
};

export default Home;
