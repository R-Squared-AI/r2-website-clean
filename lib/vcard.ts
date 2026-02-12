// vCard generator for Apple Contacts and other contact managers

export interface ContactInfo {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  website?: string;
  address?: string;
  title?: string;
}

export function generateVCard(contact: ContactInfo): string {
  const vcard = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    `FN:${contact.name}`,
    `N:${contact.name.split(' ').reverse().join(';')};;;`,
  ];

  if (contact.email) {
    vcard.push(`EMAIL;TYPE=INTERNET:${contact.email}`);
  }

  if (contact.phone) {
    vcard.push(`TEL;TYPE=CELL:${contact.phone}`);
  }

  if (contact.company) {
    vcard.push(`ORG:${contact.company}`);
  }

  if (contact.title) {
    vcard.push(`TITLE:${contact.title}`);
  }

  if (contact.website) {
    vcard.push(`URL:${contact.website}`);
  }

  if (contact.address) {
    vcard.push(`ADR;TYPE=WORK:;;${contact.address};;;;`);
  }

  vcard.push('END:VCARD');

  return vcard.join('\n');
}

export function downloadVCard(contact: ContactInfo, filename = 'contact.vcf'): void {
  const vcard = generateVCard(contact);
  const blob = new Blob([vcard], { type: 'text/vcard' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}






