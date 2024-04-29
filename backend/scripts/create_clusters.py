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
    questions = list(enumerate(questions))

    for i, q in questions:
        content = getattr(q, 'content')
        sentences.append(content)

    embeddings = model.encode(sentences) # create embeddings

    clusters = cluster.KMeans(n_clusters=10).fit_predict(embeddings)

    clustered_data = {}
    
    for (i, c) in enumerate(clusters):
        if not c in clustered_data:
            clustered_data[c] = []
            clstr = Cluster.objects.create(
                id = c+1,
                asmId = assignment
            )
            clstr.save() 
        else:
            clstr = Cluster.objects.filter(id = c+1).first()

        clustered_data[c].append(i)
        q = questions[i][1]
        clstr.questions.add(q)
        clstr.save() 

    print('Successfully created {} clusters'.format(10))

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
