---
title: "Variant Calling and Core SNP Alignment with Snippy"
slug: snippy
contributors:
  - hermione-jean-granger
---

### Purpose
Use **`snippy`** to perform rapid bacterial variant calling and core genome alignment from Illumina short reads.  
**`Snippy`** maps reads to a reference genome using **BWA**, calls variants with **FreeBayes**, and filters them using **bcftools**, producing high-quality consensus sequences and SNP alignments suitable for phylogenetic or outbreak analyses.

#### Basic Usage
```bash
snippy --cpus 4 \
       --outdir snippy_out \
       --ref reference.fna \
       --R1 sample_R1.trimmed.fastq.gz \
       --R2 sample_R2.trimmed.fastq.gz
```

### Inputs

- reference.fna — Reference genome in FASTA format to which reads are aligned. Should be a high-quality representative of the species or outbreak lineage.
- sample_R1.trimmed.fastq.gz / sample_R2.trimmed.fastq.gz — Quality-controlled paired-end Illumina reads (e.g., from fastp).

### Outputs

- snippy_out/snps.vcf — Filtered variant calls in VCF format for downstream inspection or filtering.
- snippy_out/consensus.fa — Consensus genome sequence with high-confidence variants applied to the reference.
- snippy_out/snps.tab — Tabular summary of SNP positions and annotations.
- snippy_out/core.aln — Core genome alignment file, used for comparative or phylogenetic analyses.
- snippy_out/snippy.log — Log file containing run parameters and quality metrics.