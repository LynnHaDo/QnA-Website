import csv
from courses.models import User, Course

"""
Params:
    first argument: csv file of user
    second argument: course id
"""
def run(*args):
    if args[0].index('.csv') >= 0:
        with open(args[0]) as csvfile:
            reader = csv.reader(csvfile)
            next(reader, None)
            for row in reader:
                userRole = User.TA if row[1] == "ta" else User.INSTRUCTOR
                if (User.objects.filter(email = row[0]).first() is None):
                        user = User.objects.create(
                            email = row[0],
                            role = userRole
                        )
                else:
                    user = User.objects.filter(email = row[0]).first()
                course = Course.objects.filter(id = row[2]).first()
                if course is None:
                    return
                if (userRole == User.TA):
                    course.tas.add(user)
                else:
                    course.instructors.add(user)
                course.save()
                user.save()
        print("Admins data added to course " + course.code + " (" + course.semester + ")")
    else:
        print("Invalid input. Please pass in a csv file and a valid course id number")