interface ClientLogoCardProps {
  name: string;
  logo: string;
  showName?: boolean;
  logoClassName?: string;
}

const ClientLogoCard = ({ name, logo, showName = false, logoClassName }: ClientLogoCardProps) => (
  <div className="bg-card border border-border rounded-lg p-6 flex flex-col items-center justify-center h-28 hover:border-primary/40 hover:shadow-sm transition-all duration-300 group">
    <img
      src={logo}
      alt={name}
      className={logoClassName || "max-h-[44px] w-auto object-contain grayscale group-hover:grayscale-0 transition-all duration-300"}
    />
    {showName && (
      <span className="mt-2 text-[11px] text-muted-foreground text-center leading-tight">
        {name}
      </span>
    )}
  </div>
);

export default ClientLogoCard;
