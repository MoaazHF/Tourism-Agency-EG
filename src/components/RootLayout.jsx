import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import { Globe, Mail, Phone, MapPin } from 'lucide-react'; // Simulating material icons

const RootLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="grow pt-20">
        <Outlet />
      </main>

      {/* Footer translated from Design */}
      <footer className="bg-[#f2f4ed] dark:bg-[#1a2b48] w-full pt-20 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 px-12 max-w-7xl mx-auto font-body text-sm leading-relaxed">
          {/* Brand Column */}
          <div className="space-y-6 opacity-80 hover:opacity-100 transition-opacity">
            <div className="text-xl font-black text-[#1a2b48] dark:text-[#f8faf3]">Route d'Égypte</div>
            <p class="text-[#695d48] dark:text-[#f2f4ed]/70">The excellence of tailor-made travel in Egypt. Discover authentic and luxurious experiences created for discerning travelers.</p>
            <div className="flex gap-4">
              <Globe className="text-primary cursor-pointer w-5 h-5" />
              <Mail className="text-primary cursor-pointer w-5 h-5" />
            </div>
          </div>
          
          {/* Quick Links */}
          <div className="space-y-6">
            <h4 className="font-headline font-bold text-[#1a2b48] dark:text-[#f8faf3] uppercase tracking-wider text-xs">Quick Links</h4>
            <ul className="space-y-4 text-[#695d48] dark:text-[#f2f4ed]/70">
              <li><a className="hover:text-primary dark:hover:text-primary-container underline underline-offset-4" href="#">About Us</a></li>
              <li><a className="hover:text-primary dark:hover:text-primary-container underline underline-offset-4" href="#">Terms of Service</a></li>
              <li><a className="hover:text-primary dark:hover:text-primary-container underline underline-offset-4" href="#">Privacy Policy</a></li>
              <li><a className="hover:text-primary dark:hover:text-primary-container underline underline-offset-4" href="#">FAQ</a></li>
            </ul>
          </div>
          
          {/* Destinations */}
          <div className="space-y-6">
            <h4 className="font-headline font-bold text-[#1a2b48] dark:text-[#f8faf3] uppercase tracking-wider text-xs">Destinations</h4>
            <ul className="space-y-4 text-[#695d48] dark:text-[#f2f4ed]/70">
              <li><a className="hover:text-primary dark:hover:text-primary-container underline underline-offset-4" href="#">Cairo & Giza</a></li>
              <li><a className="hover:text-primary dark:hover:text-primary-container underline underline-offset-4" href="#">Luxor & Aswan</a></li>
              <li><a className="hover:text-primary dark:hover:text-primary-container underline underline-offset-4" href="#">Red Sea</a></li>
              <li><a className="hover:text-primary dark:hover:text-primary-container underline underline-offset-4" href="#">Oasis & Deserts</a></li>
            </ul>
          </div>
          
          {/* Contact */}
          <div className="space-y-6">
            <h4 className="font-headline font-bold text-[#1a2b48] dark:text-[#f8faf3] uppercase tracking-wider text-xs">Contact & Support</h4>
            <ul className="space-y-4 text-[#695d48] dark:text-[#f2f4ed]/70">
              <li className="flex items-center gap-2"><Phone className="w-4 h-4" /> +20 123 456 789</li>
              <li className="flex items-center gap-2"><Mail className="w-4 h-4" /> contact@routedegypte.com</li>
              <li className="flex items-center gap-2"><MapPin className="w-4 h-4" /> Garden City, Cairo, Egypt</li>
            </ul>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto px-12 mt-20 pt-8 border-t border-[#695d48]/10 text-center text-[#695d48] dark:text-[#f2f4ed]/50 text-xs">
          © 2024 Route d'Égypte. The Sands of Distinction.
        </div>
      </footer>
    </div>
  );
};

export default RootLayout;
