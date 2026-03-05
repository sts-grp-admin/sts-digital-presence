interface ClientLogoCardProps {
  name: string;
  logo: string;
}

const ClientLogoCard = ({ name, logo }: ClientLogoCardProps) => (
  <div className="bg-card border border-border rounded-lg px-5 py-4 flex items-center justify-center h-20 hover:border-primary/40 hover:shadow-sm transition-all duration-300 group">
    <img
      src={logo}
      alt={name}
      className="max-h-[35px] w-auto object-contain grayscale group-hover:grayscale-0 transition-all duration-300"
    />
  </div>
);

export default ClientLogoCard;