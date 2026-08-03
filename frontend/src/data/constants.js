import React from 'react';
import { Apple, Wheat, Citrus } from 'lucide-react';

export const CROPS = ['tomato', 'maize', 'pineapple'];

export const REGIONS = [
  'Volta Region', 'Greater Accra', 'Ashanti', 'Western', 'Eastern',
  'Central', 'Northern', 'Upper East', 'Upper West', 'Bono', 'Savannah',
];

export const DISTRICTS = [
  'Ho', 'Hohoe', 'Keta', 'Kadjebi', 'Jasikan', 'Nkwanta', 'Kpando',
  'South Dayi', 'Afadzato South', 'Agotime Ziope',
];

export const DISEASE_CONDITIONS = {
  tomato: [
    {
      id: 'tomato_healthy',
      label: 'Healthy',
      severity: 'none',
      color: 'accent',
      description: 'No visible symptoms. Plant appears healthy.',
      recommendation: 'Continue standard agronomic practices. Monitor weekly.',
    },
    {
      id: 'tomato_late_blight',
      label: 'Late Blight',
      pathogen: 'Phytophthora infestans',
      severity: 'high',
      color: 'danger',
      description: 'Water-soaked lesions on leaves, dark brown patches with white sporulation on underside.',
      recommendation: 'Apply copper-based fungicide (e.g. Copper Oxychloride 50% WP at 2.5 g/L water) immediately. Remove and destroy all heavily infected plant material. Avoid overhead irrigation. Re-apply every 7 days until symptom progression stops. Do not harvest within 7 days of application.',
    },
    {
      id: 'tomato_leaf_curl',
      label: 'Leaf Curl Virus',
      pathogen: 'Tomato Leaf Curl Virus (ToLCV)',
      severity: 'high',
      color: 'danger',
      description: 'Upward curling and yellowing of young leaves, stunted growth, reduced fruit set.',
      recommendation: 'There is no cure for viral infections. Remove and destroy infected plants immediately to prevent spread. Control whitefly vectors using Imidacloprid 200 SL (0.5 mL/L) or yellow sticky traps. Plant resistant varieties in subsequent seasons.',
    },
    {
      id: 'tomato_septoria',
      label: 'Septoria Leaf Spot',
      pathogen: 'Septoria lycopersici',
      severity: 'medium',
      color: 'amber',
      description: 'Small circular spots with dark brown borders and lighter grey centres on lower leaves.',
      recommendation: 'Apply Mancozeb 80% WP (2.0 g/L) or Chlorothalonil 75% WP (1.5 g/L). Remove affected lower leaves. Ensure good air circulation. Apply at first sign of disease and repeat every 10 days in humid conditions.',
    },
    {
      id: 'tomato_bacterial_spot',
      label: 'Bacterial Spot',
      pathogen: 'Xanthomonas vesicatoria',
      severity: 'medium',
      color: 'amber',
      description: 'Irregular water-soaked spots on leaves that turn brown; raised, scab-like spots on fruit.',
      recommendation: 'Apply Copper Hydroxide 77% WP (2.0 g/L) preventatively. Avoid working in fields when wet. Practise crop rotation. Remove crop debris after harvest.',
    },
  ],
  maize: [
    {
      id: 'maize_healthy',
      label: 'Healthy',
      severity: 'none',
      color: 'accent',
      description: 'No visible symptoms. Crop growing normally.',
      recommendation: 'Continue standard practices. Side-dress with nitrogen fertiliser at knee-height stage if growth appears slow.',
    },
    {
      id: 'maize_fall_armyworm',
      label: 'Fall Armyworm',
      pathogen: 'Spodoptera frugiperda',
      severity: 'high',
      color: 'danger',
      description: 'Ragged holes in leaves, frass deposits in leaf whorls, caterpillars visible in whorls.',
      recommendation: 'Apply Emamectin benzoate 1.9% EC (0.5 mL/L) or Chlorpyrifos 40% EC (2.0 mL/L) directly into the whorl. Scout fields twice weekly. Apply in the early morning or late evening. Biological control with Bacillus thuringiensis (Bt) products (e.g. DiPel DF at 1 g/L) is recommended where available. Protect natural enemies (avoid broad-spectrum pesticides).',
    },
    {
      id: 'maize_northern_blight',
      label: 'Northern Leaf Blight',
      pathogen: 'Exserohilum turcicum',
      severity: 'medium',
      color: 'amber',
      description: 'Long, cigar-shaped tan to grey lesions on leaves, typically starting on lower leaves.',
      recommendation: 'Apply Propiconazole 25% EC (0.5 mL/L) or Mancozeb 80% WP (2.5 g/L). Improve field drainage. Plant resistant hybrid varieties in future seasons. Crop rotation recommended.',
    },
    {
      id: 'maize_grey_leaf_spot',
      label: 'Gray Leaf Spot',
      pathogen: 'Cercospora zeae-maydis',
      severity: 'medium',
      color: 'amber',
      description: 'Rectangular, greyish lesions bounded by leaf veins, often with yellow halo.',
      recommendation: 'Apply Azoxystrobin 25% SC (0.75 mL/L) at silking stage. Ensure adequate plant spacing for air circulation. Remove crop residues after harvest. Rotate with non-host crops such as legumes.',
    },
  ],
  pineapple: [
    {
      id: 'pineapple_healthy',
      label: 'Healthy',
      severity: 'none',
      color: 'accent',
      description: 'Normal green colouration, no wilting or discolouration.',
      recommendation: 'Maintain soil pH between 4.5 and 6.5. Apply balanced fertiliser every 6–8 weeks. Mulch to retain moisture.',
    },
    {
      id: 'pineapple_mealybug_wilt',
      label: 'Mealybug Wilt',
      pathogen: 'Pineapple Mealybug Wilt-associated Virus (PMWaV)',
      severity: 'high',
      color: 'danger',
      description: 'Reddish or pinkish leaf margins, progressive wilting from leaf tip, plant collapse in severe cases.',
      recommendation: 'Control mealybug vectors with Chlorpyrifos 40% EC drenched at the base (2 mL/L). Control ant populations that protect mealybugs. Use clean planting material from certified sources in future planting cycles. Remove and destroy severely wilted plants.',
    },
    {
      id: 'pineapple_heart_rot',
      label: 'Heart Rot',
      pathogen: 'Phytophthora parasitica / Phytophthora cinnamomi',
      severity: 'high',
      color: 'danger',
      description: 'Yellowing and easy pull-out of central leaves, foul smell at plant base, internal rotting.',
      recommendation: 'Improve field drainage immediately. Apply Metalaxyl-M 4% + Mancozeb 64% WP (2.5 g/L) as a preventative drench on healthy plants near affected areas. Remove and destroy infected plants. Avoid wounding planting material. Do not replant in affected beds without soil fumigation.',
    },
  ],
};

export const CROP_ICONS = {
  tomato: React.createElement(Apple, { size: 24 }),
  maize: React.createElement(Wheat, { size: 24 }),
  pineapple: React.createElement(Citrus, { size: 24 }),
};

export const CROP_COLORS = {
  tomato:    { primary: '#ef4444', bg: 'rgba(239,68,68,0.12)' },
  maize:     { primary: '#f59e0b', bg: 'rgba(245,158,11,0.12)' },
  pineapple: { primary: '#4ade80', bg: 'rgba(74,222,128,0.12)' },
};

export const SEVERITY_COLORS = {
  none:   { color: '#4ade80', bg: 'rgba(74,222,128,0.12)' },
  medium: { color: '#f59e0b', bg: 'rgba(245,158,11,0.12)' },
  high:   { color: '#ef4444', bg: 'rgba(239,68,68,0.12)' },
};
