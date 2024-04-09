import csv
from courses.models import Assignment, Course

"""
Params:
    first param: csv file
Run: python3 manage.py runscript import_assignment --script-args assignment_info.csv
"""
def run(*args):
    if (args[0] and args[0].index('.csv') >= 0):
        with open(args[0]) as csvfile:
            reader = csv.reader(csvfile)
            next(reader, None)
            for row in reader:
                item = Assignment.objects.create(
                    name = row[0],
                    publishedStatus = row[1],
                    dueDate = row[2],
                    courseId = Course.objects.filter(id = row[3]).first()
                )
                item.save()
        print("Assignment data added")
    else:
        print("Please pass in a valid ")