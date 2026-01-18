"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  BookOpen,
  Edit,
  FileText,
  Globe,
  CheckCircle,
  Clock,
  TrendingUp,
  Target,
  Search,
  PenTool,
  Send,
  Users,
  Award,
  AlertCircle,
  Lightbulb
} from "lucide-react";
import { oswald } from "@/app/(app)/fonts";
import Link from 'next/link';

export default function TutorialPage() {
  const tutorials = [
    {
      id: "research-methods",
      title: "Research Methods",
      icon: BookOpen,
      color: "from-blue-500 to-cyan-500",
      count: 12,
      description: "Master qualitative, quantitative, and mixed methods research"
    },
    {
      id: "academic-writing",
      title: "Academic Writing",
      icon: PenTool,
      color: "from-emerald-500 to-teal-500",
      count: 18,
      description: "Learn scholarly writing, structure, and citation styles"
    },
    {
      id: "data-analysis",
      title: "Data Analysis",
      icon: TrendingUp,
      color: "from-purple-500 to-pink-500",
      count: 15,
      description: "SPSS, R, Python, and statistical analysis techniques"
    },
    {
      id: "publication",
      title: "Article Writing & Publication",
      icon: Send,
      color: "from-amber-500 to-orange-500",
      count: 20,
      description: "From manuscript to journal publication",
      featured: true
    },
  ];

  const publicationSteps = [
    {
      step: 1,
      title: "Choosing the Right Journal",
      icon: Target,
      description: "Learn how to match your manuscript with the perfect journal based on scope, impact factor, and audience.",
      tips: [
        "Check the journal's aims and scope carefully",
        "Consider the impact factor and indexing",
        "Review previous publications in the journal",
        "Check acceptance rates and publication timelines"
      ],
      time: "2-4 weeks",
      successRate: "High"
    },
    {
      step: 2,
      title: "Manuscript Preparation",
      icon: FileText,
      description: "Structure your article correctly with proper sections, formatting, and language.",
      tips: [
        "Follow IMRaD structure (Introduction, Methods, Results, Discussion)",
        "Adhere strictly to journal guidelines",
        "Write clear and concise abstracts",
        "Use appropriate scientific language"
      ],
      time: "4-8 weeks",
      successRate: "Medium"
    },
    {
      step: 3,
      title: "Peer Review Process",
      icon: Users,
      description: "Navigate the peer review system and respond to reviewer comments effectively.",
      tips: [
        "Be polite and professional in responses",
        "Address all reviewer comments systematically",
        "Provide point-by-point responses",
        "Submit revised manuscript promptly"
      ],
      time: "8-16 weeks",
      successRate: "Variable"
    },
    {
      step: 4,
      title: "Post-Acceptance Steps",
      icon: CheckCircle,
      description: "Final steps including proofreading, copyright transfer, and publication.",
      tips: [
        "Proofread galley proofs carefully",
        "Complete copyright transfer agreement",
        "Pay attention to publication fees if applicable",
        "Share your published work appropriately"
      ],
      time: "2-6 weeks",
      successRate: "Very High"
    },
  ];

  const commonMistakes = [
    {
      mistake: "Poor journal selection",
      solution: "Use journal matching tools and carefully read aims & scope",
      icon: AlertCircle
    },
    {
      mistake: "Ignoring formatting guidelines",
      solution: "Create a checklist of journal requirements before submission",
      icon: FileText
    },
    {
      mistake: "Weak literature review",
      solution: "Include recent, relevant studies and show knowledge gaps",
      icon: BookOpen
    },
    {
      mistake: "Inadequate methodology description",
      solution: "Provide sufficient detail for reproducibility",
      icon: Search
    },
    {
      mistake: "Poor data presentation",
      solution: "Use clear tables and figures with proper labeling",
      icon: TrendingUp
    },
    {
      mistake: "Plagiarism issues",
      solution: "Use plagiarism checking tools and proper citation",
      icon: AlertCircle
    },
  ];

  const resources = [
    {
      title: "Journal Selection Tools",
      items: ["Journal Finder", "JournalGuide", "Elsevier Journal Finder"]
    },
    {
      title: "Writing & Editing Tools",
      items: ["Grammarly", "Hemingway Editor", "Academic Phrasebank"]
    },
    {
      title: "Reference Management",
      items: ["Zotero", "Mendeley", "EndNote"]
    },
    {
      title: "Plagiarism Checkers",
      items: ["Turnitin", "iThenticate", "PlagScan"]
    },
  ];

  return (
    <div className={`${oswald.className} min-h-screen bg-white dark:bg-[#1C1C30] text-gray-900 dark:text-gray-100 transition-colors duration-500`}>
      {/* Hero Section */}
      <section className="relative pt-24 pb-16 px-5 sm:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1C1C30]/10 to-transparent dark:from-[#1C1C30]/30 z-0" />
        
        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#E8B85F]/10 text-[#E8B85F] text-sm font-semibold mb-4">
              <BookOpen className="w-4 h-4" />
              Academic Tutorials
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
              Master <span className="text-[#E8B85F]">Article Writing & Publication</span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              A comprehensive guide to getting your research published in academic journals. From manuscript preparation to navigating peer review.
            </p>
          </div>

          {/* Tutorial Categories */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {tutorials.map((tut, i) => {
              const Icon = tut.icon;
              return (
                <motion.div
                  key={tut.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -8 }}
                  className={`p-6 rounded-2xl border ${tut.featured ? 'border-[#E8B85F] shadow-lg shadow-[#E8B85F]/20' : 'border-gray-200 dark:border-gray-700'} 
                    bg-white dark:bg-[#1C1C30]/80 hover:shadow-xl transition-all duration-300`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${tut.color} flex items-center justify-center`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    {tut.featured && (
                      <span className="px-2 py-1 text-xs font-semibold bg-[#E8B85F] text-[#1C1C30] rounded-full">
                        Featured
                      </span>
                    )}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{tut.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{tut.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-[#E8B85F]">{tut.count} tutorials</span>
                    <ArrowRight className="w-4 h-4 text-gray-400" />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 px-5 sm:px-8 bg-gray-50/50 dark:bg-[#1C1C30]/20">
        <div className="max-w-7xl mx-auto">
          {/* Introduction */}
          <div className="mb-16 p-8 bg-white dark:bg-[#1C1C30]/80 rounded-3xl border border-gray-200 dark:border-gray-700 shadow-xl">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#E8B85F] to-[#D8A84F] flex items-center justify-center">
                <Lightbulb className="w-7 h-7 text-[#1C1C30]" />
              </div>
              <div>
                <h2 className="text-3xl font-bold">Why Publication Matters</h2>
                <p className="text-gray-600 dark:text-gray-400">Essential for academic growth and research impact</p>
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <p className="text-lg mb-4">
                  Publishing in reputable academic journals is crucial for advancing your research career, 
                  contributing to knowledge in your field, and securing funding for future projects.
                </p>
                <p className="text-lg">
                  This guide walks you through each step of the publication process, providing practical 
                  advice and actionable strategies to increase your chances of acceptance.
                </p>
              </div>
              <div className="bg-gradient-to-br from-[#1C1C30] to-[#2C2C40] dark:from-[#0A0A1A] dark:to-[#1C1C30] p-6 rounded-2xl">
                <h3 className="text-xl font-bold text-white mb-4">Key Benefits</h3>
                <ul className="space-y-3">
                  {[
                    "Enhance academic reputation",
                    "Contribute to knowledge advancement",
                    "Secure research funding",
                    "Meet degree requirements",
                    "Network with peers globally"
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-gray-200">
                      <CheckCircle className="w-5 h-5 text-[#E8B85F]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Publication Process Steps */}
          <div className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">The Publication Journey</h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                Follow these four critical steps to navigate the academic publication process successfully
              </p>
            </div>

            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-1 md:w-0.5 bg-gradient-to-b from-[#E8B85F] via-[#E8B85F]/50 to-transparent transform md:-translate-x-1/2"></div>
              
              {publicationSteps.map((step, i) => {
                const Icon = step.icon;
                const isEven = i % 2 === 0;
                
                return (
                  <motion.div
                    key={step.step}
                    initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className={`relative flex flex-col md:flex-row items-center mb-12 ${isEven ? 'md:flex-row-reverse' : ''}`}
                  >
                    {/* Step Number */}
                    <div className="absolute left-1/2 md:left-1/2 top-8 transform -translate-x-1/2 z-10">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#E8B85F] to-[#D8A84F] flex items-center justify-center text-[#1C1C30] text-xl font-bold shadow-lg">
                        {step.step}
                      </div>
                    </div>

                    {/* Content Card */}
                    <div className={`w-full md:w-5/12 mt-20 md:mt-0 ${isEven ? 'md:pr-12' : 'md:pl-12'}`}>
                      <div className="p-8 bg-white dark:bg-[#1C1C30]/80 rounded-3xl border border-gray-200 dark:border-gray-700 shadow-xl">
                        <div className="flex items-center gap-4 mb-4">
                          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#E8B85F]/20 to-[#E8B85F]/10 flex items-center justify-center">
                            <Icon className="w-6 h-6 text-[#E8B85F]" />
                          </div>
                          <h3 className="text-2xl font-bold">{step.title}</h3>
                        </div>
                        
                        <p className="text-gray-600 dark:text-gray-400 mb-6">{step.description}</p>
                        
                        <div className="mb-6">
                          <h4 className="font-semibold mb-3 text-[#E8B85F]">Key Tips:</h4>
                          <ul className="space-y-2">
                            {step.tips.map((tip, tipIndex) => (
                              <li key={tipIndex} className="flex items-start gap-2">
                                <CheckCircle className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                                <span className="text-sm">{tip}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        <div className="flex items-center justify-between pt-6 border-t border-gray-200 dark:border-gray-700">
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2">
                              <Clock className="w-4 h-4 text-gray-500" />
                              <span className="text-sm font-medium">{step.time}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <TrendingUp className="w-4 h-4 text-gray-500" />
                              <span className="text-sm font-medium">{step.successRate} success rate</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Common Mistakes & Solutions */}
          <div className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">Avoid These Common Pitfalls</h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                Learn from others' mistakes to increase your publication chances
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {commonMistakes.map((item, i) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="p-6 bg-white dark:bg-[#1C1C30]/80 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-500/10 to-red-500/5 flex items-center justify-center">
                        <Icon className="w-6 h-6 text-red-500" />
                      </div>
                      <h3 className="text-lg font-bold">{item.mistake}</h3>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400">{item.solution}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Tools & Resources */}
          <div className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">Essential Tools & Resources</h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                Leverage these tools to streamline your publication process
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {resources.map((category, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="p-8 bg-white dark:bg-[#1C1C30]/80 rounded-3xl border border-gray-200 dark:border-gray-700 shadow-xl"
                >
                  <h3 className="text-2xl font-bold mb-6 text-[#E8B85F]">{category.title}</h3>
                  <ul className="space-y-4">
                    {category.items.map((tool, j) => (
                      <li key={j} className="flex items-center justify-between p-4 rounded-xl bg-gray-50 dark:bg-[#1C1C30]/50">
                        <span className="font-medium">{tool}</span>
                        <a href="#" className="text-sm text-[#E8B85F] hover:underline">Learn More →</a>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Final CTA */}
          <div className="text-center p-12 bg-gradient-to-r from-[#1C1C30] to-[#2C2C40] dark:from-[#0A0A1A] dark:to-[#1C1C30] rounded-3xl">
            <Award className="w-16 h-16 text-[#E8B85F] mx-auto mb-6" />
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Ready to Get Published?
            </h2>
            <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
              Join thousands of researchers who have successfully navigated the publication process with our expert guidance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href="/contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-4 bg-[#E8B85F] text-[#1C1C30] rounded-full text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center gap-3"
              >
                Get Publication Support
                <ArrowRight className="w-5 h-5" />
              </motion.a>
              <motion.a
                href="/services/publication"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-4 border-2 border-[#E8B85F] text-[#E8B85F] rounded-full text-lg font-semibold hover:bg-[#E8B85F] hover:text-[#1C1C30] transition-all duration-300"
              >
                View All Tutorials
              </motion.a>
            </div>
          </div>

          {/* Next Steps */}
          <div className="mt-12 p-8 bg-white dark:bg-[#1C1C30]/80 rounded-3xl border border-gray-200 dark:border-gray-700">
            <h3 className="text-2xl font-bold mb-6">Continue Your Learning</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  title: "Advanced Research Methods",
                  desc: "Deep dive into qualitative and quantitative techniques",
                  href: "/tutorials/research-methods"
                },
                {
                  title: "Data Analysis Mastery",
                  desc: "Learn SPSS, R, and statistical modeling",
                  href: "/tutorials/data-analysis"
                },
                {
                  title: "Academic Writing Excellence",
                  desc: "Master scholarly writing and citation styles",
                  href: "/tutorials/academic-writing"
                }
              ].map((item, i) => (
                <Link
                  key={i}
                  href={item.href}
                  className="p-6 rounded-2xl border border-gray-200 dark:border-gray-700 hover:border-[#E8B85F] hover:shadow-lg transition-all duration-300 group"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#E8B85F]/10 to-[#E8B85F]/5 flex items-center justify-center group-hover:from-[#E8B85F]/20 group-hover:to-[#E8B85F]/10">
                      <ArrowRight className="w-5 h-5 text-[#E8B85F]" />
                    </div>
                    <span className="text-sm font-semibold text-[#E8B85F]">Next →</span>
                  </div>
                  <h4 className="text-lg font-bold mb-2">{item.title}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{item.desc}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}