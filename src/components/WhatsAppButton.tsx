import { MessageCircle } from 'lucide-react';
import { contact } from '@/data/contact';
import { useLang } from '@/lib/i18n';

export default function WhatsAppButton() {
  const { t } = useLang();
  if (!contact.whatsapp) return null;
  const label = contact.whatsappStaffName ? `${t('wa.chatWith')} ${contact.whatsappStaffName}` : t('wa.generic');
  return (
    <a href={`https://wa.me/${contact.whatsapp}`} target="_blank" rel="noopener noreferrer"
      className="fixed bottom-24 right-4 z-40 flex items-center gap-2 rounded-full bg-[#1F7A4D] px-4 py-3 text-sm font-bold text-white shadow-card hover:bg-[#17603C] lg:bottom-6">
      <MessageCircle className="h-5 w-5" aria-hidden /><span className="hidden sm:inline">{label}</span><span className="sr-only sm:hidden">{label}</span>
    </a>
  );
}
