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

## Tables

Tables can be created in Markdown using pipes ( | ) to separate columns and three or more hyphens to create column headers ( --- ). This [resource](https://www.codecademy.com/resources/docs/markdown/tables) provides more information on creating and formatting tables in Markdown. Here is example code to create a table and the rendered output from the resource:

#### Markdown:
```
| Month    | Savings |
| -------- | ------- |
| January  | $250    |
| February | $80     |
| March    | $420    |
```
#### Rendered Output:
| Month    | Savings |
| -------- | ------- |
| January  | $250    |
| February | $80     |
| March    | $420    |

---

## Figures

Figures can be uploaded into Markdown by modifying the following code to point towards the site-specific assets/ folder: 

#### Markdown:
<div style="border: 1px solid #ccc; border-radius: 8px; padding: 10px 15px; background-color: #ffffff">
![SNP Distance Heatmap](docs/submission/assets/snp_distance_heatmap.png)
</div>

#### Rendered Output:
![SNP Distance Heatmap](docs/submission/assets/snp_distance_heatmap.png)

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
## Analytical Steps <br>
### Step 1: Align Sequences <br>
### Step 2: Calculate SNP Distances <br>
</div>

#### Rendered Output:
<div style="border: 1px solid #ccc; border-radius: 8px; padding: 10px 15px; background-color: #ffffff">
<h1> SNP Distance Analysis </h1>
<h2> Analytical Steps </h2>
<h3> Step 1: Align Sequences </h3>
<h3> Step 2: Calculate SNP Distances </h3>
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
- Include tool versions when relevant
- Explain unique flags in comments or notes (skip common ones like --threads, --cpu)
- Purpose statement should capture high-level workflow goals

### Examples 



#### Python - Sequence Analysis
{% highlight markdown %}
**Purpose:** Extract QC metrics from FASTA files
```python3.12
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


#### MLST & AMR Analysis

{% highlight markdown %}
**Purpose**: Determine sequence type and identify antimicrobial resistance genes
```bash
# Run MLST typing
mlst --scheme ecoli contigs.fasta > mlst_results.txt

# Screen for AMR genes
abricate \
  --db resfinder \
  --minid 80 \
  --mincov 60 \
  contigs.fasta > amr_results.tab
```

### Tool Options Explained

| Flag | Description |
|------|-------------|
| `--scheme ecoli` | Specifies the MLST scheme to use. Available schemes include ecoli, saureus, lmonocytogenes, etc. Use `mlst --list` to see all options. |
| `--db resfinder` | Uses the ResFinder database for AMR gene detection. Other options include CARD (`--db card`) or NCBI (`--db ncbi`). |
| `--minid 80` | Minimum identity threshold (80%). Genes must have at least 80% sequence identity to database entries to be reported. |
| `--mincov 60` | Minimum coverage threshold (60%). At least 60% of the gene length must be covered by the query sequence. |

**Notes**: Requires mlst v2.19+ and abricate v1.0+
{% endhighlight %}
---
