import csv
from courses.models import User, Course

"""
Params:
    first argument: csv file of user
"""
def run(*args):
    if args[0].index('.csv') >= 0:
        with open(args[0]) as csvfile:
            reader = csv.reader(csvfile)
            next(reader, None)
            for row in reader:
                if User.objects.filter(email = row[0]).first() is None:
                    user = User.objects.create(
                        email = row[0],
                        role = User.STUDENT
                    )
                    user.save()
                    course = Course.objects.filter(id = row[1]).first()
                    if (course is not None):
                        course.students.add(user)
        print("User data added to course " + course.code + " (" + course.semester + ")")
    else:
        print("Invalid input. Please pass in a csv file and a valid course id number")