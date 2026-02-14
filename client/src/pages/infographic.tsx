import { useState, useEffect } from "react";
import precilayerLogo from "@assets/precilayer_logo_1771037012938.png";
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
  { name: "Material Traceability", icon: Package, description: "Every material must have verified heat numbers, certifications, and internal traceability IDs before use.", ownerRoles: ["proc", "qe"], phase: 4, failureImpact: "Unverified material enters production — aerospace/medical compliance breach, full batch rejection" },
  { name: "Manufacturing Strategy Definition", icon: Cog, description: "Complete machining strategy, datum definition, and workholding plan must be approved before programming begins.", ownerRoles: ["pe", "pm"], phase: 2, failureImpact: "Programming starts without strategy — wrong fixtures, wrong datums, entire job scrapped" },
  { name: "Quality Control Plan Definition", icon: ClipboardCheck, description: "Formal inspection requirements for every stage must be defined with inspection levels and frequencies.", ownerRoles: ["qe", "pe"], phase: 3, failureImpact: "No QCP means no inspection gates — defects pass undetected to customer" },
  { name: "Outsource Incoming Inspection", icon: ExternalLink, description: "All parts returning from suppliers must pass incoming QC with certification verification before re-entering production.", ownerRoles: ["sqe", "qe"], phase: 8, failureImpact: "Uninspected outsource parts re-enter production — unverified certifications, NADCAP breach" },
  { name: "Final Inspection Approval", icon: CheckCircle2, description: "Complete final inspection per Quality Control Plan must be passed before parts can be released for dispatch.", ownerRoles: ["qe"], phase: 9, failureImpact: "Non-conforming parts shipped to customer — warranty claims, regulatory action" },
];

const inspectionMatrix = [
  { condition: "Standard tolerance parts", method: "Standard inspection sufficient", level: 2 },
  { condition: "Tight tolerance (< 0.02 mm)", method: "Precision inspection required", level: 3 },
  { condition: "Complex geometry / GD&T", method: "CMM inspection required", level: 4 },
  { condition: "Aerospace / Medical / DFARS / AMS", method: "Certification verification + Enhanced inspection", level: 5 },
];

const roles = [
  { id: "pjm", title: "Project Manager", shortTitle: "PJM", icon: Target, color: "bg-violet-500", textColor: "text-violet-600 dark:text-violet-400", tier: "management", description: "Coordinates cross-functional activities, tracks milestones, and manages project timeline. Bridge between commercial, engineering, and production teams.", responsibilities: ["Project timeline and milestone tracking", "Cross-functional coordination", "Risk identification and mitigation", "Stakeholder communication", "Resource conflict resolution"], phases: [1, 2, 8, 10, 11] },
  { id: "pm", title: "Production Manager", shortTitle: "PM", icon: Factory, color: "bg-cyan-500", textColor: "text-cyan-600 dark:text-cyan-400", tier: "management", description: "Oversees entire production floor operations, resource allocation, and schedule adherence. Ensures production capacity meets delivery commitments.", responsibilities: ["Production scheduling and prioritization", "Resource and machine allocation", "Production bottleneck resolution", "Delivery schedule adherence", "Deviation approval alongside PE"], phases: [2, 5, 6, 7] },
  { id: "pe", title: "Project Engineer", shortTitle: "PE", icon: Cog, color: "bg-indigo-500", textColor: "text-indigo-600 dark:text-indigo-400", tier: "engineering", description: "Technical owner of the job from strategy through delivery. Defines manufacturing approach, owns the Manufacturing Strategy Sheet, and coordinates between programming, production, and quality.", responsibilities: ["Manufacturing Strategy Sheet ownership", "Process planning and datum definition", "Technical liaison between customer requirements and shop floor", "Full outsource order placement (not commercial team)", "CEDD estimation and delivery risk flagging"], phases: [1, 2, 3, 5, 8] },
  { id: "prog", title: "Programmer", shortTitle: "PROG", icon: Cpu, color: "bg-violet-600", textColor: "text-violet-700 dark:text-violet-300", tier: "engineering", description: "Creates CNC programs following the Manufacturing Strategy Sheet. Owns job numbering, CAM folder structure, setup sequencing, and process sheet creation.", responsibilities: ["Strategy Sheet review before programming", "Job numbering and CAM folder structure", "CNC program creation and simulation", "Process sheet creation per setup", "Program release to production"], phases: [5] },
  { id: "qe", title: "Quality Engineer / QA-QC", shortTitle: "QE", icon: ShieldCheck, color: "bg-emerald-500", textColor: "text-emerald-600 dark:text-emerald-400", tier: "quality", description: "Owns the Quality Control Plan and all inspection activities. Signs off on first parts, outsource returns, and final release. No part moves without QE approval at critical gates.", responsibilities: ["Quality Control Plan creation and ownership", "First Part Verification and approval", "In-process and final inspection", "Outsource incoming/outgoing inspection", "QE sign-off on certifications and compliance", "Non-conformance documentation and disposition"], phases: [3, 6, 7, 8, 9, 10] },
  { id: "sqe", title: "Supplier Quality Engineer", shortTitle: "SQE", icon: ExternalLink, color: "bg-orange-500", textColor: "text-orange-600 dark:text-orange-400", tier: "quality", description: "Manages supplier quality performance for outsourced processes. Validates supplier capabilities, audits certifications, and ensures incoming parts meet specifications.", responsibilities: ["Supplier qualification and audit", "QCP validation for outsourced work", "Supplier certification verification", "Incoming inspection coordination", "Supplier corrective action management"], phases: [8] },
  { id: "ss", title: "Shift Supervisor", shortTitle: "SS", icon: Eye, color: "bg-rose-500", textColor: "text-rose-600 dark:text-rose-400", tier: "operations", description: "Manages day-to-day shop floor execution. Ensures operators follow process sheets, monitors production progress, and escalates issues to Production Manager.", responsibilities: ["Shop floor execution oversight", "Operator task assignment", "Process sheet compliance monitoring", "Issue escalation to Production Manager", "Shift handover and status reporting"], phases: [6, 7] },
  { id: "op", title: "Shift Operator", shortTitle: "OP", icon: HardHat, color: "bg-amber-500", textColor: "text-amber-600 dark:text-amber-400", tier: "operations", description: "Executes machining operations on the shop floor. Follows process sheets, performs in-process self-checks, and reports non-conformances immediately.", responsibilities: ["Machine setup per process sheet", "CNC program execution", "In-process self-inspection", "Non-conformance reporting", "Workspace and tool maintenance"], phases: [6, 7] },
  { id: "plc", title: "Packaging & Logistics Coordinator", shortTitle: "PLC", icon: Package, color: "bg-green-500", textColor: "text-green-600 dark:text-green-400", tier: "operations", description: "Handles final packaging, corrosion protection, labeling, and dispatch logistics. Ensures parts are properly protected and shipped with correct documentation.", responsibilities: ["Parts cleaning and preparation", "Corrosion and contamination protection", "Proper packaging and labeling", "Dispatch coordination and tracking", "Shipping documentation"], phases: [11] },
  { id: "ce", title: "Sales & Techno-Commercial Engineer", shortTitle: "CE", icon: Briefcase, color: "bg-blue-500", textColor: "text-blue-600 dark:text-blue-400", tier: "commercial", description: "Creates the Sales Order, handles customer communication, and manages commercial aspects. First point of contact for order intake but does NOT place outsource orders.", responsibilities: ["Sales Order creation and verification", "Customer PO review and acknowledgment", "Commercial documentation and pricing", "Customer communication on delivery dates", "Escalation of delivery risks from PE"], phases: [1] },
  { id: "proc", title: "Procurement Specialist", shortTitle: "PROC", icon: ShoppingCart, color: "bg-amber-600", textColor: "text-amber-700 dark:text-amber-300", tier: "commercial", description: "Manages all procurement activities — raw materials, partial outsource processes (heat treatment, plating, coating), and fully outsourced end-to-end jobs. Sources suppliers, places purchase orders, tracks deliveries, and ensures all certifications are collected before handoff to QE.", responsibilities: ["Raw material sourcing, ordering, and delivery tracking", "Supplier sourcing and evaluation for outsourced processes", "Purchase order management for partial outsource ops (heat treat, anodizing, plating, NADCAP processes)", "Full outsource job PO placement and supplier coordination", "Material and supplier certification collection (CoC, MTC, NADCAP certs)", "Supplier lead time tracking and delivery scheduling", "Coordination with PE for outsource requirements and specs", "Flagging procurement risks and delays to PM and commercial team"], phases: [4, 8] },
];

const tierLabels: Record<string, { label: string; order: number }> = {
  management: { label: "Management", order: 1 },
  engineering: { label: "Engineering", order: 2 },
  quality: { label: "Quality", order: 3 },
  operations: { label: "Operations", order: 4 },
  commercial: { label: "Commercial", order: 5 },
};

type QuizQuestion = { question: string; options: string[]; correct: number; explanation: string; category: string; difficulty: "standard" | "scenario" | "critical" };

