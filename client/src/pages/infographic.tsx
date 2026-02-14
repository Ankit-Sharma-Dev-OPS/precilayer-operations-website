import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  ChevronRight,
  Shield,
  Factory,
  ClipboardCheck,
  Package,
  Truck,
  FileText,
  Wrench,
  Search,
  FlaskConical,
  Cog,
  CheckCircle2,
  AlertTriangle,
  ArrowDown,
  ExternalLink,
  Layers,
  Target,
  BookOpen,
  GitFork,
  GitMerge,
  RotateCcw,
  ArrowRight,
  Users,
  Briefcase,
  HardHat,
  ShieldCheck,
  Cpu,
  Eye,
  ShoppingCart,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const phases = [
  {
    id: 1,
    title: "Order Release & Technical Verification",
    subtitle: "SO verification and project ownership",
    icon: FileText,
    color: "from-blue-500 to-blue-600",
    bgColor: "bg-blue-500/10 dark:bg-blue-500/20",
    borderColor: "border-blue-500/30",
    textColor: "text-blue-600 dark:text-blue-400",
    steps: [
      {
        name: "1.1 - SO Creation & Technical Verification",
        details: [
          "Commercial Engineer creates SO from customer PO and checks revisions",
          "Project Engineer verifies drawings, STEP files, and latest revisions",
          "Project Engineer takes ownership and updates trackers",
        ],
        jobFolder: [
          "Drawing (rev. verified)",
          "STEP file (rev. verified)",
          "Material spec",
          "Surface treatment spec",
          "Special process spec",
          "Quality clauses",
        ],
      },
      {
        name: "1.2 - Compliance Screening",
        critical: true,
        details: ["Prevents catastrophic errors — AS9100 / ISO 13485 compliance gate"],
        classifications: {
          Material: ["Standard", "AMS / ASTM", "DFARS", "Medical (ISO 13485)", "Aerospace (AS9100)", "ITAR controlled"],
          Process: ["Standard machining", "NADCAP required", "Certified special process", "Customer-approved supplier"],
          Inspection: ["Visual", "Dimensional", "CMM", "FAI (AS9102)", "GD&T", "Surface finish"],
          Regulatory: ["AS9100", "ISO 13485", "NADCAP audit", "ITAR screening", "CoC required", "EN 10204 traceability"],
        },
      },
    ],
  },
  {
    id: 2,
    title: "Manufacturing Strategy Definition",
    subtitle: "The most critical technical stage",
    icon: Cog,
    color: "from-indigo-500 to-indigo-600",
    bgColor: "bg-indigo-500/10 dark:bg-indigo-500/20",
    borderColor: "border-indigo-500/30",
    textColor: "text-indigo-600 dark:text-indigo-400",
    critical: true,
    steps: [
      {
        name: "2.1 - Process & Resource Mapping",
        details: [
          "Machines needed (CNC mill, turn, EDM, wirecut, etc.)",
          "In-house vs. outsource per operation",
          "Special tooling / fixture requirements",
        ],
      },
      {
        name: "2.2 - Machining Strategy",
        details: ["Setups, machine selection, datums, workholding, roughing/finishing plan"],
      },
      {
        name: "2.3 - Material & Stock",
        details: [
          "Material form, size, grade defined",
          "Check in-house stock immediately — if unavailable, order now",
        ],
        critical: true,
      },
      {
        name: "2.4 - Outsource Routing",
        details: ["Suppliers, sequence, lead times"],
      },
      {
        name: "2.5 - Inspection Plan",
        details: ["Coordinate with QE — define inspection points between ops"],
      },
      {
        name: "2.6 - CEDD Estimation",
        details: [
          "Estimate total time including outsource lead times",
          "Confirm Customer Expected Delivery Date (CEDD)",
          "Inform commercial team — flag delivery risks early",
        ],
      },
    ],
    gate: "Programming CANNOT begin before release. Stock must be checked or ordered immediately.",
  },
  {
    id: 3,
    title: "Quality Control Plan Creation",
    subtitle: "Formal inspection at each stage",
    icon: ClipboardCheck,
    color: "from-emerald-500 to-emerald-600",
    bgColor: "bg-emerald-500/10 dark:bg-emerald-500/20",
    borderColor: "border-emerald-500/30",
    textColor: "text-emerald-600 dark:text-emerald-400",
    steps: [
      {
        name: "Plan Contents",
        details: [
          "Incoming material inspection requirements",
          "In-process inspection stages",
          "Outsource inspection requirements",
          "Final inspection requirements",
          "Inspection method definition",
        ],
      },
    ],
    inspectionLevels: [
      { level: 1, name: "Visual & Basic Inspection", description: "Visual checks and basic measurements" },
      { level: 2, name: "Standard Dimensional", description: "Calipers, micrometers, gauges" },
      { level: 3, name: "Precision Inspection", description: "Height gauge, bore gauge, etc." },
      { level: 4, name: "CMM Inspection", description: "Coordinate Measuring Machine" },
      { level: 5, name: "Full Inspection", description: "All features inspected" },
    ],
    frequencies: ["First part only", "Every part", "Every setup", "Sample inspection"],
  },
  {
    id: 4,
    title: "Raw Material Procurement & Control",
    subtitle: "Material traceability and verification",
    icon: Package,
    color: "from-amber-500 to-amber-600",
    bgColor: "bg-amber-500/10 dark:bg-amber-500/20",
    borderColor: "border-amber-500/30",
    textColor: "text-amber-600 dark:text-amber-400",
    critical: true,
    skippableWhenOutsourced: true,
    steps: [
      {
        name: "Incoming Verification",
        details: [
          "Verify supplier certification",
          "Verify material grade",
          "Verify heat number",
          "Verify traceability",
        ],
      },
      {
        name: "AMS / DFARS / Aerospace Material",
        details: [
          "Material Test Certificate required",
          "Heat number must match certificate",
          "Traceability must be maintained",
        ],
        critical: true,
      },
    ],
    tagging: ["Job ID", "Material grade", "Heat number", "Traceability ID"],
    gate: "Material CANNOT be issued without traceability tag.",
  },
  {
    id: 5,
    title: "Programming & Production Release",
    subtitle: "Strategy review, numbering, CAM structure & release",
    icon: Layers,
    color: "from-violet-500 to-violet-600",
    bgColor: "bg-violet-500/10 dark:bg-violet-500/20",
    borderColor: "border-violet-500/30",
    textColor: "text-violet-600 dark:text-violet-400",
    skippableWhenOutsourced: true,
    steps: [
      {
        name: "5.1 - Strategy Review First",
        details: [
          "Review and understand the Manufacturing Strategy Sheet fully",
          "Doubts? Discuss with Project Engineer before starting",
        ],
        critical: true,
      },
      {
        name: "5.2 - Job Number Format",
        details: [
          "Must appear on every shop floor drawing",
        ],
      },
      {
        name: "5.3 - CAM Folders & Setup Numbers",
        details: [
          "Programmer adds setup suffix: -1, -2, -3 per setup",
          "Part folders = total mfg parts in order",
          "Each setup folder must have a process sheet inside",
        ],
      },
      {
        name: "5.4 - Program & Release",
        details: [
          "Follow strategy sheet, QC plan, and datums exactly",
          "Simulation mandatory before release",
        ],
      },
    ],
    numberingGuide: {
      format: "123XX2613",
      segments: [
        { part: "123", label: "Serial" },
        { part: "XX", label: "Account" },
        { part: "26", label: "Year" },
        { part: "1", label: "Month" },
        { part: "3", label: "Day" },
      ],
      partExample: "123XX2613-88",
      partLabel: "MPS Series",
      setupExample: "123XX2613-88-2",
      setupLabel: "Setup 2",
    },
    folderStructure: {
      project: "123XX2613",
      parts: [
        {
          folder: "123XX2613-88 - DWG-001 - Bracket",
          setups: ["Setup 1", "Setup 2", "Setup 3"],
        },
        {
          folder: "123XX2613-89 - DWG-002 - Housing",
          setups: ["Setup 1", "Setup 2"],
        },
      ],
    },
    processSheet: {
      description: "Every setup folder must contain a Process Sheet",
      importance: "The process sheet is the single source of truth on the shop floor. Without it, the operator has no verified reference for what to run.",
      contains: ["Program names & numbers", "Tool list & offsets", "Work coordinate system", "Fixturing instructions", "Key dimensions to check"],
    },
    gate: "No programming without strategy review. Deviations need PE / PM approval.",
  },
  {
    id: 6,
    title: "Machine Setup & First Execution",
    subtitle: "Setup verification and first part approval",
    icon: Wrench,
    color: "from-rose-500 to-rose-600",
    bgColor: "bg-rose-500/10 dark:bg-rose-500/20",
    borderColor: "border-rose-500/30",
    textColor: "text-rose-600 dark:text-rose-400",
    skippableWhenOutsourced: true,
    steps: [
      {
        name: "Setup Checklist",
        details: [
          "Correct material used",
          "Correct program used",
          "Correct fixture used",
          "Correct tools used",
        ],
      },
      {
        name: "First Part Verification",
        details: [
          "Quality Engineer performs verification",
          "Method defined in Quality Control Plan",
          "Standard / Precision / CMM inspection",
        ],
        critical: true,
      },
    ],
    gate: "Production CANNOT continue without first part approval.",
  },
  {
    id: 7,
    title: "Production Machining & In-Process QC",
    subtitle: "Continuous quality monitoring",
    icon: Factory,
    color: "from-cyan-500 to-cyan-600",
    bgColor: "bg-cyan-500/10 dark:bg-cyan-500/20",
    borderColor: "border-cyan-500/30",
    textColor: "text-cyan-600 dark:text-cyan-400",
    skippableWhenOutsourced: true,
    steps: [
      {
        name: "Production Controls",
        details: [
          "Inspection frequency follows Quality Control Plan",
          "Operator performs in-process inspection",
          "Quality Engineer performs periodic verification",
          "Inspection recorded in inspection log",
          "Non-conforming parts immediately segregated",
        ],
      },
    ],
    gate: "Production continues only if compliant.",
  },
  {
    id: 8,
    title: "Outsourced Process Control",
    subtitle: "Two models: partial outsource (process-level) and full outsource (complete job)",
    icon: ExternalLink,
    color: "from-orange-500 to-orange-600",
    bgColor: "bg-orange-500/10 dark:bg-orange-500/20",
    borderColor: "border-orange-500/30",
    textColor: "text-orange-600 dark:text-orange-400",
    critical: true,
    steps: [],
    outsourceModels: [
      {
        type: "partial",
        title: "Model A: Partial Outsource",
        description: "Specific processes sent to supplier while job remains in-house",
        steps: [
          {
            name: "Before Sending to Supplier",
            details: [
              "Quality Engineer performs outgoing inspection",
              "Outgoing inspection report created",
              "Part count verified",
              "Stores logs movement to supplier",
            ],
          },
          {
            name: "Upon Return from Supplier",
            details: [
              "Incoming inspection mandatory",
              "Certification validity verified (CoC, MTC, NADCAP cert as applicable)",
              "Part count verified",
              "Part condition checked",
              "Critical dimensions verified if affected by process",
            ],
            critical: true,
          },
        ],
        examples: ["Heat treatment", "Anodizing", "NADCAP coating", "Plating", "Wirecut / EDM"],
      },
      {
        type: "full",
        title: "Model B: Full Outsource",
        description: "Entire job outsourced to one or more suppliers — phases 4-7 skipped",
        steps: [
          {
            name: "B1 - QCP Validation & Approval",
            details: [
              "Quality Control Plan must be validated for outsource scope",
              "QCP approved by Quality Engineering before order placement",
              "QCP must cover: incoming material, in-process, final inspection requirements",
            ],
            critical: true,
          },
          {
            name: "B2 - Supplier Notification & Order Placement",
            details: [
              "Project Engineer (not commercial team) places order with supplier",
              "Supplier receives: QCP, latest revision drawings, special requirements",
              "All necessary actions communicated clearly to supplier",
              "Confirm supplier acknowledgment of all requirements",
            ],
          },
          {
            name: "B3 - Receiving & Incoming Inspection",
            details: [
              "Full incoming inspection per QCP",
              "All certifications collected and verified",
              "Part count, condition, dimensions checked",
              "QE sign-off required before acceptance",
            ],
            critical: true,
          },
        ],
        examples: ["Complete machined assemblies", "Fabrication sub-assemblies", "Specialized processes (casting, forging)"],
      },
    ],
    certifications: [
      { name: "Certificate of Conformance (CoC)", required: "Always", description: "Supplier declares parts meet all requirements" },
      { name: "Material Test Certificate (MTC)", required: "When material supplied", description: "Chemical & mechanical properties verification" },
      { name: "NADCAP Certificate", required: "Special processes", description: "Heat treat, plating, NDT, welding per NADCAP" },
      { name: "First Article Inspection (FAI)", required: "New parts / new suppliers", description: "AS9102 compliant dimensional report" },
      { name: "Process Certificate", required: "As specified", description: "Hardness, conductivity, coating thickness reports" },
    ],
    qeSignoff: {
      title: "Quality Engineering Sign-Off Required",
      description: "No outsourced parts may enter production or be shipped without QE/QC formal sign-off",
      checkpoints: [
        "All required certifications collected and valid",
        "Incoming inspection report completed and passed",
        "Traceability maintained through outsource cycle",
        "Non-conformances documented and dispositioned",
      ],
    },
    gate: "Parts CANNOT return to production or ship without QE/QC sign-off. Traceability must remain intact.",
  },
  {
    id: 9,
    title: "Final Inspection",
    subtitle: "Complete quality verification",
    icon: Search,
    color: "from-teal-500 to-teal-600",
    bgColor: "bg-teal-500/10 dark:bg-teal-500/20",
    borderColor: "border-teal-500/30",
    textColor: "text-teal-600 dark:text-teal-400",
    critical: true,
    steps: [
      {
        name: "Final Inspection Process",
        details: [
          "Quality Engineer performs final inspection",
          "Inspection level based on Quality Control Plan",
          "Standard / Precision / CMM / Full inspection",
          "Inspection report generated",
          "Parts approved or rejected",
          "Rejected parts segregated and documented",
        ],
      },
    ],
  },
  {
    id: 10,
    title: "Documentation & Traceability",
    subtitle: "Complete record compilation",
    icon: FileText,
    color: "from-sky-500 to-sky-600",
    bgColor: "bg-sky-500/10 dark:bg-sky-500/20",
    borderColor: "border-sky-500/30",
    textColor: "text-sky-600 dark:text-sky-400",
    steps: [
      {
        name: "Final Job Record",
        details: [
          "Material certificate",
          "Supplier certificates",
          "Inspection reports",
          "Final inspection report",
          "Traceability records",
        ],
      },
    ],
    note: "This ensures aerospace and medical readiness.",
  },
  {
    id: 11,
    title: "Packaging & Dispatch",
    subtitle: "Final release and shipment",
    icon: Truck,
    color: "from-green-500 to-green-600",
    bgColor: "bg-green-500/10 dark:bg-green-500/20",
    borderColor: "border-green-500/30",
    textColor: "text-green-600 dark:text-green-400",
    steps: [
      {
        name: "Packaging & Shipping",
        details: [
          "Parts cleaned",
          "Protected against corrosion, damage, contamination",
          "Proper packaging applied",
          "Quality Engineer performs final release",
          "Dispatch ships parts",
          "Tracking recorded",
        ],
      },
    ],
  },
];

