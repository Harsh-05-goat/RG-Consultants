/* ==========================================================================
   RG CONSULTANTS — CENTRAL DATA FILE
   --------------------------------------------------------------------------
   Every page reads its content from the objects below instead of having
   text hard-coded into HTML. This is intentional: it means the whole
   site can later be pointed at a real backend (Google Sheet, CMS, REST
   API, MySQL + admin panel, Firebase/Supabase — anything) by rewriting
   the functions at the bottom of this file, without touching any page.

   WHAT IS VERIFIED vs PLACEHOLDER
   - companyInfo: verified from the business's Google Maps listing and
     details supplied directly by the owner. EXCEPTION: email and
     formspreeEndpoint below are still placeholders — see comments there.
   - services: verified — matches the six services the firm actually lists.
   - jobs / articles: now sourced live from the connected Google Sheets
     (see JOBS_SHEET_CSV_URL / ARTICLES_SHEET_CSV_URL further down). The
     arrays defined here are only a fallback if a sheet is disconnected
     or briefly unreachable.
   - complianceDates: SAMPLE DATA. Do not publish real filing deadlines
     without verifying them against the current CBIC/CBDT/MCA calendar.
   - stats: intentionally NON-NUMERIC. No client counts, years-in-practice
     or filing percentages are invented here — see companyInfo.trustPoints.
========================================================================== */

const companyInfo = {
  legalNameEn: "RG Consultants (Adv. Rachit Kumar Garg)",
  legalNameHi: "आर जी कंसल्टेंट्स (अद्व. रचित गर्ग)",
  displayName: "RG Consultants",
  tagline: "Registration and compliance, handled properly.",
  category: "Tax Consultant · Dehradun, Uttarakhand",
  description: "RG Consultants deals in accounting, bookkeeping, income tax & GST matters — helping businesses and individuals incorporate, file, and stay compliant.",
  founded: "2016",
  address: "Green Building, Laxmi Enclave, A3, Dehrakhas, Dehradun, Uttarakhand 248001",
  phone: "081712 23939",
  phoneHref: "tel:+918171223939",
  whatsappHref: "https://wa.me/918171223939",
  email: "rachitgargca1992@gmail.com",
  mapsUrl: "https://www.google.com/maps?cid=6026447595715610859",
  reviewsUrl: "https://www.google.com/maps?cid=6026447595715610859",
  writeReviewUrl: "https://www.google.com/maps?cid=6026447595715610859&action=write-review",
  mapsEmbedSrc: "https://www.google.com/maps?q=R+G+Consultants+Adv+Rachit+Garg&ll=30.2966024,78.0182239&z=17&output=embed",
  hours: {
    0: null,               // Sunday — closed
    1: "11 am – 7 pm",
    2: "11 am – 7 pm",
    3: "11 am – 7 pm",
    4: "11 am – 7 pm",
    5: "11 am – 7 pm",
    6: "11 am – 3 pm",      // Saturday — half day
  },
  hoursNote: "Closed on Independence Day and other public holidays. Hours may vary — call ahead to confirm.",
  // Non-numeric trust points — used instead of invented statistics.
  trustPoints: ["Business Registration", "GST & Taxation", "Accounting", "Compliance Advisory"],
  formspreeEndpoint: "https://formspree.io/f/YOUR_FORM_ID", // replace with real Formspree (or other) endpoint
  careersEmail: "rachitgargca1992@gmail.com",
};