const roleQuizzes: Record<string, QuizQuestion[]> = {
  pe: [
    { question: "What must be completed and released before programming can begin?", options: ["Customer PO", "Raw material order", "Manufacturing Strategy Sheet", "Quality Control Plan only"], correct: 2, explanation: "The Manufacturing Strategy Sheet must be fully completed and released by the Project Engineer before programming starts.", category: "Strategy", difficulty: "standard" },
    { question: "In a full outsource model, who is responsible for placing the order with the supplier?", options: ["Commercial Engineer", "Quality Engineer", "Procurement Specialist", "Project Engineer"], correct: 3, explanation: "In full outsource (Model B), the Project Engineer places the order — not the commercial team.", category: "Outsource", difficulty: "standard" },
    { question: "Why does the PE estimate CEDD rather than simply accepting the customer's requested date?", options: ["To give production more buffer time", "Because CE is not allowed to set dates", "To impress the customer with thoroughness", "Because CEDD must account for machining, outsource lead times, transport, incoming inspection, and delivery risks — customer dates rarely reflect manufacturing reality"], correct: 3, explanation: "CEDD estimation is a technical assessment incorporating all production phases, outsource dependencies, and risk factors — not a negotiation tool.", category: "Planning", difficulty: "standard" },
    { question: "Which TWO approvals are required before any programming deviation can proceed?", options: ["QE and CE", "PE and PM jointly", "PM and Shift Supervisor", "PE and QE"], correct: 1, explanation: "No programming deviation is allowed without both PE (technical authority) and PM (production authority) approval.", category: "Deviations", difficulty: "standard" },
    { question: "A strategy sheet specifies five setups. The programmer proposes combining Setups 3 and 4 into one using a multi-axis approach. Who decides whether this is acceptable?", options: ["The PE, because the strategy sheet is the PE's technical authority document and any consolidation changes datum references, inspection points, and fixturing", "The programmer, since it's a programming efficiency decision", "The PM, since it affects machine time", "QE, because inspection points change"], correct: 0, explanation: "Setup consolidation changes datums, fixtures, and inspection hold points. The PE owns the strategy sheet and must evaluate and approve any structural changes.", category: "Technical Authority", difficulty: "standard" },
    { question: "What distinguishes a Partial Outsource model from a Full Outsource model in terms of PE responsibility?", options: ["In partial outsource, PE has no involvement with suppliers", "The models are identical — only the quantity changes", "In partial outsource, PE coordinates which operations go out while retaining in-house control; in full outsource, PE places the order and manages the entire supplier relationship", "In full outsource, CE manages the supplier instead of PE"], correct: 2, explanation: "Partial outsource keeps some operations in-house with PE coordinating the split. Full outsource transfers the entire job to a supplier with PE managing the relationship directly.", category: "Outsource", difficulty: "standard" },
    { question: "Why must the PE review historical NCRs before creating a strategy sheet for a repeat order?", options: ["To copy the previous strategy sheet faster", "Because previous non-conformances reveal process weaknesses that must be addressed in the new strategy — blindly copying perpetuates known failures", "NCR review is only required for new parts", "To determine if the customer will accept the same defects again"], correct: 1, explanation: "Repeat orders must incorporate lessons learned. Previous NCRs identify specific failure modes that the updated strategy must mitigate.", category: "Continuous Improvement", difficulty: "standard" },
    { question: "When the PE specifies inspection levels in the strategy sheet, what is the relationship between L3 (Precision) and L4 (CMM)?", options: ["L3 and L4 are interchangeable — both use precision instruments", "L3 is more accurate than L4", "L4 is just L3 done more carefully", "L3 uses precision hand instruments while L4 requires a Coordinate Measuring Machine; L4 is mandatory for complex GD&T that cannot be verified with hand tools"], correct: 3, explanation: "L3 and L4 differ in methodology: L3 uses precision hand gauges, L4 uses CMM for features requiring 3D coordinate verification. The PE must specify the right level based on feature complexity.", category: "Inspection Planning", difficulty: "standard" },
    { question: "SCENARIO: A customer sends a drawing for a titanium part with tight GD&T and a 3-week deadline. Your shop can do 70% in-house but needs anodizing externally. The supplier's NADCAP cert expires in 2 weeks. What is your FIRST action?", options: ["Accept the job and worry about the cert later", "Flag the NADCAP expiry risk, get SQE to verify renewal status before committing delivery date", "Reject the job outright", "Ask CE to negotiate a longer timeline without checking supplier status"], correct: 1, explanation: "The PE must identify and escalate risks immediately. Supplier cert expiry is a showstopper — verify before committing.", category: "Risk Assessment", difficulty: "scenario" },
    { question: "SCENARIO: During strategy definition, you realize the customer drawing calls for a datum scheme that would require a 5-axis setup, but your shop only has 3-axis machines. The PM says just run it anyway. What do you do?", options: ["Follow PM's instruction — they outrank you technically", "Skip datum definition entirely", "Refuse and redesign the datum scheme to fit 3-axis capability while maintaining spec compliance, then update the strategy sheet and notify the customer if design intent is affected", "Tell the customer their drawing is wrong"], correct: 2, explanation: "The PE is the technical authority. You must redesign for feasible manufacturing while maintaining spec compliance. PM does not override PE on technical matters.", category: "Technical Authority", difficulty: "scenario" },
    { question: "SCENARIO: Programming is 80% complete when the customer issues a drawing revision changing 3 tolerances. The programmer says the changes are minor and wants to continue without updating the strategy sheet. Your call?", options: ["Allow it — programmer knows best", "Let QE decide since tolerances affect inspection", "Only update if the customer explicitly asks", "STOP. Any drawing revision requires strategy sheet review, tolerance re-assessment, and formal re-release before programming continues"], correct: 3, explanation: "Drawing revisions require full strategy sheet review. 'Minor' changes can have major downstream impact on fixtures, inspection, and tooling.", category: "Change Control", difficulty: "critical" },
    { question: "SCENARIO: You're estimating CEDD for a job with 3 sequential outsource processes (heat treat, plating, NDT). Each supplier quotes 5 working days. A junior PE estimates 15 working days total for outsource. What's wrong with this estimate?", options: ["Nothing — 3 x 5 = 15 is correct", "It should be 5 days since they can run in parallel", "It ignores transport time between suppliers, incoming inspection time at each return, potential queue time, and re-packaging — the real lead time is likely 22-25+ working days", "The estimate should only include the longest single process"], correct: 2, explanation: "Sequential outsource estimates must include transport logistics, incoming QC at each return stage, queue times, and handling. Raw process time is only part of the picture.", category: "Planning", difficulty: "scenario" },
    { question: "SCENARIO: The customer wants to add a non-standard surface finish spec not in your normal process library. Who must be consulted before you include it in the strategy sheet?", options: ["Nobody — PE has full authority to add specs", "QE for inspection feasibility and SQE for supplier capability if outsourced — PE coordinates but cannot decide unilaterally on non-standard specs", "Only the programmer, since they execute the finish", "The CE handles all customer spec changes"], correct: 1, explanation: "Non-standard specs need QE input (can we inspect it?) and SQE input (can a qualified supplier do it?). Cross-functional validation prevents committing to unverifiable requirements.", category: "Cross-functional", difficulty: "scenario" },
    { question: "SCENARIO: You discover that the material specified on the customer drawing (Inconel 718) has a 12-week mill lead time. The CEDD is 8 weeks away. The customer drawing does not list alternate materials. What is your approach?", options: ["Substitute a similar nickel alloy without telling the customer", "Use whatever Inconel is in stock — close enough", "Contact CE to discuss with the customer: either extend CEDD, or request formal drawing revision with an alternate material. Never substitute material without customer authorization on the drawing", "Cancel the order and refund"], correct: 2, explanation: "Material substitution without customer authorization violates AS9100 traceability requirements. The PE must escalate through CE for formal resolution.", category: "Material Management", difficulty: "critical" },
    { question: "SCENARIO: A repeat job previously used a custom fixture that has since been damaged. Building a new fixture adds 2 weeks. The programmer suggests a standard vise setup that could work with creative workholding. What must you evaluate before approving?", options: ["Just approve it — any fixture that holds the part works", "Evaluate whether the vise setup maintains datum references from the strategy sheet, supports all required inspection access points, provides equivalent clamping force and rigidity, and won't introduce new vibration modes. Update strategy sheet if approved", "Reject any deviation from the original fixture", "Let the operator try it and see if parts pass inspection"], correct: 1, explanation: "Fixture changes cascade through the entire process: datums, inspection access, clamping force, vibration characteristics, and repeatability. A systematic evaluation is required.", category: "Change Control", difficulty: "scenario" },
    { question: "SCENARIO: You're creating a strategy sheet for a medical device component under ISO 13485. The drawing specifies Ra 0.8 surface finish but does NOT specify cleaning or passivation requirements. Should you add them?", options: ["Yes — ISO 13485 may require cleaning and passivation for implant-grade materials regardless of drawing callouts. Flag to QE and customer for confirmation before finalizing strategy", "No — only include what the drawing specifies", "Add them silently to be safe", "That's the QE's responsibility, not PE's"], correct: 0, explanation: "Under ISO 13485, regulatory requirements can exceed drawing callouts. The PE must proactively identify gaps and coordinate with QE and the customer.", category: "Regulatory", difficulty: "critical" },
    { question: "SCENARIO: Two jobs share the same machine but require different coolant types. Job A needs water-soluble coolant for aluminum, Job B needs oil-based coolant for titanium. Changeover takes 4 hours. How do you sequence them in the strategy?", options: ["Run them alternately to keep both customers happy", "Use the wrong coolant on one job to avoid changeover", "Batch all aluminum operations first, then changeover once for titanium. Factor the 4-hour changeover into CEDD. Communicate sequencing constraint to PM for scheduling", "Let the PM figure it out — strategy sheets don't cover coolant"], correct: 2, explanation: "Coolant compatibility is a technical constraint that affects scheduling. The PE must flag this in the strategy and work with PM to optimize sequencing.", category: "Cross-functional", difficulty: "scenario" },
    { question: "SCENARIO: During strategy creation, you identify that a tight internal bore (6mm diameter, 80mm deep) requires a special boring bar that your shop doesn't own. The boring bar costs $2,000 and has a 3-week delivery. The job margin is $5,000. What do you do FIRST?", options: ["Order the tool immediately — it's within job margin", "Tell CE the job isn't feasible", "Evaluate alternatives: can the bore be achieved with EDM, can a modified standard tool reach, is there a supplier who can do just this operation? Present options with cost/time tradeoffs to PM before committing to any purchase", "Ask the programmer to find a workaround"], correct: 2, explanation: "The PE must evaluate all technical and commercial alternatives before committing resources. Jumping to a tool purchase without exploring options shows poor engineering judgment.", category: "Decision Making", difficulty: "scenario" },
    { question: "SCENARIO: A customer's drawing specifies both ASTM and EN standard callouts for the same feature, and they conflict (ASTM allows ±0.05mm, EN allows ±0.02mm). Which standard governs?", options: ["Use the looser tolerance — it's easier to hit", "STOP. Escalate to CE to clarify with the customer which standard applies. You cannot proceed with conflicting specifications — manufacturing to the wrong standard could render parts non-conforming under the customer's actual requirement", "Use the tighter tolerance to be safe", "Apply whichever standard your shop typically uses"], correct: 1, explanation: "Conflicting specifications must be resolved before manufacturing begins. Assuming the tighter tolerance wastes resources if wrong; assuming the looser tolerance risks rejection.", category: "Specification Management", difficulty: "critical" },
    { question: "SCENARIO: Your strategy sheet has been released and programming is complete. The customer now requests adding a chamfer that wasn't on the original drawing. The chamfer is on an already-machined face from Setup 1. What CASCADE of changes is required?", options: ["Just add a quick chamfer program — it's a minor addition", "Only the programmer needs to update", "Ask the operator to hand-deburr it", "Drawing revision required, strategy sheet update for the additional operation, new or modified program, process sheet update, QCP revision for the new feature, possible re-fixturing if the face is no longer accessible, CEDD re-assessment, and CE must confirm commercial impact"], correct: 3, explanation: "Even 'simple' additions cascade through every downstream document. The entire chain from drawing to dispatch must be updated for traceability.", category: "Change Control", difficulty: "critical" },
    { question: "SCENARIO: You receive two jobs for the same customer. Job 1 is 10 parts of a simple bracket (2 setups). Job 2 is 2 parts of a complex housing (6 setups, tight GD&T). Both have the same CEDD. Which do you release to programming first?", options: ["Job 2 — complex jobs need more programming time, have higher risk of revision cycles, and any delay compounds across 6 setups. The simple job has more scheduling flexibility", "Job 1 — it's simpler and can be completed quickly", "Release both simultaneously — the programmer can multitask", "Whichever has the higher part count"], correct: 0, explanation: "Complex jobs with more setups have longer lead times and higher risk. Releasing them first provides maximum buffer for issues while simple jobs can be scheduled flexibly.", category: "Planning", difficulty: "scenario" },
    { question: "SCENARIO: The QE rejects your strategy sheet because you specified L2 (Standard Dimensional) inspection for a feature with a true position callout of 0.05mm. The QE says L4 (CMM) is required. Who is correct and why?", options: ["PE is correct — L2 is adequate for any dimensional check", "QE is correct — true position is a GD&T composite tolerance requiring simultaneous evaluation of multiple axes, which cannot be reliably verified with standard hand instruments. CMM (L4) is mandatory", "It depends on the operator's skill level", "Either level works — it's a matter of preference"], correct: 1, explanation: "True position tolerance requires simultaneous multi-axis measurement. Standard hand tools can check individual dimensions but cannot compute composite GD&T. CMM is not optional here.", category: "Inspection Planning", difficulty: "critical" },
    { question: "SCENARIO: A job requires 5 outsource operations across 3 different suppliers. You're building the strategy sheet timeline. What critical dependency must you map that most PEs overlook?", options: ["Supplier pricing negotiations", "The total weight of shipments", "Whether the suppliers are in the same country", "The return-inspect-release-ship cycle between each outsource step: parts must pass incoming QC before being sent to the next supplier, creating compound delays if any single supplier delivery is late or fails inspection"], correct: 3, explanation: "Multi-supplier outsource chains have serial dependencies with QC gates between each step. A delay or rejection at any point cascades through the entire chain.", category: "Planning", difficulty: "critical" },
    { question: "SCENARIO: You're defining manufacturing strategy for a part that will be produced monthly in batches of 50 for 2 years. How should your strategy sheet differ from a one-off job?", options: ["No difference — a strategy sheet is a strategy sheet", "Create 24 separate strategy sheets", "Just add a note saying 'repeat monthly'", "Include process capability targets (Cpk), define when fixtures need recertification, specify tool life management protocols, plan for statistical process control implementation, and flag when the strategy should be reviewed based on cumulative production data"], correct: 3, explanation: "Long-run production requires process capability planning, tool wear management, SPC implementation, and periodic strategy reviews — one-off strategies lack these elements.", category: "Production Planning", difficulty: "scenario" },
    { question: "In the 11-phase production flow, why does QCP Definition (Phase 3) come BEFORE Material Preparation (Phase 4)?", options: ["It's alphabetical order", "Because the QCP defines incoming material inspection requirements — if material arrives before the QCP is ready, there's no defined inspection criteria to verify the material against", "It doesn't matter — they can happen simultaneously", "QCP only applies to finished parts, not raw material"], correct: 1, explanation: "The QCP must be established before material arrives because it defines the incoming inspection criteria. Without it, material cannot be formally accepted.", category: "Process Flow", difficulty: "standard" },
  ],
  ce: [
    { question: "What is the first step when a customer PO is received?", options: ["Send to production immediately", "Start programming", "Order raw material", "Create Sales Order and verify PO details match the quotation — pricing, quantities, specifications, drawing revision, delivery terms"], correct: 3, explanation: "The CE creates the Sales Order and verifies all PO details against the original quotation before anything else proceeds.", category: "Order Intake", difficulty: "standard" },
    { question: "Why can't the Commercial Engineer place outsource orders in the Full Outsource model?", options: ["CE lacks technical knowledge to specify outsource requirements", "There's no rule preventing it", "CE is too busy with other tasks", "Because in full outsource, the PE manages the entire supplier relationship including technical specs, quality requirements, and delivery — CE placing orders would create conflicting instructions to the supplier"], correct: 3, explanation: "In full outsource, the PE is the single point of contact with the supplier to prevent conflicting instructions about technical and quality requirements.", category: "Outsource", difficulty: "standard" },
    { question: "What should the CE do when PE flags a delivery risk?", options: ["Ignore it and commit to the original date", "Change the order quantity to compensate", "Ask production to work overtime without informing the customer", "Communicate the risk to the customer proactively with cause, impact assessment, and proposed mitigation options"], correct: 3, explanation: "The CE must communicate delivery risks proactively and present solutions. Hiding problems erodes customer trust and violates AS9100 customer communication requirements.", category: "Communication", difficulty: "standard" },
    { question: "A customer requests a quote for 500 parts but their drawing specifies a material that requires DFARS compliance. What must the CE verify before quoting?", options: ["Only the machining cost", "Whether DFARS-compliant material is available, its cost premium, lead time impact, and whether the quoted price reflects the compliance burden — all before committing a price to the customer", "Nothing — just add 10% to the standard price", "DFARS is procurement's problem, not CE's"], correct: 1, explanation: "DFARS compliance affects material cost, lead time, and traceability requirements. The CE must account for all these in the quotation.", category: "Pricing", difficulty: "standard" },
    { question: "What is the CE's responsibility regarding drawing revision control during order intake?", options: ["Use whatever drawing the customer sends", "Verify that the drawing revision on the PO matches the drawing revision used for quotation. Any discrepancy must be resolved with the customer in writing before creating the Sales Order", "Drawing control is PE's responsibility only", "Always use the latest revision regardless of PO"], correct: 1, explanation: "Drawing revision mismatches between PO and quotation can mean different parts, different costs, and different specifications. The CE must catch this at order intake.", category: "Change Control", difficulty: "standard" },
    { question: "When a customer places a repeat order, can the CE simply duplicate the previous Sales Order?", options: ["Yes — it saves time and the details are the same", "Only if less than 6 months have passed", "Yes, but only if the customer confirms", "No — the CE must verify current pricing, material availability, drawing revision currency, and any lessons learned from the previous order (NCRs, delivery issues) before creating a new Sales Order"], correct: 3, explanation: "Repeat orders can differ in pricing, material availability, drawing revisions, and process improvements. Blind duplication perpetuates outdated information.", category: "Order Management", difficulty: "standard" },
    { question: "What information must the CE provide to the PE when releasing a job for strategy creation?", options: ["Just the customer name and part number", "Complete package: confirmed PO, correct drawing revision, quantity, CEDD, special customer requirements, applicable standards (AS9100/ISO 13485/DFARS), and any commercial constraints affecting the manufacturing approach", "Only the delivery date", "The PE should get this information from the customer directly"], correct: 1, explanation: "The PE needs a complete information package to create an accurate strategy sheet. Missing information causes rework, delays, and incorrect manufacturing decisions.", category: "Job Release", difficulty: "standard" },
    { question: "Why must split deliveries be handled as separate Sales Orders rather than one order with multiple shipments?", options: ["It's just company policy with no real purpose", "Because each delivery batch requires independent traceability, may have different pricing (material cost changes), different inspection lots, and separate CoC documentation. A single Sales Order cannot maintain these distinctions", "To create more paperwork for auditors", "Split deliveries are not allowed"], correct: 1, explanation: "Separate Sales Orders ensure each batch has complete traceability, correct pricing, independent inspection, and separate certification — critical for AS9100 compliance.", category: "Order Management", difficulty: "standard" },
    { question: "SCENARIO: A customer sends a PO with delivery in 2 weeks. You know from experience this part type usually takes 4 weeks. The customer is strategically important. What do you do?", options: ["Accept the PO and hope production can rush it", "Accept the PO but immediately loop in PE for CEDD estimation before confirming the delivery date to the customer. Never commit a date without technical validation", "Reject the PO outright to avoid overpromising", "Tell the customer it's impossible without checking internally"], correct: 1, explanation: "Never commit a date without PE validation. Accept the PO but do NOT confirm delivery until PE provides a realistic CEDD. Overpromising damages the relationship worse than honest timelines.", category: "Decision Making", difficulty: "scenario" },
    { question: "SCENARIO: A customer calls asking about their order status. The PE told you yesterday there's a 3-day delay due to material issues. The customer has a hard deadline for a product launch. How do you handle this?", options: ["Tell them everything is on track to avoid panic", "Promise to absorb the delay cost without checking with management", "Transfer them to the PE to explain the technical details", "Be transparent about the delay, explain the cause (material), present mitigation options (air freight, partial delivery, weekend work), and let the customer choose their preferred solution"], correct: 3, explanation: "Transparency builds trust. The CE must communicate delays honestly, present actionable solutions, and let the customer participate in the recovery plan.", category: "Customer Relations", difficulty: "scenario" },
    { question: "SCENARIO: You receive a PO that references drawing revision B, but the customer's email has revision C attached. Which revision do you use for the Sales Order?", options: ["Use Rev B since it's on the legally binding PO", "Use both and let PE decide later during strategy creation", "Use whichever is newest — Rev C supersedes Rev B", "STOP. Clarify with the customer which revision applies — get written confirmation before creating the Sales Order. A PO/drawing mismatch could mean the customer hasn't updated their procurement system yet"], correct: 3, explanation: "Drawing revision discrepancies must be resolved BEFORE order creation. Wrong revision = wrong part = potential scrap and contractual liability.", category: "Change Control", difficulty: "critical" },
    { question: "SCENARIO: A customer wants to change the quantity on an active order from 100 to 150 parts. Material has already been ordered for 100. What's the correct commercial process?", options: ["Just update the Sales Order quantity", "Tell them to place a separate order for 50", "Issue a formal order amendment, verify material availability for the additional 50 (new PO to procurement may be needed), get PE to reassess CEDD for the larger batch, confirm pricing still applies at new quantity, and get customer's written confirmation", "Accept verbally and sort out paperwork later"], correct: 2, explanation: "Quantity changes cascade through material, scheduling, pricing, and delivery. A formal amendment process ensures nothing falls through the cracks.", category: "Order Amendment", difficulty: "scenario" },
    { question: "SCENARIO: During order review, you notice the customer's PO terms specify 'DDP (Delivered Duty Paid)' to a country your company has never shipped to before. The PE says the part is straightforward. Should you proceed?", options: ["Yes — DDP is just a shipping term", "Accept and figure out shipping later", "Flag this for commercial review: DDP means your company bears all import duties, customs clearance, and compliance risks. You need to verify export control requirements (ITAR/EAR if US defense), calculate total landed cost, and confirm margin before accepting", "Change to FOB without telling the customer"], correct: 2, explanation: "DDP terms transfer all import/export risk to the seller. Unknown shipping destinations require export control screening, duty calculation, and commercial viability assessment.", category: "Commercial Risk", difficulty: "critical" },
    { question: "SCENARIO: A long-standing customer is 60 days past due on payments for a previous order. They now submit a new PO for an urgent job worth 3x the outstanding amount. How do you handle this?", options: ["Accept the new PO — they're a good customer", "Escalate to management: accept the PO commercially but flag the credit risk, propose requiring payment of the outstanding amount before releasing the new job to production, or negotiate prepayment terms for the new order", "Reject the PO until they pay", "Accept and ship but hold the documentation until they pay the old invoice"], correct: 1, explanation: "Credit risk management is part of CE responsibility. The new order is leverage for resolving the outstanding balance, but the decision must involve management.", category: "Commercial Risk", difficulty: "critical" },
    { question: "SCENARIO: A customer asks you to provide a budgetary quote for a part with no drawing — only a rough sketch and approximate dimensions. They want a number within 2 hours. What do you do?", options: ["Refuse without a proper drawing", "Ask PE to create a strategy sheet from the sketch", "Give an exact price based on similar parts", "Provide a clearly labeled 'budgetary estimate' with wide ranges, explicit assumptions, caveats that pricing is subject to final drawing review, and a validity period. Make clear this is not a firm quotation"], correct: 3, explanation: "Budgetary quotes serve business development but must be clearly distinguished from firm quotations. Explicit assumptions and caveats protect both parties.", category: "Quotation", difficulty: "scenario" },
    { question: "SCENARIO: Mid-production, the customer sends an engineering change notice (ECN) that affects 3 dimensions on a part. 40 of 100 parts are already machined to the old spec. The customer says 'just finish the remaining 60 to the new spec.' What commercial implications must you address?", options: ["Just relay the instruction to PE and continue", "Apply the change retroactively on paper", "Stop everything until the customer sends a new PO", "Determine: are the 40 completed parts now non-conforming? If so, negotiate scrap/rework costs. Issue a formal order amendment with revised drawing, assess cost impact of mixed-spec batch, get written customer acceptance for the 40 old-spec parts or agreement to bear rework/scrap costs"], correct: 3, explanation: "Mid-production ECNs create commercial, quality, and traceability complications. The CE must protect the company commercially while facilitating the customer's needs.", category: "Change Control", difficulty: "critical" },
    { question: "SCENARIO: You're quoting a job that requires 3 outsource operations. The PE estimates the total cost but asks you to add 15% margin. The customer's target price is 5% below your calculated cost before margin. What's your approach?", options: ["Quote at the customer's target price to win the job", "Add the 15% margin and let the customer negotiate down", "Present the cost breakdown to management, identify where costs might be optimized (alternative suppliers, process changes), propose a realistic counter-offer with justification, and be prepared to walk away if the job isn't commercially viable", "Remove one outsource operation to reduce cost"], correct: 2, explanation: "Quoting below cost is worse than losing the order. The CE must work with PE and management to find legitimate cost reductions or present a defensible counter-offer.", category: "Pricing Strategy", difficulty: "scenario" },
    { question: "SCENARIO: A customer submits three separate POs on the same day for three different parts, all from the same drawing family. They request consolidated shipment. What are the traceability implications the CE must consider?", options: ["No implications — just ship them together", "Create one Sales Order for all three POs", "Each PO needs its own Sales Order, job number, and traceability chain. Consolidated shipment is acceptable only if each part lot has independent documentation (CoC, inspection records, material certs) clearly segregated within the shipment", "Merge them into one job to save time"], correct: 2, explanation: "Consolidated shipping does not mean consolidated traceability. Each PO maintains independent documentation even when physically shipped together.", category: "Traceability", difficulty: "scenario" },
    { question: "SCENARIO: A customer's procurement team sends a PO, but the engineering team separately emails you updated acceptance criteria that are tighter than the drawing tolerances. The PO references only the drawing. Which governs?", options: ["The drawing on the PO — engineering emails aren't contractual", "STOP. This is a contract discrepancy. Get the customer to formally incorporate the tighter criteria into the PO or drawing revision. Verbal/email side-agreements without PO amendments create legal and quality disputes if parts are rejected later", "Use the tighter criteria to be safe", "Ignore the email and manufacture to the drawing"], correct: 1, explanation: "Side agreements outside the PO create ambiguity. Any additional requirements must be formally incorporated into the contract to protect both parties.", category: "Contract Management", difficulty: "critical" },
    { question: "SCENARIO: A customer places an order specifying a delivery date that falls on your company's annual shutdown period. The PE confirms the job can be completed before shutdown. What should the CE still verify?", options: ["Delay the order until after shutdown", "Verify that shipping/logistics services operate during the shutdown period, that the customer's receiving facility is open, and that any outsource suppliers involved aren't also shut down. Manufacturing completion doesn't guarantee delivery", "Just accept and ship early", "Nothing — if PE says it can be done, accept"], correct: 3, explanation: "Delivery involves more than manufacturing. The CE must verify the entire delivery chain is operational, not just the production timeline.", category: "Logistics", difficulty: "scenario" },
    { question: "SCENARIO: You discover after creating the Sales Order that the quotation was based on a batch size of 200 but the PO is for 50 parts. The unit price was calculated assuming 200-part efficiencies. What must you do?", options: ["Honor the quoted price — it's your mistake", "Re-evaluate pricing: smaller batches have higher per-unit setup, programming, and material costs. Issue a revised quotation reflecting the actual quantity and negotiate with the customer before proceeding", "Manufacture all 200 and store 150 for future orders", "Just absorb the loss as a goodwill gesture"], correct: 1, explanation: "Batch size significantly affects unit economics. Setup, programming, and material utilization costs don't scale linearly. The CE must requote for the actual quantity.", category: "Pricing", difficulty: "scenario" },
    { question: "SCENARIO: A customer places an order for parts requiring both AS9100 aerospace compliance AND ISO 13485 medical device compliance. Your facility holds both certifications. What unique commercial challenge does this dual-standard order create?", options: ["No challenge — certifications cover the same requirements", "Simply apply whichever standard is stricter", "Dual-standard orders require separate quality documentation streams, potentially different inspection methodologies, distinct traceability systems, and the CoC must reference compliance to BOTH standards. The quotation must reflect the additional quality overhead", "Inform the customer you can only certify to one standard per order"], correct: 2, explanation: "Dual-standard compliance is not simply applying the stricter standard. Each standard has unique documentation, traceability, and certification requirements that must be independently satisfied.", category: "Regulatory Complexity", difficulty: "critical" },
    { question: "What is the CE's obligation when a customer's PO contains terms and conditions that conflict with your company's standard terms (e.g., unlimited liability, IP ownership clauses)?", options: ["Accept the PO terms — the customer is always right", "Flag the conflicting terms to management/legal before accepting. PO acceptance creates a binding contract. Conflicting terms on liability, IP, warranty, and indemnification must be negotiated and resolved in writing before the Sales Order is created", "Ignore the fine print — focus on the technical requirements", "Cross out the conflicting terms and sign the PO"], correct: 1, explanation: "PO terms and conditions are legally binding upon acceptance. The CE must identify and escalate commercial risks before creating the Sales Order.", category: "Contract Risk", difficulty: "critical" },
    { question: "SCENARIO: A customer places a blanket PO for 1,000 parts with scheduled releases of 100 parts per month over 10 months. After 3 months (300 parts delivered), the customer wants to cancel the remaining 700 parts. What are the commercial implications?", options: ["Cancel immediately — customer has the right to cancel", "Accept the cancellation and write off all committed costs", "Deliver all 1,000 parts regardless of cancellation request", "Review the contract terms: has material been purchased for the full 1,000? Are there cancellation penalties in the PO terms? What's the cost of work-in-progress and committed raw material? The CE must calculate the financial exposure and negotiate a fair cancellation settlement that covers committed costs"], correct: 3, explanation: "Blanket PO cancellations have significant financial implications for committed materials, WIP, and planned capacity. The CE must protect the company's financial position.", category: "Contract Management", difficulty: "scenario" },
    { question: "Why must the CE track and report on-time delivery performance metrics separately for each customer?", options: ["On-time delivery tracking is the PM's responsibility", "Different customers have different tolerance for delays, different contractual penalty structures, and different strategic importance. Aggregate metrics can mask chronic issues with specific customers that damage individual relationships and trigger contractual penalties", "Customer-level metrics are unnecessary — aggregate metrics are sufficient", "Metrics are only needed for quarterly business reviews"], correct: 2, explanation: "Aggregate delivery metrics hide customer-specific patterns. A 95% overall OTD rate could mean one customer gets 100% while another gets 80% — and the 80% customer may have penalty clauses.", category: "Performance Management", difficulty: "scenario" },
  ],
  qe: [
    { question: "Which inspection level requires a Coordinate Measuring Machine?", options: ["Level 4 - CMM Inspection", "Level 3 - Precision", "Level 2 - Standard Dimensional", "Level 5 - Full Inspection"], correct: 0, explanation: "Level 4 specifically requires a CMM for precise geometric and GD&T measurements.", category: "Inspection", difficulty: "standard" },
    { question: "When can production continue after the first part is machined in a new setup?", options: ["Immediately, since the program has been simulated", "After operator self-inspection confirms dimensions", "Only after QE First Part Verification and formal approval", "After the shift supervisor signs off"], correct: 2, explanation: "Production CANNOT continue without QE first part approval. Operator self-inspection alone is not sufficient to release the batch.", category: "Quality Gates", difficulty: "standard" },
    { question: "What certifications must be verified when parts return from an outsource process?", options: ["Only the supplier's delivery note", "Only CoC is required", "A verbal confirmation from the supplier is acceptable", "CoC, MTC if applicable, NADCAP certification validity for the specific process scope, and any process-specific test reports — all must be current and match the PO requirements"], correct: 3, explanation: "QE must verify all applicable certifications are valid, current, and specific to the outsourced process before parts re-enter the production flow.", category: "Outsource QC", difficulty: "standard" },
    { question: "Why does the QCP include incoming material inspection requirements, not just in-process and final inspection?", options: ["It's an unnecessary formality", "The QCP only covers machined dimensions", "Incoming inspection is procurement's responsibility", "Because defective raw material that enters production undetected contaminates the entire batch — incoming inspection is the first quality gate that prevents propagation of material non-conformances"], correct: 3, explanation: "The QCP must address the entire quality chain from material receipt to final release. Incoming inspection catches material issues before they become expensive in-process problems.", category: "QCP", difficulty: "standard" },
    { question: "What is the fundamental difference between an NCR and a concession request?", options: ["They are the same thing", "A concession is more serious than an NCR", "An NCR documents the non-conformance and initiates investigation; a concession is a formal request to the customer to accept a non-conforming part as-is. The NCR comes first; a concession is one possible disposition outcome", "Only QE can raise an NCR, but anyone can request a concession"], correct: 2, explanation: "NCR is the documentation and investigation mechanism. Concession is a specific disposition path where the customer agrees to accept the deviation. They are sequential, not interchangeable.", category: "Non-conformance", difficulty: "standard" },
    { question: "Under AS9100, what is the QE's obligation when a measurement instrument's calibration has expired but the instrument 'seems fine'?", options: ["All measurements taken with that instrument since the last valid calibration date are suspect. Parts measured with it must be re-inspected with a calibrated instrument, and the calibration lapse must be documented", "Continue using it if readings look normal", "Just recalibrate it and backdate the certificate", "Calibration expiry is a maintenance issue, not QE's concern"], correct: 0, explanation: "Expired calibration invalidates all measurements taken since the expiry date. AS9100 requires documented investigation and potential re-inspection of affected parts.", category: "Metrology", difficulty: "standard" },
    { question: "Why is a sampling inspection plan inappropriate for first article inspection (FAI)?", options: ["FAI by definition requires 100% verification of ALL drawing characteristics on the first produced part(s) to validate the entire manufacturing process. Sampling only makes statistical sense with established production data", "Sampling is always better because it saves time", "FAI and sampling plans are interchangeable", "Sampling plans are only for non-critical dimensions"], correct: 0, explanation: "FAI validates the process capability — you need every characteristic verified to confirm the manufacturing method produces conforming parts. There's no statistical basis for sampling when n=1.", category: "FAI", difficulty: "standard" },
    { question: "What must the QE verify about the measuring environment when performing precision measurements (L3 and above)?", options: ["Nothing — modern instruments compensate automatically", "Temperature stability (parts and instruments must be at the same reference temperature, typically 20°C), cleanliness, vibration, and that thermal expansion coefficients are accounted for in measurements of dissimilar materials", "Just make sure the lights are on", "Environmental conditions only matter for CMM"], correct: 1, explanation: "Precision measurements are affected by temperature differentials, vibration, and contamination. A 1°C temperature difference can cause measurable thermal expansion errors on precision parts.", category: "Metrology", difficulty: "standard" },
    { question: "SCENARIO: Parts return from a heat treatment supplier. The CoC says 'HRC 58-62' but your drawing calls for 'HRC 55-58'. The supplier claims the difference is within measurement uncertainty. What do you do?", options: ["Accept — measurement uncertainty could explain the difference", "Ask the customer if they'll accept the higher hardness", "Re-test on your own hardness tester to see if readings differ", "REJECT. HRC 58-62 doesn't overlap sufficiently with HRC 55-58 to attribute the difference to measurement uncertainty alone. Initiate NCR, segregate parts, and notify SQE for supplier corrective action"], correct: 3, explanation: "The ranges don't overlap enough to be a measurement uncertainty issue. Out of spec is out of spec — follow the NCR process regardless of supplier explanations.", category: "Disposition", difficulty: "critical" },
    { question: "SCENARIO: During in-process inspection, you find that 3 out of 50 parts have a bore diameter 0.005mm over tolerance. The operator says his caliper might need recalibration. How do you proceed?", options: ["Trust the operator's assessment and continue production", "STOP production. Verify with calibrated instruments. If confirmed out of spec: segregate the 3 parts, 100% inspect the remaining 47, initiate NCR, and investigate root cause (tool wear, thermal drift, or measurement error)", "Just reject those 3 and continue with the rest", "Wait until final inspection to check the entire batch"], correct: 1, explanation: "Any suspected non-conformance requires immediate production stop, verification with calibrated equipment, and systematic batch review. Three failures in 50 suggests a systemic issue.", category: "In-process Control", difficulty: "scenario" },
    { question: "SCENARIO: A customer orders a medical-grade part. During QCP creation, you realize the drawing doesn't specify biocompatibility testing but the material requires it per ISO 13485. What do you do?", options: ["Only inspect what's on the drawing — you can't add requirements", "Flag the gap to PE and customer — the QCP must include all regulatory requirements even if the drawing is silent. ISO 13485 obligations exist independent of the drawing", "Add biocompatibility testing to QCP without informing anyone", "Ignore it — if the drawing doesn't call it out, it's the customer's oversight"], correct: 1, explanation: "QE is responsible for regulatory compliance. The QCP must satisfy both drawing requirements AND applicable regulatory standards. Missing requirements must be flagged.", category: "Regulatory", difficulty: "critical" },
    { question: "SCENARIO: Final inspection reveals one critical dimension is exactly at the tolerance boundary (nominal ±0.01mm, measured at +0.010mm exactly). The measurement uncertainty of your instrument is ±0.002mm. Do you pass or fail?", options: ["Pass but document it as a near-miss and flag for process review, because measurement uncertainty means the true value could range from +0.008 to +0.012mm", "Pass — the measured value is within the stated tolerance", "Fail — the measurement uncertainty means it could be out of spec", "Measure again until you get a more favorable number"], correct: 0, explanation: "The measured value is technically within tolerance, but accounting for measurement uncertainty, the true value could exceed the limit. Best practice: pass, document the near-miss, and trigger process review.", category: "Measurement Uncertainty", difficulty: "scenario" },
    { question: "SCENARIO: You're creating a QCP for a part with 47 dimensions. 5 are flagged as critical GD&T callouts, 12 are designated as 'key characteristics,' and 30 are standard dimensions. What inspection strategy makes sense?", options: ["100% inspection on all 47 dimensions for every part", "Only inspect the 5 critical dims and ignore the rest", "Sample inspection on everything equally", "100% on the 5 critical GD&T dims, 100% on the 12 key characteristics for the first article then sampling for production, and statistical sampling on the remaining 30"], correct: 3, explanation: "Risk-based inspection: critical dimensions get 100% always, key characteristics get validated at FAI then sampled, standard dimensions use statistical sampling. This balances thoroughness with efficiency.", category: "QCP Design", difficulty: "scenario" },
    { question: "SCENARIO: An operator brings you a part with a scratch on a cosmetic surface. The scratch is 0.02mm deep. The drawing specifies 'no scratches' on that surface but defines no depth threshold. How do you disposition this?", options: ["Accept — 0.02mm is microscopic", "Reject outright — the drawing says 'no scratches'", "This requires formal disposition: the drawing's 'no scratches' requirement is ambiguous. Raise an NCR, document the scratch with measurements, and seek customer clarification on acceptable cosmetic limits for future reference", "Polish it out and pass the part"], correct: 2, explanation: "Ambiguous drawing requirements must be formally resolved. The QE cannot unilaterally interpret 'no scratches.' Customer clarification establishes objective acceptance criteria.", category: "Disposition", difficulty: "critical" },
    { question: "SCENARIO: During a batch run, parts 1-20 pass inspection, parts 21-25 show a dimensional drift of 0.003mm (still within tolerance), and parts 26-30 are borderline. Production wants to continue. What do you advise?", options: ["Issue a process alert. The dimensional drift indicates a degrading condition (likely tool wear). Require tool change or verification before continuing. While current parts pass, the trend predicts imminent non-conformance", "Continue — all parts are within tolerance", "Stop production entirely and scrap the drifting parts", "Only inspect every other part to speed up production"], correct: 0, explanation: "Trend analysis is as important as pass/fail. A progressive drift predicts failure and must trigger corrective action before parts actually go out of spec.", category: "SPC", difficulty: "scenario" },
    { question: "SCENARIO: You need to perform FAI on a complex part with 150 characteristics. The customer requires AS9102 FAI documentation. The PE is pressuring you to complete it in one day. What's your response?", options: ["Rush through it — PE sets the priority", "Let the operator do the measurements and you'll sign them off", "Do a partial FAI on the critical dims and fill in the rest later", "Explain that AS9102 FAI requires systematic verification of every characteristic with recorded results, traceability to calibrated instruments, and balloon-numbered drawings. Rushing creates documentation errors and potential false acceptances. Negotiate a realistic timeline"], correct: 3, explanation: "AS9102 FAI has strict documentation requirements. Every characteristic must be measured, recorded, and traceable. Rushing leads to errors that undermine the entire purpose of FAI.", category: "FAI", difficulty: "critical" },
    { question: "SCENARIO: A supplier's CoC states heat treatment was performed per AMS 2759 at 980°C for 1 hour. Your PO specifies AMS 2759 at 1000°C for 2 hours (per the customer's specific requirements). The supplier says their process achieves equivalent results. Do you accept?", options: ["Accept — the supplier knows their process", "Accept if hardness test results pass", "REJECT. The PO specifies exact process parameters. Equivalent results claims require formal metallurgical justification and customer approval. Process parameters on the CoC must match the PO requirements exactly", "Request the supplier reprocess at the correct parameters"], correct: 2, explanation: "Process parameters are specified for a reason — they ensure specific metallurgical properties. Deviations require formal justification, not supplier assertions.", category: "Supplier Quality", difficulty: "critical" },
    { question: "SCENARIO: During CMM inspection, the operator reports that the part won't sit flat on the CMM granite table — it has a slight warp. The CMM operator uses shims to stabilize it and completes the measurement. Are the results valid?", options: ["Yes — the part was stable during measurement", "Potentially invalid. Shimming introduces datum uncertainty. The warp itself may be a non-conformance (check flatness spec). If flatness is in spec, the measurement setup must replicate the functional datum scheme, not arbitrary shimming", "Invalid — CMM measurements require perfectly flat parts", "Valid as long as the CMM software compensates"], correct: 1, explanation: "CMM measurements must replicate the part's functional datum scheme. Arbitrary shimming measures the part in a state that doesn't represent its actual condition. The warp may itself be non-conforming.", category: "CMM Practice", difficulty: "scenario" },
    { question: "SCENARIO: You complete final inspection on 200 parts. 198 pass. 2 fail on one non-critical dimension by 0.01mm. The customer needs delivery urgently. The PM suggests writing a concession request. What information must the concession package contain?", options: ["Just the dimension that's out of spec and a request to accept", "Complete package: affected part serial numbers, exact deviation values with measurement data, root cause analysis, impact assessment on form/fit/function, any previous concessions for the same feature, corrective action to prevent recurrence, and evidence the deviation won't affect downstream assembly", "A letter from the PM explaining the urgency", "The customer's delivery deadline as justification"], correct: 1, explanation: "A concession request is a formal engineering document, not a favor request. It must provide sufficient technical evidence for the customer to make an informed accept/reject decision.", category: "Concession Management", difficulty: "scenario" },
    { question: "SCENARIO: Your company wins a new aerospace contract requiring NADCAP heat treatment. You currently outsource heat treatment to a NADCAP-certified supplier. During QCP creation, what must you verify about the supplier's NADCAP scope?", options: ["Verify the supplier's NADCAP accreditation covers the specific heat treatment process, material class, and temperature range required by this contract. NADCAP scopes are narrowly defined", "Just confirm they have NADCAP — all NADCAP is the same", "Check their NADCAP certificate expiration date only", "NADCAP verification is SQE's responsibility, not QE's"], correct: 0, explanation: "NADCAP accreditation is process-specific. A supplier certified for aluminum heat treatment may not be certified for titanium. The QE must verify scope alignment when building the QCP.", category: "NADCAP", difficulty: "critical" },
    { question: "SCENARIO: An operator reports finding a foreign object (metal chip from a previous job) embedded in the raw material surface before machining begins. The chip is in an area that will be machined away. Is this still reportable?", options: ["Yes. This is a Foreign Object Debris (FOD) event that must be documented. It indicates a contamination gap in material handling. The immediate part may be fine, but the systemic issue (how did FOD get there?) must be investigated", "No — it'll be removed during machining", "Only if it's an aerospace part", "Log it informally and move on"], correct: 0, explanation: "FOD events must be documented regardless of whether they affect the current part. The systemic issue — how contamination occurred — must be investigated to prevent future occurrences.", category: "FOD Control", difficulty: "scenario" },
    { question: "SCENARIO: You receive an internal audit finding that your first part approval records don't consistently document which specific measuring instruments were used. Your current practice records 'calibrated caliper' without the instrument ID. Is this adequate for AS9100?", options: ["Yes — you confirmed it was calibrated", "No. AS9100 requires measurement traceability to specific calibrated instruments (by ID number). If an instrument is later found to be out of calibration, you must trace which parts it measured. Generic references make this impossible", "It depends on the customer's requirements", "Instrument IDs are only required for CMM measurements"], correct: 1, explanation: "Measurement traceability requires linking specific instrument IDs to specific measurements. This enables recall assessment if any instrument is later found out of calibration.", category: "Traceability", difficulty: "scenario" },
    { question: "SCENARIO: A part has two holes that are individually within diameter tolerance but their center-to-center distance is 0.03mm outside the positional tolerance. The part functions as a mounting bracket. The operator argues that since each hole is round and the right size, the part is fine. Your assessment?", options: ["Operator is correct — each hole passes individually", "Pass it if the customer's mating part has oversized holes", "The part is non-conforming. Individual feature compliance does not guarantee relational compliance. The center-to-center deviation means mating parts won't align. Positional tolerance is a separate and independent requirement from size tolerance", "Rework the holes to adjust position"], correct: 2, explanation: "Size and position are independent requirements. A correctly sized hole in the wrong location is still non-conforming. GD&T features must be evaluated both individually and relationally.", category: "GD&T", difficulty: "critical" },
    { question: "SCENARIO: The customer's drawing specifies surface roughness Ra 0.8 on all machined surfaces. During inspection, you measure Ra 0.75 on external surfaces but Ra 1.2 on an internal bore that was difficult to machine. The bore isn't functionally critical. Do you pass or fail?", options: ["Fail. The drawing specifies Ra 0.8 on ALL machined surfaces without exception. The bore exceeds this requirement regardless of perceived functional importance. Raise NCR for disposition", "Pass — the bore is non-functional so it doesn't matter", "Pass the external surfaces and reject the bore only", "Measure again with a different profilometer"], correct: 0, explanation: "The QE must inspect to the drawing specification, not to perceived functional importance. 'All machined surfaces' means all machined surfaces. Non-conformance must be formally dispositioned.", category: "Specification Compliance", difficulty: "critical" },
    { question: "SCENARIO: During final inspection, you discover that the operator performed self-inspections using a micrometer with a range of 25-50mm, but the critical dimension being measured is 24.8mm (below the instrument's range). All the operator's recorded measurements show 24.8mm. What's the issue?", options: ["No issue — the measurement reads correctly", "The instrument is being used outside its calibrated range. Micrometers below their minimum range give unreliable readings. All self-inspection data for this dimension is suspect. Re-inspect with a 0-25mm micrometer and investigate whether any non-conforming parts were passed", "The reading is close enough to the range minimum", "Only CMM measurements matter for final inspection"], correct: 1, explanation: "Using a measuring instrument outside its calibrated range invalidates the measurements. Parts measured this way may have passed self-inspection incorrectly.", category: "Metrology", difficulty: "scenario" },
  ],
  plc: [
    { question: "What must happen before parts can be packaged for dispatch?", options: ["Nothing — package immediately after machining", "Just wrap in paper and ship", "Only counting is needed to verify quantity", "Parts must pass final QE inspection, be cleaned, and protected against corrosion, damage, and contamination per the customer's packaging requirements"], correct: 3, explanation: "Parts must be QE-released, cleaned, and protected before packaging. Packaging without QE release means potentially shipping non-conforming parts.", category: "Packaging", difficulty: "standard" },
    { question: "Who performs the final release authorization before dispatch?", options: ["The machine operator who made the parts", "The shift supervisor", "The Quality Engineer", "The packing team leader"], correct: 2, explanation: "The QE performs final release. Parts cannot ship without QE release — this is the last quality gate before customer delivery.", category: "Release", difficulty: "standard" },
    { question: "Why must shipping documentation reference the exact drawing revision, not just the part number?", options: ["It's a cosmetic requirement for professional appearance", "Because the same part number can exist at multiple revisions with different specifications. Incorrect revision on shipping docs breaks traceability and could cause the customer to accept parts made to an obsolete spec", "Drawing revision only matters for engineering, not shipping", "The customer doesn't check revision letters"], correct: 1, explanation: "Drawing revision is part of the product identity. Wrong revision on documentation means the customer's receiving inspection may accept parts against incorrect criteria.", category: "Documentation", difficulty: "standard" },
    { question: "What is VCI (Volatile Corrosion Inhibitor) packaging and when is it required?", options: ["VCI is a type of cushioning material", "VCI is a chemical corrosion protection method (paper, bags, or emitters) required for ferrous metals, freshly machined aluminum, and any parts susceptible to oxidation during transport or storage", "VCI is only needed for parts going overseas", "VCI is optional — oil coating is always sufficient"], correct: 1, explanation: "VCI protection prevents corrosion through vapor-phase inhibitors. It's required whenever parts have exposed metal surfaces vulnerable to oxidation, especially during transit where humidity cannot be controlled.", category: "Corrosion Protection", difficulty: "standard" },
    { question: "What is the purpose of a humidity indicator card inside sealed packaging?", options: ["It shows the customer you care about quality", "It's only required for shipments over 1,000 miles", "It's decorative", "It provides objective evidence that the moisture level inside the sealed package remained below the threshold during transit. If the indicator shows excessive humidity, the customer knows to re-inspect for corrosion before accepting"], correct: 3, explanation: "Humidity indicators provide tamper-evident and condition-evident packaging. They alert the receiver if moisture levels exceeded safe thresholds during shipping.", category: "Corrosion Protection", difficulty: "standard" },
    { question: "Why must each part in a batch be individually separated during packaging, even if they're the same part number?", options: ["To make counting easier", "Individual separation is only for expensive parts", "Because metal-to-metal contact causes fretting, scratches, and corrosion initiation points. Freshly machined surfaces are especially vulnerable to contact damage that can take parts out of specification", "It's unnecessary if parts are hardened"], correct: 2, explanation: "Metal-to-metal contact during shipping causes fretting corrosion, surface damage, and cosmetic defects that can render parts non-conforming.", category: "Packaging", difficulty: "standard" },
    { question: "What documentation must accompany every shipment for an AS9100-compliant customer?", options: ["Just a packing slip with quantities", "Whatever the shipping company requires", "Only an invoice", "Certificate of Conformance (CoC), packing list with part numbers/revisions/quantities/serial or lot numbers, applicable test certificates (MTC, process certs), and any customer-specified documentation per the PO"], correct: 3, explanation: "AS9100 requires complete traceability documentation. Missing documentation means the customer cannot accept the parts even if they're dimensionally perfect.", category: "Documentation", difficulty: "standard" },
    { question: "When parts are shipped in multiple boxes for a single order, what linking documentation is required?", options: ["Each box just needs a quantity count", "A single label on each box with the PO number is sufficient", "Only the first box needs documentation", "Each box must reference the master packing list, include a box-specific content list (part numbers, serial/lot numbers, quantities per box), and the master packing list must show the total quantity across all boxes with box-level breakdowns"], correct: 3, explanation: "Multi-box shipments require cross-referenced documentation so the customer can verify they received all boxes and account for every part across the shipment.", category: "Multi-box Shipping", difficulty: "standard" },
    { question: "SCENARIO: You're packaging 100 precision-machined aluminum parts for air shipment to a tropical climate. The parts have freshly machined surfaces with Ra 0.4 finish. What specific protections are needed?", options: ["Bubble wrap and a cardboard box", "Shrink wrap the batch together for efficiency", "VCI paper/bags for corrosion protection, individual foam or tissue wrapping to prevent contact damage to the fine finish, desiccant packs for moisture control, humidity indicator card, sealed moisture barrier bag, and cushioning to prevent movement during transit", "Standard packaging with 'FRAGILE' sticker"], correct: 2, explanation: "Fine-finish aluminum in tropical transit requires multi-layer protection: corrosion inhibition, surface protection, moisture control, and movement prevention.", category: "Packaging Design", difficulty: "scenario" },
    { question: "SCENARIO: QE has released 98 of 100 parts. 2 parts are pending NCR disposition. The customer needs delivery today to avoid a production line stoppage. What do you do?", options: ["Ship all 100 — the 2 will probably be accepted anyway", "Ship all 100 and mark the 2 as 'pending' on the packing list", "Wait until all 100 are released, regardless of customer impact", "Ship the 98 released parts with documentation noting partial delivery (98 of 100), hold the 2 pending parts separately with clear identification, and coordinate with CE to communicate the partial shipment to the customer"], correct: 3, explanation: "Only QE-released parts can ship. Partial delivery with proper documentation is acceptable. Shipping unreleased parts is a quality system violation regardless of customer urgency.", category: "Partial Delivery", difficulty: "critical" },
    { question: "SCENARIO: You notice the shipping label has the correct part number but the wrong revision letter (Rev B instead of Rev C). The parts themselves were manufactured and inspected to Rev C. What do you do?", options: ["Ship anyway — the parts are correct regardless of the label", "Cross out 'B' and write 'C' with a pen", "STOP. Correct all documentation including labels, packing list, and CoC. Wrong revision on shipping docs creates a traceability breach — the customer's receiving system will log Rev B and their quality records won't match the actual parts", "Call the customer and ask if they care about the revision"], correct: 2, explanation: "Documentation accuracy is as critical as part accuracy. Wrong revision on shipping docs corrupts the customer's traceability records and could trigger a quality escape.", category: "Documentation Accuracy", difficulty: "scenario" },
    { question: "SCENARIO: A customer requires specific packaging per their packaging specification document. Their spec calls for wooden crates for all shipments over 10kg. Your shipment weighs 11kg but the parts fit safely in your standard corrugated boxes with foam inserts. Can you use your standard packaging?", options: ["No. Customer packaging specifications are contractual requirements. You must use wooden crates as specified, regardless of your assessment that corrugated boxes are sufficient. Deviating without customer approval is a non-conformance", "Yes — your packaging is adequate for protection", "Use corrugated boxes and add extra padding to compensate", "Ask the driver to handle it carefully"], correct: 0, explanation: "Customer packaging specifications are part of the contract, not suggestions. Deviating without written approval is a non-conformance even if your alternative is technically adequate.", category: "Customer Requirements", difficulty: "critical" },
    { question: "SCENARIO: During final packing, you discover that 5 parts have small handling marks (fingerprints) on polished surfaces from the inspection process. The parts passed QE inspection. What do you do?", options: ["Ship them — QE already approved", "Only flag it if the customer specified 'no handling marks'", "Just wipe them with a cloth and pack them", "Flag the issue: fingerprints on polished surfaces can cause localized corrosion if not cleaned. Clean the affected surfaces per the approved cleaning procedure, re-verify the finish hasn't been compromised, and implement glove-handling requirements for polished parts"], correct: 3, explanation: "Post-inspection handling damage can compromise previously approved parts. PLC is the last line of defense before the customer receives the product.", category: "Handling", difficulty: "scenario" },
    { question: "SCENARIO: You're preparing a shipment for a defense customer. The packing list shows 50 parts, but you physically count 51 in the inspection lot. All 51 have passed QE inspection. What do you do?", options: ["Ship 51 and update the packing list — more parts is a bonus", "STOP. A quantity discrepancy indicates a traceability error. One part may belong to a different job, different customer, or different material lot. Segregate the extra part, investigate its origin through job records, and only ship the verified 50", "Remove one part randomly and ship 50", "Ship 50 and put the extra back in inventory without investigation"], correct: 1, explanation: "A quantity mismatch means a traceability gap. The extra part may have different material certification, inspection history, or belong to another customer's order.", category: "Traceability", difficulty: "critical" },
    { question: "SCENARIO: A customer returns parts claiming 3 of 50 arrived damaged (dented surfaces). Your photos from pre-shipment show all parts in perfect condition. The customer's receiving photos show damage. What investigation steps do you take?", options: ["Blame the shipping carrier and send replacements", "Conduct a systematic investigation: review your pre-shipment photos and packing records, examine the packaging for signs of inadequate protection or rough handling (crushed corners, broken seals), check if the humidity indicator tripped, review the carrier's handling history, and determine if your packaging design was sufficient for the shipping method used", "Ask the customer to accept them as-is since they left your facility in good condition", "Assume the customer damaged them"], correct: 1, explanation: "Shipping damage investigation must determine root cause: inadequate packaging, carrier mishandling, or false claim. This drives corrective action for future shipments.", category: "Damage Investigation", difficulty: "scenario" },
    { question: "SCENARIO: You're preparing a shipment that includes both AS9100 aerospace parts and ISO 13485 medical device components for the same customer. Can they be shipped in the same box?", options: ["No. Aerospace and medical parts have different regulatory documentation requirements, different contamination control standards, and different receiving inspection protocols. They must be packaged and documented separately even to the same customer", "Yes — same customer, same box for efficiency", "Yes, as long as they're in separate bags within the box", "Only if the customer requests consolidated shipping"], correct: 0, explanation: "Different regulatory frameworks require separate packaging, documentation, and handling. Co-mingling creates cross-contamination and documentation mix-up risks.", category: "Regulatory Segregation", difficulty: "critical" },
    { question: "SCENARIO: A rush order must ship tonight. The CoC is ready, but the MTC from the material supplier hasn't been located in the filing system. The procurement specialist says it definitely exists but might take a day to find. Can you ship without the MTC?", options: ["Yes — the CoC covers material conformance", "Ship and email the MTC when you find it", "No. If the customer's PO requires MTC, shipping without it is a documentation non-conformance. Locate the MTC before shipping, or delay shipment and communicate to CE. Never ship incomplete documentation packages", "Create a substitute MTC from your receiving records"], correct: 2, explanation: "Shipping without required documentation is a quality system violation. The CoC does not replace the MTC — they serve different traceability purposes.", category: "Documentation Completeness", difficulty: "critical" },
    { question: "SCENARIO: You receive corrected labels for a shipment that's already sealed and ready for pickup. The correction is to the PO number (was '12345', should be '12346'). The driver arrives in 10 minutes. Do you open the sealed package?", options: ["No — attach a corrective sticker on the outside", "Let the customer fix it when they receive it", "Ship it and email the customer about the correction", "Yes. Open the package, replace all incorrect labels and documentation, re-seal, and re-verify. An incorrect PO number means the customer's receiving system will reject the shipment or worse, apply it to the wrong order"], correct: 3, explanation: "Incorrect PO numbers cause receiving rejections, inventory errors, and payment processing failures at the customer. The packaging must be re-done correctly.", category: "Documentation Accuracy", difficulty: "scenario" },
    { question: "SCENARIO: Your standard procedure requires taking photographs of parts before sealing for shipment. On a batch of 200 small parts, the operator photographed a representative sample of 10 parts instead of all 200. Is this acceptable?", options: ["It depends on your documented procedure. If the procedure says 'all parts,' then photographing only 10 is a non-conformance to your own procedure. If representative sampling is acceptable per procedure, document which 10 were photographed and why they're representative", "Yes — photographing 200 identical small parts is impractical", "No — every single part must be individually photographed", "Photos are optional and have no quality significance"], correct: 0, explanation: "Compliance is measured against your documented procedures. If the procedure requires 'all parts,' then sampling without procedure amendment is a deviation. The procedure may need updating, but you can't unilaterally deviate.", category: "Procedure Compliance", difficulty: "scenario" },
    { question: "SCENARIO: A customer's purchase order specifies shipping via DHL Express. Your logistics team has negotiated a cheaper rate with FedEx for the same delivery speed. Can you switch carriers?", options: ["Yes — same speed, lower cost is a smart business decision", "Switch to FedEx and don't mention it", "No. The customer specified DHL Express in their PO. Carrier specification may relate to their customs broker, tracking system integration, or insurance requirements. Changing without approval is a PO deviation. Request customer authorization first", "Only if the parts arrive on time"], correct: 2, explanation: "Customer-specified carriers may be contractually required for customs, tracking, or insurance reasons. Unilateral changes violate PO terms.", category: "Logistics Compliance", difficulty: "scenario" },
    { question: "SCENARIO: During pre-shipment checks, you find that the desiccant packets inside the moisture barrier bag have been exposed to the workshop air for 2 hours (the bag wasn't sealed promptly). Are the desiccants still effective?", options: ["Yes — desiccants last for years", "It doesn't matter for a short transit", "Check their color indicator — if it's unchanged, they're fine", "Questionable. Desiccants actively absorb moisture from ambient air. Two hours of exposure in a workshop environment may have significantly reduced their capacity. Replace with fresh desiccants from sealed packaging to ensure adequate moisture protection"], correct: 3, explanation: "Exposed desiccants lose capacity progressively. Since their effectiveness can't be easily verified after exposure, replacing them is the safe and low-cost option.", category: "Corrosion Protection", difficulty: "scenario" },
    { question: "SCENARIO: The packing list has been signed by QE for final release. After signing, you notice one part has a sharp burr on a non-critical edge that wasn't caught during inspection. The customer's PO states 'all edges deburred.' What do you do?", options: ["Ship it — QE already signed off and burrs aren't dimensional failures", "Remove the burr and ship without telling QE", "Stop shipment. The burr violates the PO requirement. Deburr the part, then determine if QE needs to re-inspect and re-sign the release. Document the post-inspection finding and how it was resolved", "Only stop if the burr is on a critical surface"], correct: 2, explanation: "Post-release findings cannot be ignored. The PO says 'all edges deburred' — this is a contractual requirement. The finding also indicates a gap in the inspection process.", category: "Post-Release Findings", difficulty: "critical" },
    { question: "SCENARIO: A customer requires that all packaging materials be recyclable and free from restricted substances per their environmental specification. Your standard VCI bags are effective but contain substances on the customer's restricted list. What's your solution?", options: ["Use the standard VCI bags — corrosion protection trumps environmental requirements", "Ship without VCI and hope for the best", "Source VCI packaging that meets the customer's environmental specification. If unavailable, propose alternative corrosion protection methods (oil coating + recyclable wrapping) to the customer for approval before shipping", "Tell the customer their environmental spec is impractical"], correct: 2, explanation: "Customer environmental specifications are contractual. The PLC team must find compliant alternatives or negotiate with the customer — but cannot ship non-compliant packaging.", category: "Environmental Compliance", difficulty: "scenario" },
    { question: "SCENARIO: Parts are ready for dispatch but the shipping address on the PO differs from the shipping address the customer provided by email last week ('use our new warehouse'). Which address do you use?", options: ["Use the PO address. The PO is the legal contract. If the customer wants a different shipping address, they must issue a PO amendment. Email instructions don't override contractual documents without formal amendment", "The email address — it's more recent", "Call the customer and ship to whichever they confirm verbally", "Ship to both addresses — split the order"], correct: 0, explanation: "The PO is the governing document. Informal communications don't supersede contractual terms. The customer must formally amend the PO to change the delivery address.", category: "Contract Compliance", difficulty: "critical" },
    { question: "SCENARIO: Your final pre-shipment check reveals that the packaging tape seal on one box has been opened and re-sealed (visible tape overlap). Nobody remembers opening it. What do you do?", options: ["It's probably nothing — someone checked the contents and resealed", "Just add another layer of tape", "Treat this as a potential tampering or contamination event. Open the box, re-verify contents against the packing list, re-inspect parts for damage or foreign objects, re-seal with tamper-evident tape, and investigate who accessed the box and why", "Ship it and note the observation in your log"], correct: 2, explanation: "Unexplained package opening is a chain-of-custody breach. Contents must be reverified to ensure no parts were removed, added, swapped, or contaminated.", category: "Chain of Custody", difficulty: "critical" },
  ],
  pm: [
    { question: "When does the Production Manager get involved in the production lifecycle?", options: ["From manufacturing strategy definition (Phase 2) through production execution (Phase 7), with continued oversight through outsource and final inspection", "Only at dispatch", "Only during machining operations", "Only for outsourced jobs"], correct: 0, explanation: "The PM is involved from strategy through execution and maintains oversight through the entire production process.", category: "Scope", difficulty: "standard" },
    { question: "What is the PM's role in programming deviations?", options: ["PM has no authority over programming decisions", "PM can approve programming deviations independently", "PM approval is required alongside PE approval — both must agree before any programming deviation proceeds", "Programming deviations go directly to the customer"], correct: 2, explanation: "Programming deviations need both PE (technical authority) and PM (production authority) approval. Neither can approve unilaterally.", category: "Deviations", difficulty: "standard" },
    { question: "What should the PM prioritize when resolving a production bottleneck?", options: ["Resource reallocation (machines, operators, shifts) while maintaining all quality gates — speed without quality is just faster scrap production", "Skip quality checks to maintain throughput", "Cancel lower-priority orders", "Only inform the customer about delays"], correct: 0, explanation: "Bottleneck resolution must never compromise quality gates. Quality failures from rushed production cost far more than schedule delays.", category: "Production", difficulty: "standard" },
    { question: "Why must the PM understand the QCP even though quality inspection is the QE's responsibility?", options: ["PM doesn't need to understand the QCP", "QCP knowledge is only necessary for audit preparation", "Because the QCP defines hold points, first part approval requirements, and inspection frequencies that directly affect production scheduling. A PM who ignores the QCP will schedule work that can't proceed through quality gates", "The PM only needs to know the final inspection date"], correct: 2, explanation: "QCP hold points are scheduling constraints. Ignoring them leads to production stoppages, quarantined batches, and schedule chaos when operators reach hold points the PM didn't plan for.", category: "Cross-functional", difficulty: "standard" },
    { question: "How does machine utilization differ from machine efficiency, and why does the PM need to track both?", options: ["They're the same metric", "Utilization is for new machines, efficiency for old ones", "Utilization measures time the machine is running vs. available time; efficiency measures actual output vs. theoretical output at running speed. A machine running constantly at half speed has high utilization but low efficiency", "Only efficiency matters for scheduling"], correct: 2, explanation: "A machine can be highly utilized but inefficient (slow feed rates, excessive idle time between parts). The PM needs both metrics to identify true capacity.", category: "Capacity Planning", difficulty: "standard" },
    { question: "What is the PM's responsibility regarding tool life management during production runs?", options: ["The PM must ensure tool life monitoring is in place, replacement tools are available before they're needed, and tool changes are scheduled to minimize production interruption while maintaining part quality", "Tool management is entirely the operator's responsibility", "Tools are changed only when they break", "The programmer decides all tool change intervals"], correct: 0, explanation: "Proactive tool management prevents mid-run stoppages and quality degradation. The PM must coordinate between programming (tool life estimates) and the tool crib (availability).", category: "Tool Management", difficulty: "standard" },
    { question: "When multiple jobs share a common machine, what determines the setup sequence that minimizes total changeover time?", options: ["Run jobs in order received", "Group jobs by similar materials, tooling, and fixtures to minimize changeovers. Consider coolant type changes (which take hours) vs. program changes (minutes). Material contamination risks also dictate sequence (never run brass after steel without thorough cleanup)", "Always run the shortest job first", "Let each operator decide their own sequence"], correct: 1, explanation: "Intelligent sequencing considers material compatibility, tooling commonality, coolant changes, and contamination risks. Random sequencing wastes hours in unnecessary changeovers.", category: "Scheduling", difficulty: "standard" },
    { question: "What is the PM's escalation protocol when an operator reports a machine producing intermittent out-of-tolerance parts?", options: ["Tell the operator to monitor it and continue", "Switch the job to another machine and ignore the problem", "Wait for the next scheduled calibration", "Immediately stop the machine, quarantine all parts since the last confirmed good measurement, initiate emergency calibration check, and notify QE for batch disposition. Intermittent failures are the most dangerous quality risk"], correct: 3, explanation: "Intermittent tolerance failures produce undetected non-conformances mixed randomly in the batch. Every part since the last verified good measurement is suspect.", category: "Escalation", difficulty: "standard" },
    { question: "SCENARIO: Three urgent jobs need the same 5-axis machine this week. Job A is for an aerospace customer with a contractual penalty clause, Job B is a repeat commercial order with a flexible deadline, Job C is a new medical customer's first order (qualification run). How do you prioritize?", options: ["First come first served based on order date", "Prioritize A (contractual penalty = financial and reputational risk), then C (first order = customer qualification with long-term value), then B (repeat customer with relationship flexibility to negotiate a short extension)", "Run all three with overtime and weekend shifts", "Cancel Job B to free up capacity"], correct: 1, explanation: "Prioritization must weigh contractual obligations, financial risk, strategic value, and negotiation flexibility. Regulatory deadlines and contractual penalties are non-negotiable.", category: "Priority Management", difficulty: "scenario" },
    { question: "SCENARIO: An operator reports that a CNC machine is producing parts 0.003mm out of tolerance intermittently — every 15th to 20th part. The machine passed calibration last month. Production is behind schedule. What's your call?", options: ["Keep running — the failure rate is low and most parts are good", "Run a few more parts to better characterize the pattern", "STOP the machine immediately. Intermittent failures at regular intervals suggest a mechanical issue (worn ball screw, thermal drift cycle, or spindle bearing degradation). Quarantine all parts since the last known good check. Schedule emergency maintenance diagnostics", "Switch to a different program to see if the problem follows"], correct: 2, explanation: "Regular-interval intermittent failures point to mechanical degradation (ball screw pitch errors repeat cyclically, thermal drift follows heating/cooling patterns). Running more parts just creates more suspect parts.", category: "Machine Health", difficulty: "critical" },
    { question: "SCENARIO: The PE's strategy sheet calls for a specific fixture that won't be available for 3 days. The programmer suggests an alternative fixture. What must happen before you approve the change?", options: ["PE must review and approve the fixture change (it affects datums), strategy sheet must be updated, QE must confirm inspection feasibility with the new fixturing arrangement, and the programmer must re-verify the program is compatible", "Just approve it — programmer knows what works on the shop floor", "Try the alternative and if the first part passes, continue", "Wait the 3 days — no technical changes allowed"], correct: 0, explanation: "Fixture changes cascade through datums, inspection access, clamping forces, and program coordinates. The PM cannot unilaterally approve technical changes that affect multiple disciplines.", category: "Change Control", difficulty: "scenario" },
    { question: "SCENARIO: End of quarter. You have 5 jobs to complete. Realistically, you can finish 4 with available capacity. Which job do you delay, and how?", options: ["Assess each job against: contractual penalties, customer strategic importance, regulatory deadlines (NADCAP cert expiry, etc.), and downstream impact. Delay the one with the most flexibility, then PROACTIVELY communicate the revised date through CE/PJM before the customer discovers it", "Delay whichever is least complete — it's the furthest from delivery", "Work everyone into mandatory overtime for all 5", "Don't tell anyone and prioritize in secret"], correct: 0, explanation: "Strategic prioritization requires multi-factor analysis. Proactive communication preserves relationships and gives customers time to adjust. Surprises destroy trust.", category: "Capacity Management", difficulty: "scenario" },
    { question: "SCENARIO: Night shift reports that Machine 7 had a crash (tool collision with fixture). The operator was uninjured. The machine appears functional after reset. Morning shift has a critical job scheduled on Machine 7. What do you do FIRST?", options: ["Run the morning job — the machine seems fine after reset", "Ask the operator to visually inspect the spindle", "Run a test program with scrap material to verify", "Lock out Machine 7 for full inspection: check spindle runout, axis alignment, ballscrew backlash, and fixture integrity. A collision can cause internal damage that isn't visible but produces non-conforming parts. No production until maintenance certifies the machine"], correct: 3, explanation: "Machine crashes can cause hidden damage: bent spindles, disturbed alignment, or loosened components. Running production without full verification risks batch-wide non-conformance.", category: "Machine Safety", difficulty: "critical" },
    { question: "SCENARIO: A new operator is assigned to a complex 5-axis job. They've been trained on 3-axis machines but haven't operated 5-axis equipment independently. The job is urgent and your experienced 5-axis operator is on leave. What do you do?", options: ["Do NOT assign an untrained operator to equipment they haven't been qualified on. Either wait for the qualified operator, find another qualified operator (even if from another shift), or negotiate a delivery extension. An undertrained operator on complex equipment is a safety and quality risk", "Let the new operator try — they'll learn on the job", "Have the new operator watch YouTube tutorials on 5-axis machining", "Ask the programmer to simplify the program for 3-axis capability"], correct: 0, explanation: "Operator competency requirements are both a safety and quality issue. AS9100 requires documented operator qualification for specific processes and equipment.", category: "Operator Qualification", difficulty: "critical" },
    { question: "SCENARIO: Production on a batch of 500 parts is at part 250 when the raw material supplier issues a recall notice for the material heat number you're using. The notice says potential contamination 'affecting up to 5% of the batch.' What's your response?", options: ["Continue — 95% is likely fine", "Finish the batch and do 100% final inspection", "Just inspect the completed parts more carefully", "STOP production immediately. Quarantine all 250 completed parts AND remaining raw material. Notify QE for disposition. Contact the supplier for details. You cannot ship parts made from recalled material without formal resolution, even if the contamination probability is low"], correct: 3, explanation: "Material recall requires immediate production stop and quarantine. 'Up to 5%' means you don't know which parts are affected. Continuing production adds to the quarantine liability.", category: "Material Recall", difficulty: "critical" },
    { question: "SCENARIO: Two operators disagree about the correct work coordinate system (WCS) offset for a job. The process sheet says G54, Operator A set G54, Operator B insists the last time this job ran, G55 was used successfully. Both show you convincing evidence. How do you resolve this?", options: ["Go with the more experienced operator", "The process sheet is the authority — G54 as documented. If G55 was used previously, it was either a deviation that should have been documented or the process sheet was wrong. Either way, follow the current released process sheet and flag the discrepancy for PE review", "Try both and see which produces correct parts", "Let them alternate between G54 and G55"], correct: 1, explanation: "The released process sheet is the single source of truth. Previous undocumented deviations don't establish precedent. The discrepancy must be investigated and formally resolved.", category: "Process Adherence", difficulty: "scenario" },
    { question: "SCENARIO: A critical job requires a specific cutting tool that just broke. The tool crib doesn't have a replacement, and the supplier quotes 5-day delivery. Rush delivery (1 day) costs 4x the normal price. The job has a 3-day delivery deadline. What do you do?", options: ["Wait 5 days and negotiate a delivery extension", "Cancel the job and apologize to the customer", "Use a different tool from the crib without asking anyone", "Order the rush tool AND simultaneously: check if other machines have the same tool that could be borrowed, check sister companies/local suppliers for immediate availability, and evaluate whether a slightly different tool could work with PE approval. Present all options with cost/time tradeoffs to management"], correct: 3, explanation: "Crisis response requires exploring all parallel paths simultaneously, not sequential problem-solving. The PM must generate options and present trade-offs for decision-making.", category: "Crisis Management", difficulty: "scenario" },
    { question: "SCENARIO: You notice that Machine 4 consistently takes 20% longer than estimated cycle times for a particular job. The programmer says the feeds and speeds are optimized. The operator says the machine runs fine. Parts are within tolerance. Where's the hidden inefficiency?", options: ["Accept it — 20% is within normal variation", "Blame the programmer's time estimate", "Investigate systematically: compare actual vs. programmed feed rates (machine may be override-reduced), check for excessive rapid traversal distances, evaluate tool change sequences, verify the program doesn't have unnecessary safety retracts, and check if the machine's acceleration parameters are reduced from standard settings", "Tell the operator to run it faster"], correct: 2, explanation: "Consistent cycle time discrepancies have specific technical causes. The PM must drive root cause investigation rather than accepting the discrepancy or placing blame.", category: "Continuous Improvement", difficulty: "scenario" },
    { question: "SCENARIO: You have 8 active jobs, each with different QCP inspection frequencies. Two jobs require 100% in-process inspection by QE, which creates a bottleneck because QE is shared across all jobs. How do you manage the scheduling conflict?", options: ["Ask QE to just inspect faster", "Skip in-process and catch everything at final inspection", "Reduce the inspection frequency on one job to ease the burden", "Coordinate production scheduling with QE inspection availability. Stagger the 100% inspection jobs so they don't overlap at the inspection station. Batch parts at hold points so QE can inspect multiple parts efficiently. This is a scheduling constraint, not a quality problem to shortcut"], correct: 3, explanation: "QE inspection capacity is a production constraint that must be scheduled like machine time. The PM must coordinate production flow with quality resource availability.", category: "Quality-Production Interface", difficulty: "scenario" },
    { question: "SCENARIO: It's Friday afternoon. A critical aerospace job is 95% complete. The last operation is a finish pass that takes 2 hours. Your best operator is available but their calibrated micrometer needs recalibration (due today). The next available calibrated micrometer is on a different shift (Monday). Can you proceed?", options: ["Yes — the micrometer is probably still accurate", "Run the last pass without measurement and inspect Monday with a calibrated tool", "No. An expired calibration instrument cannot be used for aerospace parts. Options: find another calibrated instrument of the same type, get the current one emergency-calibrated if your calibration lab can do same-day, or wait until Monday with a calibrated instrument. Never use expired calibration equipment", "Use the operator's personal micrometer instead"], correct: 2, explanation: "Using instruments with expired calibration on aerospace parts violates AS9100 and invalidates any measurements taken. The PM must find a solution that maintains calibration compliance.", category: "Metrology Compliance", difficulty: "critical" },
    { question: "SCENARIO: During a production run, the coolant system fails on a machine running an aluminum job. The operator continues dry-cutting for 10 minutes before reporting it, producing 5 parts. The parts measure within tolerance. Can these parts be used?", options: ["Yes — they measure fine", "Scrap them immediately without investigation", "Only if the customer doesn't ask about coolant usage", "Not automatically. Dry-cutting aluminum can cause surface temper changes, embedded chips, and microstructural damage that dimensional measurements won't detect. QE must assess: is surface integrity specification met? Are there thermal discoloration or work-hardening concerns? The process deviation must be documented even if parts ultimately pass"], correct: 3, explanation: "Dimensional compliance doesn't prove process compliance. Dry cutting may cause metallurgical changes, surface damage, and residual stress that aren't captured by dimensional inspection.", category: "Process Deviation", difficulty: "critical" },
    { question: "SCENARIO: You're planning next week's production schedule. Machine 2 needs a planned maintenance PM on Wednesday (4 hours). You have a job on Machine 2 that's continuous from Monday through Friday. Do you reschedule the maintenance to the following week?", options: ["Yes — the job is more urgent than maintenance", "Ask maintenance to do a quick inspection instead of full PM", "No. Planned maintenance prevents unplanned breakdowns that cost far more than 4 hours. Schedule the production run around the maintenance window. If the job can't tolerate a 4-hour interruption, split it or find an alternative machine for Wednesday's portion", "Do maintenance at night while the machine is idle"], correct: 2, explanation: "Skipping planned maintenance to maintain production is a false economy. Unplanned breakdowns from deferred maintenance cause far greater schedule disruption and potential quality issues.", category: "Maintenance Planning", difficulty: "scenario" },
    { question: "SCENARIO: Three different shift supervisors report the same issue over three shifts: operators are spending excessive time searching for tools in the tool crib. Each setup takes 30 minutes longer than planned due to tool retrieval. What's the PM's systemic fix?", options: ["Tell operators to be more organized", "Assign one operator to manage the tool crib full-time", "Add more shelves to the tool crib", "Implement a tool kitting system: pre-stage all tools required for each job in a labeled kit before the job reaches the machine. This eliminates search time, verifies tool availability before the machine is needed, and catches missing/worn tools before they delay production"], correct: 3, explanation: "Systemic problems need systemic solutions. Tool kitting eliminates the root cause (searching) rather than treating the symptom (slow searching).", category: "Lean Manufacturing", difficulty: "scenario" },
    { question: "SCENARIO: A customer requests expediting their order by 1 week. The PM can accommodate this by pulling the job forward, but this pushes another customer's job back by 3 days. Both customers are equally important. Who makes the decision to accept the expedite?", options: ["PM decides independently based on production logic", "PM presents the trade-off to PJM/CE with impact analysis for both customers. The business impact (contractual, financial, relationship) of the trade-off determines the decision — this is a commercial decision informed by production data, not a unilateral PM choice", "Accept the expedite since the customer asked first", "Reject all expedite requests to maintain schedule integrity"], correct: 1, explanation: "Schedule changes that affect other customers are business decisions, not production decisions. The PM provides impact analysis but CE/PJM make the commercial judgment.", category: "Stakeholder Management", difficulty: "scenario" },
    { question: "SCENARIO: A new CNC machine has just been installed and validated by maintenance. The PM wants to start production on it immediately with a critical aerospace job. What prerequisite must be satisfied before any production parts are made?", options: ["Maintenance validation is sufficient — start production", "Run a few test parts and check dimensions visually", "The machine must complete a formal Machine Capability Study (Cpk analysis) on representative features to prove it can hold the required tolerances under production conditions. Maintenance validation confirms the machine works; capability study confirms it works well enough for your specifications", "Only the programmer needs to verify the machine is ready"], correct: 2, explanation: "Machine installation qualification differs from production capability. A new machine may function correctly but not hold the tight tolerances required for aerospace work without process optimization.", category: "Machine Qualification", difficulty: "critical" },
  ],
  pjm: [
    { question: "What phases does the Project Manager coordinate across in the 11-phase production flow?", options: ["Only Phase 7 (Production Run)", "Phases 1 (Order Release), 2 (Manufacturing Strategy), 8 (Outsource Management), 10 (Documentation), and 11 (Dispatch) — the project coordination touchpoints", "Only Phase 8 (Outsource Management)", "All 11 phases with equal involvement"], correct: 1, explanation: "The PJM coordinates across key integration points: order intake, strategy, outsource management, documentation completion, and dispatch. Day-to-day production is PM's domain.", category: "Scope", difficulty: "standard" },
    { question: "What should the PJM do when PE identifies a delivery risk during strategy creation?", options: ["Ignore it until it becomes a real delay", "Track the risk in the project risk register, coordinate mitigation actions across functions (PE, PM, CE, Procurement), and proactively communicate the risk and mitigation plan to stakeholders", "Cancel the project immediately", "Only inform the customer after the delay occurs"], correct: 1, explanation: "The PJM owns the risk register and coordinates cross-functional mitigation. Risks must be tracked, mitigated, and communicated proactively — not reactively.", category: "Risk Management", difficulty: "standard" },
    { question: "How does the PJM's resource conflict resolution differ from the PM's?", options: ["The PM manages machine and operator allocation within the production schedule. The PJM resolves conflicts that span multiple projects, departments, or stakeholders — higher-level prioritization and cross-project trade-offs", "They handle the same conflicts in the same way", "PJM overrides PM decisions", "PJM handles only outsource-related conflicts"], correct: 0, explanation: "PM handles tactical resource allocation within production. PJM handles strategic resource conflicts across projects, considering portfolio-level priorities and business impact.", category: "Resource Management", difficulty: "standard" },
    { question: "Why must the PJM maintain a consolidated project status dashboard rather than relying on individual function reports?", options: ["To have something to show in meetings", "Because individual function reports only show part of the picture. Only a consolidated view reveals cross-project dependencies, shared resource conflicts, and how delays in one project cascade to others", "Individual reports are always accurate and sufficient", "The PJM doesn't need to know production details"], correct: 1, explanation: "Cross-project visibility is the PJM's unique value. No individual function sees the portfolio-level interactions that the PJM must manage.", category: "Portfolio Management", difficulty: "standard" },
    { question: "What is the PJM's role during a customer audit preparation?", options: ["PJM is not involved in audits", "Coordinate audit preparation across all functions: ensure documentation is complete, quality records are accessible, process adherence evidence is current, corrective actions from previous audits are closed, and that the right people are available during the audit", "Only QE prepares for audits", "PJM schedules the audit date and nothing else"], correct: 1, explanation: "Audit preparation is a cross-functional coordination challenge — exactly the PJM's domain. No single function can prepare independently for a comprehensive audit.", category: "Audit Coordination", difficulty: "standard" },
    { question: "How does the PJM differentiate between a project risk and a project issue?", options: ["They are the same thing", "Issues are more severe than risks", "A risk is a potential future event that may impact the project; an issue is a risk that has materialized and is currently affecting the project. Risks get mitigation plans; issues get resolution actions with defined owners and deadlines", "Risks only apply to schedule, issues apply to quality"], correct: 2, explanation: "The distinction determines the response: risks need proactive mitigation (before they happen), issues need reactive resolution (they're already happening). Treating them the same leads to mismanaged responses.", category: "Risk vs Issue", difficulty: "standard" },
    { question: "What information should the PJM capture in a lessons-learned review after project completion?", options: ["Only what went wrong", "What went well (to replicate), what went wrong (to prevent), root causes (not just symptoms), quantified impact of issues (cost, time), and specific process improvement recommendations with assigned owners", "Only schedule adherence data", "Lessons learned are unnecessary for manufacturing projects"], correct: 1, explanation: "Comprehensive lessons learned drive continuous improvement. Focusing only on failures misses opportunities to replicate successes.", category: "Continuous Improvement", difficulty: "standard" },
    { question: "Why is the PJM responsible for ensuring outsource timeline accuracy rather than leaving it entirely to PE?", options: ["PE is too busy for timeline tracking", "PJM has better supplier relationships", "Because outsource timelines affect multiple concurrent projects. The PE focuses on one job's outsource requirements; the PJM sees how outsource delays for one project cascade into resource and schedule conflicts across the portfolio", "PE's estimates are always wrong"], correct: 2, explanation: "The PJM provides portfolio-level visibility. One supplier's delay may affect only one PE's job but could cascade through three of the PJM's projects.", category: "Outsource Management", difficulty: "standard" },
    { question: "SCENARIO: You're managing 4 concurrent projects. Project A's outsource supplier just went bankrupt mid-process. Parts are 60% complete at their facility. What's your immediate action plan?", options: ["Wait and see if another company acquires the supplier", "Sue the supplier and wait for resolution", "Cancel Project A and focus on the other three", "Execute in parallel: (1) Legal team assesses parts recovery from the bankrupt facility, (2) SQE identifies and pre-qualifies backup suppliers, (3) PE evaluates if partial work can be salvaged, (4) Update all project timelines for cascade impact, (5) CE notifies affected customers with revised delivery estimates"], correct: 3, explanation: "Crisis management requires parallel action streams, not sequential response. The PJM coordinates simultaneous technical, commercial, legal, and communication workstreams.", category: "Crisis Management", difficulty: "critical" },
    { question: "SCENARIO: Two PEs disagree about the manufacturing approach for a complex part. PE-1 wants 5-axis milling (fewer setups, tighter tolerances), PE-2 wants multi-setup 3-axis (known capability, lower risk). Deadline is tight. How do you resolve this?", options: ["Go with the cheaper option to save money", "Facilitate a structured technical review: compare both approaches against quality risk, schedule risk, machine availability, historical data from similar jobs, and operator skill availability. Document the decision rationale and ensure both PEs agree on the chosen path", "Let the senior PE override the junior PE", "Tell them to compromise with a hybrid approach"], correct: 1, explanation: "The PJM facilitates data-driven decisions using cross-functional input. The decision must be based on evidence and documented for future reference.", category: "Technical Facilitation", difficulty: "scenario" },
    { question: "SCENARIO: A customer audit is scheduled in 2 weeks. You discover that 3 of your 12 active jobs have incomplete documentation (missing process sheets, unsigned QCPs). What do you prioritize?", options: ["Fix only the documentation for jobs the auditor will likely review", "Complete the documentation after the audit", "Ask to postpone the audit by 2 weeks", "Create a documentation catch-up plan for ALL 12 jobs: (1) Identify every documentation gap, (2) Assign owners with daily deadlines, (3) Prioritize audit-scope jobs but address all gaps, (4) Implement daily progress tracking. Systemic gaps need systemic fixes"], correct: 3, explanation: "Documentation gaps are systemic process failures. Fixing only audit-visible jobs creates a facade that collapses under scrutiny and doesn't address the root cause.", category: "Audit Readiness", difficulty: "scenario" },
    { question: "SCENARIO: Project A (80% complete) and Project B (20% complete) share a critical programmer. Project A needs 3 more programming days. Project B needs the programmer to start this week or it'll miss its CEDD. Both customers are important. How do you allocate the programmer?", options: ["Finish Project A since it's almost done", "Analyze the true impact: Project A at 80% may have remaining tasks that don't require programming. Project B's programming might only need a 1-day start to avoid blocking downstream work. Look for partial allocation (split the programmer's week) or find if another programmer can handle either project", "Split the programmer 50/50 and let both projects slip equally", "Tell Project B's customer to expect a delay"], correct: 1, explanation: "Binary either/or thinking wastes options. The PJM should analyze task dependencies to find creative allocations that serve both projects.", category: "Resource Optimization", difficulty: "scenario" },
    { question: "SCENARIO: Three projects have outsource processes returning from the same supplier in the same week. Your incoming inspection QE is already at capacity. What's your proactive management approach?", options: ["Deal with it when the parts arrive", "Ask QE to work overtime that week", "Coordinate with the supplier to stagger deliveries across the week rather than all arriving Monday. Alert QE in advance to schedule inspection capacity. Identify if any returned parts can be inspected by a second qualified QE. Prepare inspection documentation in advance", "Accept the parts without incoming inspection"], correct: 2, explanation: "Proactive PJM management means anticipating resource bottlenecks and coordinating across suppliers, QE, and project schedules to smooth the workload.", category: "Bottleneck Prevention", difficulty: "scenario" },
    { question: "SCENARIO: A key stakeholder (VP of Operations) asks you to provide a 'simple one-page status update' for 8 concurrent projects. Each project has different phases, risks, and issues. How do you structure this without losing critical information?", options: ["List project names and 'on track' or 'delayed' for each", "Create a dashboard with: RAG status (Red/Amber/Green) per project, key risk/issue count, % completion, next milestone date, and a 'management attention required' flag for items needing decision or escalation. One page forces prioritization of what leadership needs to act on", "Write a detailed report and hope they read it all", "Tell them 8 projects can't fit on one page"], correct: 1, explanation: "Executive communication requires distillation, not dilution. RAG status with escalation flags gives leadership actionable visibility without information overload.", category: "Stakeholder Communication", difficulty: "scenario" },
    { question: "SCENARIO: Project A has been consistently slipping milestones by 2-3 days. No single issue is critical — just minor cumulative delays. The customer hasn't noticed yet because final delivery is still 4 weeks away. Should you act now?", options: ["Yes. Cumulative minor slippage is a pattern indicating systemic issues (resource constraints, process inefficiencies, or scope creep). Investigate root causes now while there's buffer. Left unaddressed, the pattern accelerates and buffer erodes until the delivery date is at risk", "No — there's plenty of buffer and the customer isn't concerned", "Wait until the delays total 1 week, then escalate", "Only act if the customer asks about progress"], correct: 0, explanation: "Schedule erosion is logarithmic — small delays compound into large delays. The PJM must intervene when patterns emerge, not when they become crises.", category: "Schedule Management", difficulty: "critical" },
    { question: "SCENARIO: You receive notification that a NADCAP-certified supplier you use across 5 active projects has had their accreditation suspended. Four projects have already used this supplier for completed processes. One project's parts are currently at the supplier. What's the cascade impact?", options: ["Only the project with parts currently at the supplier is affected", "ALL five projects are potentially affected. For completed processes: verify that work was done while accreditation was valid (date check). For parts currently at supplier: STOP processing and evaluate alternatives. For future projects: identify and qualify alternative suppliers. Communicate impact across all affected customer programs", "Suspend all 5 projects until the supplier regains accreditation", "Only notify customers whose parts are currently at the supplier"], correct: 1, explanation: "NADCAP suspension triggers a comprehensive review. Completed work validity depends on processing dates vs. suspension dates. The PJM must map the full impact across the portfolio.", category: "Supplier Risk Cascade", difficulty: "critical" },
    { question: "SCENARIO: A customer requests a mid-project design change that affects 3 of your 8 active projects (same customer, related assemblies). The change impacts strategy sheets, programming, QCPs, and material for all three. How do you coordinate the change implementation?", options: ["Let each PE handle their own project's changes independently", "Implement the change on one project first as a trial", "Reject the change as too disruptive", "Coordinate a unified change implementation: single change impact assessment across all 3 projects, synchronized strategy sheet updates, aligned programming changes, QCP revision coordination, and consolidated customer communication. Independent implementation risks inconsistencies across related assemblies"], correct: 3, explanation: "Cross-project changes affecting related assemblies must be coordinated to ensure consistency. Independent implementation by each PE risks incompatible changes across mating parts.", category: "Change Coordination", difficulty: "scenario" },
    { question: "SCENARIO: Your monthly project review reveals that material procurement has been the leading cause of delays across 6 of 8 projects over the past quarter. Procurement blames suppliers; suppliers cite industry-wide shortages. What's the PJM's strategic response?", options: ["Add more buffer time to future project schedules", "Accept material delays as industry reality", "Tell procurement to find better suppliers", "Initiate a process improvement project: analyze the specific material types causing delays, evaluate strategic stock holdings for critical materials, assess supplier diversification opportunities with SQE, and propose a material risk management process that starts at quotation stage — not after order receipt"], correct: 3, explanation: "Systemic delay patterns need strategic solutions, not schedule padding. The PJM drives cross-functional improvement initiatives that address root causes.", category: "Strategic Improvement", difficulty: "scenario" },
    { question: "SCENARIO: You're closing out a project that had 3 NCRs, 2 delivery delays, and 1 customer complaint during execution. The customer accepted all parts and paid in full. The PE says the project was 'successful.' Do you agree?", options: ["Yes — the customer paid and accepted parts, so it's successful", "Only conduct a review if the customer requests one", "No — 3 NCRs means it failed", "Partially. Commercially successful, but operationally flawed. The lessons-learned review must analyze: root causes of each NCR, why delays occurred, what triggered the complaint, cost of quality (rework, expediting, concession processing), and what process changes prevent recurrence"], correct: 3, explanation: "Project success has multiple dimensions. Commercial completion doesn't mean operational excellence. The PJM must drive improvement even from 'successful' projects.", category: "Project Closure", difficulty: "critical" },
    { question: "SCENARIO: Two of your projects depend on the same QE for first part approval. Both projects reach their first part stage simultaneously next Tuesday. The QE can only approve one at a time (each takes ~2 hours). How do you prevent this from becoming a bottleneck?", options: ["Let them queue up naturally — 2 hours isn't a big deal", "Plan ahead: identify the scheduling conflict before Tuesday, coordinate with PM to stagger first part timings by even a few hours, confirm QE availability and sequence, and have a backup QE identified in case of illness or emergency", "Ask QE to rush through both approvals simultaneously", "Skip first part approval on the less critical project"], correct: 1, explanation: "Foreseeable resource conflicts should be resolved through proactive scheduling, not reactive queuing. The PJM's value is anticipating and preventing bottlenecks.", category: "Proactive Management", difficulty: "scenario" },
    { question: "SCENARIO: A customer asks for weekly progress reports on their critical project. Your internal project reviews are monthly. How do you bridge this gap without creating excessive overhead?", options: ["Establish a lightweight weekly reporting cadence specific to this customer: key milestones status, immediate risks, next week's planned activities, and any decisions needed. This is different from your internal review format — customer communication should be outcome-focused, not process-focused", "Send the internal monthly report weekly with minor updates", "Ask the customer to accept monthly reports instead", "Have CE summarize the monthly report weekly"], correct: 0, explanation: "Customer-facing reporting must be tailored to their needs and focused on outcomes, not internal processes. The PJM creates appropriate communication channels.", category: "Customer Reporting", difficulty: "scenario" },
    { question: "SCENARIO: Your organization is implementing a new ERP system mid-year. You have 12 active projects that started under the old system. How do you manage the transition without losing project data or continuity?", options: ["Switch everything to the new system on go-live date", "Develop a transition plan: complete critical milestones in the old system before migration, establish data mapping between old and new systems, run parallel tracking during transition period, identify and train project team on new system, and establish fallback procedures if the new system has issues", "Keep using the old system for current projects and only use new system for future projects", "Let IT handle the transition — it's not a project management concern"], correct: 1, explanation: "System transitions affect every active project. The PJM must manage the transition as a project in itself with defined milestones, risk mitigation, and fallback plans.", category: "Change Management", difficulty: "critical" },
    { question: "SCENARIO: A customer's technical representative wants to attend a first article inspection at your facility. The QE says this is unprecedented and potentially disruptive. What's your position?", options: ["Refuse — customers shouldn't be on the shop floor", "Only allow virtual attendance via video call", "Let the customer attend without any preparation", "Welcome the visit with proper preparation: coordinate logistics with QE, ensure the inspection area is presentable, prepare documentation for review, brief the QE on what the customer representative may want to see, and treat it as a relationship-building opportunity while maintaining your inspection process integrity"], correct: 3, explanation: "Customer witness points are common in aerospace. The PJM coordinates the logistics to ensure a professional experience that builds confidence without disrupting operations.", category: "Customer Relations", difficulty: "scenario" },
    { question: "SCENARIO: You identify that your organization has no formal process for handling customer-furnished material (material provided by the customer for machining). Three upcoming projects involve customer-furnished material. What should you establish?", options: ["Handle it the same as purchased material", "Refuse customer-furnished material", "Ask each PE to handle their own customer material", "Establish a customer-furnished material process: receiving inspection protocol, segregated storage with customer identification, traceability requirements (different from purchased material), liability framework if material is damaged during processing, return/disposition procedures for excess material, and insurance considerations"], correct: 3, explanation: "Customer-furnished material has different traceability, liability, and handling requirements than purchased material. The PJM identifies process gaps and drives their resolution.", category: "Process Development", difficulty: "critical" },
    { question: "SCENARIO: During a portfolio review, you notice that 4 of 8 active projects have the same PE assigned, and that PE is a single point of failure — no backup PE is familiar with those jobs. What risk mitigation action do you take?", options: ["Implement a PE cross-training program: ensure at least one backup PE has sufficient familiarity with each project's strategy sheet, customer requirements, and current status. Create standardized handover documentation so any qualified PE could step in with minimal ramp-up time", "Hope the PE doesn't get sick", "Redistribute the projects immediately to balance workload", "This is an HR issue, not a project management concern"], correct: 0, explanation: "Single points of failure are project risks. The PJM proactively mitigates key-person dependencies through cross-training and documentation standardization.", category: "Risk Mitigation", difficulty: "scenario" },
  ],
  prog: [
    { question: "What must be reviewed and understood in full before starting any programming work?", options: ["The Manufacturing Strategy Sheet — including datum scheme, setup sequence, fixturing requirements, and any special notes from the PE", "Only the customer drawing dimensions", "Just the material type and stock size", "Only the tolerances that appear tight"], correct: 0, explanation: "The programmer must understand the complete strategy sheet, not just dimensions. Datums, fixtures, and setup sequence are critical programming inputs.", category: "Pre-Programming", difficulty: "standard" },
    { question: "What is the correct job numbering format and where must it appear?", options: ["Any format chosen by the programmer", "Sequential numbers assigned by the ERP system", "Customer PO number is used as the job number", "123XX2613 (Serial-Account-Year-Month-Day) — must appear on every shop floor drawing, process sheet, and setup folder"], correct: 3, explanation: "The 123XX2613 format ensures unique job identification with embedded context. It must appear consistently across all documentation.", category: "Standards", difficulty: "standard" },
    { question: "What must every setup folder contain as a minimum?", options: ["Only the CNC program file (G-code)", "A screenshot of the CAM toolpath", "A Process Sheet containing program names, complete tool list with specifications, Work Coordinate System (WCS) definition, fixturing instructions, key dimensions to monitor, and quality hold points", "Just a note saying which machine to use"], correct: 2, explanation: "The process sheet is the operator's complete reference. Without it, operators must guess at critical parameters, leading to errors.", category: "Documentation", difficulty: "standard" },
    { question: "Why is simulation mandatory before releasing a program, even for simple parts?", options: ["Because simulation catches tool collisions, rapid move interference, incorrect retract heights, and workholding clearance issues that would cause crashes, tool breakage, or scrapped parts on the actual machine", "Simulation is optional for experienced programmers", "Simulation is only required for 5-axis programs", "The operator can catch issues during the first part"], correct: 0, explanation: "Simulation prevents costly machine crashes and scrapped parts. Even experienced programmers cannot visualize every rapid move and retract path mentally.", category: "Simulation", difficulty: "standard" },
    { question: "What is the critical difference between programming to a drawing dimension and programming to a datum-referenced tolerance?", options: ["There's no difference — dimensions are dimensions", "Datum-referenced tolerances (GD&T) require the program's WCS to align with the datum reference frame. If the WCS doesn't match the datum scheme, parts may measure correctly on the machine but fail GD&T inspection because they were measured from a different reference", "Datum references only matter for inspection, not programming", "The CAM software handles datum references automatically"], correct: 1, explanation: "WCS alignment with the datum scheme is fundamental. Misaligned WCS produces parts that appear correct during in-process checks but fail formal GD&T inspection.", category: "GD&T Programming", difficulty: "standard" },
    { question: "Why must the programmer specify safe retract heights and clearance planes rather than relying on CAM software defaults?", options: ["CAM defaults are always safe enough", "The operator adjusts retract heights on the machine", "Retract heights only matter for 5-axis machines", "Because CAM defaults don't know about workholding geometry, fixture heights, clamps, or adjacent part features. Default retract heights can cause collisions with fixtures, vises, or uncut stock that the software model doesn't include"], correct: 3, explanation: "CAM software models the part geometry but often lacks fixture, clamp, and workholding detail. The programmer must define safe clearances based on actual setup conditions.", category: "Safety", difficulty: "standard" },
    { question: "What information must the process sheet include at each quality hold point?", options: ["Just 'inspect part'", "Hold point times are determined by the operator", "Specific instruction: what to measure, what instrument to use, what tolerance to check, and explicit instruction to STOP production and wait for QE approval before continuing. The operator must know exactly what's expected and that proceeding without approval is a violation", "Quality hold points are only on the QCP, not the process sheet"], correct: 2, explanation: "The process sheet is what the operator reads. If hold points aren't explicitly called out with specific instructions, they won't be followed. The QCP defines them; the process sheet communicates them to the floor.", category: "Documentation", difficulty: "standard" },
    { question: "When the strategy sheet specifies a specific cutting tool (e.g., 'Use Sandvik CoroMill 390 for facing'), can the programmer substitute an equivalent tool from a different manufacturer?", options: ["Yes — equivalent tools produce equivalent results", "Not without PE approval. The PE specified that tool for a reason — cutting forces, surface finish characteristics, and tool life data from previous jobs. Substitution may produce dimensionally correct parts with incorrect surface finish, residual stress, or reduced tool life", "The programmer decides all tooling independently", "Only if the substitute is cheaper"], correct: 2, explanation: "Tool specifications on the strategy sheet are engineering decisions, not suggestions. Substitution requires PE review because different tools have different cutting characteristics even at identical dimensions.", category: "Tool Selection", difficulty: "standard" },
    { question: "SCENARIO: You're programming Setup 2 for a titanium part. The strategy sheet says use Datum A (bottom face), but you realize using Datum B (a bore) would be easier to program and save 30 minutes of cycle time. What do you do?", options: ["Use Datum B — you know better than the strategy sheet", "STOP. Contact PE to discuss. Datum A was chosen to align with the inspection datum scheme. Changing to Datum B means inspection measurements reference a different frame, potentially causing parts to pass in-process but fail final CMM inspection", "Program to both datums and let the operator choose", "Use Datum B but set the WCS to make it look like Datum A"], correct: 1, explanation: "Datum changes affect everything downstream — fixtures, inspection reference frames, and traceability. Saving 30 minutes of programming could cost days of rework.", category: "Datum Management", difficulty: "critical" },
    { question: "SCENARIO: During simulation, you notice a potential tool collision during a retract move. The tool clearance from the fixture is 0.5mm. The simulation shows no actual contact. Is this acceptable?", options: ["Yes — simulation confirms no collision at 0.5mm clearance", "It's fine for production — simulation accounts for all variables", "Run the program slowly on the first part to verify", "NO. 0.5mm is dangerously inadequate. Real-world variables — stock size variation (±0.5mm typical), thermal expansion (titanium grows ~0.01mm/°C), fixture deflection under cutting loads, and machine positioning accuracy — can consume that clearance. Reprogram with minimum 5mm clearance"], correct: 3, explanation: "Simulation models ideal conditions. Real manufacturing has variations in stock size, thermal state, fixture condition, and machine accuracy that simulation doesn't capture.", category: "Safety Clearance", difficulty: "scenario" },
    { question: "SCENARIO: You're creating the process sheet for Setup 3 (final setup). The QCP requires first part CMM inspection at this setup. How does this affect your process sheet?", options: ["No impact — QC handles their own inspection scheduling", "Write 'call QE' in small print at the bottom", "Insert a mandatory HOLD POINT after the first part completes: 'STOP PRODUCTION — FIRST PART CMM INSPECTION REQUIRED. DO NOT CONTINUE UNTIL QE PROVIDES WRITTEN APPROVAL.' The operator must see this clearly on the process sheet", "CMM inspection is only performed at final inspection, not per setup"], correct: 2, explanation: "If the hold point isn't explicitly and prominently called out on the process sheet, operators will proceed past it. The QCP requirement must be translated into an actionable floor instruction.", category: "Hold Points", difficulty: "scenario" },
    { question: "SCENARIO: You notice the strategy sheet references Rev C of the drawing, but the latest drawing in your CAM folder is Rev B. A colleague says they heard Rev C 'only changes the title block.' What do you do?", options: ["Program to Rev B since the changes are probably cosmetic", "Ask the operator to check which revision looks correct", "Program to Rev B and update later when Rev C arrives", "STOP. Do not program until you have Rev C in hand and have verified the differences yourself. Title block changes often accompany undisclosed dimensional changes. Never rely on hearsay about revision content"], correct: 3, explanation: "Revision hearsay is dangerous. 'Only title block changes' is a common assumption that has caused entire batches to be scrapped when undisclosed dimensional changes were missed.", category: "Revision Control", difficulty: "critical" },
    { question: "SCENARIO: You're programming a deep pocket (50mm deep, 15mm wide) in hardened steel. Your standard roughing approach uses trochoidal milling at full depth. During simulation, you notice excessive tool deflection warnings. What's your technical response?", options: ["Ignore the warnings — simulation is conservative", "Use a smaller tool to reduce cutting forces", "Implement a step-down strategy: reduce axial depth of cut to manage deflection, increase tool engagement gradually, consider a more rigid tool (shorter stick-out or larger core), and optimize feeds/speeds for the modified strategy. Update cycle time estimate and inform PM", "Maximum depth is always fine with trochoidal milling"], correct: 2, explanation: "Tool deflection causes dimensional errors, poor surface finish, and tool breakage. The programmer must balance productivity with tool rigidity through appropriate depth-of-cut and engagement strategies.", category: "Process Optimization", difficulty: "scenario" },
    { question: "SCENARIO: The strategy sheet calls for a specific coolant-through tool for a deep drilling operation. Your CAM system doesn't have this tool in its library. What's the correct approach?", options: ["Use a standard drill and increase peck depth to compensate", "Program the hole as a boring operation instead", "Use the closest available tool in the library", "Create the tool in the CAM library with exact specifications (geometry, length, flute count, coolant hole diameter), verify the toolpath models the through-coolant correctly, and ensure the CNC program includes the coolant-through activation code (M-code). Test simulation with the correct tool geometry"], correct: 3, explanation: "Coolant-through tools have specific geometry and require specific machine codes to activate through-spindle coolant. Using a standard drill for a deep hole operation designed for coolant-through risks chip evacuation failure, tool breakage, and overheating.", category: "Tool Programming", difficulty: "scenario" },
    { question: "SCENARIO: You complete programming for all 4 setups. Setup 1 and 2 programs reference Work Coordinate G54. Setup 3 references G55. Setup 4 references G54 again. Is this WCS assignment scheme acceptable?", options: ["Potentially problematic. Reusing G54 for non-related setups (Setup 1/2 vs Setup 4) risks WCS confusion if an operator runs Setup 4 without updating G54 from the Setup 1/2 values. Either use unique WCS per setup (G54, G55, G56, G57) or ensure process sheets explicitly state WCS values for each setup", "Yes — as long as each setup has a defined WCS", "WCS assignment doesn't matter — the operator sets it", "Only the first setup needs a defined WCS"], correct: 0, explanation: "WCS reuse across non-sequential setups creates error opportunities. If an operator starts Setup 4 with Setup 2's G54 values still loaded, the first part will be scrap.", category: "WCS Management", difficulty: "critical" },
    { question: "SCENARIO: You're programming a part that requires thread milling for an M12x1.5 thread. The strategy sheet specifies thread class 6H (medium fit). Your CAM software offers both single-point threading and thread milling. The machine has both capabilities. Which method do you choose and why?", options: ["Thread milling for this application: it produces threads closer to the 6H tolerance window, allows compensation for tool wear through diameter offset adjustment, generates less cutting force (important for thin-walled sections), and if the tool breaks, the part is salvageable — unlike a broken tap stuck in the hole", "Single-point threading — it's faster", "Whichever the CAM default suggests", "It doesn't matter — both produce identical threads"], correct: 0, explanation: "Thread milling offers controllability, adjustability, lower force, and recoverability from tool failure. For precision threads in expensive parts, thread milling reduces risk.", category: "Process Selection", difficulty: "scenario" },
    { question: "SCENARIO: The process sheet you're creating requires the operator to flip the part between Setup 2 and Setup 3. How must you account for the flip in your programming and documentation?", options: ["Just note 'flip part' on the process sheet", "Document: exact flip orientation (which face goes where), new datum/WCS references after flip, any indicated features from Setup 2 that serve as Setup 3 datums, re-clamping instructions including torque specs if applicable, and any alignment verification steps the operator must perform before running Setup 3", "The operator knows how to flip parts", "Flip operations don't require documentation"], correct: 1, explanation: "Part flipping between setups is a critical transition where errors occur. The documentation must eliminate ambiguity about orientation, datums, and alignment.", category: "Setup Transitions", difficulty: "scenario" },
    { question: "SCENARIO: You receive a strategy sheet for a part requiring 5 setups. After programming Setups 1-3, you realize Setup 4 could be eliminated by incorporating its features into Setup 3 using a different tool approach. This would save significant time. What's your process?", options: ["Just merge the setups — fewer setups is always better", "Document your proposal with technical justification (time savings, quality comparison, risk assessment) and submit it to PE for review. The PE must evaluate impact on: datum references, inspection access, fixture loads, and tool engagement. If approved, PE updates the strategy sheet BEFORE you modify the program", "Implement the change and tell PE after the fact", "Keep all 5 setups since the strategy sheet is final"], correct: 1, explanation: "Setup consolidation is a legitimate optimization but changes the manufacturing process. The PE must evaluate downstream impacts and formally approve before the programmer implements.", category: "Process Optimization", difficulty: "critical" },
    { question: "SCENARIO: During programming, you identify that the surface finish requirement (Ra 0.4) on an internal bore cannot be achieved with the available boring bar at the programmed RPM (machine max is 6000 RPM, optimal for Ra 0.4 on this diameter is 8000 RPM). What do you do?", options: ["Program at 6000 RPM and hope the finish is acceptable", "Flag this to PE immediately: the machine capability doesn't match the specification. Options include: different machine with higher RPM, different tooling approach (grinding instead of boring), outsourcing this operation, or requesting a concession from the customer on the finish requirement. This must be resolved before releasing the program", "Reduce the feed rate to compensate for lower RPM", "The operator can hand-polish to achieve the finish"], correct: 1, explanation: "Surface finish requirements that exceed machine capability must be flagged at programming stage, not discovered at inspection. The programmer is the first person who can identify this gap.", category: "Capability Assessment", difficulty: "critical" },
    { question: "SCENARIO: You're creating a program for an aluminum part that will be anodized after machining (outsource process). The drawing shows final dimensions (post-anodizing). Anodizing adds approximately 0.025mm per surface. How does this affect your programming?", options: ["Program undersize by the anodizing build-up amount on all surfaces that will be anodized. For a bore, machine it 0.025mm oversize per side (0.05mm on diameter) to achieve final drawing dimension after anodizing. Document the pre-anodizing target dimensions on the process sheet", "Program to the drawing dimensions — anodizing compensation is the supplier's responsibility", "Only compensate on external surfaces", "Anodizing doesn't change dimensions enough to matter"], correct: 0, explanation: "Anodizing builds up material on the surface. Failure to compensate means post-anodize dimensions will be oversized on external features and undersized on bores.", category: "Process Compensation", difficulty: "scenario" },
    { question: "SCENARIO: Your program uses adaptive/trochoidal roughing which generates large volumes of chips quickly. The machine's chip conveyor can handle standard milling but struggles with heavy roughing. What must you address in the process sheet?", options: ["Chip management is the operator's problem", "Just note 'heavy roughing' on the process sheet", "Include specific instructions for chip management: recommended chip conveyor speed setting, manual chip clearing intervals if needed, coolant flow rate for chip flushing, and a warning that chip accumulation around the workpiece can cause re-cutting (damaging surface finish and tools)", "Modern machines handle chips automatically"], correct: 2, explanation: "Chip management during aggressive roughing is critical. Re-cutting chips damages tools and surfaces. The programmer who knows the chip load must communicate management requirements.", category: "Process Instructions", difficulty: "scenario" },
    { question: "SCENARIO: You need to program a feature with a positional tolerance of 0.03mm true position relative to Datum A. Your machine's positioning accuracy specification is ±0.008mm per axis. Can this tolerance be reliably achieved?", options: ["It requires analysis: true position is a diametral zone, so the tolerance is effectively ±0.015mm from true position. With ±0.008mm per axis, the worst-case 2D positional error (both axes at maximum error) is √(0.008² + 0.008²) = 0.0113mm radius = 0.0226mm diameter. This is within 0.03mm but leaves only 0.004mm margin — which may be insufficient considering tool runout, thermal drift, and fixturing repeatability", "Yes — 0.008mm is well within 0.03mm", "No — the machine can't hit this tolerance at all", "Machine accuracy specs aren't relevant for programming decisions"], correct: 0, explanation: "Programmers must understand the relationship between machine capability and tolerance requirements. A theoretical capability analysis must include practical factors beyond just machine accuracy.", category: "Capability Analysis", difficulty: "critical" },
    { question: "SCENARIO: The strategy sheet calls for climb milling throughout the program. Your CAM software generates a toolpath that includes a conventional milling segment during a slot entry. Should you accept this?", options: ["Evaluate critically: conventional milling during slot entry may be necessary because climb milling into a full slot can grab the workpiece. However, the PE specified climb milling 'throughout.' Discuss with PE whether the slot entry exception is acceptable or if an alternative entry strategy (ramp, helix) should be used instead", "Yes — the CAM knows the best approach", "Override the CAM and force climb milling everywhere", "Slot entries don't matter — they're roughing moves"], correct: 0, explanation: "CAM-generated toolpaths sometimes conflict with strategy sheet specifications. The programmer must identify these conflicts and resolve them with PE rather than silently accepting or overriding.", category: "CAM Conflict Resolution", difficulty: "scenario" },
    { question: "SCENARIO: You're programming a part that was previously made successfully 2 years ago. The old program exists in the archive. The strategy sheet is new (updated by PE). Can you reuse the old program?", options: ["Yes — it worked last time, just load it and go", "Only if no dimensions changed", "The old program is a reference only. It must be validated against the NEW strategy sheet: datum scheme may have changed, tool specifications may differ, quality hold points may be updated, and machine assignments may vary. Program from the current strategy sheet using the old program only as a comparison reference", "The strategy sheet doesn't affect programming if the part geometry is the same"], correct: 2, explanation: "Strategy sheets evolve with lessons learned and process improvements. Old programs reflect old strategies that may have had issues. Always program to the current strategy.", category: "Program Reuse", difficulty: "critical" },
    { question: "SCENARIO: During programming, you realize the part requires machining from 6 sides (full 3D geometry), but the strategy sheet only defines 4 setups. The remaining 2 faces have features that cannot be reached from the defined setups. What do you do?", options: ["Skip the unreachable features and let the operator figure it out", "Contact PE immediately: the strategy sheet has a gap. Either additional setups are needed, the datum/fixturing scheme needs revision, or a different machine capability (5-axis) is required. This must be resolved before programming continues on any setup, as adding setups may change datum references for existing setups", "Add 2 more setups yourself without consulting PE", "Inform QE that those features can't be inspected"], correct: 1, explanation: "Strategy sheet gaps discovered during programming must be escalated immediately. Adding setups independently could conflict with the overall datum scheme and inspection plan.", category: "Strategy Gaps", difficulty: "critical" },
  ],
  ss: [
    { question: "What is the Shift Supervisor's primary responsibility on the production floor?", options: ["Programming CNC machines", "Placing material orders with suppliers", "Ensuring operators follow process sheets, monitoring production progress, and serving as the first-line escalation point for shop floor issues", "Direct communication with customers about their orders"], correct: 2, explanation: "The SS is the bridge between operators and management. They ensure process adherence, monitor progress, and escalate issues that operators can't resolve independently.", category: "Core Duty", difficulty: "standard" },
    { question: "When should a Shift Supervisor escalate an issue to the Production Manager?", options: ["Only at the end of the shift during handover", "Only for outsourced parts returning with issues", "Immediately when: a machine breaks down, a non-conformance is found, production deviates significantly from the schedule, a safety issue arises, or any quality gate is missed", "Only when the operator specifically asks for escalation"], correct: 2, explanation: "Immediate escalation prevents small problems from becoming large ones. The PM needs real-time visibility into significant shop floor events.", category: "Escalation", difficulty: "standard" },
    { question: "What must be included in a comprehensive shift handover?", options: ["Just a verbal summary of completed work", "Only the part count completed during the shift", "Written record of: current job status per machine, any in-progress issues or concerns, pending QC approvals, machine status (running/idle/down), tool condition notes, any deviations from schedule, and upcoming priorities for the next shift", "Only unresolved problems — completed work doesn't need reporting"], correct: 2, explanation: "Incomplete handovers cause next-shift operators to repeat work, miss issues, or make wrong assumptions. Written handovers prevent information loss.", category: "Handover", difficulty: "standard" },
    { question: "What authority does the Shift Supervisor have regarding quality decisions?", options: ["Full authority to accept or reject parts", "No authority — they must wait for QE", "The SS can STOP production for quality concerns and quarantine suspect parts, but CANNOT make accept/reject disposition decisions — that authority belongs to QE", "Same authority as QE during night shift"], correct: 2, explanation: "The SS has stop authority (protective) but not disposition authority (judgmental). Stopping production protects quality; disposition requires QE's expertise.", category: "Authority", difficulty: "standard" },
    { question: "Why must the Shift Supervisor verify that operators are using the correct revision of the process sheet?", options: ["Because outdated process sheets may reference superseded programs, wrong tools, incorrect WCS, or missing quality hold points. Running to an old process sheet is running to an old specification — parts may be scrapped", "Process sheet revisions don't change significantly", "The operator is responsible for their own process sheet", "Process sheets are checked only during audits"], correct: 0, explanation: "Process sheet revision control on the shop floor is a critical SS function. An operator running a superseded process sheet is manufacturing to the wrong specification.", category: "Document Control", difficulty: "standard" },
    { question: "What is the Shift Supervisor's role in maintaining the 5S system on the shop floor?", options: ["5S is a separate initiative unrelated to shift supervision", "The SS enforces 5S standards daily: clean workstations prevent contamination and FOD, organized tool stations prevent errors, systematic storage prevents mix-ups, and discipline ensures consistency across shifts", "5S only applies during customer audits", "Operators manage their own workstations without supervision"], correct: 1, explanation: "5S is an ongoing operational practice, not a periodic cleanup event. The SS is responsible for daily enforcement and consistency across shifts.", category: "Workplace Organization", difficulty: "standard" },
    { question: "How should the Shift Supervisor handle an operator who consistently meets quantity targets but frequently misses documentation requirements (not signing process sheets, skipping logbook entries)?", options: ["Focus on output — documentation is secondary", "Let QE catch it during final inspection", "Address it immediately: incomplete documentation is a quality system non-conformance regardless of output quality. Parts without proper documentation cannot be verified as conforming and may be rejected during audit. Issue formal guidance and verify compliance", "Only address it if an audit is coming"], correct: 2, explanation: "Documentation is not optional. Parts without signed process sheets, logbook entries, and inspection records lack evidence of conformance and are technically unverifiable.", category: "Compliance Management", difficulty: "standard" },
    { question: "What action should the Shift Supervisor take when they notice coolant levels are low on an active machine?", options: ["Top off the coolant and continue", "Wait for the operator to notice", "Coolant management is maintenance's responsibility", "Verify the coolant concentration and type are correct for the material being cut, top off with the correct mixture, check for leaks in the coolant system, and document the occurrence. Low coolant can cause thermal damage to parts, tool failure, and surface finish degradation"], correct: 3, explanation: "Low coolant risks part quality (thermal damage, surface finish), tool life, and even fire hazard on certain materials. The SS must ensure coolant systems are maintained.", category: "Machine Monitoring", difficulty: "standard" },
    { question: "SCENARIO: An operator tells you he's been running parts for 2 hours but forgot to do the first part inspection. He's made 30 parts and says they all 'look fine.' What do you do?", options: ["STOP production immediately. Quarantine ALL 30 parts. Call QE for batch disposition — this is a quality gate violation. Document the incident. All 30 parts have unknown quality status and must be formally inspected before any can be released", "If they look fine visually, continue production", "Do a quick measurement yourself and approve them", "Tell him to inspect the next part as a 'first part' and continue"], correct: 0, explanation: "Missing first part inspection means the entire manufacturing process was unvalidated. All parts have unknown quality status regardless of visual appearance.", category: "Quality Gate Violation", difficulty: "critical" },
    { question: "SCENARIO: It's 10 PM on night shift. Machine 3 starts making an unusual vibration noise but is still producing parts within tolerance. No maintenance staff available until morning. What do you do?", options: ["Keep running — if parts are in tolerance, the machine is fine", "Switch to a different, less demanding job on that machine", "Reduce the feed rate by 50% and keep running", "STOP the machine. Document the vibration characteristics (when it started, frequency, severity). Unusual vibration indicates potential spindle bearing, ball screw, or axis drive degradation. Running until failure risks catastrophic damage, operator safety issues, and batch-wide non-conformance from progressive degradation"], correct: 3, explanation: "Vibration changes are early warnings of mechanical failure. Running the machine risks catastrophic damage (far more costly than stopping), and parts made during degradation may have hidden quality issues.", category: "Machine Health", difficulty: "scenario" },
    { question: "SCENARIO: Two operators are assigned to the same machine (day/night shifts). The day operator made a tool offset change to compensate for tool wear and didn't document it. The night operator asks why the offsets don't match the process sheet. How do you handle this?", options: ["This is a process control failure. Immediately: (1) Verify current offset against process sheet requirements, (2) Inspect recent parts from both shifts to confirm they're in spec, (3) Document the offset change formally, (4) Establish a mandatory tool offset change log for this and all machines to prevent recurrence", "It's normal — operators adjust offsets for tool wear all the time", "Tell the night operator to reset to the process sheet values", "Just update the process sheet to match the current offset"], correct: 0, explanation: "Undocumented offset changes break the traceability chain between process instructions and actual manufacturing conditions. All offset changes must be documented.", category: "Process Control", difficulty: "scenario" },
    { question: "SCENARIO: You have 3 operators available and 5 machines to run. Two jobs are urgent (customer deadlines today), two are standard priority, and one is a long-run batch with flexible delivery. How do you assign resources?", options: ["One operator per machine, leave 2 machines idle", "Assign one operator to each urgent machine (dedicated focus on deadline jobs). Third operator manages the remaining 3 machines with a rotation schedule prioritizing the standard jobs. Communicate to PM that the flexible job will only advance during rotation gaps. Request additional operator support if urgent jobs require more than one shift", "Put all three operators on the two urgent jobs", "Let operators choose based on their preferences"], correct: 1, explanation: "Resource allocation must match priority. Urgent jobs get dedicated attention, lower-priority jobs share remaining capacity, and sustainability concerns are escalated.", category: "Resource Allocation", difficulty: "scenario" },
    { question: "SCENARIO: During your floor walk, you notice an operator is not wearing safety glasses while deburring parts. They say 'I've been doing this for 20 years without glasses.' How do you respond?", options: ["Stop the work immediately. Safety PPE requirements are non-negotiable regardless of experience. Issue a safety reminder, provide the correct PPE, and document the observation. Check if other operators in the area are also non-compliant", "They're experienced — they know the risks", "Just remind them and walk away", "Only enforce PPE if a safety audit is scheduled"], correct: 0, explanation: "Safety rules exist because of consequences, not experience level. The SS is responsible for PPE compliance and cannot waive safety requirements.", category: "Safety", difficulty: "critical" },
    { question: "SCENARIO: At midnight, an operator discovers a part has a feature the process sheet doesn't mention. The drawing shows it, but the process sheet for this setup doesn't include it. The feature appears to be for a later setup. Should the operator machine it anyway since they can see it on the drawing?", options: ["Yes — the operator can see it needs to be done", "NO. The operator must follow only the process sheet for their current setup. Extra features may have different datum requirements, tooling, or inspection needs. Report the discrepancy to you, document it, and escalate to the programmer for process sheet clarification before the next shift", "Only if the operator is confident they can reach it", "Machine it and tell the programmer to update the process sheet"], correct: 1, explanation: "The process sheet is the authority, not the drawing. Features assigned to specific setups have datum, tooling, and inspection dependencies. Machining out of sequence can cause compounding errors.", category: "Process Adherence", difficulty: "critical" },
    { question: "SCENARIO: You're supervising night shift when the fire alarm goes off. It's a false alarm (tripped by coolant mist in the ventilation). All machines are running active jobs with parts in fixtures. What's your procedure?", options: ["Follow emergency procedures regardless: evacuate all personnel, ensure machines are in a safe state (emergency stop if personnel cannot remain to monitor), verify the alarm source, and only resume operations after the fire alarm system is cleared by the appropriate authority. Document the event and report the ventilation/mist issue for prevention", "Cancel the alarm and continue — it's obviously false", "Keep operators at their machines since it's clearly false", "Only evacuate the area near the alarm sensor"], correct: 0, explanation: "False alarm or not, emergency procedures must be followed. The SS cannot determine an alarm is false — that's the fire safety system's job. Overriding safety protocols creates liability.", category: "Emergency Response", difficulty: "critical" },
    { question: "SCENARIO: An operator shows you a part with a chip mark on a non-critical surface. It happened during the machining cycle when a chip deflected and struck the part. The dimension isn't affected. What's your decision?", options: ["It's non-critical — continue without reporting", "Polish out the mark and continue", "Document the chip mark, segregate the part for QE disposition. Even on 'non-critical' surfaces, the drawing may specify surface condition requirements. Also investigate: is the chip guard adequate? Is this happening on other parts? The root cause (inadequate chip management) affects all parts, not just this one", "Only flag it if the customer would notice"], correct: 2, explanation: "Chip marks may violate surface condition requirements regardless of criticality. The root cause (chip management) is a systemic issue that needs correction.", category: "Non-conformance Handling", difficulty: "scenario" },
    { question: "SCENARIO: During shift change, the outgoing operator tells you a tool offset was adjusted 'slightly' mid-run. They didn't document it but say all parts since the adjustment measure correctly. The incoming operator needs to continue the run. What do you verify?", options: ["Before the incoming operator starts: (1) Record the current offset values, (2) Measure the most recent parts with calibrated instruments, (3) Compare measurements to QCP requirements, (4) Document the offset change formally, (5) Verify the incoming operator knows the current offset state. Undocumented adjustments are process deviations", "Trust the outgoing operator — they're reliable", "Just tell the incoming operator about the change verbally", "Reset the offset to the original value to be safe"], correct: 0, explanation: "Every undocumented offset change is a potential quality escape. The SS must formally capture the change and verify parts are conforming before the next operator continues.", category: "Shift Transition", difficulty: "scenario" },
    { question: "SCENARIO: You notice that Machine 5 has been idle for 45 minutes during your shift. The operator says they're waiting for QE first part approval. QE is inspecting parts for another job on Machine 2. What do you do?", options: ["Wait — QE will get to it when they're free", "While maintaining the quality gate (DO NOT skip first part approval), take action: alert QE to the waiting machine, check if another qualified QE is available, and if the wait will be extended, assess whether the operator can productively prepare for other work (tool staging, fixture prep for the next job) to minimize idle time", "Tell the operator to proceed without first part approval", "Escalate to PM that QE is too slow"], correct: 1, explanation: "The SS optimizes productivity within quality constraints. They cannot skip quality gates, but can expedite the process and find productive alternative work during holds.", category: "Productivity Management", difficulty: "scenario" },
    { question: "SCENARIO: An operator reports that they accidentally ran 3 parts with the wrong program (off by one setup). The parts look different from what was expected. What's the immediate cascade of actions?", options: ["Immediate actions: (1) STOP the machine, (2) Quarantine the 3 parts, (3) Verify the correct program is now loaded, (4) Check if the wrong program damaged the raw stock (can it still be machined correctly?), (5) Initiate NCR for the 3 parts, (6) Investigate how the wrong program was loaded (labeling issue? Process sheet error?), (7) Assess if operator re-training is needed", "Scrap the 3 parts and reload the correct program", "Just throw away the bad parts and keep running the correct program", "Blame the programmer for confusing program names"], correct: 0, explanation: "Wrong program events have multiple dimensions: immediate (quarantine), recoverable (raw stock assessment), systemic (how did it happen), and preventive (how to prevent recurrence).", category: "Error Recovery", difficulty: "critical" },
    { question: "SCENARIO: It's the last hour of your shift. The PM calls and asks you to start a new urgent setup on Machine 6 before your shift ends. The setup is complex and will take approximately 90 minutes. Your shift ends in 60 minutes and no overtime is authorized. What do you do?", options: ["Explain to PM: starting a complex setup that can't be completed creates handover risk (partial setups are error-prone). Either authorize overtime to complete it, defer to the next shift's start, or identify if a simpler portion of the setup can be completed safely within 60 minutes with a clean handover point", "Start the setup and leave it incomplete for the next shift", "Refuse the request entirely", "Rush through the setup in 60 minutes by skipping verification steps"], correct: 0, explanation: "Incomplete complex setups are high-risk handover points. The SS must communicate constraints and propose safe alternatives rather than either refusing or creating risk.", category: "Time Management", difficulty: "scenario" },
    { question: "SCENARIO: You discover that an operator has been measuring parts using a different technique than specified in the process sheet (using a height gauge instead of the specified micrometer). Their measurements match QE's spot-check results. Is this acceptable?", options: ["No. Even if results appear to match, measurement method is part of the controlled process. Different instruments have different accuracy, repeatability, and measurement uncertainty. The process sheet specifies a method for consistency and traceability. Correct the practice and verify all prior measurements are valid", "Yes — the measurements agree, so the method doesn't matter", "Only acceptable if the operator prefers that method", "Acceptable as long as the instrument is calibrated"], correct: 0, explanation: "Measurement method is a controlled parameter. Instrument substitution without authorization undermines process consistency and measurement traceability, even if results appear identical.", category: "Measurement Control", difficulty: "scenario" },
    { question: "SCENARIO: During your shift, you observe that ambient shop temperature has risen to 32°C due to a failing HVAC system. Multiple CNC machines are running precision jobs with tight tolerances. What action do you take regarding production quality?", options: ["Machines have coolant — temperature doesn't affect them", "Only worry about temperature for the final inspection", "Open the shop doors for ventilation", "Alert PM immediately: elevated ambient temperature causes thermal expansion in machine structures, fixtures, AND workpieces, shifting machining dimensions. For tight-tolerance jobs, consider: increasing in-process inspection frequency, allowing parts to temperature-stabilize before measurement, and potentially pausing precision work until HVAC is restored"], correct: 3, explanation: "Thermal expansion affects the entire measurement chain: machine, fixture, tool, and workpiece. The SS must protect part quality by adapting the process to abnormal conditions.", category: "Environmental Control", difficulty: "critical" },
    { question: "SCENARIO: A new operator asks you whether they should use the digital caliper or the micrometer for a specific measurement. The process sheet says 'measure bore diameter 25.00 ±0.02mm.' It doesn't specify the instrument. How do you advise?", options: ["Either instrument will work for ±0.02mm", "Use whichever is faster", "Evaluate the measurement requirement: ±0.02mm tolerance means the instrument needs at least 10x better resolution (0.002mm). A digital caliper (typically 0.01mm resolution) has a measurement uncertainty that consumes too much of the tolerance band. A micrometer (0.001mm resolution) is appropriate. Recommend flagging the process sheet gap to the programmer for future clarification", "Always use the most expensive instrument available"], correct: 2, explanation: "Instrument selection must consider resolution and measurement uncertainty relative to the tolerance. The 10:1 rule ensures the measurement system doesn't consume excessive tolerance.", category: "Measurement Guidance", difficulty: "scenario" },
    { question: "SCENARIO: An operator injures their hand lightly on a sharp burr while handling a part. The injury is minor — a small cut that needs only a bandage. The operator wants to continue working. What's your obligation?", options: ["Apply a bandage and let them continue — it's minor", "Only document it if the operator requests", "Treat the injury per first aid protocol, document it in the incident log regardless of severity, investigate the root cause (why was the burr present — missing deburring step?), and implement corrective action (PPE requirement, deburring process check). All injuries must be documented for safety records and trend analysis", "Minor injuries don't require documentation unless OSHA-reportable"], correct: 2, explanation: "All workplace injuries, regardless of severity, must be documented and investigated. Minor injuries often indicate systemic hazards that could cause severe injuries to others.", category: "Safety Management", difficulty: "critical" },
    { question: "SCENARIO: You arrive for your shift and discover the previous shift's handover notes mention 'adjusted Program 4521 feed rate override to 85% for the last 20 parts due to unusual noise.' The override is still at 85%. What do you do FIRST?", options: ["Reset to 100% and continue production", "Call the previous shift supervisor for verbal explanation", "Keep running at 85% since it was working", "Investigate before changing anything: check the parts made at 85% for quality, verify if the noise issue was resolved or still present, check tool condition, and determine if the feed rate reduction was addressing a symptom of a larger problem. Resetting to 100% without understanding why it was reduced could recreate the problem that caused the reduction"], correct: 3, explanation: "Undocumented process changes from previous shifts must be investigated before reverting. The feed reduction was treating a symptom — the underlying cause may still exist.", category: "Shift Transition", difficulty: "critical" },
  ],
  op: [
    { question: "What document is the single source of truth that you must follow during machining?", options: ["The customer's original drawing only", "The Process Sheet from the setup folder — it contains the specific program, tools, WCS, and instructions for your setup", "Your memory from running similar jobs previously", "Verbal instructions from the shift supervisor"], correct: 1, explanation: "The process sheet is the controlled document that translates the engineering intent into machine-level instructions. It supersedes memory, verbal guidance, and direct drawing reference.", category: "Process Adherence", difficulty: "standard" },
    { question: "What is the FIRST thing you must do when you find a non-conforming part during machining?", options: ["Continue machining and sort defective parts at the end of the run", "Fix the dimension by adjusting the tool offset and re-cutting", "Immediately segregate the non-conforming part AND stop production. Report to the shift supervisor. Do not attempt to fix, rework, or blend the part into the batch", "Put it back in the batch and hope QE doesn't notice"], correct: 2, explanation: "Immediate segregation prevents mixing conforming and non-conforming parts. Stopping production prevents making more non-conforming parts until the root cause is understood.", category: "Non-conformance", difficulty: "standard" },
    { question: "What FOUR elements must you verify match the process sheet before starting a setup?", options: ["Only the program number and machine number", "Material (correct alloy and size), program (correct revision), fixture (correct type and orientation), and tools (correct tool numbers and geometries) — all four must match exactly", "Just the fixture and material", "Only the tools and program"], correct: 1, explanation: "All four elements create the manufacturing conditions. A correct program with the wrong material, wrong fixture, or wrong tools produces non-conforming parts.", category: "Setup Verification", difficulty: "standard" },
    { question: "When do you perform in-process self-inspection during a production run?", options: ["At the frequency defined in the QCP — this could be every part, every 5th part, or every 10th part depending on the dimension's criticality classification", "Only when you suspect a problem", "Only on the last part of the batch", "Only when the shift supervisor asks you to"], correct: 0, explanation: "The QCP defines mandatory inspection frequencies based on risk assessment. Deviating from the defined frequency — even if parts seem fine — is a quality system violation.", category: "Self-Inspection", difficulty: "standard" },
    { question: "Why must you NEVER adjust feeds and speeds beyond the ranges specified on the process sheet without authorization?", options: ["Feed and speed changes don't affect part quality", "Because feed and speed changes affect cutting forces (dimension accuracy), surface finish, tool life, heat generation (metallurgical integrity), and chip formation. Changes outside the specified range may produce parts that pass dimensional checks but fail surface finish or metallurgical requirements", "Only the RPM matters — feed rate can be changed freely", "Process sheet ranges are suggestions, not requirements"], correct: 1, explanation: "Feed and speed are process parameters, not just productivity settings. They affect multiple quality characteristics that may not be caught by dimensional inspection alone.", category: "Process Parameters", difficulty: "standard" },
    { question: "What should you do if you notice the cutting tool is approaching the end of its expected life (based on the tool life specified on the process sheet) but the current part is still in tolerance?", options: ["Keep running until the tool breaks — it's still making good parts", "Ask the supervisor if you can skip the change", "Run 10 more parts and then change", "Perform the scheduled tool change at the specified interval. Tool wear is progressive — the next part may be the one that goes out of tolerance. Changing proactively maintains quality consistency and prevents mid-cut tool failure that damages the part"], correct: 3, explanation: "Scheduled tool changes are preventive, not reactive. Running past tool life risks sudden dimensional shift, poor surface finish, or catastrophic tool breakage.", category: "Tool Management", difficulty: "standard" },
    { question: "Why is it important to verify the Work Coordinate System (WCS) offset before running the first part, even if the program was verified by simulation?", options: ["WCS doesn't change between simulations and actual machining", "WCS is automatically set when the program loads", "Because simulation uses theoretical coordinates, but the actual WCS depends on how the part is physically positioned in the fixture. Any difference in part position, fixture location, or machine zero will cause all features to shift from their intended locations", "Only 5-axis machines require WCS verification"], correct: 2, explanation: "WCS connects the program's coordinate system to the physical reality on the machine. Simulation validates the program path; WCS verification validates the physical setup.", category: "Setup Verification", difficulty: "standard" },
    { question: "What is your responsibility regarding traceability during a production run?", options: ["Traceability is the QE's responsibility", "Traceability only matters for aerospace parts", "Just count the parts accurately", "Ensure each part can be traced to its raw material batch (heat number), the specific machine, setup, operator, date, and shift it was produced on. This means properly marking parts, maintaining production logs, and keeping material tags with the correct lot throughout the process"], correct: 3, explanation: "Operators contribute to traceability by maintaining material identification, production records, and part marking throughout the manufacturing process.", category: "Traceability", difficulty: "standard" },
    { question: "SCENARIO: You start Setup 2 and notice the fixture currently on the machine doesn't match the fixture specified on the process sheet. It's left over from the previous job. What do you do?", options: ["Use it if the part physically fits — it's probably close enough", "Run a test part to see if dimensions are correct", "Ask the previous operator what fixture they used and why", "STOP. Do not run. Remove the incorrect fixture, install the fixture specified on the process sheet, verify alignment, and confirm WCS. Never assume a wrong fixture will produce correct parts — even if the part physically fits, datum references and clamping forces will be wrong"], correct: 3, explanation: "Wrong fixture = wrong datums = wrong dimensions even if the part physically fits. Fixture selection is an engineered decision, not a convenience choice.", category: "Setup Integrity", difficulty: "critical" },
    { question: "SCENARIO: During machining, you hear a slight chatter sound that wasn't there at the start of the run. Parts still measure within tolerance. What do you do?", options: ["Pause the machine. Check tool condition (wear, chipping), verify part surface finish in the chatter area, check fixture clamping, and report to the shift supervisor. Chatter indicates a degrading condition that will produce non-conformance if not corrected", "Keep going — measurements confirm the process is stable", "Speed up the feed rate to push through the chatter zone faster", "Increase coolant flow to suppress the vibration"], correct: 0, explanation: "Chatter is an early warning of process degradation. Waiting until measurements fail means multiple non-conforming parts have already been produced.", category: "Process Monitoring", difficulty: "scenario" },
    { question: "SCENARIO: The process sheet says to use Tool T7 (10mm 4-flute endmill). T7 is worn. The tool crib has a new T7 and also a T12 (10mm 2-flute endmill — same diameter). Which do you use?", options: ["T12 — same 10mm diameter, it'll produce the same result", "Use the worn T7 — it might have a few more parts in it", "Get a new T7 ONLY. T7 (4-flute) and T12 (2-flute) have different chip loads per tooth, different deflection characteristics, different surface finish generation, and different cutting force profiles. Even at the same diameter, they are NOT interchangeable", "Use T12 but reduce the feed rate to compensate for 2 flutes"], correct: 2, explanation: "Tool geometry beyond diameter fundamentally affects cutting performance. Flute count, helix angle, and core thickness all influence dimensional accuracy, surface finish, and tool life.", category: "Tool Compliance", difficulty: "scenario" },
    { question: "SCENARIO: You're running the last 5 parts of a batch of 100. The first 95 have all been in tolerance with consistent measurements. Can you skip self-inspection on the last 5 since the process has proven stable?", options: ["NO. Tool wear is progressive and accelerates near end of life. Thermal conditions may have changed over the batch run time. The last parts are actually at the HIGHEST risk of non-conformance. Inspect per the QCP frequency without exception", "Yes — 95 consecutive good parts statistically proves process stability", "Only inspect the very last part as a final check", "Skip inspection if the supervisor verbally approves"], correct: 0, explanation: "The QCP frequency is mandatory, not discretionary. Tool wear curves show accelerating deterioration near end of life — the last parts are the riskiest, not the safest.", category: "Quality Discipline", difficulty: "scenario" },
    { question: "SCENARIO: While loading raw material for Setup 1, you notice the material tag says '6061-T6' but the process sheet specifies '7075-T6'. Both are aluminum and look identical. What do you do?", options: ["They're both aluminum — the machining process is the same", "STOP. Do NOT load the material. 6061 and 7075 have completely different mechanical properties (7075 is 2x stronger). Wrong material = wrong part regardless of dimensional accuracy. Report to the supervisor and request the correct material", "Load it and note the discrepancy on the process sheet", "Ask the shift supervisor to approve the substitution"], correct: 1, explanation: "Material verification is critical. Different aluminum alloys have different strengths, hardness, and fatigue properties. The part may be dimensionally correct but metallurgically non-conforming.", category: "Material Verification", difficulty: "critical" },
    { question: "SCENARIO: Mid-run, you notice coolant has stopped flowing to the cutting zone. The machine is still running. What's your IMMEDIATE action?", options: ["Finish the current part — it's almost done", "Hit the FEED HOLD or EMERGENCY STOP immediately. Dry cutting causes: thermal damage to the part (metallurgical changes), rapid tool wear or breakage, poor surface finish, and potential fire hazard with some materials. Do not complete even one more pass without coolant", "Turn up the coolant pump and continue", "Wait to see if coolant pressure returns on its own"], correct: 1, explanation: "Loss of coolant during cutting is an emergency. Even a few seconds of dry cutting can cause irreversible thermal damage to the part and the tool.", category: "Emergency Response", difficulty: "critical" },
    { question: "SCENARIO: You complete Setup 2 and the process sheet says 'Deburr all edges from this setup before proceeding to Setup 3.' You notice some edges that are technically burr-free from the machining. Do you still need to perform the deburring operation?", options: ["No — if there are no burrs, deburring is unnecessary", "Yes. The process sheet instruction is a controlled step, not a conditional suggestion. 'Deburr all edges' may serve additional purposes: removing micro-burrs invisible to the eye, ensuring consistent edge breaks for the next fixturing setup, and creating documented evidence that the step was performed", "Only deburr edges that are visibly rough", "Skip it if you're running behind schedule"], correct: 0, explanation: "Controlled process steps must be performed as documented. 'Deburr all edges' is a process requirement, not a conditional instruction. Skipping documented steps is a process deviation.", category: "Process Compliance", difficulty: "scenario" },
    { question: "SCENARIO: The process sheet specifies a spindle speed of 4000 RPM. You start the program and notice the machine is running at 3200 RPM because the override dial is set to 80%. Should you adjust it?", options: ["Yes — set the override to 100%. The programmed speed of 4000 RPM was engineered for specific cutting conditions. Running at 3200 RPM changes the surface speed, chip load, and surface finish characteristics. The process sheet parameters must be run as specified", "80% is close enough — the machine is probably just protecting itself", "Leave it at 80% — slower is always safer", "Only adjust if the surface finish looks bad"], correct: 0, explanation: "Override dials must be at 100% unless there's a specific safety reason. Reduced speed changes all cutting parameters from their engineered values, affecting surface finish, tool life, and chip formation.", category: "Machine Settings", difficulty: "scenario" },
    { question: "SCENARIO: You're running a batch and the shift supervisor asks you to 'keep an eye on Machine 3 next to you' because the regular operator went home sick. Machine 3 is running a different job in automatic cycle. What's your responsibility?", options: ["Just glance at Machine 3 occasionally — your machine is priority", "Refuse — you're only responsible for your machine", "Accept monitoring responsibility but clarify what to watch for: is the auto-cycle job at a stage where it needs in-process inspection? Are there upcoming tool changes? Is the batch nearing completion? Get the process sheet for Machine 3 so you can monitor intelligently, not just react to alarms", "Transfer the operator's self-inspection responsibility to yourself for Machine 3"], correct: 2, explanation: "Monitoring a machine you're not operating requires understanding what the job needs. Blind monitoring only catches catastrophic failures, not quality-relevant events.", category: "Multi-machine Awareness", difficulty: "scenario" },
    { question: "SCENARIO: After completing first part machining on Setup 1, QE measures the part and finds all dimensions within tolerance but at the upper limit of the tolerance band (e.g., 25.00 +0.02/-0.00, measured at 25.019mm). QE approves the first part. Should you be concerned as you continue the batch?", options: ["Yes — monitor closely. Dimensions at the upper tolerance limit on the FIRST part (with fresh tools) will likely drift further as tools wear. Consider a proactive tool offset adjustment to center the dimension in the tolerance band, preventing later parts from exceeding the limit. Discuss with QE before adjusting", "No — QE approved it, so continue as normal", "No — first part approval validates the entire process", "Only concern if the dimension exceeds tolerance on a later part"], correct: 0, explanation: "First part at the tolerance boundary with fresh tools means subsequent parts with worn tools will trend out of spec. Proactive offset adjustment prevents downstream non-conformance.", category: "Process Awareness", difficulty: "critical" },
    { question: "SCENARIO: You discover that the bar stock you've been cutting from has a visible surface crack on the end that hasn't been machined yet. The crack is on raw stock that will become parts 46-50 of your batch. Parts 1-45 are already completed. What do you do?", options: ["Machine those parts and see if the crack machines away", "Only stop if the crack is in a critical area of the part geometry", "Cut off the cracked section and use the rest", "STOP. Do not machine the cracked stock. Report to the supervisor. The crack indicates potential material defect that may extend below the visible surface. Also flag whether the crack origin (rolling, handling, or stress) could have affected already-machined parts from the same bar"], correct: 3, explanation: "Surface cracks in bar stock can indicate deeper material defects. Machining cracked material risks producing parts with sub-surface defects not detectable by dimensional inspection.", category: "Material Defect", difficulty: "critical" },
    { question: "SCENARIO: During a production run, you need to leave the machine briefly (restroom). The machine is in automatic cycle with 15 minutes remaining on the current part. What's the correct procedure?", options: ["Just go — the machine runs itself in automatic", "Pause the machine, creating an interruption in the cutting process", "Inform the shift supervisor or a nearby operator that you're stepping away. Ensure someone monitors the machine in your absence. Never leave a running machine completely unattended — unexpected events (tool breakage, fixture failure, coolant loss) require immediate human response", "Only leave during rapid moves, not during cutting"], correct: 2, explanation: "Machines in automatic cycle can experience emergencies (tool breakage, coolant failure, fixture failure) that require immediate human intervention. Someone must always be aware of a running machine.", category: "Machine Attendance", difficulty: "scenario" },
    { question: "SCENARIO: The process sheet has a note: 'After machining, clean part with compressed air before measurement.' You've been cleaning parts and measuring them consistently. Another operator says he skips the cleaning step because it doesn't affect measurements. Who is right?", options: ["The other operator — cleaning is just cosmetic", "Cleaning is only important for CMM measurements", "It depends on which measurement instrument you use", "You are right. Compressed air cleaning removes chips, coolant, and debris that can affect measurement accuracy (a chip under a micrometer anvil adds its thickness to the reading). Skipping cleaning creates measurement errors that can cause both false acceptances and false rejections"], correct: 3, explanation: "Contamination on measurement surfaces directly affects dimensional readings. Even a thin coolant film or a small chip can shift measurements by enough to matter on tight tolerances.", category: "Measurement Practice", difficulty: "scenario" },
    { question: "SCENARIO: You're setting up a new job and the process sheet specifies a tool length offset for Tool T3 of 152.345mm. When you measure T3 on the tool presetter, you get 152.567mm (0.222mm longer than specified). Which value do you use?", options: ["Use the process sheet value — it was specified by the programmer", "Average the two values as a compromise", "Use your MEASURED value (152.567mm). Tool length offsets must reflect the actual physical tool, not a previously recorded value. The process sheet value was from a different physical tool. Using the wrong offset shifts all Z-axis dimensions by 0.222mm", "The difference is small enough to not matter"], correct: 2, explanation: "Tool length offsets must match the actual tool being used. Every physical tool is slightly different. Using a recorded value from a different tool guarantees dimensional errors.", category: "Tool Setup", difficulty: "critical" },
    { question: "SCENARIO: During your shift, you notice a coworker on an adjacent machine dropping finished parts into a bin from height rather than placing them carefully. The parts appear undamaged. Should you say something?", options: ["Not your machine, not your problem", "Only if the parts are for an aerospace customer", "Only mention it if you see visible damage", "Yes. Dropping precision parts risks impact damage (micro-dents, deformation) that may not be visible but can cause rejection at final inspection or in the customer's assembly. Also, mixed conforming and damaged parts become a batch-wide quality concern. Alert the shift supervisor"], correct: 3, explanation: "Part handling is everyone's responsibility. Impact damage can be invisible to the eye but measurable during inspection or functional in the customer's application.", category: "Part Handling", difficulty: "scenario" },
    { question: "SCENARIO: You're running a job on a lathe and the chuck pressure gauge reads 10% lower than at the start of the shift. The parts are still machining correctly. The process sheet doesn't mention chuck pressure. Should you be concerned?", options: ["Yes. Decreasing chuck pressure means the clamping force is dropping. This can cause: gradual part movement during cutting (creating out-of-round conditions), sudden part ejection at higher cutting forces, and inconsistent datum referencing between parts. Report to supervisor and investigate the pressure drop cause", "No — if parts are correct, pressure is adequate", "Only if the pressure drops below 50% of starting value", "Add a note to the logbook but keep running"], correct: 0, explanation: "Declining clamping pressure is a safety and quality concern. A part ejected from a lathe chuck at cutting speed is an extreme safety hazard, and even slight movement affects dimensional accuracy.", category: "Machine Monitoring", difficulty: "critical" },
    { question: "SCENARIO: The process sheet for your current job lists 'Op 20: Flip part, re-clamp in soft jaws, indicate to within 0.01mm TIR.' You've never indicated a part before and the shift supervisor is busy. What is the correct action?", options: ["Skip the indication step — the soft jaws should locate the part accurately enough", "Watch a video online and attempt it yourself", "Do NOT proceed. Indicating is a precision alignment step requiring training and proper tooling (dial test indicator, magnetic base). Performing it incorrectly could misalign the part causing all subsequent features to be out of position. Wait for the shift supervisor or a qualified operator to demonstrate the procedure", "Use the process sheet diagram to teach yourself"], correct: 2, explanation: "Process steps requiring skills you haven't been trained on must not be attempted. Incorrect indication shifts the entire datum reference, making every subsequent feature incorrect even if individually measured dimensions look acceptable.", category: "Competency Boundaries", difficulty: "critical" },
  ],
  sqe: [
    { question: "What must the SQE validate before an outsource purchase order can be placed?", options: ["The QCP must be validated for the outsource scope — confirming inspection requirements, acceptance criteria, certification requirements, and process specifications are communicated to the supplier", "Only the supplier's quoted price and delivery date", "Only the supplier's NADCAP status", "Just the delivery date and quantity"], correct: 0, explanation: "The QCP defines what quality requirements apply to the outsourced work. Without QCP validation, the supplier doesn't know what to certify against.", category: "Pre-Outsource", difficulty: "standard" },
    { question: "What is the complete set of certifications that must be verified on incoming outsourced parts?", options: ["CoC (confirming part conformance), MTC (material properties if applicable), NADCAP certification (for special processes), FAI reports (for first articles), process-specific test reports (hardness, NDT, coating thickness), and verification that all certifications reference the correct PO, part number, and revision", "Only the delivery note and invoice", "Only CoC is required — it covers everything", "Whatever the supplier provides is acceptable"], correct: 0, explanation: "Each certification serves a different verification purpose. CoC confirms conformance, MTC confirms material, NADCAP confirms process capability, and specific test reports confirm measurable outcomes.", category: "Incoming Verification", difficulty: "standard" },
    { question: "What action must the SQE take when a supplier's relevant certification has expired?", options: ["Reject the parts, quarantine them pending resolution, and initiate a supplier corrective action request (SCAR). Parts processed under an expired certification have no objective evidence of process conformance", "Accept the parts with a note to check next time", "Accept them if the parts look fine", "Ask the customer if they'll accept parts from an uncertified supplier"], correct: 0, explanation: "Expired certification means the supplier's process was uncontrolled during the period. Parts processed without valid certification cannot be presumed conforming.", category: "Certification Management", difficulty: "standard" },
    { question: "For NADCAP-accredited processes, why must the SQE verify scope in addition to accreditation validity?", options: ["NADCAP scope is always comprehensive — validity is the only concern", "Scope only matters for new suppliers, not existing ones", "Because NADCAP accreditation is process-specific and often material-class-specific. A supplier certified for aluminum heat treatment under NADCAP may not be certified for titanium. The specific process, material class, and temperature range must match the job requirements", "NADCAP scope is verified by the customer, not the SQE"], correct: 2, explanation: "NADCAP scopes are narrowly defined by process type, material class, and parameter range. A valid certificate with wrong scope provides no more assurance than no certificate.", category: "NADCAP Scope", difficulty: "standard" },
    { question: "What is the difference between a supplier audit and a supplier assessment, and when does the SQE use each?", options: ["A supplier assessment is an initial evaluation (capabilities, capacity, quality system review) for qualification. A supplier audit is a periodic in-depth verification of ongoing process compliance, quality system effectiveness, and corrective action implementation. Assessments precede qualification; audits maintain it", "They are the same process with different names", "Audits are for new suppliers; assessments are for existing ones", "Only QE performs audits; SQE performs assessments"], correct: 0, explanation: "The distinction determines purpose and methodology. Assessments evaluate capability for qualification decisions. Audits verify sustained compliance for continued use.", category: "Supplier Management", difficulty: "standard" },
    { question: "What is a Supplier Corrective Action Request (SCAR) and when does the SQE issue one?", options: ["A SCAR is an informal feedback email to the supplier", "A SCAR is a formal document requiring the supplier to investigate a non-conformance root cause, implement corrective actions, provide evidence of effectiveness, and define prevention measures. It's issued for repeated quality failures, certification discrepancies, or systemic process issues — not for every minor observation", "SQE issues a SCAR for every rejected part", "SCARs are issued by the customer, not by SQE"], correct: 1, explanation: "SCARs are formal quality tools with defined response requirements. They're reserved for issues requiring root cause investigation, not routine communications.", category: "Corrective Action", difficulty: "standard" },
    { question: "Why must the SQE maintain an Approved Supplier List (ASL) rather than allowing any qualified supplier to be used?", options: ["The ASL ensures only suppliers who have been assessed, qualified, and are under ongoing performance monitoring are used. Without an ASL, PEs or procurement could use unvetted suppliers with unknown quality systems, expired certifications, or no demonstrated capability for the specific process required", "The ASL is just an administrative convenience", "The ASL is only required for aerospace work", "Suppliers qualify themselves by submitting certificates"], correct: 0, explanation: "The ASL is a controlled quality record that prevents use of unqualified suppliers. It's a cornerstone of AS9100 supplier management requirements.", category: "Supplier Qualification", difficulty: "standard" },
    { question: "What supplier performance metrics should the SQE track and why?", options: ["Only on-time delivery percentage", "On-time delivery, first-pass quality rate (parts accepted without non-conformance), certification accuracy, SCAR response timeliness, and trend analysis across multiple deliveries. These metrics identify deteriorating suppliers before failures affect production", "Metrics are only needed during supplier re-qualification", "Only price competitiveness matters"], correct: 0, explanation: "Comprehensive metrics enable proactive supplier management. A supplier meeting delivery targets but with declining quality scores is a problem waiting to happen.", category: "Performance Monitoring", difficulty: "standard" },
    { question: "SCENARIO: A supplier delivers heat-treated parts with a CoC stating 'Processed per AMS 2759'. However, your PO specified AMS 2759/5 (specific revision for titanium). The supplier says 'AMS 2759 covers all sub-specs including /5.' Is this acceptable?", options: ["Yes — AMS 2759 is the parent specification that encompasses all sub-specifications", "NO. AMS 2759/5 contains titanium-specific requirements (different soak times, atmosphere control, cooling rates) that are NOT implied by the parent spec. A generic AMS 2759 CoC doesn't prove the /5-specific parameters were followed. Reject and require CoC citing AMS 2759/5 specifically", "Accept but add a note to request /5-specific CoC next time", "Call the AMS specification body to confirm the supplier's claim"], correct: 1, explanation: "AMS sub-specifications contain material-specific process parameters. The parent spec is an umbrella that doesn't ensure sub-spec compliance. This is a common supplier misconception that the SQE must catch.", category: "Specification Compliance", difficulty: "critical" },
    { question: "SCENARIO: You're auditing a new plating supplier. Their NADCAP cert is valid and covers your required process. However, their process tank temperature logs show 3 excursions outside the specification limits in the past month, each lasting 15-30 minutes. They explain these as 'normal process fluctuations within calibration drift.' What's your assessment?", options: ["FLAG this as a significant process control concern. Three excursions in one month suggests systemic temperature control issues. Request: their SPC data, corrective action records for each excursion, evidence of parts dispositioned during excursion periods, and their process monitoring improvement plan. Consider conditional approval only with enhanced incoming inspection on every delivery", "NADCAP accreditation validates their process — minor excursions are expected", "If their NADCAP auditor accepted it, you should too", "Disqualify the supplier immediately and find alternatives"], correct: 0, explanation: "NADCAP accreditation is a point-in-time assessment. Ongoing process control issues between audits indicate real quality risk. The SQE must evaluate current performance, not just certification status.", category: "Supplier Auditing", difficulty: "scenario" },
    { question: "SCENARIO: Parts return from an NDT supplier. They found one sub-surface indication that they classified as 'acceptable per ASTM E2375 general acceptance criteria.' Your PO references a customer-specific acceptance criteria that is tighter than the ASTM general standard. What do you do?", options: ["Review the indication against YOUR specific acceptance criteria (from the customer), not the general ASTM standard. If your criteria is tighter, the indication may be rejectable. The supplier applied the wrong acceptance standard. Issue a non-conformance and require re-evaluation against the correct criteria", "Accept — the supplier applied a recognized standard", "Accept this delivery and update the PO for next time", "Send parts to a different NDT supplier for a second opinion"], correct: 0, explanation: "Customer-specific acceptance criteria take precedence over general standards. The SQE must verify the supplier evaluated against the correct criteria specified on the PO.", category: "Acceptance Criteria", difficulty: "scenario" },
    { question: "SCENARIO: You discover that a supplier your company has used for 5 years has quietly subcontracted their plating work to a third party for the last 6 months. Your PO and ASL lists the primary supplier only. The subcontractor is unknown to you. What are the implications?", options: ["As long as parts pass inspection, subcontracting is the supplier's business decision", "Only a problem if the subcontractor isn't NADCAP certified", "Request the subcontractor's certifications and add them to your ASL retroactively", "This is a major non-conformance. Unauthorized subcontracting means: the subcontractor is not on your ASL, hasn't been assessed or audited, may not have required certifications (NADCAP), and their process is completely uncontrolled from your perspective. Quarantine recent deliveries for investigation and issue a SCAR"], correct: 3, explanation: "Unauthorized subcontracting breaks the quality chain. Your supplier was qualified — the unknown subcontractor was not. Six months of uninspected sub-tier work represents significant quality risk.", category: "Supply Chain Control", difficulty: "critical" },
    { question: "SCENARIO: A critical supplier informs you they're relocating their heat treatment facility to a new building. They assure you their equipment, processes, and staff remain unchanged — only the building is different. Do you need to take any action?", options: ["No — same equipment and people means same capability", "Just update their address in your supplier database", "Only if they changed their NADCAP scope", "Yes. Facility relocation triggers re-qualification even if equipment transfers. New facility factors: different water supply (affects quenching), different power supply (affects furnace consistency), different environmental conditions (humidity, ambient temperature), equipment re-calibration after move, and potential process interruption during transition. Require re-qualification evidence before accepting parts from the new facility"], correct: 3, explanation: "Facility factors affect process outcomes. Equipment recalibration, utility differences, and installation variations can change process results. Re-qualification validates the new environment.", category: "Supplier Re-qualification", difficulty: "critical" },
    { question: "SCENARIO: During incoming inspection of heat-treated parts, your hardness test results on 3 sample parts show HRC 43, 44, and 44 — within the specification of HRC 42-46. However, the supplier's CoC states 'HRC 45-46 (average).' Your results are consistently lower than the supplier's. What do you investigate?", options: ["Your results are within spec, so accept and move on", "Reject the parts since your numbers don't match the CoC", "Your equipment must be wrong since the supplier's numbers are higher", "The discrepancy between your results and the supplier's warrants investigation: different hardness testers may give different readings (compare calibration status and method), test location on the part matters (surface vs. core, which area did each party test?), and preparation method affects results. Request the supplier's test methodology details for comparison"], correct: 3, explanation: "Systematic measurement discrepancies indicate either a calibration issue, methodology difference, or test location inconsistency. The SQE must investigate the measurement system, not just accept the lower values.", category: "Measurement Correlation", difficulty: "scenario" },
    { question: "SCENARIO: You're evaluating two NADCAP-certified heat treatment suppliers for a new titanium job. Supplier A has 10 years of NADCAP accreditation with 2 minor findings in their last audit. Supplier B has 2 years of accreditation with zero findings. Which is the better choice?", options: ["Supplier A is likely more reliable. Ten years of accreditation demonstrates sustained capability. Two minor findings actually shows thorough audit engagement. Zero findings at a new supplier could indicate: an inexperienced auditor, limited process scope being audited, or genuinely good performance — but 2 years of history provides less statistical confidence than 10 years", "Supplier B — zero findings proves perfect quality", "Choose whichever is cheaper", "Both are equivalent since both have valid NADCAP"], correct: 0, explanation: "Supplier maturity matters. Long accreditation history with minor findings demonstrates sustained compliance under scrutiny. Short history with zero findings could indicate limited audit depth or simply less data.", category: "Supplier Selection", difficulty: "scenario" },
    { question: "SCENARIO: A supplier sends parts back from anodizing. The CoC states coating thickness of 0.020-0.025mm per surface. Your incoming inspection measures 0.018mm on 2 of 10 sample parts. The remaining 8 are within spec. Do you accept the lot?", options: ["Accept — 80% compliance is reasonable for coatings", "Accept the 8 conforming parts and reject the 2", "Reject the lot. Two non-conforming samples from a 10-part sample suggests a process control issue. The coating may vary even more on uninspected parts. Reject the entire lot, initiate NCR, and require the supplier to: 100% inspect the remainder, investigate root cause of thickness variation, and implement corrective actions", "Ask the supplier to re-measure — your gauge might be off"], correct: 2, explanation: "Sampling inspection failures represent the population, not just the samples. Two failures in 10 samples statistically indicates a significant process issue across the lot.", category: "Lot Disposition", difficulty: "critical" },
    { question: "SCENARIO: Your company needs to urgently outsource a grinding operation. Your regular approved supplier has a 4-week lead time. A new supplier offers 1-week delivery and claims NADCAP certification. You cannot verify their NADCAP status immediately (it's Friday afternoon, NADCAP database updates Monday). Can you place the order?", options: ["No. NADCAP certification must be VERIFIED, not just claimed, before placing the order. Never use an unverified supplier for special processes. Options: negotiate expedited delivery with the approved supplier, find another approved supplier from your ASL, or wait until Monday to verify the new supplier's claim. The risk of using an uncertified supplier exceeds the cost of the delay", "Yes — they claim NADCAP and we'll verify Monday", "Place the order conditionally pending verification", "Call NADCAP's emergency line to verify immediately"], correct: 0, explanation: "Special process supplier claims must be independently verified before use. Placing an order based on an unverified claim puts the entire job at risk if the claim is false.", category: "Emergency Sourcing", difficulty: "critical" },
    { question: "SCENARIO: A long-standing supplier has gradually increased their reject rate over the past year: Q1 = 1%, Q2 = 2%, Q3 = 3%, Q4 = 5%. Each quarter's rejects were dispositioned individually and corrective actions were issued. The Q4 SCAR response says they 'tightened inspection.' What's your strategic assessment?", options: ["They're responding to each SCAR — the system is working", "The trend is alarming despite individual corrective actions. Escalating reject rates indicate the corrective actions are addressing symptoms, not root causes. Require a comprehensive process capability study, conduct an on-site audit focused on process control (not just inspection tightening), and establish a performance improvement plan with measurable targets and timelines", "Switch suppliers immediately", "Only escalate if Q1 next year exceeds 5%"], correct: 1, explanation: "Trend analysis is more important than individual events. Escalating rejection rates despite corrective actions indicates systemic process degradation that 'tighter inspection' won't fix.", category: "Trend Analysis", difficulty: "scenario" },
    { question: "SCENARIO: During a supplier audit, you discover the supplier's quality manual references ISO 9001:2008 (superseded version) instead of ISO 9001:2015 (current version). Their certification shows ISO 9001:2015. They say they 'haven't had time to update the manual.' How significant is this finding?", options: ["Significant. If the quality manual references the superseded standard, the supplier's documented processes may not include the 2015 requirements (risk-based thinking, context of organization, etc.). Their actual quality system may be operating to outdated requirements regardless of their certificate. This requires a deeper audit of process implementation, not just documents", "Minor — they have the current certification, the manual is just outdated paperwork", "Critical — suspend the supplier immediately", "Ignore it if the certificate is current"], correct: 0, explanation: "Document currency reflects system currency. ISO 9001:2015 introduced fundamental changes (risk-based thinking, leadership engagement). An outdated manual suggests these may not be implemented.", category: "QMS Assessment", difficulty: "scenario" },
    { question: "SCENARIO: You receive a batch of outsourced parts with a CoC that has been signed and stamped — but you notice the CoC is dated 3 days BEFORE the last outsource operation was scheduled to be completed. How could a supplier certify parts before processing was complete?", options: ["Maybe they finished early — accept it", "This is a red flag for pre-signed CoCs (certificates prepared before actual processing/inspection). This practice invalidates the certification entirely because it proves the CoC is not based on actual results. Reject the delivery, issue a SCAR, and consider whether previous deliveries from this supplier may have had the same issue", "Date discrepancies are common administrative errors", "Call the supplier to confirm the date was a typo"], correct: 1, explanation: "Pre-dated CoCs indicate the supplier may be issuing certifications routinely without them reflecting actual process results. This is a fundamental quality system integrity issue.", category: "Certification Integrity", difficulty: "critical" },
    { question: "SCENARIO: Your company is onboarding a new surface treatment supplier. During your assessment visit, the supplier shows you their NADCAP accreditation, impressive equipment, and clean facility. However, you notice their operators don't have written work instructions at the processing tanks — they 'know the process by heart.' Should this concern you?", options: ["Experienced operators don't need written instructions", "Only a concern if they have new or junior operators", "This is a significant concern. Process consistency depends on documented instructions, not individual knowledge. Without written work instructions: training is inconsistent, process variations go undetected, knowledge is lost with personnel changes, and audit compliance is questionable. Documented instructions are an AS9100 and NADCAP requirement", "NADCAP accreditation validates their process regardless"], correct: 2, explanation: "Documented work instructions ensure process consistency regardless of which operator is performing the work. Tribal knowledge is fragile and uncontrollable.", category: "Process Documentation", difficulty: "scenario" },
    { question: "SCENARIO: A supplier delivers NDT-inspected parts and their report states 'inspected using liquid penetrant testing per ASTM E1417.' Your PO and QCP specify 'fluorescent penetrant inspection per ASTM E1417, Method A, Sensitivity Level 3.' The supplier used visible dye penetrant (Method B, Sensitivity Level 2). Are these equivalent?", options: ["Both are liquid penetrant methods under the same ASTM standard", "NOT equivalent. Fluorescent penetrant (Method A) has higher sensitivity than visible dye penetrant (Method B). Sensitivity Level 3 is higher than Level 2. The supplier used a LESS sensitive method than specified, meaning defects detectable by your required method may have been missed. Reject and require re-processing with the correct method and sensitivity", "Accept since they used the correct ASTM standard number", "The sensitivity difference is negligible for most applications"], correct: 1, explanation: "NDT method and sensitivity level are critical parameters. Using lower sensitivity means smaller defects may be missed. The supplier performed a different test than what was specified.", category: "NDT Compliance", difficulty: "critical" },
    { question: "SCENARIO: You need to add a new plating supplier to your ASL urgently. The full supplier qualification process typically takes 8 weeks (assessment, trial order, first article evaluation). A project needs plating in 3 weeks. Can you fast-track the qualification?", options: ["Skip the qualification — urgent business need overrides quality process", "Delay the project by 5 weeks until full qualification is complete", "Use the supplier without qualification and qualify retroactively", "Implement a risk-based expedited qualification: verify NADCAP accreditation immediately, conduct a focused remote assessment of critical quality system elements, require enhanced first article inspection on the trial order, and apply conditional approval with restrictions (enhanced incoming inspection on every delivery until full qualification is complete)"], correct: 3, explanation: "Qualification can be risk-adjusted for urgency, but cannot be eliminated. Conditional approval with enhanced controls provides quality assurance while meeting business needs.", category: "Risk-Based Qualification", difficulty: "scenario" },
    { question: "SCENARIO: A long-standing heat treatment supplier informs you they've changed their furnace atmosphere gas supplier. They assure you the new gas meets the same specification. Do you need to take any action?", options: ["No action needed — same specification means same results", "Ask the supplier to notify NADCAP directly — it's their responsibility", "Only verify if customer complaints arise", "Yes. A change in raw material supplier for a NADCAP-controlled process is a process change that requires revalidation. Request the supplier's internal change management documentation, verify the gas certification meets the process specification, and consider requiring first article evaluation on parts processed after the change to confirm no quality impact"], correct: 3, explanation: "Any change to a controlled process input, even with the same specification, can affect output quality. The SQE must verify the supplier's change management process was followed and validate results.", category: "Change Management", difficulty: "scenario" },
    { question: "SCENARIO: During an incoming inspection of outsourced machined parts, you find that 2 out of 50 parts have a surface finish of Ra 1.8 when the specification calls for Ra 1.6 maximum. The supplier's CoC states all parts conform. What is the correct disposition?", options: ["Reject the ENTIRE lot and quarantine. The supplier's CoC is now unreliable because it claims full conformance when inspection proves otherwise. Issue a SCAR addressing both the dimensional nonconformance AND the false CoC. Consider increasing inspection sample size for future deliveries from this supplier since their inspection process missed these defects", "Accept the lot — 96% conformance is excellent", "Accept the 48 good parts and return only the 2 rejects", "Accept with a concession since the deviation is only 0.2 Ra"], correct: 0, explanation: "A CoC that claims full conformance when defects exist indicates the supplier's inspection process is inadequate. This is a systemic quality system failure, not just a dimensional issue.", category: "Incoming Inspection", difficulty: "critical" },
  ],
  proc: [
    { question: "What must be verified before accepting incoming raw material?", options: ["Only the correct quantity and physical condition", "Only the price matches the PO", "Just the delivery note and invoice", "Supplier certification (CoC), material grade matches the PO and MTC, heat number on physical material matches the MTC, correct dimensions and form (bar, plate, etc.), and traceability documentation is complete and consistent"], correct: 3, explanation: "Incoming material verification ensures the material entering production matches what was ordered and can be traced throughout the manufacturing process.", category: "Receiving", difficulty: "standard" },
    { question: "For DFARS-regulated materials, what specific document is mandatory and what must it contain?", options: ["Material Test Certificate (MTC) with: matching heat number, country of melt/pour origin (must be qualifying country), material composition, mechanical properties, and conformance to the specified material standard — all traceable to the specific heat/lot", "Customer PO reference only", "Standard supplier invoice with material description", "Any document with the material grade listed"], correct: 0, explanation: "DFARS requires documented evidence that material was melted/poured in a qualifying country. The MTC provides this traceability and must match the physical material.", category: "DFARS Compliance", difficulty: "standard" },
    { question: "What must material be tagged with before being issued to production?", options: ["Job ID, material grade, heat number, traceability ID, and applicable material standard — creating a complete traceability chain from raw material to finished part", "Only the Job ID", "Just the customer name and PO number", "Only the part number it will become"], correct: 0, explanation: "Complete material tagging ensures traceability at every production step. If any element is missing, the finished part cannot be certified.", category: "Traceability", difficulty: "standard" },
    { question: "Why must the Procurement Specialist verify that the material supplier is on the Approved Supplier List (ASL) before placing an order?", options: ["It's a purchasing policy with no quality impact", "Because only ASL suppliers have been vetted by SQE for quality system compliance, certification validity, and process capability. Using non-ASL suppliers means material may come with invalid certifications, incorrect traceability, or from non-compliant sources — invalidating the entire downstream production chain", "ASL is only required for aerospace materials", "Any supplier who provides an MTC is automatically approved"], correct: 1, explanation: "The ASL is a quality control mechanism. Non-ASL suppliers haven't been assessed for quality system compliance, and their certifications may not meet your requirements.", category: "Supplier Management", difficulty: "standard" },
    { question: "What is the procurement significance of a material's 'heat number' and why does it matter for manufacturing?", options: ["The heat number is just a supplier reference number for invoicing", "Heat numbers are assigned by the customer, not the material supplier", "Heat numbers only matter for steel, not other metals", "The heat number uniquely identifies a specific melt batch, linking the material to its chemical composition, mechanical properties, and processing history as documented on the MTC. Every part made from that heat can be traced back to its origin, enabling recall or investigation if a defect is later discovered"], correct: 3, explanation: "The heat number is the cornerstone of material traceability. It connects physical material to documented properties and enables root cause investigation across all parts from the same batch.", category: "Traceability", difficulty: "standard" },
    { question: "What factors beyond price should the Procurement Specialist consider when selecting a material supplier?", options: ["Price is the only relevant factor", "Material is material — any supplier who has stock is acceptable", "Only price and delivery date matter", "Lead time reliability, DFARS compliance capability, MTC accuracy and completeness history, material certification scope, ability to supply specific forms/sizes, minimum order quantities, historical reject rates (from SQE data), and geographical restrictions for controlled materials"], correct: 3, explanation: "Material supplier selection is a risk management decision, not just a purchasing decision. Quality history, compliance capability, and reliability all affect downstream production success.", category: "Supplier Selection", difficulty: "standard" },
    { question: "When receiving material against a PO that specifies AMS 5662 (Inconel 718), what specific checks must the Procurement Specialist perform beyond reading the MTC?", options: ["Just weigh the material to confirm quantity", "Physical verification: material markings on the bar/plate match the MTC heat number, dimensions match the PO, material form (bar/plate/sheet) is correct, visual condition check (no cracks, corrosion, or damage), and the MTC references AMS 5662 specifically — not a generic nickel alloy certification", "Reading the MTC is sufficient", "Only verify the material grade name matches"], correct: 2, explanation: "MTC verification must be correlated with physical inspection. A correct MTC with the wrong physical material (mismarked, swapped) is worse than no MTC because it provides false confidence.", category: "Receiving Inspection", difficulty: "standard" },
    { question: "What is the procurement implication of a customer PO that specifies 'material from EU-approved source only'?", options: ["This restricts procurement to suppliers who are specifically approved by the customer's own supplier evaluation process, not just any EU-based supplier. The Procurement Specialist must verify the customer's approved source list, or request clarification on which specific suppliers qualify", "Any European supplier qualifies", "EU-approved means DFARS-compliant European mills", "This restriction only applies to critical materials"], correct: 0, explanation: "Customer-specific source restrictions are contractual requirements that override normal procurement freedom. The Procurement Specialist must identify approved sources before ordering.", category: "Customer Requirements", difficulty: "standard" },
    { question: "SCENARIO: You're sourcing Ti-6Al-4V bar stock for an aerospace order. Supplier A offers DFARS-compliant material at $X with a 3-week lead time. Supplier B offers 30% cheaper material from an uncertified source with 1-week delivery. The job is urgent. Which do you choose?", options: ["Supplier B — save money and time on the urgent job", "Supplier A — DFARS compliance is a legal requirement for US defense aerospace contracts. Using non-compliant material voids the entire job, exposes the company to legal liability and potential debarment from government contracts. No cost savings or schedule pressure justifies this risk", "Buy from both and use whichever arrives first", "Ask the customer if they'll waive DFARS for this order"], correct: 1, explanation: "DFARS compliance is federal law, not a preference. Violations can result in criminal penalties, debarment, and civil liability. No business justification overrides legal requirements.", category: "Regulatory Compliance", difficulty: "critical" },
    { question: "SCENARIO: Incoming material arrives with an MTC, but the heat number stamped on the physical bar doesn't match the heat number on the MTC. The supplier says they 'mixed up the ink stamps during marking.' Do you accept?", options: ["REJECT. A heat number mismatch means you have NO verifiable traceability. The physical stamp is the ground truth — you cannot confirm the MTC belongs to this material. The bar could be a completely different alloy. Return for correct documentation or replacement material with matching heat numbers", "Accept — the supplier's explanation is plausible", "Accept the material and relabel it to match the MTC", "Use the material but create your own internal traceability number"], correct: 0, explanation: "Heat number mismatch breaks the traceability chain completely. You cannot prove the material's composition, properties, or origin. This is a potential safety issue for aerospace applications.", category: "Traceability Integrity", difficulty: "critical" },
    { question: "SCENARIO: You have 2 identical orders for 6061-T6 aluminum plate. One order has material on the shelf (purchased 2 years ago) with a valid MTC. The other needs fresh procurement. Can you use the shelf stock for either order?", options: ["Yes — aluminum doesn't expire and the MTC is valid", "Use shelf stock for the less critical order only", "Not without verification: check if either customer has a maximum material age requirement, verify storage conditions haven't caused corrosion or degradation, confirm the MTC is still traceable to the original supplier, check that the material standard hasn't been revised (rendering the old MTC non-current), and verify the material was stored per specification requirements", "Discard it — 2-year-old stock is too risky"], correct: 2, explanation: "Material age, storage conditions, specification currency, and customer-specific requirements all determine whether shelf stock is usable. 'Valid MTC' alone doesn't address all factors.", category: "Material Management", difficulty: "scenario" },
    { question: "SCENARIO: A PE urgently needs 4130 steel bar for a job that starts in 3 days. Your regular DFARS-compliant supplier quotes 2-week delivery. You find a local steel distributor who has 4130 in stock with next-day delivery and provides an MTC. However, the distributor is not on your Approved Supplier List. What do you do?", options: ["Buy from the distributor — they have an MTC so the material is fine", "Buy from both and use whichever arrives first", "Do NOT purchase from a non-ASL supplier. Contact SQE to determine if emergency supplier qualification is possible. Simultaneously explore: expedited delivery from the approved supplier, alternative approved suppliers who may have stock, and whether the project timeline can accommodate a short delay. The MTC from a non-approved source has unknown reliability", "Buy from the distributor and add them to the ASL afterward"], correct: 2, explanation: "Non-ASL suppliers haven't been vetted for MTC authenticity, DFARS compliance, or quality system adequacy. Their documentation may be unreliable regardless of how professional it looks.", category: "Emergency Procurement", difficulty: "critical" },
    { question: "SCENARIO: You place a PO for 50 bars of 316L stainless steel. The supplier delivers 50 bars with an MTC showing composition within ASTM A276 limits. However, you notice the MTC lists 2 different heat numbers — 30 bars from one heat and 20 from another. Is this acceptable?", options: ["Yes — both heats are certified and both are 316L", "It's acceptable IF: both heat numbers are documented separately on the MTC, each heat's composition and mechanical properties individually meet the specification, and your material management system can maintain separate traceability for each heat throughout production. Mixed heats require separate material tags and lot tracking", "No — all bars must be from the same heat number", "Only acceptable if the bars are physically identical"], correct: 1, explanation: "Mixed heat numbers require separate traceability because each heat has unique composition and properties. The procurement system must track which parts come from which heat.", category: "Material Lot Management", difficulty: "scenario" },
    { question: "SCENARIO: Your standard material supplier informs you they're transitioning from mill direct to a distribution model. Previously, they melted and certified the material themselves. Now, they'll buy from a mill and redistribute with their own CoC referencing the mill's MTC. How does this change affect your procurement process?", options: ["Significant impact: the supplier is now a distributor, not a manufacturer. You need to verify: the original mill is DFARS-compliant (if required), the distributor's CoC properly traces to the mill MTC, the distributor is qualified as a DISTRIBUTOR (different ASL category), and their incoming inspection of mill material is adequate. The traceability chain now has an additional link that must be verified", "No impact — same supplier, same material", "Only affects pricing, not quality", "Ask the supplier to continue providing the same paperwork as before"], correct: 0, explanation: "Adding a distribution layer changes the traceability chain. The distributor must be qualified separately, and the original mill's compliance must be independently verified.", category: "Supply Chain Changes", difficulty: "scenario" },
    { question: "SCENARIO: A customer's PO specifies 'Material per SAE AMS 4928 (Ti-6Al-4V bar, annealed).' Your procurement finds material certified to AMS 4928 but in the 'solution treated and aged' (STA) condition instead of annealed. The supplier says STA is a 'superior' condition with higher strength. Can you substitute?", options: ["Yes — STA is better than annealed, so it exceeds the requirement", "Absolutely NOT. Annealed and STA conditions have fundamentally different microstructures, mechanical properties, residual stress states, and machinability characteristics. 'Better' properties can actually be worse for the application (higher hardness = different machining behavior, different fatigue characteristics). This requires a formal customer drawing revision to change the material condition", "Accept if the customer doesn't specifically prohibit STA", "Check if the parts can be annealed after purchase to convert STA to annealed condition"], correct: 1, explanation: "Material condition (heat treatment state) is as critical as material grade. 'Superior' properties aren't universally better — they're different. Design intent specifies annealed for specific engineering reasons.", category: "Material Specification", difficulty: "critical" },
    { question: "SCENARIO: You're managing inventory for a production facility. Multiple jobs require 7075-T6 aluminum bar in the same size. Can you purchase one bulk lot and allocate bars to different jobs as needed?", options: ["Yes — all bars from the same lot are identical", "No — each job needs its own purchase order and delivery", "Yes, but with conditions: the bulk lot must be from a single heat number for consistent traceability, each job allocation must be individually tagged with its specific Job ID while maintaining the common heat number, and the allocation must be documented so each job's material traceability is independent. If the lot contains multiple heat numbers, each heat must be tracked separately", "Only if all jobs are for the same customer"], correct: 2, explanation: "Bulk purchasing is efficient but traceability must be maintained at the job level. Each job needs independent material documentation even when sharing a common purchase lot.", category: "Inventory Management", difficulty: "scenario" },
    { question: "SCENARIO: Your material supplier issues a batch recall notice for a specific heat number of Inconel 625 due to a testing error at the mill. You've already received and issued material from that heat number to two active jobs. Parts are in various stages of machining. What's your procurement response?", options: ["Wait for the supplier to provide corrected test results before acting", "Continue machining and inspect parts more carefully at the end", "Only stop jobs if the testing error is for a critical property", "Immediately: (1) Notify PM to halt production on both affected jobs, (2) Identify all bars from the recalled heat number in your inventory and quarantine them, (3) Trace all material already issued from that heat to specific jobs and parts, (4) Contact the supplier for corrective action details and replacement material timeline, (5) Coordinate with QE for disposition of in-process and completed parts"], correct: 3, explanation: "Material recalls require immediate, comprehensive response. The Procurement Specialist must trace all affected material — in inventory, in-process, and completed — and coordinate the response.", category: "Material Recall", difficulty: "critical" },
    { question: "SCENARIO: A PO for DFARS-compliant material requires melt origin documentation. The supplier's MTC shows the material was melted in the UK (a qualifying country) but processed (rolled) in China. Does this meet DFARS requirements?", options: ["It depends on which DFARS clause applies. Under DFARS 252.225-7009, the restriction applies to the melting process specifically. If the material was melted in a qualifying country (UK), subsequent processing (rolling, forging) can occur elsewhere. However, verify the specific contract clause — some contracts have broader restrictions through additional flow-down requirements", "No — both melting and processing must be in qualifying countries", "Yes — only the melt country matters under all circumstances", "Reject — any involvement of a non-qualifying country disqualifies the material"], correct: 0, explanation: "DFARS compliance has specific clause-level nuances. The Procurement Specialist must understand which clause applies and what it specifically restricts (melt only vs. broader processing).", category: "DFARS Nuance", difficulty: "critical" },
    { question: "SCENARIO: You receive a quote from an approved supplier for 15-5 PH stainless steel. The quote references ASTM A564, but your PE's material specification calls out AMS 5659. Both cover 15-5 PH. Are they interchangeable?", options: ["Yes — they're the same material, just different naming", "Not necessarily. While both cover 15-5 PH, they may have different composition limits, mechanical property requirements, testing methodologies, or documentation requirements. The PE specified AMS 5659 for a reason — possibly customer flow-down or specific property requirements. Order to AMS 5659 and ensure the MTC references it specifically", "Use whichever is cheaper since the material is the same", "ASTM is always equivalent to AMS for the same alloy"], correct: 1, explanation: "Different specifications for the same alloy can have different composition windows, testing requirements, and acceptance criteria. Specification substitution requires engineering review.", category: "Specification Equivalence", difficulty: "scenario" },
    { question: "SCENARIO: Your company has a policy of maintaining 2 weeks of safety stock for frequently used materials. Management wants to reduce inventory costs by eliminating safety stock. As the Procurement Specialist, what data do you present to inform this decision?", options: ["Agree immediately — inventory reduction saves money", "Suggest reducing safety stock to 1 week as a compromise", "Present a risk analysis: historical lead time variability by supplier, frequency of urgent orders that were filled from safety stock, cost of production stoppages caused by material shortages (including idle machine time, expedite shipping costs, missed customer deadlines), and comparison of safety stock carrying cost vs. stockout cost. This is a risk vs. cost decision, not a simple savings calculation", "Material procurement is fast enough that safety stock is unnecessary"], correct: 2, explanation: "Safety stock decisions must be data-driven, weighing carrying costs against stockout risks. The Procurement Specialist provides the operational data to inform management's strategic decision.", category: "Inventory Strategy", difficulty: "scenario" },
    { question: "SCENARIO: A PE requests material for a job but the drawing specifies a material grade you've never sourced before (a specialty nickel superalloy). What steps do you take before placing the order?", options: ["Research the material: identify the governing specification, determine DFARS applicability, check if any approved suppliers on your ASL carry it (consult SQE), verify minimum order quantities and lead times across multiple potential suppliers, confirm the material form and size are available per the PE's requirements, and identify any special handling or storage requirements for this alloy", "Search online for suppliers and order from the first one who has it", "Ask the PE to change to a material you've sourced before", "Order it and figure out the details when it arrives"], correct: 0, explanation: "New material procurement requires thorough research before ordering. The Procurement Specialist must understand specification requirements, supplier capability, and compliance implications.", category: "New Material Sourcing", difficulty: "scenario" },
    { question: "SCENARIO: You discover that a bar of Ti-6Al-4V issued to production 3 weeks ago was from a purchase order that didn't specify DFARS compliance, but the job it's being used for requires DFARS. The supplier happens to be a US mill, and the MTC appears to show domestic melt. Can you use this material?", options: ["Not automatically. DFARS compliance requires DOCUMENTED evidence of qualifying country melt origin explicitly stated on the MTC or a separate melt origin certification. A US mill address on the MTC doesn't prove melt origin (they could be processing imported billets). Contact the supplier for explicit melt origin documentation. If unavailable, the material cannot be certified as DFARS-compliant", "Yes — it's from a US mill, so it's automatically DFARS compliant", "Accept it since the mill is in the US and that's a qualifying country", "Pull the material and start over with a DFARS-specific order"], correct: 0, explanation: "DFARS compliance requires explicit documentation of melt origin, not assumption based on supplier location. Mills can process imported material, making location alone insufficient proof.", category: "DFARS Documentation", difficulty: "critical" },
    { question: "SCENARIO: Two identical POs arrive the same day — both for 304 stainless steel plate, same thickness, same quantity. One is for an AS9100 aerospace job, the other is for a commercial (non-aerospace) job. You have enough stock from one lot to fill both orders. How do you handle material allocation?", options: ["Allocate the same lot to both BUT: the aerospace job requires full MTC traceability and potentially DFARS compliance documentation. The commercial job may have relaxed documentation needs. Create separate material issue records with job-specific traceability. Verify the lot's MTC meets aerospace requirements before allocating to that job. Different documentation standards apply even if the physical material is identical", "Allocate from the same lot to both — it's the same material", "Give the better-looking pieces to the aerospace job", "Create separate purchase orders retroactively for traceability"], correct: 0, explanation: "Same material can have different documentation requirements. Aerospace allocation needs full MTC traceability; commercial may not. The procurement system must maintain independent traceability per job.", category: "Material Allocation", difficulty: "scenario" },
    { question: "SCENARIO: A supplier notifies you that a material lot you received 2 months ago is subject to a recall due to a testing error at the mill. You've already issued material from that lot to 3 different jobs — one is finished and shipped, one is in production, one hasn't started. What is the correct cascade of actions?", options: ["Only address the job that hasn't started yet", "Wait for the supplier to tell you what to do", "Initiate a full traceability investigation: (1) Identify ALL jobs that received material from the recalled lot using heat number records, (2) For the shipped job: notify the customer and QE immediately for potential field action, (3) For the in-production job: stop production and quarantine all parts, (4) For the unstarted job: quarantine the material and source replacement. Document everything for the NCR and potential customer notification requirements", "Only act if the testing error affected mechanical properties"], correct: 2, explanation: "Material recalls require immediate traceability-based containment across all affected jobs regardless of production status. The urgency increases for shipped product that may be in customer use.", category: "Material Recall", difficulty: "critical" },
    { question: "SCENARIO: You need to purchase cutting tools for a new Inconel 718 machining job. The programmer specifies ceramic inserts. Your usual tooling supplier doesn't stock the specific grade needed but offers a 'comparable alternative' at 30% lower cost. Should you substitute?", options: ["Yes — the cost savings are significant and the supplier says it's comparable", "No. Tooling specifications from the programmer are tied to the process sheet parameters (speeds, feeds, tool life expectations). Substituting a different insert grade without programmer approval can cause premature failure, dimensional drift, or surface finish issues. The programmer must evaluate and approve any tooling substitution before purchase", "Buy both and let the operator choose on the machine", "Substitute only if the alternative has a higher hardness rating"], correct: 1, explanation: "Tooling grades are integral to the machining process. The programmer specifies tools based on tested parameters. Substitution without engineering review can compromise quality and process stability.", category: "Tooling Procurement", difficulty: "scenario" },
    { question: "When placing a PO for a partial outsource process (e.g., heat treatment or anodizing), what must the Procurement Specialist include beyond the standard PO details?", options: ["Just the part quantity and delivery date", "Only the process name and supplier quote number", "The specific process specification (e.g., AMS 2759 for heat treat), required hardness or coating thickness, masking requirements, any NADCAP certification requirement, the QCP reference, required certifications upon return (CoC, process certificate, hardness report), and any special handling or packaging instructions from PE", "The same PO template as raw material orders"], correct: 2, explanation: "Outsource process POs carry technical requirements beyond standard purchases. The supplier must know exactly what process spec to follow, what certifications to provide, and what quality evidence to return.", category: "Outsource PO Management", difficulty: "standard" },
    { question: "What is the Procurement Specialist's role when the PE decides to fully outsource a complete job to a supplier?", options: ["Just forward the PE's email to the supplier", "The Procurement Specialist issues the full outsource PO to the supplier after PE has defined the scope. The PO must include: all drawings at correct revision, the validated QCP, process specifications, certification requirements (CoC, FAI if applicable, MTCs), delivery date, and all customer-specific flow-down requirements. PROC coordinates delivery tracking and ensures all required certifications are received before handing off to QE for incoming inspection", "Procurement has no involvement — PE handles full outsource directly", "Only negotiate the price and let PE handle everything else"], correct: 1, explanation: "Full outsource POs require comprehensive documentation flow-down. The Procurement Specialist ensures the supplier receives everything needed to produce conforming parts and return proper certifications.", category: "Full Outsource PO", difficulty: "standard" },
    { question: "SCENARIO: PE requests you to place a partial outsource PO for NADCAP hard anodizing on 200 aluminum parts. What specific supplier qualification must you verify before placing the order?", options: ["Any anodizing shop can do hard anodizing — just pick the cheapest", "Verify the supplier holds a current NADCAP accreditation for hard anodizing (not just decorative anodizing — they're different scopes), confirm they're on your ASL, verify their NADCAP cert hasn't expired, and confirm they can meet the specific MIL-A-8625 Type III specification called out. If the job is aerospace, confirm they accept aerospace flow-down requirements", "Just check they have ISO 9001", "Only verify they've done hard anodizing before"], correct: 1, explanation: "NADCAP accreditation is process-specific. A supplier accredited for one process type isn't automatically qualified for another. The Procurement Specialist must verify the specific scope matches the requirement.", category: "Outsource Supplier Qualification", difficulty: "scenario" },
    { question: "SCENARIO: You're managing a fully outsourced machining job. The supplier calls to say they need to substitute the specified cutting tools because they can't source the exact grade. They assure you the alternative is equivalent. How do you handle this?", options: ["Approve it — the supplier knows their machines best", "Thank the supplier for the heads-up but explain that any process deviation must be approved by your PE before proceeding. The tooling was specified for a reason and substitutions can affect surface finish, dimensional accuracy, and tool life. Escalate to PE immediately and relay their decision back to the supplier with written confirmation", "Tell them to stop work entirely and find the original tooling", "Let the supplier decide — it's their job now"], correct: 1, explanation: "Even in full outsource, process deviations need internal engineering approval. The Procurement Specialist is the communication bridge between the supplier and the PE for technical decisions.", category: "Full Outsource Management", difficulty: "scenario" },
    { question: "SCENARIO: Parts return from a partial outsource heat treatment supplier. The supplier provides a CoC but no hardness test report, even though the PO specified hardness testing per AMS 2759. The parts are needed urgently. What do you do?", options: ["Accept — the CoC covers everything", "Process the parts into production since the job is urgent", "DO NOT release the parts to production. Contact the supplier immediately and request the missing hardness test report. The CoC alone is insufficient when specific testing was called out on the PO. Inform PM of the delay and coordinate with QE. Parts cannot be accepted without all specified certifications — urgency does not override quality requirements", "Ask QE to do the hardness testing in-house to save time"], correct: 2, explanation: "Missing certifications mean the outsource process cannot be verified. The Procurement Specialist must enforce PO requirements regardless of schedule pressure. This is a traceability and compliance issue.", category: "Outsource Certification Control", difficulty: "critical" },
    { question: "SCENARIO: You have a fully outsourced job where the supplier must provide an AS9102 First Article Inspection report. The supplier delivers parts with dimensional inspection results but not in AS9102 format. They say 'all dimensions are shown.' Is this acceptable?", options: ["Yes — the data is there even if the format is different", "No — AS9102 is not just a format, it's a structured methodology that requires specific elements: balloon numbering matching the drawing, characteristic accountability (every feature accounted for), design requirements listed with actual measured results, material and process certifications referenced, and formal declaration of conformance. A generic inspection report may miss features or not provide complete traceability. Reject and request proper AS9102 documentation", "Accept and reformat it into AS9102 yourself", "Only reject if the customer specifically asked for AS9102"], correct: 1, explanation: "AS9102 FAI is a specific methodology ensuring every design characteristic is verified. Generic inspection reports often miss features or don't provide the structured accountability AS9102 requires.", category: "Full Outsource Documentation", difficulty: "critical" },
    { question: "What certifications must the Procurement Specialist collect from a partial outsource supplier before parts can be handed to QE for incoming inspection?", options: ["Just a delivery note is sufficient", "Only a CoC from the supplier", "All certifications specified on the PO: Certificate of Conformance (CoC) at minimum, plus any process-specific certificates — hardness test reports for heat treatment, coating thickness reports for plating/anodizing, conductivity reports after heat treat of aluminum, NADCAP conformance certificate if applicable, and any customer-specific certifications required by flow-down", "Whatever the supplier feels like providing"], correct: 2, explanation: "The Procurement Specialist is the first checkpoint for outsource documentation completeness. Parts with incomplete certifications cannot be presented to QE for incoming inspection.", category: "Outsource Documentation", difficulty: "standard" },
    { question: "SCENARIO: A supplier you use for plating services loses their NADCAP accreditation mid-way through an active outsource PO for nickel plating on aerospace parts. You find out when checking their status before sending the next batch. What actions do you take?", options: ["Continue using them — they had NADCAP when the PO was placed", "Immediately: (1) STOP shipment of the next batch, (2) Notify PE and QE about the supplier's NADCAP status change, (3) Determine if any parts were processed AFTER the accreditation lapse — those may need re-processing at a qualified supplier, (4) Source an alternative NADCAP-accredited plating supplier from your ASL, (5) Issue a new PO to the replacement supplier, (6) Notify PM of the impact on schedule and coordinate revised delivery dates", "Wait until the current PO is complete then switch suppliers", "Ask the supplier to expedite their NADCAP renewal"], correct: 1, explanation: "NADCAP lapse means the supplier can no longer certify their process meets aerospace requirements. Any work done after the lapse is potentially non-conforming. Immediate containment is required.", category: "Outsource Risk Management", difficulty: "critical" },
    { question: "SCENARIO: You're coordinating a partial outsource job where parts go through 3 suppliers in sequence: machining vendor → heat treatment → plating. Supplier 2 (heat treat) informs you of a 2-week delay. How do you manage this?", options: ["Just wait — delays happen", "Tell each supplier to hurry up", "Map the full impact: (1) Inform PM immediately with revised timeline, (2) Check if Supplier 3 (plating) can still meet their slot with the shifted schedule — if not, renegotiate their delivery window, (3) Explore alternative heat treat suppliers on the ASL who could meet the original timeline, (4) Update the outsource tracking log with revised dates for all 3 suppliers, (5) Coordinate with PE on whether the sequence can be modified, (6) Inform the commercial team if CEDD is affected", "Cancel the heat treatment and do it in-house"], correct: 2, explanation: "Multi-supplier outsource chains require proactive cascade management. A delay at one supplier ripples through the entire chain. The Procurement Specialist must coordinate all parties and escalate timeline impacts.", category: "Outsource Chain Management", difficulty: "scenario" },
  ],
};

