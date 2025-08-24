import Wrapper from "./wrapper";
import {
  LucidePhone,
  LucideMail,
  LucideMapPin,
  LucideClock,
  LucideFacebook,
  LucideTwitter,
  LucideInstagram,
  LucideLinkedin,
} from "lucide-react";
import Link from "next/link";

const contactInfo = [
  {
    icon: LucidePhone,
    label: "Phone",
    value: "(555) 123-4567",
    href: "tel:+15551234567",
  },
  {
    icon: LucideMail,
    label: "Email",
    value: "hello@dentalclinic.com",
    href: "mailto:hello@dentalclinic.com",
  },
  {
    icon: LucideMapPin,
    label: "Address",
    value: "123 Dental Street, City, State 12345",
    href: "#",
  },
  {
    icon: LucideClock,
    label: "Hours",
    value: "Mon-Fri: 8AM-6PM, Sat: 9AM-3PM",
    href: "#",
  },
];

const quickLinks = {
  services: [
    { name: "Preventive Care", href: "#services" },
    { name: "Cosmetic Dentistry", href: "#services" },
    { name: "Dental Implants", href: "#services" },
    { name: "Emergency Care", href: "#services" },
  ],
  company: [
    { name: "About Us", href: "#about" },
    { name: "Our Team", href: "#about" },
    { name: "Patient Stories", href: "#testimonials" },
    { name: "Careers", href: "#" },
  ],
  support: [
    { name: "Book Appointment", href: "/booking" },
    { name: "Insurance Info", href: "#" },
    { name: "Patient Forms", href: "#" },
    { name: "FAQ", href: "#" },
  ],
  legal: [
    { name: "Privacy Policy", href: "#" },
    { name: "Terms of Service", href: "#" },
    { name: "HIPAA Notice", href: "#" },
    { name: "Accessibility", href: "#" },
  ],
};

const socialLinks = [
  {
    name: "Facebook",
    icon: LucideFacebook,
    href: "#",
    color: "hover:text-blue-600",
  },
  {
    name: "Twitter",
    icon: LucideTwitter,
    href: "#",
    color: "hover:text-sky-500",
  },
  {
    name: "Instagram",
    icon: LucideInstagram,
    href: "#",
    color: "hover:text-pink-600",
  },
  {
    name: "LinkedIn",
    icon: LucideLinkedin,
    href: "#",
    color: "hover:text-blue-700",
  },
];

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-slate-900 to-slate-800 text-white">
      <Wrapper className="py-10 lg:py-12">
        <div className="space-y-10">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {/* Company Info */}
            <div className="md:col-span-2 lg:col-span-1 space-y-4">
              <div>
                <h3 className="text-xl font-bold bg-gradient-to-r from-sky-400 to-cyan-400 bg-clip-text text-transparent">
                  Dental Clinic
                </h3>
                <p className="text-slate-300 mt-2 leading-relaxed text-sm">
                  Providing exceptional dental care with compassion and advanced
                  technology. Your smile is our priority.
                </p>
              </div>

              {/* Contact Information */}
              <div className="space-y-3">
                {contactInfo.map((contact) => (
                  <div key={contact.label} className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-4 h-4 mt-0.5">
                      <contact.icon className="w-4 h-4 text-sky-400" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs text-slate-400 font-medium">
                        {contact.label}
                      </p>
                      <a
                        href={contact.href}
                        className="text-slate-200 hover:text-sky-400 transition-colors duration-200 text-sm"
                      >
                        {contact.value}
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Services */}
            <div>
              <h4 className="text-base font-semibold text-white mb-3">
                Services
              </h4>
              <ul className="space-y-2">
                {quickLinks.services.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-slate-300 hover:text-sky-400 transition-colors duration-200 text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="text-base font-semibold text-white mb-3">
                Company
              </h4>
              <ul className="space-y-2">
                {quickLinks.company.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-slate-300 hover:text-sky-400 transition-colors duration-200 text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support */}
            <div>
              <h4 className="text-base font-semibold text-white mb-3">
                Support
              </h4>
              <ul className="space-y-2">
                {quickLinks.support.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-slate-300 hover:text-sky-400 transition-colors duration-200 text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Social & Legal */}
          <div className="pt-6 border-t border-slate-700">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              {/* Legal Links */}
              <div className="flex flex-wrap gap-4 text-sm">
                {quickLinks.legal.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="text-slate-400 hover:text-sky-400 transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>

              {/* Social Links */}
              <div className="flex items-center gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    className={`w-8 h-8 bg-slate-700 hover:bg-sky-600 rounded-lg flex items-center justify-center transition-all duration-200 ${social.color}`}
                    aria-label={social.name}
                  >
                    <social.icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-6 border-t border-slate-700">
            <div className="flex flex-col md:flex-row justify-between items-center gap-3 text-sm text-slate-400">
              <p>© 2024 Dental Clinic. All rights reserved.</p>
              <p>&nbsp;</p>
            </div>
          </div>
        </div>
      </Wrapper>
    </footer>
  );
}
