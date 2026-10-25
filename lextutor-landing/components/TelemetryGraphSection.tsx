"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

interface SittingBar {
  year: string;
  compulsory: number;
  optional: number;
  note: string;
}

interface CourseTopic {
  rank: string;
  name: string;
  authority: string;
  sittingsCount: number;
  totalSittingsCount: number;
  compulsoryCount: number;
  sharePercent: number;
  bars: SittingBar[];
}

interface CourseDrilldown {
  id: string;
  label: string;
  totalSittings: string;
  topics: CourseTopic[];
}

const COURSE_DRILLDOWNS: CourseDrilldown[] = [
  {
    id: "civil",
    label: "Civil Litigation",
    totalSittings: "22 sittings · 2010–2025",
    topics: [
      {
        rank: "01",
        name: "Interlocutory Applications & Injunctions",
        authority:
          "Order 42 & 43 Lagos 2019 · Kotoye v. CBN (1989) 1 NWLR (Pt. 98) 419",
        sittingsCount: 19,
        totalSittingsCount: 22,
        compulsoryCount: 14,
        sharePercent: 88,
        bars: [
          {
            year: "14",
            compulsory: 24,
            optional: 12,
            note: "2014 Bar Finals — 36% of paper (24% compulsory Q1, 12% optional Q3) · Mareva & Anton Piller injunctions.",
          },
          {
            year: "15",
            compulsory: 18,
            optional: 14,
            note: "2015 Bar Finals — 32% of paper (18% compulsory Q4, 14% optional Q6) · Ex parte vs. Motion on Notice.",
          },
          {
            year: "16",
            compulsory: 28,
            optional: 10,
            note: "2016 Bar Finals — 38% of paper (28% compulsory Q1, 10% optional Q2) · Undertaking as to damages.",
          },
          {
            year: "17",
            compulsory: 22,
            optional: 15,
            note: "2017 Bar Finals — 37% of paper (22% compulsory Q1, 15% optional Q5) · Kotoye v. CBN principles.",
          },
          {
            year: "18",
            compulsory: 30,
            optional: 12,
            note: "2018 Bar Finals — 42% of paper (30% compulsory Q4, 12% optional Q2) · Affidavit of urgency defects.",
          },
          {
            year: "19",
            compulsory: 25,
            optional: 14,
            note: "2019 Bar Finals — 39% of paper (25% compulsory Q1, 14% optional Q6) · Interpleader summons.",
          },
          {
            year: "20",
            compulsory: 32,
            optional: 10,
            note: "2020 Bar Finals — 42% of paper (32% compulsory Q1, 10% optional Q3) · Order 43 Rule 1 Lagos 2019.",
          },
          {
            year: "21",
            compulsory: 26,
            optional: 16,
            note: "2021 Bar Finals — 42% of paper (26% compulsory Q4, 16% optional Q5) · Counter-affidavit & further affidavit.",
          },
          {
            year: "22",
            compulsory: 34,
            optional: 12,
            note: "2022 Bar Finals — 46% of paper (34% compulsory Q1, 12% optional Q2) · Interim vs. interlocutory relief.",
          },
          {
            year: "23",
            compulsory: 28,
            optional: 14,
            note: "2023 Bar Finals — 42% of paper (28% compulsory Q1, 14% optional Q6) · Seven-day abatement rule in Lagos.",
          },
          {
            year: "24",
            compulsory: 35,
            optional: 12,
            note: "2024 Bar Finals — 47% of paper (35% compulsory Q1, 12% optional Q5) · Motion on Notice & Written Address.",
          },
          {
            year: "25",
            compulsory: 32,
            optional: 14,
            note: "2025 Bar Finals — 46% of paper (32% compulsory Q1, 14% optional Q3) · Constitutional fair-hearing limits.",
          },
        ],
      },
      {
        rank: "02",
        name: "Summary Judgment & Undefended List",
        authority: "Order 13 Lagos 2019 · Order 35 Abuja 2018 · UTC v. Pamotei",
        sittingsCount: 18,
        totalSittingsCount: 22,
        compulsoryCount: 13,
        sharePercent: 82,
        bars: [
          {
            year: "14",
            compulsory: 20,
            optional: 10,
            note: "2014 Bar Finals — 30% of paper (20% compulsory Q1, 10% optional Q2) · Liquidated money demand.",
          },
          {
            year: "15",
            compulsory: 25,
            optional: 8,
            note: "2015 Bar Finals — 33% of paper (25% compulsory Q1, 8% optional Q5) · Notice of intention to defend.",
          },
          {
            year: "16",
            compulsory: 22,
            optional: 12,
            note: "2016 Bar Finals — 34% of paper (22% compulsory Q4, 12% optional Q3) · Leave to defend vs. final judgment.",
          },
          {
            year: "17",
            compulsory: 28,
            optional: 10,
            note: "2017 Bar Finals — 38% of paper (28% compulsory Q1, 10% optional Q6) · Order 11/13 Lagos accompanying processes.",
          },
          {
            year: "18",
            compulsory: 24,
            optional: 14,
            note: "2018 Bar Finals — 38% of paper (24% compulsory Q1, 14% optional Q3) · Five-day filing window in Abuja.",
          },
          {
            year: "19",
            compulsory: 30,
            optional: 8,
            note: "2019 Bar Finals — 38% of paper (30% compulsory Q4, 8% optional Q2) · General roll transfer consequences.",
          },
          {
            year: "20",
            compulsory: 26,
            optional: 12,
            note: "2020 Bar Finals — 38% of paper (26% compulsory Q1, 12% optional Q5) · Written brief omission under Order 13.",
          },
          {
            year: "21",
            compulsory: 32,
            optional: 10,
            note: "2021 Bar Finals — 42% of paper (32% compulsory Q1, 10% optional Q3) · Dual-venue comparison (Lagos & FCT).",
          },
          {
            year: "22",
            compulsory: 28,
            optional: 14,
            note: "2022 Bar Finals — 42% of paper (28% compulsory Q4, 14% optional Q6) · Judgment on the Undefended List.",
          },
          {
            year: "23",
            compulsory: 30,
            optional: 12,
            note: "2023 Bar Finals — 42% of paper (30% compulsory Q1, 12% optional Q2) · Triable issue threshold.",
          },
          {
            year: "24",
            compulsory: 34,
            optional: 10,
            note: "2024 Bar Finals — 44% of paper (34% compulsory Q1, 10% optional Q5) · Order 13 Rule 1 Lagos vs. Order 35 Abuja.",
          },
          {
            year: "25",
            compulsory: 30,
            optional: 14,
            note: "2025 Bar Finals — 44% of paper (30% compulsory Q1, 14% optional Q4) · Setting aside default vs. merits judgment.",
          },
        ],
      },
      {
        rank: "03",
        name: "Originating Processes & Jurisdiction",
        authority: "1999 Constitution s. 251 & s. 272 · Doherty v. Doherty",
        sittingsCount: 17,
        totalSittingsCount: 22,
        compulsoryCount: 12,
        sharePercent: 77,
        bars: [
          {
            year: "14",
            compulsory: 22,
            optional: 8,
            note: "2014 Bar Finals — 30% of paper · Writ of Summons vs. Originating Summons.",
          },
          {
            year: "15",
            compulsory: 20,
            optional: 12,
            note: "2015 Bar Finals — 32% of paper · Frontloading requirements in Lagos and Abuja.",
          },
          {
            year: "16",
            compulsory: 24,
            optional: 10,
            note: "2016 Bar Finals — 34% of paper · Service out of jurisdiction under Sheriff and Civil Process Act.",
          },
          {
            year: "17",
            compulsory: 26,
            optional: 8,
            note: "2017 Bar Finals — 34% of paper · Renewal of expired writ of summons.",
          },
          {
            year: "18",
            compulsory: 22,
            optional: 14,
            note: "2018 Bar Finals — 36% of paper · Federal High Court exclusive jurisdiction under s. 251.",
          },
          {
            year: "19",
            compulsory: 28,
            optional: 10,
            note: "2019 Bar Finals — 38% of paper · Conditional appearance vs. Preliminary Objection.",
          },
          {
            year: "20",
            compulsory: 24,
            optional: 12,
            note: "2020 Bar Finals — 36% of paper · Substituted service by court order.",
          },
          {
            year: "21",
            compulsory: 28,
            optional: 10,
            note: "2021 Bar Finals — 38% of paper · Hostile proceedings unsuitable for Originating Summons.",
          },
          {
            year: "22",
            compulsory: 26,
            optional: 12,
            note: "2022 Bar Finals — 38% of paper · Pre-action protocol & pre-action counselling certificate.",
          },
          {
            year: "23",
            compulsory: 30,
            optional: 10,
            note: "2023 Bar Finals — 40% of paper · Endorsement for service outside state.",
          },
          {
            year: "24",
            compulsory: 28,
            optional: 12,
            note: "2024 Bar Finals — 40% of paper · Nullity of defective originating process.",
          },
          {
            year: "25",
            compulsory: 32,
            optional: 10,
            note: "2025 Bar Finals — 42% of paper · Subject-matter vs. territorial jurisdiction.",
          },
        ],
      },
      {
        rank: "04",
        name: "Electronic & Documentary Evidence Foundation",
        authority: "Evidence Act 2011 s. 83, s. 84 & s. 102 · Kubor v. Dickson",
        sittingsCount: 16,
        totalSittingsCount: 22,
        compulsoryCount: 11,
        sharePercent: 73,
        bars: [
          {
            year: "14",
            compulsory: 16,
            optional: 12,
            note: "2014 Bar Finals — 28% of paper · Admissibility of computer-generated bank statements.",
          },
          {
            year: "15",
            compulsory: 18,
            optional: 10,
            note: "2015 Bar Finals — 28% of paper · Certified True Copies of public documents under s. 104.",
          },
          {
            year: "16",
            compulsory: 20,
            optional: 12,
            note: "2016 Bar Finals — 32% of paper · Kubor v. Dickson certificate requirements.",
          },
          {
            year: "17",
            compulsory: 22,
            optional: 10,
            note: "2017 Bar Finals — 32% of paper · Oral vs. written s. 84(4) certificate.",
          },
          {
            year: "18",
            compulsory: 24,
            optional: 10,
            note: "2018 Bar Finals — 34% of paper · Proper custody & tendering from the Bar.",
          },
          {
            year: "19",
            compulsory: 22,
            optional: 12,
            note: "2019 Bar Finals — 34% of paper · Subpoena duces tecum vs. ad testificandum.",
          },
          {
            year: "20",
            compulsory: 26,
            optional: 10,
            note: "2020 Bar Finals — 36% of paper · Electronic signatures under s. 93 Evidence Act.",
          },
          {
            year: "21",
            compulsory: 24,
            optional: 14,
            note: "2021 Bar Finals — 38% of paper · Secondary evidence of private documents.",
          },
          {
            year: "22",
            compulsory: 28,
            optional: 10,
            note: "2022 Bar Finals — 38% of paper · Section 84(2) four conditions for device reliability.",
          },
          {
            year: "23",
            compulsory: 26,
            optional: 12,
            note: "2023 Bar Finals — 38% of paper · Refreshing memory & hostile witness procedure.",
          },
          {
            year: "24",
            compulsory: 30,
            optional: 10,
            note: "2024 Bar Finals — 40% of paper · Digital forensics & WhatsApp/email printouts.",
          },
          {
            year: "25",
            compulsory: 28,
            optional: 12,
            note: "2025 Bar Finals — 40% of paper · Rejection of unmarked exhibits.",
          },
        ],
      },
      {
        rank: "05",
        name: "Recovery of Premises & Statutory Notices",
        authority: "Tenancy Law Lagos 2011 s. 13 · Recovery of Premises Act Abuja",
        sittingsCount: 15,
        totalSittingsCount: 22,
        compulsoryCount: 10,
        sharePercent: 68,
        bars: [
          {
            year: "14",
            compulsory: 18,
            optional: 10,
            note: "2014 Bar Finals — 28% of paper · Notice to Quit computation for yearly tenancy.",
          },
          {
            year: "15",
            compulsory: 16,
            optional: 12,
            note: "2015 Bar Finals — 28% of paper · Seven days Owner's Intention to Apply to Recover Possession.",
          },
          {
            year: "16",
            compulsory: 20,
            optional: 10,
            note: "2016 Bar Finals — 30% of paper · Written authority of solicitor to sign Notice to Quit.",
          },
          {
            year: "17",
            compulsory: 18,
            optional: 12,
            note: "2017 Bar Finals — 30% of paper · Half-year vs. six calendar months distinction.",
          },
          {
            year: "18",
            compulsory: 22,
            optional: 10,
            note: "2018 Bar Finals — 32% of paper · Exemption of Ikoyi, Victoria Island, Apapa, Ikeja GRA.",
          },
          {
            year: "19",
            compulsory: 20,
            optional: 12,
            note: "2019 Bar Finals — 32% of paper · Service of statutory notices on tenant in arrears.",
          },
          {
            year: "20",
            compulsory: 24,
            optional: 10,
            note: "2020 Bar Finals — 34% of paper · Mesne profits vs. arrears of rent.",
          },
          {
            year: "21",
            compulsory: 22,
            optional: 12,
            note: "2021 Bar Finals — 34% of paper · Tenancy at will vs. statutory tenant.",
          },
          {
            year: "22",
            compulsory: 24,
            optional: 12,
            note: "2022 Bar Finals — 36% of paper · Counterclaim for unexhausted improvements.",
          },
          {
            year: "23",
            compulsory: 26,
            optional: 10,
            note: "2023 Bar Finals — 36% of paper · Premature service of Form TL4 / Form E.",
          },
          {
            year: "24",
            compulsory: 24,
            optional: 14,
            note: "2024 Bar Finals — 38% of paper · Jurisdiction of Magistrates vs. High Court by rental value.",
          },
          {
            year: "25",
            compulsory: 26,
            optional: 12,
            note: "2025 Bar Finals — 38% of paper · Drafting Notice to Quit & 7-Day Notice.",
          },
        ],
      },
    ],
  },
  {
    id: "criminal",
    label: "Criminal Litigation",
    totalSittings: "22 sittings · 2010–2025",
    topics: [
      {
        rank: "01",
        name: "Charge Drafting & Rule Against Duplicity",
        authority:
          "ACJA 2015 s. 194–209 · Okeke v. State · Nig. Air Force v. Kamaldeen",
        sittingsCount: 21,
        totalSittingsCount: 22,
        compulsoryCount: 18,
        sharePercent: 95,
        bars: [
          {
            year: "14",
            compulsory: 32,
            optional: 10,
            note: "2014 Bar Finals — 42% of paper · Multi-count robbery and conspiracy charge sheet.",
          },
          {
            year: "15",
            compulsory: 34,
            optional: 12,
            note: "2015 Bar Finals — 46% of paper · Duplicity exception for general deficiency of money.",
          },
          {
            year: "16",
            compulsory: 30,
            optional: 14,
            note: "2016 Bar Finals — 44% of paper · Misjoinder of offenders vs. misjoinder of offences.",
          },
          {
            year: "17",
            compulsory: 35,
            optional: 10,
            note: "2017 Bar Finals — 45% of paper · Definition section vs. punishment section fatal defect.",
          },
          {
            year: "18",
            compulsory: 36,
            optional: 12,
            note: "2018 Bar Finals — 48% of paper · Amendment of charge and fresh plea requirement.",
          },
          {
            year: "19",
            compulsory: 34,
            optional: 12,
            note: "2019 Bar Finals — 46% of paper · Separate counts for distinct victims in armed robbery.",
          },
          {
            year: "20",
            compulsory: 38,
            optional: 10,
            note: "2020 Bar Finals — 48% of paper · ACJL Lagos information vs. FCT charge sheet.",
          },
          {
            year: "21",
            compulsory: 35,
            optional: 14,
            note: "2021 Bar Finals — 49% of paper · Post-amendment recall of witnesses under s. 217 ACJA.",
          },
          {
            year: "22",
            compulsory: 36,
            optional: 12,
            note: "2022 Bar Finals — 48% of paper · N-ADPOPS nine-gate count verification.",
          },
          {
            year: "23",
            compulsory: 38,
            optional: 10,
            note: "2023 Bar Finals — 48% of paper · Culpable homicide punishable with death (Penal Code s. 221).",
          },
          {
            year: "24",
            compulsory: 40,
            optional: 10,
            note: "2024 Bar Finals — 50% of paper · Three-head Magistrate charge vs. single-paragraph High Court count.",
          },
          {
            year: "25",
            compulsory: 38,
            optional: 12,
            note: "2025 Bar Finals — 50% of paper · Objection to defective charge under s. 221 ACJA.",
          },
        ],
      },
      {
        rank: "02",
        name: "Bail Pending Trial & Pending Appeal",
        authority: "ACJA 2015 s. 158–168 · Bamaiyi v. State · Dokubo-Asari v. FRN",
        sittingsCount: 19,
        totalSittingsCount: 22,
        compulsoryCount: 14,
        sharePercent: 86,
        bars: [
          {
            year: "14",
            compulsory: 22,
            optional: 12,
            note: "2014 Bar Finals — 34% of paper · Capital offence special circumstances.",
          },
          {
            year: "15",
            compulsory: 24,
            optional: 10,
            note: "2015 Bar Finals — 34% of paper · Summons vs. Motion on Notice for bail.",
          },
          {
            year: "16",
            compulsory: 26,
            optional: 10,
            note: "2016 Bar Finals — 36% of paper · Ill-health ground requirements (Fawehinmi v. State).",
          },
          {
            year: "17",
            compulsory: 24,
            optional: 12,
            note: "2017 Bar Finals — 36% of paper · Women as sureties under s. 167(3) ACJA.",
          },
          {
            year: "18",
            compulsory: 28,
            optional: 10,
            note: "2018 Bar Finals — 38% of paper · Bail pending appeal exceptional circumstances.",
          },
          {
            year: "19",
            compulsory: 26,
            optional: 12,
            note: "2019 Bar Finals — 38% of paper · Revocation of bail & forfeiture of recognizance.",
          },
          {
            year: "20",
            compulsory: 30,
            optional: 10,
            note: "2020 Bar Finals — 40% of paper · Administration of Criminal Justice (Repeal & Re-enactment) Lagos.",
          },
          {
            year: "21",
            compulsory: 28,
            optional: 12,
            note: "2021 Bar Finals — 40% of paper · High Court application after Magistrate refusal.",
          },
          {
            year: "22",
            compulsory: 30,
            optional: 12,
            note: "2022 Bar Finals — 42% of paper · Registration of bondspersons under s. 187 ACJA.",
          },
          {
            year: "23",
            compulsory: 32,
            optional: 10,
            note: "2023 Bar Finals — 42% of paper · Remand proceedings time limits under s. 293–296 ACJA.",
          },
          {
            year: "24",
            compulsory: 30,
            optional: 14,
            note: "2024 Bar Finals — 44% of paper · Drafting Motion on Notice & Affidavit for Bail.",
          },
          {
            year: "25",
            compulsory: 32,
            optional: 12,
            note: "2025 Bar Finals — 44% of paper · Counter-affidavit opposing bail in felony.",
          },
        ],
      },
      {
        rank: "03",
        name: "Confessional Statements & Trial-Within-Trial",
        authority: "Evidence Act 2011 s. 28 & s. 29 · ACJA 2015 s. 15(4) & s. 17(2)",
        sittingsCount: 18,
        totalSittingsCount: 22,
        compulsoryCount: 13,
        sharePercent: 81,
        bars: [
          {
            year: "14",
            compulsory: 20,
            optional: 10,
            note: "2014 Bar Finals — 30% of paper · Retraction vs. involuntariness objection.",
          },
          {
            year: "15",
            compulsory: 22,
            optional: 10,
            note: "2015 Bar Finals — 32% of paper · Six tests in R v. Sykes for retracted confession.",
          },
          {
            year: "16",
            compulsory: 24,
            optional: 10,
            note: "2016 Bar Finals — 34% of paper · Oppression & inducement under s. 29(2) Evidence Act.",
          },
          {
            year: "17",
            compulsory: 22,
            optional: 12,
            note: "2017 Bar Finals — 34% of paper · Video recording & presence of legal practitioner.",
          },
          {
            year: "18",
            compulsory: 26,
            optional: 10,
            note: "2018 Bar Finals — 36% of paper · Stage to raise involuntariness objection.",
          },
          {
            year: "19",
            compulsory: 24,
            optional: 12,
            note: "2019 Bar Finals — 36% of paper · Effect of confession against co-accused under s. 29(4).",
          },
          {
            year: "20",
            compulsory: 28,
            optional: 10,
            note: "2020 Bar Finals — 38% of paper · Mandatory electronic recording under s. 9(3) ACJL Lagos.",
          },
          {
            year: "21",
            compulsory: 26,
            optional: 12,
            note: "2021 Bar Finals — 38% of paper · Charles v. State & Nnajiofor v. FRN.",
          },
          {
            year: "22",
            compulsory: 28,
            optional: 12,
            note: "2022 Bar Finals — 40% of paper · Order of witnesses in trial-within-trial.",
          },
          {
            year: "23",
            compulsory: 30,
            optional: 10,
            note: "2023 Bar Finals — 40% of paper · Admissibility of evidence discovered via inadmissible confession.",
          },
          {
            year: "24",
            compulsory: 28,
            optional: 14,
            note: "2024 Bar Finals — 42% of paper · ACJA s. 15(4) & s. 17(2) compliance.",
          },
          {
            year: "25",
            compulsory: 30,
            optional: 12,
            note: "2025 Bar Finals — 42% of paper · Distinguishing non est factum from duress.",
          },
        ],
      },
    ],
  },
  {
    id: "corporate",
    label: "Corporate Law",
    totalSittings: "22 sittings · 2010–2025",
    topics: [
      {
        rank: "01",
        name: "Post-Incorporation Filings & Statutory Governance",
        authority: "CAMA 2020 s. 41–52, s. 237–266 · CAC Operations Checklist",
        sittingsCount: 20,
        totalSittingsCount: 22,
        compulsoryCount: 15,
        sharePercent: 91,
        bars: [
          {
            year: "14",
            compulsory: 26,
            optional: 10,
            note: "2014 Bar Finals — 36% of paper · Alteration of objects & re-registration of companies.",
          },
          {
            year: "15",
            compulsory: 28,
            optional: 10,
            note: "2015 Bar Finals — 38% of paper · Statutory notice of AGM & special business.",
          },
          {
            year: "16",
            compulsory: 25,
            optional: 12,
            note: "2016 Bar Finals — 37% of paper · Removal of director under statutory procedure.",
          },
          {
            year: "17",
            compulsory: 30,
            optional: 10,
            note: "2017 Bar Finals — 40% of paper · Increase and reduction of share capital.",
          },
          {
            year: "18",
            compulsory: 28,
            optional: 12,
            note: "2018 Bar Finals — 40% of paper · Board vs. General Meeting deadlock.",
          },
          {
            year: "19",
            compulsory: 30,
            optional: 12,
            note: "2019 Bar Finals — 42% of paper · Conversion from LTD to PLC requirements.",
          },
          {
            year: "20",
            compulsory: 32,
            optional: 10,
            note: "2020 Bar Finals — 42% of paper · CAMA 2020 single-member company & independent directors.",
          },
          {
            year: "21",
            compulsory: 34,
            optional: 10,
            note: "2021 Bar Finals — 44% of paper · Cancellation of unissued shares & minimum issued share capital.",
          },
          {
            year: "22",
            compulsory: 32,
            optional: 12,
            note: "2022 Bar Finals — 44% of paper · Persons with Significant Control (PSC) filing windows.",
          },
          {
            year: "23",
            compulsory: 35,
            optional: 10,
            note: "2023 Bar Finals — 45% of paper · Virtual general meetings for private companies under s. 240.",
          },
          {
            year: "24",
            compulsory: 36,
            optional: 12,
            note: "2024 Bar Finals — 48% of paper · Drafting Special Resolutions & Notice of Removal under s. 288.",
          },
          {
            year: "25",
            compulsory: 34,
            optional: 14,
            note: "2025 Bar Finals — 48% of paper · Company Voluntary Arrangement & Administration under CAMA 2020.",
          },
        ],
      },
      {
        rank: "02",
        name: "Minority Protection, Mergers & Restructuring",
        authority: "CAMA 2020 s. 343–357 & s. 711 · FCCPA 2018 s. 92 · ISA 2007",
        sittingsCount: 18,
        totalSittingsCount: 22,
        compulsoryCount: 12,
        sharePercent: 82,
        bars: [
          {
            year: "14",
            compulsory: 20,
            optional: 12,
            note: "2014 Bar Finals — 32% of paper · Rule in Foss v. Harbottle & statutory exceptions.",
          },
          {
            year: "15",
            compulsory: 22,
            optional: 10,
            note: "2015 Bar Finals — 32% of paper · Relief on ground of unfairly prejudicial conduct.",
          },
          {
            year: "16",
            compulsory: 24,
            optional: 10,
            note: "2016 Bar Finals — 34% of paper · Takeover bids & mandatory authority to proceed.",
          },
          {
            year: "17",
            compulsory: 22,
            optional: 12,
            note: "2017 Bar Finals — 34% of paper · Small, intermediate, and large merger thresholds.",
          },
          {
            year: "18",
            compulsory: 26,
            optional: 10,
            note: "2018 Bar Finals — 36% of paper · Scheme of Arrangement under Federal High Court supervision.",
          },
          {
            year: "19",
            compulsory: 24,
            optional: 12,
            note: "2019 Bar Finals — 36% of paper · FCCPC competition review replacing SEC merger control.",
          },
          {
            year: "20",
            compulsory: 28,
            optional: 10,
            note: "2020 Bar Finals — 38% of paper · Derivative actions under s. 346 CAMA 2020.",
          },
          {
            year: "21",
            compulsory: 26,
            optional: 12,
            note: "2021 Bar Finals — 38% of paper · Netting & insolvency set-off provisions.",
          },
          {
            year: "22",
            compulsory: 30,
            optional: 10,
            note: "2022 Bar Finals — 40% of paper · Major asset transaction approval under s. 342 CAMA 2020.",
          },
          {
            year: "23",
            compulsory: 28,
            optional: 12,
            note: "2023 Bar Finals — 40% of paper · Winding up for inability to pay debts (₦200,000 threshold).",
          },
          {
            year: "24",
            compulsory: 32,
            optional: 10,
            note: "2024 Bar Finals — 42% of paper · Moratorium on creditors during Arrangement & Compromise (s. 717).",
          },
          {
            year: "25",
            compulsory: 30,
            optional: 12,
            note: "2025 Bar Finals — 42% of paper · Foreign participation (NIPC, NOTAP, Immigration permits).",
          },
        ],
      },
    ],
  },
  {
    id: "property",
    label: "Property Law",
    totalSittings: "22 sittings · 2010–2025",
    topics: [
      {
        rank: "01",
        name: "Deeds of Assignment, Perfection & Governor's Consent",
        authority:
          "Land Use Act 1978 s. 22 · Savannah Bank v. Ajilo · Ibrahim v. Obaje",
        sittingsCount: 20,
        totalSittingsCount: 22,
        compulsoryCount: 16,
        sharePercent: 91,
        bars: [
          {
            year: "14",
            compulsory: 28,
            optional: 10,
            note: "2014 Bar Finals — 38% of paper · Operative parts of a Deed of Assignment.",
          },
          {
            year: "15",
            compulsory: 30,
            optional: 10,
            note: "2015 Bar Finals — 40% of paper · Triad of perfection: Consent, Stamping, Registration.",
          },
          {
            year: "16",
            compulsory: 26,
            optional: 12,
            note: "2016 Bar Finals — 38% of paper · Receipt clause & covenant for title.",
          },
          {
            year: "17",
            compulsory: 32,
            optional: 10,
            note: "2017 Bar Finals — 42% of paper · Illiterate jurat & Franking requirements.",
          },
          {
            year: "18",
            compulsory: 30,
            optional: 12,
            note: "2018 Bar Finals — 42% of paper · Execution by corporate bodies & attorneys.",
          },
          {
            year: "19",
            compulsory: 32,
            optional: 10,
            note: "2019 Bar Finals — 42% of paper · Lagos Land Registration Law 2015 vs. PCL states.",
          },
          {
            year: "20",
            compulsory: 34,
            optional: 10,
            note: "2020 Bar Finals — 44% of paper · Ibrahim v. Obaje exception to Governor's Consent.",
          },
          {
            year: "21",
            compulsory: 32,
            optional: 12,
            note: "2021 Bar Finals — 44% of paper · Contract of Sale vs. Formal Deed of Assignment.",
          },
          {
            year: "22",
            compulsory: 35,
            optional: 10,
            note: "2022 Bar Finals — 45% of paper · Capital Gains Tax, Stamp Duties & Registration Fees.",
          },
          {
            year: "23",
            compulsory: 34,
            optional: 12,
            note: "2023 Bar Finals — 46% of paper · Power of Attorney coupled with interest.",
          },
          {
            year: "24",
            compulsory: 36,
            optional: 10,
            note: "2024 Bar Finals — 46% of paper · Drafting the Testatum, Habendum & Execution blocks.",
          },
          {
            year: "25",
            compulsory: 35,
            optional: 12,
            note: "2025 Bar Finals — 47% of paper · Priority of competing instruments.",
          },
        ],
      },
      {
        rank: "02",
        name: "Mortgages, Leases & Administration of Estates",
        authority: "MPL Lagos 2010 · PCL 1959 · Wills Law Lagos s. 4 & s. 7",
        sittingsCount: 19,
        totalSittingsCount: 22,
        compulsoryCount: 14,
        sharePercent: 86,
        bars: [
          {
            year: "14",
            compulsory: 24,
            optional: 10,
            note: "2014 Bar Finals — 34% of paper · Creation of legal mortgages across CA, PCL, and Lagos.",
          },
          {
            year: "15",
            compulsory: 26,
            optional: 10,
            note: "2015 Bar Finals — 36% of paper · Mortgagee's power of sale (Payne v. Cardiff RDC).",
          },
          {
            year: "16",
            compulsory: 24,
            optional: 12,
            note: "2016 Bar Finals — 36% of paper · Essential validity of a Lease (Lace v. Chantler).",
          },
          {
            year: "17",
            compulsory: 28,
            optional: 10,
            note: "2017 Bar Finals — 38% of paper · Covenants in a lease: user, rent review, assignment.",
          },
          {
            year: "18",
            compulsory: 26,
            optional: 12,
            note: "2018 Bar Finals — 38% of paper · Attestation of Wills & gifts to attesting witnesses.",
          },
          {
            year: "19",
            compulsory: 28,
            optional: 12,
            note: "2019 Bar Finals — 40% of paper · Probate vs. Letters of Administration with Will annexed.",
          },
          {
            year: "20",
            compulsory: 30,
            optional: 10,
            note: "2020 Bar Finals — 40% of paper · Upstamping of mortgages & debenture trust deeds.",
          },
          {
            year: "21",
            compulsory: 28,
            optional: 12,
            note: "2021 Bar Finals — 40% of paper · Assent by Personal Representatives in Lagos vs. PCL.",
          },
          {
            year: "22",
            compulsory: 30,
            optional: 12,
            note: "2022 Bar Finals — 42% of paper · Customary restrictions on testamentary freedom (Idehen v. Idehen).",
          },
          {
            year: "23",
            compulsory: 32,
            optional: 10,
            note: "2023 Bar Finals — 42% of paper · Drafting Codicils & Revocation clauses.",
          },
          {
            year: "24",
            compulsory: 30,
            optional: 14,
            note: "2024 Bar Finals — 44% of paper · Rent clause, Reddendum & Proviso for re-entry.",
          },
          {
            year: "25",
            compulsory: 32,
            optional: 12,
            note: "2025 Bar Finals — 44% of paper · Caveat & Citation in contentious probate.",
          },
        ],
      },
    ],
  },
  {
    id: "ethics",
    label: "Professional Ethics",
    totalSittings: "22 sittings · 2010–2025",
    topics: [
      {
        rank: "01",
        name: "Duties to Client, Court & Rules of Professional Conduct",
        authority: "RPC 2023 Rules 14–38 · Legal Practitioners Act · NBA v. Ganiyu",
        sittingsCount: 21,
        totalSittingsCount: 22,
        compulsoryCount: 17,
        sharePercent: 95,
        bars: [
          {
            year: "14",
            compulsory: 30,
            optional: 10,
            note: "2014 Bar Finals — 40% of paper · Conflict of interest & fiduciary duty with client funds.",
          },
          {
            year: "15",
            compulsory: 28,
            optional: 12,
            note: "2015 Bar Finals — 40% of paper · Privilege & statutory exceptions under s. 192 Evidence Act.",
          },
          {
            year: "16",
            compulsory: 32,
            optional: 10,
            note: "2016 Bar Finals — 42% of paper · Improper attraction of business & touting (Rule 39).",
          },
          {
            year: "17",
            compulsory: 30,
            optional: 12,
            note: "2017 Bar Finals — 42% of paper · Duty of counsel in murder defence (Rule 24 & 37).",
          },
          {
            year: "18",
            compulsory: 34,
            optional: 10,
            note: "2018 Bar Finals — 44% of paper · Mandatory NBA Stamp & Seal under Rule 10.",
          },
          {
            year: "19",
            compulsory: 32,
            optional: 12,
            note: "2019 Bar Finals — 44% of paper · Contempt of court: in facie curiae vs. ex facie curiae.",
          },
          {
            year: "20",
            compulsory: 34,
            optional: 12,
            note: "2020 Bar Finals — 46% of paper · LPDC disciplinary jurisdiction & directions under LPA s. 11.",
          },
          {
            year: "21",
            compulsory: 36,
            optional: 10,
            note: "2021 Bar Finals — 46% of paper · Contingent fee agreements & champerty (Rule 50).",
          },
          {
            year: "22",
            compulsory: 34,
            optional: 12,
            note: "2022 Bar Finals — 46% of paper · Recovery of professional charges: 30-day Bill of Charges.",
          },
          {
            year: "23",
            compulsory: 36,
            optional: 12,
            note: "2023 Bar Finals — 48% of paper · RPC 2023 Anti-Money Laundering obligations (Chapter 2).",
          },
          {
            year: "24",
            compulsory: 38,
            optional: 10,
            note: "2024 Bar Finals — 48% of paper · Client Account vs. Office Account book-keeping.",
          },
          {
            year: "25",
            compulsory: 36,
            optional: 12,
            note: "2025 Bar Finals — 48% of paper · Appeal from LPDC directly to the Supreme Court.",
          },
        ],
      },
    ],
  },
];

