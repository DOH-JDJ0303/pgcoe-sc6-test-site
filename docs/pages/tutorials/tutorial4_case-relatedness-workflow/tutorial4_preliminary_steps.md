# Preliminary Steps: Assess Your Organism and Download Tutorial Data

**Tutorial 4: Are Cases Related to Each Other?**

Before diving into any relatedness analysis, take a moment to think about the biology of your pathogen and get the tutorial dataset set up. This step helps you choose the right analytical approach and understand the caveats that come with your results.

---

## Table of Contents

- [Step 0: Know Your Organism](#step-0-know-your-organism)
  - [Key Questions](#key-questions)
  - [How Organism Type Shapes Your Analysis](#how-organism-type-shapes-your-analysis)
  - [Where This Tutorial Fits](#where-this-tutorial-fits)
- [Step 0.5: Download the Tutorial Data from NCBI](#step-05-download-the-tutorial-data-from-ncbi)
  - [Install NCBI Datasets CLI](#install-ncbi-datasets-cli)
  - [Download the Tutorial Files](#download-the-tutorial-files)
  - [Download Sequences from NCBI](#download-sequences-from-ncbi)
  - [Extract and Organize Files](#extract-and-organize-files)
  - [Verify Your Data](#verify-your-data)
  - [Quick Quality Check](#quick-quality-check)
- [You're Ready](#youre-ready)

---

## Step 0: Know Your Organism

### Key Questions

Before running any relatedness analysis, ask yourself three things:

1. **Is this a virus or a bacterium?** Viruses and bacteria differ in genome size, mutation rate, and mechanisms of genetic exchange. All of these characteristics affect how you analyze and interpret genomic distances.

2. **If it's a virus, is the genome segmented?** Segmented viruses (like influenza) can undergo reassortment, where individual genome segments are swapped between co-infecting viruses. This means a single-segment phylogeny only tells you the evolutionary history of *that segment*, not the whole genome.

3. **How fast does it evolve?** The mutation rate determines how many SNP differences you should expect between related cases. A fast-evolving RNA virus like influenza may accumulate 1 to 3 mutations per segment per month, while a slow-evolving bacterium like *M. tuberculosis* may show fewer than 1 SNP per year across the whole genome.

### How Organism Type Shapes Your Analysis

| | Non-Segmented Viruses | Segmented Viruses | Bacteria |
|---|---|---|---|
| **Examples** | SARS-CoV-2, measles, West Nile virus, mpox | Influenza, rotavirus, Rift Valley fever virus | *Salmonella*, *E. coli*, *M. tuberculosis* |
| **Typical analysis unit** | Whole genome | Individual segments or concatenated genome | Core genome or whole genome |
| **Key confounder** | Recombination (some viruses) | **Reassortment** | Horizontal gene transfer (HGT), recombination |

> **Further reading:**
> For more on reassortment analysis in segmented viruses, see [companion tutorial, link TBD]. For bacterial-specific considerations including HGT and recombination masking, see resources on [Gubbins](https://sanger-pathogens.github.io/gubbins/) and [ClonalFrameML](https://github.com/xavierdidelot/ClonalFrameML).

### Where This Tutorial Fits

For this tutorial, we are working with **H5N1 avian influenza HA sequences (segment 4)** from a Washington State outbreak investigation. Influenza is a segmented virus with 8 genome segments, so our analysis reflects the evolutionary history of the HA segment only.

This is a valid and common approach. HA is the primary target for subtyping, antigenic characterization, and many surveillance applications. However, keep in mind:

- Sequences that appear closely related on HA may have different evolutionary histories on other segments due to reassortment.
- A complete investigation would ideally analyze all 8 segments and check for reassortment events.
- We focus on a single segment here for clarity and cover multi-segment approaches in a separate tutorial.

---

## Step 0.5: Download the Tutorial Data from NCBI

This section walks you through downloading the H5N1 HA sequences for the tutorial using the NCBI Datasets command-line tool.

### Install NCBI Datasets CLI

If you haven't already installed NCBI Datasets, follow the [installation instructions](https://www.ncbi.nlm.nih.gov/datasets/docs/v2/download-and-install/) for your platform.

Verify your installation:

```bash
# Check that datasets is installed and print the version
datasets --version
```

You should see output like `datasets version: 16.x.x` or similar. If you get a "command not found" error, revisit the installation instructions linked above.

### Download the Tutorial Files

Two pre-made files are provided for this tutorial:

1. **`accessions_ha.tsv`**: A list of NCBI accession numbers for the H5N1 HA (segment 4) sequences used in this tutorial. This includes both outbreak investigation sequences and contextual background sequences.

2. **`metadata_ha.tsv`**: Metadata for each sequence, including collection date, location, host, and a column indicating whether each sequence is an **outbreak** sequence or a **contextual** background sequence.

[⬇ Download `accessions_ha.tsv`](link-to-accessions-file)

[⬇ Download `metadata_ha.tsv`](link-to-metadata-file)

Place both files in your working directory for this tutorial:

```bash
# Create a working directory
mkdir -p tutorial4_snp_analysis
cd tutorial4_snp_analysis

# Move the downloaded files here (adjust path as needed)
mv ~/Downloads/accessions_ha.tsv .
mv ~/Downloads/metadata_ha.tsv .
```

Preview the accession list:

```bash
# Check the number of accessions and preview the first few
wc -l accessions_ha.tsv
head accessions_ha.tsv
```

Preview the metadata:

```bash
# View the first few rows of metadata
head metadata_ha.tsv | column -t -s $'\t'
```

You should see columns including the accession, collection date, location, host, and a `sequence_category` column with values of either `outbreak` or `contextual`.

### Download Sequences from NCBI

Use the NCBI Datasets CLI to download the sequences listed in your accession file:

```bash
# Download virus genome sequences by accession list
datasets download virus genome accession \
  --inputfile accessions_ha.tsv \
  --filename ha_sequences.zip
```

This will download a zip archive containing the FASTA sequences and associated NCBI metadata.

> **What this command does:**
>
> `datasets download virus genome accession` tells NCBI Datasets to download viral genome data for specific accessions. The `--inputfile` flag points to your list of accessions (one per line), and `--filename` specifies the output zip file name.

### Extract and Organize Files

Unzip the downloaded archive and extract the FASTA file to your working directory:

```bash
# Unzip the downloaded archive
unzip ha_sequences.zip -d ha_download

# The FASTA file is nested inside the extracted directory
# Copy it to your working directory
cp ha_download/ncbi_dataset/data/genomic.fna ./sequences_ha.fasta

# Verify the file
grep -c "^>" sequences_ha.fasta
```

The count from `grep` should match the number of accessions in your accession list. If the numbers don't match, some accessions may not have been available. Check the NCBI Datasets output for any warnings.

> **Optional: NCBI-provided metadata**
>
> The zip archive also contains an NCBI-generated metadata file at `ha_download/ncbi_dataset/data/data_report.jsonl`. For this tutorial, we will use the curated `metadata_ha.tsv` file provided above, which includes the outbreak vs. contextual designation that NCBI metadata does not contain.

### Verify Your Data

Confirm that your accession list and downloaded sequences are consistent:

```bash
# Extract sequence headers from the FASTA file
grep "^>" sequences_ha.fasta | head

# Count sequences
echo "Accessions in list: $(wc -l < accessions_ha.tsv)"
echo "Sequences downloaded: $(grep -c '^>' sequences_ha.fasta)"
```

Check that the accessions in your FASTA headers match the accessions in your metadata file. Depending on how NCBI formats the headers, you may need to parse out the accession from the header line:

```bash
# Extract accessions from FASTA headers (adjust parsing as needed)
grep "^>" sequences_ha.fasta | sed 's/^>//' | cut -d' ' -f1 > downloaded_accessions.txt

# Compare with your accession list
diff <(sort accessions_ha.tsv) <(sort downloaded_accessions.txt)
```

If `diff` produces no output, all accessions match. If there are differences, investigate any missing or extra sequences before proceeding.

### Quick Quality Check

Before moving on to the analysis, do a quick sanity check on sequence quality:

```bash
# Check sequence lengths (all HA segments should be roughly similar in length)
awk '/^>/{if(name)print name"\t"len; name=substr($0,2); len=0; next}
     {len+=length($0)}
     END{print name"\t"len}' sequences_ha.fasta | \
  sort -t$'\t' -k2 -n | \
  column -t
```

**What to look for:**

- **Consistent lengths**: H5N1 HA sequences are approximately 1,700 nucleotides. Sequences significantly shorter may be incomplete. Sequences significantly longer may contain untrimmed adapter or vector sequence.
- **Outlier sequences**: any sequence that is dramatically different in length from the rest warrants a closer look before including it in the analysis.

> **Note on quality:**
>
> NCBI submissions go through basic quality checks before acceptance, so the data should generally be clean. However, it is always good practice to verify before analysis. For a more thorough QC workflow covering coverage, ambiguous bases, and read depth, see these resources [link TBD].

---

## You're Ready

At this point you should have the following files in your working directory:

| File | Description |
|------|-------------|
| `accessions_ha.tsv` | List of NCBI accessions for HA sequences |
| `metadata_ha.tsv` | Curated metadata with outbreak/contextual designations |
| `sequences_ha.fasta` | Downloaded HA sequences from NCBI |

> **Prefer to skip the download steps?** You can grab the input FASTA directly here:
>
> [⬇ Download `sequences_ha.fasta`](link-to-sequences-file)

From here, you can proceed to either analysis tutorial:

- **[Analysis 1: SNP Distance Analysis](link-to-snp-tutorial)** for a rapid screen of pairwise genetic distances
- **[Analysis 2: Phylogenetic Analysis](link-to-phylo-tutorial)** for evolutionary relationship inference

We recommend starting with the SNP distance analysis and then moving to the phylogenetic analysis, as the two methods are complementary.
