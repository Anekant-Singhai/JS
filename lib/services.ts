export type ServiceCategory = {
  id: number;
  slug: string;
  title: string;
  group: ServiceGroup;
  note?: string;
  items: string[];
};

export type ServiceGroup =
  | "AI & Project Delivery"
  | "Operations & Reporting"
  | "Documentation & Research"
  | "Engineering & Procurement"
  | "Geospatial & 3D"
  | "Technical & Learning"
  | "Personal & Creative";

export const groups: ServiceGroup[] = [
  "AI & Project Delivery",
  "Operations & Reporting",
  "Documentation & Research",
  "Engineering & Procurement",
  "Geospatial & 3D",
  "Technical & Learning",
  "Personal & Creative",
];

// One item per line keeps the catalogue easy to edit.
const list = (s: string) =>
  s
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);

export const categories: ServiceCategory[] = [
  {
    id: 1,
    slug: "ai-automation",
    title: "AI, Automation & Digital Productivity",
    group: "AI & Project Delivery",
    items: list(`
      AI-assisted project management
      AI-assisted business automation
      AI-assisted research and information gathering
      AI-assisted report preparation
      AI-assisted email drafting and management
      AI-assisted meeting summaries and action-item extraction
      AI-assisted document creation and editing
      AI-assisted project planning and work breakdown structures
      AI-assisted risk, issue, and dependency tracking
      AI-assisted project status reporting
      AI-assisted schedule and delay analysis
      AI-assisted workflow automation
      Automated reminders, follow-ups, and escalations
      Automated daily status reports and weekly summaries
      Business process automation
      Repetitive administrative task automation
      AI tool implementation support
      AI-generated content review and quality checking
    `),
  },
  {
    id: 2,
    slug: "project-management",
    title: "Project Management & Coordination",
    group: "AI & Project Delivery",
    items: list(`
      Project planning
      Project scheduling
      Project coordination
      Project monitoring and control
      Project progress tracking
      Project reporting
      Project documentation
      Project scope documentation
      Work Breakdown Structure (WBS) preparation
      Milestone planning and tracking
      Task assignment and tracking
      Timeline and deadline management
      Resource coordination
      Dependency tracking
      Risk register preparation and maintenance
      Issue register preparation and maintenance
      Change request tracking
      Project escalation management
      Stakeholder communication
      Client coordination
      Vendor coordination
      Cross-functional team coordination
      Project review meeting coordination
      Project closure documentation
      Project management dashboards
      Project recovery and delay-tracking support
      Project management process improvement
    `),
  },
  {
    id: 3,
    slug: "operations",
    title: "Operations Management & Business Support",
    group: "Operations & Reporting",
    items: list(`
      Operations management support
      Daily operations coordination
      Administrative operations
      Business operations documentation
      Operational reporting
      Operations tracking systems
      Process documentation
      Standard Operating Procedure (SOP) preparation
      Workflow mapping
      Workflow improvement
      Process gap analysis
      Bottleneck identification
      Responsibility and approval-flow documentation
      Interdepartmental coordination
      Records and database maintenance
      Operational checklist preparation
      Internal follow-up management
      Management Information System (MIS) reporting
      Business process standardization
      Operational performance tracking
    `),
  },
  {
    id: 4,
    slug: "client-stakeholder",
    title: "Client, Customer & Stakeholder Management",
    group: "Operations & Reporting",
    items: list(`
      Client relationship management support
      Customer support coordination
      Customer query tracking
      Customer complaint tracking
      Customer issue resolution coordination
      Client communication management
      Stakeholder mapping
      Stakeholder communication plans
      Customer onboarding documentation
      Client status updates
      Escalation tracking
      Service delivery coordination
      Customer feedback compilation
      Customer follow-up management
      Client meeting coordination
      Client commitment tracking
      Customer service process documentation
      Customer satisfaction reporting
    `),
  },
  {
    id: 5,
    slug: "helpdesk-sla",
    title: "Helpdesk, SLA & Issue Management",
    group: "Operations & Reporting",
    items: list(`
      Helpdesk management support
      Ticket management
      Issue logging and classification
      Bug and error tracking
      Incident tracking
      Problem tracking
      Issue prioritization
      Assignment and ownership tracking
      Service-Level Agreement (SLA) tracking
      Turnaround Time (TAT) monitoring
      Overdue issue reporting
      Escalation matrix preparation
      Resolution tracking
      Root-cause analysis documentation
      Repeat-issue analysis
      Issue aging reports
      Resolution-time reporting
      Support performance dashboards
      Customer issue status reporting
      Issue management workflow design
    `),
  },
  {
    id: 6,
    slug: "testing-qa",
    title: "Software Testing & Quality Assurance",
    group: "Technical & Learning",
    items: list(`
      Software testing support
      Functional testing
      User Acceptance Testing (UAT)
      Test plan preparation
      Test case preparation
      Test scenario preparation
      Test data organization
      Test execution documentation
      Defect identification and reporting
      Bug reproduction documentation
      Bug severity and priority classification
      Regression testing support
      Bug fix verification
      Requirements validation
      Business rule documentation
      Acceptance criteria documentation
      Test result reporting
      UAT coordination
      Release readiness documentation
      Software quality tracking
      Test evidence management
    `),
  },
  {
    id: 7,
    slug: "excel-data",
    title: "Excel, Data Management & Reporting",
    group: "Operations & Reporting",
    items: list(`
      Excel spreadsheet creation
      Advanced spreadsheet organization
      Data cleaning and formatting
      Data consolidation
      Data validation
      Formula-based calculations
      Data analysis
      Pivot table reporting
      Excel dashboards
      Project trackers
      Issue trackers
      SLA trackers
      Workload trackers
      Budget and cost trackers
      Inventory trackers
      Attendance and activity trackers
      Progress dashboards
      Performance dashboards
      MIS reports
      Management reports
      Automated spreadsheet reporting
      Data visualization
      Chart and graph preparation
      Spreadsheet template development
      Data entry and data organization
      Recurring report preparation
      Monthly and weekly reporting
      Spreadsheet quality checks
    `),
  },
  {
    id: 8,
    slug: "executive-reporting",
    title: "Executive & Management Reporting",
    group: "Operations & Reporting",
    items: list(`
      Executive summaries
      Management information reports
      Project status reports
      Monthly performance reports
      Weekly progress reports
      Daily status reports
      Exception reports
      Risk and issue summaries
      Pending action reports
      SLA breach reports
      Performance indicator reporting
      Key Performance Indicator (KPI) dashboards
      Key Result Area (KRA) documentation
      Target-versus-actual reporting
      Decision-support summaries
      Meeting briefing notes
      Management presentation preparation
      Business performance summaries
      Operational review reports
    `),
  },
  {
    id: 9,
    slug: "research",
    title: "Research & Information Services",
    group: "Documentation & Research",
    items: list(`
      General research
      Desk research
      Online research
      Market research support
      Industry research
      Competitor research
      Product and service comparison
      Vendor research
      Information gathering
      Information verification
      Source compilation
      Literature reviews
      Research summaries
      Comparative analysis
      Data-backed research reports
      Policy and regulatory information compilation
      Technical information research
      Research presentation preparation
      Reference and bibliography formatting
      Research data organization
    `),
  },
  {
    id: 10,
    slug: "technical-writing",
    title: "Technical Writing & Documentation",
    group: "Documentation & Research",
    items: list(`
      Technical report writing
      Business report writing
      Research report writing
      Project report writing
      Process documentation
      Technical editing
      Proofreading
      Document formatting
      Report structuring
      Executive summary writing
      Technical proposal writing
      Business proposal writing
      User manual preparation
      Instruction manual preparation
      Troubleshooting guide preparation
      FAQ development
      Knowledge base development
      SOP writing
      Training document preparation
      Reference document preparation
      Technical content compilation
      Document review and consistency checks
    `),
  },
  {
    id: 11,
    slug: "dpr-feasibility",
    title: "Detailed Project Reports & Feasibility Documentation",
    group: "Documentation & Research",
    items: list(`
      Detailed Project Report (DPR) preparation support
      Project concept documentation
      Project background and objectives
      Project scope documentation
      Implementation plan preparation
      Project cost compilation
      Resource requirement documentation
      Project timeline preparation
      Technical feasibility documentation
      Operational feasibility documentation
      Financial feasibility documentation
      Commercial feasibility documentation
      Risk assessment documentation
      Alternative analysis
      Project benefit documentation
      Project implementation schedules
      Supporting annexure preparation
      Data compilation for feasibility studies
    `),
  },
  {
    id: 12,
    slug: "construction-civil",
    title: "Construction & Civil Engineering Support",
    group: "Engineering & Procurement",
    items: list(`
      Construction project coordination
      Construction progress tracking
      Construction schedule tracking
      Site activity documentation
      Construction reporting
      Contractor coordination
      Subcontractor coordination
      Material tracking
      Resource tracking
      Work completion tracking
      Construction checklist preparation
      Drawing and specification documentation
      Quantity documentation
      Measurement record organization
      Construction cost tracking
      Variation and change tracking
      Highway engineering research and documentation
      Soil mechanics research and documentation
      Civil engineering technical report preparation
      Basic AutoCAD drafting support
      Construction project dashboards
      Construction meeting minutes and action tracking
    `),
  },
  {
    id: 13,
    slug: "boq-cost",
    title: "BOQ, Quantities & Cost Documentation",
    group: "Engineering & Procurement",
    items: list(`
      Bill of Quantities (BOQ) preparation support
      Quantity take-off support
      Item description preparation
      Unit and quantity organization
      Rate analysis documentation
      Cost estimate compilation
      Material quantity calculations
      Construction cost comparison
      Budget preparation support
      Cost tracking spreadsheets
      Quantity reconciliation
      BOQ formatting and quality checks
      Cost variation tracking
      Budget-versus-actual reporting
      Supporting quantity schedules
    `),
  },
  {
    id: 14,
    slug: "rfq-vendor",
    title: "RFQ, Quotations & Vendor Management",
    group: "Engineering & Procurement",
    items: list(`
      Request for Quotation (RFQ) preparation
      Request for Information (RFI) documentation
      Vendor enquiry preparation
      Vendor database creation
      Vendor identification research
      Quotation collection tracking
      Quotation comparison sheets
      Technical comparison tables
      Commercial comparison tables
      Vendor evaluation documentation
      Procurement tracking
      Purchase request tracking
      Purchase order register maintenance
      Vendor follow-up management
      Delivery status tracking
      Procurement reporting
      Supplier performance tracking
      Procurement documentation organization
    `),
  },
  {
    id: 15,
    slug: "tender-bid",
    title: "Tender, Bid & Proposal Management",
    group: "Engineering & Procurement",
    items: list(`
      Tender opportunity research
      Tender document review
      Tender requirement extraction
      Eligibility checklist preparation
      Compliance matrix preparation
      Tender deadline tracking
      Bid submission coordination
      Technical bid documentation
      Commercial bid documentation support
      Proposal preparation
      Tender annexure compilation
      Supporting document organization
      Government tender documentation support
      Tender query tracking
      Pre-bid question compilation
      Tender submission checklist preparation
      Bid status tracking
      Tender pipeline reporting
      Contract document organization
      Tender compliance tracking
    `),
  },
  {
    id: 16,
    slug: "sales-crm",
    title: "Sales, Lead Generation & CRM",
    group: "Operations & Reporting",
    items: list(`
      Lead generation research
      Prospect database creation
      Lead qualification support
      Customer database maintenance
      Customer Relationship Management (CRM) updates
      Sales pipeline tracking
      Sales follow-up management
      Sales activity reporting
      Lead status tracking
      Customer interaction logging
      Sales proposal preparation
      Sales presentation preparation
      Account management support
      Key account tracking
      Customer segmentation support
      Sales target tracking
      Business opportunity research
      Competitor and market information compilation
      Sales dashboard preparation
      CRM data cleaning
    `),
  },
  {
    id: 17,
    slug: "virtual-assistance",
    title: "Virtual Assistance & Administrative Services",
    group: "Operations & Reporting",
    items: list(`
      Virtual assistant services
      Email inbox organization
      Email categorization
      Email drafting
      Email follow-up tracking
      Calendar management
      Appointment scheduling
      Meeting scheduling
      Travel itinerary organization
      Document preparation
      Data entry
      Online information gathering
      File and folder organization
      Contact list maintenance
      Reminder management
      Task list maintenance
      Administrative follow-ups
      Presentation formatting
      Routine correspondence support
      Remote office support
    `),
  },
  {
    id: 18,
    slug: "meeting-action",
    title: "Meeting & Action Management",
    group: "AI & Project Delivery",
    items: list(`
      Meeting agenda preparation
      Meeting coordination
      Meeting minutes preparation
      Minutes of Meeting (MoM) documentation
      Decision logging
      Action-item extraction
      Action-item tracking
      Responsibility assignment tracking
      Deadline tracking
      Meeting follow-up
      Review meeting documentation
      Steering committee meeting support
      Client meeting documentation
      Meeting summary preparation
      Recurring meeting reporting
    `),
  },
  {
    id: 19,
    slug: "training-knowledge",
    title: "Training, Manuals & Knowledge Management",
    group: "Documentation & Research",
    items: list(`
      User manuals
      Training manuals
      Quick-start guides
      Process guides
      Software usage guides
      Training presentations
      Training checklist preparation
      Learning material organization
      Frequently Asked Questions (FAQ) documents
      Internal knowledge base creation
      Troubleshooting documentation
      Employee onboarding documentation
      Process handover documentation
      Knowledge transfer documentation
      Training session coordination
      Training feedback compilation
    `),
  },
  {
    id: 20,
    slug: "gis-mapping",
    title: "GIS, Mapping & Geospatial Services",
    group: "Geospatial & 3D",
    items: list(`
      Geographic Information System (GIS) mapping
      Basic spatial data organization
      Geographic dataset preparation
      Map preparation
      Thematic mapping
      Location mapping
      Site location mapping
      Spatial data visualization
      Basic spatial analysis
      Buffer and proximity analysis
      Land-use information mapping support
      Geographic data cleanup
      Coordinate and attribute table organization
      Territory mapping
      Service area mapping
      Project location mapping
      Infrastructure location mapping
      GIS report preparation
      Map layout preparation using suitable GIS software
    `),
  },
  {
    id: 21,
    slug: "zonal-territory",
    title: "Zonal & Territory Analysis",
    group: "Geospatial & 3D",
    items: list(`
      Sales territory mapping
      Service territory mapping
      Regional coverage analysis
      Customer location mapping
      Geographic distribution analysis
      Zone-wise performance reporting
      Regional project tracking
      Territory comparison tables
      Location-based opportunity research
      Area-wise service planning
      Geographic coverage dashboards
    `),
  },
  {
    id: 22,
    slug: "environmental-waste",
    title: "Environmental & Waste Management Documentation",
    group: "Engineering & Procurement",
    items: list(`
      Waste management documentation
      Waste inventory compilation
      Waste stream classification support
      Waste generation data organization
      Waste management plan documentation
      Waste collection and disposal tracking
      Environmental data compilation
      Environmental report preparation support
      Environmental Management System (EMS) documentation support
      Environmental checklist preparation
      Environmental compliance document organization
      Environmental monitoring data reporting
      Sustainability information compilation
      Environmental audit evidence organization
      Environmental performance tracking
      Environmental risk register documentation
      Environmental project research
      Environmental Impact Assessment (EIA) report documentation support
    `),
  },
  {
    id: 23,
    slug: "drone-uav",
    title: "Drone & UAV Industry Support",
    group: "Geospatial & 3D",
    note: "These are documentation, research, coordination, and data-processing services. A-Z Enterprises does not own a drone or offer in-house drone flight services.",
    items: list(`
      Drone industry research
      Unmanned Aerial Vehicle (UAV) project coordination
      Drone project documentation
      UAV operations documentation
      Drone project progress tracking
      Drone service proposal preparation
      Drone tender documentation support
      Drone use-case research
      Drone project requirement compilation
      Client and vendor coordination for drone projects
      UAV project reporting
      Drone-related GIS workflow support
      Drone project presentation preparation
      Drone procurement comparison support
      Drone project records management
      Processing client-provided aerial imagery
    `),
  },
  {
    id: 24,
    slug: "programming-databases",
    title: "Programming, Databases & Technical Support",
    group: "Technical & Learning",
    items: list(`
      Basic Python scripting
      Basic C programming support
      Basic C++ programming support
      Basic MATLAB scripting support
      Basic MySQL support
      Basic PostgreSQL support
      SQL query assistance
      Database table organization
      Basic data extraction
      Data import and export support
      Data cleaning scripts
      Spreadsheet-to-database organization
      Simple task automation scripts
      Basic code troubleshooting
      Code documentation
      Basic technical research
      Technical workflow documentation
    `),
  },
  {
    id: 25,
    slug: "academic-tutoring",
    title: "Academic, Educational & Tutoring Services",
    group: "Technical & Learning",
    note: "Academic support should help learners understand and improve their own work, rather than produce work for submission as someone else's independent work.",
    items: list(`
      Mathematics tutoring
      Science tutoring
      English tutoring
      Computer science tutoring
      Basic programming instruction
      Civil engineering subject tutoring
      Highway engineering subject support
      Soil mechanics subject support
      Study material preparation
      Concept explanation
      Practice question preparation
      Presentation preparation for learning
      Educational research support
      Literature search support
      Academic proofreading and formatting
      Research methodology explanation
      Reference formatting
      Learning plan preparation
    `),
  },
  {
    id: 26,
    slug: "business-development",
    title: "Business Development & Government Engagement Support",
    group: "Engineering & Procurement",
    items: list(`
      Business opportunity research
      Government tender opportunity tracking
      Public-sector project research
      Client presentation preparation
      Business proposal preparation
      Technical documentation for business development
      Stakeholder and client database maintenance
      Tender compliance tracking
      Government department communication support
      Meeting preparation and follow-ups
      Business pipeline reporting
      Partnership opportunity research
      Bid coordination
      Supporting document compilation
      Sales and business development reporting
    `),
  },
  {
    id: 27,
    slug: "presentations-visual",
    title: "Presentation & Visual Communication",
    group: "Documentation & Research",
    items: list(`
      PowerPoint presentation creation
      Business presentations
      Project status presentations
      Management review presentations
      Technical presentations
      Proposal presentations
      Training presentations
      Data visualization slides
      Flowchart preparation
      Process diagrams
      Project workflow diagrams
      Organizational charts
      Timeline and milestone visuals
      Presentation redesign
      Slide formatting and consistency checks
      Converting reports into presentations
      Converting complex information into clear visuals
    `),
  },
  {
    id: 28,
    slug: "office-productivity",
    title: "Document, Word & Office Productivity",
    group: "Documentation & Research",
    items: list(`
      Microsoft Word document preparation
      Document formatting
      Report templates
      Table formatting
      Table of contents preparation
      Header and footer formatting
      Document standardization
      PDF-to-editable-text conversion support
      Document conversion and cleanup
      Form preparation
      Business letter and memo formatting
      Spreadsheet and document template creation
      Office document quality checks
      File naming and folder organization
      Document version tracking
    `),
  },
  {
    id: 29,
    slug: "monitoring-compliance",
    title: "Monitoring, Evaluation & Compliance Tracking",
    group: "AI & Project Delivery",
    items: list(`
      Monitoring framework documentation
      Project indicator tracking
      Target-versus-actual analysis
      Milestone compliance tracking
      Compliance checklist preparation
      Evidence register maintenance
      Deliverable tracking
      Audit documentation organization
      Action plan tracking
      Corrective action tracking
      Progress verification using supplied evidence
      Monitoring reports
      Performance review documentation
      Public-Private Partnership (PPP) project monitoring documentation support
      Compliance status dashboards
    `),
  },
  {
    id: 30,
    slug: "planning-budgeting",
    title: "Planning, Budgeting & Performance Management",
    group: "AI & Project Delivery",
    items: list(`
      Annual planning support
      Quarterly planning support
      Monthly work planning
      Activity calendar preparation
      Workload planning
      Resource planning support
      Budget tracking
      Expense tracking
      Target-setting documentation
      Key Result Area (KRA) preparation
      Key Performance Indicator (KPI) preparation
      Performance review documentation
      Goal-versus-actual tracking
      Productivity reporting
      Department performance dashboards
      Improvement plan tracking
    `),
  },
  {
    id: 31,
    slug: "personal-productivity",
    title: "Personal Productivity & Organization",
    group: "Personal & Creative",
    items: list(`
      Personal task trackers
      Weekly planning templates
      Goal tracking spreadsheets
      Habit tracking templates
      Personal project coordination
      Study schedule preparation
      Document organization
      Personal administrative assistance
      Deadline and reminder systems
      Personal information organization
    `),
  },
  {
    id: 32,
    slug: "listening-companionship",
    title: "Non-Clinical Listening & Companionship",
    group: "Personal & Creative",
    note: "These are non-clinical services, not psychotherapy, medical advice, diagnosis, or crisis intervention.",
    items: list(`
      Supportive listening
      Non-judgmental conversation
      Companionship for people seeking conversation
      Helping people organize their thoughts through conversation
      Reflective discussion and perspective exploration
      Accountability conversations for everyday goals
    `),
  },
  {
    id: 33,
    slug: "arts-crafts",
    title: "Creative, Arts & Crafts Support",
    group: "Personal & Creative",
    items: list(`
      Basic arts and crafts instruction
      Simple craft project planning
      Craft instruction sheets
      Creative activity worksheets
      Basic educational craft material preparation
      Craft supply lists
      Step-by-step craft guides
      Simple creative project documentation
    `),
  },
  {
    id: 34,
    slug: "photogrammetry-3d",
    title: "3D Modeling, Camera Photogrammetry & Reality Capture",
    group: "Geospatial & 3D",
    note: "These services use camera or smartphone photographs. Drone imagery can be processed when supplied by a client or an external drone operator; drone capture is not offered in-house. Results depend on image quality, camera calibration, overlap, lighting, and reference measurements. Survey-grade measurements and certified survey or engineering deliverables require appropriate validation and qualified professionals where applicable.",
    items: list(`
      Camera-based photogrammetry
      Smartphone-based photogrammetry, where image quality is suitable
      Photogrammetry-based 3D modeling
      3D reconstruction from photographs
      Object-based 3D reconstruction
      Building-based 3D reconstruction
      Structure-based 3D reconstruction
      Site-based 3D reconstruction
      3D mesh generation
      Textured 3D model generation
      3D model cleanup and refinement
      Photogrammetric image alignment and processing
      Point cloud generation from photographs
      Point cloud organization and processing
      Digital Surface Model (DSM) generation
      Digital Terrain Model (DTM) processing support, where the source data permits
      Orthomosaic generation from suitable aerial imagery
      3D site visualization
      Building and infrastructure visualization
      Construction progress visualization from repeated captures
      Existing-structure visual documentation
      GIS integration of 3D models
      Photogrammetric data processing
      3D model export and conversion
      Processing client-provided drone imagery
      Preparing photogrammetric outputs for GIS, CAD, visualization, or other supported workflows
    `),
  },
];

