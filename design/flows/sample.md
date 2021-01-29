##	Entity Relationships:

###	High-Level ERD

```{ .plantuml plantuml-filename=master_erd.svg caption="high-level Entity Relationship Diagram"}
@startuml
  skinparam linetype ortho
    skinparam packageStyle rectangle
	  skinparam shadowing false
	    skinparam class {
		    BackgroundColor White
			    BorderColor Black
				    ArrowColor Black
					  }
'					    hide members
						  hide circle

	entity "users" as u 
	entity "Oags" as oags 
	entity "Standards" as std 
	entity "StandardCriteria" as criteria 
	entity "OagStandards" as os 
	entity "AssessmentMaster" as am 
	entity "AssessmentRevisions" as ar 
	entity "AssessmentComments" as ac
	entity "AssessmentNotes" as anotes
	entity "AssessmentDependencies" as adep
	entity "AssessmentTitles" as atitle
	entity "AssessmentProducts" as aprod
	entity "Products" as prod
	entity "ProductDetails" as proddet
	entity "GEC API" as gec
	entity "ContractHeader" as chead
	entity "ContractDetails" as cdet
	entity "assessmentAnswers" as ans
	entity "sections" as sec

	am ||--|{ ar  
	am ||--|{ ac  
	ac ||--|| u  
	am ||--|{ anotes  
	anotes ||--||  u  
	ar }|--|| u 
	ar ||--|| u 
	ar ||--|| u 
	ar ||--|| u  
	ar ||--|| u  
	ar }|--|{ oags  
	ar ||--|| atitle  
	ar ||--|| aprod  
	aprod ||--|| proddet 
	gec ||--||  proddet2  
	atitle }|--|| ar  
	chead ||--|{ cdet  
	ar ||--|| cdet  
	proddet ||..|| cdet 
	oags }|--|| os 
	os ||--|{ std  
	std ||--|{ criteria : standard_id -> standard_id
	ar ||--|{ ans  : revision_id -> revision_id
	criteria ||--|{ ans  
	sec ||--|{ criteria  
	sec ||--|{ ans  
@enduml
```

\newpage
