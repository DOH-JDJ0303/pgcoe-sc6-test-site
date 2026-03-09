---
title: Basic Formatting
nav_order: 2
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
A general overview of how to format documents with markdown can be found [here](https://www.markdownguide.org/basic-syntax/).

---

## Table and Figures

Tables can be created and formatted in R Markdown using the knitr package in R. This resource provides more information on how to create and customize a table. 

Here is example code to generate a table using the built-in iris dataset in R: 

```r
knitr::kable(head(mtcars[, 1:4])) 
```

Figures can be uploaded into R Markdown using the knitr package in R. Here is example code to upload a PNG file: 

```r
knitr::include_graphics(“my_image”.png) 
```

These resources provide guidance on formatting tables and figures in the APA style in addition to example tables and figures. 

---

## Headings and Table of Contents

Use markdown headings to organize your submission into clear, nested sections. The table of contents is generated automatically from your heading structure — no extra formatting required.

First-level headings define the main sections of the document. Second-level headings define subsections within those, and third-level headings break those down further into specific steps or details. First- and second-level headings will appear in the table of contents.

### Heading syntax:
#### Markdown:
<div style="border: 1px solid #ccc; border-radius: 8px; padding: 10px 15px; background-color: #ffffff">
# First-level heading <br>
## Second-level heading <br>
### Third-level heading <br>
</div>
#### Rendered Output:
<div style="border: 1px solid #ccc; border-radius: 8px; padding: 10px 15px; background-color: #ffffff">
<h1> First-level heading </h1>
<h2> Second-level heading </h2>
<h3> Third-level heading </h3>
</div>

### Example using nested headings:
#### Markdown:
<div style="border: 1px solid #ccc; border-radius: 8px; padding: 10px 15px; background-color: #ffffff">
# SNP Distance Analysis <br>
## Purpose and Scope <br>
## Analytical Steps <br>
### Step 1: Align Sequences <br>
### Step 2: Calculate SNP Distances <br>
</div>
#### Rendered Output:
<div style="border: 1px solid #ccc; border-radius: 8px; padding: 10px 15px; background-color: #ffffff">
<h1> SNP Distance Analysis </h1>
<h2> Purpose and Scope </h2>
<h3> Analytical Steps </h3>
<h4> Step 1: Align Sequences </h4>
<h5> Step 2: Calculate SNP Distances </h5>
</div>

---

## Code Blocks 

### Template:

{% highlight markdown %}
**Purpose**: [Brief description of what the code does]
```language
[code here]
```
**Notes**: [Dependencies or important details]
{% endhighlight %}

### Guidelines: 
- Include language identifier (`python`, `bash`, `r`, `yaml`)
- Keep lines under 80 characters
- Use realistic bioinformatics examples
- Note required dependencies

### Examples 

#### Python - Sequence Analysis
{% highlight markdown %}
**Purpose:** Extract QC metrics from FASTA files
```python
from Bio import SeqIO
import pandas as pd
>
def analyze_sequences(fasta_file):
   sequences = []
   for record in SeqIO.parse(fasta_file, "fasta"):
       sequences.append({
           'sample_id': record.id,
           'length': len(record.seq),
           'gc_content': (record.seq.count('G') + record.seq.count('C')) / len(record.seq) * 100
      })
   return pd.DataFrame(sequences)

**Notes:** Requires pip install biopython pandas 
{% endhighlight %}

#### Bash - Assembly Pipeline 

{% highlight markdown %}
**Purpose:** Standard pathogen genome assembly workflow 

````bash 
#!/bin/bash 
SAMPLE_ID=$1 
 
# Quality control and assembly 
fastp -i ${SAMPLE_ID}_R1.fq -I ${SAMPLE_ID}_R2.fq \ 
      -o ${SAMPLE_ID}_clean_R1.fq -O ${SAMPLE_ID}_clean_R2.fq 
 
spades.py -1 ${SAMPLE_ID}_clean_R1.fq -2 ${SAMPLE_ID}_clean_R2.fq \ 
          -o ${SAMPLE_ID}_assembly 
```
**Notes:** Requires fastp and SPAdes in PATH 
{% endhighlight %}

---