export const totalServices = categories.reduce((n, c) => n + c.items.length, 0);

// Highlighted on the home page, in the order the portfolio prioritises them.
// Highlighted on the home page, in the order the portfolio prioritises them.
// Copy leads with the outcome and how AI + human judgment get there.
export const coreServices = [
  {
    title: "AI-assisted project management",
    body: "We use AI to draft plans, WBS, and status reports in hours, then apply real project judgment to what matters.",
    slug: "ai-automation",
  },
  {
    title: "Project coordination",
    body: "Schedules, dependencies, and follow-ups that run themselves, with automated reminders and a person accountable.",
    slug: "project-management",
  },
  {
    title: "Operations support",
    body: "We map how work actually flows, fix the bottlenecks, and write SOPs your team will actually use.",
    slug: "operations",
  },
  {
    title: "Excel reporting & dashboards",
    body: "Instead of filling trackers by hand, we build the trackers and reports so they update themselves.",
    slug: "excel-data",
  },
  {
    title: "Technical documentation",
    body: "Reports, proposals, manuals, and DPRs drafted faster with AI and fact-checked by someone who knows the subject.",
    slug: "technical-writing",
  },
  {
    title: "Stakeholder coordination",
    body: "Clear updates, communication plans, and escalations: the human side of projects that tools can't handle alone.",
    slug: "client-stakeholder",
  },
  {
    title: "Issue & SLA tracking",
    body: "Ticket workflows, SLA alerts, and root-cause analysis that turn recurring problems into fixed ones.",
    slug: "helpdesk-sla",
  },
  {
    title: "Research",
    body: "AI searches widely, and we verify every source and summarise what it means for your decision.",
    slug: "research",
  },
];

export const boundaries = [
  {
    title: "Core services",
    body: "Project coordination, operations support, Excel reporting, technical documentation, stakeholder coordination, issue tracking, research, and AI-assisted project management.",
  },
  {
    title: "Technical services",
    body: "GIS, programming, databases, AutoCAD, software testing, and photogrammetry, offered within demonstrated competence.",
  },
  {
    title: "Specialist & regulated work",
    body: "Engineering design, statutory environmental assessments, formal certifications, and survey-grade outputs may need qualified professionals, specialised equipment, independent validation, or authorised sign-off.",
  },
  {
    title: "Drone constraint",
    body: "No drone is owned. We work with ground-level camera imagery and process suitable aerial imagery supplied by clients or external operators.",
  },
];
