import { Facebook, Twitter, Youtube, Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const categories = [
  ["ताज़ा खबर", "बिहार", "सीमांचल", "अररिया"],
  ["किशनगंज", "कटिहार", "पूर्णिया", "राष्ट्रीय"],
  ["राजनीति", "अपराध", "खेल", "मनोरंजन"],
  ["व्यापार", "शिक्षा", "स्वास्थ्य", "धर्म"],
];

interface FooterProps {
  logoUrl?: string | null;
  siteName?: string;
}

export function Footer({ logoUrl, siteName = 'खबर सीमांचल' }: FooterProps) {
  return (
    <footer className="bg-[#1a1a1a] text-gray-300 pt-16 pb-8 px-4 mt-20">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* About Section */}
          <div className="space-y-6">
            <Link href="/" className="inline-block">
              {logoUrl ? (
                <Image
                  src={logoUrl}
                  alt={siteName}
                  width={200}
                  height={60}
                  className="h-12 w-auto object-contain brightness-0 invert"
                />
              ) : (
                <h2 className="text-3xl font-extrabold text-white font-hindi">{siteName}</h2>
              )}
            </Link>
            <p className="text-sm leading-relaxed font-hindi">
              खबर सीमांचल बिहार के सीमांचल क्षेत्र का प्रमुख हिंदी समाचार पोर्टल है। हम आपको क्षेत्र की हर छोटी-बड़ी खबर से अपडेट रखते हैं।
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-brand hover:text-white transition-all"><Facebook className="w-5 h-5" /></a>
              <a href="#" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-brand hover:text-white transition-all"><Twitter className="w-5 h-5" /></a>
              <a href="#" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-brand hover:text-white transition-all"><Youtube className="w-5 h-5" /></a>
            </div>
          </div>

          {/* Quick Links / Categories */}
          <div className="lg:col-span-2 grid grid-cols-2 sm:grid-cols-4 gap-8">
            {categories.map((group, i) => (
              <div key={i}>
                <h3 className="text-white font-bold mb-6 font-hindi">श्रेणियाँ</h3>
                <ul className="space-y-4 text-sm font-hindi">
                  {group.map((cat) => (
                    <li key={cat}>
                      <Link href="#" className="hover:text-brand transition-colors">{cat}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* contact Section */}
          <div className="space-y-6">
            <h3 className="text-white font-bold mb-6 font-hindi">संपर्क करें</h3>
            <ul className="space-y-4 text-sm font-hindi">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-brand shrink-0" />
                <span>पूर्णिया, बिहार - 854301, भारत</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-brand shrink-0" />
                <span>+91 1234567890</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-brand shrink-0" />
                <span>contact@khabarseemanchal.in</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8 mt-12 flex flex-col md:flex-row items-center justify-between gap-6 text-xs uppercase tracking-widest font-semibold text-gray-500">
          <div className="flex flex-wrap justify-center gap-4 md:gap-8 font-hindi uppercase">
            <Link href="/about" className="hover:text-white transition-colors">हमारे बारे में</Link>
            <Link href="/contact" className="hover:text-white transition-colors">संपर्क</Link>
            <Link href="/privacy-policy" className="hover:text-white transition-colors">गोपनीयता नीति</Link>
            <Link href="/disclaimer" className="hover:text-white transition-colors">डिस्क्लेमर</Link>
            <Link href="/sitemap" className="hover:text-white transition-colors">साइटमैप</Link>
          </div>
          <div className="text-center md:text-right font-hindi">
            © 2025 खबर सीमांचल. सर्वाधिकार सुरक्षित।
          </div>
        </div>
      </div>
    </footer>
  );
}