const services = [
  {
    slug: "company-registration",
    num: "01",
    title: "Company Registration",
    short: "Private limited, LLP, partnership and proprietorship setup, including DIN, DSC and PAN/TAN.",
    who: "Founders starting a new business, or existing proprietors formalising into a company or LLP.",
    provides: [
      "Name approval and DIN / DSC processing",
      "MOA / AOA drafting and ROC filing",
      "PAN, TAN and bank account coordination",
      "Post-incorporation compliance checklist",
    ],
    process: ["Understand your business and ownership structure", "Recommend the right entity type", "Prepare and file incorporation documents", "Hand over registration certificates and next-step checklist"],
    documents: ["Identity & address proof of directors/partners", "Passport-size photographs", "Proof of registered office address", "Digital signature (arranged if not already held)"],
    faqs: [
      { q: "How long does company registration usually take?", a: "Timelines depend on document readiness and government processing times, which vary. We'll give you a realistic estimate once we review your documents." },
      { q: "Which entity type is right for me?", a: "It depends on liability, funding plans, and compliance appetite. We talk through the trade-offs with you before recommending one." },
    ],
  },
  {
    slug: "gst-taxation",
    num: "02",
    title: "GST & Taxation",
    short: "Registration, monthly and annual returns, income tax filing, and advance tax planning.",
    who: "Businesses crossing the GST threshold, and individuals or firms filing income tax returns.",
    provides: [
      "GST registration and amendments",
      "Monthly / quarterly GSTR-1 and GSTR-3B filing",
      "Income tax return filing for individuals and businesses",
      "Advance tax computation and due-date reminders",
    ],
    process: ["Review your transactions and applicable tax regime", "Register or amend GST as needed", "File returns on schedule", "Flag notices or mismatches early"],
    documents: ["PAN and business registration documents", "Sales and purchase records", "Bank statements for the relevant period", "Previous filings, if any"],
    faqs: [
      { q: "What happens if a GST return is filed late?", a: "Late filing attracts interest and a per-day late fee under the GST Act. We track your due dates so this doesn't happen." },
      { q: "Do you handle GST notices?", a: "Yes — we review the notice, gather the required documents, and help prepare the response." },
    ],
  },
  {
    slug: "accounting-bookkeeping",
    num: "03",
    title: "Accounting & Bookkeeping",
    short: "Monthly books, payroll processing, MIS reporting and reconciliation for growing teams.",
    who: "Businesses that need clean, current books — for their own decision-making or for lenders/investors.",
    provides: [
      "Monthly books of accounts and ledger maintenance",
      "Payroll processing and payslip generation",
      "MIS reports for management review",
      "Bank and vendor reconciliation",
    ],
    process: ["Set up or review your chart of accounts", "Establish a monthly bookkeeping cadence", "Reconcile accounts and flag discrepancies", "Deliver reports you can actually act on"],
    documents: ["Bank statements", "Sales and purchase invoices", "Payroll details, if applicable", "Access to existing accounting software, if any"],
    faqs: [
      { q: "Can you work with our existing software?", a: "In most cases, yes — tell us what you're using and we'll confirm compatibility." },
      { q: "How often will we receive reports?", a: "Typically monthly, though this can be adjusted to your reporting needs." },
    ],
  },
  {
    slug: "cloud-accounting",
    num: "04",
    title: "Cloud Accounting",
    short: "Real-time books on cloud accounting software, accessible to you and our team from anywhere.",
    who: "Businesses that want up-to-date books without waiting for a monthly close, or need to share access with an accountant remotely.",
    provides: [
      "Setup and migration to cloud accounting software",
      "Real-time bookkeeping and transaction categorisation",
      "Bank feed integration and automated reconciliation",
      "Anytime access to your financial dashboard",
    ],
    process: ["Assess your current books and preferred software", "Migrate or set up your cloud accounting account", "Connect bank feeds and automate entries", "Review with you on a regular cadence"],
    documents: ["Existing accounting records, if any", "Bank account details for feed setup", "List of users who need access"],
    faqs: [
      { q: "Which cloud accounting software do you work with?", a: "We can advise on the right fit for your business size and needs, and support setup on the platform you choose." },
    ],
  },
  {
    slug: "roc-compliance",
    num: "05",
    title: "ROC & Secretarial Compliance",
    short: "Annual filings, board resolutions, share transfers and Registrar of Companies correspondence.",
    who: "Registered companies and LLPs with ongoing annual filing and secretarial obligations.",
    provides: [
      "Annual filings — AOC-4 and MGT-7",
      "Board resolutions and minutes drafting",
      "Share transfer and allotment paperwork",
      "ROC correspondence and notice handling",
    ],
    process: ["Track your annual filing calendar", "Prepare required resolutions and forms", "File with the Registrar of Companies", "Maintain your statutory registers"],
    documents: ["Financial statements", "Board meeting minutes", "Existing statutory registers", "DSC of authorised signatories"],
    faqs: [
      { q: "What happens if annual filings are missed?", a: "Late ROC filings attract additional fees that increase with delay. We help you stay ahead of these deadlines." },
    ],
  },
  {
    slug: "financial-advisory",
    num: "06",
    title: "Financial Advisory",
    short: "Business valuation, funding readiness, and structuring advice for founders and investors.",
    who: "Founders preparing for funding, business owners considering restructuring, or anyone needing a second opinion on a financial decision.",
    provides: [
      "Business valuation reports",
      "Funding and investor-readiness support",
      "Entity structuring advice",
      "Growth and cash-flow planning",
    ],
    process: ["Understand your business and objective", "Review financials and current structure", "Prepare analysis or valuation", "Walk through findings and options with you"],
    documents: ["Financial statements", "Cap table, if applicable", "Business plan or projections, if available"],
    faqs: [
      { q: "Do you help with fundraising documents?", a: "We can help prepare the financial documentation investors typically ask for as part of due diligence." },
    ],
  },
];

