---
title: "Multilocus Sequence Typing with MLST"
slug: mlst
contributors:
  - harry-james-potter
---

### Purpose
Use **`mlst`** to determine the multilocus sequence type (ST) of bacterial isolates from assembled genomes.  
**`MLST`** compares an assembly to curated allele databases to identify the allelic profile and assign the most likely sequence type, providing a standard method for genotyping and outbreak tracking.

#### Basic Usage
```bash
mlst sample.fna
```
### Inputs

- sample.fna — Assembled bacterial genome in FASTA format (commonly produced by shovill). Assemblies should be high-quality and contamination-free to ensure accurate allele calling.

- MLST database (auto-detected or custom) — The program automatically detects the species and selects the appropriate allele database, or you may specify a custom one.

### Outputs

- stdout (terminal output) — Tab-delimited summary listing the detected species, MLST scheme, allele numbers for each locus, and the assigned sequence type (ST).
