---
# FRONT MATTER: metadata block that describes this tutorial/analysis page.
# The static-site generator reads these fields to set the page details (e.g., title, date, etc.,). 
# Fill in each field below per the inline comments.

# The title should be phrased as a question — specifically, the question that
# this analysis/tutorial answers. Keep it concise and human-readable.
title: Question this analysis answers, phrased as a question

# Publication or last-updated date in ISO format (YYYY-MM-DD), in quotes.
# Example: "2026-06-10"
date: "YYYY-MM-DD"

# A plain-language summary (1–2 sentences) describing what the tutorial does
# and the question it answers. The ">" lets the text wrap across multiple
# indented lines; keep all lines indented consistently beneath it.
synopsis: >
  One to two sentence plain-language summary of what 
  this tutorial does and what question it answers.

# Categorization tags. Each sub-field accepts one OR MORE values — add a new
# line starting with "-" for each value you want to include. For consistency,
# prefer terms from the curated list of common options in search_terms.yml;
# use a custom value only if nothing in that list fits.

category:
  organism:
    - [virus | yeast | bacteria]
  application:
    - [surveillance | outbreak investigation]
  
# One or more authors. Duplicate the entire block (name/affiliation/title/email)
# for each additional author, keeping the leading "-" to start a new list item.
author:
  - name: Jane Doe                  # Author's full name
    affiliation: University A       # Institution or organization
    title: Researcher               # Role or job title
    email: jane.doe@mail.com       # Contact email address
---

<!--
  Document body starts here. Delete any template sections you don't use, and make
  sure no placeholder text remains before publishing.
-->

## Overview

<!--
  OVERVIEW: Set the reader's expectations. In 2–3 sentences, state the problem
  this analysis solves and when someone would reach for it. Write for a reader
  who is still deciding whether this tutorial applies to their situation.
-->

### What you'll learn from this analysis

<!--
  Replace each bullet with a concrete, specific output or insight the reader
  will gain (e.g., "Cluster detection: groups of sequences with low pairwise distances suggest potential outbreak clusters").
  Add or remove bullets as needed. Keep the cross-reference to Limitations if
  that section stays; update the anchor if you rename the heading.
-->
- [Concrete output or insight #1]
- [Concrete output or insight #2]
- [Concrete output or insight #3]

For what this analysis *can't* tell you, see [Limitations](#Limitations).

---

## Before You Begin

<!--
  BEFORE YOU BEGIN: List everything that must be in place before Step 1 — the
  required software and the input files.
-->

### Software

<!--
  One row per required tool. Link the tool name to its homepage or docs, and
  link the Install cell to the download / installation instructions. Replace
  the example row and add as many rows as you need.
-->
| Tool | Purpose | Install |
|------|---------|---------|
| [Tool name](link) | What it does | [Download](link) |

### Input Files

<!--
  In one sentence, say where these inputs come from (a prior tutorial, an NCBI
  download, etc.), then list each file in the table.

  HOSTED FILES: Any file you host for download must fit within GitHub's upload
  limit (100 MB). Place hosted files in the "assets" directory and include it 
  with your submission.

  Keep the download callout only if you host sample files; otherwise delete it.
  Replace every (link) placeholder with a URL or a relative path to a file in 
  the assets directory.
-->
[One sentence explaining where these come from — 
prior tutorial, NCBI download, etc.]

| File | Description |
|------|-------------|
| `filename.ext` | What it contains |

> **Want to jump straight in?**
>
> [⬇ Download `input_file_1.ext`](link)
>
> [⬇ Download `input_file_2.ext`](link)

---

## Step 1: [short title]

<!--
  STEP TEMPLATE: Copy this entire "## Step N" block for each step in your
  workflow. Give each step a short, action-oriented title. Lead with one
  sentence on what the reader is doing and why it's necessary, then the
  command, then any optional sub-blocks. Replace the example command, flags,
  and output filenames with your own.
-->
[One sentence: what you're doing and why it's necessary.]

```bash
# [Brief comment describing what this command does]
command \
  --flag value \
  input > output
```

### [Command] Options Explained *(optional)*

<!--
  OPTIONAL: Use this table to explain the flags in the command above. Delete
  the whole sub-block (heading + table) if the command is self-explanatory.
-->
| Flag | Description |
|------|-------------|
| `--flag` | What it does |

<!--
  OPTIONAL CALLOUTS: Keep "Alternative" if there's a meaningfully different
  approach worth noting, and "Quality check" if the reader should inspect the
  output before continuing. Delete whichever doesn't apply. Keep the "Download"
  callout only if you provide a checkpoint file for this step.
-->
> **Alternative** *(optional)*
>
> [Describe an alternative approach and when to use it.]

> **Quality check** *(optional)*
>
> [What to inspect, and what problems to look for.]

> **Want to check your work or skip ahead?**
>
> [⬇ Download `step1_output.ext`](link)

---

## Interpreting Your Results

<!--
  INTERPRETATION: Explain what the outputs *mean*, not how they were produced.
  Cover the numbers, patterns, or structures the reader should look at and what
  they indicate. Add one subsection per major interpretive concept (e.g., a
  specific visualization). Use concrete examples wherever possible.
-->

### [Subsection for each major interpretive concept like Visualizations]


---

## Limitations 

<!--
  LIMITATIONS: State plainly what this method cannot determine. The strongest
  version gives a concrete scenario — ideally two situations that produce
  identical output but mean different things epidemiologically. This is what
  motivates the next step in the workflow.
-->

### What This Analysis Can't Tell You

---

## Summary

<!--
  SUMMARY: Recap the workflow as a short numbered list that mirrors your steps —
  one line per step, each phrased as something the reader now knows how to do.
  Match the number of items to your actual step count.
-->
In this tutorial, you learned how to:

1. Summary of Step 1
2. Summary of Step 2
3. Summary of Step N 

---

## All Tutorial Files

<!--
  Consolidated download table for every file used or produced in the tutorial:
  the inputs and each step's output. Files should be saved to the "assets" 
  and must not exceed 100 MB. Replace the (link) and [description] placeholders, 
  and add or remove rows to match your steps.
-->
| File | Step | Type | Download |
|------|------|------|----------|
| `input.ext` | Input | [description] | [⬇ Download](link) |
| `step1_output.ext` | Step 1 output | [description] | [⬇ Download](link) |
| `stepN_output.ext` | Step N output | [description] | [⬇ Download](link) |

{: .note}
Files exceeding 100 MB are not included

---

## Next Steps

<!--
  NEXT STEPS: Link to the follow-on tutorial (often the one motivated by the
  Limitations section) and any complementary resources. If nothing follows
  this tutorial, delete the section.
-->
**[Continue to [Next Tutorial Title] if applicable](link)**