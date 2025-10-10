---
title: "Genome Assembly with Shovill"
slug: shovill
contributors:
  - harry-james-potter
---

### Purpose
Use **`shovill`** to assemble bacterial genomes from *quality-controlled* short-read sequencing data. **`Shovill`** wraps popular assemblers (like **SPAdes**) and automates preprocessing steps such as error correction, coverage normalization, and contig filtering. It produces a high-quality draft assembly suitable for downstream analyses like annotation, variant calling, or MLST typing.

#### Basic Usage
```bash
shovill --R1 sample_R1.trimmed.fastq.gz --R2 sample_R2.trimmed.fastq.gz \
        --outdir assembly_out --assembler spades --cpus 8
```

### Inputs

- sample_R1.trimmed.fastq.gz / sample_R2.trimmed.fastq.gz — Paired-end Illumina reads that have been quality controlled and trimmed (e.g., with fastp).
Using clean reads improves assembly quality and reduces misassemblies.

### Outputs

- assembly_out/contigs.fa — Final polished draft genome assembly suitable for annotation or downstream variant analysis.

- assembly_out/contigs.gfa — Assembly graph showing connections between contigs (useful for visual inspection in tools like Bandage).

- assembly_out/shovill.log — Detailed run log including command parameters and assembly statistics.

- assembly_out/contigs.stats — Summary of assembly metrics (e.g., N50, total length, GC content).