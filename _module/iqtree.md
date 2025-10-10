---
title: "Phylogenetic Tree Inference with IQ-TREE"
slug: iqtree
contributors:
  - hermione-jean-granger
---

### Purpose
Use **`IQ-TREE`** to construct maximum-likelihood phylogenetic trees from core SNP alignments.  
**`IQ-TREE`** automatically selects the best-fit substitution model, performs ultrafast bootstrapping, and produces high-quality phylogenies for visualization and evolutionary interpretation.

#### Basic Usage
```bash
iqtree -s core.filtered_polymorphic_sites.fasta -m GTR+G -bb 1000 -nt AUTO
```

### Inputs

- core.filtered_polymorphic_sites.fasta — Recombination-filtered core SNP alignment (e.g., from Gubbins). Contains only variable positions across all genomes.

### Outputs

- core.filtered_polymorphic_sites.fasta.treefile — Final maximum-likelihood phylogenetic tree in Newick format.
- core.filtered_polymorphic_sites.fasta.log — Log of model selection, likelihood scores, and runtime details.
- core.filtered_polymorphic_sites.fasta.iqtree — Summary of model parameters, branch supports, and bootstrap results.
- core.filtered_polymorphic_sites.fasta.splits.nex (optional) — Split network for visualizing phylogenetic uncertainty.