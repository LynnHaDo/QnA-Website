import csv
from courses.models import Course

"""
Params:
    first argument: csv file of course

Run: python3 manage.py runscript import_course --script-args course_info.csv
"""
def run(*args):
    if args[0] and args[0].index('.csv') >= 0:
        with open(args[0]) as csvfile:
            reader = csv.reader(csvfile)
            next(reader, None)
            for row in reader:
                item = Course.objects.create(
                    code = row[0],
                    name = row[1],
                    semester = row[2]
                )
                item.save()
        print("Course data added")
    else:
        print("Please enter a valid csv file path.")


