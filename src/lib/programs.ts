import type { DictKey } from "./i18n";

export interface ProgramReq {
  en: string;
  km: string;
}

export interface Program {
  code: string;
  slug: string;
  title: { en: string; km: string };
  short: { en: string; km: string };
  description: { en: string; km: string };
  duration: { en: string; km: string };
  requirements: ProgramReq[];
  careers: { en: string; km: string }[];
}

export const programs: Program[] = [
  {
    code: "SEC-01",
    slug: "security-guard",
    title: { en: "Security Guard Training", km: "បណ្តុះបណ្តាលសន្តិសុខ" },
    short: {
      en: "Professional protection, surveillance, and tactical response.",
      km: "ការការពារ ការឃ្លាំមើល និងការឆ្លើយតបយុទ្ធសាស្ត្រ។",
    },
    description: {
      en: "A complete program covering site protection, access control, patrol procedures, surveillance, conflict de-escalation, and emergency response — built around the operational standards expected by commercial and industrial clients.",
      km: "កម្មវិធីពេញលេញគ្របដណ្តប់ការការពារទីតាំង ការគ្រប់គ្រងការចូល នីតិវិធីល្បាត ការឃ្លាំមើល ការបន្ធូរបន្ថយជម្លោះ និងការឆ្លើយតបអាសន្ន — រៀបចំតាមស្តង់ដារដែលរំពឹងទុកដោយអតិថិជនពាណិជ្ជកម្ម និងឧស្សាហកម្ម។",
    },
    duration: { en: "8 weeks", km: "៨ សប្តាហ៍" },
    requirements: [
      { en: "Age 18 or older", km: "អាយុ ១៨ ឆ្នាំឡើង" },
      { en: "Physically fit, no major medical conditions", km: "មានសុខភាពល្អ" },
      { en: "Clean background record", km: "ប្រវត្តិស្អាត" },
    ],
    careers: [
      { en: "Site & Facility Security Guard", km: "អ្នកយាមទីតាំង និងសម្ភារ" },
      { en: "Corporate Security Officer", km: "មន្ត្រីសន្តិសុខសាជីវកម្ម" },
      { en: "Event & VIP Protection", km: "សន្តិសុខព្រឹត្តិការណ៍ និង VIP" },
    ],
  },
  {
    code: "FIRE-02",
    slug: "firefighting",
    title: { en: "Firefighting Training", km: "បណ្តុះបណ្តាលពន្លត់អគ្គីភ័យ" },
    short: {
      en: "Fire prevention, suppression, and rescue operations.",
      km: "ការការពារ ការពន្លត់ និងប្រតិបត្តិការសង្គ្រោះ។",
    },
    description: {
      en: "Hands-on training in fire behavior, suppression techniques, equipment handling, hazardous material awareness, and victim rescue for industrial sites, construction projects, and commercial facilities.",
      km: "ការបណ្តុះបណ្តាលជាក់ស្តែងលើឥរិយាបថភ្លើង បច្ចេកទេសពន្លត់ ការប្រើប្រាស់ឧបករណ៍ ការយល់ដឹងពីសារធាតុគ្រោះថ្នាក់ និងការសង្គ្រោះជនរងគ្រោះសម្រាប់ទីតាំងឧស្សាហកម្ម គម្រោងសំណង់ និងស្ថាប័នពាណិជ្ជកម្ម។",
    },
    duration: { en: "6 weeks", km: "៦ សប្តាហ៍" },
    requirements: [
      { en: "Age 18 or older", km: "អាយុ ១៨ ឆ្នាំឡើង" },
      { en: "Strong physical condition", km: "សុខភាពរឹងមាំ" },
      { en: "No fear of heights or confined spaces", km: "មិនខ្លាចកម្ពស់ ឬកន្លែងតូចចង្អៀត" },
    ],
    careers: [
      { en: "Industrial Safety Officer", km: "មន្ត្រីសុវត្ថិភាពឧស្សាហកម្ម" },
      { en: "Site Firefighter", km: "អ្នកពន្លត់អគ្គីភ័យទីតាំង" },
      { en: "Emergency Response Team Member", km: "សមាជិកក្រុមឆ្លើយតបអាសន្ន" },
    ],
  },
  {
    code: "DRON-03",
    slug: "drone-operation",
    title: { en: "Drone Operation Training", km: "បណ្តុះបណ្តាលបង្ហោះដ្រូន" },
    short: {
      en: "UAV piloting for surveillance, mapping, and logistics.",
      km: "ការបង្ហោះដ្រូនសម្រាប់ការឃ្លាំមើល ការគូសផែនទី និងភស្តុភារ។",
    },
    description: {
      en: "Practical drone piloting covering flight controls, safety regulations, aerial surveillance, photogrammetry, site mapping, and basic maintenance for security, agricultural, and commercial applications.",
      km: "ការបង្ហោះដ្រូនជាក់ស្តែងគ្របដណ្តប់ការគ្រប់គ្រងហោះហើរ បទប្បញ្ញត្តិសុវត្ថិភាព ការឃ្លាំមើលពីលើ ការគូសផែនទីទីតាំង និងការថែទាំសម្រាប់សន្តិសុខ កសិកម្ម និងពាណិជ្ជកម្ម។",
    },
    duration: { en: "4 weeks", km: "៤ សប្តាហ៍" },
    requirements: [
      { en: "Age 18 or older", km: "អាយុ ១៨ ឆ្នាំឡើង" },
      { en: "Basic literacy & comfort with technology", km: "មានចំណេះដឹងមូលដ្ឋាន និងស្គាល់បច្ចេកវិទ្យា" },
      { en: "Good eyesight", km: "ភ្នែកល្អ" },
    ],
    careers: [
      { en: "Aerial Surveillance Operator", km: "អ្នកប្រតិបត្តិការឃ្លាំមើលពីលើ" },
      { en: "Survey & Mapping Drone Pilot", km: "អ្នកបង្ហោះដ្រូនស្ទង់ផែនទី" },
      { en: "Agricultural Drone Operator", km: "អ្នកប្រតិបត្តិដ្រូនកសិកម្ម" },
    ],
  },
  {
    code: "LANG-04",
    slug: "chinese-language",
    title: { en: "Chinese Language Training", km: "ថ្នាក់បង្រៀនភាសាចិន" },
    short: {
      en: "Practical Mandarin for the workplace.",
      km: "ភាសាចិនជាក់ស្តែងសម្រាប់កន្លែងធ្វើការ។" ,
    },
    description: {
      en: "From beginner to working proficiency, focused on the vocabulary and communication patterns trainees will use in security, hospitality, logistics, and cross-border commercial roles with Chinese-speaking partners.",
      km: "ពីកម្រិតដំបូងរហូតដល់កម្រិតប្រើប្រាស់ការងារ ផ្តោតលើវាក្យសព្ទ និងលំនាំទំនាក់ទំនងដែលសិក្ខាកាមនឹងប្រើក្នុងផ្នែកសន្តិសុខ បដិសណ្ឋារកិច្ច ភស្តុភារ និងតួនាទីពាណិជ្ជកម្មឆ្លងព្រំដែនជាមួយដៃគូនិយាយភាសាចិន។",
    },
    duration: { en: "16 weeks", km: "១៦ សប្តាហ៍" },
    requirements: [
      { en: "Age 16 or older", km: "អាយុ ១៦ ឆ្នាំឡើង" },
      { en: "Basic Khmer literacy", km: "ចំណេះដឹងភាសាខ្មែរមូលដ្ឋាន" },
      { en: "Commitment to attend full schedule", km: "ប្តេជ្ញាចូលរៀនពេញម៉ោង" },
    ],
    careers: [
      { en: "Interpreter / Liaison Officer", km: "អ្នកបកប្រែ / មន្ត្រីសម្របសម្រួល" },
      { en: "Bilingual Security Supervisor", km: "ប្រធានសន្តិសុខពីរភាសា" },
      { en: "Customer Service for Chinese clients", km: "សេវាអតិថិជនភាសាចិន" },
    ],
  },
];

export const programByKey: Record<string, Program> = Object.fromEntries(
  programs.map((p) => [p.slug, p]),
);

// Helper type-safety bridge
export type _ = DictKey;
