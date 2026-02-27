import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-night text-night-foreground">
      <div className="container py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <span className="font-heading text-2xl font-extrabold text-primary">STS</span>
            <p className="mt-3 text-sm leading-relaxed opacity-80">
              Sabius Tech Solutions — L'expertise IT au service de vos ambitions.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-heading font-semibold text-primary-foreground mb-4">Navigation</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="opacity-70 hover:opacity-100 transition-opacity">Accueil</Link></li>
              <li><Link to="/services" className="opacity-70 hover:opacity-100 transition-opacity">Services</Link></li>
              <li><Link to="/references" className="opacity-70 hover:opacity-100 transition-opacity">Références</Link></li>
              <li><Link to="/a-propos" className="opacity-70 hover:opacity-100 transition-opacity">À propos</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-heading font-semibold text-primary-foreground mb-4">Services</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/services" className="opacity-70 hover:opacity-100 transition-opacity">Conseil IT</Link></li>
              <li><Link to="/services" className="opacity-70 hover:opacity-100 transition-opacity">Développement</Link></li>
              <li><Link to="/services" className="opacity-70 hover:opacity-100 transition-opacity">Expertise technique</Link></li>
              <li><Link to="/services" className="opacity-70 hover:opacity-100 transition-opacity">Accompagnement</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading font-semibold text-primary-foreground mb-4">Contact</h4>
            <ul className="space-y-2 text-sm opacity-70">
              <li>contact@sabius-tech.fr</li>
              <li>+33 1 23 45 67 89</li>
              <li>12 rue de l'Innovation<br />75008 Paris, France</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-night-foreground/20 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs opacity-60">
          <p>© {new Date().getFullYear()} Sabius Tech Solutions. Tous droits réservés.</p>
          <Link to="/mentions-legales" className="hover:opacity-100 transition-opacity">Mentions légales</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
