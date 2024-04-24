from courses.models import Cluster, Question, Assignment
import csv
from sentence_transformers import SentenceTransformer, util
from sklearn import cluster

"""
Parse a list of question objects and assign them to different cluster

Code provided by Prof. Malte Schwarzkopf
"""
def parse_questions(questions, assignment):
    model = SentenceTransformer('aiknowyou/all-mpnet-base-questions-clustering-en')
    sentences = []
    for q in questions:
        content = getattr(q, 'content')
        sentences.append(content)

    embeddings = model.encode(sentences) # create embeddings

    # Get the course this assignment belongs to
    crs = getattr(assignment, 'courseId')

    # Get number of TAs in the class
    tas_count = getattr(crs, 'tas').count()

    n_clstr = int(len(sentences)/tas_count)

    clusters = cluster.KMeans(n_clusters=n_clstr).fit_predict(embeddings)

    clustered_data = {}
    
    for (i, c) in enumerate(clusters):
        if not c in clustered_data:
            clustered_data[c] = []
            clstr = Cluster.objects.create(
                asmId = assignment
            )
            clstr.save() 
        else:
            clstr = Cluster.objects.filter(id = c+1).first()
        clustered_data[c].append(i)
        q = questions.filter(id = i+1).first()
        clstr.questions.add(q)

    print(clusters)
    print(clustered_data)
    print('Successfully created {} clusters'.format(n_clstr))

"""
Params:
    first param: assignment id
"""
def run(*args):
    if not(args[0] and args[0].isnumeric()):
        print("Invalid input. Pass in a valid integer for assignment id")
        return
    
    asm = Assignment.objects.filter(id = int(args[0])).first()
    if asm is None:
        print("Invalid input. Pass in a valid integer for assignment id")
        return
    
    questions = Question.objects.filter(assignmentId = int(args[0])).all()

    if questions is None:
        print("No questions for this assignment")
        return
    
    parse_questions(questions, asm)
