---
title: "Short-Read Quality Control with fastp"
slug: fastp
contributors:
  - hermione-jean-granger
---

### Purpose
Use **`fastp`** to perform quality control and adapter trimming of short-read sequencing data prior to genome assembly or variant calling. **`fastp`** efficiently filters out low-quality reads, trims adapters, and provides detailed summary reports for assessing read quality.

#### Basic Usage
```bash
fastp -i sample_R1.fastq.gz -I sample_R2.fastq.gz \
      -o sample_R1.trimmed.fastq.gz -O sample_R2.trimmed.fastq.gz \
      --detect_adapter_for_pe \
      --html sample_fastp.html \
      --json sample_fastp.json
```

### Inputs
- sample_R1.fastq.gz and sample_R2.fastq.gz — Raw paired-end Illumina reads containing adapters and low-quality regions.

### Outputs
- sample_R1.trimmed.fastq.gz / sample_R2.trimmed.fastq.gz — Cleaned reads with adapters and low-quality bases removed; ready for alignment or assembly.

- sample_fastp.html — Interactive quality control report showing per-base quality, adapter content, and filtering statistics.

- sample_fastp.json — Machine-readable summary file for downstream tracking or automated QC pipelines.