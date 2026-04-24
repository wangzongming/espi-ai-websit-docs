name: translate-vuepress-notes
description: Translate all VuePress markdown files under docs/notes into target language completely.

inputs:
  target_language:
    type: string
    description: The language to translate into (e.g. zh, en, ja)
    required: true

steps:
  - name: scan-files
    description: Find all markdown files under docs/notes
    run: |
      find docs/notes -type f -name "*.md"

  - name: translate-files
    description: Translate each markdown file completely
    for_each: "{{steps.scan-files.output}}"
    run: |
      FILE="{{item}}"
      echo "Translating $FILE"

      OUTPUT_FILE=$(echo $FILE | sed "s/docs\/notes/docs\/notes-{{inputs.target_language}}/")

      mkdir -p $(dirname "$OUTPUT_FILE")

      windsurf llm "
      You are a professional technical translator.

      Task:
      Translate the following VuePress markdown file into {{inputs.target_language}}.

      STRICT REQUIREMENTS:
      1. Translate ALL content completely, do not skip anything.
      2. Preserve Markdown structure exactly (headings, code blocks, links, tables).
      3. DO NOT translate:
         - code blocks
         - inline code
         - file paths
         - URLs
      4. Keep frontmatter unchanged if exists.
      5. Output ONLY translated markdown.

      Content:
      $(cat "$FILE")
      " > "$OUTPUT_FILE"

  - name: verify
    description: Ensure all files are translated
    run: |
      SRC_COUNT=$(find docs/notes -type f -name "*.md" | wc -l)
      DST_COUNT=$(find docs/notes-{{inputs.target_language}} -type f -name "*.md" | wc -l)

      echo "Source files: $SRC_COUNT"
      echo "Translated files: $DST_COUNT"

      if [ "$SRC_COUNT" -ne "$DST_COUNT" ]; then
        echo "❌ Translation incomplete!"
        exit 1
      else
        echo "✅ All files translated successfully!"
      fi