import type { DemoConfig } from './engine';
import { sitePreset } from '../lib/preset';

/**
 * The public Live Demo's sample studio (`npm run dev:demo` / `npm run build:demo`).
 * Only demo builds read this file. Customizing the real website? Leave src/demo/ alone.
 */
export const demoConfig: DemoConfig = {
  id: 'bicycle-repair-workbench',
  preset: sitePreset,
  business: {
    name: 'Chainline Bicycle Workshop',
    timezone: 'America/New_York',
    email: 'workshop@chainline.example',
    phone: '+1 412-555-0147',
    address: '4410 Butler Street, Pittsburgh, PA 15201',
  },
  ownerEmail: 'owner@chainline.example',
  referencePrefix: 'CL',
  sampleNotes: [
    'Steel commuter, rear brake feels soft and the gears jump on the small cogs.',
    'Gravel bike — riding the GAP trail next month, would like it checked over first.',
    'Road bike, new to me — the bars feel a long way off. I ride clipless (SPD-SL) and will bring my shoes.',
  ],
  // The site caches published content under this key (createSiteContentStore's default).
  resetKeys: ['pbe-site-content'],
  customers: [
    { name: 'Nora Callahan', email: 'nora.callahan@example.com', phone: '+1 412 555 0114' },
    { name: 'James Whitfield', email: 'j.whitfield@example.com', phone: '+1 412 555 0127' },
    { name: 'Amara Osei', email: 'amara.osei@example.com', phone: '+1 412 555 0133' },
    { name: 'Daniel Reyes', email: 'daniel.reyes@example.com', phone: '+1 412 555 0141' },
    { name: 'Helen Park', email: 'helen.park@example.com', phone: '+1 412 555 0156' },
    { name: 'Tomás Ferreira', email: 'tomas.f@example.com', phone: '+1 412 555 0162' },
    { name: 'Claire Donnelly', email: 'claire.d@example.com', phone: '+1 412 555 0175' },
    { name: 'Marcus Bell', email: 'marcus.bell@example.com', phone: '+1 412 555 0188' },
    { name: 'Priya Nair', email: 'priya.nair@example.com', phone: '+1 412 555 0193' },
    { name: 'Samuel Grant', email: 'sam.grant@example.com', phone: '+1 412 555 0109' },
  ],
};
