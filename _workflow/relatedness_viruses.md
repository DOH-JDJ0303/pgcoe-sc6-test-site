---
title: "Are these viruses related?"
layout: page

# Owner
owner: harry-james-potter

# Categories
organism:
  - viruses
activity:
  - sample-relatedness

# Overview
purpose: Determine if viral samples are related in the context of a public-health outbreak investigation.
limitations:
  - None
inputs:
  - Whole-genome sequence data (FASTQ)
  - Reference genome per species/subtype (FASTA)
criteria:
  - Reads cover > 90 % of reference at > 20× depth

# Workflow
workflow:
  - wgs_short
  - fastp-qc
---

{% include meta_header.html %}

---

{% include overview_section.html %}

---

{% include workflow_section.html %}
