---
title: Linking & Referencing
nav_order: 3
parent: Submission Guide
layout: page
---

# {{page.title}}
{: .no_toc }

<!-- Table of contents -->
<details open markdown="block">
  <summary>
    Table of contents
  </summary>
  {: .text-delta }
1. TOC
{:toc}
</details>

## Inline links (to external pages):

Create a link using `[link text](URL)` format

#### Markdown:
<div style="border: 1px solid #ccc; border-radius: 8px; padding: 10px 15px; background-color: #ffffff">
This is a link to [Google](https://www.google.com). <br>
Visit [GitHub](https://github.com) to see open source projects.
</div>

#### Rendered Output:
<div style="border: 1px solid #ccc; border-radius: 8px; padding: 10px 15px; background-color: #ffffff">
This is a link to <a href="https://www.google.com">Google</a>. <br>
Visit <a href="https://github.com">GitHub</a> to see open source projects.
</div>

---

## Reference links (inline):

Separate link definition from usage:

#### Markdown:
<div style="border: 1px solid #ccc; border-radius: 8px; padding: 10px 15px; background-color: #ffffff">
This is a [reference link][1]. <br>
This is another [reference link][link-name]. <br>
<br>
[1]: https://www.example.com <br>
[link-name]: https://www.google.com "Google Search" <br>
</div>

#### Rendered Output:
<div style="border: 1px solid #ccc; border-radius: 8px; padding: 10px 15px; background-color: #ffffff">
This is a <a href="https://www.example.com">reference link</a>. <br>
This is another <a href="https://www.google.com" title="Google Search">reference link</a>.
</div>

---

## URL Autolinks:

Simply type the URL, wrapped in angle brackets:

#### Markdown:
<div style="border: 1px solid #ccc; border-radius: 8px; padding: 10px 15px; background-color: #ffffff">
<https://www.example.com><br>
<https://github.com/user/repo>
</div>

#### Rendered Output:
<div style="border: 1px solid #ccc; border-radius: 8px; padding: 10px 15px; background-color: #ffffff">
<a href="https://www.example.com">https://www.example.com</a><br>
<a href="https://github.com/user/repo">https://github.com/user/repo</a>
</div>

---

## Internal links:

### Anchor Links

Link to a heading on the same page:

#### Markdown:
<div style="border: 1px solid #ccc; border-radius: 8px; padding: 10px 15px; background-color: #ffffff">
Jump to [Basic Link Syntax](#basic-link-syntax) <br>
See [Best Practices](#best-practices)
</div>

#### Rendered Output:
<div style="border: 1px solid #ccc; border-radius: 8px; padding: 10px 15px; background-color: #ffffff">
Jump to <a href="#basic-link-syntax">Basic Link Syntax</a> <br>
See <a href="#best-practices">Best Practices</a>
</div>

### Relative Path Links

Link to other files:

#### Markdown:
<div style="border: 1px solid #ccc; border-radius: 8px; padding: 10px 15px; background-color: #ffffff">
See [Heading Syntax](headings.md) <br>
Back to [Home](../index.md)
</div>

#### Rendered Output:
<div style="border: 1px solid #ccc; border-radius: 8px; padding: 10px 15px; background-color: #ffffff">
<a href="headings.md">Heading Syntax</a> <br>
<a href="../index.md">Home</a>
</div>

---

## Footnotes:

> Footnotes aren't part of the core Markdown spec, but they are supported by GFM.

#### Markdown:
<div style="border: 1px solid #ccc; border-radius: 8px; padding: 10px 15px; background-color: #ffffff">
Here is a simple footnote[^1]. <br>
<br>
A footnote can also have multiple lines[^2]. <br>
<br>
You can also use words, to fit your writing style more closely[^note]. <br>
<br>
[^1]: My reference. <br>
[^2]: Every new line should be prefixed with 2 spaces. <br>
&nbsp;&nbsp;This allows you to have a footnote with multiple lines. <br>
[^note]: <br>
&nbsp;&nbsp;&nbsp;&nbsp;Named footnotes will still render with numbers instead of the text but allow easier identification and linking. <br>
&nbsp;&nbsp;&nbsp;&nbsp;This footnote also has been made with a different syntax using 4 spaces for new lines.
</div>

#### Rendered Output:
<div style="border: 1px solid #ccc; border-radius: 8px; padding: 10px 15px; background-color: #ffffff">
Here is a simple footnote<sup><a href="#fn1">1</a></sup>. <br>
<br>
A footnote can also have multiple lines<sup><a href="#fn2">2</a></sup>. <br>
<br>
You can also use words, to fit your writing style more closely<sup><a href="#fn3">note</a></sup>. <br>
<br>
<hr>
<small>
<p id="fn1">1. My reference.</p>
<p id="fn2">2. Every new line should be prefixed with 2 spaces. This allows you to have a footnote with multiple lines.</p>
<p id="fn3">note. Named footnotes will still render with numbers instead of the text but allow easier identification and linking. This footnote also has been made with a different syntax using 4 spaces for new lines.</p>
</small>
</div>

---

*Above link examples sourced from:*
- Internal and external links: <https://www.markdownlang.com/basic/links.html>
- Footnotes: <https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet>

---

## References (styles & location) / tool versions –Sushmita

Including citations, especially BibTeX: <https://mystmd.org/guide/citations>

If using HackMD: citations can be added like this: Paragraph Citations - HackMD

Citing non-tools on Github pages: <https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-citation-files>

Citation file format on Github: <https://citation-file-format.github.io/>

<https://github.com/citation-file-format/citation-file-format/blob/main/schema-guide.md>

See section "Referencing other work"