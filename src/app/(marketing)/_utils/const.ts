import {
  CheckIcon,
  SparkleIcon,
  ShieldIcon,
  AlignLeftIcon,
  SmileIcon,
  LucideCloudLightning,
  LucideStar,
  LucideShield,
} from "lucide-react";
export const PHONE_NUMBER = "(555) 123-4567";
export const items = [
  {
    title: "Preventive Care",
    desc: "Comprehensive cleanings, exams, and digital X-rays to keep your smile healthy and prevent future issues.",
    Icon: CheckIcon,
  },
  {
    title: "Cosmetic Dentistry",
    desc: "Transform your smile with professional whitening, veneers, and bonding for confidence that shines.",
    Icon: SparkleIcon,
  },
  {
    title: "Dental Implants",
    desc: "Advanced implant solutions using the latest technology to restore your smile naturally and permanently.",
    Icon: ShieldIcon,
  },
  {
    title: "Orthodontics",
    desc: "Modern Invisalign and traditional braces for all ages, creating perfectly aligned smiles.",
    Icon: AlignLeftIcon,
  },
  {
    title: "Family Dentistry",
    desc: "Gentle, caring dental visits for the whole family, building healthy habits that last a lifetime.",
    Icon: SmileIcon,
  },
  {
    title: "Emergency Care",
    desc: "24/7 emergency dental care for urgent situations, providing immediate relief when you need it most.",
    Icon: LucideCloudLightning,
  },
];

export const bannerLeftItems = [
  {
    text: "4.9★ from 500+ patients",
    Icon: LucideStar,
  },
  {
    text: "Same-day emergency care",
    Icon: LucideCloudLightning,
  },
  {
    text: "All major insurances accepted",
    Icon: LucideShield,
  },
];

export const MENU_LIST = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "Why Choose Us",
    href: "#why_choose_us",
  },
  {
    name: "Services",
    href: "#services",
  },
  {
    name: "Testimonials",
    href: "#testimonials",
  },
  {
    name: "Our Office",
    href: "#office",
  },
];
export const WIZARD_STEPS = [
  { id: 1, title: "Patient Information", description: "Basic details" },
  { id: 2, title: "Insurance", description: "Dental insurance info" },
  { id: 3, title: "Preferences", description: "Appointment preferences" },
  { id: 4, title: "Book Appointment", description: "Select time slot" },
];

export const MORNING_PREFERRENCE = "MORNING";
export const AFTERNOON_PREFERRENCE = "AFTERNOON";
export const ANY_TIME_PREFERRENCE = "ANYTIME";
