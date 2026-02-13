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
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const phases = [
  {
    id: 1,
    title: "Order Release & Technical Control",
    subtitle: "Customer PO Receipt and Job Creation",
    icon: FileText,
    color: "from-blue-500 to-blue-600",
    bgColor: "bg-blue-500/10 dark:bg-blue-500/20",
    borderColor: "border-blue-500/30",
    textColor: "text-blue-600 dark:text-blue-400",
    steps: [
      {
        name: "1.1 - Customer PO Receipt & Job Creation",
        details: [
          "Customer PO received and logged",
          "Unique Job ID created",
          "Job folder created with all customer technical documents",
        ],
        jobFolder: [
          "Customer drawing",
          "STEP file (if available)",
          "Customer specifications",
          "Material specification",
          "Surface treatment specification",
          "Special process specification",
          "Customer quality clauses",
        ],
        responsibilities: {
          Commercial: ["Create Job ID", "Create job folder", "Verify completeness of customer data"],
          "Quality Engineer": ["Verify specification completeness", "Flag special compliance requirements"],
          "Manufacturing Engineer": ["Take technical ownership of job"],
        },
      },
      {
        name: "1.2 - Compliance & Special Requirement Identification",
        critical: true,
        details: ["This step prevents catastrophic mistakes."],
        classifications: {
          Material: ["Standard commercial", "AMS material", "ASTM material", "DFARS compliance required", "Medical grade", "Aerospace grade"],
          Process: ["Standard machining", "NADCAP required process", "Special process requiring certification"],
          Inspection: ["Visual inspection", "Standard dimensional", "CMM inspection required", "Full inspection required", "First article style inspection"],
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
        name: "Machining Strategy",
        details: ["Setup count", "Machine selection", "Datum definition", "Workholding strategy", "Roughing and finishing plan"],
      },
      {
        name: "Material Definition",
        details: ["Raw material form", "Raw material size", "Raw material removal strategy"],
      },
      {
        name: "Special Process Routing",
        details: ["Outsourced operations", "Process sequence"],
      },
      {
        name: "Inspection Plan Definition",
        details: ["Coordinated with Quality Engineer"],
      },
    ],
    gate: "Programming CANNOT begin before this is released.",
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
    subtitle: "Execute manufacturing strategy",
    icon: Layers,
    color: "from-violet-500 to-violet-600",
    bgColor: "bg-violet-500/10 dark:bg-violet-500/20",
    borderColor: "border-violet-500/30",
    textColor: "text-violet-600 dark:text-violet-400",
    steps: [
      {
        name: "Programming Requirements",
        details: [
          "Follow Manufacturing Strategy Sheet",
          "Follow Quality Control Plan",
          "Follow Datum definition",
          "Program simulation mandatory",
          "Release to production only after verification",
        ],
      },
    ],
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
    subtitle: "Critical supplier management",
    icon: ExternalLink,
    color: "from-orange-500 to-orange-600",
    bgColor: "bg-orange-500/10 dark:bg-orange-500/20",
    borderColor: "border-orange-500/30",
    textColor: "text-orange-600 dark:text-orange-400",
    critical: true,
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
          "Certification validity verified",
          "Part count verified",
          "Part condition checked",
          "Critical dimensions verified if affected",
        ],
        critical: true,
      },
    ],
    examples: ["Heat treatment", "Anodizing", "NADCAP coating", "Wirecut operations", "EDM operations"],
    gate: "Parts CANNOT return to production without QC approval. Traceability must remain intact.",
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
                        {step.critical && (
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
                          {Object.entries(step.responsibilities).map(([role, tasks]) => (
                            <div key={role} className="p-2 rounded bg-background/50 dark:bg-background/30">
                              <p className="text-[10px] font-semibold text-muted-foreground">{role}</p>
                              <ul className="mt-0.5">
                                {tasks.map((t, ti) => (
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
                        <div className="mt-2 grid grid-cols-1 sm:grid-cols-3 gap-2">
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

                  {"examples" in phase && phase.examples && (
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
            {phase.id === 7 ? (
              <div className="flex flex-col items-center gap-0.5">
                <GitFork className="w-4 h-4 text-orange-400" />
                <span className="text-[8px] text-orange-500 font-medium">In-house or Outsource</span>
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
              <FlowArrow delay={0.35} />
              <FlowNode label="Material" color="bg-amber-500" delay={0.4} icon={Package} />
            </div>

            <div className="flex justify-center">
              <FlowArrow direction="down" delay={0.45} />
            </div>

            <div className="flex items-center gap-1.5 flex-wrap justify-center">
              <FlowNode label="Programming" color="bg-violet-500" delay={0.5} icon={Layers} />
              <FlowArrow delay={0.55} />
              <FlowNode label="Setup & 1st Part" color="bg-rose-500" delay={0.6} icon={Wrench} />
              <FlowArrow delay={0.65} />
              <FlowNode label="Production" color="bg-cyan-500" delay={0.7} icon={Factory} />
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.75 }}
              className="relative border-2 border-dashed border-orange-400/40 dark:border-orange-500/30 rounded-lg p-3"
            >
              <div className="absolute -top-2.5 left-4 bg-background px-2">
                <span className="text-[9px] font-semibold text-orange-500 flex items-center gap-1">
                  <GitFork className="w-3 h-3" /> ROUTING DECISION
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-1">
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 }}
                  className="flex flex-col items-center gap-1.5 p-2 rounded-md bg-cyan-500/5 dark:bg-cyan-500/10 border border-cyan-500/20"
                >
                  <span className="text-[9px] font-semibold text-cyan-600 dark:text-cyan-400 uppercase tracking-wider">In-House Path</span>
                  <div className="flex items-center gap-1.5 flex-wrap justify-center">
                    <FlowNode label="In-House QC" color="bg-cyan-600" delay={0.85} icon={Search} />
                    <FlowArrow delay={0.9} />
                    <FlowNode label="Next Op" color="bg-cyan-500" delay={0.95} icon={Cog} />
                  </div>
                  <div className="flex items-center gap-1 text-[8px] text-muted-foreground">
                    <RotateCcw className="w-2.5 h-2.5" />
                    <span>Repeat for each in-house operation</span>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 }}
                  className="flex flex-col items-center gap-1.5 p-2 rounded-md bg-orange-500/5 dark:bg-orange-500/10 border border-orange-500/20"
                >
                  <span className="text-[9px] font-semibold text-orange-600 dark:text-orange-400 uppercase tracking-wider">Outsource Path</span>
                  <div className="flex items-center gap-1.5 flex-wrap justify-center">
                    <FlowNode label="Outgoing QC" color="bg-orange-500" delay={0.85} icon={ExternalLink} />
                    <FlowArrow delay={0.9} />
                    <FlowNode label="Supplier" color="bg-orange-600" delay={0.95} />
                    <FlowArrow delay={1.0} />
                    <FlowNode label="Incoming QC" color="bg-orange-500" delay={1.05} icon={Search} badge="QC" />
                  </div>
                  <div className="flex items-center gap-1 text-[8px] text-muted-foreground">
                    <RotateCcw className="w-2.5 h-2.5" />
                    <span>Returns to production after QC pass</span>
                  </div>
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.1 }}
                className="mt-2 text-center"
              >
                <span className="text-[8px] text-muted-foreground italic">
                  Parts can alternate between in-house and outsource paths multiple times per job
                </span>
              </motion.div>
            </motion.div>

            <div className="flex justify-center">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.15 }}
                className="flex items-center gap-1"
              >
                <GitMerge className="w-3.5 h-3.5 text-teal-500" />
                <span className="text-[9px] text-muted-foreground font-medium">All paths merge</span>
              </motion.div>
            </div>

            <div className="flex items-center gap-1.5 flex-wrap justify-center">
              <FlowNode label="Final QC" color="bg-teal-500" delay={1.2} icon={Search} badge="CRITICAL" />
              <FlowArrow delay={1.25} />
              <FlowNode label="Documentation" color="bg-sky-500" delay={1.3} icon={FileText} />
              <FlowArrow delay={1.35} />
              <FlowNode label="Packaging" color="bg-green-500" delay={1.4} icon={Package} />
              <FlowArrow delay={1.45} />
              <FlowNode label="Dispatch" color="bg-green-600" delay={1.5} icon={Truck} />
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.6 }}
            className="flex flex-wrap items-center justify-center gap-3 mt-4 pt-3 border-t border-dashed"
          >
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-cyan-500" />
              <span className="text-[9px] text-muted-foreground">In-House</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-orange-500" />
              <span className="text-[9px] text-muted-foreground">Outsource</span>
            </div>
            <div className="flex items-center gap-1.5">
              <GitFork className="w-3 h-3 text-orange-400" />
              <span className="text-[9px] text-muted-foreground">Split Point</span>
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
  const [currentQ, setCurrentQ] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);

  const questions = [
    {
      question: "What must happen before programming can begin?",
      options: [
        "Customer PO must be received",
        "Manufacturing Strategy Sheet must be released",
        "Raw material must be procured",
        "Quality Engineer must approve the design",
      ],
      correct: 1,
      explanation: "The Manufacturing Strategy Definition (Phase 2) must be completed and released before programming can begin. This ensures all machining parameters are defined.",
    },
    {
      question: "Which inspection level requires a Coordinate Measuring Machine?",
      options: ["Level 2", "Level 3", "Level 4", "Level 5"],
      correct: 2,
      explanation: "Level 4 - CMM Inspection specifically requires a Coordinate Measuring Machine for precise geometric measurements.",
    },
    {
      question: "What must material be tagged with before it can be issued?",
      options: [
        "Only the Job ID",
        "Job ID and material grade only",
        "Job ID, material grade, heat number, and traceability ID",
        "Customer name and order number",
      ],
      correct: 2,
      explanation: "Material must be tagged with Job ID, material grade, heat number, and traceability ID. Material cannot be issued without a complete traceability tag.",
    },
    {
      question: "What must happen before parts return to production after outsourcing?",
      options: [
        "Parts can return immediately after supplier ships them",
        "Only part count verification is needed",
        "Incoming QC inspection and supplier certification verification are mandatory",
        "Only the operator needs to check parts visually",
      ],
      correct: 2,
      explanation: "Parts returning from outsourced processes must pass incoming QC inspection with certification verification, part count, condition check, and critical dimension verification.",
    },
    {
      question: "How many critical control points must NEVER fail?",
      options: ["3", "4", "5", "7"],
      correct: 2,
      explanation: "There are 5 critical control points: Material traceability, Manufacturing strategy definition, Quality Control Plan definition, Outsource incoming inspection, and Final inspection approval.",
    },
    {
      question: "What inspection is required for parts with tolerances less than 0.02mm?",
      options: [
        "Visual inspection",
        "Standard dimensional inspection",
        "Precision inspection",
        "Only final inspection",
      ],
      correct: 2,
      explanation: "Tight tolerance parts (less than 0.02mm) require Precision inspection using height gauges, bore gauges, and similar precision instruments.",
    },
    {
      question: "When can production continue after the first part is machined?",
      options: [
        "Immediately after the first part is completed",
        "After operator self-inspection",
        "Only after Quality Engineer performs First Part Verification and approves",
        "After the programmer reviews the output",
      ],
      correct: 2,
      explanation: "Production cannot continue without Quality Engineer approval of the first part. The verification method is defined in the Quality Control Plan.",
    },
    {
      question: "For DFARS-compliant materials, which document is mandatory?",
      options: [
        "Customer purchase order only",
        "Material Test Certificate with matching heat number",
        "Supplier invoice",
        "Operator sign-off",
      ],
      correct: 1,
      explanation: "For AMS, DFARS, or aerospace materials, a Material Test Certificate is mandatory and the heat number must match the certificate for full traceability.",
    },
  ];

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
            You scored {score} out of {questions.length} questions correctly.
          </p>
        </div>
        <Progress value={percentage} className="max-w-xs mx-auto" />
        <Button onClick={resetQuiz} data-testid="button-retry-quiz">
          Retake Quiz
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4" data-testid="training-quiz">
      <div className="flex items-center justify-between">
        <span className="text-xs text-muted-foreground">
          Question {currentQ + 1} of {questions.length}
        </span>
        <Badge variant="secondary" className="text-xs">
          Score: {score}/{currentQ + (showResult ? 1 : 0)}
        </Badge>
      </div>
      <Progress value={((currentQ + (showResult ? 1 : 0)) / questions.length) * 100} />

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
          <Badge variant="secondary" className="mb-3 text-xs" data-testid="badge-subtitle">
            High-Mix Rapid Prototyping & Production
          </Badge>
          <h2 className="text-2xl font-bold tracking-tight" data-testid="text-main-title">
            Production & Quality Control
          </h2>
          <p className="text-sm text-muted-foreground mt-1 max-w-xl mx-auto">
            Interactive training module covering all 11 phases of the PRECILAYER master production flow, from order intake to dispatch.
          </p>
        </motion.div>

        <FlowchartMini />

        <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-4">
          <TabsList className="grid w-full grid-cols-4" data-testid="tabs-navigation">
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
                <h3 className="text-lg font-bold" data-testid="text-quiz-title">Training Assessment</h3>
                <p className="text-xs text-muted-foreground">Test your understanding of the PRECILAYER production and quality flow.</p>
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
