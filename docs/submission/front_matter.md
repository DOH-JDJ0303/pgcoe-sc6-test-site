---
title: Front Matter
nav_order: 1
parent: Submission Guide
layout: page
---

# {{page.title}}
{: .no_toc }

<!-- Table of contents -->
<details open markdown="block">
  <summary>
    Table of contents
  </summary>
  {: .text-delta }
1. TOC
{:toc}
</details>

## Overview
The **front matter** allows authors to define metadata, such as the workflow title, authors, and search terms. As the name implies, this section is located at the "front" (top) of the workflow document. Authors should update the front matter fields described below prior to submission.

## Title & Synposis
The `title` and `synopsis` fields are used to describe the workflow. Both fields should be descriptive but concise. Use `>` to write multi-line statments.
```yaml
title: Are cases related to each other?
synopsis: >
  A step-by-step guide to calculating and interpreting 
  pairwise SNP distances from genomic data to assess 
  whether cases in an outbreak are related.
```

## Search Terms / Categories
Search terms allow users to find workflows based on their scope, data type, and intended application. A list of commonly used search terms and their categories is maintained [here](assets/search_terms.yml). Workflows must include search terms for the target organism(s) and application area(s). Inclusion of additional search terms is optional. Common search terms should be used when possible.

**Example:**
```yaml
--- 
category:
  organism:
    - bacteria
  application:
    - surveillance
    - outbreak investigation
--- 
``` 

## Author Information
Author information should be provided for all individuals who contributed significantly to a workflow. At least one author must be listed for correspondence.

**Example:**
```yaml 
--- 
author:
  - name: Nora Jones
    affiliation: The Academy
    title: Molecular Epidemiologist
    email: nora.jones@mail.com
    corresponding: true
--- 
```