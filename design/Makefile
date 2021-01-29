.PHONY: typeset

FILES=`cat index.txt`

typeset:
	pandoc                        \
	  --self-contained \
	  --standalone \
	  --table-of-contents \
	  --toc-depth 3 \
	  --atx-headers \
	  --lua-filter=filters/diagram-generator.lua \
	  --metadata=plantumlPath:/home/vagrant/aposports/design/plantuml.jar \
	  --from         markdown     \
	  --to           latex        \
	  --out          ~/data/aposports.pdf \
	  --pdf-engine   xelatex      \
	  $(FILES)

