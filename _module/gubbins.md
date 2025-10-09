---
title: "Recombination-Aware Phylogenetic Analysis with Gubbins"
slug: gubbins
contributors:
  - hermione-jean-granger
---

### Purpose
Use **`Gubbins`** (Genealogies Unbiased By recomBinations In Nucleotide Sequences) to identify and mask regions of recombination in bacterial whole-genome alignments.  
**`Gubbins`** iteratively builds phylogenetic trees, detects recombinant regions, and refines the tree to produce a recombination-free alignment and phylogeny suitable for outbreak and evolutionary analyses.

#### Basic Usage
```bash
run_gubbins.py --prefix gubbins_out core.full.clean.aln
```
### Inputs
- core.full.clean.aln — Cleaned core genome alignment (e.g., from snippy-clean_full_aln), containing homologous regions across all samples. Ensure all sequences are aligned to the same reference and trimmed of low-quality regions.

### Outputs
- gubbins_out.filtered_polymorphic_sites.fasta — Alignment with recombinant regions removed, used for recombination-free phylogenetic inference.
- gubbins_out.final_tree.tre — Maximum-likelihood phylogenetic tree corrected for recombination.
- gubbins_out.recombination_predictions.gff — Genomic coordinates of predicted recombinant regions.
- gubbins_out.summary.csv — Summary table of recombination events and per-sample statistics.
