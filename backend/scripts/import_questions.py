from courses.models import Question, Assignment
from users.models import User
import csv

def parse_content(msg):
    if msg == "" or msg.lower() in ['n/a', 'na']:
        return 'n/a'
    
    return msg

"""
Params:
    first param: link to csv file
    second param: assignment id
"""
def run(*args):
    if not(args[0] and args[0].index('.csv') >= 0 and args[1] and args[1].isnumeric()):
        print("Invalid input. Pass in the link to csv file & assignment id")
        return
    
    assignment =  Assignment.objects.filter(id = int(args[1])).first()
    if assignment is None:
        print("Assignment id invalid")
        return

    # Reset count for assignment
    assignment.numSubmissions = 0
    assignment.numAnswered = 0

    with open(args[0], encoding="utf8") as csvfile:
        reader = csv.reader(csvfile)
        next(reader, None)
        for row in reader:
            student = User.objects.filter(email = row[1]).first()
            if student is None:
                print("Student not found")
                return
            
            if (parse_content(row[5]) == "n/a"):
                continue

            q = Question.objects.create(
                content = parse_content(row[5]),
                assignmentId = assignment,
                studentId = student
            )

            q.save()
            assignment.numSubmissions += 1
            assignment.save()
