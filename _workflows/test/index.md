---
title: Question this analysis answers, phrased as a question
date: "2026-09-06"
category:
  organism:
    - virus
  application:
    - surviellance
author:
  - name: Jane Doe
    affiliation: University A
    title: Researcher
    email: jane.doe@gmail.com
    
synopsis: >
  One to two sentence plain-language summary of what 
  this tutorial does and what question it answers.
  
layout: page
back_to_top: true
---

{% include workflow_page/header.html %}

---

## Overview

[2–3 sentences: what problem does this analysis solve, 
and when would someone reach for it? Write for someone 
who is deciding whether this tutorial applies to their 
situation.]


### What you'll learn from this analysis

- [Concrete output or insight #1]
- [Concrete output or insight #2]
- [Concrete output or insight #3]

For what this analysis *can't* tell you, see [Limitations](#Limitations).

---

## Before You Begin

### Software

| Tool | Purpose | Install |
|------|---------|---------|
| [Tool name](link) | What it does | [Download](link) |

### Input Files

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

[One sentence: what you're doing and why it's necessary.]

```bash
# [Brief comment describing what this command does]
command \
  --flag value \
  input > output
```

### [Command] Options Explained *(optional)*

| Flag | Description |
|------|-------------|
| `--flag` | What it does |

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

## Step 2: [short title]

[Repeat Step structure above]

---

## Interpreting Your Results

[Explain how to read the output — what numbers, 
patterns, or structures mean. Use concrete examples 
where possible. This section is for meaning, not mechanics.]

### [Subsection for each major interpretive concept like Visualizations]


---

## Limitations 

### What This Analysis Can't Tell You

[Explain the fundamental limitations of the method. 
Use a concrete scenario — ideally showing two situations 
that produce identical outputs but have different 
epidemiological meanings. This is what justifies the 
next step in the workflow.]

---

## Summary

In this tutorial, you learned how to:

1. Summary of Step 1
2. Summary of Step 2
3. Summary of Step N 

---

## All Tutorial Files

| File | Step | Type | Download |
|------|------|------|----------|
| `input.ext` | Input | [description] | [⬇ Download](link) |
| `step1_output.ext` | Step 1 output | [description] | [⬇ Download](link) |
| `stepN_output.ext` | Step N output | [description] | [⬇ Download](link) |

---

## Next Steps

{% include workflow_page/footer.html %}

**[Continue to [Next Tutorial Title] if applicable](link)**

[Describe any tutorials or links to anything that might be complementary to this one.]