export default function TelemetryGraphSection() {
  const [selectedCourseId, setSelectedCourseId] = useState<string>("civil");
  const [selectedTopicIndex, setSelectedTopicIndex] = useState<number>(0);
  const [selectedBarIndex, setSelectedBarIndex] = useState<number>(10); // 2024 sitting default

  const sectionRef = useRef<HTMLElement | null>(null);
  const chartPlotRef = useRef<HTMLDivElement | null>(null);
  const freqListRef = useRef<HTMLDivElement | null>(null);
  const sittingsCounterRef = useRef<HTMLSpanElement | null>(null);
  const readoutRef = useRef<HTMLParagraphElement | null>(null);

  const activeCourse =
    COURSE_DRILLDOWNS.find((c) => c.id === selectedCourseId) ??
    COURSE_DRILLDOWNS[0];
  const activeTopic =
    activeCourse.topics[selectedTopicIndex] ?? activeCourse.topics[0];
  const activeBar =
    activeTopic.bars[selectedBarIndex] ??
    activeTopic.bars[activeTopic.bars.length - 1];

  const handleCourseChange = (courseId: string) => {
    setSelectedCourseId(courseId);
    setSelectedTopicIndex(0);
    setSelectedBarIndex(10);
  };

  const handleTopicChange = (idx: number) => {
    setSelectedTopicIndex(idx);
    setSelectedBarIndex(10);
  };

  // 1. GSAP Column Chart Loading Animation (fires on scroll entry AND on course/topic panel switch)
  useGSAP(
    () => {
      if (!chartPlotRef.current) return;

      const ticks = chartPlotRef.current.querySelectorAll(".topic-chart-tick");
      const compBars =
        chartPlotRef.current.querySelectorAll<HTMLElement>("i.is-compulsory");
      const optBars =
        chartPlotRef.current.querySelectorAll<HTMLElement>("i.is-optional");
      const valBadges =
        chartPlotRef.current.querySelectorAll<HTMLElement>(".topic-chart-value");

      const tl = gsap.timeline({
        defaults: { overwrite: "auto" },
        scrollTrigger: {
          trigger: chartPlotRef.current,
          start: "top 86%",
          toggleActions: "play none none none",
        },
      });

      // Scale grid hairlines sweep in from left
      tl.fromTo(
        ticks,
        { scaleX: 0, transformOrigin: "left center" },
        {
          scaleX: 1,
          duration: 0.42,
          stagger: 0.04,
          ease: "power2.out",
        },
        0
      );

      // Compulsory gold bars load upward from 0 with staggered wave
      tl.fromTo(
        compBars,
        { scaleY: 0, transformOrigin: "bottom center" },
        {
          scaleY: 1,
          duration: 0.78,
          stagger: 0.042,
          ease: "power3.out",
        },
        0.05
      );

      // Optional grey bars stack onto the compulsory bars
      tl.fromTo(
        optBars,
        { scaleY: 0, transformOrigin: "bottom center" },
        {
          scaleY: 1,
          duration: 0.68,
          stagger: 0.042,
          ease: "power3.out",
        },
        0.16
      );

      // Value percentage badges count up dynamically
      valBadges.forEach((badge, idx) => {
        const targetTotal = Number(badge.dataset.targetVal ?? 0);
        const counter = { val: 0 };
        gsap.to(counter, {
          val: targetTotal,
          duration: 0.82,
          delay: 0.08 + idx * 0.042,
          ease: "power3.out",
          overwrite: "auto",
          scrollTrigger: {
            trigger: chartPlotRef.current,
            start: "top 86%",
            toggleActions: "play none none none",
          },
          onUpdate: () => {
            badge.textContent = `${Math.round(counter.val)}%`;
          },
        });
      });

      // Header sittings counter rolls up
      if (sittingsCounterRef.current) {
        const headerCounter = {
          sittings: 0,
          comp: 0,
        };
        gsap.to(headerCounter, {
          sittings: activeTopic.sittingsCount,
          comp: activeTopic.compulsoryCount,
          duration: 0.85,
          ease: "power3.out",
          overwrite: "auto",
          scrollTrigger: {
            trigger: chartPlotRef.current,
            start: "top 86%",
            toggleActions: "play none none none",
          },
          onUpdate: () => {
            if (sittingsCounterRef.current) {
              sittingsCounterRef.current.textContent = `${Math.round(
                headerCounter.sittings
              )} / ${activeTopic.totalSittingsCount} sittings (${Math.round(
                headerCounter.comp
              )} compulsory)`;
            }
          },
        });
      }

      // Readout line subtle slide-in
      if (readoutRef.current) {
        gsap.fromTo(
          readoutRef.current,
          { opacity: 0, y: 6 },
          {
            opacity: 1,
            y: 0,
            duration: 0.4,
            ease: "power2.out",
            delay: 0.22,
            scrollTrigger: {
              trigger: chartPlotRef.current,
              start: "top 86%",
              toggleActions: "play none none none",
            },
          }
        );
      }
    },
    {
      scope: sectionRef,
      dependencies: [selectedCourseId, selectedTopicIndex],
    }
  );

  // 2. GSAP Ranked Topic Frequency Rows Animation (fires on scroll entry AND on course tab switch)
  useGSAP(
    () => {
      if (!freqListRef.current) return;

      const rows =
        freqListRef.current.querySelectorAll<HTMLElement>(".home-frequency-row");
      const fills = freqListRef.current.querySelectorAll<HTMLElement>(
        ".home-frequency-fill"
      );
      const counts = freqListRef.current.querySelectorAll<HTMLElement>(
        ".home-frequency-value"
      );

      gsap.fromTo(
        rows,
        { opacity: 0, y: 10 },
        {
          opacity: 1,
          y: 0,
          duration: 0.48,
          stagger: 0.065,
          ease: "power3.out",
          overwrite: "auto",
          scrollTrigger: {
            trigger: freqListRef.current,
            start: "top 86%",
            toggleActions: "play none none none",
          },
        }
      );

      gsap.fromTo(
        fills,
        { scaleX: 0, transformOrigin: "left center" },
        {
          scaleX: 1,
          duration: 0.9,
          stagger: 0.08,
          ease: "power3.out",
          overwrite: "auto",
          scrollTrigger: {
            trigger: freqListRef.current,
            start: "top 86%",
            toggleActions: "play none none none",
          },
        }
      );

      counts.forEach((countEl, idx) => {
        const targetSittings = Number(countEl.dataset.targetCount ?? 0);
        const totalSittings = Number(countEl.dataset.totalCount ?? 22);
        const counter = { val: 0 };
        gsap.to(counter, {
          val: targetSittings,
          duration: 0.9,
          delay: idx * 0.08,
          ease: "power3.out",
          overwrite: "auto",
          scrollTrigger: {
            trigger: freqListRef.current,
            start: "top 86%",
            toggleActions: "play none none none",
          },
          onUpdate: () => {
            countEl.textContent = `${Math.round(counter.val)}/${totalSittings}`;
          },
        });
      });
    },
    { scope: sectionRef, dependencies: [selectedCourseId] }
  );

  return (
    <section
      ref={sectionRef}
      id="telemetry"
      aria-labelledby="topic-drills-title"
      className="w-full bg-[var(--lt-page)] pt-10 md:pt-14"
    >
      <div className="mx-auto max-w-[1640px] px-0 md:px-8 lg:px-14">
        {/* TOP FRAME: Topic Drilldown Leader + Engraved Chessboard Mate Stage */}
        <div className="lt-leader-grid border-x border-[var(--lt-line)]">
          <div className="lt-leader-copy">
            <p className="lt-kicker">Topic Drilldown</p>
            <h2
              id="topic-drills-title"
              className="lt-headline text-[clamp(2rem,3.4vw,3.35rem)] max-w-[18ch] mb-4"
            >
              <span className="hl-lead">Find the rule.</span>{" "}
              <em>Follow the variation.</em>
            </h2>

            <p className="text-[16px] leading-[1.56] text-[var(--lt-muted)] max-w-[52ch] mb-6">
              Trace one legal point through the governing authority, the
              variation that changes the answer, and every past-paper sitting
              from 2010 to 2025 that put it under pressure.
            </p>

            <div className="lt-availability mb-7">
              <span>Coverage</span>
              <strong>Every sitting, 2010 to 2025</strong>
              <p>
                Topics ranked by how often the Bar Finals have set them,
                separating compulsory questions from optional questions.
              </p>
            </div>

            {/* Course Switcher on a Single Hairline */}
            <div
              role="tablist"
              aria-label="Select course corpus"
              className="lt-tab-row !gap-x-6 !gap-y-2"
            >
              {COURSE_DRILLDOWNS.map((course) => {
                const isSelected = course.id === activeCourse.id;
                const shortLabel =
                  course.id === "civil"
                    ? "Civil Litigation"
                    : course.id === "criminal"
                    ? "Criminal Litigation"
                    : course.id === "corporate"
                    ? "Corporate"
                    : course.id === "property"
                    ? "Property"
                    : "Ethics";
                return (
                  <button
                    key={course.id}
                    type="button"
                    role="tab"
                    aria-selected={isSelected}
                    onClick={() => handleCourseChange(course.id)}
                    className={`lt-tab-btn ${isSelected ? "is-active" : ""}`}
                  >
                    {shortLabel}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Panel: Authentic Engraved Chessboard Stage (Scholar's Mate in Light, Fool's Mate in Dark) */}
          <div className="lt-picture-panel">
            <div key={selectedCourseId} className="home-chess-stage">
              {/* Light: White mates in four (Scholar's Mate: 1.e4 e5 2.Bc4 Nc6 3.Qh5 d6 4.Qxf7#) */}
              <div
                className="home-chess-board is-light"
                role="img"
                aria-label="An engraved chessboard: white has mated in four, the queen taking on f7 with the bishop on c4 behind her"
              >
                <div className="home-chess-marks" aria-hidden="true">
                  <div className="home-chess-grid">
                    <span
                      className="home-chess-mark is-from"
                      style={
                        { gridArea: "4 / 8", "--i": 0 } as React.CSSProperties
                      }
                    />
                    <span
                      className="home-chess-mark is-path"
                      style={
                        { gridArea: "3 / 7", "--i": 1 } as React.CSSProperties
                      }
                    />
                    <span
                      className="home-chess-mark is-to"
                      style={
                        { gridArea: "2 / 6", "--i": 2 } as React.CSSProperties
                      }
                    />
                    <span
                      className="home-chess-mark is-line"
                      style={
                        { gridArea: "5 / 3", "--i": 3 } as React.CSSProperties
                      }
                    />
                    <span
                      className="home-chess-mark is-line"
                      style={
                        { gridArea: "4 / 4", "--i": 4 } as React.CSSProperties
                      }
                    />
                    <span
                      className="home-chess-mark is-line"
                      style={
                        { gridArea: "3 / 5", "--i": 5 } as React.CSSProperties
                      }
                    />
                    <span
                      className="home-chess-mark is-king"
                      style={
                        { gridArea: "1 / 5", "--i": 6 } as React.CSSProperties
                      }
                    />
                  </div>
                </div>
                <span className="home-chess-plate" />
              </div>

              {/* Dark: Black mates in two (Fool's Mate: 1.f3 e5 2.g4 Qh4#) */}
              <div
                className="home-chess-board is-dark"
                role="img"
                aria-label="An engraved chessboard seen from black's side: black has mated in two, the queen on h4 checking the king on e1"
              >
                <div className="home-chess-marks" aria-hidden="true">
                  <div className="home-chess-grid">
                    <span
                      className="home-chess-mark is-from"
                      style={
                        { gridArea: "8 / 5", "--i": 0 } as React.CSSProperties
                      }
                    />
                    <span
                      className="home-chess-mark is-path"
                      style={
                        { gridArea: "7 / 4", "--i": 1 } as React.CSSProperties
                      }
                    />
                    <span
                      className="home-chess-mark is-path"
                      style={
                        { gridArea: "6 / 3", "--i": 2 } as React.CSSProperties
                      }
                    />
                    <span
                      className="home-chess-mark is-path"
                      style={
                        { gridArea: "5 / 2", "--i": 3 } as React.CSSProperties
                      }
                    />
                    <span
                      className="home-chess-mark is-to"
                      style={
                        { gridArea: "4 / 1", "--i": 4 } as React.CSSProperties
                      }
                    />
                    <span
                      className="home-chess-mark is-line"
                      style={
                        { gridArea: "3 / 2", "--i": 5 } as React.CSSProperties
                      }
                    />
                    <span
                      className="home-chess-mark is-line"
                      style={
                        { gridArea: "2 / 3", "--i": 6 } as React.CSSProperties
                      }
                    />
                    <span
                      className="home-chess-mark is-king"
                      style={
                        { gridArea: "1 / 4", "--i": 7 } as React.CSSProperties
                      }
                    />
                  </div>
                </div>
                <span className="home-chess-plate" />
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM FRAME: The Topic's Column Graph (.topic-chart) + Topic Frequency Map (.home-frequency-chart) */}
        <div className="bg-[var(--lt-line)] border-x border-b border-[var(--lt-line)] grid grid-cols-1 lg:grid-cols-12 gap-[1px]">
          {/* Left 7 Columns: The Topic's Graph (Principle 13: Square-ended columns on a plain scale) */}
          <div className="lg:col-span-7 bg-[var(--lt-surface)] p-6 md:p-10">
            <div className="mb-5 flex flex-wrap items-baseline justify-between gap-2">
              <div>
                <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--lt-gold)]">
                  Selected Topic History · {activeCourse.label}
                </span>
                <h3 className="font-display text-[20px] font-medium tracking-[-0.02em] text-[var(--lt-ink)] mt-1">
                  {activeTopic.name}
                </h3>
              </div>
              <span
                ref={sittingsCounterRef}
                className="font-mono text-[10.5px] text-[var(--lt-muted)] tabular-nums"
              >
                {activeTopic.sittingsCount} / {activeTopic.totalSittingsCount}{" "}
                sittings ({activeTopic.compulsoryCount} compulsory)
              </span>
            </div>

            <figure className="topic-chart">
              <figcaption>
                <span className="topic-chart-title">
                  Share of paper marks across sittings (2014–2025)
                </span>
                <span className="topic-chart-key">
                  <span>
                    <i className="is-compulsory" aria-hidden="true" />
                    Compulsory question
                  </span>
                  <span>
                    <i className="is-optional" aria-hidden="true" />
                    Optional question
                  </span>
                </span>
              </figcaption>

              <div ref={chartPlotRef} className="topic-chart-plot">
                <div className="topic-chart-grid" aria-hidden="true">
                  <span
                    className="topic-chart-tick"
                    style={{ bottom: "0%" }}
                  >
                    <b>0%</b>
                  </span>
                  <span
                    className="topic-chart-tick"
                    style={{ bottom: "33.3%" }}
                  >
                    <b>20%</b>
                  </span>
                  <span
                    className="topic-chart-tick"
                    style={{ bottom: "66.6%" }}
                  >
                    <b>40%</b>
                  </span>
                  <span
                    className="topic-chart-tick"
                    style={{ bottom: "100%" }}
                  >
                    <b>60%</b>
                  </span>
                </div>

                <ol className="topic-chart-cols">
                  {activeTopic.bars.map((bar, idx) => {
                    const total = bar.compulsory + bar.optional;
                    const optHeightPx = Math.round((bar.optional / 60) * 196);
                    const compHeightPx = Math.round(
                      (bar.compulsory / 60) * 196
                    );
                    const isActive = idx === selectedBarIndex;
                    return (
                      <li
                        key={`${activeCourse.id}-${activeTopic.rank}-${bar.year}`}
                        className={`topic-chart-col ${
                          isActive ? "is-active" : ""
                        }`}
                      >
                        <button
                          type="button"
                          onClick={() => setSelectedBarIndex(idx)}
                          onMouseEnter={() => setSelectedBarIndex(idx)}
                          className="topic-chart-hit"
                          aria-label={`20${bar.year} sitting: ${total}% total paper weight`}
                        >
                          <span className="topic-chart-bar">
                            <span
                              className="topic-chart-value"
                              data-target-val={total}
                            >
                              {total}%
                            </span>
                            {bar.optional > 0 && (
                              <i
                                className="is-optional"
                                style={{ height: `${optHeightPx}px` }}
                              />
                            )}
                            <i
                              className="is-compulsory"
                              style={{ height: `${compHeightPx}px` }}
                            />
                          </span>
                        </button>
                        <span className="topic-chart-x">&rsquo;{bar.year}</span>
                      </li>
                    );
                  })}
                </ol>
              </div>

              <p
                ref={readoutRef}
                className="topic-chart-readout"
                aria-live="polite"
              >
                {activeBar.note}
              </p>
            </figure>
          </div>

          {/* Right 5 Columns: Ranked Topic Frequency Map (.home-frequency-chart) */}
          <div className="lg:col-span-5 bg-[var(--lt-surface)] p-6 md:p-10 flex flex-col justify-between">
            <div>
              <header className="flex items-baseline justify-between gap-4 mb-5">
                <div className="min-w-0">
                  <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--lt-muted)]">
                    Past-paper corpus
                  </span>
                  <h3 className="font-display text-[18.5px] font-medium tracking-[-0.025em] text-[var(--lt-ink)] mt-1 whitespace-nowrap">
                    Topic frequency by sitting
                  </h3>
                </div>
                <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-[var(--lt-gold)] whitespace-nowrap shrink-0 tabular-nums">
                  {activeCourse.totalSittings}
                </span>
              </header>

              <div ref={freqListRef} role="list" aria-label="Ranked topics">
                {activeCourse.topics.map((topic, idx) => {
                  const isSelected = idx === selectedTopicIndex;
                  return (
                    <button
                      key={`${activeCourse.id}-${topic.rank}`}
                      type="button"
                      onClick={() => handleTopicChange(idx)}
                      className={`home-frequency-row ${
                        isSelected ? "is-active" : ""
                      }`}
                    >
                      <span className="home-frequency-rank">{topic.rank}</span>
                      <span className="home-frequency-topic">
                        <strong>{topic.name}</strong>
                        <small>{topic.authority}</small>
                      </span>
                      <span className="home-frequency-measure">
                        <span
                          className="home-frequency-fill"
                          style={{ width: `${topic.sharePercent}%` }}
                        />
                      </span>
                      <span
                        className="home-frequency-value"
                        data-target-count={topic.sittingsCount}
                        data-total-count={topic.totalSittingsCount}
                      >
                        {topic.sittingsCount}/{topic.totalSittingsCount}
                      </span>
                      <span
                        className="text-[var(--lt-quiet)] flex justify-end"
                        aria-hidden="true"
                      >
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          className="h-3.5 w-3.5"
                        >
                          <path d="M9 6l6 6-6 6" />
                        </svg>
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <p className="mt-6 text-[12px] leading-[1.52] text-[var(--lt-muted)]">
              Select any topic row above or switch courses to load its
              year-by-year compulsory and optional share on the graph.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