// SAMPLE DATA — replace with real openings, or set to [] for "no openings".
const jobs = [
  { title: "Semi-Qualified Chartered Accountant", desc: "Statutory audits, tax audits and client reporting.", dept: "Audit", location: "Dehradun (On-site)", type: "Full-time", experience: "2+ years", responsibilities: ["Assist in statutory and tax audits", "Prepare audit working papers", "Liaise with clients on documentation"], requirements: ["Semi-qualified CA (IPCC/Inter cleared)", "Working knowledge of audit standards", "Strong Excel skills"] },
  { title: "GST & Tax Compliance Associate", desc: "GST returns, reconciliations and notice handling for SME clients.", dept: "Taxation", location: "Dehradun (On-site)", type: "Full-time", experience: "1+ years", responsibilities: ["File monthly/quarterly GST returns", "Reconcile GSTR-2B with purchase records", "Draft responses to GST notices"], requirements: ["B.Com or equivalent", "Familiarity with GST portal and return filing", "Attention to detail"] },
  { title: "Company Secretary Trainee", desc: "ROC filings, incorporation paperwork and board documentation.", dept: "Secretarial", location: "Dehradun (Hybrid)", type: "Internship", experience: "Fresher", responsibilities: ["Support ROC filings and annual returns", "Draft board resolutions and minutes", "Maintain statutory registers"], requirements: ["Pursuing/completed CS qualification", "Basic understanding of Companies Act", "Willingness to learn"] },
  { title: "Front Desk & Client Coordinator", desc: "First point of contact for walk-ins, calls and document collection.", dept: "Operations", location: "Dehradun (On-site)", type: "Full-time", experience: "0–2 years", responsibilities: ["Greet and assist walk-in clients", "Coordinate document collection", "Manage calls and scheduling"], requirements: ["Good communication skills", "Basic computer literacy", "Organised and reliable"] },
];

// Fallback only — used if ARTICLES_SHEET_CSV_URL (below) is empty or the
// sheet is briefly unreachable. Left empty on purpose: if it ever falls
// back, the Resources page should show nothing rather than fake content.
// Once the spreadsheet is connected, this array is rarely if ever used.
const articles = [];

const articleCategories = ["All", "GST", "Income Tax", "ROC", "Accounting", "Business", "Compliance"];

// Fallback only — used if COMPLIANCE_SHEET_CSV_URL (below) is empty or the
// sheet is briefly unreachable. Left empty on purpose: these are filing
// deadlines, and a wrong date is worse than no date. If it ever falls
// back, the Compliance Calendar should show nothing rather than a guess.
const complianceDates = [];

const galleryImages = [
  { src: "images/boss-cabin.jpg", category: "Office", caption: "Director's Cabin" },
  { src: "images/employee-area.jpg", category: "Office", caption: "Employee Area" },
  { src: "images/workstation-1.jpg", category: "Work", caption: "Employee Workstations" },
  { src: "images/workstation-2.jpg", category: "Work", caption: "Working Area" },
];

const teamMembers = [
  // VERIFY — add real team members with real names/photos before launch.
  // { name: "Rachit Kumar Garg", role: "Proprietor & Advocate", photo: "images/team-placeholder.jpg" },
];

