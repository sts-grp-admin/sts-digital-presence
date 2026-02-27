export type Language = "fr" | "en" | "es";

export const translations = {
  // ─── Navbar ───
  nav: {
    home: { fr: "Accueil", en: "Home", es: "Inicio" },
    services: { fr: "Services", en: "Services", es: "Servicios" },
    references: { fr: "Références", en: "References", es: "Referencias" },
    about: { fr: "À propos", en: "About", es: "Acerca de" },
    contact: { fr: "Contact", en: "Contact", es: "Contacto" },
    cta: { fr: "Nous contacter", en: "Contact us", es: "Contáctenos" },
  },

  // ─── Footer ───
  footer: {
    tagline: {
      fr: "Sabius Tech Solutions — L'expertise IT au service de vos ambitions.",
      en: "Sabius Tech Solutions — IT expertise at the service of your ambitions.",
      es: "Sabius Tech Solutions — Experiencia IT al servicio de sus ambiciones.",
    },
    navigation: { fr: "Navigation", en: "Navigation", es: "Navegación" },
    servicesTitle: { fr: "Services", en: "Services", es: "Servicios" },
    contactTitle: { fr: "Contact", en: "Contact", es: "Contacto" },
    consultingIT: { fr: "Conseil IT", en: "IT Consulting", es: "Consultoría IT" },
    development: { fr: "Développement", en: "Development", es: "Desarrollo" },
    technicalExpertise: { fr: "Expertise technique", en: "Technical expertise", es: "Experiencia técnica" },
    support: { fr: "Accompagnement", en: "Support", es: "Acompañamiento" },
    rights: { fr: "Tous droits réservés.", en: "All rights reserved.", es: "Todos los derechos reservados." },
    legalNotice: { fr: "Mentions légales", en: "Legal notice", es: "Aviso legal" },
  },

  // ─── Index / Home ───
  home: {
    heroTitle: {
      fr: "L'expertise IT au service de vos ambitions",
      en: "IT expertise driving your ambitions forward",
      es: "Experiencia IT al servicio de sus ambiciones",
    },
    heroSubtitle: {
      fr: "Conseil, développement et accompagnement technique sur mesure pour les entreprises qui exigent l'excellence.",
      en: "Consulting, development and bespoke technical support for companies that demand excellence.",
      es: "Consultoría, desarrollo y acompañamiento técnico a medida para empresas que exigen excelencia.",
    },
    heroBtn1: { fr: "Découvrir nos services", en: "Discover our services", es: "Descubrir nuestros servicios" },
    heroBtn2: { fr: "Nous contacter", en: "Contact us", es: "Contáctenos" },
    expertiseTitle: {
      fr: "Nos domaines d'expertise",
      en: "Our areas of expertise",
      es: "Nuestras áreas de especialización",
    },
    expertiseSubtitle: {
      fr: "Une offre de services complète pour répondre à vos enjeux techniques, du conseil stratégique à la mise en œuvre.",
      en: "A comprehensive service offering to address your technical challenges, from strategic consulting to implementation.",
      es: "Una oferta de servicios completa para responder a sus desafíos técnicos, desde la consultoría estratégica hasta la implementación.",
    },
    seeAllServices: { fr: "Voir tous nos services", en: "View all services", es: "Ver todos nuestros servicios" },
    whyTitle: {
      fr: "Pourquoi choisir Sabius Tech Solutions ?",
      en: "Why choose Sabius Tech Solutions?",
      es: "¿Por qué elegir Sabius Tech Solutions?",
    },
    trustTitle: { fr: "Ils nous font confiance", en: "Trusted by", es: "Confían en nosotros" },
    trustFootnote: {
      fr: "Nos consultants sont également intervenus dans des environnements tels que Disneyland Paris, Société Générale, Servier, Fnac, KPMG, LCL et BPCE.",
      en: "Our consultants have also worked within organisations such as Disneyland Paris, Société Générale, Servier, Fnac, KPMG, LCL and BPCE.",
      es: "Nuestros consultores también han intervenido en entornos como Disneyland Paris, Société Générale, Servier, Fnac, KPMG, LCL y BPCE.",
    },
    missionsTitle: {
      fr: "Des missions concrètes, des résultats mesurables",
      en: "Real-world projects, measurable results",
      es: "Proyectos concretos, resultados medibles",
    },
    seeAllReferences: { fr: "Voir toutes nos références", en: "View all references", es: "Ver todas nuestras referencias" },
    sector: { fr: "Secteur", en: "Sector", es: "Sector" },
    ctaTitle: {
      fr: "Un projet ? Une mission ? Parlons-en.",
      en: "Have a project? Let's talk.",
      es: "¿Tiene un proyecto? Hablemos.",
    },
    ctaSubtitle: {
      fr: "Nous répondons sous 24h pour étudier votre besoin.",
      en: "We respond within 24 hours to assess your needs.",
      es: "Respondemos en menos de 24 horas para estudiar su necesidad.",
    },
    ctaBtn: { fr: "Prendre contact", en: "Get in touch", es: "Contactar" },
  },

  // ─── Expertises (Index page cards) ───
  expertises: [
    {
      title: { fr: "Conseil IT & Stratégie", en: "IT Consulting & Strategy", es: "Consultoría IT y Estrategia" },
      desc: {
        fr: "Audit, cadrage et recommandations pour aligner votre SI avec vos objectifs métier.",
        en: "Audit, scoping and recommendations to align your IT systems with your business goals.",
        es: "Auditoría, definición y recomendaciones para alinear su SI con sus objetivos de negocio.",
      },
    },
    {
      title: { fr: "Développement logiciel", en: "Software Development", es: "Desarrollo de software" },
      desc: {
        fr: "Conception et réalisation d'applications sur mesure, robustes et maintenables.",
        en: "Design and delivery of robust, maintainable custom applications.",
        es: "Diseño y desarrollo de aplicaciones a medida, robustas y mantenibles.",
      },
    },
    {
      title: { fr: "Architecture & Modernisation", en: "Architecture & Modernisation", es: "Arquitectura y Modernización" },
      desc: {
        fr: "Refonte d'architectures, migration cloud et modernisation de systèmes existants.",
        en: "Architecture redesign, cloud migration and legacy system modernisation.",
        es: "Rediseño de arquitecturas, migración cloud y modernización de sistemas existentes.",
      },
    },
    {
      title: { fr: "Data & Intelligence Artificielle", en: "Data & Artificial Intelligence", es: "Data e Inteligencia Artificial" },
      desc: {
        fr: "Structuration de données, pipelines analytics et intégration de solutions IA.",
        en: "Data structuring, analytics pipelines and AI solution integration.",
        es: "Estructuración de datos, pipelines de analítica e integración de soluciones IA.",
      },
    },
    {
      title: { fr: "Intégration de solutions", en: "Solution Integration", es: "Integración de soluciones" },
      desc: {
        fr: "Mise en œuvre et intégration de progiciels, API et écosystèmes techniques complexes.",
        en: "Implementation and integration of software packages, APIs and complex technical ecosystems.",
        es: "Implementación e integración de paquetes de software, APIs y ecosistemas técnicos complejos.",
      },
    },
    {
      title: { fr: "Accompagnement projet", en: "Project Support", es: "Acompañamiento de proyectos" },
      desc: {
        fr: "Renfort d'équipes, pilotage technique et expertise embarquée sur vos projets critiques.",
        en: "Team reinforcement, technical leadership and embedded expertise on your critical projects.",
        es: "Refuerzo de equipos, dirección técnica y experiencia integrada en sus proyectos críticos.",
      },
    },
  ],

  // ─── Why items (Index) ───
  whyItems: [
    {
      keyword: { fr: "Expertise", en: "Expertise", es: "Experiencia" },
      text: {
        fr: "Des consultants seniors avec une maîtrise technique éprouvée sur des environnements exigeants.",
        en: "Senior consultants with proven technical skills in demanding environments.",
        es: "Consultores senior con dominio técnico probado en entornos exigentes.",
      },
    },
    {
      keyword: { fr: "Réactivité", en: "Responsiveness", es: "Reactividad" },
      text: {
        fr: "Un interlocuteur dédié, disponible et impliqué dans la réussite de vos projets.",
        en: "A dedicated contact, available and invested in the success of your projects.",
        es: "Un interlocutor dedicado, disponible e involucrado en el éxito de sus proyectos.",
      },
    },
    {
      keyword: { fr: "Exigence", en: "Excellence", es: "Exigencia" },
      text: {
        fr: "Des livrables de qualité, dans le respect des délais et des engagements.",
        en: "Quality deliverables, on time and on budget.",
        es: "Entregables de calidad, dentro de los plazos y compromisos.",
      },
    },
    {
      keyword: { fr: "Agilité", en: "Agility", es: "Agilidad" },
      text: {
        fr: "Une capacité d'adaptation rapide à vos contextes, contraintes et enjeux.",
        en: "The ability to adapt quickly to your context, constraints and challenges.",
        es: "Capacidad de adaptación rápida a sus contextos, restricciones y desafíos.",
      },
    },
  ],

  // ─── Index missions ───
  missions: [
    {
      sector: { fr: "Banque", en: "Banking", es: "Banca" },
      title: {
        fr: "Modernisation d'une plateforme de gestion des risques",
        en: "Modernisation of a risk management platform",
        es: "Modernización de una plataforma de gestión de riesgos",
      },
    },
    {
      sector: { fr: "Énergie", en: "Energy", es: "Energía" },
      title: {
        fr: "Développement d'un portail de suivi opérationnel",
        en: "Development of an operational monitoring portal",
        es: "Desarrollo de un portal de seguimiento operacional",
      },
    },
    {
      sector: { fr: "Retail", en: "Retail", es: "Retail" },
      title: {
        fr: "Intégration et automatisation des flux logistiques",
        en: "Integration and automation of logistics workflows",
        es: "Integración y automatización de flujos logísticos",
      },
    },
  ],

  // ─── Services page ───
  services: {
    pageTitle: { fr: "Nos services", en: "Our services", es: "Nuestros servicios" },
    pageSubtitle: {
      fr: "Conseil, réalisation et accompagnement technique pour répondre à vos enjeux IT les plus exigeants.",
      en: "Consulting, delivery and technical support to tackle your most demanding IT challenges.",
      es: "Consultoría, realización y acompañamiento técnico para responder a sus desafíos IT más exigentes.",
    },
    ctaTitle: {
      fr: "Besoin d'un accompagnement sur mesure ? Contactez-nous.",
      en: "Need bespoke support? Contact us.",
      es: "¿Necesita un acompañamiento a medida? Contáctenos.",
    },
    ctaBtn: { fr: "Nous contacter", en: "Contact us", es: "Contáctenos" },
    items: [
      {
        title: { fr: "Conseil IT & Stratégie", en: "IT Consulting & Strategy", es: "Consultoría IT y Estrategia" },
        desc: {
          fr: "Nous aidons les directions IT et métier à prendre les bonnes décisions technologiques. Audit de l'existant, cadrage de projets, études d'opportunité et feuilles de route SI : nous intervenons en amont pour sécuriser vos choix.",
          en: "We help IT and business leaders make the right technology decisions. Existing system audits, project scoping, opportunity studies and IT roadmaps: we step in early to secure your choices.",
          es: "Ayudamos a las direcciones IT y de negocio a tomar las decisiones tecnológicas correctas. Auditoría del existente, definición de proyectos, estudios de oportunidad y hojas de ruta SI: intervenimos aguas arriba para asegurar sus elecciones.",
        },
        items: {
          fr: ["Audit et diagnostic SI", "Cadrage et études d'opportunité", "Schéma directeur et feuille de route", "Aide au choix de solutions", "Gouvernance IT"],
          en: ["IT audit & assessment", "Scoping & opportunity studies", "IT master plan & roadmap", "Solution selection support", "IT governance"],
          es: ["Auditoría y diagnóstico SI", "Definición y estudios de oportunidad", "Plan director y hoja de ruta", "Ayuda en la elección de soluciones", "Gobernanza IT"],
        },
      },
      {
        title: { fr: "Développement logiciel", en: "Software Development", es: "Desarrollo de software" },
        desc: {
          fr: "Nous concevons et développons des applications métier sur mesure, pensées pour durer. Notre approche allie rigueur technique, bonnes pratiques et proximité avec les équipes produit.",
          en: "We design and develop custom business applications built to last. Our approach combines technical rigour, best practices and close collaboration with product teams.",
          es: "Diseñamos y desarrollamos aplicaciones de negocio a medida, pensadas para durar. Nuestro enfoque combina rigor técnico, buenas prácticas y cercanía con los equipos de producto.",
        },
        items: {
          fr: ["Applications web et API", "Applications mobiles", "Back-end et microservices", "Tests et qualité logicielle", "Maintenance et évolution"],
          en: ["Web applications & APIs", "Mobile applications", "Back-end & microservices", "Testing & software quality", "Maintenance & evolution"],
          es: ["Aplicaciones web y APIs", "Aplicaciones móviles", "Back-end y microservicios", "Tests y calidad de software", "Mantenimiento y evolución"],
        },
      },
      {
        title: { fr: "Data & Intelligence Artificielle", en: "Data & Artificial Intelligence", es: "Data e Inteligencia Artificial" },
        desc: {
          fr: "Nous concevons des solutions IA sur mesure qui transforment vos données en levier de performance. De la stratégie data à la mise en production, nous accompagnons vos équipes sur l'ensemble de la chaîne de valeur.",
          en: "We design bespoke AI solutions that turn your data into a performance driver. From data strategy to production deployment, we support your teams across the entire value chain.",
          es: "Diseñamos soluciones IA a medida que transforman sus datos en palanca de rendimiento. Desde la estrategia de datos hasta la puesta en producción, acompañamos a sus equipos en toda la cadena de valor.",
        },
        items: {
          fr: ["IA Générative & Agents intelligents", "RAG & Knowledge Management", "Data Engineering & Analytics", "MLOps & industrialisation"],
          en: ["Generative AI & Intelligent Agents", "RAG & Knowledge Management", "Data Engineering & Analytics", "MLOps & Industrialisation"],
          es: ["IA Generativa y Agentes inteligentes", "RAG y Knowledge Management", "Data Engineering y Analytics", "MLOps e industrialización"],
        },
      },
      {
        title: { fr: "Architecture & Modernisation", en: "Architecture & Modernisation", es: "Arquitectura y Modernización" },
        desc: {
          fr: "Nous accompagnons la transformation de vos systèmes d'information : refonte d'architectures monolithiques, migration cloud, conteneurisation et mise en place de pratiques DevOps.",
          en: "We support the transformation of your information systems: monolithic architecture redesign, cloud migration, containerisation and DevOps adoption.",
          es: "Acompañamos la transformación de sus sistemas de información: rediseño de arquitecturas monolíticas, migración cloud, contenedorización e implementación de prácticas DevOps.",
        },
        items: {
          fr: ["Architecture logicielle et technique", "Migration cloud (AWS, Azure, GCP)", "Conteneurisation et orchestration", "CI/CD et DevOps", "Refonte de SI legacy"],
          en: ["Software & technical architecture", "Cloud migration (AWS, Azure, GCP)", "Containerisation & orchestration", "CI/CD & DevOps", "Legacy system modernisation"],
          es: ["Arquitectura de software y técnica", "Migración cloud (AWS, Azure, GCP)", "Contenedorización y orquestación", "CI/CD y DevOps", "Modernización de SI legacy"],
        },
      },
      {
        title: { fr: "Intégration de solutions", en: "Solution Integration", es: "Integración de soluciones" },
        desc: {
          fr: "Nous prenons en charge l'intégration technique de solutions tierces dans votre écosystème : ERP, CRM, outils métier, API partenaires. Nous garantissons la cohérence et la fiabilité de vos flux.",
          en: "We handle the technical integration of third-party solutions into your ecosystem: ERP, CRM, business tools, partner APIs. We guarantee the consistency and reliability of your data flows.",
          es: "Nos encargamos de la integración técnica de soluciones de terceros en su ecosistema: ERP, CRM, herramientas de negocio, APIs de socios. Garantizamos la coherencia y fiabilidad de sus flujos.",
        },
        items: {
          fr: ["Intégration d'ERP et CRM", "Connecteurs et API", "Orchestration de flux", "Middleware et ESB", "Recette et déploiement"],
          en: ["ERP & CRM integration", "Connectors & APIs", "Workflow orchestration", "Middleware & ESB", "Testing & deployment"],
          es: ["Integración de ERP y CRM", "Conectores y APIs", "Orquestación de flujos", "Middleware y ESB", "Pruebas y despliegue"],
        },
      },
      {
        title: { fr: "Accompagnement projet", en: "Project Support", es: "Acompañamiento de proyectos" },
        desc: {
          fr: "Nous renforçons vos équipes avec des profils experts capables de monter rapidement en charge. Pilotage technique, expertise embarquée ou renfort ponctuel : nous nous adaptons à vos besoins.",
          en: "We reinforce your teams with expert profiles who ramp up fast. Technical leadership, embedded expertise or ad hoc support: we adapt to your needs.",
          es: "Reforzamos sus equipos con perfiles expertos capaces de asumir rápidamente responsabilidades. Dirección técnica, experiencia integrada o refuerzo puntual: nos adaptamos a sus necesidades.",
        },
        items: {
          fr: ["Assistance technique et régie", "Pilotage et direction technique", "Expertise ponctuelle", "Renfort d'équipe projet", "Transfert de compétences"],
          en: ["Technical assistance & staff augmentation", "Technical leadership & management", "Ad hoc expertise", "Project team reinforcement", "Knowledge transfer"],
          es: ["Asistencia técnica y delegación", "Dirección y liderazgo técnico", "Experiencia puntual", "Refuerzo de equipo de proyecto", "Transferencia de competencias"],
        },
      },
    ],
  },

  // ─── References page ───
  references: {
    pageTitle: { fr: "Nos références", en: "Our references", es: "Nuestras referencias" },
    pageSubtitle: {
      fr: "Des interventions concrètes dans des environnements techniques exigeants.",
      en: "Real-world engagements in demanding technical environments.",
      es: "Intervenciones concretas en entornos técnicos exigentes.",
    },
    trustTitle: { fr: "Ils nous font confiance", en: "Trusted by", es: "Confían en nosotros" },
    envTitle: { fr: "Nos équipes sont intervenues chez", en: "Our teams have worked with", es: "Nuestros equipos han intervenido en" },
    envSubtitle: {
      fr: "Dans le cadre de missions de conseil, de développement et d'expertise technique, nos consultants ont opéré au sein des environnements suivants :",
      en: "As part of consulting, development and technical expertise engagements, our consultants have operated within the following organisations:",
      es: "En el marco de misiones de consultoría, desarrollo y experiencia técnica, nuestros consultores han operado en los siguientes entornos:",
    },
    interventionTitle: { fr: "Nos modes d'intervention", en: "How we work", es: "Nuestros modos de intervención" },
    interventionSubtitle: {
      fr: "Nous nous adaptons à votre organisation et à vos enjeux.",
      en: "We adapt to your organisation and your challenges.",
      es: "Nos adaptamos a su organización y a sus desafíos.",
    },
    interventionModes: [
      {
        title: { fr: "Régie & assistance technique", en: "Staff augmentation & technical assistance", es: "Asistencia técnica y delegación" },
        text: {
          fr: "Nos consultants intègrent vos équipes pour apporter expertise et capacité de delivery sur vos projets en cours.",
          en: "Our consultants join your teams to provide expertise and delivery capacity on your ongoing projects.",
          es: "Nuestros consultores se integran a sus equipos para aportar experiencia y capacidad de entrega en sus proyectos en curso.",
        },
      },
      {
        title: { fr: "Projets au forfait", en: "Fixed-price projects", es: "Proyectos a precio fijo" },
        text: {
          fr: "Nous prenons en charge la réalisation de bout en bout : cadrage, conception, développement, recette et mise en production.",
          en: "We handle end-to-end delivery: scoping, design, development, testing and production deployment.",
          es: "Nos encargamos de la realización de principio a fin: definición, diseño, desarrollo, pruebas y puesta en producción.",
        },
      },
      {
        title: { fr: "Conseil & expertise", en: "Consulting & expertise", es: "Consultoría y experiencia" },
        text: {
          fr: "Audit, cadrage, architecture, choix technologiques : nous intervenons ponctuellement pour éclairer vos décisions.",
          en: "Audit, scoping, architecture, technology choices: we provide targeted guidance to inform your decisions.",
          es: "Auditoría, definición, arquitectura, elección tecnológica: intervenimos puntualmente para orientar sus decisiones.",
        },
      },
    ],
    techTitle: { fr: "Environnements techniques", en: "Technical environments", es: "Entornos técnicos" },
    techCategories: {
      fr: ["Langages", "Front-end", "Back-end", "Data & IA", "Cloud", "DevOps"],
      en: ["Languages", "Front-end", "Back-end", "Data & AI", "Cloud", "DevOps"],
      es: ["Lenguajes", "Front-end", "Back-end", "Data e IA", "Cloud", "DevOps"],
    },
    sectorsTitle: { fr: "Secteurs d'intervention", en: "Industry sectors", es: "Sectores de intervención" },
    sectors: {
      fr: ["Banque & Finance", "Assurance", "Énergie", "Retail", "Industrie", "Secteur public", "Télécoms", "Santé"],
      en: ["Banking & Finance", "Insurance", "Energy", "Retail", "Industry", "Public sector", "Telecoms", "Healthcare"],
      es: ["Banca y Finanzas", "Seguros", "Energía", "Retail", "Industria", "Sector público", "Telecomunicaciones", "Salud"],
    },
    ctaTitle: {
      fr: "Un projet ? Une mission ? Parlons-en.",
      en: "Have a project? Let's talk.",
      es: "¿Tiene un proyecto? Hablemos.",
    },
    ctaSubtitle: {
      fr: "Nous répondons sous 24h pour étudier votre besoin.",
      en: "We respond within 24 hours to assess your needs.",
      es: "Respondemos en menos de 24 horas para estudiar su necesidad.",
    },
    ctaBtn: { fr: "Nous contacter", en: "Contact us", es: "Contáctenos" },
  },

  // ─── About page ───
  about: {
    pageTitle: { fr: "À propos", en: "About us", es: "Acerca de" },
    pageSubtitle: {
      fr: "L'expertise technique au service de vos enjeux.",
      en: "Technical expertise at the service of your challenges.",
      es: "Experiencia técnica al servicio de sus desafíos.",
    },
    whoTitle: { fr: "Qui sommes-nous", en: "Who we are", es: "Quiénes somos" },
    whoP1: {
      fr: "Sabius Tech Solutions est une ESN spécialisée dans le conseil, le développement et l'accompagnement technique des entreprises.",
      en: "Sabius Tech Solutions is a digital services company specialising in consulting, software development and technical support for businesses.",
      es: "Sabius Tech Solutions es una empresa de servicios digitales especializada en consultoría, desarrollo y acompañamiento técnico de empresas.",
    },
    whoP2: {
      fr: "Nous intervenons auprès de PME, d'ETI et de grands comptes sur des missions à forte valeur ajoutée : stratégie SI, développement sur mesure, architecture, data et pilotage de projets complexes.",
      en: "We work with SMEs, mid-caps and large enterprises on high-value engagements: IT strategy, custom development, architecture, data and complex project management.",
      es: "Intervenimos con pymes, medianas y grandes empresas en misiones de alto valor añadido: estrategia SI, desarrollo a medida, arquitectura, data y gestión de proyectos complejos.",
    },
    whoP3: {
      fr: "Notre conviction : chaque entreprise mérite un partenaire technique capable de comprendre ses enjeux métier autant que ses défis technologiques. C'est cette exigence qui guide l'ensemble de nos interventions.",
      en: "Our conviction: every company deserves a technology partner who understands their business challenges as well as their technical ones. This commitment to excellence guides everything we do.",
      es: "Nuestra convicción: cada empresa merece un socio tecnológico capaz de comprender sus desafíos de negocio tanto como sus retos tecnológicos. Esta exigencia guía todas nuestras intervenciones.",
    },
    valuesTitle: { fr: "Nos valeurs", en: "Our values", es: "Nuestros valores" },
    values: [
      {
        title: { fr: "Excellence technique", en: "Technical excellence", es: "Excelencia técnica" },
        text: {
          fr: "Chaque ligne de code, chaque recommandation reflète notre exigence de qualité et de rigueur.",
          en: "Every line of code, every recommendation reflects our commitment to quality and rigour.",
          es: "Cada línea de código, cada recomendación refleja nuestra exigencia de calidad y rigor.",
        },
      },
      {
        title: { fr: "Engagement client", en: "Client commitment", es: "Compromiso con el cliente" },
        text: {
          fr: "Nous nous impliquons dans la réussite de chaque mission comme si c'était la nôtre.",
          en: "We invest in the success of every engagement as if it were our own.",
          es: "Nos involucramos en el éxito de cada misión como si fuera la nuestra.",
        },
      },
      {
        title: { fr: "Pragmatisme", en: "Pragmatism", es: "Pragmatismo" },
        text: {
          fr: "Nous privilégions les solutions qui fonctionnent. L'efficacité prime sur les effets de mode.",
          en: "We favour solutions that work. Effectiveness comes before trends.",
          es: "Privilegiamos las soluciones que funcionan. La eficacia prima sobre las modas.",
        },
      },
      {
        title: { fr: "Réactivité", en: "Responsiveness", es: "Reactividad" },
        text: {
          fr: "Disponibilité, écoute et adaptation rapide : nous répondons à vos besoins sans inertie.",
          en: "Availability, attentiveness and rapid adaptation: we respond to your needs without delay.",
          es: "Disponibilidad, escucha y adaptación rápida: respondemos a sus necesidades sin inercia.",
        },
      },
    ],
    approachTitle: { fr: "Notre approche", en: "Our approach", es: "Nuestro enfoque" },
    steps: [
      {
        title: { fr: "Comprendre", en: "Understand", es: "Comprender" },
        text: {
          fr: "Analyse de votre contexte, vos contraintes et vos objectifs avant toute intervention.",
          en: "Analysis of your context, constraints and objectives before any engagement.",
          es: "Análisis de su contexto, restricciones y objetivos antes de cualquier intervención.",
        },
      },
      {
        title: { fr: "Concevoir", en: "Design", es: "Diseñar" },
        text: {
          fr: "Proposition de solutions adaptées, réalistes et alignées avec votre stratégie technique.",
          en: "Tailored, realistic solutions aligned with your technical strategy.",
          es: "Propuesta de soluciones adaptadas, realistas y alineadas con su estrategia técnica.",
        },
      },
      {
        title: { fr: "Délivrer", en: "Deliver", es: "Entregar" },
        text: {
          fr: "Exécution avec rigueur et transparence, en maintenant un dialogue permanent avec vos équipes.",
          en: "Rigorous and transparent execution, maintaining ongoing dialogue with your teams.",
          es: "Ejecución con rigor y transparencia, manteniendo un diálogo permanente con sus equipos.",
        },
      },
    ],
    statsTitle: { fr: "Quelques chiffres", en: "Key figures", es: "Cifras clave" },
    stats: [
      { label: { fr: "missions réalisées", en: "completed projects", es: "misiones realizadas" } },
      { label: { fr: "secteurs d'intervention", en: "industry sectors", es: "sectores de intervención" } },
      { label: { fr: "clients actifs et fidèles", en: "active loyal clients", es: "clientes activos y fieles" } },
      { label: { fr: "engagement qualité", en: "quality commitment", es: "compromiso de calidad" } },
    ],
    ctaTitle: {
      fr: "Un projet ? Une mission ? Parlons-en.",
      en: "Have a project? Let's talk.",
      es: "¿Tiene un proyecto? Hablemos.",
    },
    ctaSubtitle: {
      fr: "Nous répondons sous 24h pour étudier votre besoin.",
      en: "We respond within 24 hours to assess your needs.",
      es: "Respondemos en menos de 24 horas para estudiar su necesidad.",
    },
    ctaBtn: { fr: "Nous contacter", en: "Contact us", es: "Contáctenos" },
  },

  // ─── Contact page ───
  contact: {
    pageTitle: { fr: "Contactez-nous", en: "Contact us", es: "Contáctenos" },
    pageSubtitle: {
      fr: "Un projet, une mission, une question ? Nous vous répondons sous 24 heures.",
      en: "A project, an engagement, a question? We respond within 24 hours.",
      es: "¿Un proyecto, una misión, una pregunta? Le respondemos en menos de 24 horas.",
    },
    labelName: { fr: "Nom complet", en: "Full name", es: "Nombre completo" },
    labelEmail: { fr: "Email professionnel", en: "Professional email", es: "Email profesional" },
    labelCompany: { fr: "Entreprise", en: "Company", es: "Empresa" },
    labelPhone: { fr: "Téléphone", en: "Phone", es: "Teléfono" },
    labelPhoneOptional: { fr: "(optionnel)", en: "(optional)", es: "(opcional)" },
    labelSubject: { fr: "Sujet", en: "Subject", es: "Asunto" },
    labelMessage: { fr: "Message", en: "Message", es: "Mensaje" },
    placeholderName: { fr: "Jean Dupont", en: "John Smith", es: "Juan García" },
    placeholderEmail: { fr: "jean@entreprise.fr", en: "john@company.com", es: "juan@empresa.es" },
    placeholderCompany: { fr: "Nom de votre entreprise", en: "Your company name", es: "Nombre de su empresa" },
    placeholderPhone: { fr: "+33 6 12 34 56 78", en: "+33 6 12 34 56 78", es: "+33 6 12 34 56 78" },
    placeholderSelect: { fr: "Sélectionnez un sujet", en: "Select a subject", es: "Seleccione un asunto" },
    optionProject: { fr: "Nouveau projet", en: "New project", es: "Nuevo proyecto" },
    optionStaff: { fr: "Mission / Régie", en: "Staff augmentation", es: "Misión / Delegación" },
    optionConsulting: { fr: "Conseil", en: "Consulting", es: "Consultoría" },
    optionPartnership: { fr: "Partenariat", en: "Partnership", es: "Asociación" },
    optionOther: { fr: "Autre", en: "Other", es: "Otro" },
    placeholderMessage: {
      fr: "Décrivez votre projet ou votre besoin...",
      en: "Describe your project or your needs...",
      es: "Describa su proyecto o su necesidad...",
    },
    submitBtn: { fr: "Envoyer votre message", en: "Send your message", es: "Enviar su mensaje" },
    privacy: {
      fr: "Vos données sont traitées de manière confidentielle. Nous ne partageons jamais vos informations avec des tiers.",
      en: "Your data is treated confidentially. We never share your information with third parties.",
      es: "Sus datos se tratan de manera confidencial. Nunca compartimos su información con terceros.",
    },
    coordTitle: { fr: "Coordonnées", en: "Contact details", es: "Datos de contacto" },
    labelEmailInfo: { fr: "Email", en: "Email", es: "Email" },
    labelPhoneInfo: { fr: "Téléphone", en: "Phone", es: "Teléfono" },
    labelLocation: { fr: "Localisation", en: "Location", es: "Ubicación" },
    labelAvailability: { fr: "Disponibilité", en: "Availability", es: "Disponibilidad" },
    availabilityText: { fr: "Lundi — Vendredi, 9h — 18h", en: "Monday — Friday, 9am — 6pm", es: "Lunes — Viernes, 9h — 18h" },
    linkedin: { fr: "Suivez-nous sur LinkedIn", en: "Follow us on LinkedIn", es: "Síganos en LinkedIn" },
    toastTitle: { fr: "Message envoyé", en: "Message sent", es: "Mensaje enviado" },
    toastDesc: {
      fr: "Nous reviendrons vers vous dans les meilleurs délais.",
      en: "We will get back to you as soon as possible.",
      es: "Nos pondremos en contacto con usted a la brevedad.",
    },
  },

  // ─── Legal Notice ───
  legal: {
    title: { fr: "Mentions légales", en: "Legal Notice", es: "Aviso legal" },
    editorTitle: { fr: "1. Éditeur du site", en: "1. Website Publisher", es: "1. Editor del sitio" },
    editorType: {
      fr: "SARL unipersonnelle au capital de 5 000 €",
      en: "Single-member limited liability company (SARL) with a share capital of €5,000",
      es: "SARL unipersonal con un capital de 5 000 €",
    },
    editorAddress: {
      fr: "Siège social : 58 rue de Monceau, 75008 Paris, France",
      en: "Registered office: 58 rue de Monceau, 75008 Paris, France",
      es: "Sede social: 58 rue de Monceau, 75008 Paris, Francia",
    },
    editorAPE: {
      fr: "Code APE : 6202A — Conseil en systèmes et logiciels informatiques",
      en: "APE Code: 6202A — IT systems and software consulting",
      es: "Código APE: 6202A — Consultoría en sistemas y software informático",
    },
    editorTVA: {
      fr: "TVA intracommunautaire : FR33 918 031 675",
      en: "EU VAT number: FR33 918 031 675",
      es: "IVA intracomunitario: FR33 918 031 675",
    },
    editorDirector: {
      fr: "Directeur de la publication : Tarik Aazizi, Gérant",
      en: "Publication director: Tarik Aazizi, Managing Director",
      es: "Director de la publicación: Tarik Aazizi, Gerente",
    },
    hostingTitle: { fr: "2. Hébergement", en: "2. Hosting", es: "2. Alojamiento" },
    hostingText: {
      fr: "Le site est hébergé par : Lovable (à compléter avec les informations exactes de l'hébergeur avant mise en production).",
      en: "This website is hosted by: Lovable (to be completed with exact hosting details before going live).",
      es: "El sitio está alojado por: Lovable (completar con la información exacta del alojamiento antes de la puesta en producción).",
    },
    ipTitle: { fr: "2. Propriété intellectuelle", en: "2. Intellectual Property", es: "2. Propiedad intelectual" },
    ipText: {
      fr: "L'ensemble du contenu du site (textes, images, logo, éléments graphiques) est la propriété exclusive de Sabius Tech Solutions, sauf mention contraire. Toute reproduction, même partielle, est interdite sans autorisation préalable.",
      en: "All content on this website (text, images, logo, graphic elements) is the exclusive property of Sabius Tech Solutions, unless otherwise stated. Any reproduction, even partial, is prohibited without prior authorisation.",
      es: "Todo el contenido del sitio (textos, imágenes, logotipo, elementos gráficos) es propiedad exclusiva de Sabius Tech Solutions, salvo mención contraria. Toda reproducción, incluso parcial, está prohibida sin autorización previa.",
    },
    dataTitle: { fr: "3. Données personnelles", en: "3. Personal Data", es: "3. Datos personales" },
    dataText: {
      fr: "Les données collectées via le formulaire de contact (nom, email, entreprise, téléphone, message) sont uniquement destinées à Sabius Tech Solutions pour répondre à vos demandes. Elles ne sont ni cédées ni vendues à des tiers. Conformément au RGPD, vous disposez d'un droit d'accès, de rectification, de suppression et d'opposition sur vos données. Pour exercer ces droits, contactez : contact@sabiustechsolutions.com",
      en: "Data collected through the contact form (name, email, company, phone, message) is used solely by Sabius Tech Solutions to respond to your enquiries. It is neither transferred nor sold to third parties. In accordance with the GDPR, you have the right to access, rectify, delete and object to the processing of your data. To exercise these rights, contact: contact@sabiustechsolutions.com",
      es: "Los datos recogidos a través del formulario de contacto (nombre, email, empresa, teléfono, mensaje) están destinados exclusivamente a Sabius Tech Solutions para responder a sus solicitudes. No se ceden ni se venden a terceros. Conforme al RGPD, usted dispone de un derecho de acceso, rectificación, supresión y oposición sobre sus datos. Para ejercer estos derechos, contacte: contact@sabiustechsolutions.com",
    },
    cookiesTitle: { fr: "4. Cookies", en: "4. Cookies", es: "4. Cookies" },
    cookiesText: {
      fr: "Ce site peut utiliser des cookies techniques nécessaires à son bon fonctionnement. Aucun cookie publicitaire ni de tracking n'est utilisé.",
      en: "This website may use technical cookies necessary for its proper functioning. No advertising or tracking cookies are used.",
      es: "Este sitio puede utilizar cookies técnicas necesarias para su correcto funcionamiento. No se utilizan cookies publicitarias ni de seguimiento.",
    },
    liabilityTitle: { fr: "5. Responsabilité", en: "5. Liability", es: "5. Responsabilidad" },
    liabilityText: {
      fr: "Sabius Tech Solutions s'efforce de maintenir les informations du site à jour mais ne saurait être tenue responsable d'éventuelles inexactitudes ou omissions.",
      en: "Sabius Tech Solutions endeavours to keep the information on this website up to date but cannot be held liable for any inaccuracies or omissions.",
      es: "Sabius Tech Solutions se esfuerza por mantener la información del sitio actualizada, pero no puede ser considerada responsable de posibles inexactitudes u omisiones.",
    },
  },
} as const;
