.PHONY: typeset

FILES=`cat index.txt`

typeset:
	pandoc                        \
	  --self-contained \
	  --standalone \
	  --table-of-contents \
	  --toc-depth 3 \
	  --atx-headers \
	  --from         markdown     \
	  --to           latex        \
	  --out          aposports.pdf \
	  --pdf-engine   xelatex      \
	  $(FILES)

