# Analysis 1: SNP Distance Analysis for Outbreak Investigations

**Tutorial 4: Are Cases Related to Each Other?**

A step-by-step guide to calculating and interpreting pairwise SNP distances from genomic data to assess whether cases in an outbreak are related.

| | |
|---|---|
| **Part of** | Tutorial 4: Are Cases Related to Each Other? |
| **Pathogen** | H5N1 Influenza (HA segment) |
| **Skill level** | Intermediate |
| **Prerequisites** | Complete the [Preliminary Steps](link-to-preliminary-steps) to download the tutorial data |

---

## Table of Contents

- [Overview](#overview)
  - [What SNP Distances Tell You](#what-snp-distances-tell-you)
  - [What SNP Distances Don't Tell You](#what-snp-distances-dont-tell-you)
- [Required Software](#required-software)
- [Input Data](#input-data)
- [Step 1: Align Sequences](#step-1-align-sequences)
  - [MAFFT Options Explained](#mafft-options-explained)
  - [Check Alignment Quality](#check-alignment-quality)
- [Step 2: Calculate SNP Distances](#step-2-calculate-snp-distances)
- [Step 3: Interpret the SNP Distance Matrix](#step-3-interpret-the-snp-distance-matrix)
  - [Reading the Matrix](#reading-the-matrix)
  - [Pathogen-Specific Thresholds](#pathogen-specific-thresholds)
- [Step 4: Visualize SNP Distances with a Heatmap](#step-4-visualize-snp-distances-with-a-heatmap)
- [Limitations: Why You Need Phylogenetic Analysis Too](#limitations-why-you-need-phylogenetic-analysis-too)
- [Summary](#summary)
- [Next Steps](#next-steps)

---

## Overview

During an outbreak investigation, one of the most critical questions genomic epidemiologists face is: **are these cases linked?** Single nucleotide polymorphism (SNP) distance analysis provides a rapid, interpretable way to screen sequences for relatedness by quantifying the number of nucleotide differences between every pair of sequences in your dataset.

This tutorial walks you through aligning sequences, computing a pairwise SNP distance matrix, interpreting the results, and building a heatmap visualization. We use H5N1 avian influenza HA segment sequences from a Washington State outbreak investigation as an example dataset.

> **Note: Single segment analysis**
>
> This tutorial focuses on the **HA segment (segment 4)** of influenza A H5N1. Influenza has 8 genome segments that can reassort independently, meaning different segments may have different evolutionary histories. A comprehensive investigation may want to analyze all segments and assess for reassortment events. We focus on a single segment here for clarity, and cover multi-segment and reassortment approaches in a companion tutorial.

> **Note: SNP distances are only half the picture**
>
> SNP distances tell you *how many* mutations differ between sequences, but they cannot tell you about **ancestry, evolutionary direction, or shared history**. After completing this analysis, we recommend proceeding to the [phylogenetic analysis tutorial (Analysis 2)](#next-steps). Both methods are complementary and are often used together for outbreak investigations.

### What SNP Distances Tell You

A pairwise SNP distance matrix quantifies the number of single nucleotide differences between every pair of sequences in your alignment. This gives you:

- **Rapid relatedness screening**: quickly identify which sequences are most similar
- **Cluster detection**: groups of sequences with low pairwise distances suggest potential outbreak clusters
- **Outlier identification**: sequences with high distances from a cluster may represent independent introductions
- **Surveillance triage**: in large-scale surveillance, flag clusters that warrant deeper investigation

### What SNP Distances Don't Tell You

While powerful for initial screening, SNP distances have some important blind spots:

- **No ancestry information**: you can't tell which sequence came "first" or how they're related in evolutionary terms
- **No directionality**: the matrix is symmetric and tells you nothing about transmission direction
- **No shared vs. unique mutations**: two sequences that are each 5 SNPs from a cluster may have completely different relationships to it (see [Limitations](#limitations-why-you-need-phylogenetic-analysis-too))
- **No temporal signal**: distances don't account for when sequences were collected

---

## Required Software

Make sure you have the following tools installed before starting:

| Tool | Purpose | Install link |
|------|---------|--------------|
| [MAFFT](https://mafft.cbrc.jp/alignment/software/) | Multiple sequence alignment | [Download](https://mafft.cbrc.jp/alignment/software/) |
| [snp-dists](https://github.com/tseemann/snp-dists) | Pairwise SNP distance calculation | [GitHub](https://github.com/tseemann/snp-dists) |
| Python 3.x | Scripting and visualization | [python.org](https://www.python.org/) |
| pandas | Data manipulation (Python package) | `pip install pandas` |
| matplotlib | Plotting (Python package) | `pip install matplotlib` |
| seaborn | Statistical data visualization (Python package) | `pip install seaborn` |

---

## Input Data

This tutorial expects you to have completed the [Preliminary Steps](link-to-preliminary-steps), which walks you through downloading the data from NCBI. You should have the following files in your working directory:

| File | Description |
|------|-------------|
| `sequences_ha.fasta` | H5N1 HA sequences (outbreak + contextual) |
| `metadata_ha.tsv` | Curated metadata with outbreak/contextual designations |

> **Want to jump straight in?** If you'd prefer to skip the download steps, you can grab the input files directly:
>
> [⬇ Download `sequences_ha.fasta`](link-to-sequences-file)
>
> [⬇ Download `metadata_ha.tsv`](link-to-metadata-file)

---

## Step 1: Align Sequences

Before calculating SNP distances, all sequences must be aligned to a common coordinate system. We use [MAFFT](https://mafft.cbrc.jp/alignment/software/) for multiple sequence alignment, which works well for viral genomes.

If you followed the [Preliminary Steps](link-to-preliminary-steps), you should already have all your sequences in a single file called `sequences_ha.fasta`. If you have outbreak and contextual sequences in separate files, combine them first:

```bash
# Combine outbreak and contextual sequences into one file
cat outbreak_sequences.fasta contextual_sequences.fasta > sequences_ha.fasta

# Verify the number of sequences
grep -c "^>" sequences_ha.fasta
```

Now run the alignment with MAFFT:

```bash
# Align sequences with MAFFT
mafft \
  --auto \
  --thread 4 \
  --reorder \
  sequences_ha.fasta > aligned_sequences.fasta
```

### MAFFT Options Explained

| Flag | Description |
|------|-------------|
| `--auto` | Automatically selects the best alignment strategy based on dataset size. For small datasets (fewer than 200 sequences), MAFFT uses the more accurate L-INS-i algorithm. For larger datasets it switches to faster heuristics. |
| `--thread 4` | Use 4 CPU threads for parallel processing. Adjust based on your machine's available cores. |
| `--reorder` | Reorder output sequences to group similar sequences together, which can make downstream visual inspection easier. |

> **Alternative: Reference-based alignment**
>
> For outbreak investigations where you have a known reference, you may prefer a reference-based alignment. This ensures consistent coordinates across analyses and is especially useful when comparing results across different runs. You can do this with MAFFT using the `--addfragments` option or with tools like `minimap2` + `gofasta`. We cover reference-based alignment in more detail in the phylogenetic analysis tutorial.

### Check Alignment Quality

Before proceeding, visually inspect your alignment in a viewer such as [AliView](https://ormbunkar.se/aliview/) or [Jalview](https://www.jalview.org/). Things to look for:

- **Proper start/end alignment**: sequences should begin and end at consistent positions
- **Large insertions or gaps**: unexpected large gap blocks may indicate assembly artifacts or sequences from a different subtype
- **Excessive ambiguous bases (Ns)**: sequences with high N content will inflate SNP distances and should be flagged or removed
- **Sequence length consistency**: outlier lengths may indicate truncated or chimeric sequences

A quick command-line check for sequence lengths and N content:

```bash
# Quick stats: sequence lengths and N counts
awk '/^>/{if(name)print name, len, n_count; name=$0; len=0; n_count=0; next}
     {len+=length($0); n_count+=gsub(/[Nn]/,"&",$0)}
     END{print name, len, n_count}' aligned_sequences.fasta | \
  column -t
```

> **Quality filtering:**
>
> Consider removing or flagging sequences with less than 95% genome coverage or an unusually high proportion of ambiguous bases. These can artificially inflate SNP distances and produce misleading results. NCBI submissions generally pass basic QC, but it is always worth checking.

**Step 1 output file:**

> **Want to check your work or skip ahead?** Download the expected alignment output:
>
> [⬇ Download `aligned_sequences.fasta`](link-to-aligned-file)

---

## Step 2: Calculate SNP Distances

With your aligned sequences ready, use [snp-dists](https://github.com/tseemann/snp-dists) to generate a pairwise SNP distance matrix. This tool takes a multi-FASTA alignment and computes the number of nucleotide differences between every pair of sequences.

```bash
# Calculate pairwise SNP distances from the alignment
snp-dists aligned_sequences.fasta > snp_distances.tsv

# Preview the output
head -5 snp_distances.tsv | column -t
```

`snp-dists` counts only differences at positions where both sequences have an unambiguous base call (A, T, G, or C). Positions where either sequence has an N or gap character are ignored, which prevents low-quality regions from inflating distances.

> **Output format:**
>
> The output is a tab-separated matrix where rows and columns are sequence names, and each cell contains the integer count of SNP differences between that pair. The diagonal is always 0 (a sequence compared to itself), and the matrix is symmetric.

**Step 2 output file:**

> **Want to check your work or skip ahead?** Download the expected SNP distance matrix:
>
> [⬇ Download `snp_distances.tsv`](link-to-snp-distances-file)

---

## Step 3: Interpret the SNP Distance Matrix

### Reading the Matrix

Open `snp_distances.tsv` and examine the pairwise distances. Here is an example of what a SNP distance matrix might look like for a set of H5N1 HA sequences from an outbreak investigation:

| | Farm_A_01 | Farm_A_02 | Farm_B_01 | Farm_C_01 | Wild_Bird_01 | Context_OR |
|---|---|---|---|---|---|---|
| **Farm_A_01** | 0 | 1 | 2 | 3 | 8 | 22 |
| **Farm_A_02** | 1 | 0 | 2 | 3 | 9 | 23 |
| **Farm_B_01** | 2 | 2 | 0 | 3 | 7 | 21 |
| **Farm_C_01** | 3 | 3 | 3 | 0 | 9 | 24 |
| **Wild_Bird_01** | 8 | 9 | 7 | 9 | 0 | 18 |
| **Context_OR** | 22 | 23 | 21 | 24 | 18 | 0 |

**Interpreting this example:**

The SNP distance matrix tells you how genetically similar or different your sequences are to each other. Each number represents the count of single nucleotide differences between a pair of sequences. Lower numbers mean more closely related sequences, and higher numbers mean more distantly related sequences.

- **Low distances (0 to 3 SNPs):** Farm_A_01, Farm_A_02, Farm_B_01, and Farm_C_01 form a tight cluster with only 1 to 3 SNP differences, which is consistent with a linked outbreak.
- **Moderate distance (7 to 9 SNPs):** Wild_Bird_01 is somewhat more distant from the farm cluster. This could represent a related but distinct introduction, or an earlier lineage. The SNP matrix alone *cannot distinguish these possibilities*.
- **High distance (18 to 24 SNPs):** Context_OR (an Oregon contextual sequence) is clearly distinct from all outbreak sequences, representing an unrelated lineage.

### Pathogen-Specific Thresholds

Published literature provides rough SNP thresholds for identifying potential outbreak clusters across different pathogens. These are guidelines, not hard cutoffs, and should always be interpreted in context.

> **Use thresholds with caution:**
>
> Thresholds depend heavily on the duration of the outbreak (longer outbreaks accumulate more mutations), the mutation rate and generation time of the pathogen, sequencing quality and coverage, and the specific genomic region analyzed. Always consult the relevant literature for your pathogen and context.

| Pathogen | Suggested Threshold | Notes |
|----------|-------------------|-------|
| SARS-CoV-2 | 2 or fewer SNPs (whole genome) | Roughly 2 substitutions per month; adjust for outbreak duration |
| Influenza A (HA) | 3 to 5 SNPs (segment) | Higher mutation rate; consider segment-specific rates |
| *Salmonella* spp. | 5 to 10 SNPs (whole genome) | Varies by serovar; cgMLST may be preferred |
| *E. coli* O157:H7 | 5 or fewer SNPs (whole genome) | Clonal outbreaks typically very tight |
| Measles | 0 to 2 SNPs (N-450) | Genotyping region; limited diversity within genotypes |
| *M. tuberculosis* | 5 to 12 SNPs (whole genome) | Slow mutation rate; recent transmission typically fewer than 5 |

> **A note on bacterial pathogens:**
>
> For bacterial pathogens, SNP analysis typically uses whole-genome alignments against a reference, often generated with tools like [Snippy](https://github.com/tseemann/snippy) rather than MAFFT. Bacterial genomes also present additional complexity from horizontal gene transfer (HGT) and recombination, which can confound SNP-based relatedness assessments. Consider masking recombinant regions with tools like [ClonalFrameML](https://github.com/xavierdidelot/ClonalFrameML) or [Gubbins](https://sanger-pathogens.github.io/gubbins/) before computing distances.

---

## Step 4: Visualize SNP Distances with a Heatmap

A heatmap provides an intuitive visual summary of the distance matrix, making clusters and outliers immediately apparent. Use the following Python script to generate a publication-ready heatmap:

```python
import pandas as pd
import seaborn as sns
import matplotlib.pyplot as plt
import numpy as np

# Load the SNP distance matrix
df = pd.read_csv("snp_distances.tsv", sep="\t", index_col=0)

# Create a clustered heatmap
# Clustering reorders rows and columns to group similar sequences
g = sns.clustermap(
    df,
    cmap="YlOrRd",            # Yellow-Orange-Red color scale
    annot=True,               # Show SNP counts in each cell
    fmt="d",                  # Integer format
    linewidths=0.5,           # Grid lines between cells
    linecolor="white",
    figsize=(10, 8),
    annot_kws={"size": 9},
    dendrogram_ratio=(0.12, 0.12),
    cbar_kws={"label": "SNP Distance"},
)

# Format and save
g.ax_heatmap.set_xlabel("")
g.ax_heatmap.set_ylabel("")
plt.title("Pairwise SNP Distance Matrix - H5N1 HA Segment", pad=80)
plt.tight_layout()
plt.savefig("snp_heatmap.png", dpi=300, bbox_inches="tight")
plt.show()

print("Heatmap saved to snp_heatmap.png")
```

**What to look for in the heatmap:**

- **Dark clusters along the diagonal**: groups of sequences with low pairwise distances, indicating potential outbreak clusters.
- **Color gradients**: the transition from light colors (low distance) to dark colors (high distance) reveals how sequences partition into groups.
- **Dendrogram structure**: the hierarchical clustering dendrograms on the margins show which sequences group together. Note that this clustering is based on distance alone and is *not* a phylogenetic tree.
- **Outliers**: rows or columns that are uniformly dark stand out as unrelated to the main cluster(s).

> **Customization tips:**
>
> For larger datasets (more than 50 sequences), consider turning off `annot=True` to remove the numeric labels and rely on color alone. You can also use `sns.heatmap()` instead of `sns.clustermap()` if you want to preserve the original sequence order from your metadata rather than applying hierarchical clustering.

**Step 4 output file:**

> **Want to see the expected result?** Download the heatmap:
>
> [⬇ Download `snp_heatmap.png`](link-to-heatmap-file)

---

## Limitations: Why You Need Phylogenetic Analysis Too

The SNP distance matrix is a powerful screening tool, but it fundamentally cannot distinguish between different evolutionary scenarios that produce the same pairwise distances. Here is a concrete example.

Suppose you have four tightly clustered outbreak sequences (1 to 3 SNPs apart) and one outlier sequence, "Wild_Bird_01", that is 8 SNPs from the cluster. The distance matrix tells you it is 8 SNPs away, but it cannot tell you *why*.

**Scenario A: Wild_Bird_01 is an outgroup (separate introduction)**

```
         ┌─── Wild_Bird_01  (8 SNPs away, branched BEFORE the cluster)
─────────┤
         └──┬── Farm_A_01
            ├── Farm_A_02
            ├── Farm_B_01
            └── Farm_C_01
```

**Interpretation:** Wild_Bird_01 represents a separate introduction. The four farm sequences form a single outbreak cluster with a common ancestor distinct from Wild_Bird_01.

**Scenario B: Wild_Bird_01 descended from the cluster**

```
         ┌── Farm_A_01
─────────┼── Farm_A_02
         ├── Farm_B_01
         ├── Farm_C_01
         └───── Wild_Bird_01  (8 SNPs, EVOLVED FROM within the cluster)
```

**Interpretation:** Wild_Bird_01 is actually part of the outbreak. It evolved from within the cluster and accumulated additional mutations, perhaps through sustained transmission in a wild bird population.

> **Critical limitation:**
>
> The SNP distance matrix produces **identical numbers** for both scenarios above. Only a phylogenetic tree, which reconstructs shared ancestry and evolutionary relationships, can distinguish them. This is why the phylogenetic analysis in the next tutorial is essential for complete outbreak interpretation.

---

## Summary

In this tutorial, you learned how to:

1. **Align sequences** using MAFFT and assess alignment quality
2. **Calculate pairwise SNP distances** with snp-dists
3. **Interpret the distance matrix** using pathogen-appropriate thresholds
4. **Visualize clusters** with a heatmap to identify potential outbreak relationships

SNP distance analysis is an excellent first pass for outbreak investigations. It is fast, interpretable, and effective at identifying clusters of related sequences. However, distances alone cannot reveal evolutionary relationships or distinguish key epidemiological scenarios. Always follow up with phylogenetic analysis for a complete picture.

---

## All Tutorial Files

Here is a summary of all input, intermediate, and output files from this tutorial. You can download any of these to check your work or jump into the analysis at any step.

| File | Step | Type | Download |
|------|------|------|----------|
| `sequences_ha.fasta` | Input | Unaligned HA sequences | [⬇ Download](link-to-sequences-file) |
| `metadata_ha.tsv` | Input | Sequence metadata | [⬇ Download](link-to-metadata-file) |
| `aligned_sequences.fasta` | Step 1 output | MAFFT alignment | [⬇ Download](link-to-aligned-file) |
| `snp_distances.tsv` | Step 2 output | Pairwise SNP distance matrix | [⬇ Download](link-to-snp-distances-file) |
| `snp_heatmap.png` | Step 4 output | Heatmap visualization | [⬇ Download](link-to-heatmap-file) |

---

## Next Steps

**[Continue to Analysis 2: Phylogenetic Analysis](link-to-phylo-tutorial)**

Learn how to build and interpret phylogenetic trees to resolve the evolutionary relationships that SNP distances alone cannot reveal.