// REAL REVIEWS ONLY — copy-paste directly from the Google Business Profile,
// word for word. Never invent or paraphrase a review. rating is optional
// (1–5) — only include it if you can actually see the star count on the
// review; leave it out entirely rather than guess, and the card will just
// skip showing stars for that one.
// { name: "Client's real name", rating: 5, text: "The actual review text, verbatim.", date: "2 months ago" }
const reviews = [
  { name: "Shreya Sangal", text: "I had an excellent experience working with R.G.Consultant. Their deep understanding of income tax laws and meticulous attention to detail made a stressful situation much easier to navigate. From filing returns to handling a complex tax notice, they were consistently professional, responsive, and transparent.", date: "11 months ago" },
  { name: "shagun aggarwal", text: "Very good firm, prompt with work and got the work done prior deadline at a good pricing. I had a very good experience with them. Highly recommend RG Consultants to everyone.", date: "11 months ago" },
  { name: "Manan Grover", text: "Very professional and reliable CA. Explains everything clearly, gives the right advice, and is always responsive. Makes accounting and tax work hassle free. Highly recommend.", date: "11 months ago" },
  { name: "Uday Garg", text: "He provides personal attention to every part of accounts handling with precision, totally recommended by me to have services from him.", date: "11 months ago" },
  { name: "Harsh Garg", text: "Truly appreciate the professional and caring service of R. G. Consultants, who make everything simple with their expert guidance and experience.", date: "11 months ago" },
  { name: "rishi kohli", text: "Excellent tax consultant – very professional, knowledgeable, and helpful. Made the whole process smooth and stress-free. Highly recommended!", date: "11 months ago" },
];

/* ==========================================================================
   OWNER-EDITABLE CONTENT SOURCE (Google Sheets)
   --------------------------------------------------------------------------
   Leave the two URLs below as empty strings to use the sample data above —
   the site works fine either way. To let the site owner edit Vacancies,
   the Daily Digest, and the Compliance Calendar without touching any
   code, do this once during handoff:

   1. Make a Google Sheet with three tabs, named "Jobs", "Articles", and
      "Compliance".

      JOBS tab — first row must be exactly these column headers:
        title | desc | dept | location | type | experience | responsibilities | requirements
      For "responsibilities" and "requirements", put multiple points in one
      cell separated by a pipe character, e.g.:
        Prepare audit working papers | Liaise with clients | File on time

      ARTICLES tab — first row must be exactly these column headers:
        title | tag | date | readTime | summary | body
      "date" should be in YYYY-MM-DD format (e.g. 2026-09-01). A URL-safe
      slug is generated automatically from the title, so the owner never
      needs to think about slugs.

      COMPLIANCE tab — first row must be exactly these column headers:
        date | tag | title
      "date" is shown as-is (e.g. "20 AUG"), so format it exactly how it
      should appear on the site.

      To remove a job, article, or compliance date, the owner just
      deletes that row. To add one, they add a new row. That's the
      entire workflow going forward.

   2. File → Share → Publish to web → choose a tab → CSV → Publish.
      Copy the link. Repeat for all three tabs.
   3. Paste the three links into JOBS_SHEET_CSV_URL, ARTICLES_SHEET_CSV_URL,
      and COMPLIANCE_SHEET_CSV_URL below.

   Google can take a few minutes to reflect a spreadsheet edit on the
   published CSV link, so changes aren't instant — usually well under 5.
========================================================================== */
const JOBS_SHEET_CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vSRqZIMirTGaHi8DVsvOaCky7NdQ5dyZnx_w8VDh4o5azJUm8l8yXJ7bS_o7kGkNLrMpKx7_hYZKgFY/pub?gid=48957332&single=true&output=csv";
const ARTICLES_SHEET_CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vRTHLgKWOsRFI5QUff4L4T5nG298ot5pNg4V8G4Ic_XSZYONuEVOvuHGIhyReGjSC2K571JRVtxp6Aq/pub?gid=853635124&single=true&output=csv";
const COMPLIANCE_SHEET_CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vS7ConEJIVLBrs6QSw96RVZg8Ihdwf7dLvu98zk0lJRWatwgNdMtpxlsKxYJRqAiSa_Pp2lRrYSCVL-/pub?gid=1983643109&single=true&output=csv";

