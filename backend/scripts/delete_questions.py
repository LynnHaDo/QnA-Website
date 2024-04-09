from courses.models import Question 

"""
Params: assignment id
"""
def run(*args):
    Question.objects.filter(assignmentId = args[0]).all().delete()
    print("Successfully remove all questions for assignment " + args[0])