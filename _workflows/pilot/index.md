---
title: Are cases related to each other?

date: "2026-02-10"

terms:
  organism:
    - bacteria
  application:
    - surveillance
    - outbreak investigation

authors:
  - name: Pauline Trihn
    affiliation: Washington State Department of Health
    title: Molecular Epidemiologist
    email: coolbeans@gmail.com
  - name: Kim Andrews
    affiliation: University of Washington
    title: Bioinformatician

layout: page
---

{% include workflow_page/header.html %}

## Summary: 
This tutorial provides a step-by-step explanation of how to analyze sequence relatedness for outbreak investigations using genomic data. The goal is to understand transmission chains and whether cases are part of a single outbreak or represent multiple independent introductions. 

We will cover two complementary approaches: 
1. SNP distance analysis
2. Phylogenetic analysis 

**Important**: These two methods provide different but complementary information. SNP distances tell you how many mutations differ between sequences. Phylogenetic trees tell you about shared ancestry and evolutionary relationships - information that SNP distances alone cannot reveal.

## Table of Contents
[Create table of contents linking to each section/subsection below. I think this can be formatted into the github page as a sidebar Table of Contents and not in the main document]

### Prerequisites

This tutorial assumes you have:
- Basic familiarity with command-line tools
- Understanding of sequence alignment and phylogenetics
- Access to high-quality consensus sequences with metadata

### Required Software

To undertake this tutorial, you will need to download the following software packages:

**Alignment tools**: 
- [MAFFT](https://mafft.cbrc.jp/alignment/software/) - multiple sequence alignment
- [snippy](https://github.com/tseemann/snippy) - for bacteria? 
- 
**For SNP distance analysis:**

- [snp-dists](https://github.com/tseemann/snp-dists) - pairwise SNP distance calculator
- Python 3.x with pandas and Xx packages
- R 3.x with Xx packages 

**For phylogenetic analysis:**

- [IQ-TREE](http://www.iqtree.org/) - maximum likelihood phylogenetic inference
- [FigTree](http://tree.bio.ed.ac.uk/software/figtree/) - tree visualization

**Alternative/supplementary tools:**
- [Nextstrain](https://docs.nextstrain.org/en/latest/install.html) - phylogenetic visualization and analysis (optional but recommended)

### Tutorial Data

The example dataset consists of avian influenza h5n1 HA sequences from a mock outbreak investigation plus contextual background sequences.

- For this tutorial: Add context on what it means to focus on a single segment and how there are additional complexities that would need to be addressed with multi-segment

- Consider multi-segment analysis as a natural additional tutorial linked from this one
    - Potential separate tutorial on reassortment analysis
    - Concatenated whole genome tree? concatenated segment tree (not whole genome)? 
    - 

**[The tutorial dataset can be downloaded from here](link-to-data).**

The data includes:
- `outbreak_sequences.fasta` - h5n1 HA consensus sequences from outbreak cases
- `contextual_sequences.fasta` - h5n1 HA contextual sequences from the region
- `metadata.tsv` - collection dates, locations, and epidemiological information
- `reference_genome.fasta` - h5n1 HA reference sequence for alignment (Goose Guangdong?)


### Present an example outbreak scenario: 

---
## Step 0: Assess your organism (is this a segmented virus, is this bacteria) and your data type 
- 12/9/2025 update: we will tentatively be using a data of D1.1 genotype H5N1 HA outbreak sequences from Washington state. 
- what type of data do you have
    - what can that data tell you about your organism
- How does this impact your assessment of relatedness between organisms 
- Consider linking to resources on HGT and reassortment for bacteria and multi-segment trees. 

---
## Step 0.5: Pulling the example outbreak data from NCBI
- Pulling the sequences and metadata from NCBI for out outbreak data of interest
- Checking the QC of this data 
- NCBI QC metrics for what gets accepted into submission

### Quality Control

Before analyzing sequences, verify sequence quality. (Do we need to consider a separate tutorial or section on quality control?) 

**Quality metrics to check:**
- Genome coverage (aim for >95%)
- Number of ambiguous bases (N's)
- Average read depth (for consensus sequences from raw reads)

### Notes: potentially write this QC section at the end and hold off on it? Will need to separate QC sections for bacteria and one for viruses (and fungi???)
---
#### Pseudologic Step 0.5: Downloading data from NCBI 
1. Make sure that you have downloaded and installed NCBI Datasets (provide a link to how to download but the same code for how to check that NCBI Datasets is installed, check version in Terminal)
2. Provide user with list of accession numbers for HA segment only TSV 
    - filter down current accession list to only segment 4 accessions in TSV file (this will contain only accessions) and make this downloadable/available
    - make metadata file identifying outbreak vs. contextual sequences available as a separate metadata file for HA sequences only
    - 2 files in total will need to be linked/downloaded here
4. Show folks how to use NCBI Datasets command to input the accession file to download the sequences and (optional) how to download the metadata file separately. For the purposes of the tutorial we'll use this cleaned metadata file (in step 2). 
    - Output format for sequences: fasta file for the sequences 
    - Output format for metadata: TSV
5. Extract the fasta files from the subfolders to the working tutorial directory 
    - Provide a link to the fasta file dataset
    - Note: Stick with the full dataset for now instead of a subsampled dataset
    - Kim to check if the metadata has QC steps

## Analysis 1: SNP Distance Analysis

### Purpose and Scope

SNP distance analysis provides a quick way to screen for closely related sequences that warrant further investigation. This approach is particularly useful for:
- Initial rapid assessment during active outbreaks
- Large-scale surveillance where you need to flag potential clusters
- Situations where computational resources or time are limited

### What SNP Distances Tell You

**SNP Distance Matrices Show:**
- How many mutations differ between any two sequences
- Which sequences are most similar to each other
- Clustering patterns when many sequences are similar
- Quick screening for potential outbreak relationships

**SNP Distance Matrices DO NOT Show:**
- **Ancestry and evolutionary relationships** 
- Directionality of transmission
- Temporal relationships
- Which mutations are shared vs. unique

### Important Note

**A sample Xx SNPs away from a cluster could be:**
- An ancestor of that cluster (branched off before cluster formed)
- A descendant of that cluster (evolved from within)
- A sibling lineage (shares a common ancestor with cluster)

**→ The SNP matrix cannot distinguish these scenarios! This is why phylogenetic trees are important for complete interpretation.**

### Consider a placeholder caveat one-liner about what to do with bacteria? (at the start of this SNP analysis section)


---

### Step 1: Align Sequences

**For viral genomes using MAFFT:**

```bash

# Align sequences
some code here
```

---

### Step 2: Calculate SNP Distances

```bash
# Calculate pairwise SNP distances
snp-dists aligned_sequences.fasta > snp_distances.tsv
```

---

### Step 3: Interpret SNP Distance Matrix

Open `snp_distances.tsv` and examine the pairwise distances.

**Example SNP distance matrix:**

```
put output here example
```

**What the SNP matrix shows:**
- provide interpretation here of our SNP matrix produced 

SNP distance matrix tells you how genetically similar or different your sequences are to each other. Each number identifies how many single nucleotide differences there are between each pair of sequence. 
- Lower numbers = more closely related 
- Higher numbers = more distantly related. 
---

### Pathogen-Specific Thresholds for Identifying Potential Outbreak Clusters (Do we want a section like this?)

Use published thresholds appropriate for your pathogen:

**Bacterial pathogens:**
- *Salmonella* spp.:
- *E. coli* O157:H7: 
- 
**Viral pathogens:**
- SARS-CoV-2: 
- Influenza A: 
- Measles: 
- West Nile Virus:

**IMPORTANT:** These thresholds are guidelines. Always consider:
- Duration of outbreak (longer = more SNPs expected)
- Pathogen mutation rate and generation time
- Published literature for specific pathogen

---

### Step 4: Visualize SNP Distances Using Heatmaps

Create a heatmap to visualize clustering:

```python
code here for create a heatmap
```

---

### Why consider a phylogenetic analysis in addition to a SNP analysis?

**What the SNP matrix DOES NOT show:**

Is OutlierX related to the outbreak or not? The SNP distances alone cannot answer this.

**Scenario A - OutlierX is an outgroup :**
```
      ┌─ OutlierX (10 SNPs away, branched BEFORE cluster)
──────┤
      └─┬─ Sample1
        ├─ Sample2  
        ├─ Sample3
        └─ Sample4 (longer chain)
```
**Interpretation:** OutlierX is a separate introduction. The four samples are one outbreak.

**Scenario B - OutlierX descended from cluster:**
```
      ┌─ Sample1
──────┼─ Sample2
      ├─ Sample3
      ├─ Sample4
      └─ OutlierX (10 SNPs, but EVOLVED FROM cluster)
```

**→ The SNP matrix will show identical information for both scenarios. You need phylogenetic trees to distinguish them.**

---

## Analysis 2: Phylogenetic Analysis 
[Do we want this workflow example to be Nextstrain based or not use Nextstrain?]

### Purpose and Scope

Phylogenetic trees provide information that SNP distances alone cannot:
- **Evolutionary relationships** beyond simple pairwise distances
- **Shared ancestry** which sequences evolved from common ancestors
- **Temporal context** when sequences have different collection dates
- **Directionality** of transmission (with time-resolved trees)
- **Statistical support** for relationships (bootstrap values)
- **Broader geographic context** by including background sequences (may identify introductions from other geographic regions more easily)

---
### Step 1: Select Background Sequences (and Reference?)

[Include how to pull the contextual and reference data from NCBI here]

**Why background sequences matter:**

Including contextual sequences helps determine:
- Whether your outbreak sequences form a **monophyletic clade** (suggesting single introduction)
- How your sequences relate to broader pathogen diversity
- Geographic or temporal origin of the introduction

**Example selection strategy:**

```
Aim for 20-100 background sequences based on:
- Geographic proximity (same state/region)
- Temporal proximity (within relevant timeframe)
- Genetic similarity 

Balance considerations:
- Size of outbreak (larger outbreaks need more backgrounds)
- Diversity of pathogen (high diversity needs more backgrounds)
- Computational resources (more sequences = longer runtime)
```

**Reference Selection**
(talk about choosing a high quality reference sequence for alignment and consistency across phylogenetic trees?)

---

### Step 2: Sequence Alignment using Reference 


```bash
# Combine outbreak, background, and reference sequences
cat outbreak_sequences.fasta background_sequences.fasta reference_genome.fasta > combined_sequences.fasta

# Align with MAFFT

# Options explained: 


```

**Check alignment quality:**
- View in alignment viewer (Aliview, Jalview, or similar)
- Look for proper start/end alignment
- Check for large blocks of gaps that might be unusual

---

### Step 3: Build Maximum Likelihood Tree 
[Do we want to include bootstrapping nodes here too?]

```bash
# Using IQ-TREE

# Options explained:

```

**Output files:** (with descriptions and links to each file)
- file1
- file2

---

### Step 4: Visualize and Interpret Phylogenetic Tree

#### Using FigTree (or something else?)

[outline steps on how to do this using FigTree or do we want this entire phylogenetic workflow to be Nextstrain based?]

---

### Interpreting Tree Topology


### Time-Resolved Trees Using TreeTime?

---