function parseCSV(text) {
  const rows = [];
  let row = [], field = "", inQuotes = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i], next = text[i + 1];
    if (inQuotes) {
      if (c === '"' && next === '"') { field += '"'; i++; }
      else if (c === '"') { inQuotes = false; }
      else { field += c; }
    } else {
      if (c === '"') inQuotes = true;
      else if (c === ",") { row.push(field); field = ""; }
      else if (c === "\n" || c === "\r") {
        if (c === "\r" && next === "\n") i++;
        row.push(field); field = "";
        if (row.some(v => v !== "")) rows.push(row);
        row = [];
      } else { field += c; }
    }
  }
  if (field !== "" || row.length) { row.push(field); rows.push(row); }
  if (!rows.length) return [];
  const headers = rows[0].map(h => h.trim());
  return rows.slice(1).map(r => {
    const obj = {};
    headers.forEach((h, i) => { obj[h] = (r[i] || "").trim(); });
    return obj;
  });
}

function slugify(title) {
  return title.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function fetchSheetRows(url) {
  if (!url) return Promise.resolve(null);
  return fetch(url)
    .then(res => (res.ok ? res.text() : Promise.reject()))
    .then(csv => parseCSV(csv))
    .catch(() => null);
}

function sheetRowsToJobs(rows) {
  return rows
    .filter(r => r.title)
    .map(r => ({
      title: r.title,
      desc: r.desc || "",
      dept: r.dept || "",
      location: r.location || "",
      type: r.type || "",
      experience: r.experience || "",
      responsibilities: (r.responsibilities || "").split("|").map(s => s.trim()).filter(Boolean),
      requirements: (r.requirements || "").split("|").map(s => s.trim()).filter(Boolean),
    }));
}

function sheetRowsToArticles(rows) {
  return rows
    .filter(r => r.title)
    .map(r => ({
      slug: slugify(r.title),
      tag: r.tag || "",
      date: r.date || "",
      readTime: r.readTime || "",
      title: r.title,
      summary: r.summary || "",
      body: r.body || "",
    }));
}

function sheetRowsToComplianceDates(rows) {
  return rows
    .filter(r => r.date && r.title)
    .map(r => ({
      date: r.date,
      tag: r.tag || "",
      title: r.title,
    }));
}

/* ==========================================================================
   DATA ACCESS LAYER
   Every page calls these functions rather than reading the arrays above
   directly. Jobs and Articles try the connected Google Sheet first (see
   above) and fall back to the sample arrays if no sheet is connected or
   the fetch fails — so the site never breaks even if the sheet link is
   wrong or temporarily unreachable.
========================================================================== */
const RGData = {
  getServices: () => Promise.resolve(services),
  getService: (slug) => Promise.resolve(services.find(s => s.slug === slug) || null),

  getJobs: () => fetchSheetRows(JOBS_SHEET_CSV_URL).then(rows => {
    const fromSheet = rows ? sheetRowsToJobs(rows) : null;
    return fromSheet && fromSheet.length ? fromSheet : jobs;
  }),
  getJob: (index) => RGData.getJobs().then(list => list[index] || null),

  getArticles: () => fetchSheetRows(ARTICLES_SHEET_CSV_URL).then(rows => {
    const fromSheet = rows ? sheetRowsToArticles(rows) : null;
    return fromSheet && fromSheet.length ? fromSheet : articles;
  }),
  getArticle: (slug) => RGData.getArticles().then(list => list.find(a => a.slug === slug) || null),

  getComplianceDates: () => fetchSheetRows(COMPLIANCE_SHEET_CSV_URL).then(rows => {
    const fromSheet = rows ? sheetRowsToComplianceDates(rows) : null;
    return fromSheet && fromSheet.length ? fromSheet : complianceDates;
  }),
  getGalleryImages: () => Promise.resolve(galleryImages),
  getTeam: () => Promise.resolve(teamMembers),
  getReviews: () => Promise.resolve(reviews),
};
