import WhatsAppIcon from "@/components/icons/WhatsAppIcon";

const WhatsAppButton = () => {
  return (
    <a
      href="https://wa.me/27000000000"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-elevated hover:scale-110 transition-transform duration-300 hover:shadow-2xl text-white"
      aria-label="Chat on WhatsApp"
    >
      <WhatsAppIcon className="w-7 h-7" />
    </a>
  );
};

export default WhatsAppButton;
