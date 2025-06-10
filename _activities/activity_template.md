---
title: "Activity Title"
layout: page
organism:
  - bacteria
  - fungus
  - virus
activity:
  - outbreak-detection
tags:
  - species-id
contributors:
  - harry-james-potter
  - hermione-jean-granger
---

<!--- 👆 Frontmatter organizes content for filtering and search
TODO:
1. Replace "Activity Title" with a descriptive name.
2. Retain only relevant organisms from the list.
3. Update activity keywords to reflect core analytic goals (used as filters).
4. Add optional tags to support search (tags are searchable).
5. Replace contributor slugs with actual values from the _contributors collection.

Note: All metadata fields must be valid YAML lists.
--->

<!--- Title & Table of Contents --->
# **{{ page.title }}**
{: .no_toc }
<br>

<!-- Build a map of affiliations with index -->
{% assign affiliations = "" | split: "," %}

{% for slug in page.contributors %}
  {% assign contributor = site.contributors | where: "slug", slug | first %}
  {% if contributor and contributor.affiliation %}
    {% unless affiliations contains contributor.affiliation %}
      {% assign affiliations = affiliations | push: contributor.affiliation %}
    {% endunless %}
  {% endif %}
{% endfor %}

<!-- Contributors displayed side by side -->
<div style="display: flex; flex-wrap: wrap; gap: 1.5rem; align-items: center;">

{% for slug in page.contributors %}
  {% assign contributor = site.contributors | where: "slug", slug | first %}
  {% if contributor %}
    {% for aff in affiliations %}
      {% if aff == contributor.affiliation %}
        {% assign aff_index = forloop.index %}
      {% endif %}
    {% endfor %}
    <div style="display: flex; align-items: center; gap: 0.5rem;">
      <img src="{{ contributor.avatar }}" alt="{{ contributor.first_name }} {{ contributor.last_name }}" style="width: 30px; height: 30px; border-radius: 50%; object-fit: cover;">
      <div style="font-size: 0.95rem;">
        <strong>
          <a href="/contributors/{{ contributor.slug }}/" target="_blank" style="text-decoration: none; color: inherit;">
            {{ contributor.first_name }} {{ contributor.last_name }}
          </a>
        </strong><sup>{{ aff_index }}</sup>
      </div>
    </div>
  {% endif %}
{% endfor %}

</div>

{% for affiliation in affiliations %}
<sup>{{ forloop.index }}</sup> {{ affiliation }}  
{% endfor %}

---

🧬 **Date Published:** YYYY-MM-DD <br>
🧬 **Organism(s):** {{ page.organism | join: ", " }} <br>
🧬 **Activity Type(s):** {{ page.activity | join: ", " }} <br>
🧬 **Tags:** {{ page.tags | join: ", " }} <br>

---

# Overview

Provide a concise description of the analysis and its relevance during a public health crisis. This may include situational context, priority questions, or triggers for performing the analysis.

- **Target pathogen(s):**  
  *Name specific species or groups relevant to this activity.*

- **Data Requirements:**  
  Clearly specify what data are expected and acceptable. Use the structure below:
  - **Required data types:** (e.g., raw genomic FASTQ, consensus genomes, patient metadata, wastewater RT-qPCR, epidemiological case reports)
  - **Inclusion criteria:** (e.g., sequences with >90% coverage, data collected within the last 30 days)
  - **Exclusion criteria:** (e.g., partial sequences below 1000 bp, missing sample collection date)
  - **File formats:** (e.g., FASTQ, CSV, JSON, GenBank)
  - **Metadata expectations:** (e.g., must include collection date and location, host species optional)

- **Analytic purpose:**  
  *Define the specific questions or decisions this analysis supports.*  

- **Known limitations or caveats:**  
  *Summarize any methodological assumptions, common pitfalls, or potential misinterpretations.*

---

# Step-by-Step Instructions

Provide clear procedural instructions, including tools, scripts, and expected outputs. Steps may be simplified or expanded depending on complexity.

1. **Step 1: Data Collection**  
2. **Step 2: Data Quality Control**  
3. **Step 3: Analysis Execution**  
4. **Step 4: Interpretation of Results**  
5. **Step 5: Final Reporting**

---

# Additional Notes

Optional section for links, references, and external documentation:

- [Analysis GitHub Repository](#)  
- [Reporting Dashboard](#)  
- [Relevant Protocols](#)  
- [Citations or References](#)

*Include any ethical, legal, or data-sharing considerations if applicable.*