const criticalControlPoints = [
  { name: "Material Traceability", icon: Package, description: "Every material must have verified heat numbers, certifications, and internal traceability IDs before use." },
  { name: "Manufacturing Strategy Definition", icon: Cog, description: "Complete machining strategy, datum definition, and workholding plan must be approved before programming begins." },
  { name: "Quality Control Plan Definition", icon: ClipboardCheck, description: "Formal inspection requirements for every stage must be defined with inspection levels and frequencies." },
  { name: "Outsource Incoming Inspection", icon: ExternalLink, description: "All parts returning from suppliers must pass incoming QC with certification verification before re-entering production." },
  { name: "Final Inspection Approval", icon: CheckCircle2, description: "Complete final inspection per Quality Control Plan must be passed before parts can be released for dispatch." },
];

const inspectionMatrix = [
  { condition: "Standard tolerance parts", method: "Standard inspection sufficient", level: 2 },
  { condition: "Tight tolerance (< 0.02 mm)", method: "Precision inspection required", level: 3 },
  { condition: "Complex geometry / GD&T", method: "CMM inspection required", level: 4 },
  { condition: "Aerospace / Medical / DFARS / AMS", method: "Certification verification + Enhanced inspection", level: 5 },
];

const roles = [
  { id: "pm", title: "Production Manager", shortTitle: "PM", icon: Factory, color: "bg-cyan-500", textColor: "text-cyan-600 dark:text-cyan-400", tier: "management", description: "Oversees entire production floor operations, resource allocation, and schedule adherence. Ensures production capacity meets delivery commitments.", responsibilities: ["Production scheduling and prioritization", "Resource and machine allocation", "Production bottleneck resolution", "Delivery schedule adherence", "Deviation approval alongside PE"], phases: [2, 5, 6, 7] },
  { id: "pjm", title: "Project Manager", shortTitle: "PJM", icon: Target, color: "bg-violet-500", textColor: "text-violet-600 dark:text-violet-400", tier: "management", description: "Coordinates cross-functional activities, tracks milestones, and manages project timeline. Bridge between commercial, engineering, and production teams.", responsibilities: ["Project timeline and milestone tracking", "Cross-functional coordination", "Risk identification and mitigation", "Stakeholder communication", "Resource conflict resolution"], phases: [1, 2, 8, 10, 11] },
  { id: "pe", title: "Project Engineer", shortTitle: "PE", icon: Cog, color: "bg-indigo-500", textColor: "text-indigo-600 dark:text-indigo-400", tier: "engineering", description: "Technical owner of the job from strategy through delivery. Defines manufacturing approach, owns the Manufacturing Strategy Sheet, and coordinates between programming, production, and quality.", responsibilities: ["Manufacturing Strategy Sheet ownership", "Process planning and datum definition", "Technical liaison between customer requirements and shop floor", "Full outsource order placement (not commercial team)", "CEDD estimation and delivery risk flagging"], phases: [1, 2, 3, 5, 8] },
  { id: "prog", title: "Programmer", shortTitle: "PROG", icon: Cpu, color: "bg-violet-600", textColor: "text-violet-700 dark:text-violet-300", tier: "engineering", description: "Creates CNC programs following the Manufacturing Strategy Sheet. Owns job numbering, CAM folder structure, setup sequencing, and process sheet creation.", responsibilities: ["Strategy Sheet review before programming", "Job numbering and CAM folder structure", "CNC program creation and simulation", "Process sheet creation per setup", "Program release to production"], phases: [5] },
  { id: "qe", title: "Quality Engineer / QA-QC", shortTitle: "QE", icon: ShieldCheck, color: "bg-emerald-500", textColor: "text-emerald-600 dark:text-emerald-400", tier: "quality", description: "Owns the Quality Control Plan and all inspection activities. Signs off on first parts, outsource returns, and final release. No part moves without QE approval at critical gates.", responsibilities: ["Quality Control Plan creation and ownership", "First Part Verification and approval", "In-process and final inspection", "Outsource incoming/outgoing inspection", "QE sign-off on certifications and compliance", "Non-conformance documentation and disposition"], phases: [3, 6, 7, 8, 9, 10] },
  { id: "sqe", title: "Supplier Quality Engineer", shortTitle: "SQE", icon: ExternalLink, color: "bg-orange-500", textColor: "text-orange-600 dark:text-orange-400", tier: "quality", description: "Manages supplier quality performance for outsourced processes. Validates supplier capabilities, audits certifications, and ensures incoming parts meet specifications.", responsibilities: ["Supplier qualification and audit", "QCP validation for outsourced work", "Supplier certification verification", "Incoming inspection coordination", "Supplier corrective action management"], phases: [8] },
  { id: "ss", title: "Shift Supervisor", shortTitle: "SS", icon: Eye, color: "bg-rose-500", textColor: "text-rose-600 dark:text-rose-400", tier: "operations", description: "Manages day-to-day shop floor execution. Ensures operators follow process sheets, monitors production progress, and escalates issues to Production Manager.", responsibilities: ["Shop floor execution oversight", "Operator task assignment", "Process sheet compliance monitoring", "Issue escalation to Production Manager", "Shift handover and status reporting"], phases: [6, 7] },
  { id: "op", title: "Shift Operator", shortTitle: "OP", icon: HardHat, color: "bg-amber-500", textColor: "text-amber-600 dark:text-amber-400", tier: "operations", description: "Executes machining operations on the shop floor. Follows process sheets, performs in-process self-checks, and reports non-conformances immediately.", responsibilities: ["Machine setup per process sheet", "CNC program execution", "In-process self-inspection", "Non-conformance reporting", "Workspace and tool maintenance"], phases: [6, 7] },
  { id: "plc", title: "Packaging & Logistics Coordinator", shortTitle: "PLC", icon: Package, color: "bg-green-500", textColor: "text-green-600 dark:text-green-400", tier: "operations", description: "Handles final packaging, corrosion protection, labeling, and dispatch logistics. Ensures parts are properly protected and shipped with correct documentation.", responsibilities: ["Parts cleaning and preparation", "Corrosion and contamination protection", "Proper packaging and labeling", "Dispatch coordination and tracking", "Shipping documentation"], phases: [11] },
  { id: "ce", title: "Sales & Techno-Commercial Engineer", shortTitle: "CE", icon: Briefcase, color: "bg-blue-500", textColor: "text-blue-600 dark:text-blue-400", tier: "commercial", description: "Creates the Sales Order, handles customer communication, and manages commercial aspects. First point of contact for order intake but does NOT place outsource orders.", responsibilities: ["Sales Order creation and verification", "Customer PO review and acknowledgment", "Commercial documentation and pricing", "Customer communication on delivery dates", "Escalation of delivery risks from PE"], phases: [1] },
  { id: "proc", title: "Procurement Specialist", shortTitle: "PROC", icon: ShoppingCart, color: "bg-amber-600", textColor: "text-amber-700 dark:text-amber-300", tier: "commercial", description: "Manages raw material procurement, supplier sourcing, and purchase order management. Ensures materials meet specifications and are delivered on time.", responsibilities: ["Raw material sourcing and ordering", "Supplier evaluation for materials", "Purchase order management", "Material delivery tracking", "Material certification collection"], phases: [4] },
];

