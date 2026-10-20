import { site } from "@/lib/site";

export const waLink = (msg = site.whatsappMessage) =>
  `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(msg)}`;

export function WaIcon({ fill = "#fff" }) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" fill={fill}>
      <path d="M16 3C8.8 3 3 8.7 3 15.8c0 2.5.7 4.9 2 7L3 29l6.4-2c2 1.1 4.3 1.7 6.6 1.7 7.2 0 13-5.7 13-12.8C29 8.7 23.2 3 16 3zm0 23.4c-2.1 0-4.1-.6-5.9-1.7l-.4-.3-3.8 1.2 1.2-3.7-.3-.4a10.4 10.4 0 0 1-1.6-5.6C5.2 9.9 10 5.2 16 5.2s10.8 4.7 10.8 10.6S22 26.4 16 26.4zm5.9-7.9c-.3-.2-1.9-.9-2.2-1-.3-.1-.5-.2-.7.2-.2.3-.8 1-1 1.2-.2.2-.4.2-.7.1-.3-.2-1.4-.5-2.6-1.6-1-.9-1.6-1.9-1.8-2.2-.2-.3 0-.5.1-.7l.5-.6.3-.5c.1-.2 0-.4 0-.6l-1-2.4c-.3-.6-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4-.3.3-1.1 1.1-1.1 2.7s1.2 3.2 1.3 3.4c.2.2 2.3 3.5 5.6 4.9 2.8 1.1 3.3.9 3.9.8.6-.1 1.9-.8 2.2-1.5.3-.7.3-1.4.2-1.5-.1-.2-.3-.3-.7-.5z"/>
    </svg>
  );
}

export default function WhatsAppFloat() {
  return (
    <a className="wa-float" href={waLink()} target="_blank" rel="noopener noreferrer" aria-label="Chat with us on WhatsApp">
      <WaIcon />
    </a>
  );
}
