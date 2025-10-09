---
title: "Are these bacteria related?"
layout: page

## Contributor "slug" (first-middle-last) for individual who will maintain the workflow (_contributors/first-middle-last.md)
owner: harry-james-potter

#--------------------------------------#
#  Categories
#--------------------------------------#

## Target organisms (bacteria, viruses, fungi)
organism:
  - bacteria
## Keywords describing workflow activity (sample-relatedness, vaccine-escape, etc.,)
activity:
  - sample-relatedness

#--------------------------------------#
#  Overview
#--------------------------------------#
## Description of the purpose of the workflow
purpose: Determine if bacterial samples are related in the context of a public-health outbreak investigation.

## List of workflow limitations
limitations:
  - Only considers linear evolution (point mutations)
  - Limited discriminatory power for clonal populations

## List of data types required for the workflow
data_inputs:
  - Whole-genome sequence data (FASTQ)
  - Reference genome per species/subtype (FASTA)

## List of inclusion / exclusion criteria for samples / data
data_criteria:
  - Reads should cover > 90 % of reference at > 20× depth

#--------------------------------------#
#  Workflow
#--------------------------------------#
## List of module "slugs" located in _modules/ in order performed.
workflow:
  - fastp
  - shovill
  - gambit
  - mlst
  - ref-select-bact
  - snippy
  - snippy-core
  - snippy-clean_full_aln
  - gubbins
  - snp-dists
  - iqtree
---

{% include meta_header.html %}

---

{% include overview_section.html %}

---

{% include workflow_section.html %}


