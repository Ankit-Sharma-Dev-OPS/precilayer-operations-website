import { useState, useEffect } from "react";
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
  { name: "Final Inspection Approval", icon: CheckCircle2, description: "Complete final inspection per Quality Control Plan must be passed before parts can be released for dispatch.", ownerRoles: ["qe"], phase: 10, failureImpact: "Non-conforming parts shipped to customer — warranty claims, regulatory action" },
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
  { id: "proc", title: "Procurement Specialist", shortTitle: "PROC", icon: ShoppingCart, color: "bg-amber-600", textColor: "text-amber-700 dark:text-amber-300", tier: "commercial", description: "Manages raw material procurement, supplier sourcing, and purchase order management. Ensures materials meet specifications and are delivered on time.", responsibilities: ["Raw material sourcing and ordering", "Supplier evaluation for materials", "Purchase order management", "Material delivery tracking", "Material certification collection"], phases: [4] },
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
    { question: "What must be completed and released before programming can begin?", options: ["Customer PO", "Manufacturing Strategy Sheet", "Raw material order", "Quality Control Plan only"], correct: 1, explanation: "The Manufacturing Strategy Sheet must be fully completed and released by the Project Engineer before programming starts.", category: "Strategy", difficulty: "standard" },
    { question: "In a full outsource model, who is responsible for placing the order with the supplier?", options: ["Commercial Engineer", "Quality Engineer", "Project Engineer", "Procurement Specialist"], correct: 2, explanation: "In full outsource (Model B), the Project Engineer places the order — not the commercial team.", category: "Outsource", difficulty: "standard" },
    { question: "What must the Project Engineer provide with the CEDD estimation?", options: ["Only the delivery date", "Total time including outsource lead times and delivery risks", "Just the machining hours", "Customer's requested date only"], correct: 1, explanation: "PE must estimate total time including outsource lead times, confirm CEDD, and inform the commercial team about any delivery risks early.", category: "Planning", difficulty: "standard" },
    { question: "What is the PE's role in deviation management?", options: ["PEs cannot approve deviations", "PE approval is needed alongside PM for programming deviations", "Only QE can approve deviations", "Deviations are not allowed"], correct: 1, explanation: "No programming deviation is allowed without PE and PM approval. The PE is the technical authority for the job.", category: "Deviations", difficulty: "standard" },
    { question: "SCENARIO: A customer sends a drawing for a titanium part with tight GD&T and a 3-week deadline. Your shop can do 70% in-house but needs anodizing externally. The supplier's NADCAP cert expires in 2 weeks. What is your FIRST action?", options: ["Accept the job and worry about the cert later", "Flag the NADCAP expiry risk, get SQE to verify renewal status before committing delivery date", "Reject the job outright", "Ask CE to negotiate a longer timeline without checking supplier status"], correct: 1, explanation: "The PE must identify and escalate risks immediately. Supplier cert expiry is a showstopper — verify before committing.", category: "Decision Making", difficulty: "scenario" },
    { question: "SCENARIO: During strategy definition, you realize the customer drawing calls for a datum scheme that would require a 5-axis setup, but your shop only has 3-axis machines. The PM says just run it anyway. What do you do?", options: ["Follow PM's instruction — they outrank you technically", "Refuse and redesign the datum scheme to fit 3-axis capability, then update the strategy sheet accordingly", "Skip datum definition entirely", "Tell the customer their drawing is wrong"], correct: 1, explanation: "The PE is the technical authority. You must redesign for feasible manufacturing while maintaining spec compliance, then document it in the strategy sheet.", category: "Decision Making", difficulty: "scenario" },
    { question: "SCENARIO: You're creating the Manufacturing Strategy Sheet for a repeat order. The previous job had a non-conformance on Setup 3 due to insufficient clamping force. What must you address?", options: ["Copy the old strategy sheet as-is since it's a repeat", "Update the strategy sheet with corrective actions from the previous NCR, specifically addressing clamping for Setup 3", "Leave it to the programmer to figure out", "Skip Setup 3 entirely this time"], correct: 1, explanation: "Repeat orders must incorporate lessons learned. The PE must update the strategy sheet with corrective actions — never blindly copy.", category: "Continuous Improvement", difficulty: "scenario" },
    { question: "SCENARIO: Programming is 80% complete when the customer issues a drawing revision changing 3 tolerances. The programmer says the changes are minor and wants to continue without updating the strategy sheet. Your call?", options: ["Allow it — programmer knows best", "STOP. Any drawing revision requires strategy sheet review, tolerance re-assessment, and formal re-release before programming continues", "Only update if the customer asks", "Let QE decide"], correct: 1, explanation: "Drawing revisions require full strategy sheet review. 'Minor' changes can have major downstream impact on fixtures, inspection, and tooling.", category: "Change Control", difficulty: "critical" },
    { question: "You're estimating CEDD for a job with 3 outsource processes (heat treat, plating, NDT). Each supplier quotes 5 working days. What's the minimum outsource lead time you should factor?", options: ["5 days total (they run in parallel)", "15 days (sequential) plus transport time and incoming inspection time for each return", "10 days (some overlap)", "Just ask the customer for their deadline and work backwards"], correct: 1, explanation: "Outsource processes are typically sequential (heat treat before plating before NDT). Add transport + incoming QC time for each stage.", category: "Planning", difficulty: "scenario" },
    { question: "SCENARIO: The customer wants to add a non-standard surface finish spec not in your normal process library. Who must be consulted before you include it in the strategy sheet?", options: ["Nobody — just add it", "QE for inspection feasibility and SQE if outsourced", "Only the programmer", "The CE handles all customer specs"], correct: 1, explanation: "Non-standard specs need QE input (can we inspect it?) and SQE input (can a qualified supplier do it?). The PE coordinates but doesn't decide alone.", category: "Cross-functional", difficulty: "scenario" },
  ],
  ce: [
    { question: "What is the first step when a customer PO is received?", options: ["Send to production immediately", "Create Sales Order and verify PO details", "Order raw material", "Start programming"], correct: 1, explanation: "The Commercial Engineer creates the Sales Order and verifies all PO details before anything else happens.", category: "Order Intake", difficulty: "standard" },
    { question: "Can the Commercial Engineer place outsource orders with suppliers?", options: ["Yes, always", "Yes, for partial outsource only", "No — this is the Project Engineer's responsibility", "Only with QE approval"], correct: 2, explanation: "In the full outsource model, order placement is the Project Engineer's responsibility, not the commercial team's.", category: "Outsource", difficulty: "standard" },
    { question: "What should the CE do when PE flags a delivery risk?", options: ["Ignore it and commit to the original date", "Communicate the risk to the customer proactively", "Ask production to work overtime", "Change the order quantity"], correct: 1, explanation: "The CE must communicate delivery risks flagged by the PE to the customer proactively and manage expectations.", category: "Communication", difficulty: "standard" },
    { question: "SCENARIO: A customer sends a PO with delivery in 2 weeks. You know from experience this part type usually takes 4 weeks. The customer is important. What do you do?", options: ["Accept the PO and hope production can rush it", "Accept but immediately loop in PE for CEDD estimation before confirming the delivery date to the customer", "Reject the PO", "Tell the customer it's impossible without checking"], correct: 1, explanation: "Never commit a date without PE validation. Accept the PO but do NOT confirm delivery until PE provides a realistic CEDD.", category: "Decision Making", difficulty: "scenario" },
    { question: "SCENARIO: A customer calls asking about their order status. The PE told you yesterday there's a 3-day delay due to material issues. The customer has a hard deadline. How do you handle this?", options: ["Tell them everything is on track", "Be transparent about the delay, explain the cause, and offer mitigation options (air freight, partial delivery, etc.)", "Transfer them to the PE", "Promise to absorb the delay cost and say nothing"], correct: 1, explanation: "Transparency builds trust. The CE must communicate delays honestly and present solutions, not hide problems.", category: "Decision Making", difficulty: "scenario" },
    { question: "SCENARIO: You receive a PO that references drawing revision B, but the customer's email has revision C attached. Which revision do you use for the Sales Order?", options: ["Use Rev B since it's on the PO", "STOP. Clarify with the customer which revision applies before creating the Sales Order — document the confirmation in writing", "Use whichever is newest", "Use both and let PE decide later"], correct: 1, explanation: "Drawing revision discrepancies must be resolved BEFORE order creation. The wrong revision means the wrong part.", category: "Change Control", difficulty: "critical" },
    { question: "A customer wants to split their order: 50 parts now, 50 parts in 6 months. How should this be handled commercially?", options: ["One Sales Order, deliver in batches", "Two separate Sales Orders with independent traceability, pricing, and delivery commitments", "Refuse — we only do full orders", "Just note it on the original PO"], correct: 1, explanation: "Split deliveries need separate Sales Orders to maintain proper traceability, pricing, and delivery tracking.", category: "Order Management", difficulty: "scenario" },
  ],
  qe: [
    { question: "Which inspection level requires a Coordinate Measuring Machine?", options: ["Level 2 - Standard Dimensional", "Level 3 - Precision", "Level 4 - CMM Inspection", "Level 5 - Full Inspection"], correct: 2, explanation: "Level 4 specifically requires a CMM for precise geometric and GD&T measurements.", category: "Inspection", difficulty: "standard" },
    { question: "When can production continue after the first part is machined?", options: ["Immediately", "After operator self-inspection", "Only after QE First Part Verification and approval", "After programmer review"], correct: 2, explanation: "Production CANNOT continue without QE first part approval.", category: "Quality Gates", difficulty: "standard" },
    { question: "What certifications must be verified when parts return from outsourcing?", options: ["No certifications needed", "Only CoC", "CoC, MTC, NADCAP cert as applicable — all must be valid", "Just a delivery note"], correct: 2, explanation: "QE must verify all applicable certifications before parts re-enter production.", category: "Outsource QC", difficulty: "standard" },
    { question: "What must the QE sign off on before outsourced parts can ship?", options: ["Nothing — supplier QC is sufficient", "Formal QE/QC sign-off with all certifications and inspection reports", "Just count the parts", "Only visual inspection"], correct: 1, explanation: "No outsourced parts ship without formal QE/QC sign-off covering certifications, inspection, and traceability.", category: "Release", difficulty: "standard" },
    { question: "What must the QCP include for outsourced work?", options: ["Only final inspection", "Incoming material, in-process, and final inspection requirements", "Just supplier name", "Only part count verification"], correct: 1, explanation: "The QCP must cover incoming, in-process, and final inspection requirements.", category: "QCP", difficulty: "standard" },
    { question: "SCENARIO: Parts return from a heat treatment supplier. The CoC says 'HRC 58-62' but your drawing calls for 'HRC 55-58'. The supplier claims it's within a 'reasonable range'. What do you do?", options: ["Accept — close enough", "REJECT. The parts are out of spec. Initiate NCR, segregate parts, and notify SQE for supplier corrective action", "Re-test and see if your equipment reads differently", "Ask the customer if they'll accept it"], correct: 1, explanation: "Out of spec is out of spec. There's no 'close enough' in aerospace/medical QC. Follow the NCR process.", category: "Decision Making", difficulty: "critical" },
    { question: "SCENARIO: During in-process inspection, you find that 3 out of 50 parts have a bore diameter 0.005mm over tolerance. The operator says his caliper might be off. How do you proceed?", options: ["Trust the operator and continue", "STOP production. Verify with calibrated instruments. If confirmed, segregate non-conforming parts, check remaining batch, initiate NCR", "Just reject those 3 and continue with the rest", "Wait until final inspection to check again"], correct: 1, explanation: "Any suspected non-conformance requires immediate production stop, verification with calibrated equipment, and systematic batch review.", category: "Decision Making", difficulty: "scenario" },
    { question: "SCENARIO: A customer orders a medical-grade part. During QCP creation, you realize the drawing doesn't specify biocompatibility testing but the material requires it per ISO 13485. What do you do?", options: ["Only inspect what's on the drawing", "Flag it to PE and customer — the QCP must include all regulatory requirements even if the drawing is silent on them", "Ignore it — not your problem if the drawing doesn't say it", "Add it to QCP without telling anyone"], correct: 1, explanation: "QE is responsible for regulatory compliance. Missing requirements must be flagged — the QCP goes beyond just the drawing.", category: "Regulatory", difficulty: "critical" },
    { question: "SCENARIO: Final inspection reveals one critical dimension is exactly at the tolerance boundary (nominal ± 0.01mm, measured at +0.01mm exactly). Do you pass or fail?", options: ["Fail — boundary is too risky", "Pass — it's technically within tolerance", "Pass but document it as a near-miss and flag for process review to prevent drift", "Measure again until you get a better number"], correct: 2, explanation: "Technically within spec = pass. But best practice demands documenting near-misses and reviewing the process for drift potential.", category: "Decision Making", difficulty: "scenario" },
    { question: "You're creating a QCP for a part with 47 dimensions. 5 are critical GD&T callouts. What inspection frequency makes sense?", options: ["Every part, all 47 dimensions", "100% on 5 critical dims, sample inspection on remaining 42", "Sample inspection on everything", "Only inspect the 5 critical dims"], correct: 1, explanation: "Critical dimensions get 100% inspection. Non-critical can use statistical sampling — this balances thoroughness with efficiency.", category: "QCP Design", difficulty: "scenario" },
  ],
  plc: [
    { question: "What must happen before parts can be packaged for dispatch?", options: ["Nothing — package immediately", "Parts must be cleaned and protected against corrosion, damage, and contamination", "Only counting is needed", "Just wrap in paper"], correct: 1, explanation: "Parts must be cleaned and protected before packaging.", category: "Packaging", difficulty: "standard" },
    { question: "Who performs the final release before dispatch?", options: ["The operator", "The shift supervisor", "The Quality Engineer", "The customer"], correct: 2, explanation: "The QE performs final release. Parts cannot ship without QE release.", category: "Release", difficulty: "standard" },
    { question: "What must be recorded when parts are shipped?", options: ["Nothing", "Tracking information and shipping documentation", "Only the customer name", "Just the weight"], correct: 1, explanation: "Tracking and documentation maintain full traceability.", category: "Shipping", difficulty: "standard" },
    { question: "SCENARIO: You're packaging 100 precision-machined aluminum parts for air shipment. The parts have freshly machined surfaces. What specific protections are needed?", options: ["Bubble wrap is fine", "VCI paper/bags for corrosion protection, individual wrapping to prevent contact damage, cushioning material, humidity indicator in sealed bag", "Just put them in a box with packing peanuts", "Shrink wrap the whole batch together"], correct: 1, explanation: "Fresh aluminum surfaces are vulnerable to corrosion and contact damage. VCI protection, individual separation, and humidity control are essential for air shipment.", category: "Decision Making", difficulty: "scenario" },
    { question: "SCENARIO: QE has released 98 of 100 parts. 2 parts are pending NCR disposition. The customer needs delivery today. What do you do?", options: ["Ship all 100 and deal with NCR later", "Ship the 98 released parts with documentation noting partial delivery, hold the 2 pending parts separately", "Wait until all 100 are released", "Ship all and mark the 2 as 'pending' on the packing list"], correct: 1, explanation: "Only QE-released parts can ship. Partial delivery with proper documentation is acceptable — mixing released and unreleased is not.", category: "Decision Making", difficulty: "critical" },
    { question: "SCENARIO: You notice the shipping label has the correct part number but the wrong revision letter. The parts themselves are correct per latest revision. What do you do?", options: ["Ship anyway — parts are correct", "STOP. Correct all documentation. Wrong revision on shipping docs = traceability breach even if parts are right", "Just cross out the old revision with a pen", "Call the customer and ask if they care"], correct: 1, explanation: "Documentation accuracy is as important as part accuracy. Wrong revision on labels creates traceability issues downstream.", category: "Documentation", difficulty: "scenario" },
  ],
  pm: [
    { question: "When does the Production Manager get involved?", options: ["Only at dispatch", "From strategy definition through production execution", "Only during machining", "Only for outsourced jobs"], correct: 1, explanation: "The PM is involved from strategy through execution.", category: "Scope", difficulty: "standard" },
    { question: "What is the PM's role in deviations?", options: ["PM has no say", "PM approval required alongside PE for programming deviations", "PM can approve alone", "Deviations go to the customer"], correct: 1, explanation: "Programming deviations need both PE and PM approval.", category: "Deviations", difficulty: "standard" },
    { question: "What should the PM prioritize during a bottleneck?", options: ["Skip quality checks", "Resource reallocation while maintaining quality gates", "Cancel the order", "Only inform the customer"], correct: 1, explanation: "Resolve bottlenecks through resource allocation while maintaining all quality gates.", category: "Production", difficulty: "standard" },
    { question: "SCENARIO: Three urgent jobs need the same 5-axis machine this week. Job A is for an aerospace customer with NADCAP requirements, Job B is a repeat commercial order, Job C is a new medical customer's first order. How do you prioritize?", options: ["First come first served", "Assess: Job A has regulatory deadline risk, Job C builds new customer relationship. Prioritize A (compliance), then C (relationship), then B (repeat — negotiate extension)", "Just ask the operators to work overtime on all three", "Cancel Job B"], correct: 1, explanation: "PM must weigh compliance risk, business relationship value, and negotiation flexibility. Regulatory deadlines are non-negotiable.", category: "Decision Making", difficulty: "scenario" },
    { question: "SCENARIO: An operator reports that a CNC machine is producing parts 0.003mm out of tolerance intermittently. The machine passed calibration last month. Production is behind schedule. What's your call?", options: ["Keep running — it passed calibration recently", "STOP the machine. Call for emergency calibration check. Quarantine all parts since last known good measurement. You cannot risk shipping non-conforming parts", "Run a few more parts and see if it gets worse", "Switch to a different program and come back later"], correct: 1, explanation: "Intermittent tolerance issues are the most dangerous — they produce undetected non-conformances. Stop, verify, quarantine.", category: "Decision Making", difficulty: "critical" },
    { question: "SCENARIO: The PE's strategy sheet calls for a specific fixture that won't be available for 3 days. The programmer suggests an alternative fixture. What must happen before you approve the change?", options: ["Just approve it — programmer knows what works", "The PE must review and approve the fixture change, update the strategy sheet, and QE must confirm inspection feasibility with the new fixture", "Try the alternative and if parts are good, continue", "Wait the 3 days — no changes allowed"], correct: 1, explanation: "Any deviation from the strategy sheet requires PE approval and QE verification. The PM cannot unilaterally approve technical changes.", category: "Change Control", difficulty: "scenario" },
    { question: "SCENARIO: End of quarter. You have 5 jobs to complete. Realistically, you can finish 4. Which job do you delay, and how?", options: ["Delay whichever is least complete", "Assess customer priority, contractual penalties, regulatory requirements. Delay the one with most flexibility, then proactively communicate the revised date through CE/PJM", "Work everyone overtime to do all 5", "Don't tell anyone and hope for the best"], correct: 1, explanation: "Strategic prioritization considers contractual, regulatory, and relationship factors. Proactive communication prevents surprises.", category: "Decision Making", difficulty: "scenario" },
  ],
  pjm: [
    { question: "What phases does the Project Manager coordinate across?", options: ["Only production", "Order intake, strategy, outsource management, documentation, and dispatch", "Only outsource", "Only quality"], correct: 1, explanation: "PJM coordinates across phases 1, 2, 8, 10, and 11.", category: "Scope", difficulty: "standard" },
    { question: "What should the PJM do when PE identifies a delivery risk?", options: ["Ignore it", "Track the risk, coordinate mitigation, and communicate to stakeholders", "Cancel the project", "Only tell the customer"], correct: 1, explanation: "The PJM tracks risks, coordinates mitigation, and communicates to all stakeholders.", category: "Risk", difficulty: "standard" },
    { question: "How does the PJM handle resource conflicts?", options: ["First come first served", "Coordinate with PM to resolve based on priority and deadlines", "Let operators decide", "Prioritize newest order"], correct: 1, explanation: "PJM works with PM to resolve conflicts based on priority and commitments.", category: "Resource", difficulty: "standard" },
    { question: "SCENARIO: You're managing 4 concurrent projects. Project A's outsource supplier just went bankrupt mid-process. Parts are 60% complete at their facility. What's your immediate action plan?", options: ["Wait and see if another company buys them", "Immediately: assess parts recoverability, identify backup suppliers with SQE, get PE to evaluate if partial work can be reused, update all project timelines, communicate impact to CE for customer notification", "Cancel Project A", "Sue the supplier"], correct: 1, explanation: "Crisis management requires simultaneous technical assessment, supplier contingency, timeline impact analysis, and stakeholder communication.", category: "Decision Making", difficulty: "critical" },
    { question: "SCENARIO: Two PEs are in disagreement about the manufacturing approach for a complex part. PE-1 wants 5-axis, PE-2 wants a multi-setup 3-axis approach. Both have valid technical arguments. The deadline is tight. How do you resolve this?", options: ["Pick the cheaper option", "Facilitate a technical review meeting with both PEs and PM, evaluate based on: quality risk, timeline, machine availability, and past similar job data. Document the decision rationale", "Let the senior PE decide", "Flip a coin — just pick one"], correct: 1, explanation: "PJM facilitates informed decisions using data and cross-functional input, not authority. The decision must be documented.", category: "Decision Making", difficulty: "scenario" },
    { question: "SCENARIO: A customer audit is scheduled in 2 weeks. You discover that 3 of your 12 active jobs have incomplete documentation (missing process sheets, unsigned QCPs). What do you prioritize?", options: ["Focus on the audited jobs only", "Immediately create a documentation catch-up plan for ALL jobs, prioritize the ones under audit, assign responsible parties, and set daily checkpoints until audit date", "Ask to postpone the audit", "The documentation can be completed after the audit"], correct: 1, explanation: "Documentation gaps are systemic — fixing only audit-visible jobs hides the real problem. Address all gaps with a systematic plan.", category: "Audit Readiness", difficulty: "scenario" },
  ],
  prog: [
    { question: "What must be reviewed before starting any programming work?", options: ["Only the customer drawing", "The Manufacturing Strategy Sheet — in full", "Just the material type", "Only the tolerances"], correct: 1, explanation: "The programmer must review and understand the Manufacturing Strategy Sheet fully before starting.", category: "Pre-Programming", difficulty: "standard" },
    { question: "What is the correct job numbering format?", options: ["Any format", "123XX2613 (Serial-Account-Year-Month-Day)", "Customer PO number", "Sequential numbers only"], correct: 1, explanation: "Job numbering follows 123XX2613 format. Must appear on every shop floor drawing.", category: "Standards", difficulty: "standard" },
    { question: "What must every setup folder contain?", options: ["Only the CNC program", "A Process Sheet with program names, tool list, WCS, fixturing, and key dimensions", "Just a screenshot", "Nothing"], correct: 1, explanation: "Every setup folder needs a Process Sheet — the single source of truth on the shop floor.", category: "Documentation", difficulty: "standard" },
    { question: "What is mandatory before releasing a program?", options: ["Nothing", "Simulation must be completed", "Only visual toolpath check", "Ask operator to test it"], correct: 1, explanation: "Simulation is mandatory. Follow strategy sheet, QC plan, and datums exactly.", category: "Release", difficulty: "standard" },
    { question: "SCENARIO: You're programming Setup 2 for a titanium part. The strategy sheet says use a specific datum, but you realize a different datum would be easier to program and save 30 minutes of cycle time. What do you do?", options: ["Use your preferred datum — you know better", "STOP. Contact PE to discuss the datum change. If approved, PE updates strategy sheet, then you update the program. Never deviate without PE sign-off", "Use both datums and let the operator pick", "Use your datum but don't tell anyone"], correct: 1, explanation: "Datum changes affect everything downstream — fixtures, inspection, traceability. Any change needs PE approval and strategy sheet update.", category: "Decision Making", difficulty: "critical" },
    { question: "SCENARIO: During simulation, you notice a potential tool collision during a retract move. It doesn't actually crash in simulation but comes within 0.5mm of the fixture. Is this acceptable?", options: ["Yes — it didn't crash", "NO. 0.5mm clearance is dangerously close. Material variation, thermal expansion, or fixturing variation could cause a real collision. Reprogram with safe clearance (minimum 5mm recommended)", "Run it slow and watch carefully", "It's fine for production — simulation is just approximate"], correct: 1, explanation: "Simulation clearance must account for real-world variables. 0.5mm is NOT safe clearance — reprogram with proper margins.", category: "Decision Making", difficulty: "scenario" },
    { question: "SCENARIO: You're creating the process sheet for Setup 3 (final setup). The QCP requires first part CMM inspection. How does this affect your process sheet?", options: ["No impact — QC handles their own scheduling", "Your process sheet must include a HOLD POINT after the first part, indicating 'STOP — First Part CMM Inspection Required Before Continuing'. The operator must know to pause", "Just write 'call QE' somewhere", "CMM inspection is only for final parts, not first parts"], correct: 1, explanation: "The process sheet must explicitly call out quality hold points. The operator relies on it — if it's not written, it won't happen.", category: "Documentation", difficulty: "scenario" },
    { question: "SCENARIO: You notice the strategy sheet references Rev C of the drawing, but the latest drawing in your CAM folder is Rev B. What do you do?", options: ["Program to Rev B — it's what you have", "STOP. Do not program until you have the correct revision. Contact PE to get Rev C. Programming to the wrong revision = entire job must be scrapped", "Program to Rev B and update later", "Just ask the operator which looks right"], correct: 1, explanation: "Wrong revision = wrong part. Never start programming without the exact drawing revision specified in the strategy sheet.", category: "Change Control", difficulty: "critical" },
  ],
  ss: [
    { question: "What is the Shift Supervisor's primary responsibility?", options: ["Programming CNC machines", "Ensuring operators follow process sheets and monitoring progress", "Placing material orders", "Customer communication"], correct: 1, explanation: "The SS ensures operators follow process sheets and monitors progress.", category: "Core Duty", difficulty: "standard" },
    { question: "When should a Shift Supervisor escalate?", options: ["Never", "When a machine breaks, non-conformance found, or production deviates from plan", "Only at end of shift", "Only for outsourced parts"], correct: 1, explanation: "Issues must be escalated immediately to the PM.", category: "Escalation", difficulty: "standard" },
    { question: "What must be included in a shift handover?", options: ["Nothing", "Current job status, issues, pending QC approvals, and machine status", "Just part count", "Only problems"], correct: 1, explanation: "Complete handover: job status, issues, pending QC, machine status.", category: "Handover", difficulty: "standard" },
    { question: "SCENARIO: An operator tells you he's been running parts for 2 hours but forgot to do the first part inspection. He says all parts 'look fine'. What do you do?", options: ["If they look fine, continue", "STOP production immediately. Quarantine ALL parts produced. Call QE for batch disposition. This is a quality gate violation — document it", "Do a quick visual check yourself and approve", "Tell him to do the inspection now on the next part and continue"], correct: 1, explanation: "Missing first part inspection = unknown quality status for entire batch. All parts must be quarantined and QE must assess.", category: "Decision Making", difficulty: "critical" },
    { question: "SCENARIO: It's 10 PM on night shift. Machine 3 starts making an unusual vibration noise but is still producing parts within tolerance. No maintenance staff available until morning. What do you do?", options: ["Keep running — parts are in tolerance", "STOP the machine. Unusual vibration indicates potential spindle or bearing issue. Running until failure risks catastrophic damage and potential part non-conformance. Document the issue for morning maintenance", "Slow the feed rate and keep going", "Switch to a different job on that machine"], correct: 1, explanation: "Unusual vibration is an early warning sign. Stopping prevents escalation to catastrophic failure and protects part quality.", category: "Decision Making", difficulty: "scenario" },
    { question: "SCENARIO: Two operators are assigned to the same machine (day/night). The day operator made a tool offset change and didn't document it. How do you handle this?", options: ["It's fine — operators adjust offsets all the time", "This is a process deviation. Verify the offset against the process sheet, ensure parts are in spec, document the change, and establish a mandatory offset change log", "Just tell the night operator to check it", "Reset all offsets to zero and start over"], correct: 1, explanation: "Undocumented offset changes create traceability gaps and non-conformance risk. Establish formal documentation requirements.", category: "Process Control", difficulty: "scenario" },
    { question: "SCENARIO: You have 3 operators available and 5 machines to run. Two jobs are urgent. How do you assign resources?", options: ["One operator per machine, leave 2 machines idle", "Assign 2 operators to the 2 urgent machines. Third operator rotates between remaining 3 machines, prioritizing based on production schedule. Communicate to PM if this isn't sustainable", "Put everyone on one job until it's done", "Let operators choose which machines they want"], correct: 1, explanation: "Resource allocation must prioritize urgent work while maintaining coverage. Communicate sustainability concerns to PM.", category: "Resource Management", difficulty: "scenario" },
  ],
  op: [
    { question: "What document must you follow during machining?", options: ["Customer drawing only", "The Process Sheet from the setup folder", "Memory from previous jobs", "Verbal instructions"], correct: 1, explanation: "Follow the Process Sheet — it's the single source of truth.", category: "Process", difficulty: "standard" },
    { question: "What do you do with a non-conforming part?", options: ["Continue and sort later", "Immediately segregate and report to supervisor", "Fix it yourself", "Put it back in the batch"], correct: 1, explanation: "Segregate immediately and report.", category: "Quality", difficulty: "standard" },
    { question: "What setup checks must be verified before starting?", options: ["Only program number", "Correct material, program, fixture, and tools — all four", "Just fixture", "Only material"], correct: 1, explanation: "Verify: material, program, fixture, tools — all four.", category: "Setup", difficulty: "standard" },
    { question: "When do you perform in-process self-inspection?", options: ["Never — QE's job", "As defined by the inspection frequency in the QCP", "Only last part", "Only when supervisor asks"], correct: 1, explanation: "Inspect at the frequency defined in the QCP.", category: "Inspection", difficulty: "standard" },
    { question: "SCENARIO: You start Setup 2 and notice the fixture from the process sheet doesn't match what's physically on the machine from the previous job. What do you do?", options: ["Use whatever fixture is on the machine — it's probably fine", "STOP. Do not run. Verify the correct fixture per the process sheet. If wrong fixture is installed, set up the correct one. Never assume — verify", "Ask the previous operator what they used", "Run a test part and see if it works"], correct: 1, explanation: "Wrong fixture = wrong part. The process sheet is the authority — always verify before running.", category: "Decision Making", difficulty: "critical" },
    { question: "SCENARIO: During machining, you hear a slight chatter sound that wasn't there at the start. The parts still measure OK. What do you do?", options: ["Keep going — measurements are fine", "Note the chatter, check tool wear, verify part surface finish, and report to supervisor. Chatter indicates something is changing — catch it before it causes non-conformance", "Speed up to get through it faster", "Turn up the coolant"], correct: 1, explanation: "Chatter is an early warning sign of tool wear, loose fixturing, or spindle issues. Report early — don't wait for the first bad part.", category: "Decision Making", difficulty: "scenario" },
    { question: "SCENARIO: The process sheet says to use Tool T7 (10mm endmill) but you notice it's worn. The tool crib has a new T7 but also a T12 (same 10mm size, different geometry). Which do you use?", options: ["T12 — same size, it'll work", "Get a new T7. The process sheet specifies T7 for a reason — different geometry means different cutting behavior, different deflection, different surface finish. Only the specified tool", "Use the worn T7 — it might still be OK", "Pick whatever's closest and adjust feeds"], correct: 1, explanation: "Tool geometry matters beyond just diameter. Different geometry = different cutting forces, deflection, and finish. Use the specified tool.", category: "Decision Making", difficulty: "scenario" },
    { question: "SCENARIO: You're running the last 5 parts of a batch of 100. The first 95 have all been in tolerance. Can you skip self-inspection on the last 5?", options: ["Yes — 95 good parts proves the process is stable", "NO. Inspect per the QCP frequency regardless of previous results. Tool wear, temperature drift, or material variation can cause the last parts to be non-conforming", "Only inspect the very last one", "Yes, if the supervisor agrees"], correct: 1, explanation: "QCP inspection frequency is not optional. Tool wear is progressive — the last parts are actually at highest risk.", category: "Quality Discipline", difficulty: "scenario" },
  ],
  sqe: [
    { question: "What must the SQE validate before an outsource order is placed?", options: ["Nothing", "QCP must be validated for the outsource scope", "Only price", "Just delivery date"], correct: 1, explanation: "QCP must be validated for outsource scope before ordering.", category: "Pre-Outsource", difficulty: "standard" },
    { question: "What certifications must be verified on incoming outsourced parts?", options: ["None", "CoC, MTC, NADCAP, FAI, and process certs as applicable", "Only invoice", "Just delivery note"], correct: 1, explanation: "Verify all applicable certifications.", category: "Incoming QC", difficulty: "standard" },
    { question: "What do you do when a supplier's certification is invalid?", options: ["Accept anyway", "Reject parts and initiate supplier corrective action", "Note for next time", "Ask customer to accept"], correct: 1, explanation: "Invalid certs = reject parts and corrective action.", category: "Non-conformance", difficulty: "standard" },
    { question: "For NADCAP processes, what must you confirm?", options: ["Supplier exists", "NADCAP certification is current and covers the specific process scope", "Price is competitive", "Only delivery time"], correct: 1, explanation: "NADCAP cert must be current AND cover the specific process being outsourced.", category: "Certification", difficulty: "standard" },
    { question: "SCENARIO: A supplier delivers heat-treated parts with a CoC stating 'Processed per AMS 2759'. However, your PO specified AMS 2759/5 (specific revision for titanium). The supplier says '2759 covers 2759/5'. Is this acceptable?", options: ["Yes — AMS 2759 is the parent spec", "NO. AMS 2759/5 is a specific material-class revision with different requirements. A generic 2759 CoC doesn't prove compliance with /5 specifics. Reject and require specific certification", "Accept but make a note", "Call the customer and ask"], correct: 1, explanation: "Specification precision matters. AMS 2759 is an umbrella; /5 has titanium-specific requirements. Generic certification doesn't prove specific compliance.", category: "Decision Making", difficulty: "critical" },
    { question: "SCENARIO: You're auditing a new plating supplier. Their NADCAP cert is valid, but you notice their process tank temperature logs show 3 excursions outside spec limits in the past month. They were 'within calibration drift'. What's your assessment?", options: ["NADCAP covers it — they passed audit", "FLAG this as a significant concern. Temperature excursions indicate process control issues. Request their corrective action plan and consider conditional approval only with enhanced incoming inspection", "Ignore it — their NADCAP auditor didn't flag it", "Find a different supplier immediately"], correct: 1, explanation: "NADCAP certification doesn't mean perfection. Process excursions are warning signs requiring corrective action evaluation.", category: "Decision Making", difficulty: "scenario" },
    { question: "SCENARIO: Parts return from an NDT supplier. They found one indication that they classified as 'acceptable per spec'. Your acceptance criteria is more stringent than the general spec. What do you do?", options: ["Accept — supplier says it's fine", "Review the indication against YOUR specific acceptance criteria (not the general spec). If your criteria is tighter, the indication may be rejectable even if the supplier passed it", "Accept it this time and tighten criteria for next order", "Send it to a different NDT supplier for a second opinion without reviewing first"], correct: 1, explanation: "Customer/job-specific acceptance criteria takes precedence over general specs. The SQE must evaluate against the correct standard.", category: "Technical Judgment", difficulty: "scenario" },
  ],
  proc: [
    { question: "What must be verified before accepting incoming raw material?", options: ["Only quantity", "Supplier certification, material grade, heat number, and traceability", "Just delivery note", "Only price"], correct: 1, explanation: "Verify certification, grade, heat number, and traceability.", category: "Receiving", difficulty: "standard" },
    { question: "For DFARS materials, what document is mandatory?", options: ["Customer PO only", "Material Test Certificate with matching heat number", "Supplier invoice", "Operator sign-off"], correct: 1, explanation: "MTC with matching heat number is mandatory for aerospace materials.", category: "Compliance", difficulty: "standard" },
    { question: "What must material be tagged with before issue to production?", options: ["Only Job ID", "Job ID, material grade, heat number, and traceability ID", "Just customer name", "Only PO number"], correct: 1, explanation: "Complete tag: Job ID, grade, heat number, traceability ID.", category: "Traceability", difficulty: "standard" },
    { question: "SCENARIO: You're sourcing Ti-6Al-4V bar stock for an aerospace order. Supplier A offers DFARS-compliant material at $X with a 3-week lead time. Supplier B offers 30% cheaper material from an uncertified source with 1-week delivery. The job is urgent. Which do you choose?", options: ["Supplier B — save money and time", "Supplier A — DFARS compliance is non-negotiable for aerospace. No cost savings justify using non-compliant material. The entire job would be rejected", "Buy from both and use whichever arrives first", "Ask the customer if they'll waive DFARS"], correct: 1, explanation: "DFARS compliance is a legal requirement for aerospace contracts. Using non-compliant material voids the entire job and risks debarment.", category: "Decision Making", difficulty: "critical" },
    { question: "SCENARIO: Incoming material arrives with an MTC, but the heat number on the physical bar doesn't match the MTC. The supplier says they 'mixed up the labels'. Do you accept?", options: ["Accept — supplier vouches for it", "REJECT. If the heat number doesn't match the MTC, you have NO traceability. The physical heat number is the truth — the MTC might be for entirely different material. Return for correct documentation or replacement", "Accept and relabel to match MTC", "Use it and create your own traceability number"], correct: 1, explanation: "Heat number mismatch = broken traceability chain. You cannot verify the material IS what the MTC says. Reject.", category: "Decision Making", difficulty: "critical" },
    { question: "SCENARIO: You have 2 identical orders for 6061-T6 aluminum plate. One order has material on the shelf (purchased 2 years ago) with valid MTC. The other needs fresh procurement. Can you use the shelf stock for either order?", options: ["Yes — material doesn't expire", "Check if the material has any shelf life restrictions, verify storage conditions haven't caused degradation, confirm the MTC is still traceable to the original supplier, and verify customer doesn't have a maximum material age requirement", "Use it for the less critical order", "Throw it away — it's too old"], correct: 1, explanation: "While aluminum doesn't 'expire', customers may have max material age requirements, and storage conditions affect properties. Verify before issuing.", category: "Decision Making", difficulty: "scenario" },
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
        setElapsedTime(Math.floor((Date.now() - startTime) / 1000));
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
        <p className="text-xs text-muted-foreground text-center">Select your role to begin a timed competency assessment. Questions are randomized from a large pool — each attempt is unique.</p>
        {grouped.map(group => (
          <div key={group.tier}>
            <h4 className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-2">{group.label}</h4>
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
                        <p className="text-xs font-semibold leading-tight">{role.title}</p>
                        <p className="text-[10px] text-muted-foreground">{pool.length} questions ({scenarios} scenarios)</p>
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
              <span className={`text-2xl font-bold ${percentage >= 75 ? "text-emerald-600 dark:text-emerald-400" : "text-amber-600 dark:text-amber-400"}`}>
                {percentage}%
              </span>
            </div>
          </motion.div>
          <h3 className={`text-lg font-bold mt-2 ${ratingColor}`}>{rating}</h3>
          <p className="text-xs text-muted-foreground">{currentRole?.title} — {score}/{questions.length} correct in {formatTime(elapsedTime)}</p>
        </div>

        <Card className="overflow-visible" data-testid="score-breakdown">
          <CardContent className="p-4 space-y-3">
            <h4 className="text-xs font-semibold">Performance Breakdown</h4>
            <div className="grid grid-cols-3 gap-2">
              <div className="p-2 rounded-md bg-muted/30 border text-center">
                <p className="text-lg font-bold">{score}/{questions.length}</p>
                <p className="text-[9px] text-muted-foreground">Overall</p>
              </div>
              <div className="p-2 rounded-md bg-muted/30 border text-center">
                <p className="text-lg font-bold">{scenarioQs.length > 0 ? Math.round((scenarioScore / scenarioQs.length) * 100) : 0}%</p>
                <p className="text-[9px] text-muted-foreground">Scenarios</p>
              </div>
              <div className="p-2 rounded-md bg-muted/30 border text-center">
                <p className="text-lg font-bold">{avgTime}s</p>
                <p className="text-[9px] text-muted-foreground">Avg/Question</p>
              </div>
            </div>

            {criticalQs.length > 0 && (
              <div className={`p-2 rounded-md border ${criticalScore === criticalQs.length ? "bg-emerald-500/10 border-emerald-500/30" : "bg-destructive/10 border-destructive/30"}`}>
                <p className={`text-xs font-semibold ${criticalScore === criticalQs.length ? "text-emerald-600 dark:text-emerald-400" : "text-destructive"}`}>
                  Critical Decisions: {criticalScore}/{criticalQs.length} {criticalScore === criticalQs.length ? "— All correct" : "— Review required"}
                </p>
              </div>
            )}

            <h4 className="text-xs font-semibold mt-2">Category Scores</h4>
            <div className="space-y-1.5">
              {Object.entries(categoryScores).map(([cat, data]) => {
                const catPct = Math.round((data.correct / data.total) * 100);
                return (
                  <div key={cat}>
                    <div className="flex items-center justify-between gap-2 mb-0.5">
                      <span className="text-[10px] font-medium">{cat}</span>
                      <span className="text-[10px] text-muted-foreground">{data.correct}/{data.total}</span>
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
          className="flex items-center gap-1.5 text-xs text-muted-foreground px-2 py-1 rounded-md"
          data-testid="button-back-roles-inline"
        >
          <ArrowRight className="w-3 h-3 rotate-180" />
          Exit
        </button>
        <div className="flex items-center gap-2">
          <div className={`w-6 h-6 rounded-md ${currentRole?.color} flex items-center justify-center`}>
            <RoleIcon className="w-3.5 h-3.5 text-white" />
          </div>
          <span className="text-xs font-semibold">{currentRole?.shortTitle}</span>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="text-[10px]">{score}/{currentQ + (showResult ? 1 : 0)}</Badge>
          <Badge variant={timeWarning ? "destructive" : "outline"} className="text-[10px] tabular-nums">
            {formatTime(Math.max(0, timeRemaining))}
          </Badge>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <span className="text-[10px] text-muted-foreground whitespace-nowrap">
          Q{currentQ + 1}/{questions.length}
        </span>
        <Progress value={((currentQ + (showResult ? 1 : 0)) / questions.length) * 100} className="flex-1" />
        {currentDifficulty && currentDifficulty !== "standard" && (
          <Badge
            variant={currentDifficulty === "critical" ? "destructive" : "outline"}
            className="text-[9px] px-1.5 py-0"
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
  const [activeTab, setActiveTab] = useState("roles");

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
                const ownerRoleData = cp.ownerRoles.map(rid => roles.find(r => r.id === rid)).filter(Boolean);
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
                            <Badge variant="secondary" className="text-[9px] px-1 py-0">Phase {cp.phase}</Badge>
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">{cp.description}</p>
                          <div className="flex items-center gap-1.5 mt-2 flex-wrap">
                            <span className="text-[9px] font-semibold text-muted-foreground">Owned by:</span>
                            {ownerRoleData.map(role => role && (
                              <Badge key={role.id} variant="outline" className={`text-[9px] px-1.5 py-0 ${role.textColor}`}>
                                {role.shortTitle} — {role.title}
                              </Badge>
                            ))}
                          </div>
                          <div className="mt-2 p-2 rounded-md bg-destructive/5 border border-destructive/10">
                            <p className="text-[10px] text-destructive font-medium">
                              If this fails: {cp.failureImpact}
                            </p>
                          </div>
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
                <h3 className="text-lg font-bold" data-testid="text-matrix-title">Department Responsibility Matrix</h3>
                <p className="text-xs text-muted-foreground">Who owns what across each department — phases, gates, and deliverables.</p>
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
                          <h4 className="font-semibold text-sm">{tierInfo.label} Department</h4>
                          <Badge variant="secondary" className="text-[9px]">{deptRoles.length} roles</Badge>
                          <Badge variant="secondary" className="text-[9px]">{deptPhases.length} phases</Badge>
                          {deptCritical.length > 0 && (
                            <Badge variant="destructive" className="text-[9px]">{deptCritical.length} critical gates</Badge>
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
                                  <span className="text-xs font-semibold">{role.title}</span>
                                  <Badge variant="outline" className="text-[9px] px-1 py-0">{role.shortTitle}</Badge>
                                </div>
                                <div className="flex flex-wrap gap-1 mb-2">
                                  <span className="text-[9px] text-muted-foreground font-semibold mr-1">Phases:</span>
                                  {role.phases.map(pid => {
                                    const phase = phases.find(p => p.id === pid);
                                    return (
                                      <Badge key={pid} variant="secondary" className="text-[8px] px-1 py-0">
                                        P{pid}: {phase?.title.split(" ").slice(0, 2).join(" ")}
                                      </Badge>
                                    );
                                  })}
                                </div>
                                <div className="flex flex-wrap gap-1">
                                  <span className="text-[9px] text-muted-foreground font-semibold mr-1">Deliverables:</span>
                                  {role.responsibilities.slice(0, 3).map((r, i) => (
                                    <span key={i} className="text-[9px] text-muted-foreground">{i > 0 ? " · " : ""}{r}</span>
                                  ))}
                                </div>
                                {roleCritical.length > 0 && (
                                  <div className="flex items-center gap-1 mt-2 flex-wrap">
                                    <AlertTriangle className="w-3 h-3 text-destructive flex-shrink-0" />
                                    <span className="text-[9px] font-semibold text-destructive">Critical gates:</span>
                                    {roleCritical.map((cp, i) => (
                                      <span key={i} className="text-[9px] text-destructive">{cp.name}</span>
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
                  <h4 className="font-semibold text-sm mb-3 flex items-center gap-2">
                    <Search className="w-4 h-4 text-primary" />
                    Inspection Level Reference
                  </h4>
                  <div className="space-y-2">
                    {inspectionMatrix.map((row, index) => (
                      <div key={index} className="flex items-center gap-3 p-2 rounded-md bg-muted/20 border">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <span className="text-xs font-bold text-primary">L{row.level}</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-medium">{row.condition}</p>
                          <p className="text-[10px] text-muted-foreground">{row.method}</p>
                        </div>
                        <Badge variant={row.level >= 4 ? "destructive" : "secondary"} className="flex-shrink-0 text-[9px]">
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
                <h3 className="text-lg font-bold" data-testid="text-quiz-title">Competency Assessment</h3>
                <p className="text-xs text-muted-foreground">Timed, randomized assessment with scenario-based decision-making questions. Each attempt is unique.</p>
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
