---
title: "Core Genome Alignment with Snippy-core"
slug: snippy-core
contributors:
  - hermione-jean-granger
---

### Purpose
Use **`snippy-core`** to combine the outputs of multiple **`snippy`** runs into a single core genome alignment. **`Snippy-core`** extracts positions present in all genomes, identifies variable sites, and generates alignments suitable for phylogenetic or recombination analysis.

#### Basic Usage
```bash
snippy-core --ref reference.fna --prefix core_alignment snippy_out_*
```

### Inputs

- reference.fna — The same reference genome used during individual snippy runs, ensuring consistent coordinate space.
- snippy_out_* — Output directories from one or more completed snippy analyses. Each must contain a snps.vcf and consensus.fa file.

### Outputs

- core_alignment/core.full.aln — Full core genome alignment of all conserved positions across samples.
- core_alignment/core.aln — Alignment of variable (SNP) sites only, used for phylogenetic tree construction.
- core_alignment/core.tab — Tabular summary of SNP positions across all genomes.
- core_alignment/core.summary — Summary statistics for the number of core sites, SNPs, and missing data per genome.