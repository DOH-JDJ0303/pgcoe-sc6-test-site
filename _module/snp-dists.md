---
title: "Pairwise SNP Distance Calculation with SNP-dists"
slug: snp-dists
contributors:
  - hermione-jean-granger
---

### Purpose
Use **`snp-dists`** to calculate pairwise SNP distances between samples from a core genome alignment.  
**`snp-dists`** rapidly computes the number of differing nucleotide positions between sequences, producing a distance matrix suitable for clustering, outbreak analysis, or visualization.

#### Basic Usage
```bash
snp-dists core.aln > snp_distances.tsv
```
### Inputs

- core.aln — Core SNP alignment (e.g., from snippy-core or Gubbins) containing only variable sites across all samples.

### Outputs

- snp_distances.tsv — Tab-delimited pairwise SNP distance matrix showing the number of SNPs separating each genome pair.

