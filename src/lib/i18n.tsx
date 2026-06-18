import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Lang = "en" | "km";

type Dict = Record<string, { en: string; km: string }>;

export const dict = {
  // nav
  nav_home: { en: "Home", km: "ទំព័រដើម" },
  nav_about: { en: "About", km: "អំពីយើង" },
  nav_programs: { en: "Programs", km: "កម្មវិធី" },
  nav_recruit: { en: "Deployment", km: "ការដាក់ពង្រាយ" },
  nav_apply: { en: "Apply", km: "ចុះឈ្មោះ" },
  nav_contact: { en: "Contact", km: "ទំនាក់ទំនង" },
  apply_cta: { en: "Apply Now", km: "ចុះឈ្មោះឥឡូវ" },

  // brand
  brand_full_en: { en: "Cambodian Speed Accurate Tactical Co., Ltd.", km: "Cambodian Speed Accurate Tactical Co., Ltd." },
  brand_full_km: { en: "ខេមបូឌាន ស្ពីជ អាកឃ្យូរ៉េត ថាក់ថិចខល ឯ.ក", km: "ខេមបូឌាន ស្ពីជ អាកឃ្យូរ៉េត ថាក់ថិចខល ឯ.ក" },
  brand_tag: { en: "Training • Recruitment • Workforce Deployment", km: "បណ្តុះបណ្តាល • ជ្រើសរើស • ដាក់ពង្រាយកម្លាំងពលកម្ម" },

  // hero
  hero_kicker: { en: "Established 2024 — Kingdom of Cambodia", km: "បង្កើតឡើងឆ្នាំ ២០២៤ — ព្រះរាជាណាចក្រកម្ពុជា" },
  hero_title_1: { en: "Training", km: "បណ្តុះបណ្តាល" },
  hero_title_2: { en: "Elite Workforce", km: "កម្លាំងពលកម្មឯកទេស" },
  hero_lead: {
    en: "Professional preparation, certification, and deployment of disciplined personnel to partner companies and operational sites across Cambodia.",
    km: "ការរៀបចំវិជ្ជាជីវៈ វិញ្ញាបនប័ត្រ និងការដាក់ពង្រាយបុគ្គលិកប្រកបដោយវិន័យទៅកាន់ក្រុមហ៊ុនដៃគូ និងទីតាំងប្រតិបត្តិការទូទាំងប្រទេសកម្ពុជា។",
  },
  view_programs: { en: "View Programs", km: "មើលកម្មវិធី" },

  // home intro
  intro_title: { en: "A new standard for tactical workforce", km: "ស្តង់ដារថ្មីសម្រាប់កម្លាំងពលកម្មយុទ្ធសាស្ត្រ" },
  intro_body: {
    en: "CSAT Academy is a Cambodia-based training institution focused on building competent, disciplined, and certified personnel. We combine professional instruction with direct deployment to partner organizations.",
    km: "ស្ថាប័នបណ្តុះបណ្តាលនៅកម្ពុជា ផ្តោតលើការបង្កើតបុគ្គលិកមានសមត្ថភាព វិន័យ និងវិញ្ញាបនប័ត្រ ដោយផ្សារភ្ជាប់នឹងការដាក់ពង្រាយដោយផ្ទាល់ទៅកាន់ស្ថាប័នដៃគូ។",
  },

  // programs section
  programs_kicker: { en: "Core Training Programs", km: "កម្មវិធីបណ្តុះបណ្តាលចម្បង" },
  programs_lead: {
    en: "Four specialized tracks designed for real-world deployment.",
    km: "កម្មវិធីឯកទេសបួនយ៉ាង រៀបចំសម្រាប់ការដាក់ពង្រាយក្នុងបរិបទពិតប្រាកដ។",
  },
  duration: { en: "Duration", km: "រយៈពេល" },
  requirements: { en: "Requirements", km: "លក្ខខណ្ឌ" },
  careers: { en: "Career Opportunities", km: "ឱកាសការងារ" },
  view_details: { en: "View Details", km: "មើលលម្អិត" },

  // workflow
  workflow_title: { en: "Training to Deployment", km: "ពីបណ្តុះបណ្តាលដល់ការដាក់ពង្រាយ" },
  step_train: { en: "Training", km: "ការបណ្តុះបណ្តាល" },
  step_cert: { en: "Certification", km: "វិញ្ញាបនប័ត្រ" },
  step_deploy: { en: "Deployment", km: "ការដាក់ពង្រាយ" },
  step_partners: { en: "Partner Companies", km: "ក្រុមហ៊ុនដៃគូ" },

  // about
  about_title: { en: "About the Academy", km: "អំពីសាលា" },
  about_overview: {
    en: "Cambodian Speed Accurate Tactical Co., Ltd. (CSAT) is a professional training and workforce deployment company serving the security, safety, and technical sectors of the Kingdom of Cambodia.",
    km: "ខេមបូឌាន ស្ពីជ អាកឃ្យូរ៉េត ថាក់ថិចខល ឯ.ក (CSAT) គឺជាក្រុមហ៊ុនបណ្តុះបណ្តាល និងដាក់ពង្រាយកម្លាំងពលកម្មជំនាញ បម្រើដល់វិស័យសន្តិសុខ សុវត្ថិភាព និងបច្ចេកទេសក្នុងព្រះរាជាណាចក្រកម្ពុជា។",
  },
  vision_title: { en: "Our Vision", km: "ចក្ខុវិស័យ" },
  vision_body: {
    en: "To become Cambodia's most trusted source of trained, certified, and deployment-ready tactical personnel.",
    km: "ក្លាយជាប្រភពដែលគួរឱ្យទុកចិត្តបំផុតនៅកម្ពុជា សម្រាប់បុគ្គលិកយុទ្ធសាស្ត្រដែលបានបណ្តុះបណ្តាល និងត្រៀមរួចសម្រាប់ការដាក់ពង្រាយ។",
  },
  mission_title: { en: "Our Mission", km: "បេសកកម្ម" },
  mission_body: {
    en: "Deliver disciplined training, credible certification, and reliable placement that benefits both our trainees and our partner organizations.",
    km: "ផ្តល់ការបណ្តុះបណ្តាលប្រកបដោយវិន័យ វិញ្ញាបនប័ត្រដែលគួរឱ្យជឿទុកចិត្ត និងការដាក់ការងារដែលជឿជាក់ ដែលផ្តល់ផលប្រយោជន៍ដល់សិក្ខាកាម និងស្ថាប័នដៃគូ។",
  },
  why_title: { en: "Why Choose Us", km: "ហេតុអ្វីជ្រើសរើសយើង" },
  why_1_t: { en: "Professional Curriculum", km: "កម្មវិធីសិក្សាវិជ្ជាជីវៈ" },
  why_1_b: { en: "Built around real operational standards used by leading security and safety operators.", km: "បង្កើតឡើងតាមស្តង់ដារប្រតិបត្តិការពិតប្រាកដ។" },
  why_2_t: { en: "Direct Deployment", km: "ការដាក់ការងារផ្ទាល់" },
  why_2_b: { en: "Graduates are placed into partner organizations through our recruitment pipeline.", km: "សិក្ខាកាមត្រូវបានដាក់ការងារទៅកាន់ស្ថាប័នដៃគូ។" },
  why_3_t: { en: "Bilingual Instruction", km: "ការបង្រៀនពីរភាសា" },
  why_3_b: { en: "Khmer and English instruction with Mandarin support for cross-border roles.", km: "បង្រៀនជាភាសាខ្មែរ និងអង់គ្លេស រួមជាមួយការគាំទ្រភាសាចិន។" },

  // recruitment page
  recruit_title: { en: "Recruitment & Deployment", km: "ការជ្រើសរើស និងដាក់ពង្រាយ" },
  recruit_lead: {
    en: "A clear pipeline from enrollment to active placement with our partner network.",
    km: "ដំណើរការច្បាស់លាស់ពីការចុះឈ្មោះរហូតដល់ការដាក់ការងារជាមួយដៃគូរបស់យើង។",
  },
  match_title: { en: "Job Matching", km: "ការផ្គូផ្គងការងារ" },
  match_body: {
    en: "We match certified graduates to roles based on their training track, language ability, and the operational needs of each partner company.",
    km: "យើងផ្គូផ្គងសិក្ខាកាមដែលមានវិញ្ញាបនប័ត្រទៅនឹងតួនាទី ដោយផ្អែកលើកម្មវិធីបណ្តុះបណ្តាល សមត្ថភាពភាសា និងតម្រូវការប្រតិបត្តិការរបស់ដៃគូនីមួយៗ។",
  },

  // apply page
  apply_title: { en: "Enrollment Application", km: "ពាក្យសុំចុះឈ្មោះ" },
  apply_lead: { en: "Submit your details and we will contact you to complete enrollment.", km: "បំពេញព័ត៌មាន ហើយយើងនឹងទាក់ទងអ្នកសម្រាប់ការចុះឈ្មោះពេញលេញ។" },
  f_name: { en: "Full Name", km: "ឈ្មោះពេញ" },
  f_phone: { en: "Phone Number", km: "លេខទូរស័ព្ទ" },
  f_gender: { en: "Gender", km: "ភេទ" },
  f_male: { en: "Male", km: "ប្រុស" },
  f_female: { en: "Female", km: "ស្រី" },
  f_program: { en: "Training Program", km: "កម្មវិធី" },
  f_address: { en: "Address / Location", km: "អាសយដ្ឋាន" },
  f_id: { en: "Upload ID (optional)", km: "បញ្ចូលអត្តសញ្ញាណប័ណ្ណ (ស្រេចចិត្ត)" },
  f_submit: { en: "Submit Application", km: "ដាក់ស្នើ" },
  f_thanks: { en: "Application received. We will contact you shortly.", km: "បានទទួលពាក្យសុំ។ យើងនឹងទាក់ទងអ្នកក្នុងពេលឆាប់ៗនេះ។" },

  // contact
  contact_title: { en: "Contact the Academy", km: "ទាក់ទងសាលា" },
  contact_lead: { en: "Reach us for enrollment, partnership, or general inquiries.", km: "ទាក់ទងយើងសម្រាប់ការចុះឈ្មោះ ភាពជាដៃគូ ឬសំណួរទូទៅ។" },
  c_phone: { en: "Phone", km: "ទូរស័ព្ទ" },
  c_email: { en: "Email", km: "អ៊ីមែល" },
  c_telegram: { en: "Telegram", km: "តេឡេក្រាម" },
  c_address: { en: "Address", km: "អាសយដ្ឋាន" },
  c_message: { en: "Your message", km: "សារ" },
  c_send: { en: "Send Message", km: "ផ្ញើសារ" },

  footer_rights: { en: "All rights reserved.", km: "រក្សាសិទ្ធិគ្រប់យ៉ាង។" },
} satisfies Dict;

export type DictKey = keyof typeof dict;

interface I18nCtx {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: DictKey) => string;
}

const I18nContext = createContext<I18nCtx | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    try {
      const saved = localStorage.getItem("csat-lang");
      if (saved === "km" || saved === "en") setLangState(saved);
    } catch {}
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    try { localStorage.setItem("csat-lang", l); } catch {}
  };

  const t = (key: DictKey) => dict[key][lang];

  return <I18nContext.Provider value={{ lang, setLang, t }}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}