function shuffleArray<T>(array: T[], seed: number): T[] {
  const shuffled = [...array];
  let m = shuffled.length;
  let s = seed;
  while (m) {
    s = (s * 1103515245 + 12345) & 0x7fffffff;
    const i = s % m--;
    [shuffled[m], shuffled[i]] = [shuffled[i], shuffled[m]];
  }
  return shuffled;
}

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
              <span className="absolute -top-2 -left-2 w-6 h-6 rounded-full bg-foreground text-background text-sm font-bold flex items-center justify-center">
                {phase.id}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="font-semibold text-base leading-tight">{phase.title}</h3>
                {phase.critical && (
                  <Badge variant="destructive" className="text-sm px-1.5 py-0">
                    CRITICAL
                  </Badge>
                )}
                {"skippableWhenOutsourced" in phase && phase.skippableWhenOutsourced && (
                  <Badge variant="outline" className="text-sm px-1.5 py-0 border-orange-400/50 text-orange-500">
                    SKIP IF FULLY OUTSOURCED
                  </Badge>
                )}
                {roles.filter(r => r.phases.includes(phase.id)).map(role => (
                  <Badge key={role.id} variant="outline" className={`text-xs px-1 py-0 ${role.textColor}`} data-testid={`role-badge-${role.id}-phase-${phase.id}`}>
                    {role.shortTitle}
                  </Badge>
                ))}
              </div>
              <p className="text-sm text-muted-foreground mt-0.5">{phase.subtitle}</p>
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
                        <h4 className={`font-medium text-sm ${phase.textColor}`}>{step.name}</h4>
                        {"critical" in step && step.critical && (
                          <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
                        )}
                      </div>
                      <div className="space-y-0 ml-1">
                        {step.details.map((d, di) => (
                          <div key={di} className="flex items-start gap-3 relative">
                            {di < step.details.length - 1 && (
                              <div className={`absolute left-[11px] top-6 w-0.5 h-full bg-gradient-to-b ${phase.color} opacity-20`} />
                            )}
                            <div className={`w-6 h-6 rounded-full bg-gradient-to-br ${phase.color} flex items-center justify-center flex-shrink-0 text-white text-xs font-bold z-10`}>
                              {di + 1}
                            </div>
                            <p className="text-sm text-muted-foreground pt-0.5 pb-3">{d}</p>
                          </div>
                        ))}
                      </div>
                      {"jobFolder" in step && step.jobFolder && (
                        <div className="mt-2 p-2 rounded bg-background/50 dark:bg-background/30">
                          <p className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-1">Job Folder Must Contain</p>
                          <div className="flex flex-wrap gap-1">
                            {step.jobFolder.map((item, i) => (
                              <Badge key={i} variant="secondary" className="text-sm">{item}</Badge>
                            ))}
                          </div>
                        </div>
                      )}
                      {"responsibilities" in step && step.responsibilities && typeof step.responsibilities === "object" && (
                        <div className="mt-2 space-y-1.5">
                          {Object.entries(step.responsibilities as Record<string, string[]>).map(([role, tasks]: [string, string[]]) => (
                            <div key={role} className="p-2 rounded bg-background/50 dark:bg-background/30">
                              <p className="text-sm font-semibold text-muted-foreground">{role}</p>
                              <ul className="mt-0.5">
                                {tasks.map((t: string, ti: number) => (
                                  <li key={ti} className="text-sm text-muted-foreground/80 flex items-center gap-1">
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
                              <p className="text-sm font-semibold text-muted-foreground mb-1">{cat} Classification</p>
                              <ul className="space-y-0.5">
                                {items.map((item, i) => (
                                  <li key={i} className="text-sm text-muted-foreground/80 flex items-center gap-1">
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
                      <h4 className="font-medium text-sm text-emerald-600 dark:text-emerald-400 mb-2">Inspection Method Classification</h4>
                      <div className="space-y-1.5">
                        {phase.inspectionLevels.map((il) => (
                          <div key={il.level} className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center text-sm font-bold text-emerald-600 dark:text-emerald-400 flex-shrink-0">
                              {il.level}
                            </div>
                            <div className="flex-1 min-w-0">
                              <span className="text-sm font-medium">{il.name}</span>
                              <span className="text-sm text-muted-foreground ml-1.5">{il.description}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {"numberingGuide" in phase && phase.numberingGuide && (
                    <div className="rounded-md p-3 bg-violet-500/5 dark:bg-violet-500/10 border border-violet-500/20" data-testid="numbering-guide">
                      <h4 className="font-medium text-sm text-violet-600 dark:text-violet-400 mb-2">Job Number Breakdown</h4>
                      <div className="flex items-end gap-0.5 justify-center mb-2">
                        {phase.numberingGuide.segments.map((seg, si) => (
                          <div key={si} className="flex flex-col items-center">
                            <span className="text-xs text-muted-foreground mb-0.5">{seg.label}</span>
                            <span className="font-mono text-base font-bold bg-violet-500/15 dark:bg-violet-500/25 px-1.5 py-0.5 rounded text-violet-700 dark:text-violet-300">{seg.part}</span>
                          </div>
                        ))}
                      </div>
                      <div className="flex items-center justify-center gap-3 text-sm">
                        <div className="flex items-center gap-1">
                          <span className="font-mono font-semibold text-foreground">{phase.numberingGuide.partExample}</span>
                          <Badge variant="outline" className="text-xs px-1 py-0">{phase.numberingGuide.partLabel}</Badge>
                        </div>
                        <ArrowRight className="w-3 h-3 text-muted-foreground/50" />
                        <div className="flex items-center gap-1">
                          <span className="font-mono font-semibold text-foreground">{phase.numberingGuide.setupExample}</span>
                          <Badge variant="outline" className="text-xs px-1 py-0">{phase.numberingGuide.setupLabel}</Badge>
                        </div>
                      </div>
                    </div>
                  )}

                  {"folderStructure" in phase && phase.folderStructure && (
                    <div className="rounded-md p-3 bg-violet-500/5 dark:bg-violet-500/10 border border-violet-500/20" data-testid="folder-structure">
                      <h4 className="font-medium text-sm text-violet-600 dark:text-violet-400 mb-3 flex items-center gap-1.5">
                        <Layers className="w-3.5 h-3.5" />
                        CAM Folder Structure
                      </h4>

                      <div className="space-y-2.5">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-md bg-violet-500/20 flex items-center justify-center flex-shrink-0">
                            <Layers className="w-4 h-4 text-violet-600 dark:text-violet-400" />
                          </div>
                          <span className="font-mono text-sm font-semibold text-violet-600 dark:text-violet-400">
                            {phase.folderStructure.project}/
                          </span>
                          <span className="text-xs text-muted-foreground">Project folder</span>
                        </div>

                        {phase.folderStructure.parts.map((part, pi) => (
                          <div key={pi} className="ml-6 p-2.5 rounded-md bg-background/60 dark:bg-background/30 border border-violet-500/10">
                            <div className="flex items-center gap-2 mb-1.5">
                              <FileText className="w-3.5 h-3.5 text-violet-500 flex-shrink-0" />
                              <span className="font-mono text-xs font-medium">{part.folder}</span>
                            </div>
                            <div className="ml-5 flex flex-wrap gap-1.5">
                              {part.setups.map((setup, si) => (
                                <Badge key={si} variant="outline" className="text-xs font-mono px-1.5 py-0.5">
                                  {setup}
                                </Badge>
                              ))}
                              <Badge variant="secondary" className="text-xs px-1.5 py-0.5">
                                + Process Sheet
                              </Badge>
                            </div>
                          </div>
                        ))}
                      </div>

                      <p className="text-xs text-muted-foreground mt-2.5 italic">
                        Total part folders must equal total manufacturing parts in the order
                      </p>
                    </div>
                  )}

                  {"processSheet" in phase && phase.processSheet && (
                    <div className="rounded-md p-3 bg-amber-500/5 dark:bg-amber-500/10 border border-amber-500/20" data-testid="process-sheet-info">
                      <h4 className="font-medium text-sm text-amber-600 dark:text-amber-400 mb-1.5 flex items-center gap-1.5">
                        <ClipboardCheck className="w-3.5 h-3.5" />
                        {phase.processSheet.description}
                      </h4>
                      <p className="text-sm text-muted-foreground mb-2">
                        {phase.processSheet.importance}
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {phase.processSheet.contains.map((item: string, ci: number) => (
                          <Badge key={ci} variant="outline" className="text-xs">{item}</Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {"frequencies" in phase && phase.frequencies && (
                    <div className="flex flex-wrap gap-1">
                      <span className="text-sm font-semibold text-muted-foreground mr-1">Frequency:</span>
                      {phase.frequencies.map((f, fi) => (
                        <Badge key={fi} variant="outline" className="text-sm">{f}</Badge>
                      ))}
                    </div>
                  )}

                  {"tagging" in phase && phase.tagging && (
                    <div className="flex flex-wrap gap-1">
                      <span className="text-sm font-semibold text-muted-foreground mr-1">Material Tag:</span>
                      {phase.tagging.map((t, ti) => (
                        <Badge key={ti} variant="outline" className="text-sm">{t}</Badge>
                      ))}
                    </div>
                  )}

                  {"outsourceModels" in phase && phase.outsourceModels && (
                    <div className="space-y-3" data-testid="outsource-models">
                      {phase.outsourceModels.map((model: any, mi: number) => (
                        <div key={mi} className={`rounded-md p-3 border ${model.type === "partial" ? "bg-cyan-500/5 dark:bg-cyan-500/10 border-cyan-500/20" : "bg-orange-500/5 dark:bg-orange-500/10 border-orange-500/20"}`} data-testid={`outsource-model-${model.type}`}>
                          <h4 className={`font-semibold text-sm mb-0.5 ${model.type === "partial" ? "text-cyan-600 dark:text-cyan-400" : "text-orange-600 dark:text-orange-400"}`}>
                            {model.title}
                          </h4>
                          <p className="text-sm text-muted-foreground mb-2">{model.description}</p>

                          <div className="space-y-2">
                            {model.steps.map((step: any, si: number) => (
                              <div key={si} className="space-y-0.5">
                                <div className="flex items-center gap-1.5">
                                  <span className={`text-sm font-semibold ${step.critical ? "text-destructive" : "text-foreground"}`}>
                                    {step.name}
                                  </span>
                                  {step.critical && (
                                    <Badge variant="destructive" className="text-xs px-1 py-0">CRITICAL</Badge>
                                  )}
                                </div>
                                <ul className="space-y-0.5 ml-3">
                                  {step.details.map((d: string, di: number) => (
                                    <li key={di} className="text-sm text-muted-foreground flex items-start gap-1.5">
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
                              <span className="text-xs font-semibold text-muted-foreground mr-1">Examples:</span>
                              {model.examples.map((ex: string, ei: number) => (
                                <Badge key={ei} variant="secondary" className="text-xs">{ex}</Badge>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  {"certifications" in phase && phase.certifications && (
                    <div className="rounded-md p-3 bg-sky-500/5 dark:bg-sky-500/10 border border-sky-500/20" data-testid="certifications">
                      <h4 className="font-medium text-sm text-sky-600 dark:text-sky-400 mb-2 flex items-center gap-1.5">
                        <Shield className="w-3.5 h-3.5" />
                        Required Certifications
                      </h4>
                      <div className="space-y-1.5">
                        {phase.certifications.map((cert: any, ci: number) => (
                          <div key={ci} className="grid grid-cols-[1fr_auto_2fr] gap-2 items-start text-sm">
                            <span className="font-medium">{cert.name}</span>
                            <Badge variant="outline" className="text-xs px-1 py-0 whitespace-nowrap">{cert.required}</Badge>
                            <span className="text-muted-foreground">{cert.description}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {"qeSignoff" in phase && phase.qeSignoff && (
                    <div className="rounded-md p-3 bg-destructive/5 dark:bg-destructive/10 border border-destructive/20" data-testid="qe-signoff">
                      <h4 className="font-medium text-sm text-destructive mb-1 flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        {phase.qeSignoff.title}
                      </h4>
                      <p className="text-sm text-muted-foreground mb-2">{phase.qeSignoff.description}</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-1">
                        {phase.qeSignoff.checkpoints.map((cp: string, ci: number) => (
                          <div key={ci} className="flex items-start gap-1.5 text-sm">
                            <CheckCircle2 className="w-3 h-3 text-destructive flex-shrink-0 mt-0.5" />
                            <span>{cp}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {"examples" in phase && !("outsourceModels" in phase) && phase.examples && Array.isArray(phase.examples) && (
                    <div className="flex flex-wrap gap-1">
                      <span className="text-sm font-semibold text-muted-foreground mr-1">Examples:</span>
                      {(phase.examples as string[]).map((e: string, ei: number) => (
                        <Badge key={ei} variant="secondary" className="text-sm">{e}</Badge>
                      ))}
                    </div>
                  )}

                  {phase.gate && (
                    <div className="flex items-start gap-2 p-2 rounded-md bg-destructive/10 border border-destructive/20">
                      <AlertTriangle className="w-4 h-4 text-destructive flex-shrink-0 mt-0.5" />
                      <p className="text-sm font-medium text-destructive">{phase.gate}</p>
                    </div>
                  )}

                  {"note" in phase && phase.note && (
                    <p className="text-sm text-muted-foreground italic">{phase.note}</p>
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
                <span className="text-xs text-orange-500 font-medium">In-house path OR skip to Phase 8 if fully outsourced</span>
              </div>
            ) : phase.id === 7 ? (
              <div className="flex flex-col items-center gap-0.5">
                <GitFork className="w-4 h-4 text-orange-400" />
                <span className="text-xs text-orange-500 font-medium">Partial outsource or continue in-house</span>
              </div>
            ) : phase.id === 8 ? (
              <div className="flex flex-col items-center gap-0.5">
                <GitMerge className="w-4 h-4 text-teal-500" />
                <span className="text-xs text-teal-600 dark:text-teal-400 font-medium">Paths merge for Final QC</span>
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
      <div className={`${color} px-3 py-2 rounded-md text-white font-medium whitespace-nowrap flex items-center gap-2 shadow-sm`}>
        {NodeIcon && <NodeIcon className="w-4 h-4" />}
        <span className="text-sm">{label}</span>
      </div>
      {badge && (
        <span className="absolute -top-2 -right-2 bg-destructive text-white text-[8px] font-bold px-1.5 py-0.5 rounded-full leading-none shadow-sm">
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
        <span className="text-xs text-muted-foreground/60 font-medium">{label}</span>
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
            <span className="text-sm font-semibold">Production Flow Map</span>
            <span className="text-sm text-muted-foreground ml-1">Non-linear process with parallel paths</span>
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
                <span className="text-xs font-semibold text-orange-500 flex items-center gap-1">
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
                  <span className="text-xs font-semibold text-cyan-600 dark:text-cyan-400 uppercase tracking-wider">In-House / Partial Outsource Path</span>
                  <div className="flex items-center gap-1.5 flex-wrap justify-center">
                    <FlowNode label="Material" color="bg-amber-500" delay={0.55} icon={Package} />
                    <FlowArrow delay={0.58} />
                    <FlowNode label="Programming" color="bg-violet-500" delay={0.6} icon={Layers} />
                    <FlowArrow delay={0.63} />
                    <FlowNode label="Setup" color="bg-rose-500" delay={0.65} icon={Wrench} />
                    <FlowArrow delay={0.68} />
                    <FlowNode label="Production" color="bg-cyan-500" delay={0.7} icon={Factory} />
                  </div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
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
                  <span className="text-xs font-semibold text-orange-600 dark:text-orange-400 uppercase tracking-wider">Full Outsource Path</span>
                  <div className="flex flex-col items-center gap-1">
                    <FlowNode label="QCP Validate" color="bg-orange-500" delay={0.55} icon={ClipboardCheck} badge="QE" />
                    <FlowArrow direction="down" delay={0.58} />
                    <FlowNode label="PE Orders" color="bg-orange-600" delay={0.6} icon={ExternalLink} />
                    <FlowArrow direction="down" delay={0.63} />
                    <FlowNode label="Incoming QC" color="bg-orange-500" delay={0.65} icon={Search} badge="QC" />
                  </div>
                  <div className="text-xs text-orange-500 font-medium mt-1 text-center">
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
                <span className="text-xs text-muted-foreground italic">
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
                <span className="text-xs text-muted-foreground font-medium">All paths merge</span>
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
              <span className="text-xs text-muted-foreground">In-House</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-orange-500" />
              <span className="text-xs text-muted-foreground">Full Outsource</span>
            </div>
            <div className="flex items-center gap-1.5">
              <GitFork className="w-3 h-3 text-orange-400" />
              <span className="text-xs text-muted-foreground">Routing Decision</span>
            </div>
            <div className="flex items-center gap-1.5">
              <GitMerge className="w-3 h-3 text-teal-500" />
              <span className="text-xs text-muted-foreground">Merge Point</span>
            </div>
            <div className="flex items-center gap-1.5">
              <RotateCcw className="w-3 h-3 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">Repeatable</span>
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
  const [shuffledQuestions, setShuffledQuestions] = useState<QuizQuestion[]>([]);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [categoryScores, setCategoryScores] = useState<Record<string, { correct: number; total: number }>>({});
  const [answers, setAnswers] = useState<Array<{ questionIndex: number; selected: number; correct: number; isCorrect: boolean; timeSpent: number }>>([]);
  const [questionStartTime, setQuestionStartTime] = useState<number>(Date.now());

  const currentRole = roles.find(r => r.id === selectedRole);
  const questions = shuffledQuestions;
  const ASSESSMENT_TIME_LIMIT = 60 * 60;

  useEffect(() => {
    if (startTime && !completed) {
      const timer = setInterval(() => {
        const elapsed = Math.floor((Date.now() - startTime) / 1000);
        setElapsedTime(elapsed);
        if (elapsed >= ASSESSMENT_TIME_LIMIT) {
          setCompleted(true);
        }
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [startTime, completed]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  const startQuiz = (roleId: string) => {
    const pool = roleQuizzes[roleId] || [];
    const seed = Date.now();
    const shuffled = shuffleArray(pool, seed);
    setSelectedRole(roleId);
    setShuffledQuestions(shuffled);
    setStartTime(Date.now());
    setQuestionStartTime(Date.now());
    setCategoryScores({});
    setAnswers([]);
  };

  const handleAnswer = (answerIndex: number) => {
    if (showResult) return;
    const timeSpent = Math.floor((Date.now() - questionStartTime) / 1000);
    setSelectedAnswer(answerIndex);
    setShowResult(true);
    const isCorrect = answerIndex === questions[currentQ].correct;
    if (isCorrect) setScore(score + 1);

    const cat = questions[currentQ].category;
    setCategoryScores(prev => ({
      ...prev,
      [cat]: {
        correct: (prev[cat]?.correct || 0) + (isCorrect ? 1 : 0),
        total: (prev[cat]?.total || 0) + 1,
      },
    }));

    setAnswers(prev => [...prev, {
      questionIndex: currentQ,
      selected: answerIndex,
      correct: questions[currentQ].correct,
      isCorrect,
      timeSpent,
    }]);
  };

  const nextQuestion = () => {
    if (currentQ < questions.length - 1) {
      setCurrentQ(currentQ + 1);
      setSelectedAnswer(null);
      setShowResult(false);
      setQuestionStartTime(Date.now());
    } else {
      setCompleted(true);
    }
  };

  const resetQuiz = () => {
    if (selectedRole) {
      startQuiz(selectedRole);
    }
    setCurrentQ(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setCompleted(false);
  };

  const backToRoles = () => {
    setSelectedRole(null);
    setShuffledQuestions([]);
    setCurrentQ(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setCompleted(false);
    setStartTime(null);
    setElapsedTime(0);
    setCategoryScores({});
    setAnswers([]);
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
        <p className="text-sm text-muted-foreground text-center">Select your role to begin a timed competency assessment. Questions are randomized from a large pool — each attempt is unique.</p>
        {grouped.map(group => (
          <div key={group.tier}>
            <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2">{group.label}</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {group.members.map(role => {
                const RoleIcon = role.icon;
                const pool = roleQuizzes[role.id] || [];
                const scenarios = pool.filter(q => q.difficulty === "scenario" || q.difficulty === "critical").length;
                return (
                  <Card
                    key={role.id}
                    className="overflow-visible hover-elevate cursor-pointer"
                    onClick={() => startQuiz(role.id)}
                    data-testid={`role-select-${role.id}`}
                  >
                    <CardContent className="p-3 flex items-center gap-3">
                      <div className={`w-9 h-9 rounded-md ${role.color} flex items-center justify-center flex-shrink-0`}>
                        <RoleIcon className="w-4 h-4 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold leading-tight">{role.title}</p>
                        <p className="text-sm text-muted-foreground">{pool.length} questions ({scenarios} scenarios)</p>
                      </div>
                      <Badge variant="outline" className="text-xs flex-shrink-0">{role.shortTitle}</Badge>
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
    const scenarioQs = answers.filter((_, i) => questions[i]?.difficulty === "scenario" || questions[i]?.difficulty === "critical");
    const scenarioScore = scenarioQs.filter(a => a.isCorrect).length;
    const criticalQs = answers.filter((_, i) => questions[i]?.difficulty === "critical");
    const criticalScore = criticalQs.filter(a => a.isCorrect).length;
    const avgTime = answers.length > 0 ? Math.round(answers.reduce((sum, a) => sum + a.timeSpent, 0) / answers.length) : 0;
    const rating = percentage >= 90 ? "Expert" : percentage >= 75 ? "Proficient" : percentage >= 60 ? "Developing" : "Needs Training";
    const ratingColor = percentage >= 90 ? "text-emerald-600 dark:text-emerald-400" : percentage >= 75 ? "text-blue-600 dark:text-blue-400" : percentage >= 60 ? "text-amber-600 dark:text-amber-400" : "text-destructive";

    return (
      <div className="space-y-4 py-4" data-testid="quiz-complete">
        <div className="text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            <div className={`w-20 h-20 mx-auto rounded-full flex items-center justify-center ${percentage >= 75 ? "bg-emerald-500/20" : "bg-amber-500/20"}`}>
              <span className={`text-3xl font-bold ${percentage >= 75 ? "text-emerald-600 dark:text-emerald-400" : "text-amber-600 dark:text-amber-400"}`}>
                {percentage}%
              </span>
            </div>
          </motion.div>
          <h3 className={`text-xl font-bold mt-2 ${ratingColor}`}>{rating}</h3>
          <p className="text-sm text-muted-foreground">{currentRole?.title} — {score}/{questions.length} correct in {formatTime(elapsedTime)}</p>
        </div>

        <Card className="overflow-visible" data-testid="score-breakdown">
          <CardContent className="p-4 space-y-3">
            <h4 className="text-sm font-semibold">Performance Breakdown</h4>
            <div className="grid grid-cols-3 gap-2">
              <div className="p-2 rounded-md bg-muted/30 border text-center">
                <p className="text-xl font-bold">{score}/{questions.length}</p>
                <p className="text-xs text-muted-foreground">Overall</p>
              </div>
              <div className="p-2 rounded-md bg-muted/30 border text-center">
                <p className="text-xl font-bold">{scenarioQs.length > 0 ? Math.round((scenarioScore / scenarioQs.length) * 100) : 0}%</p>
                <p className="text-xs text-muted-foreground">Scenarios</p>
              </div>
              <div className="p-2 rounded-md bg-muted/30 border text-center">
                <p className="text-xl font-bold">{avgTime}s</p>
                <p className="text-xs text-muted-foreground">Avg/Question</p>
              </div>
            </div>

            {criticalQs.length > 0 && (
              <div className={`p-2 rounded-md border ${criticalScore === criticalQs.length ? "bg-emerald-500/10 border-emerald-500/30" : "bg-destructive/10 border-destructive/30"}`}>
                <p className={`text-sm font-semibold ${criticalScore === criticalQs.length ? "text-emerald-600 dark:text-emerald-400" : "text-destructive"}`}>
                  Critical Decisions: {criticalScore}/{criticalQs.length} {criticalScore === criticalQs.length ? "— All correct" : "— Review required"}
                </p>
              </div>
            )}

            <h4 className="text-sm font-semibold mt-2">Category Scores</h4>
            <div className="space-y-1.5">
              {Object.entries(categoryScores).map(([cat, data]) => {
                const catPct = Math.round((data.correct / data.total) * 100);
                return (
                  <div key={cat}>
                    <div className="flex items-center justify-between gap-2 mb-0.5">
                      <span className="text-sm font-medium">{cat}</span>
                      <span className="text-sm text-muted-foreground">{data.correct}/{data.total}</span>
                    </div>
                    <Progress value={catPct} className="h-1.5" />
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        <div className="flex items-center justify-center gap-2">
          <Button variant="outline" onClick={backToRoles} data-testid="button-back-roles">
            Change Role
          </Button>
          <Button onClick={resetQuiz} data-testid="button-retry-quiz">
            Retake (New Order)
          </Button>
        </div>
      </div>
    );
  }

  const RoleIcon = currentRole?.icon || Shield;
  const currentDifficulty = questions[currentQ]?.difficulty;
  const timeRemaining = ASSESSMENT_TIME_LIMIT - elapsedTime;
  const timeWarning = timeRemaining < 300;

  return (
    <div className="space-y-4" data-testid="training-quiz">
      <div className="flex items-center justify-between gap-2">
        <button
          onClick={backToRoles}
          className="flex items-center gap-1.5 text-sm text-muted-foreground px-2 py-1 rounded-md"
          data-testid="button-back-roles-inline"
        >
          <ArrowRight className="w-3 h-3 rotate-180" />
          Exit
        </button>
        <div className="flex items-center gap-2">
          <div className={`w-6 h-6 rounded-md ${currentRole?.color} flex items-center justify-center`}>
            <RoleIcon className="w-3.5 h-3.5 text-white" />
          </div>
          <span className="text-sm font-semibold">{currentRole?.shortTitle}</span>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="text-sm">{score}/{currentQ + (showResult ? 1 : 0)}</Badge>
          <Badge variant={timeWarning ? "destructive" : "outline"} className="text-sm tabular-nums">
            {formatTime(Math.max(0, timeRemaining))}
          </Badge>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <span className="text-sm text-muted-foreground whitespace-nowrap">
          Q{currentQ + 1}/{questions.length}
        </span>
        <Progress value={((currentQ + (showResult ? 1 : 0)) / questions.length) * 100} className="flex-1" />
        {currentDifficulty && currentDifficulty !== "standard" && (
          <Badge
            variant={currentDifficulty === "critical" ? "destructive" : "outline"}
            className="text-xs px-1.5 py-0"
          >
            {currentDifficulty === "critical" ? "CRITICAL" : "SCENARIO"}
          </Badge>
        )}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentQ}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.2 }}
        >
          <h4 className="font-medium text-base mb-3">{questions[currentQ].question}</h4>
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
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 text-sm font-bold ${
                      showResult && oi === questions[currentQ].correct
                        ? "border-emerald-500 text-emerald-600 dark:text-emerald-400"
                        : showResult && oi === selectedAnswer
                          ? "border-destructive text-destructive"
                          : "border-muted-foreground/30 text-muted-foreground"
                    }`}>
                      {String.fromCharCode(65 + oi)}
                    </div>
                    <span className="text-base">{option}</span>
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
              <p className="text-sm text-muted-foreground">
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
  const [activeTab, setActiveTab] = useState("roles");

  return (
    <div className="min-h-screen bg-background">
      <div className="sticky top-0 z-[9999] bg-background/80 backdrop-blur-lg border-b">
        <div className="max-w-4xl mx-auto px-4 py-3">
          <div className="flex items-center gap-3">
            <img src={precilayerLogo} alt="Precilayer" className="h-7 flex-shrink-0" data-testid="img-precilayer-logo" />
            <div className="h-5 w-px bg-border flex-shrink-0" />
            <p className="text-sm text-muted-foreground leading-tight font-medium">Master Production & Quality Flow</p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-6"
        >
          <h2 className="text-3xl font-bold tracking-tight" data-testid="text-main-title">
            Production & Quality Control
          </h2>
          <p className="text-base text-muted-foreground mt-1 max-w-xl mx-auto">
            AS9100 & ISO 13485 compliant master production flow
          </p>
          <div className="flex items-center justify-center gap-3 mt-3 flex-wrap">
            <Badge variant="outline" className="text-xs px-2 py-0.5 border-blue-400/50 text-blue-500">AS9100 Rev D</Badge>
            <Badge variant="outline" className="text-xs px-2 py-0.5 border-emerald-400/50 text-emerald-500">ISO 13485</Badge>
            <Badge variant="outline" className="text-xs px-2 py-0.5 border-violet-400/50 text-violet-500">NADCAP</Badge>
            <Badge variant="outline" className="text-xs px-2 py-0.5 border-amber-400/50 text-amber-500">ITAR Controlled</Badge>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
            {[
              { label: "Production Phases", value: "11", icon: Layers, color: "text-blue-500" },
              { label: "Critical Gates", value: "5", icon: Shield, color: "text-red-500" },
              { label: "Defined Roles", value: "11", icon: Users, color: "text-emerald-500" },
              { label: "Assessment Questions", value: "285", icon: BookOpen, color: "text-violet-500" },
            ].map((stat, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + i * 0.05 }}>
                <Card className="overflow-visible">
                  <CardContent className="p-3 flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-md bg-muted/50 flex items-center justify-center ${stat.color}`}>
                      <stat.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold leading-none">{stat.value}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{stat.label}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <FlowchartMini />

        <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-4">
          <TabsList className="grid w-full grid-cols-5" data-testid="tabs-navigation">
            <TabsTrigger value="roles" data-testid="tab-roles">
              <Users className="w-3.5 h-3.5 mr-1.5" />
              <span className="hidden sm:inline">Roles</span>
            </TabsTrigger>
            <TabsTrigger value="flow" data-testid="tab-flow">
              <Factory className="w-3.5 h-3.5 mr-1.5" />
              <span className="hidden sm:inline">Flow</span>
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
                <h3 className="text-xl font-bold" data-testid="text-roles-title">Roles & Responsibilities</h3>
                <p className="text-sm text-muted-foreground">Who does what across the 11-phase production flow</p>
              </div>

              {Object.entries(tierLabels)
                .sort(([, a], [, b]) => a.order - b.order)
                .map(([tierId, tierInfo]) => {
                  const tierRoles = roles.filter(r => r.tier === tierId);
                  if (tierRoles.length === 0) return null;
                  return (
                    <div key={tierId} className="mb-4">
                      <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2 flex items-center gap-1.5">
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
                                        <h4 className="font-semibold text-base">{role.title}</h4>
                                        <Badge variant="outline" className="text-sm px-1.5 py-0">{role.shortTitle}</Badge>
                                      </div>
                                      <p className="text-sm text-muted-foreground mt-1">{role.description}</p>
                                      <div className="mt-2 space-y-1">
                                        {role.responsibilities.map((resp, i) => (
                                          <div key={i} className="flex items-start gap-1.5 text-sm">
                                            <ChevronRight className="w-2.5 h-2.5 flex-shrink-0 mt-0.5 text-muted-foreground/50" />
                                            <span className="text-muted-foreground">{resp}</span>
                                          </div>
                                        ))}
                                      </div>
                                      <div className="mt-3">
                                        <p className="text-xs font-semibold text-muted-foreground mb-1.5">Phase Coverage</p>
                                        <div className="flex gap-0.5">
                                          {Array.from({ length: 11 }, (_, i) => i + 1).map(phaseId => (
                                            <div
                                              key={phaseId}
                                              className={`h-6 flex-1 rounded-sm flex items-center justify-center text-xs font-bold transition-colors ${
                                                role.phases.includes(phaseId)
                                                  ? `${role.color} text-white`
                                                  : "bg-muted/30 text-muted-foreground/30"
                                              }`}
                                              title={`Phase ${phaseId}: ${phases[phaseId - 1]?.title}`}
                                            >
                                              {phaseId}
                                            </div>
                                          ))}
                                        </div>
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
                <h3 className="text-xl font-bold" data-testid="text-critical-title">5 Critical Control Points</h3>
                <p className="text-sm text-muted-foreground">These points guarantee total quality control. They must NEVER fail.</p>
              </div>
              {criticalControlPoints.map((cp, index) => {
                const Icon = cp.icon;
                const ownerRoleData = cp.ownerRoles.map(rid => roles.find(r => r.id === rid)).filter(Boolean);
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="overflow-visible" data-testid={`critical-point-${index}`}>
                      <div className="h-1 w-full rounded-t-md bg-gradient-to-r from-red-500 via-orange-500 to-red-600" />
                      <CardContent className="p-4 flex items-start gap-4">
                        <div className="relative w-12 h-12 rounded-md bg-gradient-to-br from-red-500/20 to-orange-500/10 flex items-center justify-center flex-shrink-0 border border-destructive/20">
                          <Icon className="w-6 h-6 text-destructive" />
                          <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-destructive text-white text-xs font-bold flex items-center justify-center">{index + 1}</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <h4 className="font-semibold text-base">{cp.name}</h4>
                            <Badge variant="destructive" className="text-sm px-1.5 py-0">MUST NOT FAIL</Badge>
                            <Badge variant="secondary" className="text-xs px-1 py-0">Phase {cp.phase}</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">{cp.description}</p>
                          <div className="flex items-center gap-1.5 mt-2 flex-wrap">
                            <span className="text-xs font-semibold text-muted-foreground">Owned by:</span>
                            {ownerRoleData.map(role => role && (
                              <Badge key={role.id} variant="outline" className={`text-xs px-1.5 py-0 ${role.textColor}`}>
                                {role.shortTitle} — {role.title}
                              </Badge>
                            ))}
                          </div>
                          <div className="mt-2 p-2 rounded-md bg-destructive/5 border border-destructive/10">
                            <p className="text-sm text-destructive font-medium">
                              If this fails: {cp.failureImpact}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}

              <Card className="overflow-visible mt-6" data-testid="traceability-summary">
                <CardContent className="p-4">
                  <h4 className="font-semibold text-base mb-2 flex items-center gap-2">
                    <FlaskConical className="w-4 h-4 text-primary" />
                    Traceability Control Requirement
                  </h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    Mandatory traceability must be maintained between:
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    {["Material heat number", "Job ID", "Inspection records", "Supplier process records"].map((item, i) => (
                      <div key={i} className="flex items-center gap-2 p-2 rounded-md bg-primary/5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                        <span className="text-sm">{item}</span>
                      </div>
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground mt-2 italic">
                    This ensures aerospace and medical compliance readiness.
                  </p>
                </CardContent>
              </Card>

              <Card className="overflow-visible" data-testid="outsource-summary">
                <CardContent className="p-4">
                  <h4 className="font-semibold text-base mb-2 flex items-center gap-2">
                    <ExternalLink className="w-4 h-4 text-orange-500" />
                    Outsourced Process QC Summary
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="p-3 rounded-md bg-orange-500/5 border border-orange-500/20">
                      <p className="text-sm font-semibold text-orange-600 dark:text-orange-400 mb-1.5">Before Outsourcing</p>
                      <ul className="space-y-1">
                        {["Outgoing QC inspection mandatory", "Part count verification mandatory"].map((item, i) => (
                          <li key={i} className="text-xs text-muted-foreground flex items-center gap-1.5">
                            <AlertTriangle className="w-3 h-3 text-orange-500 flex-shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="p-3 rounded-md bg-orange-500/5 border border-orange-500/20">
                      <p className="text-sm font-semibold text-orange-600 dark:text-orange-400 mb-1.5">After Outsourcing</p>
                      <ul className="space-y-1">
                        {["Incoming QC inspection mandatory", "Supplier certification verification", "Traceability maintained mandatory"].map((item, i) => (
                          <li key={i} className="text-xs text-muted-foreground flex items-center gap-1.5">
                            <AlertTriangle className="w-3 h-3 text-orange-500 flex-shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="mt-2 p-2 rounded bg-destructive/10 border border-destructive/20">
                    <p className="text-xs font-medium text-destructive text-center">
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
                <h3 className="text-xl font-bold" data-testid="text-matrix-title">Department Responsibility Matrix</h3>
                <p className="text-sm text-muted-foreground">Who owns what across each department — phases, gates, and deliverables.</p>
              </div>

              {Object.entries(tierLabels)
                .sort(([, a], [, b]) => a.order - b.order)
                .map(([tierId, tierInfo]) => {
                  const deptRoles = roles.filter(r => r.tier === tierId);
                  if (deptRoles.length === 0) return null;
                  const deptPhases = Array.from(new Set(deptRoles.flatMap(r => r.phases))).sort((a, b) => a - b);
                  const deptCritical = criticalControlPoints.filter(cp => cp.ownerRoles.some(rid => deptRoles.some(r => r.id === rid)));
                  return (
                    <Card key={tierId} className="overflow-visible mb-4" data-testid={`dept-matrix-${tierId}`}>
                      <CardContent className="p-4">
                        <div className="flex items-center gap-2 mb-3 flex-wrap">
                          <h4 className="font-semibold text-base">{tierInfo.label} Department</h4>
                          <Badge variant="secondary" className="text-xs">{deptRoles.length} roles</Badge>
                          <Badge variant="secondary" className="text-xs">{deptPhases.length} phases</Badge>
                          {deptCritical.length > 0 && (
                            <Badge variant="destructive" className="text-xs">{deptCritical.length} critical gates</Badge>
                          )}
                        </div>
                        <div className="space-y-3">
                          {deptRoles.map(role => {
                            const RoleIcon = role.icon;
                            const roleCritical = criticalControlPoints.filter(cp => cp.ownerRoles.includes(role.id));
                            return (
                              <div key={role.id} className="p-3 rounded-md bg-muted/30 border">
                                <div className="flex items-center gap-2 mb-2 flex-wrap">
                                  <div className={`w-7 h-7 rounded-md ${role.color} flex items-center justify-center flex-shrink-0`}>
                                    <RoleIcon className="w-3.5 h-3.5 text-white" />
                                  </div>
                                  <span className="text-sm font-semibold">{role.title}</span>
                                  <Badge variant="outline" className="text-xs px-1 py-0">{role.shortTitle}</Badge>
                                </div>
                                <div className="mb-2">
                                  <div className="flex gap-0.5">
                                    {Array.from({ length: 11 }, (_, i) => i + 1).map(phaseId => {
                                      const active = role.phases.includes(phaseId);
                                      const phase = phases.find(p => p.id === phaseId);
                                      return (
                                        <div
                                          key={phaseId}
                                          className={`h-5 flex-1 rounded-sm flex items-center justify-center text-[10px] font-bold ${
                                            active ? `${role.color} text-white` : "bg-muted/20 text-muted-foreground/20"
                                          }`}
                                          title={active ? `Phase ${phaseId}: ${phase?.title}` : `Phase ${phaseId}`}
                                        >
                                          {phaseId}
                                        </div>
                                      );
                                    })}
                                  </div>
                                </div>
                                <div className="flex flex-wrap gap-1">
                                  <span className="text-xs text-muted-foreground font-semibold mr-1">Deliverables:</span>
                                  {role.responsibilities.slice(0, 3).map((r, i) => (
                                    <span key={i} className="text-xs text-muted-foreground">{i > 0 ? " · " : ""}{r}</span>
                                  ))}
                                </div>
                                {roleCritical.length > 0 && (
                                  <div className="flex items-center gap-1 mt-2 flex-wrap">
                                    <AlertTriangle className="w-3 h-3 text-destructive flex-shrink-0" />
                                    <span className="text-xs font-semibold text-destructive">Critical gates:</span>
                                    {roleCritical.map((cp, i) => (
                                      <span key={i} className="text-xs text-destructive">{cp.name}</span>
                                    ))}
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}

              <Card className="overflow-visible" data-testid="inspection-matrix">
                <CardContent className="p-4">
                  <h4 className="font-semibold text-base mb-3 flex items-center gap-2">
                    <Search className="w-4 h-4 text-primary" />
                    Inspection Level Reference
                  </h4>
                  <div className="space-y-2">
                    {inspectionMatrix.map((row, index) => (
                      <div key={index} className="flex items-center gap-3 p-2 rounded-md bg-muted/20 border">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <span className="text-sm font-bold text-primary">L{row.level}</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium">{row.condition}</p>
                          <p className="text-sm text-muted-foreground">{row.method}</p>
                        </div>
                        <Badge variant={row.level >= 4 ? "destructive" : "secondary"} className="flex-shrink-0 text-xs">
                          Level {row.level}
                        </Badge>
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
                <h3 className="text-xl font-bold" data-testid="text-quiz-title">Competency Assessment</h3>
                <p className="text-sm text-muted-foreground">Timed, randomized assessment with scenario-based decision-making questions. Each attempt is unique.</p>
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
          <p className="text-sm text-muted-foreground">
            PRECILAYER Master Production & Quality Flow Training Module
          </p>
        </footer>
      </div>
    </div>
  );
}
