interface ClientLogoCardProps {
  name: string;
  logo: string;
  height: number;
  scale?: number;
}

const ClientLogoCard = ({ name, logo, height, scale = 1 }: ClientLogoCardProps) => (
  <div className="bg-card border border-border rounded-lg px-5 py-4 flex items-center justify-center h-20 overflow-hidden hover:border-primary/40 hover:shadow-sm transition-all duration-300 group">
    <img
      src={logo}
      alt={name}
      style={{ height: `${height}px`, width: "auto", transform: `scale(${scale})` }}
      className="object-contain grayscale group-hover:grayscale-0 transition-all duration-300"
    />
  </div>
);

export default ClientLogoCard;