const tierLabels: Record<string, { label: string; order: number }> = {
  management: { label: "Management", order: 1 },
  engineering: { label: "Engineering", order: 2 },
  quality: { label: "Quality", order: 3 },
  operations: { label: "Operations", order: 4 },
  commercial: { label: "Commercial", order: 5 },
};

const roleQuizzes: Record<string, Array<{ question: string; options: string[]; correct: number; explanation: string }>> = {
  pe: [
    { question: "What must be completed and released before programming can begin?", options: ["Customer PO", "Manufacturing Strategy Sheet", "Raw material order", "Quality Control Plan only"], correct: 1, explanation: "The Manufacturing Strategy Sheet must be fully completed and released by the Project Engineer before programming starts." },
    { question: "In a full outsource model, who is responsible for placing the order with the supplier?", options: ["Commercial Engineer", "Quality Engineer", "Project Engineer", "Procurement Specialist"], correct: 2, explanation: "In full outsource (Model B), the Project Engineer places the order — not the commercial team. The PE ensures the supplier receives QCP, latest rev drawings, and all requirements." },
    { question: "What must the Project Engineer provide with the CEDD estimation?", options: ["Only the delivery date", "Total time including outsource lead times and delivery risks", "Just the machining hours", "Customer's requested date only"], correct: 1, explanation: "PE must estimate total time including outsource lead times, confirm CEDD, and inform the commercial team about any delivery risks early." },
    { question: "What is the PE's role in deviation management?", options: ["PEs cannot approve deviations", "PE approval is needed alongside PM for programming deviations", "Only QE can approve deviations", "Deviations are not allowed"], correct: 1, explanation: "No programming deviation is allowed without PE and PM approval. The PE is the technical authority for the job." },
  ],
  ce: [
    { question: "What is the first step when a customer PO is received?", options: ["Send to production immediately", "Create Sales Order and verify PO details", "Order raw material", "Start programming"], correct: 1, explanation: "The Commercial Engineer creates the Sales Order and verifies all PO details before anything else happens." },
    { question: "Can the Commercial Engineer place outsource orders with suppliers?", options: ["Yes, always", "Yes, for partial outsource only", "No — this is the Project Engineer's responsibility", "Only with QE approval"], correct: 2, explanation: "In the full outsource model, order placement is the Project Engineer's responsibility, not the commercial team's." },
    { question: "What should the CE do when PE flags a delivery risk?", options: ["Ignore it and commit to the original date", "Communicate the risk to the customer proactively", "Ask production to work overtime", "Change the order quantity"], correct: 1, explanation: "The CE must communicate delivery risks flagged by the PE to the customer proactively and manage expectations." },
  ],
  qe: [
    { question: "Which inspection level requires a Coordinate Measuring Machine?", options: ["Level 2 - Standard Dimensional", "Level 3 - Precision", "Level 4 - CMM Inspection", "Level 5 - Full Inspection"], correct: 2, explanation: "Level 4 specifically requires a CMM for precise geometric and GD&T measurements." },
    { question: "When can production continue after the first part is machined?", options: ["Immediately", "After operator self-inspection", "Only after QE First Part Verification and approval", "After programmer review"], correct: 2, explanation: "Production CANNOT continue without QE first part approval. The verification method is defined in the QCP." },
    { question: "What certifications must be verified when parts return from an outsourced process?", options: ["No certifications needed", "Only CoC", "CoC, MTC, NADCAP cert as applicable — all must be valid", "Just a delivery note"], correct: 2, explanation: "QE must verify all applicable certifications (CoC, MTC, NADCAP) before parts re-enter production. No shortcuts." },
    { question: "What must the QE do before outsourced parts can ship to the customer?", options: ["Nothing — supplier QC is sufficient", "Formal QE/QC sign-off with all certifications and inspection reports", "Just count the parts", "Only visual inspection"], correct: 1, explanation: "No outsourced parts may enter production or ship without formal QE/QC sign-off covering certifications, inspection, traceability, and non-conformance disposition." },
    { question: "What must the Quality Control Plan include for outsourced work?", options: ["Only final inspection", "Incoming material, in-process, and final inspection requirements", "Just supplier name", "Only part count verification"], correct: 1, explanation: "The QCP must cover incoming material inspection, in-process requirements, and final inspection requirements for outsourced scope." },
  ],
  plc: [
    { question: "What must happen before parts can be packaged for dispatch?", options: ["Nothing — package immediately", "Parts must be cleaned and protected against corrosion, damage, and contamination", "Only counting is needed", "Just wrap in paper"], correct: 1, explanation: "Parts must be cleaned and protected against corrosion, damage, and contamination before proper packaging is applied." },
    { question: "Who performs the final release before dispatch?", options: ["The operator", "The shift supervisor", "The Quality Engineer", "The customer"], correct: 2, explanation: "The Quality Engineer performs the final release check before dispatch. Parts cannot ship without QE release." },
    { question: "What must be recorded when parts are shipped?", options: ["Nothing", "Tracking information and shipping documentation", "Only the customer name", "Just the weight"], correct: 1, explanation: "Tracking must be recorded and proper shipping documentation provided to maintain full traceability." },
  ],
  pm: [
    { question: "When does the Production Manager get involved in the manufacturing flow?", options: ["Only at dispatch", "From strategy definition through production execution", "Only during machining", "Only for outsourced jobs"], correct: 1, explanation: "The PM is involved from manufacturing strategy (resource planning) through programming, setup, and production execution." },
    { question: "What is the PM's role when a deviation from the strategy sheet is needed?", options: ["PM has no say in deviations", "PM approval required alongside PE for programming deviations", "PM can approve alone", "Deviations go straight to the customer"], correct: 1, explanation: "Programming deviations need both PE and PM approval to ensure production feasibility and schedule impact are considered." },
    { question: "What should the PM prioritize when there's a production bottleneck?", options: ["Skip quality checks to save time", "Resource reallocation and schedule adjustment while maintaining quality gates", "Cancel the order", "Only inform the customer"], correct: 1, explanation: "The PM must resolve bottlenecks through resource and machine allocation while ensuring all quality gates are maintained." },
  ],
  pjm: [
    { question: "What phases does the Project Manager coordinate across?", options: ["Only production phases", "Order intake, strategy, outsource management, documentation, and dispatch", "Only outsource phases", "Only quality phases"], correct: 1, explanation: "The PJM coordinates across order intake (Phase 1), strategy (Phase 2), outsource (Phase 8), documentation (Phase 10), and dispatch (Phase 11)." },
    { question: "What should the PJM do when the PE identifies a delivery risk?", options: ["Ignore it", "Track it as a risk, coordinate mitigation, and communicate to stakeholders", "Cancel the project", "Only tell the customer"], correct: 1, explanation: "The PJM must identify risks, coordinate mitigation plans with PE/PM, and communicate status to all stakeholders." },
    { question: "How does the PJM handle resource conflicts between projects?", options: ["First come first served", "Coordinate with PM to resolve conflicts based on priority and deadlines", "Let operators decide", "Always prioritize the newest order"], correct: 1, explanation: "The PJM works with the Production Manager to resolve resource conflicts based on project priority, deadlines, and customer commitments." },
  ],
  prog: [
    { question: "What must be reviewed before starting any programming work?", options: ["Only the customer drawing", "The Manufacturing Strategy Sheet — in full", "Just the material type", "Only the tolerances"], correct: 1, explanation: "The programmer must review and understand the Manufacturing Strategy Sheet fully before starting. Doubts must be discussed with the PE first." },
    { question: "What is the correct job numbering format?", options: ["Any format chosen by the programmer", "123XX2613 (Serial-Account-Year-Month-Day)", "Customer PO number", "Sequential numbers only"], correct: 1, explanation: "Job numbering follows the format 123XX2613 where 123=Serial, XX=Account, 26=Year, 1=Month, 3=Day. This must appear on every shop floor drawing." },
    { question: "What must every setup folder contain?", options: ["Only the CNC program", "A Process Sheet with program names, tool list, WCS, fixturing, and key dimensions", "Just a screenshot", "Nothing — the program is enough"], correct: 1, explanation: "Every setup folder must contain a Process Sheet. It is the single source of truth on the shop floor — without it, the operator has no verified reference." },
    { question: "What is mandatory before releasing a program to production?", options: ["Nothing — just save and release", "Simulation must be completed", "Only a visual check of toolpaths", "Ask the operator to test it"], correct: 1, explanation: "Simulation is mandatory before release. The programmer must follow strategy sheet, QC plan, and datums exactly." },
  ],
  ss: [
    { question: "What is the Shift Supervisor's primary responsibility?", options: ["Programming CNC machines", "Ensuring operators follow process sheets and monitoring progress", "Placing material orders", "Customer communication"], correct: 1, explanation: "The SS ensures operators follow process sheets, monitors progress, and escalates issues to the Production Manager." },
    { question: "When should a Shift Supervisor escalate an issue?", options: ["Never", "When a machine breaks, non-conformance found, or production deviates from plan", "Only at end of shift", "Only for outsourced parts"], correct: 1, explanation: "Issues like machine failures, non-conformances, or schedule deviations must be escalated immediately to the PM." },
    { question: "What must be included in a shift handover?", options: ["Nothing", "Current job status, any issues, pending QC approvals, and machine status", "Just the number of parts made", "Only problems"], correct: 1, explanation: "A complete shift handover must cover current job status, any issues encountered, pending QC approvals, and machine status." },
  ],
  op: [
    { question: "What document must the operator follow during machining?", options: ["The customer drawing only", "The Process Sheet from the setup folder", "Memory from previous jobs", "Verbal instructions from the programmer"], correct: 1, explanation: "The operator must follow the Process Sheet. It contains program names, tool list, WCS, fixturing instructions, and key dimensions." },
    { question: "What must the operator do with a non-conforming part?", options: ["Continue production and sort later", "Immediately segregate the part and report to supervisor", "Fix it themselves", "Put it back in the batch"], correct: 1, explanation: "Non-conforming parts must be immediately segregated and reported. They cannot remain in the production batch." },
    { question: "What setup checks must the operator verify before starting?", options: ["Only the program number", "Correct material, program, fixture, and tools — all four", "Just the fixture", "Only the material"], correct: 1, explanation: "The setup checklist requires verification of correct material, correct program, correct fixture, and correct tools before starting." },
    { question: "When must the operator perform in-process self-inspection?", options: ["Never — that's QE's job", "As defined by the inspection frequency in the Quality Control Plan", "Only on the last part", "Only when supervisor asks"], correct: 1, explanation: "Operators perform in-process inspection at the frequency defined in the QCP (first part, every part, every setup, or sample)." },
  ],
  sqe: [
    { question: "What must the SQE validate before a full outsource order is placed?", options: ["Nothing — just send the drawings", "QCP must be validated and approved for the outsource scope", "Only the supplier's price", "Just the delivery date"], correct: 1, explanation: "The QCP must be validated by Quality Engineering for outsource scope before any order is placed with the supplier." },
    { question: "What certifications must the SQE verify on incoming outsourced parts?", options: ["None needed", "CoC, MTC, NADCAP certificate, FAI, and process certificates as applicable", "Only supplier invoice", "Just a delivery note"], correct: 1, explanation: "The SQE must verify all applicable certifications: CoC (always), MTC (material), NADCAP (special processes), FAI (new parts/suppliers), and process certificates." },
    { question: "What should the SQE do when a supplier's certification is invalid or expired?", options: ["Accept the parts anyway", "Reject the parts and initiate supplier corrective action", "Just make a note for next time", "Ask the customer to accept"], correct: 1, explanation: "Invalid or expired certifications mean parts cannot be accepted. The SQE must reject and initiate supplier corrective action." },
    { question: "For NADCAP-certified processes, what must the SQE confirm?", options: ["Only that the supplier exists", "Supplier's NADCAP certification is current and covers the specific process scope", "Just the price is competitive", "Only delivery time"], correct: 1, explanation: "The SQE must confirm the supplier's NADCAP certification is current and specifically covers the process being outsourced." },
  ],
  proc: [
    { question: "What must be verified before accepting incoming raw material?", options: ["Only the quantity", "Supplier certification, material grade, heat number, and traceability", "Just the delivery note", "Only the price"], correct: 1, explanation: "Incoming material requires verification of supplier certification, material grade, heat number, and traceability before acceptance." },
    { question: "For DFARS-compliant materials, what document is mandatory?", options: ["Customer PO only", "Material Test Certificate with matching heat number", "Supplier invoice", "Operator sign-off"], correct: 1, explanation: "AMS/DFARS/aerospace materials require a Material Test Certificate and the heat number must match the certificate." },
    { question: "What must material be tagged with before it can be issued to production?", options: ["Only the Job ID", "Job ID, material grade, heat number, and traceability ID", "Just the customer name", "Only the PO number"], correct: 1, explanation: "Material cannot be issued without a complete traceability tag: Job ID, material grade, heat number, and traceability ID." },
  ],
};

