export type Language = "fr" | "en" | "es";

export const translations = {
  // ─── Navbar ───
  nav: {
    home: { fr: "Accueil", en: "Home", es: "Inicio" },
    services: { fr: "Services", en: "Services", es: "Servicios" },
    references: { fr: "Références", en: "References", es: "Referencias" },
    about: { fr: "À propos", en: "About", es: "Acerca de" },
    contact: { fr: "Contact", en: "Contact", es: "Contacto" },
    careers: { fr: "Nous recrutons", en: "Careers", es: "Empleo" },
    cta: { fr: "Nous contacter", en: "Contact us", es: "Contáctenos" },
  },

  // ─── Footer ───
  footer: {
    tagline: {
      fr: "Sabius Tech Solutions — L'expertise IT au service de vos ambitions.",
      en: "Sabius Tech Solutions — IT expertise driving your ambitions forward.",
      es: "Sabius Tech Solutions — Experiencia IT impulsando sus ambiciones.",
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
      keyword: { fr: "Réactivité", en: "Responsiveness", es: "Capacidad de respuesta" },
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
      en: "Technical expertise in service of your challenges.",
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
    labelLocation: { fr: "Localisation", en: "Location", es: "Ubicación" },
    labelAvailability: { fr: "Disponibilité", en: "Availability", es: "Disponibilidad" },
    availabilityText: { fr: "Lundi — Vendredi, 9h — 18h", en: "Monday — Friday, 9am — 6pm", es: "Lunes — Viernes, 9h — 18h" },
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
      fr: "Le site est hébergé par : GitHub, Inc. — 88 Colin P Kelly Jr St, San Francisco, CA 94107, États-Unis — via le service GitHub Pages.",
      en: "This website is hosted by: GitHub, Inc. — 88 Colin P Kelly Jr St, San Francisco, CA 94107, USA — via the GitHub Pages service.",
      es: "El sitio está alojado por: GitHub, Inc. — 88 Colin P Kelly Jr St, San Francisco, CA 94107, EE. UU. — a través del servicio GitHub Pages.",
    },
    ipTitle: { fr: "3. Propriété intellectuelle", en: "3. Intellectual Property", es: "3. Propiedad intelectual" },
    ipText: {
      fr: "L'ensemble du contenu du site (textes, images, logo, éléments graphiques) est la propriété exclusive de Sabius Tech Solutions, sauf mention contraire. Toute reproduction, même partielle, est interdite sans autorisation préalable.",
      en: "All content on this website (text, images, logo, graphic elements) is the exclusive property of Sabius Tech Solutions, unless otherwise stated. Any reproduction, even partial, is prohibited without prior authorisation.",
      es: "Todo el contenido del sitio (textos, imágenes, logotipo, elementos gráficos) es propiedad exclusiva de Sabius Tech Solutions, salvo mención contraria. Toda reproducción, incluso parcial, está prohibida sin autorización previa.",
    },
    dataTitle: { fr: "4. Données personnelles", en: "4. Personal Data", es: "4. Datos personales" },
    dataText: {
      fr: "Les données collectées via le formulaire de contact (nom, email, entreprise, téléphone, message) sont uniquement destinées à Sabius Tech Solutions pour répondre à vos demandes. Elles ne sont ni cédées ni vendues à des tiers. Conformément au RGPD, vous disposez d'un droit d'accès, de rectification, de suppression et d'opposition sur vos données. Pour exercer ces droits, contactez : contact@sabiustechsolutions.com",
      en: "Data collected through the contact form (name, email, company, phone, message) is used solely by Sabius Tech Solutions to respond to your enquiries. It is neither transferred nor sold to third parties. In accordance with the GDPR, you have the right to access, rectify, delete and object to the processing of your data. To exercise these rights, contact: contact@sabiustechsolutions.com",
      es: "Los datos recogidos a través del formulario de contacto (nombre, email, empresa, teléfono, mensaje) están destinados exclusivamente a Sabius Tech Solutions para responder a sus solicitudes. No se ceden ni se venden a terceros. Conforme al RGPD, usted dispone de un derecho de acceso, rectificación, supresión y oposición sobre sus datos. Para ejercer estos derechos, contacte: contact@sabiustechsolutions.com",
    },
    cookiesTitle: { fr: "5. Cookies", en: "5. Cookies", es: "5. Cookies" },
    cookiesText: {
      fr: "Ce site peut utiliser des cookies techniques nécessaires à son bon fonctionnement. Aucun cookie publicitaire ni de tracking n'est utilisé.",
      en: "This website may use technical cookies necessary for its proper functioning. No advertising or tracking cookies are used.",
      es: "Este sitio puede utilizar cookies técnicas necesarias para su correcto funcionamiento. No se utilizan cookies publicitarias ni de seguimiento.",
    },
    liabilityTitle: { fr: "6. Responsabilité", en: "6. Liability", es: "6. Responsabilidad" },
    liabilityText: {
      fr: "Sabius Tech Solutions s'efforce de maintenir les informations du site à jour mais ne saurait être tenue responsable d'éventuelles inexactitudes ou omissions.",
      en: "Sabius Tech Solutions endeavours to keep the information on this website up to date but cannot be held liable for any inaccuracies or omissions.",
      es: "Sabius Tech Solutions se esfuerza por mantener la información del sitio actualizada, pero no puede ser considerada responsable de posibles inexactitudes u omisiones.",
    },
  },

  // ─── Careers page ───
  careers: {
    pageTitle: { fr: "Nous recrutons", en: "We're hiring", es: "Estamos contratando" },
    pageSubtitle: {
      fr: "Rejoignez une équipe d'experts passionnés par la technique et engagés dans la réussite de chaque mission.",
      en: "Join a team of experts passionate about technology and committed to the success of every engagement.",
      es: "Únase a un equipo de expertos apasionados por la tecnología y comprometidos con el éxito de cada misión.",
    },
    whyTitle: { fr: "Pourquoi nous rejoindre ?", en: "Why join us?", es: "¿Por qué unirse a nosotros?" },
    whyItems: [
      {
        title: { fr: "Projets stimulants", en: "Challenging projects", es: "Proyectos estimulantes" },
        text: {
          fr: "Missions à forte valeur ajoutée dans la banque, l'énergie, le retail et le secteur public.",
          en: "High-value engagements in banking, energy, retail and the public sector.",
          es: "Misiones de alto valor añadido en banca, energía, retail y sector público.",
        },
      },
      {
        title: { fr: "Montée en compétences", en: "Skills development", es: "Desarrollo de competencias" },
        text: {
          fr: "Formations, certifications et accompagnement pour évoluer sur les technologies les plus demandées.",
          en: "Training, certifications and support to grow on the most in-demand technologies.",
          es: "Formación, certificaciones y acompañamiento para crecer en las tecnologías más demandadas.",
        },
      },
      {
        title: { fr: "Environnement bienveillant", en: "Supportive environment", es: "Entorno de apoyo" },
        text: {
          fr: "Un management de proximité, à l'écoute, avec un vrai suivi de carrière.",
          en: "Hands-on management, attentive to your needs, with genuine career guidance.",
          es: "Una gestión cercana, atenta, con un verdadero seguimiento de carrera.",
        },
      },
    ],
    offersTitle: { fr: "Nos offres", en: "Open positions", es: "Nuestras ofertas" },
    filledBadge: { fr: "Poste pourvu", en: "Position filled", es: "Puesto cubierto" },
    activeBadge: { fr: "Poste ouvert", en: "Now hiring", es: "Puesto abierto" },
    applyBtn: { fr: "Postuler", en: "Apply", es: "Postularse" },
    spontaneousTitle: {
      fr: "Vous ne trouvez pas le poste idéal ?",
      en: "Don't see the right role?",
      es: "¿No encuentra el puesto ideal?",
    },
    spontaneousText: {
      fr: "Envoyez-nous votre candidature spontanée. Nous sommes toujours à la recherche de talents.",
      en: "Send us a spontaneous application. We are always looking for talent.",
      es: "Envíenos su candidatura espontánea. Siempre estamos buscando talento.",
    },
    spontaneousBtn: { fr: "Candidature spontanée", en: "Spontaneous application", es: "Candidatura espontánea" },
    contract: { fr: "Contrat", en: "Contract", es: "Contrato" },
    location: { fr: "Localisation", en: "Location", es: "Ubicación" },
    experience: { fr: "Expérience", en: "Experience", es: "Experiencia" },
    salary: { fr: "Rémunération", en: "Salary", es: "Remuneración" },
    remote: { fr: "Télétravail", en: "Remote work", es: "Teletrabajo" },
    missions: { fr: "Missions principales", en: "Key responsibilities", es: "Misiones principales" },
    stack: { fr: "Environnement technique", en: "Technical environment", es: "Entorno técnico" },
    profile: { fr: "Profil recherché", en: "Required profile", es: "Perfil buscado" },
    benefits: { fr: "Avantages", en: "Benefits", es: "Ventajas" },
    offers: [
      {
        title: {
          fr: "Senior Data Scientist — IA Générative & NLP",
          en: "Senior Data Scientist — Generative AI & NLP",
          es: "Senior Data Scientist — IA Generativa y NLP",
        },
        status: "active",
        contract: { fr: "CDI — Cadre", en: "Permanent — Full-time", es: "CDI — Ejecutivo" },
        location: { fr: "Île-de-France — Télétravail partiel", en: "Paris region — Hybrid", es: "Île-de-France — Teletrabajo parcial" },
        experience: { fr: "5 ans minimum", en: "5+ years", es: "Mínimo 5 años" },
        salary: { fr: "55 000 € — 65 000 € brut annuel", en: "€55,000 — €65,000 gross annual", es: "55 000 € — 65 000 € bruto anual" },
        remote: { fr: "2 à 3 jours par semaine", en: "2 to 3 days per week", es: "2 a 3 días por semana" },
        desc: {
          fr: "Au sein de notre pôle Data & IA, vous concevez et déployez des solutions d'intelligence artificielle à forte valeur métier pour nos clients grands comptes. Vous intervenez sur l'ensemble du cycle de vie des modèles, du prototypage à l'industrialisation.",
          en: "Within our Data & AI division, you design and deploy high-value artificial intelligence solutions for our enterprise clients. You work across the full model lifecycle, from prototyping to production deployment.",
          es: "Dentro de nuestro polo de Data e IA, usted diseña y despliega soluciones de inteligencia artificial de alto valor de negocio para nuestros clientes grandes cuentas. Interviene en todo el ciclo de vida de los modelos, desde el prototipado hasta la industrialización.",
        },
        missions: {
          fr: [
            "Concevoir et entraîner des modèles de Machine Learning et de Deep Learning (NLP, séries temporelles, classification).",
            "Développer des solutions basées sur l'IA générative : RAG, agents intelligents, fine-tuning de LLM.",
            "Structurer et optimiser les pipelines de données (collecte, nettoyage, feature engineering).",
            "Industrialiser les modèles via des pipelines MLOps (CI/CD, monitoring, drift detection).",
            "Collaborer avec les équipes métier pour traduire les besoins fonctionnels en solutions data.",
            "Assurer une veille technologique active sur les avancées en IA et les intégrer dans nos pratiques.",
          ],
          en: [
            "Design and train Machine Learning and Deep Learning models (NLP, time series, classification).",
            "Develop solutions based on generative AI: RAG, intelligent agents, LLM fine-tuning.",
            "Structure and optimise data pipelines (collection, cleaning, feature engineering).",
            "Industrialise models via MLOps pipelines (CI/CD, monitoring, drift detection).",
            "Collaborate with business teams to translate functional requirements into data solutions.",
            "Maintain active technology watch on AI advances and integrate them into our practices.",
          ],
          es: [
            "Diseñar y entrenar modelos de Machine Learning y Deep Learning (NLP, series temporales, clasificación).",
            "Desarrollar soluciones basadas en IA generativa: RAG, agentes inteligentes, fine-tuning de LLM.",
            "Estructurar y optimizar los pipelines de datos (recolección, limpieza, feature engineering).",
            "Industrializar los modelos mediante pipelines MLOps (CI/CD, monitoreo, drift detection).",
            "Colaborar con los equipos de negocio para traducir las necesidades funcionales en soluciones data.",
            "Mantener una vigilancia tecnológica activa sobre los avances en IA e integrarlos en nuestras prácticas.",
          ],
        },
        techStack: ["Python", "PyTorch", "TensorFlow", "Scikit-learn", "LangChain", "OpenAI API", "HuggingFace", "Spark", "MLflow", "Docker", "AWS (SageMaker, Bedrock)", "SQL", "Git"],
        profileItems: {
          fr: [
            "Bac+5 en data science, mathématiques appliquées, informatique ou équivalent.",
            "Minimum 5 ans d'expérience en data science, dont au moins 2 ans sur des projets NLP ou IA générative.",
            "Maîtrise de Python et de l'écosystème data/ML (PyTorch, Scikit-learn, Pandas, NumPy).",
            "Expérience confirmée avec les LLM (GPT, Claude, Mistral) et les architectures RAG.",
            "Solides compétences en statistiques, algèbre linéaire et optimisation.",
            "Anglais professionnel courant.",
          ],
          en: [
            "Master's degree in data science, applied mathematics, computer science or equivalent.",
            "Minimum 5 years of experience in data science, including at least 2 years on NLP or generative AI projects.",
            "Proficiency in Python and the data/ML ecosystem (PyTorch, Scikit-learn, Pandas, NumPy).",
            "Proven experience with LLMs (GPT, Claude, Mistral) and RAG architectures.",
            "Strong skills in statistics, linear algebra and optimisation.",
            "Fluent professional English.",
          ],
          es: [
            "Bac+5 en data science, matemáticas aplicadas, informática o equivalente.",
            "Mínimo 5 años de experiencia en data science, incluyendo al menos 2 años en proyectos de NLP o IA generativa.",
            "Dominio de Python y del ecosistema data/ML (PyTorch, Scikit-learn, Pandas, NumPy).",
            "Experiencia confirmada con LLM (GPT, Claude, Mistral) y arquitecturas RAG.",
            "Sólidas competencias en estadística, álgebra lineal y optimización.",
            "Inglés profesional fluido.",
          ],
        },
        benefitsItems: {
          fr: ["Télétravail partiel (2-3 jours/semaine)", "Titres restaurant", "Prise en charge transports à 50 %", "Formations et certifications", "Ordinateur portable fourni"],
          en: ["Hybrid work (2-3 days/week)", "Meal vouchers", "50% transport reimbursement", "Training & certifications", "Laptop provided"],
          es: ["Teletrabajo parcial (2-3 días/semana)", "Vales de comida", "Reembolso de transporte al 50 %", "Formación y certificaciones", "Portátil proporcionado"],
        },
      },
      {
        title: {
          fr: "Ingénieur R&D Cloud — AWS & Java",
          en: "Cloud R&D Engineer — AWS & Java",
          es: "Ingeniero I+D Cloud — AWS y Java",
        },
        status: "filled",
        contract: { fr: "CDI — Cadre", en: "Permanent — Full-time", es: "CDI — Ejecutivo" },
        location: { fr: "Île-de-France — Télétravail ponctuel", en: "Paris region — Occasional remote", es: "Île-de-France — Teletrabajo puntual" },
        experience: { fr: "1 an minimum", en: "1+ year", es: "Mínimo 1 año" },
        salary: { fr: "32 000 € — 34 000 € brut annuel", en: "€32,000 — €34,000 gross annual", es: "32 000 € — 34 000 € bruto anual" },
        remote: { fr: "Ponctuel", en: "Occasional", es: "Puntual" },
        desc: {
          fr: "Au sein de l'équipe R&D, vous participez à la conception et au développement de solutions logicielles cloud innovantes. Vous intervenez sur des projets à forte dimension technique autour des architectures distribuées, du cloud AWS et de l'industrialisation logicielle, avec une ouverture progressive vers des usages IA.",
          en: "Within the R&D team, you take part in the design and development of innovative cloud software solutions. You work on highly technical projects involving distributed architectures, AWS cloud and software industrialisation, with progressive exposure to AI use cases.",
          es: "Dentro del equipo de I+D, usted participa en la concepción y el desarrollo de soluciones de software cloud innovadoras. Interviene en proyectos de alta dimensión técnica en torno a arquitecturas distribuidas, cloud AWS e industrialización de software, con una apertura progresiva hacia usos de IA.",
        },
        missions: {
          fr: [
            "Concevoir et développer des applications et micro-services backend en Java / Spring Boot.",
            "Participer à la définition et à l'évolution d'architectures cloud AWS (EC2, S3, RDS, IAM, services managés).",
            "Développer et exposer des API REST robustes, sécurisées et performantes.",
            "Contribuer aux activités R&D : prototypes techniques, POC, amélioration continue des performances et de la scalabilité.",
            "Mettre en œuvre les bonnes pratiques CI/CD, tests et qualité logicielle.",
          ],
          en: [
            "Design and develop backend applications and micro-services in Java / Spring Boot.",
            "Contribute to the design and evolution of AWS cloud architectures (EC2, S3, RDS, IAM, managed services).",
            "Develop and expose robust, secure and performant REST APIs.",
            "Contribute to R&D activities: technical prototypes, POCs, continuous performance and scalability improvement.",
            "Implement CI/CD, testing and software quality best practices.",
          ],
          es: [
            "Diseñar y desarrollar aplicaciones y micro-servicios backend en Java / Spring Boot.",
            "Participar en la definición y evolución de arquitecturas cloud AWS (EC2, S3, RDS, IAM, servicios gestionados).",
            "Desarrollar y exponer API REST robustas, seguras y de alto rendimiento.",
            "Contribuir a las actividades de I+D: prototipos técnicos, POC, mejora continua del rendimiento y la escalabilidad.",
            "Implementar las buenas prácticas de CI/CD, tests y calidad de software.",
          ],
        },
        techStack: ["Java", "Spring Boot", "AWS (EC2, S3, RDS, IAM)", "REST API", "React", "Docker", "CI/CD", "Git", "Clean Code", "Event-Driven Architecture"],
        profileItems: {
          fr: [
            "Bac+5 en informatique, spécialisation Cloud Computing.",
            "Minimum 1 an d'expérience en développement backend Java.",
            "Certification AWS souhaitée.",
            "Maîtrise des bonnes pratiques Clean Code et architectures event-driven.",
            "Anglais technique courant.",
          ],
          en: [
            "Master's degree in computer science, Cloud Computing specialisation.",
            "Minimum 1 year of experience in Java backend development.",
            "AWS certification preferred.",
            "Proficiency in Clean Code practices and event-driven architectures.",
            "Fluent technical English.",
          ],
          es: [
            "Bac+5 en informática, especialización Cloud Computing.",
            "Mínimo 1 año de experiencia en desarrollo backend Java.",
            "Certificación AWS deseable.",
            "Dominio de buenas prácticas Clean Code y arquitecturas event-driven.",
            "Inglés técnico fluido.",
          ],
        },
        benefitsItems: {
          fr: ["Indemnité transports", "Titres restaurant", "Ordinateur portable fourni", "Possibilité de télétravail"],
          en: ["Transport allowance", "Meal vouchers", "Laptop provided", "Remote work possible"],
          es: ["Indemnización de transporte", "Vales de comida", "Portátil proporcionado", "Posibilidad de teletrabajo"],
        },
      },
    ],
  },

  // ─── 404 Page ───
  notFound: {
    title: { fr: "Page introuvable", en: "Page not found", es: "Página no encontrada" },
    text: {
      fr: "La page que vous recherchez n'existe pas ou a été déplacée.",
      en: "The page you are looking for does not exist or has been moved.",
      es: "La página que busca no existe o ha sido movida.",
    },
    btn: { fr: "Retour à l'accueil", en: "Back to home", es: "Volver al inicio" },
  },

  // ─── Form validation ───
  validation: {
    invalidEmail: {
      fr: "Veuillez entrer un email valide.",
      en: "Please enter a valid email address.",
      es: "Introduzca una dirección de correo electrónico válida.",
    },
    messageTooShort: {
      fr: "Le message doit contenir au moins 10 caractères.",
      en: "The message must contain at least 10 characters.",
      es: "El mensaje debe contener al menos 10 caracteres.",
    },
    successTitle: {
      fr: "Message envoyé !",
      en: "Message sent!",
      es: "¡Mensaje enviado!",
    },
    successText: {
      fr: "Votre message a bien été envoyé. Nous vous répondrons sous 24 h.",
      en: "Your message has been sent successfully. We will reply within 24 hours.",
      es: "Su mensaje ha sido enviado correctamente. Le responderemos en un plazo de 24 horas.",
    },
  },
} as const;
