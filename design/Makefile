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
	  --metadata=plantumlPath:/home/vagrant/datamodel/plantuml.jar \
	  --from         markdown     \
	  --to           latex        \
	  --out          ~/data/datamodel.pdf \
	  --pdf-engine   xelatex      \
	  $(FILES)

docx:
	pandoc                        \
	  --self-contained \
	  --standalone \
	  --lua-filter=filters/diagram-generator.lua \
	  --metadata=plantumlPath:/home/vagrant/vpat-ng/plantuml.jar \
	  --from         markdown     \
	  --to           docx \
	  --out          ~/data/datamodel.docx \
	  $(FILES)

test:
	pandoc                        \
	  --self-contained \
	  --standalone \
	  --lua-filter=filters/diagram-generator.lua \
	  --metadata=plantumlPath:/home/vagrant/datamodel/plantuml.jar \
	  --from         markdown     \
	  --to           latex        \
	  --out          ~/data/test.pdf \
	  --pdf-engine   xelatex      \
	  diagrams/test.md

master:
	pandoc                        \
	  --self-contained \
	  --standalone \
	  --filter pandoc-plantuml \
	  --from         markdown     \
	  --to           latex        \
	  --out          ~/data/master.pdf \
	  --pdf-engine   xelatex      \
	  diagrams/master.md

detailed:
	pandoc                        \
	  --self-contained \
	  --standalone \
	  --lua-filter=filters/diagram-generator.lua \
	  --metadata=plantumlPath:/home/vagrant/datamodel/plantuml.jar \
	  --from         markdown     \
	  --to           latex        \
	  --out          ~/data/detailed.pdf \
	  --pdf-engine   xelatex      \
	  diagrams/detailed.md

usecase:
	pandoc                        \
	  --self-contained \
	  --standalone \
	  --lua-filter=filters/diagram-generator.lua \
	  --metadata=plantumlPath:/home/vagrant/datamodel/plantuml.jar \
	  --from         markdown     \
	  --to           latex        \
	  --out          ~/data/usecase1.pdf \
	  --pdf-engine   xelatex      \
	  diagrams/usecase1.md

orig:
	pandoc                        \
	  --self-contained \
	  --standalone \
	  --atx-headers \
	  --lua-filter=filters/diagram-generator.lua \
	  --metadata=plantumlPath:/home/vagrant/datamodel/plantuml.jar \
	  --from         markdown     \
	  --to           latex        \
	  --out          ~/data/orig.pdf \
	  --pdf-engine   xelatex      \
	  text/yaml2.md diagrams/original.md

	  erd:
	  	dot erd/erd.gv \
			-Tsvg
			-o images/erd.svg