function PhaseCard({ phase, index, isExpanded, onToggle }: { phase: typeof phases[0]; index: number; isExpanded: boolean; onToggle: () => void }) {
  const Icon = phase.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
    >
      <Card
        className={`overflow-visible cursor-pointer transition-all duration-300 ${isExpanded ? "ring-2 ring-primary/30" : ""}`}
        onClick={onToggle}
        onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onToggle(); } }}
        role="button"
        tabIndex={0}
        aria-expanded={isExpanded}
        data-testid={`phase-card-${phase.id}`}
      >
        <CardContent className="p-0">
          <div className="flex items-center gap-4 p-4">
            <div className={`relative flex-shrink-0 w-12 h-12 rounded-md bg-gradient-to-br ${phase.color} flex items-center justify-center`}>
              <Icon className="w-6 h-6 text-white" />
              <span className="absolute -top-2 -left-2 w-6 h-6 rounded-full bg-foreground text-background text-xs font-bold flex items-center justify-center">
                {phase.id}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="font-semibold text-sm leading-tight">{phase.title}</h3>
                {phase.critical && (
                  <Badge variant="destructive" className="text-[10px] px-1.5 py-0">
                    CRITICAL
                  </Badge>
                )}
                {"skippableWhenOutsourced" in phase && phase.skippableWhenOutsourced && (
                  <Badge variant="outline" className="text-[10px] px-1.5 py-0 border-orange-400/50 text-orange-500">
                    SKIP IF FULLY OUTSOURCED
                  </Badge>
                )}
                {roles.filter(r => r.phases.includes(phase.id)).map(role => (
                  <Badge key={role.id} variant="outline" className={`text-[8px] px-1 py-0 ${role.textColor}`} data-testid={`role-badge-${role.id}-phase-${phase.id}`}>
                    {role.shortTitle}
                  </Badge>
                ))}
              </div>
              <p className="text-xs text-muted-foreground mt-0.5">{phase.subtitle}</p>
            </div>
            <motion.div
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.2 }}
              className="flex-shrink-0"
            >
              <ChevronDown className="w-5 h-5 text-muted-foreground" />
            </motion.div>
          </div>

          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="px-4 pb-4 space-y-3 border-t pt-3">
                  {phase.steps.map((step, si) => (
                    <div key={si} className={`rounded-md p-3 ${phase.bgColor}`}>
                      <div className="flex items-center gap-2 mb-2">
                        <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-br ${phase.color}`} />
                        <h4 className={`font-medium text-xs ${phase.textColor}`}>{step.name}</h4>
                        {"critical" in step && step.critical && (
                          <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
                        )}
                      </div>
                      <ul className="space-y-1 ml-4">
                        {step.details.map((d, di) => (
                          <li key={di} className="text-xs text-muted-foreground flex items-start gap-1.5">
                            <ChevronRight className="w-3 h-3 mt-0.5 flex-shrink-0 text-muted-foreground/50" />
                            {d}
                          </li>
                        ))}
                      </ul>
                      {"jobFolder" in step && step.jobFolder && (
                        <div className="mt-2 p-2 rounded bg-background/50 dark:bg-background/30">
                          <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-1">Job Folder Must Contain</p>
                          <div className="flex flex-wrap gap-1">
                            {step.jobFolder.map((item, i) => (
                              <Badge key={i} variant="secondary" className="text-[10px]">{item}</Badge>
                            ))}
                          </div>
                        </div>
                      )}
                      {"responsibilities" in step && step.responsibilities && (
                        <div className="mt-2 space-y-1.5">
                          {Object.entries(step.responsibilities as Record<string, string[]>).map(([role, tasks]) => (
                            <div key={role} className="p-2 rounded bg-background/50 dark:bg-background/30">
                              <p className="text-[10px] font-semibold text-muted-foreground">{role}</p>
                              <ul className="mt-0.5">
                                {tasks.map((t: string, ti: number) => (
                                  <li key={ti} className="text-[10px] text-muted-foreground/80 flex items-center gap-1">
                                    <CheckCircle2 className="w-2.5 h-2.5 text-emerald-500" />
                                    {t}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      )}
                      {"classifications" in step && step.classifications && (
                        <div className="mt-2 grid grid-cols-2 sm:grid-cols-4 gap-2">
                          {Object.entries(step.classifications).map(([cat, items]) => (
                            <div key={cat} className="p-2 rounded bg-background/50 dark:bg-background/30">
                              <p className="text-[10px] font-semibold text-muted-foreground mb-1">{cat} Classification</p>
                              <ul className="space-y-0.5">
                                {items.map((item, i) => (
                                  <li key={i} className="text-[10px] text-muted-foreground/80 flex items-center gap-1">
                                    <div className="w-1 h-1 rounded-full bg-muted-foreground/40" />
                                    {item}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}

                  {"inspectionLevels" in phase && phase.inspectionLevels && (
                    <div className="rounded-md p-3 bg-emerald-500/5 dark:bg-emerald-500/10 border border-emerald-500/20">
                      <h4 className="font-medium text-xs text-emerald-600 dark:text-emerald-400 mb-2">Inspection Method Classification</h4>
                      <div className="space-y-1.5">
                        {phase.inspectionLevels.map((il) => (
                          <div key={il.level} className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center text-[10px] font-bold text-emerald-600 dark:text-emerald-400 flex-shrink-0">
                              {il.level}
                            </div>
                            <div className="flex-1 min-w-0">
                              <span className="text-xs font-medium">{il.name}</span>
                              <span className="text-[10px] text-muted-foreground ml-1.5">{il.description}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {"numberingGuide" in phase && phase.numberingGuide && (
                    <div className="rounded-md p-3 bg-violet-500/5 dark:bg-violet-500/10 border border-violet-500/20" data-testid="numbering-guide">
                      <h4 className="font-medium text-xs text-violet-600 dark:text-violet-400 mb-2">Job Number Breakdown</h4>
                      <div className="flex items-end gap-0.5 justify-center mb-2">
                        {phase.numberingGuide.segments.map((seg, si) => (
                          <div key={si} className="flex flex-col items-center">
                            <span className="text-[8px] text-muted-foreground mb-0.5">{seg.label}</span>
                            <span className="font-mono text-sm font-bold bg-violet-500/15 dark:bg-violet-500/25 px-1.5 py-0.5 rounded text-violet-700 dark:text-violet-300">{seg.part}</span>
                          </div>
                        ))}
                      </div>
                      <div className="flex items-center justify-center gap-3 text-[10px]">
                        <div className="flex items-center gap-1">
                          <span className="font-mono font-semibold text-foreground">{phase.numberingGuide.partExample}</span>
                          <Badge variant="outline" className="text-[8px] px-1 py-0">{phase.numberingGuide.partLabel}</Badge>
                        </div>
                        <ArrowRight className="w-3 h-3 text-muted-foreground/50" />
                        <div className="flex items-center gap-1">
                          <span className="font-mono font-semibold text-foreground">{phase.numberingGuide.setupExample}</span>
                          <Badge variant="outline" className="text-[8px] px-1 py-0">{phase.numberingGuide.setupLabel}</Badge>
                        </div>
                      </div>
                    </div>
                  )}

                  {"folderStructure" in phase && phase.folderStructure && (
                    <div className="rounded-md p-3 bg-violet-500/5 dark:bg-violet-500/10 border border-violet-500/20" data-testid="folder-structure">
                      <h4 className="font-medium text-xs text-violet-600 dark:text-violet-400 mb-3 flex items-center gap-1.5">
                        <Layers className="w-3.5 h-3.5" />
                        CAM Folder Structure
                      </h4>

                      <div className="space-y-2.5">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-md bg-violet-500/20 flex items-center justify-center flex-shrink-0">
                            <Layers className="w-4 h-4 text-violet-600 dark:text-violet-400" />
                          </div>
                          <span className="font-mono text-xs font-semibold text-violet-600 dark:text-violet-400">
                            {phase.folderStructure.project}/
                          </span>
                          <span className="text-[9px] text-muted-foreground">Project folder</span>
                        </div>

                        {phase.folderStructure.parts.map((part, pi) => (
                          <div key={pi} className="ml-6 p-2.5 rounded-md bg-background/60 dark:bg-background/30 border border-violet-500/10">
                            <div className="flex items-center gap-2 mb-1.5">
                              <FileText className="w-3.5 h-3.5 text-violet-500 flex-shrink-0" />
                              <span className="font-mono text-[11px] font-medium">{part.folder}</span>
                            </div>
                            <div className="ml-5 flex flex-wrap gap-1.5">
                              {part.setups.map((setup, si) => (
                                <Badge key={si} variant="outline" className="text-[9px] font-mono px-1.5 py-0.5">
                                  {setup}
                                </Badge>
                              ))}
                              <Badge variant="secondary" className="text-[9px] px-1.5 py-0.5">
                                + Process Sheet
                              </Badge>
                            </div>
                          </div>
                        ))}
                      </div>

                      <p className="text-[9px] text-muted-foreground mt-2.5 italic">
                        Total part folders must equal total manufacturing parts in the order
                      </p>
                    </div>
                  )}

                  {"processSheet" in phase && phase.processSheet && (
                    <div className="rounded-md p-3 bg-amber-500/5 dark:bg-amber-500/10 border border-amber-500/20" data-testid="process-sheet-info">
                      <h4 className="font-medium text-xs text-amber-600 dark:text-amber-400 mb-1.5 flex items-center gap-1.5">
                        <ClipboardCheck className="w-3.5 h-3.5" />
                        {phase.processSheet.description}
                      </h4>
                      <p className="text-[10px] text-muted-foreground mb-2">
                        {phase.processSheet.importance}
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {phase.processSheet.contains.map((item: string, ci: number) => (
                          <Badge key={ci} variant="outline" className="text-[9px]">{item}</Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {"frequencies" in phase && phase.frequencies && (
                    <div className="flex flex-wrap gap-1">
                      <span className="text-[10px] font-semibold text-muted-foreground mr-1">Frequency:</span>
                      {phase.frequencies.map((f, fi) => (
                        <Badge key={fi} variant="outline" className="text-[10px]">{f}</Badge>
                      ))}
                    </div>
                  )}

                  {"tagging" in phase && phase.tagging && (
                    <div className="flex flex-wrap gap-1">
                      <span className="text-[10px] font-semibold text-muted-foreground mr-1">Material Tag:</span>
                      {phase.tagging.map((t, ti) => (
                        <Badge key={ti} variant="outline" className="text-[10px]">{t}</Badge>
                      ))}
                    </div>
                  )}

                  {"outsourceModels" in phase && phase.outsourceModels && (
                    <div className="space-y-3" data-testid="outsource-models">
                      {phase.outsourceModels.map((model: any, mi: number) => (
                        <div key={mi} className={`rounded-md p-3 border ${model.type === "partial" ? "bg-cyan-500/5 dark:bg-cyan-500/10 border-cyan-500/20" : "bg-orange-500/5 dark:bg-orange-500/10 border-orange-500/20"}`} data-testid={`outsource-model-${model.type}`}>
                          <h4 className={`font-semibold text-xs mb-0.5 ${model.type === "partial" ? "text-cyan-600 dark:text-cyan-400" : "text-orange-600 dark:text-orange-400"}`}>
                            {model.title}
                          </h4>
                          <p className="text-[10px] text-muted-foreground mb-2">{model.description}</p>

                          <div className="space-y-2">
                            {model.steps.map((step: any, si: number) => (
                              <div key={si} className="space-y-0.5">
                                <div className="flex items-center gap-1.5">
                                  <span className={`text-[10px] font-semibold ${step.critical ? "text-destructive" : "text-foreground"}`}>
                                    {step.name}
                                  </span>
                                  {step.critical && (
                                    <Badge variant="destructive" className="text-[8px] px-1 py-0">CRITICAL</Badge>
                                  )}
                                </div>
                                <ul className="space-y-0.5 ml-3">
                                  {step.details.map((d: string, di: number) => (
                                    <li key={di} className="text-[10px] text-muted-foreground flex items-start gap-1.5">
                                      <ChevronRight className="w-2.5 h-2.5 flex-shrink-0 mt-0.5" />
                                      <span>{d}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            ))}
                          </div>

                          {model.examples && (
                            <div className="flex flex-wrap gap-1 mt-2 pt-2 border-t border-dashed border-muted-foreground/10">
                              <span className="text-[9px] font-semibold text-muted-foreground mr-1">Examples:</span>
                              {model.examples.map((ex: string, ei: number) => (
                                <Badge key={ei} variant="secondary" className="text-[9px]">{ex}</Badge>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  {"certifications" in phase && phase.certifications && (
                    <div className="rounded-md p-3 bg-sky-500/5 dark:bg-sky-500/10 border border-sky-500/20" data-testid="certifications">
                      <h4 className="font-medium text-xs text-sky-600 dark:text-sky-400 mb-2 flex items-center gap-1.5">
                        <Shield className="w-3.5 h-3.5" />
                        Required Certifications
                      </h4>
                      <div className="space-y-1.5">
                        {phase.certifications.map((cert: any, ci: number) => (
                          <div key={ci} className="grid grid-cols-[1fr_auto_2fr] gap-2 items-start text-[10px]">
                            <span className="font-medium">{cert.name}</span>
                            <Badge variant="outline" className="text-[8px] px-1 py-0 whitespace-nowrap">{cert.required}</Badge>
                            <span className="text-muted-foreground">{cert.description}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {"qeSignoff" in phase && phase.qeSignoff && (
                    <div className="rounded-md p-3 bg-destructive/5 dark:bg-destructive/10 border border-destructive/20" data-testid="qe-signoff">
                      <h4 className="font-medium text-xs text-destructive mb-1 flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        {phase.qeSignoff.title}
                      </h4>
                      <p className="text-[10px] text-muted-foreground mb-2">{phase.qeSignoff.description}</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-1">
                        {phase.qeSignoff.checkpoints.map((cp: string, ci: number) => (
                          <div key={ci} className="flex items-start gap-1.5 text-[10px]">
                            <CheckCircle2 className="w-3 h-3 text-destructive flex-shrink-0 mt-0.5" />
                            <span>{cp}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {"examples" in phase && !("outsourceModels" in phase) && phase.examples && (
                    <div className="flex flex-wrap gap-1">
                      <span className="text-[10px] font-semibold text-muted-foreground mr-1">Examples:</span>
                      {phase.examples.map((e, ei) => (
                        <Badge key={ei} variant="secondary" className="text-[10px]">{e}</Badge>
                      ))}
                    </div>
                  )}

                  {phase.gate && (
                    <div className="flex items-start gap-2 p-2 rounded-md bg-destructive/10 border border-destructive/20">
                      <AlertTriangle className="w-4 h-4 text-destructive flex-shrink-0 mt-0.5" />
                      <p className="text-xs font-medium text-destructive">{phase.gate}</p>
                    </div>
                  )}

                  {"note" in phase && phase.note && (
                    <p className="text-[10px] text-muted-foreground italic">{phase.note}</p>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>

      {index < phases.length - 1 && (
        <div className="flex justify-center py-1">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: index * 0.06 + 0.3 }}
            className="flex flex-col items-center"
          >
            {phase.id === 3 ? (
              <div className="flex flex-col items-center gap-0.5">
                <GitFork className="w-4 h-4 text-orange-400" />
                <span className="text-[8px] text-orange-500 font-medium">In-house path OR skip to Phase 8 if fully outsourced</span>
              </div>
            ) : phase.id === 7 ? (
              <div className="flex flex-col items-center gap-0.5">
                <GitFork className="w-4 h-4 text-orange-400" />
                <span className="text-[8px] text-orange-500 font-medium">Partial outsource or continue in-house</span>
              </div>
            ) : phase.id === 8 ? (
              <div className="flex flex-col items-center gap-0.5">
                <GitMerge className="w-4 h-4 text-teal-500" />
                <span className="text-[8px] text-teal-600 dark:text-teal-400 font-medium">Paths merge for Final QC</span>
              </div>
            ) : (
              <ArrowDown className="w-4 h-4 text-muted-foreground/40" />
            )}
          </motion.div>
        </div>
      )}
    </motion.div>
  );
}

function FlowNode({ label, color, delay, icon: NodeIcon, badge }: { label: string; color: string; delay: number; icon?: typeof Factory; badge?: string }) {
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay, type: "spring", stiffness: 300 }}
      className="relative"
    >
      <div className={`${color} px-2.5 py-1.5 rounded-md text-white text-[10px] font-medium whitespace-nowrap flex items-center gap-1.5`}>
        {NodeIcon && <NodeIcon className="w-3 h-3" />}
        {label}
      </div>
      {badge && (
        <span className="absolute -top-1.5 -right-1.5 bg-destructive text-white text-[7px] font-bold px-1 py-0.5 rounded leading-none">
          {badge}
        </span>
      )}
    </motion.div>
  );
}

function FlowArrow({ direction = "right", delay, label }: { direction?: "right" | "down"; delay: number; label?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay }}
      className={`flex items-center gap-0.5 ${direction === "down" ? "flex-col" : "flex-row"}`}
    >
      {direction === "right" ? (
        <ArrowRight className="w-3.5 h-3.5 text-muted-foreground/50" />
      ) : (
        <ArrowDown className="w-3.5 h-3.5 text-muted-foreground/50" />
      )}
      {label && (
        <span className="text-[8px] text-muted-foreground/60 font-medium">{label}</span>
      )}
    </motion.div>
  );
}

function FlowchartMini() {
  return (
    <div className="py-4" data-testid="flowchart-mini">
      <Card className="overflow-visible">
        <CardContent className="p-4">
          <div className="flex items-center gap-2 mb-3">
            <GitFork className="w-4 h-4 text-primary" />
            <span className="text-xs font-semibold">Production Flow Map</span>
            <span className="text-[10px] text-muted-foreground ml-1">Non-linear process with parallel paths</span>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-1.5 flex-wrap justify-center">
              <FlowNode label="Customer PO" color="bg-blue-500" delay={0} icon={FileText} />
              <FlowArrow delay={0.05} />
              <FlowNode label="Compliance" color="bg-blue-600" delay={0.1} />
              <FlowArrow delay={0.15} />
              <FlowNode label="Mfg Strategy" color="bg-indigo-500" delay={0.2} badge="CRITICAL" />
              <FlowArrow delay={0.25} />
              <FlowNode label="QC Plan" color="bg-emerald-500" delay={0.3} icon={ClipboardCheck} />
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.45 }}
              className="relative border-2 border-dashed border-orange-400/40 dark:border-orange-500/30 rounded-lg p-3"
            >
              <div className="absolute -top-2.5 left-4 bg-background px-2">
                <span className="text-[9px] font-semibold text-orange-500 flex items-center gap-1">
                  <GitFork className="w-3 h-3" /> OUTSOURCE ROUTING DECISION
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-1">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="flex flex-col items-center gap-1.5 p-2 rounded-md bg-cyan-500/5 dark:bg-cyan-500/10 border border-cyan-500/20 sm:col-span-2"
                >
                  <span className="text-[9px] font-semibold text-cyan-600 dark:text-cyan-400 uppercase tracking-wider">In-House / Partial Outsource Path</span>
                  <div className="flex items-center gap-1.5 flex-wrap justify-center">
                    <FlowNode label="Material" color="bg-amber-500" delay={0.55} icon={Package} />
                    <FlowArrow delay={0.58} />
                    <FlowNode label="Programming" color="bg-violet-500" delay={0.6} icon={Layers} />
                    <FlowArrow delay={0.63} />
                    <FlowNode label="Setup" color="bg-rose-500" delay={0.65} icon={Wrench} />
                    <FlowArrow delay={0.68} />
                    <FlowNode label="Production" color="bg-cyan-500" delay={0.7} icon={Factory} />
                  </div>
                  <div className="flex items-center gap-1 text-[8px] text-muted-foreground">
                    <RotateCcw className="w-2.5 h-2.5" />
                    <span>Partial outsource sends specific ops to supplier, returns for next step</span>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="flex flex-col items-center gap-1.5 p-2 rounded-md bg-orange-500/5 dark:bg-orange-500/10 border border-orange-500/20"
                >
                  <span className="text-[9px] font-semibold text-orange-600 dark:text-orange-400 uppercase tracking-wider">Full Outsource Path</span>
                  <div className="flex flex-col items-center gap-1">
                    <FlowNode label="QCP Validate" color="bg-orange-500" delay={0.55} icon={ClipboardCheck} badge="QE" />
                    <FlowArrow direction="down" delay={0.58} />
                    <FlowNode label="PE Orders" color="bg-orange-600" delay={0.6} icon={ExternalLink} />
                    <FlowArrow direction="down" delay={0.63} />
                    <FlowNode label="Incoming QC" color="bg-orange-500" delay={0.65} icon={Search} badge="QC" />
                  </div>
                  <div className="text-[8px] text-orange-500 font-medium mt-1 text-center">
                    Phases 4-7 skipped
                  </div>
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.75 }}
                className="mt-2 text-center"
              >
                <span className="text-[8px] text-muted-foreground italic">
                  Partial outsource: parts alternate between in-house and supplier. Full outsource: entire job goes to supplier(s).
                </span>
              </motion.div>
            </motion.div>

            <div className="flex justify-center">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="flex items-center gap-1"
              >
                <GitMerge className="w-3.5 h-3.5 text-teal-500" />
                <span className="text-[9px] text-muted-foreground font-medium">All paths merge</span>
              </motion.div>
            </div>

            <div className="flex items-center gap-1.5 flex-wrap justify-center">
              <FlowNode label="Final QC" color="bg-teal-500" delay={0.85} icon={Search} badge="CRITICAL" />
              <FlowArrow delay={0.88} />
              <FlowNode label="Documentation" color="bg-sky-500" delay={0.9} icon={FileText} />
              <FlowArrow delay={0.93} />
              <FlowNode label="Packaging" color="bg-green-500" delay={0.95} icon={Package} />
              <FlowArrow delay={0.98} />
              <FlowNode label="Dispatch" color="bg-green-600" delay={1.0} icon={Truck} />
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1 }}
            className="flex flex-wrap items-center justify-center gap-3 mt-4 pt-3 border-t border-dashed"
          >
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-cyan-500" />
              <span className="text-[9px] text-muted-foreground">In-House</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-orange-500" />
              <span className="text-[9px] text-muted-foreground">Full Outsource</span>
            </div>
            <div className="flex items-center gap-1.5">
              <GitFork className="w-3 h-3 text-orange-400" />
              <span className="text-[9px] text-muted-foreground">Routing Decision</span>
            </div>
            <div className="flex items-center gap-1.5">
              <GitMerge className="w-3 h-3 text-teal-500" />
              <span className="text-[9px] text-muted-foreground">Merge Point</span>
            </div>
            <div className="flex items-center gap-1.5">
              <RotateCcw className="w-3 h-3 text-muted-foreground" />
              <span className="text-[9px] text-muted-foreground">Repeatable</span>
            </div>
          </motion.div>
        </CardContent>
      </Card>
    </div>
  );
}

function TrainingQuiz() {
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [currentQ, setCurrentQ] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);

  const questions = selectedRole ? roleQuizzes[selectedRole] || [] : [];
  const currentRole = roles.find(r => r.id === selectedRole);

  const handleAnswer = (answerIndex: number) => {
    if (showResult) return;
    setSelectedAnswer(answerIndex);
    setShowResult(true);
    if (answerIndex === questions[currentQ].correct) {
      setScore(score + 1);
    }
  };

  const nextQuestion = () => {
    if (currentQ < questions.length - 1) {
      setCurrentQ(currentQ + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      setCompleted(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQ(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setCompleted(false);
  };

  const backToRoles = () => {
    setSelectedRole(null);
    resetQuiz();
  };

  if (!selectedRole) {
    const grouped = Object.entries(tierLabels)
      .sort(([, a], [, b]) => a.order - b.order)
      .map(([tierId, tierInfo]) => ({
        tier: tierId,
        label: tierInfo.label,
        members: roles.filter(r => r.tier === tierId),
      }));

    return (
      <div className="space-y-4" data-testid="role-selector">
        <p className="text-xs text-muted-foreground text-center">Select your role to begin a targeted training assessment</p>
        {grouped.map(group => (
          <div key={group.tier}>
            <h4 className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-2">{group.label}</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {group.members.map(role => {
                const RoleIcon = role.icon;
                const questionCount = roleQuizzes[role.id]?.length || 0;
                return (
                  <Card
                    key={role.id}
                    className="overflow-visible hover-elevate cursor-pointer"
                    onClick={() => setSelectedRole(role.id)}
                    data-testid={`role-select-${role.id}`}
                  >
                    <CardContent className="p-3 flex items-center gap-3">
                      <div className={`w-9 h-9 rounded-md ${role.color} flex items-center justify-center flex-shrink-0`}>
                        <RoleIcon className="w-4 h-4 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold leading-tight">{role.title}</p>
                        <p className="text-[10px] text-muted-foreground">{questionCount} questions</p>
                      </div>
                      <Badge variant="outline" className="text-[9px] flex-shrink-0">{role.shortTitle}</Badge>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (completed) {
    const percentage = Math.round((score / questions.length) * 100);
    return (
      <div className="text-center space-y-4 py-6" data-testid="quiz-complete">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200 }}
        >
          <div className={`w-24 h-24 mx-auto rounded-full flex items-center justify-center ${percentage >= 75 ? "bg-emerald-500/20" : "bg-amber-500/20"}`}>
            <span className={`text-3xl font-bold ${percentage >= 75 ? "text-emerald-600 dark:text-emerald-400" : "text-amber-600 dark:text-amber-400"}`}>
              {percentage}%
            </span>
          </div>
        </motion.div>
        <div>
          <h3 className="text-lg font-semibold">
            {percentage >= 75 ? "Excellent Work!" : "Keep Learning!"}
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            {currentRole?.title} — {score} out of {questions.length} correct
          </p>
        </div>
        <Progress value={percentage} className="max-w-xs mx-auto" />
        <div className="flex items-center justify-center gap-2">
          <Button variant="outline" onClick={backToRoles} data-testid="button-back-roles">
            Change Role
          </Button>
          <Button onClick={resetQuiz} data-testid="button-retry-quiz">
            Retake Quiz
          </Button>
        </div>
      </div>
    );
  }

  const RoleIcon = currentRole?.icon || Shield;

  return (
    <div className="space-y-4" data-testid="training-quiz">
      <div className="flex items-center justify-between gap-2">
        <button
          onClick={backToRoles}
          className="flex items-center gap-1.5 text-xs text-muted-foreground px-2 py-1 rounded-md"
          data-testid="button-back-roles-inline"
        >
          <ArrowRight className="w-3 h-3 rotate-180" />
          Roles
        </button>
        <div className="flex items-center gap-2">
          <div className={`w-6 h-6 rounded-md ${currentRole?.color} flex items-center justify-center`}>
            <RoleIcon className="w-3.5 h-3.5 text-white" />
          </div>
          <span className="text-xs font-semibold">{currentRole?.title}</span>
        </div>
        <Badge variant="secondary" className="text-xs">
          {score}/{currentQ + (showResult ? 1 : 0)}
        </Badge>
      </div>

      <div className="flex items-center gap-2">
        <span className="text-[10px] text-muted-foreground whitespace-nowrap">
          Q{currentQ + 1}/{questions.length}
        </span>
        <Progress value={((currentQ + (showResult ? 1 : 0)) / questions.length) * 100} className="flex-1" />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentQ}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.2 }}
        >
          <h4 className="font-medium text-sm mb-3">{questions[currentQ].question}</h4>
          <div className="space-y-2">
            {questions[currentQ].options.map((option, oi) => {
              let optionClass = "hover-elevate cursor-pointer";
              if (showResult) {
                if (oi === questions[currentQ].correct) {
                  optionClass = "border-emerald-500 bg-emerald-500/10";
                } else if (oi === selectedAnswer && oi !== questions[currentQ].correct) {
                  optionClass = "border-destructive bg-destructive/10";
                }
              }
              return (
                <Card
                  key={oi}
                  className={`overflow-visible transition-colors ${optionClass}`}
                  onClick={() => handleAnswer(oi)}
                  onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); handleAnswer(oi); } }}
                  role="button"
                  tabIndex={0}
                  data-testid={`quiz-option-${oi}`}
                >
                  <CardContent className="p-3 flex items-center gap-3">
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 text-xs font-bold ${
                      showResult && oi === questions[currentQ].correct
                        ? "border-emerald-500 text-emerald-600 dark:text-emerald-400"
                        : showResult && oi === selectedAnswer
                          ? "border-destructive text-destructive"
                          : "border-muted-foreground/30 text-muted-foreground"
                    }`}>
                      {String.fromCharCode(65 + oi)}
                    </div>
                    <span className="text-sm">{option}</span>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {showResult && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-3 p-3 rounded-md bg-muted/50 border"
            >
              <p className="text-xs text-muted-foreground">
                <span className="font-semibold">Explanation: </span>
                {questions[currentQ].explanation}
              </p>
              <Button size="sm" className="mt-2" onClick={nextQuestion} data-testid="button-next-question">
                {currentQ < questions.length - 1 ? "Next Question" : "See Results"}
              </Button>
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default function Infographic() {
  const [expandedPhase, setExpandedPhase] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState("flow");

  return (
    <div className="min-h-screen bg-background">
      <div className="sticky top-0 z-[9999] bg-background/80 backdrop-blur-lg border-b">
        <div className="max-w-4xl mx-auto px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-md bg-gradient-to-br from-primary to-blue-700 flex items-center justify-center flex-shrink-0">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <div className="min-w-0">
              <h1 className="text-sm font-bold tracking-tight leading-tight">PRECILAYER</h1>
              <p className="text-[10px] text-muted-foreground leading-tight">Master Production & Quality Flow</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-6"
        >
          <h2 className="text-2xl font-bold tracking-tight" data-testid="text-main-title">
            Production & Quality Control
          </h2>
          <p className="text-sm text-muted-foreground mt-1 max-w-xl mx-auto">
            Interactive training module covering all 11 phases of the PRECILAYER master production flow, from order intake to dispatch.
          </p>
        </motion.div>

        <FlowchartMini />

        <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-4">
          <TabsList className="grid w-full grid-cols-5" data-testid="tabs-navigation">
            <TabsTrigger value="flow" data-testid="tab-flow">
              <Factory className="w-3.5 h-3.5 mr-1.5" />
              <span className="hidden sm:inline">Flow</span>
            </TabsTrigger>
            <TabsTrigger value="roles" data-testid="tab-roles">
              <Users className="w-3.5 h-3.5 mr-1.5" />
              <span className="hidden sm:inline">Roles</span>
            </TabsTrigger>
            <TabsTrigger value="critical" data-testid="tab-critical">
              <AlertTriangle className="w-3.5 h-3.5 mr-1.5" />
              <span className="hidden sm:inline">Critical</span>
            </TabsTrigger>
            <TabsTrigger value="matrix" data-testid="tab-matrix">
              <Target className="w-3.5 h-3.5 mr-1.5" />
              <span className="hidden sm:inline">Matrix</span>
            </TabsTrigger>
            <TabsTrigger value="quiz" data-testid="tab-quiz">
              <BookOpen className="w-3.5 h-3.5 mr-1.5" />
              <span className="hidden sm:inline">Quiz</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="flow" className="mt-4 space-y-0">
            {phases.map((phase, index) => (
              <PhaseCard
                key={phase.id}
                phase={phase}
                index={index}
                isExpanded={expandedPhase === phase.id}
                onToggle={() => setExpandedPhase(expandedPhase === phase.id ? null : phase.id)}
              />
            ))}
          </TabsContent>

          <TabsContent value="roles" className="mt-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className="text-center mb-4">
                <h3 className="text-lg font-bold" data-testid="text-roles-title">Roles & Responsibilities</h3>
                <p className="text-xs text-muted-foreground">Who does what across the 11-phase production flow</p>
              </div>

              {Object.entries(tierLabels)
                .sort(([, a], [, b]) => a.order - b.order)
                .map(([tierId, tierInfo]) => {
                  const tierRoles = roles.filter(r => r.tier === tierId);
                  if (tierRoles.length === 0) return null;
                  return (
                    <div key={tierId} className="mb-4">
                      <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 flex items-center gap-1.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground/50" />
                        {tierInfo.label}
                      </h4>
                      <div className="space-y-2">
                        {tierRoles.map((role, ri) => {
                          const RoleIcon = role.icon;
                          return (
                            <motion.div
                              key={role.id}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: ri * 0.05 }}
                            >
                              <Card className="overflow-visible" data-testid={`role-card-${role.id}`}>
                                <CardContent className="p-4">
                                  <div className="flex items-start gap-3">
                                    <div className={`w-10 h-10 rounded-md ${role.color} flex items-center justify-center flex-shrink-0`}>
                                      <RoleIcon className="w-5 h-5 text-white" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                      <div className="flex items-center gap-2 flex-wrap">
                                        <h4 className="font-semibold text-sm">{role.title}</h4>
                                        <Badge variant="outline" className="text-[10px] px-1.5 py-0">{role.shortTitle}</Badge>
                                      </div>
                                      <p className="text-xs text-muted-foreground mt-1">{role.description}</p>
                                      <div className="mt-2 space-y-1">
                                        {role.responsibilities.map((resp, i) => (
                                          <div key={i} className="flex items-start gap-1.5 text-[10px]">
                                            <ChevronRight className="w-2.5 h-2.5 flex-shrink-0 mt-0.5 text-muted-foreground/50" />
                                            <span className="text-muted-foreground">{resp}</span>
                                          </div>
                                        ))}
                                      </div>
                                      <div className="flex flex-wrap gap-1 mt-2">
                                        <span className="text-[9px] font-semibold text-muted-foreground mr-1">Active in:</span>
                                        {role.phases.map(phaseId => (
                                          <Badge key={phaseId} variant="secondary" className="text-[9px] px-1.5 py-0">
                                            P{phaseId}
                                          </Badge>
                                        ))}
                                      </div>
                                    </div>
                                  </div>
                                </CardContent>
                              </Card>
                            </motion.div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
            </motion.div>
          </TabsContent>

          <TabsContent value="critical" className="mt-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-3"
            >
              <div className="text-center mb-4">
                <h3 className="text-lg font-bold" data-testid="text-critical-title">5 Critical Control Points</h3>
                <p className="text-xs text-muted-foreground">These points guarantee total quality control. They must NEVER fail.</p>
              </div>
              {criticalControlPoints.map((cp, index) => {
                const Icon = cp.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="overflow-visible" data-testid={`critical-point-${index}`}>
                      <CardContent className="p-4 flex items-start gap-4">
                        <div className="w-10 h-10 rounded-md bg-destructive/10 flex items-center justify-center flex-shrink-0">
                          <Icon className="w-5 h-5 text-destructive" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <h4 className="font-semibold text-sm">{cp.name}</h4>
                            <Badge variant="destructive" className="text-[10px] px-1.5 py-0">MUST NOT FAIL</Badge>
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">{cp.description}</p>
                        </div>
                        <div className="w-8 h-8 rounded-full bg-destructive/20 flex items-center justify-center flex-shrink-0">
                          <span className="text-sm font-bold text-destructive">{index + 1}</span>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}

              <Card className="overflow-visible mt-6" data-testid="traceability-summary">
                <CardContent className="p-4">
                  <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
                    <FlaskConical className="w-4 h-4 text-primary" />
                    Traceability Control Requirement
                  </h4>
                  <p className="text-xs text-muted-foreground mb-2">
                    Mandatory traceability must be maintained between:
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    {["Material heat number", "Job ID", "Inspection records", "Supplier process records"].map((item, i) => (
                      <div key={i} className="flex items-center gap-2 p-2 rounded-md bg-primary/5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                        <span className="text-xs">{item}</span>
                      </div>
                    ))}
                  </div>
                  <p className="text-[10px] text-muted-foreground mt-2 italic">
                    This ensures aerospace and medical compliance readiness.
                  </p>
                </CardContent>
              </Card>

              <Card className="overflow-visible" data-testid="outsource-summary">
                <CardContent className="p-4">
                  <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
                    <ExternalLink className="w-4 h-4 text-orange-500" />
                    Outsourced Process QC Summary
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="p-3 rounded-md bg-orange-500/5 border border-orange-500/20">
                      <p className="text-xs font-semibold text-orange-600 dark:text-orange-400 mb-1.5">Before Outsourcing</p>
                      <ul className="space-y-1">
                        {["Outgoing QC inspection mandatory", "Part count verification mandatory"].map((item, i) => (
                          <li key={i} className="text-[11px] text-muted-foreground flex items-center gap-1.5">
                            <AlertTriangle className="w-3 h-3 text-orange-500 flex-shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="p-3 rounded-md bg-orange-500/5 border border-orange-500/20">
                      <p className="text-xs font-semibold text-orange-600 dark:text-orange-400 mb-1.5">After Outsourcing</p>
                      <ul className="space-y-1">
                        {["Incoming QC inspection mandatory", "Supplier certification verification", "Traceability maintained mandatory"].map((item, i) => (
                          <li key={i} className="text-[11px] text-muted-foreground flex items-center gap-1.5">
                            <AlertTriangle className="w-3 h-3 text-orange-500 flex-shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="mt-2 p-2 rounded bg-destructive/10 border border-destructive/20">
                    <p className="text-[11px] font-medium text-destructive text-center">
                      Parts cannot skip QC at any stage.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          <TabsContent value="matrix" className="mt-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className="text-center mb-4">
                <h3 className="text-lg font-bold" data-testid="text-matrix-title">Inspection Method Decision Matrix</h3>
                <p className="text-xs text-muted-foreground">Choosing the right inspection level for each part type.</p>
              </div>
              <Card className="overflow-visible" data-testid="inspection-matrix">
                <CardContent className="p-4">
                  <div className="space-y-3">
                    {inspectionMatrix.map((row, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center gap-3 p-3 rounded-md bg-muted/30 border"
                      >
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <span className="text-sm font-bold text-primary">L{row.level}</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium">{row.condition}</p>
                          <p className="text-xs text-muted-foreground">{row.method}</p>
                        </div>
                        <Badge
                          variant={row.level >= 4 ? "destructive" : "secondary"}
                          className="flex-shrink-0 text-[10px]"
                        >
                          Level {row.level}
                        </Badge>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="overflow-visible mt-4" data-testid="inspection-levels-full">
                <CardContent className="p-4">
                  <h4 className="font-semibold text-sm mb-3">All Inspection Levels</h4>
                  <div className="space-y-2">
                    {[
                      { level: 1, name: "Visual & Basic", desc: "Visual checks, basic measurements", color: "bg-emerald-500" },
                      { level: 2, name: "Standard Dimensional", desc: "Calipers, micrometers, gauges", color: "bg-blue-500" },
                      { level: 3, name: "Precision", desc: "Height gauge, bore gauge, etc.", color: "bg-violet-500" },
                      { level: 4, name: "CMM", desc: "Coordinate Measuring Machine", color: "bg-amber-500" },
                      { level: 5, name: "Full Inspection", desc: "All features inspected", color: "bg-rose-500" },
                    ].map((il) => (
                      <div key={il.level} className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-md ${il.color} flex items-center justify-center text-white text-xs font-bold flex-shrink-0`}>
                          {il.level}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-sm font-medium">{il.name}</span>
                            <span className="text-[10px] text-muted-foreground">{il.desc}</span>
                          </div>
                          <Progress value={il.level * 20} className="h-1.5 mt-1" />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="overflow-visible mt-4" data-testid="frequency-guide">
                <CardContent className="p-4">
                  <h4 className="font-semibold text-sm mb-3">Inspection Frequency Guide</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { freq: "First Part Only", desc: "Initial verification before batch production", intensity: "Low" },
                      { freq: "Every Setup", desc: "Verified each time machine is set up", intensity: "Medium" },
                      { freq: "Sample Inspection", desc: "Random sampling from production batch", intensity: "Medium" },
                      { freq: "Every Part", desc: "100% inspection of all produced parts", intensity: "High" },
                    ].map((f, i) => (
                      <div key={i} className="p-3 rounded-md bg-muted/30 border">
                        <div className="flex items-center justify-between gap-1 mb-1">
                          <span className="text-xs font-semibold">{f.freq}</span>
                          <Badge
                            variant={f.intensity === "High" ? "destructive" : "secondary"}
                            className="text-[9px] px-1.5 py-0"
                          >
                            {f.intensity}
                          </Badge>
                        </div>
                        <p className="text-[10px] text-muted-foreground">{f.desc}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          <TabsContent value="quiz" className="mt-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className="text-center mb-4">
                <h3 className="text-lg font-bold" data-testid="text-quiz-title">Role-Based Training Assessment</h3>
                <p className="text-xs text-muted-foreground">Select your role and test your specific knowledge of the production and quality flow.</p>
              </div>
              <Card className="overflow-visible" data-testid="quiz-card">
                <CardContent className="p-4">
                  <TrainingQuiz />
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>
        </Tabs>

        <footer className="mt-8 pb-6 text-center">
          <p className="text-[10px] text-muted-foreground">
            PRECILAYER Master Production & Quality Flow Training Module
          </p>
        </footer>
      </div>
    </div>
  );
}
